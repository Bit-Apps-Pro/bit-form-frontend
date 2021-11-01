export default function LblPlacementReverseIcn({ size = 30, strok = 2 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 30 30">
      <rect fill="currentColor" x="2" y="11.09" width="16.44" height="7.83" rx="1" transform="translate(20.44 30) rotate(180)" />
      <line className="svg-icn" strokeMiterlimit="10" strokeWidth={strok} x1="28" y1="15" x2="21.04" y2="15" />
    </svg>
  )
}
