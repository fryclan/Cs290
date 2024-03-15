let ChildProtectiveServicesValue =
{
    "Type 1": 0,
    "Type 2": 0,
    "Type 3": 0,
};

let ChildProtectiveServicesPower =
{
    "Type 1": 1,
    "Type 2": 10,
    "Type 3": 100,
};

let ChildProtectiveServicesPrice =
{
    "Type 1": 10,
    "Type 2": 100,
    "Type 3": 1000,
};

let ChildProtectiveServicesBasePrice =
{
    "Type 1": 10,
    "Type 2": 100,
    "Type 3": 1000,
};

let CPCValue =
{
    "Type 1": 0,
    "Type 2": 0,
    "Type 3": 0,
};

let CPCPower =
{
    "Type 1": 1,
    "Type 2": 10,
    "Type 3": 100,
};

let CPCPrice =
{
    "Type 1": 10,
    "Type 2": 100,
    "Type 3": 1000,
};

let CPCBasePrice =
{
    "Type 1": 10,
    "Type 2": 100,
    "Type 3": 1000,
};


/**
 * Runs on an interval to increase your gold based on the current CPS.
 */
function CPSUpgradeInterval() {
    Gold += GoldSecondIncrement;

    GOLDCOUNTDIV.innerHTML = Gold;



    // // Checks to see if it's the most gold you've ever had
    // if (Gold > MostGold)
    // {
    //     MostGold = Gold;
    //     Send(MostGold);
    // }
}


function RefreshGoldIncrement() {
    GoldSecondIncrement = 0;

    for (let i = 1; i < 4; i++) {
        GoldSecondIncrement += ChildProtectiveServicesValue["Type " + i] * ChildProtectiveServicesPower["Type " + i];
    }

    for (let i = 1; i < 4; i++) {
        GoldClickIncrement += CPCValue["Type " + i] * CPCPower["Type " + i];
    }
}


/**
 * Upgrades the money earned per second if you have enough money.
 * @date 3/15/2024 - 12:37:54 PM
 *
 * @param {*} UpgradeNumber
 */
function CpsButton(UpgradeNumber) {

    let UpgradeCost = ChildProtectiveServicesPrice["Type " + UpgradeNumber];
    if (Gold >= UpgradeCost) {
        Gold = Gold - UpgradeCost;
        GOLDCOUNTDIV.innerHTML = Gold;

        ChildProtectiveServicesValue["Type " + UpgradeNumber] += 1;
        let UpgradeValue = ChildProtectiveServicesValue["Type " + UpgradeNumber];
        ChildProtectiveServicesPrice["Type " + UpgradeNumber] = ChildProtectiveServicesBasePrice["Type " + UpgradeNumber] * 2 ** UpgradeValue;

        UpgradeCost = ChildProtectiveServicesPrice["Type " + UpgradeNumber];

        document.getElementById("CPS type " + UpgradeNumber).innerHTML =
            ("CPS Upgrade type " + UpgradeNumber +
                "<br>CPS: " + (UpgradeValue * ChildProtectiveServicesPower["Type " + UpgradeNumber]) +
                "<br>Cost: " + UpgradeCost)
        RefreshGoldIncrement();
        // GoldSecondIncrement += ChildProtectiveServicesPower["Type " + UpgradeNumber];
        CPCDIV.innerHTML = "Clicks Per Clicks: " + GoldClickIncrement + " || " + "Clicks Per Second: " + GoldSecondIncrement;
    }
}


/**
 * Upgrades the value of a click if you have enough money.
 * @date 3/8/2024 - 11:01:51 AM
 *
 * @param {number} UpgradeNumber The click upgrade type
 */
function CpcButton(UpgradeNumber) {

    let UpgradeCost = CPCPrice["Type " + UpgradeNumber];
    if (Gold >= UpgradeCost) {
        Gold = Gold - UpgradeCost;
        GOLDCOUNTDIV.innerHTML = Gold;

        CPCValue["Type " + UpgradeNumber] += 1;
        CPCPrice["Type " + UpgradeNumber] *= 2;
        UpgradeCost = CPCPrice["Type " + UpgradeNumber];
        document.getElementById("CPC type " + UpgradeNumber).innerHTML =
            ("CPC Upgrade type " + UpgradeNumber +
                "<br>CPC: " + (CPCValue["Type " + UpgradeNumber] * CPCPower["Type " + UpgradeNumber]) +
                "<br>Cost: " + UpgradeCost);
        RefreshGoldIncrement();
        CPCDIV.innerHTML = "Clicks Per Clicks: " + GoldClickIncrement + " || " + "Clicks Per Second: " + GoldSecondIncrement;
    }
}


/**
 * Runs on a click, detects the type, runs a chance of running away, and adds gold.
 *
 * @param {string} click The type of click. Options are: ['Normal thefting', 'Crit!']
 */
function ClickCounter(click) {
    if (click == 'Normal thefting') {
        Gold = Gold + GoldClickIncrement * (1 + Stati["PuncturedBag"]);
        GOLDCOUNTDIV.innerHTML = Gold;
    }
    else if (click == 'Crit!') {
        Gold = Gold + GoldClickIncrement * CritMultiplier * (1 + Stati["PuncturedBag"]);
        GOLDCOUNTDIV.innerHTML = Gold;
    }

    // Anti-autoclicker
    ClicksTillMove -= 1;
    if (ClicksTillMove == 0) {
        ClicksTillMove = GetRandomInt(1, 5);
        hovered();
    }
}