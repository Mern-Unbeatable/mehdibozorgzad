const COLOR_HEX = {
  beige: '#c8b89a',
  black: '#3a3330',
  blue: '#4a6fa5',
  brown: '#796f65',
  cream: '#e8e3dc',
  gold: '#8b6914',
  gray: '#857c75',
  grey: '#857c75',
  green: '#6b8e6b',
  ivory: '#f5f0e8',
  navy: '#1e3a5f',
  orange: '#c67b3c',
  pink: '#c9958a',
  purple: '#7d6b8a',
  red: '#8b3a3a',
  tan: '#92826d',
  taupe: '#8e847b',
  white: '#f0ebe4',
  yellow: '#c9a227',
};

function hashColor(name) {
  let hash = 0;
  for (let i = 0; i < name.length; i += 1) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash) % 360;
  return `hsl(${hue}, 32%, 42%)`;
}

/** Map a catalog color name to a swatch fill for the product detail UI. */
export function colorSwatchHex(name) {
  const normalized = String(name ?? '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '');

  if (COLOR_HEX[normalized]) return COLOR_HEX[normalized];

  const match = Object.entries(COLOR_HEX).find(([key]) => normalized.includes(key));
  if (match) return match[1];

  return hashColor(normalized || 'color');
}
