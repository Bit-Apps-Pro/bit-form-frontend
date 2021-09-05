export default function EllipsisIcon({ size, stroke = 2.5 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 30 30">
      <line className="svg-icn" strokeWidth={stroke} x1="10.27" y1="15" x2="10.27" y2="15" />
      <line className="svg-icn" strokeWidth={stroke} x1="15" y1="15" x2="15" y2="15" />
      <line className="svg-icn" strokeWidth={stroke} x1="19.73" y1="15" x2="19.73" y2="15" />
    </svg>
  )
}
