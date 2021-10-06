export default function LayoutIcn({ size = 30, stroke = 2 }) {
  return (
    <svg id="Layer_1" width={size} height={size} viewBox="0 0 30 30">
      <path
        className="svg-icn"
        strokeWidth={stroke}
        d="M6.44,4.24H23.56A2.41,2.41,0,0,1,26,6.63V23.37a2.41,2.41,0,0,1-2.44,2.39H6.44A2.41,2.41,0,0,1,4,23.37V6.63A2.41,2.41,0,0,1,6.44,4.24Z"
      />
      <line className="svg-icn" strokeWidth={stroke} x1="4" y1="11.41" x2="26" y2="11.41" />
      <line className="svg-icn" strokeWidth={stroke} x1="11.33" y1="25.76" x2="11.33" y2="11.41" />
    </svg>
  )
}
