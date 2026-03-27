import React, { useEffect, useState } from "react";
import "./App.css";
import { trackBehavior, applyTheme } from "./behavior";

function App() {

  const [clicks, setClicks] = useState(0);
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    trackBehavior();

    const interval = setInterval(() => {
      applyTheme();

      setClicks(localStorage.getItem("clicks") || 0);
      setScroll(localStorage.getItem("scrollDepth") || 0);

    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
      <div className="card">
        <h1>Smart Theme Engine</h1>
        <p>UI adapts based on your behavior</p>

        <button>Click Me</button>

        <h3>Live Stats</h3>
        <p>Clicks: {clicks}</p>
        <p>Scroll Depth: {scroll}px</p>
      </div>

      <div style={{ height: "1500px" }}></div>
    </div>
  );
}

export default App;