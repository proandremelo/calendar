import {getAllDaysInAMonth, setAllowedDays} from "./support-functions.js";

function Event(title, begDate){
    this.title = title;
    this.begDate = begDate;
};

function Title(){
    this.name = document.querySelector("#title");
};

function BegDate(){
    this.begDay = document.querySelector("#beg-day");
    this.begMonth = document.querySelector("#beg-month");
    this.begYear = document.querySelector("#beg-year");
};

export function BegTime(){
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

export function EndDate(){
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
    this.insertDiv.querySelector("#end-year").addEventListener("input", () => {
        if((this.insertDiv.querySelector("#end-month").value-1) < 10){
            setAllowedDays(this.insertDiv.querySelector("#end-day"), getAllDaysInAMonth(evt.target.value, this.insertDiv.querySelector("#end-month").value[1]-1));
        }else{
            setAllowedDays(this.insertDiv.querySelector("#end-day"), getAllDaysInAMonth(evt.target.value, this.insertDiv.querySelector("#end-month").value-1)); 
        }
    });
};


export function EndTime(){
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

export function Address(){
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

export function Description(){
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