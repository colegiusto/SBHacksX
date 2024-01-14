// App.js

import React from 'react';
import Circle from './pages/Circle';
import Settings from './pages/Settings';

import { Route, Routes, BrowserRouter } from "react-router-dom"

function App() {
  return (
      <BrowserRouter>
          <div className="App">
              <div className="content">
                  <Routes>
                      <Route path="/" element={<Circle />}></Route>
                      <Route path="/settings" element={<Settings />}></Route>
                  </Routes>
              </div>
          </div>
      </BrowserRouter>
  );
}

export default App;
