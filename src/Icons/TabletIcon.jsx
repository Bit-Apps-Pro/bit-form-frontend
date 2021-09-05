export default function TabletIcon({ size, stroke = 2 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 30 30">
      <rect className="svg-icn" strokeWidth={stroke} x="5.81" y="4" width="18.38" height="22" rx="2" />
      <line className="svg-icn" strokeWidth={stroke} x1="13.01" y1="23.22" x2="16.99" y2="23.22" />
    </svg>
  )
}
