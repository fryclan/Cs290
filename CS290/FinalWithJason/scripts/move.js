let NewLeft = 50, NewTop = 50; // % accross the screen
let OldLeft = 50, OldTop = 50; 
const LOWERLEFTBOUND = 10, LOWERTOPBOUND = 10, UPPERLEFTBOUND = 90, UPPERTOPBOUND = 90; // Limits to where it can be

const HOVERDELAY = 300, IDLEMOVEDELAY = 5000, MOVETIME = 1000-25; // Milliseconds

let GOBINWIGGLIN;
let GOBINDIV;
let GoldCountDiv;

let Gold = 0;
let GoldIncrement = 1;
let CritMultiplier = 2;

let HoveringOrMoving = false;

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

function CPSUpgradeInterval()
{
    Gold += ChildProtectiveServicesUpgradeValue["Type 1"] * ChildProtectiveServicesUpgradePower["Type 1"];
    Gold += ChildProtectiveServicesUpgradeValue["Type 2"] * ChildProtectiveServicesUpgradePower["Type 2"];
    Gold += ChildProtectiveServicesUpgradeValue["Type 3"] * ChildProtectiveServicesUpgradePower["Type 3"];
    
    GoldCountDiv.innerHTML = Gold;
}

function ClickCounter(click)
{
    if (click == 'Normal thefting')
    {
        Gold = Gold + GoldIncrement + (GoldIncrement * Stati["PuncturedBag"]);
        GoldCountDiv.innerHTML = Gold;
    }
    else if (click == 'Crit!')
    {
        Gold = Gold + GoldIncrement * CritMultiplier + (GoldIncrement * CritMultiplier * Stati["PuncturedBag"]);
        GoldCountDiv.innerHTML = Gold;
    }
}

function Init()
{
    GoldCountDiv = document.getElementById('Gold')
    GOBINDIV = document.getElementById('da-gobin-div');
    GOBINDIV.onmouseover = hovered;

    // Start CPS
    setInterval(CPSUpgradeInterval, 1000);
}


/**
 * If you can't figure this out, you shouldn't touch it.
 * @date 2/28/2024 - 9:50:27 AM
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
 * @date 2/28/2024 - 9:46:30 AM
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
 * Run when hovering is detected or when a random shuffle is requested, randomizes the opsition of a character and moves there
 * @date 2/28/2024 - 10:06:09 AM
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
        GoldCountDiv.innerHTML = Gold;

        ChildProtectiveServicesUpgradeValue["Type " + UpgradeNumber] += 1;
        ChildProtectiveServicesUpgradePrice["Type " + UpgradeNumber] *= 2;
        UpgradeCost = ChildProtectiveServicesUpgradePrice["Type " + UpgradeNumber];
        document.getElementById("CPS type " + UpgradeNumber).innerHTML =
            ("CPS Upgrade type " + UpgradeNumber +
            "<br>CPS: " + (ChildProtectiveServicesUpgradeValue["Type " + UpgradeNumber] * ChildProtectiveServicesUpgradePower["Type " + UpgradeNumber]) +
            "<br>Cost: " + UpgradeCost)
    }
}

function CpcButton(UpgradeNumber)
{
    
    let UpgradeCost = CPCUpgradePrice["Type " + UpgradeNumber];
    if (Gold >= UpgradeCost)
    {
        Gold = Gold - UpgradeCost;
        GoldCountDiv.innerHTML = Gold;

        CPCUpgradeValue["Type " + UpgradeNumber] += 1;
        CPCUpgradePrice["Type " + UpgradeNumber] *= 2;
        UpgradeCost = CPCUpgradePrice["Type " + UpgradeNumber];
        document.getElementById("CPC type " + UpgradeNumber).innerHTML =
            ("CPC Upgrade type " + UpgradeNumber +
            "<br>CPC: " + (CPCUpgradeValue["Type " + UpgradeNumber] * CPCUpgradePower["Type " + UpgradeNumber]) +
            "<br>Cost: " + UpgradeCost);
        GoldIncrement = CPCUpgradeValue["Type " + UpgradeNumber]*CPCUpgradePower["Type " + UpgradeNumber];
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

