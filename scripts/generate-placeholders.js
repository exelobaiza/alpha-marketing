const fs = require('fs');
const path = require('path');

// Función para crear un SVG de placeholder
function createPlaceholderSVG(width, height, text, bgColor = '#1a1a1a', textColor = '#ffffff') {
  return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="${bgColor}"/>
    <text 
      x="50%" 
      y="50%" 
      font-family="Arial, sans-serif" 
      font-size="24" 
      text-anchor="middle" 
      dominant-baseline="middle" 
      fill="${textColor}"
    >
      ${text}
    </text>
  </svg>`;
}

// Crear directorio de imágenes si no existe
const imagesDir = path.join(__dirname, '../public/images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Generar 6 imágenes de placeholder
for (let i = 1; i <= 6; i++) {
  const svg = createPlaceholderSVG(800, 600, `Imagen ${i}`, '#1a1a1a', '#ffffff');
  fs.writeFileSync(path.join(imagesDir, `video-placeholder-${i}.svg`), svg);
  console.log(`Creado: video-placeholder-${i}.svg`);
}

console.log('Placeholders generados correctamente.'); 