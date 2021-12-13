export default function LightIcn({ size = 18, stroke = 2 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 30 30" fill="none" stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth={stroke}>
      <circle cx="15" cy="15" r="4.22" />
      <line x1="15" y1="7.11" x2="15" y2="3.37" />
      <line x1="20.58" y1="9.42" x2="23.23" y2="6.77" />
      <line x1="22.89" y1="15" x2="26.63" y2="15" />
      <line x1="20.58" y1="20.58" x2="23.23" y2="23.23" />
      <line x1="15" y1="22.89" x2="15" y2="26.63" />
      <line x1="9.42" y1="20.58" x2="6.77" y2="23.23" />
      <line x1="7.11" y1="15" x2="3.37" y2="15" />
      <line x1="9.42" y1="9.42" x2="6.77" y2="6.77" />
    </svg>
  )
}
