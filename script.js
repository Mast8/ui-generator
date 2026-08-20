// Target Elements
const glassCard = document.getElementById('glass-card');
const cardContent = document.getElementById('card-content');
const mainContent = document.getElementById('main-content');
const cssCode = document.getElementById('css-code');
const copyBtn = document.getElementById('copy-btn');

// New Select Controls
const bgSelect = document.getElementById('bg-select');
const cardTypeSelect = document.getElementById('card-type-select');
const tabBtns = document.querySelectorAll('.tab-btn');

// Sliders & Pickers
const blurInput = document.getElementById('blur');
const opacityInput = document.getElementById('opacity');
const radiusInput = document.getElementById('radius');
const borderOpacityInput = document.getElementById('border-opacity');
const shadowInput = document.getElementById('shadow');
const colorInput = document.getElementById('color');
const fontColorInput = document.getElementById('font-color');

// Action Buttons
const randomBtn = document.getElementById('random-btn');
const resetBtn = document.getElementById('reset-btn');

// State
let currentFormat = 'css'; // 'css' or 'tailwind'

// Presets
const PRESETS = {
  frosted: { blur: 16, opacity: 0.25, radius: 20, borderOpacity: 0.3, shadow: 0.2, color: '#ffffff', fontColor: '#ffffff' },
  dark: { blur: 12, opacity: 0.45, radius: 16, borderOpacity: 0.1, shadow: 0.5, color: '#0f172a', fontColor: '#f8fafc' },
  neon: { blur: 10, opacity: 0.3, radius: 12, borderOpacity: 0.8, shadow: 0.5, color: '#00f0ff', fontColor: '#ffffff' }
};

// Card Content Templates
const CARD_TEMPLATES = {
  basic: `
    <h3>Frosted Glass UI</h3>
    <p>Adjust the controls on the left panel to modify the blur, opacity, tint, and borders in real-time.</p>
  `,
  login: `
    <h3>Welcome Back</h3>
    <div style="display: flex; flex-direction: column; gap: 10px; margin-top: 12px;">
      <input type="email" placeholder="Email" style="padding: 8px 12px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.3); background: rgba(0,0,0,0.2); color: inherit; outline: none;">
      <input type="password" placeholder="Password" style="padding: 8px 12px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.3); background: rgba(0,0,0,0.2); color: inherit; outline: none;">
      <button style="padding: 10px; border-radius: 6px; border: none; background: #38bdf8; color: #0f172a; font-weight: bold; cursor: pointer; margin-top: 4px;">Sign In</button>
    </div>
  `,
  pricing: `
    <span style="font-size: 0.75rem; text-transform: uppercase; tracking: 1px; opacity: 0.8;">Pro Plan</span>
    <h3 style="font-size: 2rem; margin: 4px 0;">$29<span style="font-size: 0.9rem; font-weight: normal;">/mo</span></h3>
    <p>Access all generator presets, custom color palettes, and instant Tailwind exports.</p>
  `
};

// Helper: Convert Hex + Alpha to RGBA
function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// Helper: Generate Random Hex
function getRandomHexColor() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
}

// Helper: Map Blur values to approximate Tailwind backdrop-blur classes
function getTailwindBlur(blur) {
  if (blur <= 0) return 'backdrop-blur-none';
  if (blur <= 4) return 'backdrop-blur-sm';
  if (blur <= 8) return 'backdrop-blur';
  if (blur <= 12) return 'backdrop-blur-md';
  if (blur <= 16) return 'backdrop-blur-lg';
  if (blur <= 24) return 'backdrop-blur-xl';
  return 'backdrop-blur-2xl';
}

// Single Update Function
function updateGlassStyle() {
  const blur = blurInput.value;
  const opacity = opacityInput.value;
  const radius = radiusInput.value;
  const borderOpacity = borderOpacityInput.value;
  const shadow = shadowInput.value;
  const hexColor = colorInput.value;
  const fontColor = fontColorInput ? fontColorInput.value : '#ffffff';

  // Dynamic RGBA Values
  const bgRgba = hexToRgba(hexColor, opacity);
  const borderRgba = hexToRgba('#ffffff', borderOpacity);
  const shadowRgba = `rgba(0, 0, 0, ${shadow})`;

  // Update Label Displays
  if (document.getElementById('blur-val')) document.getElementById('blur-val').textContent = `${blur}px`;
  if (document.getElementById('opacity-val')) document.getElementById('opacity-val').textContent = opacity;
  if (document.getElementById('radius-val')) document.getElementById('radius-val').textContent = `${radius}px`;
  if (document.getElementById('border-opacity-val')) document.getElementById('border-opacity-val').textContent = borderOpacity;
  if (document.getElementById('shadow-val')) document.getElementById('shadow-val').textContent = shadow;

  // Apply Styles to Live Preview
  glassCard.style.color = fontColor;
  glassCard.style.background = bgRgba;
  glassCard.style.backdropFilter = `blur(${blur}px)`;
  glassCard.style.webkitBackdropFilter = `blur(${blur}px)`;
  glassCard.style.borderRadius = `${radius}px`;
  glassCard.style.border = `1px solid ${borderRgba}`;
  glassCard.style.boxShadow = `0 8px 32px 0 ${shadowRgba}`;

  // Render Code Output based on Active Tab
  if (currentFormat === 'css') {
    cssCode.textContent = `.glass-card {
  color: ${fontColor};
  background: ${bgRgba};
  backdrop-filter: blur(${blur}px);
  -webkit-backdrop-filter: blur(${blur}px);
  border-radius: ${radius}px;
  border: 1px solid ${borderRgba};
  box-shadow: 0 8px 32px 0 ${shadowRgba};
}`;
  } else {
    // Tailwind CSS arbitrary values representation
    const twBlur = getTailwindBlur(blur);
    cssCode.textContent = `<div class="${twBlur} bg-[${bgRgba}] border border-[${borderRgba}] shadow-[0_8px_32px_0_${shadowRgba.replace(/ /g, '')}] rounded-[${radius}px] text-[${fontColor}]">
  <!-- Card Content -->
</div>`;
  }
}

// Background Switcher Handler
if (bgSelect) {
  bgSelect.addEventListener('change', (e) => {
    mainContent.className = `main-content ${e.target.value}`;
  });
}

// Card Layout Switcher Handler
if (cardTypeSelect) {
  cardTypeSelect.addEventListener('change', (e) => {
    const templateKey = e.target.value;
    if (CARD_TEMPLATES[templateKey]) {
      cardContent.innerHTML = CARD_TEMPLATES[templateKey];
    }
  });
}

// Format Tab Switcher (CSS vs Tailwind)
tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    tabBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFormat = btn.dataset.format;
    updateGlassStyle();
  });
});

// Copy Code to Clipboard
copyBtn.addEventListener('click', () => {
  navigator.clipboard.writeText(cssCode.textContent).then(() => {
    copyBtn.textContent = 'Copied!';
    copyBtn.style.background = '#4ade80';

    setTimeout(() => {
      copyBtn.textContent = 'Copy Code';
      copyBtn.style.background = '#38bdf8';
    }, 1500);
  });
});

// Input Listeners
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

// Preset Button Group Listener (Event Delegation)
const buttonGroup = document.querySelector('.button-group');
if (buttonGroup) {
  buttonGroup.addEventListener('click', (e) => {
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

// Initial Call
updateGlassStyle();