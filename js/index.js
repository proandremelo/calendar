import {Calendar} from "./calendar.js";
import {BegDate} from "./event.js";
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
        // begDateValidation(evt);

        let begDate = new BegDate();

        begDate.begDay[evt.target.textContent-1].selected = true ;
        begDate.begMonth[calendar.date.getMonth()].selected = true;
        begDate.begYear.value = calendar.date.getFullYear();

        let begTime = new BegTime();

        let endDate = new EndDate();

        let endTime = new EndTime();

        let address = new Address();

        let description = new Description();
    };
    
});

//Cancel will have to reset all the elements created by the buttons
document.getElementById("cancel").addEventListener("click", function(){
    document.getElementById("add-event").style.display = "none";
    document.getElementById("calendar").style.pointerEvents = "auto";    
});

// document.getElementById("add").addEventListener("click", function(){

// });