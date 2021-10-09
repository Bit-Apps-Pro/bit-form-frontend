export default function DeSelectIcn({ size = 30, stroke = 2 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 30 30">
      <path
        className="svg-icn"
        strokeWidth={stroke}
        d="M6.4,4.16H23.6a2.43,2.43,0,0,1,2.45,2.41V23.43a2.43,2.43,0,0,1-2.45,2.41H6.4A2.43,2.43,0,0,1,4,23.43V6.57A2.43,2.43,0,0,1,6.4,4.16Z"
      />
      <path
        className="svg-icn"
        strokeWidth={stroke}
        d="M12.4,20.7H10.3a1,1,0,0,1-1-1V17.6"
      />
      <path
        className="svg-icn"
        strokeWidth={stroke}
        d="M20.7,17.6v2.1a1,1,0,0,1-1,1H17.6"
      />
      <path
        className="svg-icn"
        strokeWidth={stroke}
        d="M17.6,9.3h2.1a1,1,0,0,1,1,1v2.1"
      />
      <path
        className="svg-icn"
        strokeWidth={stroke}
        d="M9.3,12.4V10.3a1,1,0,0,1,1-1h2.1"
      />
    </svg>
  )
}
