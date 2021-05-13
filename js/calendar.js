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

// var months = document.getElementById("month").querySelectorAll("div");
// // console.log(months);
// months.forEach(month => month.addEventListener("click", function(evt){
//     if(evt.target.innerHTML != 0){
//         document.getElementById("add-event").style.display = "grid";
//         document.getElementById("calendar").style.pointerEvents = "none";
//         begDateValidation(evt);
//     };
    
// }));

document.getElementById("month").addEventListener("click", function(evt){
    if(evt.target.innerHTML != 0){
        document.getElementById("add-event").style.display = "grid";
        document.getElementById("calendar").style.pointerEvents = "none";
        begDateValidation(evt);
    };
    
});

//Need to add eventListener onchange on begMonth to change the number of begDays
function begDateValidation(evt){
    let begDays = document.getElementById("beg-day").getElementsByTagName("option");
    let begMonth = document.getElementById("beg-month").getElementsByTagName("option");
    let begYear = document.getElementById("beg-year").getElementsByTagName("option");
    begDays[evt.target.innerHTML-1].selected = true;
    begMonth[calendar.date.getMonth()].selected = true;
    setAllowedYears(begYear, calendar.date.getFullYear());
    setAllowedMonths(begMonth, calendar.date.getMonth());
    let daysInTheMonth = getAllDaysInAMonth(calendar.date.getFullYear(),calendar.date.getMonth());
    setAllowedDays(begDays, daysInTheMonth);    
    document.getElementById("beg-year").addEventListener("change", evt => {
        // if(evt.target.value > calendar.date.getFullYear()){
        //     for(let i = 0; i < begMonth.length; i++){
        //         begMonth[i].style.display = "inline";
        //     }
        // }else{
        //     setAllowedMonths(begMonth, calendar.date.getMonth());
        // }
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
}

// function setAllowedYears(begYear, selectedYear){
//     for(let i = 0; i<begYear.length;i++){
//         begYear[i].innerHTML = parseInt(selectedYear, 10) + i;
//     };
// }

// function setAllowedMonths(begMonth, seletedMonth){
//     for(let i = seletedMonth; i > 0; i--){
//         begMonth[i-1].style.display = "none";
//     };
// }

function setAllowedDays(begDays, selectedDays){
    for(let i = selectedDays;i<begDays.length;i++){
        begDays[i].style.display = "none";
    }
}

// function EventValidator(){

// };

// function Title(){

// };

// function BegDate(){

// };

// function BegTime(){

// };

// function EndDate(){

// };

// function EndTime(){

// };

// function Address(){
    
// };

// function Description(){

// };

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

function buttonToText(evt){
    let btn = evt.target;
    if(btn.id == "end-date"){
        setAllowedYears(document.getElementById("end-year").getElementsByTagName("option"), document.getElementById("beg-year").value);
    }
    btn.style.display = "none";
    let insertDiv = btn.parentElement.querySelector("div");
    insertDiv.style.display = "flex";
    let cancel = insertDiv.querySelector("button");
    cancel.addEventListener("click", () => resetCancelAfter(btn, insertDiv));
}

function resetCancelAfter(button, parent){
    button.style.display = "inline";
    parent.style.display = "none";
    let input = {};
    try{
        input = parent.querySelector("input");
        input.value = "";
    }catch(e){
        console.log(e);
        try{
            input = parent.querySelector("textarea");
            input.value = "";
        }catch(e){
            console.log(e);
            try {
                input = parent.getElementsByTagName("select");
                for(let i = 0; i < input.length; i++){
                    input[i].getElementsByTagName("option")[0].selected = true;
                }
            } catch (e) {
                console.log(e);
            }
        }
    }
}