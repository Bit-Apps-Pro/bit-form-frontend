export default function CheckMarkIcn({ size = 30, stroke = 2, cls }) {
  return (
    <svg className={cls} width={size} height={size} viewBox="0 0 30 30">
      <ellipse className="svg-icn" strokeWidth={stroke} cx="15" cy="15" rx="11.95" ry="11.87" />
      <polyline className="svg-icn" strokeWidth={stroke} points="11.07 14.88 14.39 18.26 20.93 11.74" />
    </svg>
  )
}
