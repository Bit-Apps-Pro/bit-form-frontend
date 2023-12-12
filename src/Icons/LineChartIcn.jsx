export default function LineChartIcn({ size = 20, stroke = 2, className }) {
  return (
    <svg width={size} height={size} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={stroke} d="M4 19h16M4 15l4-6l4 2l4-5l4 4" />
    </svg>
  )
}
