// App.js

import React, { useEffect, useState } from 'react';
import Main from './pages/Main';
import Settings from './pages/Settings';

import { Route, Routes, BrowserRouter } from "react-router-dom"


function coroutine(f, ins,outs) {
    var o = f(ins,outs); // instantiate the coroutine
    o.next(); // execute until the first yield
    return function(x) {
        o.next(x);
    }
}

function App() {
    const [BAC, setBAC] = useState(0)
    const [drinks, setDrinks] = useState(0)

    function drinkEvent(){

    }
    
    let update = coroutine(function*(ins){
        let timescale = 60
        const d = new Date()
        const startTime = d.getTime()
        var oldTime = d.getTime()
        var bac = 0
        var sa = 0
        var male = true
        const weight = 80
        const v_d = weight * (male ? 0.71 : 0.58)

        let P=1,I=0,D=0.1
        let af = 1
        let Vf =1

        while(true){
            yield
            const d = new Date()
            var dt = d.getTime()-oldTime
            var totalTime = (d.getTime()-startTime)/3600000*timescale
            var oldTime = d.getTime()
            var dt = dt/3600000*timescale

            if(drinks > 0){
                console.log("Drank at: " + totalTime)
                sa += 1.4/v_d*ins.factor*Vf*drinks
                setDrinks(0)
            }
            var transfer = 7*sa*af
            var decay = 1/(1+1/(500*bac+0.0001))*0.015
            
            bac += (transfer-decay)*dt
            sa -= transfer*dt
            console.log(drinks)
            console.log(bac)
            
        }
    }, {factor:1}, {})



    useEffect(() => {
        // let ud = setInterval(update, 1000)
        // setTimeout(() => setDrinks(1), 2000)
        // return () => clearInterval(ud)
    })

    
  return (
      <BrowserRouter>
          <div className="App">
              <div className="content">
                  <Routes>
                      <Route path="/" element={<Main />}></Route>
                      <Route path="/settings" element={<Settings />}></Route>
                  </Routes>
              </div>
          </div>
      </BrowserRouter>
  );
}

export default App;