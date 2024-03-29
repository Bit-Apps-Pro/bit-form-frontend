export default function BoxIcon({ size, stroke = 2, variant = 'all', className }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" strokeWidth={stroke} className={className}>
      <path d="M4 1H12" stroke={variant.match(/all|top/) ? 'currentColor' : '#b0b0b0'} />
      <path d="M4 15H12" stroke={variant.match(/all|bottom/) ? 'currentColor' : '#b0b0b0'} />
      <path d="M1 4L1 12" stroke={variant.match(/all|left/) ? 'currentColor' : '#b0b0b0'} />
      <path d="M15 4L15 12" stroke={variant.match(/all|right/) ? 'currentColor' : '#b0b0b0'} />
    </svg>

  )
}
