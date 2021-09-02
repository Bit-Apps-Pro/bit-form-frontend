export default function LayerIcon({ size, stroke = 2.15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 30 30">
      <path
        className="svg-icn"
        strokeWidth={stroke}
        d="M14.17,4.22,7.05,7.76a1.82,1.82,0,0,0,0,3.28l7.19,3.57a1.69,1.69,0,0,0,1.52,0L23,11a1.82,1.82,0,0,0,0-3.28L15.83,4.22A1.86,1.86,0,0,0,14.17,4.22Z"
      />
      <path className="svg-icn" strokeWidth={stroke} d="M4.86,20.58l9.38,5.21a1.69,1.69,0,0,0,1.52,0l9.38-5.21" />
      <path className="svg-icn" strokeWidth={stroke} d="M4.86,15l9.38,5.21a1.69,1.69,0,0,0,1.52,0L25.14,15" />
    </svg>
  )
}
