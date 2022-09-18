export default function ChevronDoubleIcn({ size, stroke = 2, dir = 'left' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      style={{ transform: `rotate(${dir === 'right' ? '180deg' : '0deg'})` }}
    >
      <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={stroke} d="m11 7l-5 5l5 5m6-10l-5 5l5 5" />
    </svg>
  )
}
