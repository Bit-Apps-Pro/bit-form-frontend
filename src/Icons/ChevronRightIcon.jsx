export default function ChevronRightIcon({ size, stroke = 2 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      strokeWidth={stroke}
      className="svg-icn"
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  )
}
