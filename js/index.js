import {Calendar} from "./calendar.js";
import {BegTime} from "./event.js";
import {EndDate} from "./event.js";
import {EndTime} from "./event.js";
import {Address} from "./event.js";
import {Description} from "./event.js";
import {setAllowedDays} from "./support-functions.js";
import {getAllDaysInAMonth} from "./support-functions.js";

var calendar = new Calendar();

document.getElementById("calendar").addEventListener("wheel", (evt) => {
    evt.preventDefault();
    if(evt.deltaY < 0){
        calendar.forward(evt);
    }else{
        calendar.backward(evt);
    }
});

window.addEventListener("DOMContentLoaded", (evt) => {
    calendar.applyDate(evt, calendar.date);
});
document.getElementById("backward").addEventListener("click", (evt) => calendar.backward(evt));
document.getElementById("forward").addEventListener("click", (evt) => calendar.forward(evt));
document.getElementById("today").addEventListener("click", (evt) => {
    calendar.date = new Date();
    calendar.applyDate(evt, calendar.date);
});

document.getElementById("month").addEventListener("click", function(evt){
    if(evt.target.innerHTML != 0){
        document.getElementById("add-event").style.display = "grid";
        document.getElementById("calendar").style.pointerEvents = "none";
        begDateValidation(evt);
    };
    
});

function begDateValidation(evt){
    let begDays = document.getElementById("beg-day").getElementsByTagName("option");
    let begMonth = document.getElementById("beg-month").getElementsByTagName("option");
    let begYear = document.getElementById("beg-year");
    begDays[evt.target.innerHTML-1].selected = true;
    begMonth[calendar.date.getMonth()].selected = true;
    begYear.value = calendar.date.getFullYear();
    let daysInTheMonth = getAllDaysInAMonth(calendar.date.getFullYear(),calendar.date.getMonth());
    setAllowedDays(begDays, daysInTheMonth);    
    document.getElementById("beg-year").addEventListener("input", evt => {
        console.log(evt.target.value);
        console.log(document.getElementById("beg-month").value-1);
        console.log(getAllDaysInAMonth(evt.target.value, document.getElementById("beg-month").value[1]-1));
        if((document.getElementById("beg-month").value-1) < 10){
            setAllowedDays(begDays, getAllDaysInAMonth(evt.target.value, document.getElementById("beg-month").value[1]-1));
        }else{
            setAllowedDays(begDays, getAllDaysInAMonth(evt.target.value, document.getElementById("beg-month").value-1)); 
        }
    });
    document.getElementById("beg-month").addEventListener("change", evt => {
        console.log(evt.target.value-1);
        console.log(document.getElementById("beg-year").value);
        console.log(getAllDaysInAMonth(document.getElementById("beg-year").value, evt.target.value[1]-1));
        if((evt.target.value-1) < 10){
            setAllowedDays(begDays, getAllDaysInAMonth(document.getElementById("beg-year").value, evt.target.value[1]-1)); 
        }else{
            setAllowedDays(begDays, getAllDaysInAMonth(document.getElementById("beg-year").value, evt.target.value-1)); 
        }
    });
};

var begTime = new BegTime();

var endDate = new EndDate();

var endTime = new EndTime();

var address = new Address();

var description = new Description();

//Cancel will have to reset all the elements created by the buttons
document.getElementById("cancel").addEventListener("click", function(){
    document.getElementById("add-event").style.display = "none";
    document.getElementById("calendar").style.pointerEvents = "auto";    
});

// document.getElementById("add").addEventListener("click", function(){

// });