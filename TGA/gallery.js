function generateRandomColor() {
  // Darker, more unsettling colors
  const hue = Math.random() > 0.7 ? 0 : 220 + Math.random() * 40; // Mostly dark blues with occasional red
  return `hsl(${hue}, ${30 + Math.random() * 40}%, ${10 + Math.random() * 20}%)`;
}

function generateDistortedFace() {
  const eyeSize = 5 + Math.random() * 10;
  const eyeSpacing = 20 + Math.random() * 30;
  const eyeHeight = 30 + Math.random() * 20;
  const mouthWidth = 20 + Math.random() * 40;
  const mouthHeight = 60 + Math.random() * 20;

  return `
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" fill="${generateRandomColor()}" />
      
      <!-- Distorted head shape -->
      <path
        d="M 20,20 
           Q ${50 + Math.random() * 20},${10 + Math.random() * 10} 80,20 
           Q ${90 + Math.random() * 10},50 80,80 
           Q ${50 + Math.random() * 20},${90 + Math.random() * 10} 20,80 
           Q ${10 + Math.random() * 10},50 20,20"
        fill="${generateRandomColor()}"
        opacity="0.8"
      />
      
      <!-- Asymmetrical eyes -->
      <ellipse 
        cx="${50 - eyeSpacing/2}" cy="${eyeHeight}" 
        rx="${eyeSize}" ry="${eyeSize * (0.5 + Math.random())}"
        fill="#000"
        transform="rotate(${Math.random() * 40 - 20} ${50 - eyeSpacing/2} ${eyeHeight})"
      />
      <ellipse 
        cx="${50 + eyeSpacing/2}" cy="${eyeHeight}" 
        rx="${eyeSize * (0.7 + Math.random() * 0.6)}" ry="${eyeSize}"
        fill="#000"
        transform="rotate(${Math.random() * 40 - 20} ${50 + eyeSpacing/2} ${eyeHeight})"
      />
      
      <!-- Creepy mouth -->
      <path
        d="M ${50 - mouthWidth/2},${mouthHeight} 
           Q ${50},${mouthHeight + (Math.random() > 0.5 ? 20 : -20)} ${50 + mouthWidth/2},${mouthHeight}"
        stroke="#300"
        stroke-width="2"
        fill="none"
      />
    </svg>
  `;
}

function generateChaoticPattern() {
  const elements = [];
  const numElements = 20 + Math.floor(Math.random() * 30);
  
  for (let i = 0; i < numElements; i++) {
    const points = [];
    const numPoints = 3 + Math.floor(Math.random() * 4);
    for (let j = 0; j < numPoints; j++) {
      points.push(`${Math.random() * 100},${Math.random() * 100}`);
    }
    
    elements.push(`
      <path
        d="M ${points.join(' L ')} Z"
        fill="${generateRandomColor()}"
        opacity="${0.3 + Math.random() * 0.4}"
        transform="rotate(${Math.random() * 360} 50 50)"
      >
        <animate
          attributeName="d"
          dur="${2 + Math.random() * 4}s"
          repeatCount="indefinite"
          values="M ${points.join(' L ')} Z;M ${points.map(() => `${Math.random() * 100},${Math.random() * 100}`).join(' L ')} Z;M ${points.join(' L ')} Z"
        />
      </path>
    `);
  }

  return `
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" fill="${generateRandomColor()}" />
      ${elements.join('')}
    </svg>
  `;
}

function generateGlitchArt() {
  const elements = [];
  const numGlitches = 15 + Math.floor(Math.random() * 20);
  
  for (let i = 0; i < numGlitches; i++) {
    const y = (100 / numGlitches) * i;
    const height = 100 / numGlitches;
    const offset = Math.random() * 20 - 10;
    
    elements.push(`
      <rect
        x="${offset}"
        y="${y}"
        width="100"
        height="${height}"
        fill="${generateRandomColor()}"
        opacity="${0.5 + Math.random() * 0.5}"
      >
        <animate
          attributeName="x"
          values="${offset};${offset + (Math.random() * 10 - 5)};${offset}"
          dur="${0.1 + Math.random() * 0.3}s"
          repeatCount="indefinite"
        />
      </rect>
    `);
  }

  return `
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" fill="${generateRandomColor()}" />
      ${elements.join('')}
    </svg>
  `;
}

// Generate the gallery
const gallery = document.getElementById('gallery');
const numArtworks = 12;

for (let i = 0; i < numArtworks; i++) {
  const artPiece = document.createElement('div');
  artPiece.className = 'art-piece';
  
  const artStyle = Math.random();
  let artwork;
  
  if (artStyle < 0.4) {
    artwork = generateDistortedFace();
  } else if (artStyle < 0.7) {
    artwork = generateChaoticPattern();
  } else {
    artwork = generateGlitchArt();
  }
  
  artPiece.innerHTML = artwork;
  gallery.appendChild(artPiece);
}
