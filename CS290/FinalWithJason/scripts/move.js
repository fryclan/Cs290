let newLeft = 50, newTop = 50; // % accross the screen
let oldLeft = 50, oldTop = 50; 
const LOWERLEFTBOUND = 10, LOWERTOPBOUND = 10, UPPERLEFTBOUND = 90, UPPERTOPBOUND = 90; 

const HOVERDELAY = 300, IDLEMOVEDELAY = 5000, MOVETIME = 3000; // Milliseconds

let GOBINWIGGLIN;
let GOBINDIV;

let hoveringOrMoving = false;


function showAlert(msg) {
    alert(msg);
}

function init() {
    GOBINDIV = document.getElementById('da-gobin-div');
    GOBINDIV.onmouseover = hovered;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function findCssRuleByName(selector) {
    const styleSheets = document.styleSheets;
    const sheet = styleSheets[1];
  
    // for (const sheet of styleSheets) {
        try {
            const rules = sheet.cssRules || sheet.rules;
            for (const rule of rules) {
                if (rule.name === selector) {
                return rule; // Found the matching rule
                }
            }
        } catch (e) {
            console.warn("Can't read the css rules of: " + sheet.href, e);
        }
    // }
  
    return null; // Rule not found
}

function hovered() {
    
    if (!hoveringOrMoving) {

        GOBINWIGGLIN = findCssRuleByName('gobin-wigglin');

        // Turned back off at the end of the pause and animation.
        hoveringOrMoving = true;

        // Set the start and end points for the animation.
        oldLeft = newLeft;
        oldTop = newTop;
        newTop = getRandomInt(LOWERTOPBOUND, UPPERTOPBOUND);
        newLeft = getRandomInt(LOWERLEFTBOUND, UPPERLEFTBOUND);

        setTimeout(() => {

            // Set new default values for after the animation.
            GOBINDIV.style.left = `${newLeft}%`; // Set your desired left value (e.g., 50%)
            GOBINDIV.style.top = `${newTop}%`; // Set your desired top value (e.g., 20%)

            // Modify the animation.
            // Replace old with new 0%
            GOBINWIGGLIN.deleteRule('0%');
            GOBINWIGGLIN.appendRule(`0% { left: ${oldLeft}%; top: ${oldTop}%; }`);
            // Replace old with new 100%
            GOBINWIGGLIN.deleteRule('100%');
            GOBINWIGGLIN.appendRule(`100% { left: ${newLeft}%; top: ${newTop}%; }`);
            
            // Add the animation.
            GOBINDIV.classList.add('da-gobin-div-animation');

            // Listen for the end of the animation to remove it so it can be re-added later and allow hovering again.
            setTimeout(() => {
                hoveringOrMoving = false;
                GOBINDIV.classList.remove('da-gobin-div-animation');
            }, MOVETIME);

        }, HOVERDELAY);

    }

}

