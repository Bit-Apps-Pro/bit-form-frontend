export default function FilterIcn({ size, stroke = '2.5' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"

    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={stroke}
        d="M4 3h16a1 1 0 0 1 1 1v1.586a1 1 0 0 1-.293.707l-6.415 6.414a1 1 0 0 0-.292.707v6.305a1 1 0 0 1-1.243.97l-2-.5a1 1 0 0 1-.757-.97v-5.805a1 1 0 0 0-.293-.707L3.292 6.293A1 1 0 0 1 3 5.586V4a1 1 0 0 1 1-1Z"
      />
    </svg>
  )
}
