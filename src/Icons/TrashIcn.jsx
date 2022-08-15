import { Trash } from 'iconsax-react'

export default function TrashIcn({ size = 15, stroke = 2 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
    >
      <g fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 7h16" />
        <path d="M10 11v6" />
        <path d="M14 11v6" />
        <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12" />
        <path d="M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3" />
      </g>
    </svg>
    // <svg
    //   width={size}
    //   height={size}
    //   viewBox="0 0 30 30"
    //   fill="none"
    //   stroke="currentColor"
    //   strokeLinecap="round"
    //   strokeLinejoin="round"
    // >
    //   <polyline className="svg-icn" points="4 7.68 6.44 7.68 26 7.68" />
    //   <path strokeWidth={stroke} d="M23.56,7.68V24.76a2.45,2.45,0,0,1-2.45,2.44H8.89a2.45,2.45,0,0,1-2.45-2.44V7.68m3.67,0V5.24A2.45,2.45,0,0,1,12.56,2.8h4.88a2.45,2.45,0,0,1,2.45,2.44V7.68" />
    //   <line strokeWidth={stroke} x1="12.56" y1="13.78" x2="12.56" y2="21.1" />
    //   <line strokeWidth={stroke} x1="17.44" y1="13.78" x2="17.44" y2="21.1" />
    // </svg>
  )
}
