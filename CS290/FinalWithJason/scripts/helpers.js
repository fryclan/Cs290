
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

let HelperUpgradeQuantity =
{
    "Type 1": 0,
    "Type 2": 0,
    "Type 3": 0,
};

let HelperUpgradeCollisionGoldIncrease =
{
    "Type 1": 1,
    "Type 2": 10,
    "Type 3": 100,
};

let HelperUpgradeCollisionGold =
{
    "Type 1": 0,
    "Type 2": 0,
    "Type 3": 0,
};

let HelperUpgradePrice =
{
    "Type 1": 10,
    "Type 2": 100,
    "Type 3": 1000,
};

let HelperUpgradeBasePrice =
{
    "Type 1": 10,
    "Type 2": 100,
    "Type 3": 1000,
};

let HelperPocketSize = 
{
    "Type 1": 0,
    "Type 2": 0,
    "Type 3": 0
};

let HelperPocketSizeBase = 
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
};


function HelperGoldRequest(UpgradeNumber)
{
    GOLDCOUNTDIV.innerHTML = Gold + HelperGold["Type " + UpgradeNumber];
    HelperGold["Type " + UpgradeNumber] = 0;
}

function HelperUpgrade(UpgradeNumber)
{
    UpgradeQuantity = HelperUpgradeQuantity["Type " + UpgradeNumber];
    UpgradePrice = HelperUpgradePrice["Type " + UpgradeNumber];
    PocketSize = HelperPocketSize["Type " + UpgradeNumber];
    PocketSizeBase = HelperPocketSizeBase["Type " + UpgradeNumber];
    UpgradeBasePrice = HelperUpgradeBasePrice["Type " + UpgradeNumber];
    CollisionGold = HelperUpgradeCollisionGold["Type " + UpgradeNumber];
    

    if (HELPER1DIV.style.opacity == 0) 
    {
        HELPER1DIV.style.opacity = 1;
    }
    if (Gold >= UpgradePrice)
    {
        Gold = Gold - UpgradePrice;
        GOLDCOUNTDIV.innerHTML = Gold;
        
        UpgradeQuantity += 1;
        UpgradePrice = UpgradeBasePrice * (2**UpgradeQuantity);
        PocketSize = PocketSizeBase * UpgradeQuantity;
        CollisionGold = HelperUpgradeCollisionGoldIncrease["Type " + UpgradeNumber] * UpgradeQuantity;

        document.getElementById("Helper" + UpgradeNumber).innerHTML =
            ("Helper " + UpgradeNumber + 
            "<br>CPC: " + (CollisionGold) + 
            "<br>PocketSize: " + (PocketSize) +
            "<br>Cost: " + UpgradePrice);
    }

    HelperUpgradeQuantity["Type " + UpgradeNumber] = UpgradeQuantity;
    HelperPocketSize["Type " + UpgradeNumber] = PocketSize;
    HelperUpgradePrice["Type " + UpgradeNumber] = UpgradePrice;
    HelperUpgradeCollisionGold["Type " + UpgradeNumber] = CollisionGold;
}

function HelperCollisionEffect(UpgradeNumber)
{
    if (HelperGold["Type " + UpgradeNumber] <= HelperPocketSize["Type " + UpgradeNumber]) 
    {
        HelperGold["Type " + UpgradeNumber] = Math.min(HelperGold["Type " + UpgradeNumber] + HelperUpgradeCollisionGold["Type " + UpgradeNumber], HelperPocketSize["Type " + UpgradeNumber]);
    }
}

//check for collision call function that applies the collision
function HelperColisionCheck(UpgradeNumber)
{
    if(collide(GOBINDIV, HELPER1DIV) == false|| inside(GOBINDIV, HELPER1DIV) == false)
    {
        HelperCollisionEffect(UpgradeNumber);
    }
}

function HelperHovered()
{
    
    if (!HoveringOrMoving)
    {
        // Turned back off at the end of the pause and animation.
        HoveringOrMoving = true;

        // The animation keyframes
        let HELPERWIGGLIN = FindCssRuleByName('helper1-wigglin');


        // Set the start and end points for the animation and final position.
        // OldLeft = NewLeft;
        // OldTop = NewTop;
        // NewTop = GetRandomInt(LOWERTOPBOUND, UPPERTOPBOUND);
        // NewLeft = GetRandomInt(LOWERLEFTBOUND, UPPERLEFTBOUND);

        // Pauses for a random delay between 0 and .5 seconds before moving.
        setTimeout(() =>
        {

            // Modify the CSS vars.
            ROOTSTYLE.setProperty('--helper-1-old-left', OldLeft+"%");
            ROOTSTYLE.setProperty('--helper-1-new-left', NewLeft+"%");
            ROOTSTYLE.setProperty('--helper-1-old-top', OldTop+"%");
            ROOTSTYLE.setProperty('--helper-1-new-top', NewTop+"%");

            // Add the class which contains the animation details to the gobin to begin the animation.
            HELPER1DIV.classList.add('da-helper1-div-animated');
            
            // Wait for the animation to end.
            setTimeout(function()
            {

                // Set the variables which tell the object where to stay after the end of the animation.
                ROOTSTYLE.setProperty('--helper-1-stay-left', NewLeft+"%");
                ROOTSTYLE.setProperty('--helper-1-stay-top', NewTop+"%");
                
                // Remove the class so it can re-add it to start the animation again.
                HELPER1DIV.classList.remove('da-helper1-div-animated');

                // Reset the variable so it can move when hovered again.
                HoveringOrMoving = false;

            }, MoveTime);

        }, GetRandomInt(0, 500));

    }

}
