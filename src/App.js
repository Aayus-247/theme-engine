import React, { useEffect, useState } from "react";
import "./App.css";
import { trackBehavior } from "./behavior";
import Chart from "./Chart";
import Login from "./Login";

function App() {
  const [mode, setMode] = useState("auto");
  const [clicks, setClicks] = useState(0);
  const [scroll, setScroll] = useState(0);
  const [user, setUser] = useState(null);
  const [layout, setLayout] = useState("normal");

  // 🧠 Track behavior (NO interval now)
  useEffect(() => {
    trackBehavior();
  }, []);

  // 📊 Update stats UI every 1 sec (only for display)
  useEffect(() => {
    const timer = setInterval(() => {
      setClicks(localStorage.getItem("clicks") || 0);
      setScroll(localStorage.getItem("scrollDepth") || 0);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // 👤 Load saved user
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(savedUser);
  }, []);

  // 🎨 Manual theme
  const setTheme = (theme) => {
    document.body.className = theme;
    setMode("manual");
  };

  // 🤖 Simple AI prediction
  const predictUser = () => {
    if (clicks > 20) return "Active User";
    if (scroll > 800) return "Explorer";
    return "Casual User";
  };

  // 🔐 Login screen
  if (!user) {
    return <Login setUser={setUser} />;
  }

  return (
    <div className={layout}>
      {/* 🔝 NAVBAR */}
      <div className="navbar">
        <h2>Welcome, {user}</h2>

        <div>
          <button onClick={() => setTheme("default")}>Light</button>
          <button onClick={() => setTheme("dark-theme")}>Dark</button>
          <button onClick={() => setTheme("minimal")}>Minimal</button>
          <button onClick={() => setMode("auto")}>Auto</button>
        </div>
      </div>

      {/* 🧠 HERO */}
      <div className="hero">
        <h1>Smart Theme Engine</h1>
        <p>{predictUser()}</p>
      </div>

      {/* 📐 LAYOUT SWITCH */}
      <div className="section">
        <button onClick={() => setLayout("normal")}>Normal Layout</button>
        <button onClick={() => setLayout("grid")}>Grid Layout</button>
      </div>

      {/* 📊 CHART */}
      <Chart clicks={clicks} scroll={scroll} />

      {/* 📜 SCROLL AREA */}
      <div style={{ height: "1000px" }}></div>
    </div>
  );
}

export default App;