// App.js

import React, { useEffect, useState } from 'react';
import Main from './pages/Main';
import Settings from './pages/Settings';
import {getBAC, takeDrink, getDrinkGoal, setTargetBac, timeTilNext} from './bacSim'

import { Route, Routes, BrowserRouter } from "react-router-dom"

function App() {
    const [BAC, setBAC] = useState(0)
    const [drinkIndex, setDrinkIndex] = useState(0)
    const [timeLeft, setTimeLeft] = useState(0)

    function td(){
        for(let i=0; i< drinkIndex; i++){
            takeDrink()
        }
        setDrinkIndex(0)
    }

    useEffect(() =>{
        let intervalId;

        if (!intervalId) {        
            intervalId = setInterval(() => {
                setBAC(getBAC());
                setDrinkIndex(getDrinkGoal())
                setTimeLeft(timeTilNext())
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
                      <Route path="/" element={<Main timeLeft={timeLeft}setTarget={setTargetBac}drinkIndex={drinkIndex}takeDrink={td}BAC={BAC}/>}></Route>
                      <Route path="/settings" element={<Settings />}></Route>
                  </Routes>
              </div>
          </div>
      </BrowserRouter>
  );
}

export default App;