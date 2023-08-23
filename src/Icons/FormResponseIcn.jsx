export default function FormResponseIcn({ size = 32, stroke = 4 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 48 48"
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={stroke}
      >
        <rect width="36" height="36" x="6" y="6" rx="3" />
        <path d="M6 14h34m-10 8h12m-12 8h12m-19-8h1m-1 8h1M14 6v36" />
      </g>
    </svg>
  )
}
