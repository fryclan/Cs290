function Leaderboard()
{
    var x = document.getElementById("LeaderboardDiv");
    if (x.style.display === "block")
    {
      x.style.display = "none";
    }
    else
    {
      x.style.display = "block";
    }
}


loadDoc()
{
    const xhttp = new XMLHttpRequest();
    xhttp.onload = funtion()
    {
        document.getElementById("LeaderboardParagraph").innerHTML = this.responseText;
    }
    xhttp.open("GET", "Leaderboard.txt");
    xhttp.send();
}
