export default function TweaksIcn({ size, stroke = 2 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 19 20" fill="none">
      <path d="M1 3H18" stroke="currentColor" strokeLinecap="round" />
      <path d="M4 1V5" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" />
      <path d="M1 10H18" stroke="currentColor" strokeLinecap="round" />
      <path d="M14 8V12" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" />
      <path d="M1 17H18" stroke="currentColor" strokeLinecap="round" />
      <path d="M6 15V19" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" />
    </svg>
  )
}
