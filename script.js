// Target Elements
const glassCard = document.getElementById('glass-card');
const cssCode = document.getElementById('css-code');
const copyBtn = document.getElementById('copy-btn');

// Controls
const blurInput = document.getElementById('blur');
const opacityInput = document.getElementById('opacity');
const radiusInput = document.getElementById('radius');
const borderOpacityInput = document.getElementById('border-opacity');
const shadowInput = document.getElementById('shadow');
const colorInput = document.getElementById('color');
const fontColorInput = document.getElementById('font-color'); // Font Color Input

// Action Buttons
const randomBtn = document.getElementById('random-btn');
const resetBtn = document.getElementById('reset-btn');

// Presets
const PRESETS = {
  frosted: { blur: 16, opacity: 0.25, radius: 20, borderOpacity: 0.3, shadow: 0.2, color: '#ffffff', fontColor: '#ffffff' },
  dark: { blur: 12, opacity: 0.45, radius: 16, borderOpacity: 0.1, shadow: 0.5, color: '#0f172a', fontColor: '#f8fafc' },
  neon: { blur: 10, opacity: 0.3, radius: 12, borderOpacity: 0.8, shadow: 0.5, color: '#00f0ff', fontColor: '#ffffff' }
};

// Helper: Convert Hex color + Alpha to RGBA string
function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// Helper: Generate a random Hex Color
function getRandomHexColor() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
}

// Single Update Function
function updateGlassStyle() {
  const blur = blurInput.value;
  const opacity = opacityInput.value;
  const radius = radiusInput.value;
  const borderOpacity = borderOpacityInput.value;
  const shadow = shadowInput.value;
  const hexColor = colorInput.value;
  const fontColor = fontColorInput ? fontColorInput.value : '#ffffff'; // Fallback check

  // Dynamic RGBA Values
  const bgRgba = hexToRgba(hexColor, opacity);
  const borderRgba = hexToRgba('#ffffff', borderOpacity);
  const shadowRgba = `rgba(0, 0, 0, ${shadow})`;

  // Update Label Displays (if labels exist in HTML)
  if (document.getElementById('blur-val')) document.getElementById('blur-val').textContent = `${blur}px`;
  if (document.getElementById('opacity-val')) document.getElementById('opacity-val').textContent = opacity;
  if (document.getElementById('radius-val')) document.getElementById('radius-val').textContent = `${radius}px`;
  if (document.getElementById('border-opacity-val')) document.getElementById('border-opacity-val').textContent = borderOpacity;
  if (document.getElementById('shadow-val')) document.getElementById('shadow-val').textContent = shadow;

  // Apply Inline Styles to Card Preview
  glassCard.style.color = fontColor;
  glassCard.style.background = bgRgba;
  glassCard.style.backdropFilter = `blur(${blur}px)`;
  glassCard.style.webkitBackdropFilter = `blur(${blur}px)`;
  glassCard.style.borderRadius = `${radius}px`;
  glassCard.style.border = `1px solid ${borderRgba}`;
  glassCard.style.boxShadow = `0 8px 32px 0 ${shadowRgba}`;

  // Render CSS Code Text
  const generatedCSS = `.glass-card {
  color: ${fontColor};
  background: ${bgRgba};
  backdrop-filter: blur(${blur}px);
  -webkit-backdrop-filter: blur(${blur}px);
  border-radius: ${radius}px;
  border: 1px solid ${borderRgba};
  box-shadow: 0 8px 32px 0 ${shadowRgba};
}`;

  cssCode.textContent = generatedCSS;
}

// Copy CSS Code to Clipboard
copyBtn.addEventListener('click', () => {
  navigator.clipboard.writeText(cssCode.textContent).then(() => {
    copyBtn.textContent = 'Copied!';
    copyBtn.style.background = '#4ade80';

    setTimeout(() => {
      copyBtn.textContent = 'Copy CSS';
      copyBtn.style.background = '#38bdf8';
    }, 1500);
  });
});

// Attach Event Listeners to ALL inputs (including fontColorInput)
const inputs = [blurInput, opacityInput, radiusInput, borderOpacityInput, shadowInput, colorInput, fontColorInput];
inputs.forEach(input => {
  if (input) input.addEventListener('input', updateGlassStyle);
});

// Randomize Values
randomBtn.addEventListener('click', () => {
  blurInput.value = Math.floor(Math.random() * 25);
  opacityInput.value = (Math.random() * 0.5 + 0.1).toFixed(2);
  radiusInput.value = Math.floor(Math.random() * 30);
  borderOpacityInput.value = (Math.random() * 0.4 + 0.1).toFixed(2);
  shadowInput.value = (Math.random() * 0.4 + 0.1).toFixed(2);
  colorInput.value = getRandomHexColor();
  if (fontColorInput) fontColorInput.value = getRandomHexColor();
  
  updateGlassStyle();
});

// Reset Values
resetBtn.addEventListener('click', () => {
  blurInput.value = 10;
  opacityInput.value = 0.15;
  radiusInput.value = 16;
  borderOpacityInput.value = 0.2;
  shadowInput.value = 0.25;
  colorInput.value = '#ffffff';
  if (fontColorInput) fontColorInput.value = '#ffffff';

  updateGlassStyle();
});

// Target the button group
const buttonGroup = document.querySelector('.button-group');

if (buttonGroup) {
  buttonGroup.addEventListener('click', (e) => {
    // Determine preset key from button ID (e.g., 'frosted-btn' -> 'frosted')
    const presetKey = e.target.id.replace('-btn', '');
    const preset = PRESETS[presetKey];

    if (preset) {
      blurInput.value = preset.blur;
      opacityInput.value = preset.opacity;
      radiusInput.value = preset.radius;
      borderOpacityInput.value = preset.borderOpacity;
      shadowInput.value = preset.shadow;
      colorInput.value = preset.color;
      if (fontColorInput) fontColorInput.value = preset.fontColor;

      updateGlassStyle();
    }
  });
}


// Initialize styles on initial load
updateGlassStyle();