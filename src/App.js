import React, { useEffect, useState } from "react";
import "./App.css";
import { trackBehavior, applyTheme } from "./behavior";
import Chart from "./Chart";
import Login from "./Login";

function App() {
  const [mode, setMode] = useState("auto");
  const [clicks, setClicks] = useState(0);
  const [scroll, setScroll] = useState(0);
  const [user, setUser] = useState(null);
  const [layout, setLayout] = useState("normal");

  useEffect(() => {
    trackBehavior();

    const interval = setInterval(() => {
      if (mode === "auto") {
        applyTheme();
      }

      setClicks(localStorage.getItem("clicks") || 0);
      setScroll(localStorage.getItem("scrollDepth") || 0);
    }, 2000);

    return () => clearInterval(interval);
  }, [mode]);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(savedUser);
  }, []);

  const setTheme = (theme) => {
    document.body.className = theme;
    setMode("manual");
  };

  const predictUser = () => {
    if (clicks > 20) return "Active User";
    if (scroll > 800) return "Explorer";
    return "Casual User";
  };

  if (!user) {
    return <Login setUser={setUser} />;
  }

  return (
    <div className={layout}>
      
      {/* TEST LINE FIXED */}
      <h1 style={{ color: "red" }}>HELLO TEST</h1>

      <div className="navbar">
        <h2>Welcome, {user}</h2>

        <div>
          <button onClick={() => setTheme("default")}>Light</button>
          <button onClick={() => setTheme("dark")}>Dark</button>
          <button onClick={() => setTheme("minimal")}>Minimal</button>
          <button onClick={() => setMode("auto")}>Auto</button>
        </div>
      </div>

      <div className="hero">
        <h1>Smart Theme Engine</h1>
        <p>{predictUser()}</p>
      </div>

      <div className="section">
        <button onClick={() => setLayout("normal")}>Normal Layout</button>
        <button onClick={() => setLayout("grid")}>Grid Layout</button>
      </div>

      <Chart clicks={clicks} scroll={scroll} />

      <div style={{ height: "1000px" }}></div>
    </div>
  );
}

export default App;