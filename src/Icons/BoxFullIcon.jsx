export default function BoxFullIcon({ size, stroke = 2 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" strokeWidth={stroke}>
      <rect x="0.5" y="0.5" width="15" height="15" rx="3" stroke="currentColor" />
    </svg>
  )
}
