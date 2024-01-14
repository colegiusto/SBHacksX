// App.js

import React, { useEffect, useState } from 'react';
import Main from './pages/Main';
import Settings from './pages/Settings';

import { Route, Routes, BrowserRouter } from "react-router-dom"

function App() {
    const [drinkTimes, setDrinkTimes] = useState([0, 0.166, 0.5])
    const [BAC, setBAC] = useState(0)

    function getBAC(){
        
        let dts = drinkTimes
        let v_d = 58.4
        let timescale = 60
        if (getBAC.init_time == null){
            getBAC.init_time = (new Date()).getTime()
        }
        
        let time = ((new Date()).getTime() - getBAC.init_time)/3600000*timescale
        
        //dts = dts.map((t) => t-getBAC.init_time)
        let vdts = dts.filter((t) => time>t && (time-t)*0.015 < 1.4/v_d)
        let sum = 0
        vdts.forEach(t => {
            sum += 1.4/v_d - (time-t)*0.015
        });
        console.log(sum)
        return sum
    }
    useEffect(() =>{
    console.log("ahh");
    let intervalId;

    if (!intervalId) {
        intervalId = setInterval(() => {
            setBAC(getBAC());
        }, 1000);
    }

    return () => {
        clearInterval(intervalId);
    };
}, []);
    
  return (
      <BrowserRouter>
          <div className="App">
              <div className="content">
                  <Routes>
                      <Route path="/" element={<Main BAC={BAC}/>}></Route>
                      <Route path="/settings" element={<Settings />}></Route>
                  </Routes>
              </div>
          </div>
      </BrowserRouter>
  );
}

export default App;