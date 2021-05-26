import {Calendar} from "./Calendar.js";
import {Event} from "./Event.js";

var calendar = new Calendar();
var $ = document.querySelector.bind(document);

$("#calendar").addEventListener("wheel", (evt) => {
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
$("#backward").addEventListener("click", (evt) => calendar.backward(evt));
$("#forward").addEventListener("click", (evt) => calendar.forward(evt));
$("#today").addEventListener("click", (evt) => {
    calendar.date = new Date();
    calendar.applyDate(evt, calendar.date);
});

$("#month").addEventListener("click", function(evt){
    if(evt.target.innerHTML != 0){
        $("#add-event").style.display = "grid";
        $("#calendar").style.pointerEvents = "none";
        let event = new Event();
        event.begDate.begDay[evt.target.textContent-1].selected = true ;
        event.begDate.begMonth[calendar.date.getMonth()].selected = true;
        event.begDate.begYear.value = calendar.date.getFullYear();
    };
    
});