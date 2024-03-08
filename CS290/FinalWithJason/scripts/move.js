let NewLeft = 50, NewTop = 50; // % accross the screen
let OldLeft = 50, OldTop = 50; 
const LOWERLEFTBOUND = 10, LOWERTOPBOUND = 10, UPPERLEFTBOUND = 90, UPPERTOPBOUND = 90; // Limits to where it can be

const HOVERDELAY = 300, IDLEMOVEDELAY = 5000, MOVETIME = 1000-25; // Milliseconds

let GOBINWIGGLIN;
let GOBINDIV;
let GOLDCOUNTDIV;
let CPCDIV;
let HELPER1DIV;


let Gold = 0;
let GoldClickIncrement = 1;
let GoldSecondIncrement = 0;
let CritMultiplier = 2;

let HoveringOrMoving = false;
let ClicksTillMove = 5;

// Current applied status effects
let Stati =
{
    "Slowed": 0,
    "Restrained": 0,
    "Vulnerable": 0,
    "Distracted": 0,
    "PuncturedBag": 0,
};

let ChildProtectiveServicesUpgradeValue =
{
    "Type 1": 0,
    "Type 2": 0,
    "Type 3": 0,
};

let ChildProtectiveServicesUpgradePower =
{
    "Type 1": 1,
    "Type 2": 10,
    "Type 3": 100,
};

let ChildProtectiveServicesUpgradePrice =
{
    "Type 1": 10,
    "Type 2": 100,
    "Type 3": 1000,
};

let CPCUpgradeValue =
{
    "Type 1": 0,
    "Type 2": 0,
    "Type 3": 0,
};

let CPCUpgradePower =
{
    "Type 1": 1,
    "Type 2": 10,
    "Type 3": 100,
};

let CPCUpgradePrice =
{
    "Type 1": 10,
    "Type 2": 100,
    "Type 3": 1000,
};

/**
 * Runs on an interval to increase your gold based on the current CPS.
 */
function CPSUpgradeInterval()
{
    Gold += GoldSecondIncrement;
    
    GOLDCOUNTDIV.innerHTML = Gold;
}


/**
 * Runs on a click, detects the type, runs a chance of running away, and adds gold.
 *
 * @param {string} click The type of click. Options are: ['Normal thefting', 'Crit!']
 */
function ClickCounter(click)
{
    if (click == 'Normal thefting')
    {
        Gold = Gold + GoldClickIncrement * (1 + Stati["PuncturedBag"]);
        GOLDCOUNTDIV.innerHTML = Gold;
    }
    else if (click == 'Crit!')
    {
        Gold = Gold + GoldClickIncrement * CritMultiplier * ( 1 + Stati["PuncturedBag"]);
        GOLDCOUNTDIV.innerHTML = Gold;
    }

    // Anti-autoclicker
    ClicksTillMove -= 1;
    if (ClicksTillMove == 0)
    {
        ClicksTillMove = GetRandomInt(1, 5);
        hovered();
    }
}


/**
 * Initializes the CPS, Anticheat loop, and sets the various css-based variables that can't be set early.
 */
function Init()
{
    GOLDCOUNTDIV = document.getElementById('Gold');
    CPCDIV = document.getElementById('CPC');
    GOBINDIV = document.getElementById('da-gobin-div');
    GOBINDIV.onmouseover = hovered;
    HELPER1DIV = document.getElementById('da-helper1-div')

    // Start CPS
    setInterval(CPSUpgradeInterval, 1000);

    // Anticheat and bug fixer move every 5 seconds
    setInterval(hovered, 5000);
}


/**
 * If you can't figure this out, you shouldn't touch it.
 *
 * @param {Number} min The lowest number it can output.
 * @param {Number} max The highest number it can output.
 * @returns {Number} A random number between the two, inclusive.
 */
function GetRandomInt(min, max)
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


/**
 * Searches throughout all attatched CSS files to find the specified rule. Used here primarily to get keyframes.
 *
 * @param {String} Selector The name of the rule being searched for.
 * @returns {CSSRule} The variable containing the rule.
 */
function FindCssRuleByName(Selector)
{
    const StyleSheets = document.styleSheets;
  
    for (const Sheet of StyleSheets)
    {
        try {
            const Rules = Sheet.cssRules || Sheet.rules;
            for (const Rule of Rules)
            {
                if (Rule.name === Selector)
                {
                    return Rule;
                }
            }
        } catch (e)
        {
            console.warn("Can't read the css rules of: " + Sheet.href, e);
        }
    }
  
    return null;
}


/**
 * Run when hovering is detected or when a random shuffle is requested, randomizes the opsition of a character and moves there.
 */
function hovered()
{
    
    if (!HoveringOrMoving)
    {
        // Turned back off at the end of the pause and animation.
        HoveringOrMoving = true;

        // The animation keyframes
        GOBINWIGGLIN = FindCssRuleByName('gobin-wigglin');


        // Set the start and end points for the animation and final position.
        OldLeft = NewLeft;
        OldTop = NewTop;
        NewTop = GetRandomInt(LOWERTOPBOUND, UPPERTOPBOUND);
        NewLeft = GetRandomInt(LOWERLEFTBOUND, UPPERLEFTBOUND);

        // Pauses for a random delay between 0 and .5 seconds before moving.
        setTimeout(() =>
        {

            // Get the CSS root element to modify the vars.
            const ROOTSTYLE = document.querySelector(':root').style;

            // Modify the CSS vars.
            ROOTSTYLE.setProperty('--old-left', OldLeft+"%");
            ROOTSTYLE.setProperty('--new-left', NewLeft+"%");
            ROOTSTYLE.setProperty('--old-top', OldTop+"%");
            ROOTSTYLE.setProperty('--new-top', NewTop+"%");

            // Add the class which contains the animation details to the gobin to begin the animation.
            GOBINDIV.classList.add('da-gobin-div-animated');
            
            // Wait for the animation to end.
            setTimeout(function()
            {

                // Set the variables which tell the object where to stay after the end of the animation.
                ROOTSTYLE.setProperty('--stay-left', NewLeft+"%");
                ROOTSTYLE.setProperty('--stay-top', NewTop+"%");
                
                // Remove the class so it can re-add it to start the animation again.
                GOBINDIV.classList.remove('da-gobin-div-animated');

                // Reset the variable so it can move when hovered again.
                HoveringOrMoving = false;

            }, MOVETIME);

        }, GetRandomInt(0, 500));

    }

}

function CpsButton(UpgradeNumber)
{

    let UpgradeCost = ChildProtectiveServicesUpgradePrice["Type " + UpgradeNumber];
    if (Gold >= UpgradeCost)
    {
        Gold = Gold - UpgradeCost;
        GOLDCOUNTDIV.innerHTML = Gold;

        ChildProtectiveServicesUpgradeValue["Type " + UpgradeNumber] += 1;
        ChildProtectiveServicesUpgradePrice["Type " + UpgradeNumber] *= 2;
        UpgradeCost = ChildProtectiveServicesUpgradePrice["Type " + UpgradeNumber];
        document.getElementById("CPS type " + UpgradeNumber).innerHTML =
            ("CPS Upgrade type " + UpgradeNumber +
            "<br>CPS: " + (ChildProtectiveServicesUpgradeValue["Type " + UpgradeNumber] * ChildProtectiveServicesUpgradePower["Type " + UpgradeNumber]) +
            "<br>Cost: " + UpgradeCost)
        GoldSecondIncrement += ChildProtectiveServicesUpgradePower["Type " + UpgradeNumber];
        CPCDIV.innerHTML = "Clicks Per Clicks: " + GoldClickIncrement + " || " + "Clicks Per Second: " + GoldSecondIncrement;
    }
}


/**
 * Upgrades the value of a click if you have enough money.
 * @date 3/8/2024 - 11:01:51 AM
 *
 * @param {number} UpgradeNumber The click upgrade type
 */
function CpcButton(UpgradeNumber)
{
    
    let UpgradeCost = CPCUpgradePrice["Type " + UpgradeNumber];
    if (Gold >= UpgradeCost)
    {
        Gold = Gold - UpgradeCost;
        GOLDCOUNTDIV.innerHTML = Gold;

        CPCUpgradeValue["Type " + UpgradeNumber] += 1;
        CPCUpgradePrice["Type " + UpgradeNumber] *= 2;
        UpgradeCost = CPCUpgradePrice["Type " + UpgradeNumber];
        document.getElementById("CPC type " + UpgradeNumber).innerHTML =
            ("CPC Upgrade type " + UpgradeNumber +
            "<br>CPC: " + (CPCUpgradeValue["Type " + UpgradeNumber] * CPCUpgradePower["Type " + UpgradeNumber]) +
            "<br>Cost: " + UpgradeCost);
        GoldClickIncrement += CPCUpgradePower["Type " + UpgradeNumber];
        CPCDIV.innerHTML = "Clicks Per Clicks: " + GoldClickIncrement + " || " + "Clicks Per Second: " + GoldSecondIncrement;
    }
}

/* Toggle between showing and hiding the navigation menu links when the user clicks on the hamburger menu / bar icon */
function myFunction()
{
    var x = document.getElementById("myLinks1");
    if (x.style.display === "block")
    {
      x.style.display = "none";
    }
    else
    {
      x.style.display = "block";
    }
    var x = document.getElementById("myLinks2");
    if (x.style.display === "block")
    {
      x.style.display = "none";
    }
    else
    {
      x.style.display = "block";
    }
}


function collide(el1, el2) 
{
    var rect1 = el1.getBoundingClientRect();
    var rect2 = el2.getBoundingClientRect();

    return !(
    rect1.top > rect2.bottom ||
    rect1.right < rect2.left ||
    rect1.bottom < rect2.top ||
    rect1.left > rect2.right
    );
};

function inside(el1, el2) 
{
    var rect1 = el1.getBoundingClientRect();
    var rect2 = el2.getBoundingClientRect();

    return (
    ((rect2.top <= rect1.top) && (rect1.top <= rect2.bottom)) &&
    ((rect2.top <= rect1.bottom) && (rect1.bottom <= rect2.bottom)) &&
    ((rect2.left <= rect1.left) && (rect1.left <= rect2.right)) &&
    ((rect2.left <= rect1.right) && (rect1.right <= rect2.right))
    );
};

let HelperUpgradeValue =
{
    "Type 1": 0,
    "Type 2": 0,
    "Type 3": 0,
};

let HelperUpgradeCollisionGold =
{
    "Type 1": 1,
    "Type 2": 10,
    "Type 3": 100,
};

let HelperUpgradePrice =
{
    "Type 1": 10,
    "Type 2": 100,
    "Type 3": 1000,
};

let HelperPocketSize = 
{
    "Type 1": 10,
    "Type 2": 100,
    "Type 3": 1000
};

let HelperGold = 
{
    "Type 1": 0,
    "Type 2": 0,
    "Type 3": 0
}


function HelperGoldRequest(UpgradeNumber)
{
    GOLDCOUNTDIV.innerHTML = Gold + HelperGold["Type " + UpgradeNumber];
    HelperGold["Type " + UpgradeNumber] = 0;
}

function HelperUpgrade(UpgradeNumber)
{
    if (HELPER1DIV.style.opacity == 0) 
    {
        HELPER1DIV.style.opacity = 1;    
    }
    let UpgradeCost = HelperUpgradePrice["Type " + UpgradeNumber];
    if (Gold >= UpgradeCost)
    {
        Gold = Gold - UpgradeCost;
        GOLDCOUNTDIV.innerHTML = Gold;

        HelperUpgradeValue["Type " + UpgradeNumber] += 1;
        HelperUpgradePrice["Type " + UpgradeNumber] *= 2;
        UpgradeCost = HelperUpgradePrice["Type " + UpgradeNumber];
        document.getElementById("Helper" + UpgradeNumber).innerHTML =
            ("Helper " + UpgradeNumber +
            "<br>CPC: " + (HelperUpgradeValue["Type " + UpgradeNumber] * HelperUpgradePower["Type " + UpgradeNumber]) +
            "<br>PocketSize: " + (HelperPocketSize["Type " + UpgradeNumber]) +
            "<br>Cost: " + UpgradeCost);
        HelperCollisionGold["Type " + UpgradeNumber] += HelperUpgradePower["Type " + UpgradeNumber];
        
    }

}

function HelperCollisionEffect(UpgradeNumber)
{
    if (HelperGold["Type " + UpgradeNumber] <= HelperGoldMaximum["Type " + UpgradeNumber]) 
    {
        HelperGold["Type " + UpgradeNumber] = HelperGold["Type " + UpgradeNumber] + HelperCollisionGold["Type " + UpgradeNumber];
    }
}

//check for collision call function that makes money be added based on helper amount
function HelperColisionCheck(HelperCollisionEffect,UpgradeNumber)
{
    if(collide(GOBINDIV, HELPER1DIV) == false)
    {
        HelperCollisionEffect(UpgradeNumber)
    }
}

//stuff that i stole from stackoverflow

    // var AABB = {
    //     collide: function (el1, el2) {
    //       var rect1 = el1.getBoundingClientRect();
    //       var rect2 = el2.getBoundingClientRect();
      
    //       return !(
    //         rect1.top > rect2.bottom ||
    //         rect1.right < rect2.left ||
    //         rect1.bottom < rect2.top ||
    //         rect1.left > rect2.right
    //       );
    //     },
      
    //     inside: function (el1, el2) {
    //       var rect1 = el1.getBoundingClientRect();
    //       var rect2 = el2.getBoundingClientRect();
      
    //       return (
    //         ((rect2.top <= rect1.top) && (rect1.top <= rect2.bottom)) &&
    //         ((rect2.top <= rect1.bottom) && (rect1.bottom <= rect2.bottom)) &&
    //         ((rect2.left <= rect1.left) && (rect1.left <= rect2.right)) &&
    //         ((rect2.left <= rect1.right) && (rect1.right <= rect2.right))
    //       );
    //     }
    //   };
