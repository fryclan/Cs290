


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
            "<br>CPC: " + (HelperUpgradeValue["Type " + UpgradeNumber] * HelperUpgradeCollisionGold["Type " + UpgradeNumber]) +
            "<br>PocketSize: " + (HelperPocketSize["Type " + UpgradeNumber]) +
            "<br>Cost: " + UpgradeCost);
        HelperCollisionGold["Type " + UpgradeNumber] += HelperUpgradeCollisionGold["Type " + UpgradeNumber];
        
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
function HelperColisionCheck(HelperCollisionEffect, UpgradeNumber)
{
    if(collide(GOBINDIV, HELPER1DIV) == false)
    {
        HelperCollisionEffect(UpgradeNumber)
    }
}