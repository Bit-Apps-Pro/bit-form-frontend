export default function LockIcn({ size = 30, stroke = 2, style }) {
  return (
    <svg width={size} height={size} style={{ ...style }} viewBox="0 0 30 30">
      <path
        className="svg-icn"
        strokeWidth={stroke}
        d="M6.44,13.78H23.56A2.44,2.44,0,0,1,26,16.22v8.54a2.44,2.44,0,0,1-2.44,2.44H6.44A2.44,2.44,0,0,1,4,24.76V16.22A2.44,2.44,0,0,1,6.44,13.78Z"
      />
      <path
        className="svg-icn"
        strokeWidth={stroke}
        d="M8.89,13.78V8.9a6.11,6.11,0,0,1,12.22,0v4.88"
      />
    </svg>
  )
}
