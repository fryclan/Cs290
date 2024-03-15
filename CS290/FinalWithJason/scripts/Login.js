// Create an object with the data you want to send
let DataToSend = { Type: "Points", Username: 'john_doe', Password: "Password", Points: 0 };
let DataToReceive = { Type: "SignIn", Username: 'john_doe', Password: "Password" };
let DataToSave = { Type: "Save", Username: 'john_doe', Password: "Password", Data: SaveData() };

// Make a POST request to the server
function SendData (Data)
{
    fetch('/api/user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', // Set the content type
        },
        body: JSON.stringify(Data), // Serialize the data
    })
    .then(response => response.json())
    .then(data => {
        console.log('Data received from server:', data);
        // Handle the server response here -- Maybe
    })
    .catch(error => {
        console.error('Error sending data:', error);
        // Handle errors -- No
    });
}


function SaveData()
{
    Data = {};

    Data["Gold"] = Gold;
    Data["MaxGold"] = MaxGold;
    Data["ChildProtectiveServicesUpgradeValue"] = ChildProtectiveServicesValue;
    Data["CPCUpgradeValue"] = CPCValue;
    Data["HelperUpgradeQuantity"] = HelperUpgradeQuantity;
    Data["ChildProtectiveServicesUpgradeValue"] = ChildProtectiveServicesValue;
    Data["HelperGold"] = HelperGold;

    return Data
}


function LoadData(Data)
{
    Gold = Data["Gold"];
    MaxGold = Data["MaxGold"];

    UpgradeCPS(Data["ChildProtectiveServicesUpgradeValue"]);
    UpgradeCPC(Data["ChildProtectiveServicesUpgradeValue"]);
    UpgradeHelper(Data["ChildProtectiveServicesUpgradeValue"]);

    HelperGold = Data["HelperGold"];
}


/**
 * Toggle between showing and hiding the navigation menu links when the user clicks on the hamburger menu / bar icon
 */
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
    var x = document.getElementById("myLinks4");
    if (x.style.display === "block")
    {
      x.style.display = "none";
    }
    else
    {
      x.style.display = "block";
    }
}

function openForm() 
{
    if (!SignedIn)
    {
        document.getElementById("myForm").style.display = "block";
    }
    else
    {
        document.getElementById("signed-in-menu").style.display = "block";
    }
}

function closeForm() 
{
    document.getElementById("myForm").style.display = "none";
    document.getElementById("signed-in-menu").style.display = "none";
}