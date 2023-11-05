export default function TopLeftArrowIcn({ size = 32, stroke = 1.5 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
    >
      <path
        className="svg-icn"
        strokeWidth={stroke}
        d="M4 4h16v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4Zm10 6h-4m0 0v4m0-4l4 4"
      />

    </svg>
  )
}
