

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

function Event(){
    this.title = document.createElement("input");
    this.title.type = "text"
    this.title.id = "title-event";
    this.title.value = "Add a title...";
    this.title.style.zIndex = "1";
    this.title.style.left = "50%";
    // this.title = function(){
    //     let input = document.createElement("input");
    //     input.type = "text";
    //     input.id = "title-event";
    //     input.value = "Add a title...";
    //     return input;
    // };
//     this.beginDate = beginDate;
//     this.endDate = endDate;
//     this.time = time;
//     this.address = address;
}


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

function backward(evt, calendar){
    if(calendar.date.getMonth()-1 == -1){
        calendar.date = new Date(calendar.date.getFullYear()-1, 11);
    }else{
        calendar.date = new Date(calendar.date.getFullYear(), calendar.date.getMonth()-1);
    }
    calendar.applyDate(evt, calendar.date);
}

function forward(evt, calendar){
    if(calendar.date.getMonth()+1 == 12){
        calendar.date = new Date(calendar.date.getFullYear()+1, 0);
    }else{
        calendar.date = new Date(calendar.date.getFullYear(), calendar.date.getMonth()+1);
    }
    calendar.applyDate(evt, calendar.date);
}

var calendar = new Calendar();

document.getElementById("calendar").addEventListener("wheel", (evt) => {
    evt.preventDefault();
    if(evt.deltaY < 0){
        forward(evt, calendar);
    }else{
        backward(evt, calendar);
    }
});

window.addEventListener("DOMContentLoaded", (evt) => {
    calendar.applyDate(evt, calendar.date);
});
document.getElementById("backward").addEventListener("click", (evt) => backward(evt, calendar));
document.getElementById("forward").addEventListener("click", (evt) => forward(evt, calendar));
document.getElementById("today").addEventListener("click", (evt) => {
    calendar.date = new Date();
    calendar.applyDate(evt, calendar.date);
});
// document.getElementById("events").addEventListener("click", (evt) => {
//     // let windowFeatures = "height=500,width=450,left=450,top=150,"+
//     // "menubar=no,toolbar=yes,location=yes,status=yes,scrollbars=yes";
//     // window.open("../html/test.html","Events",windowFeatures);
//     let ev = new Event();
//     document.body.insertBefore(ev.title, document.getElementById("calendar"));
//     console.log(ev.title);
// });

var months = document.getElementById("month").querySelectorAll("div");
// console.log(months);
months.forEach(month => month.addEventListener("click", function(evt){
    let clickDay = evt;
    if(evt.target.innerHTML != 0){
        document.getElementById("add-event").style.display = "grid";
        document.getElementById("calendar").style.pointerEvents = "none";
        document.getElementById("beg-month").getElementsByTagName("option")[calendar.date.getMonth()].selected = true;
        document.getElementById("beg-day").getElementsByTagName("option")[evt.target.innerHTML-1].selected = true;
        document.getElementById("beg-year").value = calendar.date.getFullYear();
        // document.body.style.backgroundColor = "gray";
        // document.getElementById("nav").querySelectorAll("input[type=button]").forEach(elem => elem.style.backgroundColor = "gray");
    };
    
}));

//                       **************     EVENTS OF "ADD-EVENT"   *****************


document.getElementById("title").addEventListener("click", function(){

});

// document.getElementById("beg-date").addEventListener("click", function(){

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

document.getElementById("add").addEventListener("click", function(){

});

function buttonToText(evt){
    let btn = evt.target;
    btn.style.display = "none";
    let insertDiv = btn.parentElement.querySelector("div");
    insertDiv.style.display = "flex";
    let cancel = insertDiv.querySelector("button");
    cancel.addEventListener("click", function(){
        btn.style.display = "inline";
        insertDiv.style.display = "none";
        let input = {};
        try{
            input = insertDiv.querySelector("input");
            input.value = "";
        }catch(e){
            console.log(e);
            try{
                input = insertDiv.querySelector("textarea");
                input.value = "";
            }catch(e){
                console.log(e);
            }
        }
    })
}