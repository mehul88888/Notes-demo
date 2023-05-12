import "./App.css";
import Add from "./Pages/Add";
import Display from "./Pages/Display";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Edit from "./Pages/Edit";
import React, { createContext, useState } from "react";

export const ThemeContext = createContext({} as any);

function App() {
  const [authContext, setAuthContext] = useState({
    user: [
      { id: 1, title: "title 1", body: "body 1" },
      { id: 2, title: "title 2", body: "body 2" },
      { id: 3, title: "title 3", body: "body 3" },
    ],
  });

  return (
    <div>
      <ThemeContext.Provider value={{ authContext, setAuthContext }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Display />} />
            <Route path="/display" element={<Display />} />
            <Route path="/add" element={<Add />} />
            <Route path="/edit/:id" element={<Edit />} />
          </Routes>
        </BrowserRouter>
      </ThemeContext.Provider>
    </div>
  );
}

export default App;
