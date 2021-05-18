import {getAllDaysInAMonth} from "./support-functions.js";

export function Calendar(){
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
Calendar.prototype.forward = function(evt){
    if(this.date.getMonth()+1 == 12){
        this.date = new Date(this.date.getFullYear()+1, 0);
    }else{
        this.date = new Date(this.date.getFullYear(), this.date.getMonth()+1);
    }
    this.applyDate(evt, this.date);
};
Calendar.prototype.backward = function(evt){
    if(this.date.getMonth()-1 == -1){
        this.date = new Date(this.date.getFullYear()-1, 11);
    }else{
        this.date = new Date(this.date.getFullYear(), this.date.getMonth()-1);
    }
    this.applyDate(evt, this.date);
};