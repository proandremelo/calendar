import {Calendar} from "./calendar.js";
import {Event} from "./event.js";

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
        let event = new Event();
        event.begDate.begDay[evt.target.textContent-1].selected = true ;
        event.begDate.begMonth[calendar.date.getMonth()].selected = true;
        event.begDate.begYear.value = calendar.date.getFullYear();
    };
    
});

//Cancel will have to reset all the elements created by the buttons
document.getElementById("cancel").addEventListener("click", function(){
    document.getElementById("add-event").style.display = "none";
    document.getElementById("calendar").style.pointerEvents = "auto";    
});

// document.getElementById("add").addEventListener("click", function(){

// });