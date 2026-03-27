// Track user behavior
export const trackBehavior = () => {
  let clicks = 0;
  let scrollDepth = 0;
  let lastScroll = 0;

  // Track clicks
  window.addEventListener("click", () => {
    clicks++;
  });

  // Track scroll
  window.addEventListener("scroll", () => {
    scrollDepth = window.scrollY;
    lastScroll = Date.now();
  });

  // Save data every 3 sec
  setInterval(() => {
    localStorage.setItem("clicks", clicks);
    localStorage.setItem("scrollDepth", scrollDepth);
    localStorage.setItem("lastScrollTime", lastScroll);
  }, 3000);
};

// Apply theme based on behavior
export const applyTheme = () => {
  const clicks = parseInt(localStorage.getItem("clicks")) || 0;
  const scroll = parseInt(localStorage.getItem("scrollDepth")) || 0;
  const hour = new Date().getHours();

  // Decision logic
  if (hour >= 18 || hour <= 6) {
    document.body.className = "dark";
  } 
  else if (scroll > 600) {
    document.body.className = "minimal";
  } 
  else if (clicks > 15) {
    document.body.className = "interactive";
  } 
  else {
    document.body.className = "default";
  }
};