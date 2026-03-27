let clicks = 0;
let totalScroll = 0;
let lastScroll = 0;
let idleTimeout;

export function trackBehavior() {
  // Click tracking
  document.addEventListener("click", () => {
    clicks++;
    localStorage.setItem("clicks", clicks);
    applyTheme();
    resetIdleTimer();
  });

  // Smooth scroll tracking
  window.addEventListener("scroll", () => {
    const currentScroll = window.scrollY;
    const diff = Math.abs(currentScroll - lastScroll);

    totalScroll += diff;
    lastScroll = currentScroll;

    localStorage.setItem("scrollDepth", totalScroll);

    applyTheme();
    resetIdleTimer();
  });
}

export function applyTheme() {
  const clicks = parseInt(localStorage.getItem("clicks")) || 0;
  const scroll = parseInt(localStorage.getItem("scrollDepth")) || 0;

  // 🧠 Balanced scoring
  const clickScore = clicks * 2;        // clicks matter more
  const scrollScore = Math.floor(scroll / 500); // slower scroll impact

  const score = clickScore + scrollScore;

  console.log("Score:", score); // debug

  if (score < 50) {
    document.body.className = "light-theme";
  } else if (score < 100) {
    document.body.className = "mid-theme";
  } else {
    document.body.className = "dark-theme";
  }
}

// ⏳ Increased idle time
function resetIdleTimer() {
  clearTimeout(idleTimeout);

  idleTimeout = setTimeout(() => {
    // 🎨 Reset theme
    document.body.className = "default";

    // 🔄 Reset stored values
    localStorage.setItem("clicks", 0);
    localStorage.setItem("scrollDepth", 0);

    // 🔁 Reset variables in memory
    clicks = 0;
    totalScroll = 0;

    console.log("User idle → reset everything");
  }, 8000); // 8 sec idle
}