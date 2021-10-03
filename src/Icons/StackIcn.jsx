export default function StackIcn({ size = 30, stroke = 2 }) {
  return (
    <svg id="Layer_1" width={size} height={size} viewBox="0 0 30 30">
      <path
        strokeWidth={stroke}
        className="svg-icn"
        d="M26,15H20.32a1.75,1.75,0,0,0-1.43.74l-1.18,1.7a1.75,1.75,0,0,1-1.43.74H13.72a1.75,1.75,0,0,1-1.43-.74l-1.18-1.7A1.75,1.75,0,0,0,9.68,15H4"
      />
      <path
        strokeWidth={stroke}
        className="svg-icn"
        d="M7.79,7.69,4,15v6.36a2.16,2.16,0,0,0,2.2,2.12H23.8A2.16,2.16,0,0,0,26,21.36V15L22.2,7.69a2.19,2.19,0,0,0-2-1.17H9.76A2.22,2.22,0,0,0,7.79,7.69Z"
      />
    </svg>
  )
}
