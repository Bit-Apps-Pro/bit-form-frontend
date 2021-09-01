export default function BackIcon({ size, stroke = 2 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 30 30">
      <path className="svg-icn" strokeWidth={stroke} strokeMiterlimit="10" d="M18.2,26H14.89a8.15,8.15,0,0,1-8.16-8.08h0A8.15,8.15,0,0,1,14.89,9.8h6.57" />
      <polyline className="svg-icn" strokeWidth={stroke} strokeLinejoin="round" points="17.32 4.03 23.27 9.93 17.32 15.82" />
    </svg>
  )
}
