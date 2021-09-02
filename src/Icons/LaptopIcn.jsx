export default function LaptopIcn({ size, stroke = 2 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 30 30">
      <rect className="svg-icn" strokeMiterlimit="10" strokeWidth={stroke} x="5.76" y="7.71" width="18.47" height="11.61" rx="1" />
      <line className="svg-icn" strokeMiterlimit="10" strokeWidth={stroke} x1="4" y1="22.29" x2="26" y2="22.29" />
    </svg>
  )
}
