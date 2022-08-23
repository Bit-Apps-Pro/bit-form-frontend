export default function ChevronDownIcn({ rotate, size, stroke = 2, viewBox = '0 0 24 24', className }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox={viewBox}
      style={{ transform: rotate ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform .2s' }}
    >
      <path d="M6 9l6 6l6-6" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
    // <svg
    //   className={className}
    //   width={size}
    //   height={size}
    //   viewBox={viewBox}
    //   fill="none"
    //   stroke="currentColor"
    //   strokeWidth={stroke}
    //   strokeLinecap="round"
    //   strokeLinejoin="round"
    //   style={{ transform: rotate ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform .2s' }}
    // >
    //   <polyline points="6 9 12 15 18 9" />
    // </svg>
  )
}
