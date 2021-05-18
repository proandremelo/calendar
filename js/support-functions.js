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
