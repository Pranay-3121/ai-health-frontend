/*
  DARK MODE TOGGLE
  ----------------
  Smooth theme switching with localStorage persistence
*/

// Get saved theme or default to light
const getSavedTheme = () => {
  return localStorage.getItem('theme') || 'light';
};

// Apply theme to document
const applyTheme = (theme) => {
  // Remove existing theme
  document.documentElement.removeAttribute('data-theme');
  
  // Force reflow
  void document.documentElement.offsetHeight;
  
  // Apply new theme
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  
  // Update toggle label
  const label = document.querySelector('.theme-toggle-label');
  if (label) {
    label.textContent = theme === 'dark' ? 'Dark' : 'Light';
  }
  
  // Force background update
  document.body.style.background = theme === 'dark' ? '#0f172a' : '#f6f8fb';
  
  console.log('🎨 Theme applied:', theme);
};

// Toggle between light and dark
window.toggleTheme = function() {
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  
  console.log('🔄 Switching from', currentTheme, 'to', newTheme);
  applyTheme(newTheme);
};

// Apply saved theme on page load
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = getSavedTheme();
  console.log('📱 Loading saved theme:', savedTheme);
  applyTheme(savedTheme);
});

// Also apply immediately (before DOMContentLoaded to prevent flash)
const savedTheme = getSavedTheme();
applyTheme(savedTheme);