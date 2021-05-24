import {getAllDaysInAMonth, setAllowedDays} from "./support-functions.js";

export function Event(){
    this.title = new Title();
    this.begDate = new BegDate();
    this.begTime = new BegTime();
    this.endDate = new EndDate();
    this.endTime = new EndTime();
    this.address = new Address();
    this.description = new Description();
    this.Cancel = new Cancel();
    this.add = new Add();
};

function Title(){
    this.name = document.querySelector("#title");
};

function BegDate(){
    this.begDay = document.querySelector("#beg-day");
    this.begMonth = document.querySelector("#beg-month");
    this.begYear = document.querySelector("#beg-year");
    this.begMonth.addEventListener("change", evt => {
        if((evt.target.value-1) < 10){
            setAllowedDays(this.begDay, getAllDaysInAMonth(this.begYear.value, evt.target.value[1]-1)); 
        }else{
            setAllowedDays(this.begDay, getAllDaysInAMonth(this.begYear.value, evt.target.value-1)); 
        }      
    });
    this.begYear.addEventListener("input", evt => {
        if((this.begMonth.value-1) < 10){
            setAllowedDays(this.begDay, getAllDaysInAMonth(evt.target.value, this.begMonth.value[1]-1));
        }else{
            setAllowedDays(this.begDay, getAllDaysInAMonth(evt.target.value, this.begMonth.value-1)); 
        }
    })
};

function BegTime(){
    this.button = document.querySelector("#beg-time");
    this.insertDiv = document.querySelector("#beg-time-after");
    this.button.addEventListener("click", () => {
        this.button.style.display = "none";
        this.insertDiv.style.display = "flex";
    });
    this.insertDiv.querySelector(".cancel-after").addEventListener("click", () => {
        this.insertDiv.querySelector("#beg-hour")[0].selected = true;
        this.insertDiv.querySelector("#beg-minute")[0].selected = true;
        this.insertDiv.style.display = "none";
        this.button.style.display = "inline";
    });
};

function EndDate(){
    this.button = document.querySelector("#end-date");
    this.insertDiv = document.querySelector("#end-date-after");
    this.button.addEventListener("click", () => {
        this.button.style.display = "none";
        this.insertDiv.style.display = "flex";
        this.insertDiv.querySelector("#end-year").value = document.querySelector("#beg-year").value;
    });
    this.insertDiv.querySelector(".cancel-after").addEventListener("click", () => {
        this.insertDiv.querySelector("#end-day")[0].selected = true;
        this.insertDiv.querySelector("#end-month")[0].selected = true;
        this.insertDiv.style.display = "none";
        this.button.style.display = "inline";
    });
    this.insertDiv.querySelector("#end-month").addEventListener("change", (evt) => {
        if((evt.target.value-1) < 10){
            setAllowedDays(this.insertDiv.querySelector("#end-day"), getAllDaysInAMonth(this.insertDiv.querySelector("#end-year").value, evt.target.value[1]-1)); 
        }else{
            setAllowedDays(this.insertDiv.querySelector("#end-day"), getAllDaysInAMonth(this.insertDiv.querySelector("#end-year").value, evt.target.value-1)); 
        }        
    });
    this.insertDiv.querySelector("#end-year").addEventListener("input", (evt) => {
        if((this.insertDiv.querySelector("#end-month").value-1) < 10){
            setAllowedDays(this.insertDiv.querySelector("#end-day"), getAllDaysInAMonth(evt.target.value, this.insertDiv.querySelector("#end-month").value[1]-1));
        }else{
            setAllowedDays(this.insertDiv.querySelector("#end-day"), getAllDaysInAMonth(evt.target.value, this.insertDiv.querySelector("#end-month").value-1)); 
        }
    });
};


function EndTime(){
    this.button = document.querySelector("#end-time");
    this.insertDiv = document.querySelector("#end-time-after");
    this.button.addEventListener("click", () => {
        this.button.style.display = "none";
        this.insertDiv.style.display = "flex";
    });
    this.insertDiv.querySelector(".cancel-after").addEventListener("click", () => {
        this.insertDiv.querySelector("#end-hour")[0].selected = true;
        this.insertDiv.querySelector("#end-minute")[0].selected = true;
        this.insertDiv.style.display = "none";
        this.button.style.display = "inline";
    });
};

function Address(){
    this.button = document.querySelector("#address");
    this.insertDiv = document.querySelector("#address-div-after");
    this.button.addEventListener("click", () => {
        this.button.style.display = "none";
        this.insertDiv.style.display = "flex";
    });
    this.insertDiv.querySelector(".cancel-after").addEventListener("click", () => {
        this.insertDiv.querySelector(".input-after").value = "";
        this.insertDiv.style.display = "none";
        this.button.style.display = "inline";
    });
};

function Description(){
    this.button = document.querySelector("#description");
    this.insertDiv = document.querySelector("#desc-div-after");
    this.button.addEventListener("click", () => {
        this.button.style.display = "none";
        this.insertDiv.style.display = "flex";
    });
    this.insertDiv.querySelector(".cancel-after").addEventListener("click", () => {
        this.insertDiv.querySelector(".input-after").value = "";
        this.insertDiv.style.display = "none";
        this.button.style.display = "inline";
    });
};

function Cancel() {
    this.button = document.querySelector("#cancel");
    this.button.addEventListener("click", evt => {
        let cancelButtons = document.querySelectorAll(".cancel-after");
        cancelButtons.forEach(btn => btn.click());
        document.querySelector("#add-event").style.display = "none";
        document.querySelector("#calendar").style.pointerEvents = "auto";
    })
};

function Add(){
    this.button = document.querySelector("#add");
}