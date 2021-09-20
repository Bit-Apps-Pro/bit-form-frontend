export default function ChevronDownIcn({ rotate, size, stroke = 2, viewBox = '0 0 24 24' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={viewBox}
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={rotate ? { transform: 'rotate(180deg)' } : { transform: 'rotate(0deg)' }}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}
