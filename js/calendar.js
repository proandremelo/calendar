

function Calendar(){
    this.date = new Date();
    this.months = ["January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"];
    this.days = document.getElementById("month").querySelectorAll("div");
    // this.actualDay = this.days[this.date.getDay() + this.date.getDate() - 1];
    this.actualDay = this.date.getDate();
    this.actualDayPosition = 0;
    this.actualWeekDay = this.date.getDay();
    this.actualMonth = this.date.getMonth();
    this.actualYear = this.date.getFullYear();
};
Calendar.prototype.applyDate = function(evt, dateToBeApplied){
    document.getElementById("label-date").innerHTML = 
        this.months[dateToBeApplied.getMonth()] + ", " + dateToBeApplied.getFullYear();
    dateToBeApplied.setDate(1);
    if(evt.type == "DOMContentLoaded" || evt.target.id == "today" || 
    (dateToBeApplied.getFullYear() == this.actualYear && dateToBeApplied.getMonth() == this.actualMonth)){
        this.actualDayPosition = this.actualDay + dateToBeApplied.getDay() - 1;
        this.days[this.actualDayPosition].style.borderColor = "red";
        
    }else{
        this.days[this.actualDayPosition].style.borderColor = "";
    }
    this.days.forEach(day => day.innerHTML = "");
    let allDaysInAMonth = getAllDaysInAMonth(dateToBeApplied.getFullYear(),dateToBeApplied.getMonth());
    for(let i = 0; i < allDaysInAMonth; i++){
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
        // console.log("Leap Year: " + maxDays[month]++);
        return maxDays[month]+1;
    }else{
        // console.log("Normal Year: " + maxDays[month]);
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

window.addEventListener("DOMContentLoaded", (evt) => {
    calendar.applyDate(evt, calendar.date);
});
document.getElementById("backward").addEventListener("click", (evt) => {
    if(calendar.date.getMonth()-1 == -1){
        calendar.date = new Date(calendar.date.getFullYear()-1, 11);
    }else{
        calendar.date = new Date(calendar.date.getFullYear(), calendar.date.getMonth()-1);
    }
    calendar.applyDate(evt, calendar.date);
});
document.getElementById("forward").addEventListener("click", (evt) => {
    if(calendar.date.getMonth()+1 == 12){
        calendar.date = new Date(calendar.date.getFullYear()+1, 0);
    }else{
        calendar.date = new Date(calendar.date.getFullYear(), calendar.date.getMonth()+1);
    }
    calendar.applyDate(evt, calendar.date);
});
document.getElementById("today").addEventListener("click", (evt) => {
    calendar.date = new Date();
    calendar.applyDate(evt, calendar.date);
});
document.getElementById("events").addEventListener("click", (evt) => {
    let windowFeatures = "height=500,width=450,left=450,top=150,"+
    "menubar=no,toolbar=yes,location=yes,status=yes,scrollbars=yes";
    window.open("../html/test.html","Events",windowFeatures);
});

var months = document.getElementById("month").querySelectorAll("div");
// console.log(months);
months.forEach(month => month.addEventListener("click", function(evt){
    if(evt.target.innerHTML != 0){
        window.alert("Day clicked: " + evt.target.innerHTML);
    };
}));