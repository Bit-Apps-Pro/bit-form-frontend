export default function UserIcn({ size, stroke = 2.2 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 30 30">
      <circle cx="15" cy="8.2" r="5.5" strokeWidth={stroke} className="svg-icn" />
      <path strokeWidth={stroke} d="M24.6 27.3H5.4a1 1 0 01-1-1.2 10.7 10.7 0 014.2-7.5 8.3 8.3 0 015-1.5h2.9a8.3 8.3 0 015 1.5 10.7 10.7 0 014.2 7.5 1.1 1.1 0 01-1.1 1.2z" className="svg-icn" />
    </svg>
  )
}
