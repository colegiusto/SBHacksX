// App.js

import React, { useEffect, useState } from 'react';
import Main from './pages/Main';
import Settings from './pages/Settings';

import { Route, Routes, BrowserRouter } from "react-router-dom"




function App() {
    

    
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