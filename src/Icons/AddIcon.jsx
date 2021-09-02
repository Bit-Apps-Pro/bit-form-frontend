export default function AddIcon({ size, stroke = 2 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 30 30">
      <path
        className="svg-icn"
        strokeWidth="stroke"
        d="M6.4,4.16H23.6a2.43,2.43,0,0,1,2.45,2.41V23.43a2.43,2.43,0,0,1-2.45,2.41H6.4A2.43,2.43,0,0,1,4,23.43V6.57A2.43,2.43,0,0,1,6.4,4.16Z"
      />
      <line className="svg-icn" strokeWidth={stroke} x1="15" y1="10.18" x2="15" y2="19.82" />
      <line className="svg-icn" strokeWidth={stroke} x1="10.09" y1="15" x2="19.91" y2="15" />
    </svg>
  )
}
