import React, { useState } from "react";
import Board from "./components/Board";
import "./styles.css";

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`app ${isDarkMode ? "dark-mode" : "light-mode"}`}>
      <div className="header">
        <h1>Kanban Board</h1>
        <button onClick={toggleDarkMode} className="theme-toggle">
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
      <Board />
    </div>
  );
};

export default App;
