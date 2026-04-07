let clicks = 0;
let totalScroll = 0;
let lastScroll = 0;
let idleTimeout;
let onThemeChange = null;
let manualLock = false;

localStorage.setItem("clicks", 0);
localStorage.setItem("scrollDepth", 0);

export function setManualLock(val) {
  manualLock = val;
}

export function trackBehavior(themeCallback) {
  onThemeChange = themeCallback;

  document.addEventListener("click", () => {
    clicks++;
    localStorage.setItem("clicks", clicks);
    applyTheme();
    resetIdleTimer();
  });

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
  if (manualLock) return;

  const c = parseInt(localStorage.getItem("clicks")) || 0;
  const s = parseInt(localStorage.getItem("scrollDepth")) || 0;

  const score = c * 3 + Math.floor(s / 500);

  let theme;
  if (score === 0 || score < 15) {
    theme = "theme-light";
  } else if (score < 40) {
    theme = "theme-normal";
  } else if (score < 80) {
    theme = "theme-light-dark";
  } else {
    theme = "theme-dark";
  }

  document.body.setAttribute("data-theme", theme);
  if (onThemeChange) onThemeChange(theme, score);
}

function resetIdleTimer() {
  clearTimeout(idleTimeout);
  idleTimeout = setTimeout(() => {
    manualLock = false;
    document.body.setAttribute("data-theme", "theme-light");
    if (onThemeChange) onThemeChange("theme-light", 0);
    localStorage.setItem("clicks", 0);
    localStorage.setItem("scrollDepth", 0);
    clicks = 0;
    totalScroll = 0;
    console.log("User idle → reset to light theme");
  }, 8000);
}