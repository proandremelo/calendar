

function Calendar(){
    this.date = new Date();
    this.months = ["January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"];
    this.days = document.getElementById("month").querySelectorAll("div");
};
Calendar.prototype.applyDate = function(dateToBeApplied){
    console.log("Calling applyDate");
    document.getElementById("label-date").innerHTML = 
        this.months[dateToBeApplied.getMonth()] + ", " + dateToBeApplied.getFullYear();
    dateToBeApplied.setDate(1);
    this.days.forEach(day => day.innerHTML = "");
    for(let i = 0; i < getAllDaysInAMonth(dateToBeApplied.getFullYear(),dateToBeApplied.getMonth()); i++){
        this.days[i + dateToBeApplied.getDay()].innerHTML = i + 1;
    };
};
Calendar.prototype.events = function(){
    
};
Calendar.prototype.addEvent = function(){

};

function getAllDaysInAMonth(year,month){
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
        "11" : 31
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

var calendar = new Calendar();

window.addEventListener("DOMContentLoaded", calendar.applyDate(calendar.date));
document.getElementById("backward").addEventListener("click", function(){
    if(calendar.date.getMonth()-1 == -1){
        calendar.date = new Date(calendar.date.getFullYear()-1, 11);
    }else{
        calendar.date = new Date(calendar.date.getFullYear(), calendar.date.getMonth()-1);
    }
    calendar.applyDate(calendar.date);
});
document.getElementById("forward").addEventListener("click", function(){
    if(calendar.date.getMonth()+1 == 12){
        calendar.date = new Date(calendar.date.getFullYear()+1, 0);
    }else{
        calendar.date = new Date(calendar.date.getFullYear(), calendar.date.getMonth()+1);
    }
    calendar.applyDate(calendar.date);
});
document.getElementById("today").addEventListener("click", function(){
    calendar.date = new Date();
    calendar.applyDate(calendar.date);
});
document.getElementById("events").addEventListener("click", function(){
    window.alert("event clicked!");
});

var months = document.getElementById("month").querySelectorAll("div");
console.log(months);
months.forEach(month => month.addEventListener("click", function(evt){
    if(evt.target.innerHTML != 0){
        window.alert("Day clicked: " + evt.target.innerHTML);
    };
}));