// App.js

import React, { useEffect, useState } from 'react';
import Main from './pages/Main';
import Settings from './pages/Settings';
import {getBAC, takeDrink, getDrinkGoal} from './bacSim'

import { Route, Routes, BrowserRouter } from "react-router-dom"

function App() {
    const [BAC, setBAC] = useState(0)
    const [drinkIndex, setDrinkIndex] = useState(0)

    function td(){
        for(let i=0; i< drinkIndex; i++){
            takeDrink()
        }
        setDrinkIndex(0)
    }

    useEffect(() =>{
    console.log("ahh");
    let intervalId;

    if (!intervalId) {        
        intervalId = setInterval(() => {
            setBAC(getBAC());
            setDrinkIndex(getDrinkGoal())
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
                      <Route path="/" element={<Main drinkIndex={drinkIndex}takeDrink={td}BAC={BAC}/>}></Route>
                      <Route path="/settings" element={<Settings />}></Route>
                  </Routes>
              </div>
          </div>
      </BrowserRouter>
  );
}

export default App;