window.addEventListener("DOMContentLoaded", init);

function init(){
    var months = ["January", "February", "March",
                    "April", "May", "June", "July",
                    "August", "September", "October",
                    "November", "December"];
    var today = new Date();
    var actualMonth = months[today.getMonth()];
    var actualYear = today.getFullYear();
    document.getElementById("label-date").innerHTML = actualMonth + ", " + actualYear;
}

function getAllDaysInAMonth(month,year){
    var respectiveDate = new Date();
}