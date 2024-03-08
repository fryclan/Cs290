let NewLeft = 50, NewTop = 50; // % accross the screen
let OldLeft = 50, OldTop = 50; 
const LOWERLEFTBOUND = 10, LOWERTOPBOUND = 10, UPPERLEFTBOUND = 90, UPPERTOPBOUND = 90; // Limits to where it can be

const HOVERDELAY = 300, IDLEMOVEDELAY = 5000; // Milliseconds

// Get the CSS root element to modify the vars.
let ROOTSTYLE;


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

// Slow Effect
const SLOWFACTOR = .25, DEFAULTCSSMOVETIME = 1, DEFAULTMOVETIME = 1000-25;
let MoveTime = DEFAULTMOVETIME, CSSMoveTime = DEFAULTCSSMOVETIME;


/**
 * Applies the given status effect.
 * @date 3/8/2024 - 1:31:09 PM
 *
 * @param {String} effect An item from the dictionary Stati.
 * @param {String} remove Set to true to remove the specified effect. Only works if time wasnn't used.
 * @param {String} time The duration of the effect in ms. 
 */
function applyStatusEffect(effect, remove = false, time = 0)
{
    if (effect === "Slowed")
    {
        if (!remove)
        {
            CSSMoveTime = DEFAULTCSSMOVETIME * SLOWFACTOR;
            MoveTime = DEFAULTMOVETIME * SLOWFACTOR;
        } else
        {
            CSSMoveTime = DEFAULTCSSMOVETIME;
            MoveTime = DEFAULTMOVETIME;
        }
        ROOTSTYLE.setProperty('--move-time', CSSMoveTime+"s");
    }


    // Optionally removes the effect after a delay
    if (time != 0) setTimeout(applyStatusEffect, time, arguments={"effect": effect, "remove": true});
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
    HELPER1DIV = document.getElementById('da-helper1-div');
    HELPER1DIV.onmouseover = HelperHovered;
    ROOTSTYLE = document.querySelector(':root').style;

    // Start CPS
    setInterval(CPSUpgradeInterval, 1000);

    // Anticheat and bug fixer move every 5 seconds
    setInterval(hovered, 5000);
    
    //start colision cheaks for helper1
    setInterval(HelperColisionCheck(1), 50);
    
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

                // TODO: Put actions that fire at the end of his motion here

            }, MoveTime);

        }, GetRandomInt(0, 500));

    }

}



/** Toggle between showing and hiding the navigation menu links when the user clicks on the hamburger menu / bar icon */
function UpgradeMenu()
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
    var x = document.getElementById("myLinks3");
    if (x.style.display === "block")
    {
      x.style.display = "none";
    }
    else
    {
      x.style.display = "block";
    }
}
