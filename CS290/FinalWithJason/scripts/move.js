let newLeft = 50, newTop = 50; // % accross the screen
let oldLeft = 50, oldTop = 50; 
const LOWERLEFTBOUND = 10, LOWERTOPBOUND = 10, UPPERLEFTBOUND = 90, UPPERTOPBOUND = 90; 

const HOVERDELAY = 300, IDLEMOVEDELAY = 5000, MOVETIME = 1000-25; // Milliseconds

let GOBINWIGGLIN;
let GOBINDIV;
let GoldCountDiv;
let gold = Number("0");

let hoveringOrMoving = false;

let Stati = {
    "Slowed": 0,
    "Restrained": 0,
    "Vulnerable": 0,
    "Distracted": 0,
    "PuncturedBag": 0,
};
// Usage:
// dict["some invalid key (for multiple reasons)"] = "value1";

function ClickCounter(click)
{
    if (click == 'Normal thefting')
    {
        gold = gold + 1;
        GoldCountDiv.innerHTML = gold;
    }
    else if (click == 'Crit!')
    {
        gold = gold + 2;
        GoldCountDiv.innerHTML = gold;
    }
}

function init() 
{
    GoldCountDiv = document.getElementById('Gold')
    GOBINDIV = document.getElementById('da-gobin-div');
    GOBINDIV.onmouseover = hovered;
}


/**
 * If you can't figure this out, you shouldn't touch it.
 * @date 2/28/2024 - 9:50:27 AM
 *
 * @param {Number} min The lowest number it can output.
 * @param {Number} max The highest number it can output.
 * @returns {Number} A random number between the two, inclusive.
 */
function getRandomInt(min, max)
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


/**
 * Searches throughout all attatched CSS files to find the specified rule. Used here primarily to get keyframes.
 * @date 2/28/2024 - 9:46:30 AM
 *
 * @param {String} selector The name of the rule being searched for.
 * @returns {CSSRule} The variable containing the rule.
 */
function findCssRuleByName(selector) {
    const styleSheets = document.styleSheets;
  
    for (const sheet of styleSheets) {
        try {
            const rules = sheet.cssRules || sheet.rules;
            for (const rule of rules) {
                if (rule.name === selector) {
                return rule;
                }
            }
        } catch (e) {
            console.warn("Can't read the css rules of: " + sheet.href, e);
        }
    }
  
    return null;
}


/**
 * Run when hovering is detected or when a random shuffle is requested, randomizes the opsition of a character and moves there
 * @date 2/28/2024 - 10:06:09 AM
 */
function hovered() {
    
    if (!hoveringOrMoving) {
        // Turned back off at the end of the pause and animation.
        hoveringOrMoving = true;

        // The animation keyframes
        GOBINWIGGLIN = findCssRuleByName('gobin-wigglin');


        // Set the start and end points for the animation and final position.
        oldLeft = newLeft;
        oldTop = newTop;
        newTop = getRandomInt(LOWERTOPBOUND, UPPERTOPBOUND);
        newLeft = getRandomInt(LOWERLEFTBOUND, UPPERLEFTBOUND);

        // Pauses for a random delay between 0 and .5 seconds before moving.
        setTimeout(() => {

            // Get the CSS root element to modify the vars.
            const ROOTSTYLE = document.querySelector(':root').style;

            // Modify the CSS vars.
            ROOTSTYLE.setProperty('--old-left', oldLeft+"%");
            ROOTSTYLE.setProperty('--new-left', newLeft+"%");
            ROOTSTYLE.setProperty('--old-top', oldTop+"%");
            ROOTSTYLE.setProperty('--new-top', newTop+"%");

            // Add the class which contains the animation details to the gobin to begin the animation.
            GOBINDIV.classList.add('da-gobin-div-animated');
            
            // Wait for the animation to end.
            setTimeout(function() {

                // Set the variables which tell the object where to stay after the end of the animation.
                ROOTSTYLE.setProperty('--stay-left', newLeft+"%");
                ROOTSTYLE.setProperty('--stay-top', newTop+"%");
                
                // Remove the class so it can re-add it to start the animation again.
                GOBINDIV.classList.remove('da-gobin-div-animated');

                // Reset the variable so it can move when hovered again.
                hoveringOrMoving = false;

            }, MOVETIME);

        }, getRandomInt(0, 500));

    }

}

function CpsButton()
{
    if (gold >= 10)
    {
        gold = gold-10;
        GoldCountDiv.innerHTML = gold;
        setInterval(CpsAddition, 1000);
    }
}
function CpsAddition()
{
    gold = gold+1;
    GoldCountDiv.innerHTML = gold;
}

/* Toggle between showing and hiding the navigation menu links when the user clicks on the hamburger menu / bar icon */
function myFunction() {
    var x = document.getElementById("myLinks");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
}

