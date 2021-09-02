export default function MobileIcon({ size, w, h, stroke = 2 }) {
  const s = {}
  if (size) {
    s.w = size
    s.h = size
  } else {
    s.w = w
    s.h = h
  }
  return (
    <svg width={s.w} height={s.h} viewBox="0 0 30 30">
      <rect class="svg-icn" strokeWidth={stroke} x="8.67" y="4" width="12.66" height="22" rx="3" />
      <line class="svg-icn" strokeWidth={stroke} x1="15" y1="23.22" x2="15" y2="23.22" />
    </svg>
  )
}