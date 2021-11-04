export default function LblPlacementTopIcn({ size = 30, stroke = 2 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 30 30">
      <rect fill="currentColor" x="2" y="14.09" width="26" height="7.83" rx="1" />
      <line className="svg-icn" strokeMiterlimit="10" strokeWidth={stroke} x1="2" y1="9.09" x2="17.95" y2="9.09" />
    </svg>
  )
}
