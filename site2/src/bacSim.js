let timescale = 60
let BACGoal = 0.08
let v_d = 58.4 

let startTime = (new Date()).getTime()/3600000
let drinkTimes = []

function takeDrink(){
    drinkTimes = [...drinkTimes, ((new Date()).getTime()/3600000-startTime)*timescale]
}




function getBAC(){
    let time = ((new Date()).getTime()/3600000- startTime)*timescale
    let dts = drinkTimes
     

    let vdts = dts.filter((t) => time>t && (time-t)*0.015 < 1.4/v_d)
    let sum = 0
    vdts.forEach(t => {
        sum += 1.4/v_d - (time-t)*0.015
    });
    return sum
}

function deb(){
    deb.sa = 0
    deb.bac = 0
}


function getDrinkGoal(){
    return Math.max(Math.floor((BACGoal-getBAC())/(1.4/v_d)), 0)
}

export {getBAC, takeDrink, getDrinkGoal};