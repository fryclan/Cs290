// Create an object with the data you want to send
let DataToSend = { Type: "Points", Username: 'john_doe', Password: "Password", Points: MostData };
let DataToReceive = { Type: "SignIn", Username: 'john_doe', Password: "Password" };
let DataToSave = { Type: "Save", Username: 'john_doe', Password: "Password", Data: {} };

// Make a POST request to the server
function SendData (Data)
{
    fetch('/api/user', {
        method: 'POST',
        headers: {
            'Content-Type': 'text/json', // Set the content type
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
    Data["ChildProtectiveServicesValue"] = ChildProtectiveServicesValue;
    Data["CPCValue"] = CPCValue;
    Data["HelperUpgradeQuantity"] = HelperUpgradeQuantity;
    Data["ChildProtectiveServicesValue"] = ChildProtectiveServicesValue;
    Data["HelperGold"] = HelperGold;

    DataToSave = { Type: "Save", Username: 'john_doe', Password: "Password", Data: data };
    SendData(DataToSave);
}


function LoadData(Data)
{
    Gold = Data["Gold"];
    MaxGold = Data["MaxGold"];

    LoadCPS(Data["ChildProtectiveServicesValue"]);
    LoadCPC(Data["ChildProtectiveServicesValue"]);
    LoadHelper(Data["ChildProtectiveServicesValue"]);

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







// $(document).ready(function() {
//     $('#loginForm').submit(function(event) {
//         event.preventDefault(); // Prevent default form submission

//         // Get username and password from form inputs
//         var username = $('#username').val();
//         var password = $('#password').val();

//         // Send AJAX POST request
//         $.ajax({
//             type: 'POST',
//             url: '/login', // Specify your server endpoint
//             data: { username: username, password: password },
//             success: function(response) {
//                 // Handle successful response from server
//                 console.log('Login successful');
//                 // Redirect or update UI as needed
//             },
//             error: function(xhr, status, error) {
//                 // Handle error response from server
//                 console.error('Login failed:', error);
//                 // Display error message or take appropriate action
//             }
//         });
//     });
// });
