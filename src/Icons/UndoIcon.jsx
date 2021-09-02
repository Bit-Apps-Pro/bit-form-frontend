export default function UndoIcon({ size, stroke = 2 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 30 30">
      <path className="svg-icn" strokeWidth={stroke} strokeMiterlimit="10" d="M11.8,26h3.31a8.15,8.15,0,0,0,8.16-8.08h0A8.15,8.15,0,0,0,15.11,9.8H8.54" />
      <polyline className="svg-icn" strokeWidth={stroke} strokeLinejoin="round" points="12.68 4.03 6.74 9.93 12.68 15.82" />
    </svg>
  )
}
