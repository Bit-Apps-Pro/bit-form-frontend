export default function DragIcn({ size, stroke = 2 }) {
  return (
    <svg width={size} height={size} fill="none">
      <circle r=".923" fill="#C4C4C4" transform="matrix(-1 0 0 1 1.807 4)" />
      <circle r=".923" fill="#C4C4C4" transform="matrix(-1 0 0 1 5.192 .923)" />
      <circle r=".923" fill="#C4C4C4" transform="matrix(-1 0 0 1 5.192 4)" />
      <circle r=".923" fill="#C4C4C4" transform="matrix(-1 0 0 1 5.192 7.077)" />
      <circle r=".923" fill="#C4C4C4" transform="matrix(-1 0 0 1 1.807 .923)" />
      <circle r=".923" fill="#C4C4C4" transform="matrix(-1 0 0 1 1.807 7.077)" />
    </svg>
  )
}
