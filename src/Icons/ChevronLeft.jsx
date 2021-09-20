export default function ChevronLeft({ size, stroke = 2 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      strokeWidth={stroke}
      className="svg-icn"
    >
      <polyline points="15 18 9 12 15 6" />
    </svg>
  )
}
