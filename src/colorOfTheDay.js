export function applyColorOfTheDay() {
  function isGoodColor(r, g, b) {
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 130; 
  }

  function isVibrant(r, g, b) {
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const saturation = max === 0 ? 0 : (max - min) / max;
    return saturation > 0.5; // at least 50% saturation to avoid muted tints/pastels
  }

  function mulberry32(a) {
    return function() {
      var t = a += 0x6D2B79F5;
      t = Math.imul(t ^ t >>> 15, t | 1);
      t ^= t + Math.imul(t ^ t >>> 7, t | 61);
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    }
  }

  const today = new Date();
  const dateString = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
  
  let seed = 0;
  for (let i = 0; i < dateString.length; i++) {
    seed = (seed << 5) - seed + dateString.charCodeAt(i);
    seed |= 0;
  }

  const random = mulberry32(seed);

  let r, g, b;
  let attempts = 0;
  do {
    r = Math.floor(random() * 256);
    g = Math.floor(random() * 256);
    b = Math.floor(random() * 256);
    attempts++;
  } while (!(isGoodColor(r, g, b) && isVibrant(r, g, b)) && attempts < 100);

  if (attempts >= 100) {
    r = 200; g = 255; b = 0; // Default neon green
  }

  const hex = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;

  document.documentElement.style.setProperty('--color-accent-hex', hex);
  document.documentElement.style.setProperty('--color-accent-r', r.toString());
  document.documentElement.style.setProperty('--color-accent-g', g.toString());
  document.documentElement.style.setProperty('--color-accent-b', b.toString());
}
