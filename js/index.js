import {Calendar} from "./calendar.js";
import {setAllowedDays} from "./support-functions.js";
import {buttonToText} from "./support-functions.js";
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
        if((document.getElementById("beg-month").value-1) < 10){
            setAllowedDays(begDays, getAllDaysInAMonth(evt.target.value, document.getElementById("beg-month").value[1]-1));
        }else{
            setAllowedDays(begDays, getAllDaysInAMonth(evt.target.value, document.getElementById("beg-month").value-1)); 
        }
    });
    document.getElementById("beg-month").addEventListener("change", evt => {
        if((evt.target.value-1) < 10){
            setAllowedDays(begDays, getAllDaysInAMonth(document.getElementById("beg-year").value, evt.target.value[1]-1)); 
        }else{
            setAllowedDays(begDays, getAllDaysInAMonth(document.getElementById("beg-year").value, evt.target.value-1)); 
        }
    });
};

//                       **************     EVENTS OF "ADD-EVENT"   *****************


// document.getElementById("title").addEventListener("click", function(){

// });

document.getElementById("beg-time").addEventListener("click", evt => buttonToText(evt));

document.getElementById("end-date").addEventListener("click", evt => buttonToText(evt));

document.getElementById("end-time").addEventListener("click", evt => buttonToText(evt));

document.getElementById("address").addEventListener("click", evt => buttonToText(evt));

document.getElementById("description").addEventListener("click", evt => buttonToText(evt));

//Cancel will have to reset all the elements created by the buttons
document.getElementById("cancel").addEventListener("click", function(){
    document.getElementById("add-event").style.display = "none";
    document.getElementById("calendar").style.pointerEvents = "auto";    
});

// document.getElementById("add").addEventListener("click", function(){

// });