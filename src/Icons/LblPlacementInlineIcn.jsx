export default function LblPlacementInlineIcn({ size = 30, strok = 2 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 30 30">
      <rect fill="currentColor" x="11.56" y="11.09" width="16.44" height="7.83" rx="1" />
      <line className="svg-icn" strokeWidth={strok} strokeMiterlimit="10" x1="2" y1="15" x2="8.96" y2="15" />
    </svg>
  )
}
