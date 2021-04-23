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
    var daysInCalendar =  document.getElementById("month").querySelectorAll("input");
    var thisMonth = new Date(today.getFullYear(),today.getMonth());
    for(let i = 0, day = thisMonth.getDate(), week = thisMonth.getDay();
     i < getAllDaysInAMonth(thisMonth.getMonth(),thisMonth.getFullYear()); i++, day++, week++){
        daysInCalendar[week].value = day;
    }
}

function getAllDaysInAMonth(month,year){
    let maxDays = {
        "0" : 31,
        "1" : 28,
        "2" : 31,
        "3" : 30,
        "4" : 31,
        "5" : 30,
        "6" : 31,
        "7" : 31,
        "8" : 30,
        "9" : 31,
        "10" : 30,
        "12" : 31
    };
    if(leapYear(year) && month == 1){
        return maxDays[month]++;
    }else{
        return maxDays[month];
    }
}

function leapYear(year){
    if(year % 4 === 0){
        return true;
    }else{
        return false;
    }
}