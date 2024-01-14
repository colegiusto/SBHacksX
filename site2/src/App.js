// App.js

import React, { useEffect, useState } from 'react';
import Main from './pages/Main';
import Settings from './pages/Settings';

import { Route, Routes, BrowserRouter } from "react-router-dom"

function App() {
    const [BAC, setBAC] = useState(0)
    const [drinks, setDrinks] = useState(0)
    const [bacHistory, setBacHistory] = useState([])
    let ins =  {
        bsetter: setBAC,
        drinks: drinks,
        factor:1
    }
    let outs = {
        timesteps: [],
        drinksDue: 0,
        time: 0,
    }
    useEffect(()=>{
        setDrinks(ins.drinks)
    }, [ins.drinks])
    useEffect(()=>{
        console.log("Drinks changed")
        ins.drinks = drinks
    }, [drinks])

    useEffect(() => {
        let timescale = 60;
        function coroutine(f, ins,outs) {
            var o = f(ins,outs); // instantiate the coroutine
            o.next(); // execute until the first yield
            return function(x) {
                o.next(x);
            }
        }
        addDrinks = (drinks) => ins.drinks += drinks
        
        var update = coroutine(function*(ins, outs){
            const d = new Date()
            const startTime = d.getTime()
            var oldTime = d.getTime()
            var bac = 0
            var sa = 0
            var male = true
            const weight = 80
            const v_d = weight * (male ? 0.71 : 0.58)
            var d_g = true

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
                console.log(ins.drinks)
                if(ins.drinks > 0){
                    console.log("Drank at: " + totalTime + " " +drinks)
                    sa += 1.4/v_d*ins.factor*Vf*ins.drinks
                    ins.drinks = 0
                }
                var transfer = 7*sa*af
                var decay = 1/(1+1/(500*bac+0.0001))*0.015
                
                bac += (transfer-decay)*dt
                sa -= transfer*dt

                outs.timesteps.push({Time:totalTime, BAC:bac})

                ins.bsetter(bac)
                
            }
        }, ins, outs)
        let ud = setInterval(update, 1000)
        function addDrinks(d){setDrinks(drinks + d)}
        
        setTimeout(()=>addDrinks(1), 10000)

        return () => clearInterval(ud)
    }, [])

    
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
