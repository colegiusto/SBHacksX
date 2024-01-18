let timescale = 60
let BACGoal = 0.08
let v_d = 58.4 



let startTime = (new Date()).getTime()/3600000
let drinkTimes = []

function setVd(weight, sex) {
    if (weight == null) { v_d = 58.4 }
    else if (sex == 'Male') { v_d = weight * 0.71; }
    else if (sex == 'Female') { v_d = weight * 0.58; }
    else { v_d = weight * 0.65; }
}


function takeDrink(){
    drinkTimes = [...drinkTimes, ((new Date()).getTime()/3600000-startTime)*timescale]
}




function getBAC(){
    let time = ((new Date()).getTime()/3600000- startTime)*timescale
    let dts = drinkTimes
     

    let vdts = dts.filter((t) => time>t && (time-t)*0.015 < 1.4/v_d)
    let sum = 0
    let decre = true
    vdts.forEach(t => {
        sum += 1.4/v_d 
        if(decre){
            decre = false
            sum -= (time-t)*0.015
        }
    });
    return sum
}

function deb(){
    deb.sa = 0
    deb.bac = 0
}


function getDrinkGoal(){
    return Math.min(Math.max(Math.floor((BACGoal-getBAC())/(1.4/v_d)), 0), 5)
}

function setTargetBac(tb){
    BACGoal = tb
}

function timeTilNext(){
    return (getBAC()-BACGoal+1.4/v_d)/0.015*60
}

export {getBAC, takeDrink, getDrinkGoal, setTargetBac, timeTilNext, setVd};