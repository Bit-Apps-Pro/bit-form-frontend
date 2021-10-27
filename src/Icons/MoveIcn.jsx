export default function MoveIcn({ size, stroke = 3 }) {
  return (
    <svg width={size} height={size} fill="none" stroke="currentColor" strokeWidth={stroke} viewBox="0 0 30 30">
      <polyline points="23.31 12.31 26 15 23.31 17.69 26 15 4 15 6.69 17.69 4 15 6.69 12.31" />
      <polyline points="17.69 23.31 15 26 12.31 23.31 15 26 15 4 12.31 6.69 15 4 17.69 6.69" />
    </svg>
  )
}
