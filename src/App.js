import React, { useEffect, useState } from "react";
import "./App.css";
import { trackBehavior, applyTheme } from "./behavior";

function App() {
  const [mode, setMode] = useState("auto");

  useEffect(() => {
    trackBehavior();

    const interval = setInterval(() => {
      if (mode === "auto") {
        applyTheme();
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [mode]);

  // Manual theme switch
  const setTheme = (theme) => {
    document.body.className = theme;
    localStorage.setItem("manualTheme", theme);
    setMode("manual");
  };

  // Load saved theme
  useEffect(() => {
    const saved = localStorage.getItem("manualTheme");
    if (saved) {
      document.body.className = saved;
      setMode("manual");
    }
  }, []);

  return (
    <div>
      {/* Navbar */}
      <div className="navbar">
        <h2>Theme Engine</h2>

        <div>
          <button onClick={() => setTheme("default")}>Light</button>
          <button onClick={() => setTheme("dark")}>Dark</button>
          <button onClick={() => setTheme("minimal")}>Minimal</button>
          <button onClick={() => setMode("auto")}>Auto</button>
        </div>
      </div>

      {/* Hero */}
      <div className="hero">
        <h1>Smart UI Experience</h1>
        <p>
          This website automatically adapts its theme based on your behavior
        </p>
      </div>

      {/* Sections */}
      <div className="section">
        <h2>Feature 1</h2>
        <p>Dynamic UI based on user interaction</p>
      </div>

      <div className="section">
        <h2>Feature 2</h2>
        <p>Manual override for better control</p>
      </div>

      <div className="section">
        <h2>Feature 3</h2>
        <p>Real-time adaptation system</p>
      </div>

      <div style={{ height: "1000px" }}></div>
    </div>
  );
}

export default App;