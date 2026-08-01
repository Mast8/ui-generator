
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

    // Helper: Convert Hex color + Alpha to RGBA string
    function hexToRgba(hex, alpha) {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    // Update Styles & CSS Output Text
    function updateGlassStyle() {
      const blur = blurInput.value;
      const opacity = opacityInput.value;
      const radius = radiusInput.value;
      const borderOpacity = borderOpacityInput.value;
      const shadow = shadowInput.value;
      const hexColor = colorInput.value;

      // Dynamic RGBA Values
      const bgRgba = hexToRgba(hexColor, opacity);
      const borderRgba = hexToRgba('#ffffff', borderOpacity);
      const shadowRgba = `rgba(0, 0, 0, ${shadow})`;

      // Update Label Displays
      document.getElementById('blur-val').textContent = `${blur}px`;
      document.getElementById('opacity-val').textContent = opacity;
      document.getElementById('radius-val').textContent = `${radius}px`;
      document.getElementById('border-opacity-val').textContent = borderOpacity;
      document.getElementById('shadow-val').textContent = shadow;

      // Apply Inline Styles to Card Preview
      glassCard.style.background = bgRgba;
      glassCard.style.backdropFilter = `blur(${blur}px)`;
      glassCard.style.webkitBackdropFilter = `blur(${blur}px)`;
      glassCard.style.borderRadius = `${radius}px`;
      glassCard.style.border = `1px solid ${borderRgba}`;
      glassCard.style.boxShadow = `0 8px 32px 0 ${shadowRgba}`;

      // Render CSS Code Text
      const generatedCSS = `.glass-card {
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

    // Attach Event Listeners to inputs
    const inputs = [blurInput, opacityInput, radiusInput, borderOpacityInput, shadowInput, colorInput];
    inputs.forEach(input => input.addEventListener('input', updateGlassStyle));

    const randomBtn = document.getElementById('random-btn');

    randomBtn.addEventListener('click', () => {
      blurInput.value = Math.floor(Math.random() * 25);
      opacityInput.value = (Math.random() * 0.5 + 0.1).toFixed(2);
      radiusInput.value = Math.floor(Math.random() * 30);
      borderOpacityInput.value = (Math.random() * 0.4 + 0.1).toFixed(2);
      shadowInput.value = (Math.random() * 0.4 + 0.1).toFixed(2);
      updateGlassStyle();
    });

    // Initialize on page load
    updateGlassStyle();