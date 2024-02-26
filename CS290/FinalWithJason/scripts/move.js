function showAlert(msg) {
    document.getElementById("da-gobin-div").onmouseover = function() {
        alert("Hover!");
    };
    alert(msg);
}

document.getElementById("da-gobin-div").onmouseover = function() {
    alert("Hover!");
};