export default function InfoIcn({ size = 30, stroke = 2 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 30 30">
      <ellipse
        className="svg-icn"
        strokeWidth={stroke}
        strokeMiterlimit="10"
        cx="15"
        cy="15"
        rx="11"
        ry="11.09"
      />
      <line
        className="svg-icn"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        x1="15"
        y1="13.15"
        x2="15"
        y2="21.72"
      />
      <line
        className="svg-icn"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        x1="15"
        y1="9.71"
        x2="15"
        y2="9.71"
      />
    </svg>
  )
}
