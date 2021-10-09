export default function HistoryIcn({ size = 30, stroke = 2 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 30 30">
      <path
        className="svg-icn"
        strokeWidth={stroke}
        d="M9.16,23.13A10.81,10.81,0,1,0,5.48,15"
      />
      <polyline
        className="svg-icn"
        strokeWidth={stroke}
        points="2.91 13.71 5.48 16.29 7.95 13.82"
      />
      <polyline
        className="svg-icn"
        strokeWidth={stroke}
        points="20.09 20.33 15.29 16 15.29 9.53"
      />
    </svg>
  )
}
