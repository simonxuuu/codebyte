export function darkenHex(hex, amount = 0.5) {
  // Remove the leading hash if present
  hex = hex.replace(/^#/, "");

  // Convert 3-digit hex to 6-digit
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((c) => c + c)
      .join("");
  }

  // Parse the hex color into RGB components
  const num = parseInt(hex, 16);
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;

  // Blend with black (0, 0, 0) by reducing each RGB component
  const newR = Math.round(r * (1 - amount));
  const newG = Math.round(g * (1 - amount));
  const newB = Math.round(b * (1 - amount));

  // Convert back to hex
  const newHex = ((newR << 16) | (newG << 8) | newB)
    .toString(16)
    .padStart(6, "0");

  return `#${newHex}`;
}

// Example usage
console.log(darkenHex("#3498db", 0.5)); // Adjust the amount (0.0 to 1.0) for different darkness levels
