export default function MobileIcon({ size, stroke = 2 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 30 30">
      <rect className="svg-icn" strokeWidth={stroke} x="8.67" y="4" width="12.66" height="22" rx="3" />
      <line className="svg-icn" strokeWidth={stroke} x1="15" y1="23.22" x2="15" y2="23.22" />
    </svg>
  )
}
