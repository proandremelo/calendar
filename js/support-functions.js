export function getAllDaysInAMonth(year,month){
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
};

function leapYear(year){
    if(year % 4 === 0){
        return true;
    }else{
        return false;
    }
};

export function setAllowedDays(begDays, selectedDays){
    for(let i = 0, j = selectedDays;i<31;i++){
        if(i < j){
            begDays[i].style.display = "inline";
        }else{
            begDays[i].style.display = "none";
        }
    }
};

export function buttonToText(evt){
    let btn = evt.target;
    if(btn.id == "end-date"){
        btn.setAttribute("min", document.querySelector("#beg-year"));
    }
    btn.style.display = "none";
    let insertDiv = btn.parentElement.querySelector("div");
    insertDiv.style.display = "flex";
    let cancel = insertDiv.querySelector("button");
    cancel.addEventListener("click", () => resetCancelAfter(btn, insertDiv));
};

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
};
