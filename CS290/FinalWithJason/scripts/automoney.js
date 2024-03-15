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



    // Checks to see if it's the most gold you've ever had
    if (Gold > MostGold)
    {
        MostGold = Gold;
        Send(MostGold);
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


function Send(amount)
{
    
}