import React, { useEffect, useState } from "react";
import "./App.css";
import { trackBehavior, setManualLock } from "./behavior";

const THEME_LABELS = {
  "theme-light":      "☀️ Light",
  "theme-normal":     "🌤 Normal",
  "theme-light-dark": "🌆 Twilight",
  "theme-dark":       "🌑 Dark",
};

function App() {
  const [theme, setTheme] = useState("theme-light");
  const [score, setScore] = useState(0);
  const [clicks, setClicks] = useState(0);
  const [scroll, setScroll] = useState(0);
  const [user, setUser] = useState(null);
  const [idleMsg, setIdleMsg] = useState(false);

  useEffect(() => {
    document.body.setAttribute("data-theme", "theme-light");

    trackBehavior((newTheme, newScore) => {
      setTheme(newTheme);
      setScore(newScore);
      setIdleMsg(newScore === 0);
    });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setClicks(parseInt(localStorage.getItem("clicks")) || 0);
      setScroll(parseInt(localStorage.getItem("scrollDepth")) || 0);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) setUser(saved);
  }, []);

  const setManualTheme = (t) => {
    setManualLock(true);
    document.body.setAttribute("data-theme", t);
    setTheme(t);
  };

  const predictUser = () => {
    if (clicks > 20) return "Active User 🚀";
    if (scroll > 800) return "Explorer 🗺";
    return "Casual User 👤";
  };

  const scorePercent = Math.min((score / 80) * 100, 100).toFixed(0);

  if (!user) {
    return <LoginScreen setUser={setUser} />;
  }

  return (
    <>
      <div className="navbar">
        <h2>⚡ Theme Engine</h2>
        <div className="nav-actions">
          <div className="score-bar-wrap" title={`Score: ${score}`}>
            <div className="score-bar-fill" style={{ width: `${scorePercent}%` }} />
          </div>

          <span className="theme-badge">{THEME_LABELS[theme] || theme}</span>

          <button className="secondary" onClick={() => setManualTheme("theme-light")}>Light</button>
          <button className="secondary" onClick={() => setManualTheme("theme-normal")}>Normal</button>
          <button className="secondary" onClick={() => setManualTheme("theme-light-dark")}>Twilight</button>
          <button className="secondary" onClick={() => setManualTheme("theme-dark")}>Dark</button>
        </div>
      </div>

      <div className="hero">
        <h1>Smart Theme Engine</h1>
        <p className="subtitle">Theme adapts as you interact with the page</p>
        <span className="user-type">{predictUser()}</span>
        {idleMsg && (
          <p style={{ marginTop: 16, fontSize: "0.85rem", opacity: 0.6 }}>
            Idle detected — reset to Light theme
          </p>
        )}
      </div>

      <div className="stats-panel">
        <div className="stat-box">
          <div className="stat-num">{clicks}</div>
          <div className="stat-label">Clicks</div>
        </div>
        <div className="stat-box">
          <div className="stat-num">{scroll}</div>
          <div className="stat-label">Scroll px</div>
        </div>
        <div className="stat-box">
          <div className="stat-num">{score}</div>
          <div className="stat-label">Activity Score</div>
        </div>
      </div>

      <div className="cards-grid">
        <div className="card">
          <h3>Auto Theming</h3>
          <p>Theme shifts through 4 stages based on your click and scroll activity.</p>
        </div>
        <div className="card">
          <h3>Idle Reset</h3>
          <p>After 8 seconds of no activity, resets to Light theme and clears score.</p>
        </div>
        <div className="card">
          <h3>4 Stages</h3>
          <p>Light → Normal → Twilight → Dark, driven by a weighted activity score.</p>
        </div>
        <div className="card">
          <h3>Manual Override</h3>
          <p>Pick any theme manually. Auto resumes after 8 sec idle.</p>
        </div>
      </div>

      <div className="scroll-hint">↓ Scroll down to increase activity score ↓</div>
      <div style={{ height: "900px" }} />
      <div className="section">
        Logged in as <strong>{user}</strong> &nbsp;|&nbsp;
        <button className="secondary" onClick={() => { localStorage.removeItem("user"); setUser(null); }}>
          Logout
        </button>
      </div>
    </>
  );
}

function LoginScreen({ setUser }) {
  const [name, setName] = useState("");
  useEffect(() => { document.body.setAttribute("data-theme", "theme-light"); }, []);

  const handleLogin = () => {
    if (!name.trim()) return;
    localStorage.setItem("user", name);
    setUser(name);
  };

  return (
    <div className="login-wrap">
      <div className="login-box">
        <h2>Welcome</h2>
        <input
          placeholder="Enter your name"
          value={name}
          onChange={e => setName(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleLogin()}
        />
        <button onClick={handleLogin}>Enter →</button>
      </div>
    </div>
  );
}

export default App;