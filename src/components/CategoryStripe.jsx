export default function CategoryStripe({ title, color, className, textColor }) {
  const colors = {
    red: "#ff5252",
    darkRed: "#950000",
    maroon: "#800000",
    orange: "#ff8c00",
    gold: "#ffd700",
    coral: "#ff7f50",
    yellow: "#ffd754",
    olive: "#808000",
    lime: "#00ff00",
    green: "#66fc66",
    darkGreen: "#006800",
    teal: "#008080",
    cyan: "#00ffff",
    skyblue: "#87ceeb",
    blue: "#4787ff",
    indigo: "#4b0082",
    navy: "#000080",
    violet: "#8a2be2",
    purple: "#800095",
    darkPurple: "#570064",
    magenta: "#ff00ff",
    pink: "#ff6bb5",
    salmon: "#fa8072",
    tan: "#d2b48c",
    brown: "#693300",
    silver: "#C0C0C0",
    gray: "#808080",
    white: "#ffffff",
  };

  return (
    <p
      style={{ backgroundColor: colors[color] }}
      className={`px-2 py-1 max-w-40  text-center rounded-md ${textColor ?? "text-white"} text-lg flex items-center justify-center  ${className}`}
    >
      {title}
    </p>
  );
}
