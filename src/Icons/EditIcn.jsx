export default function EditIcn({ className, stroke = 1.8, size = 14 }) {
  // return (
  //   <svg
  //     className={className}
  //     fill="none"
  //     stroke="currentColor"
  //     strokeLinecap="round"
  //     strokeLinejoin="round"
  //     strokeWidth={stroke}
  //     width={size}
  //     height={size}
  //     viewBox="0 0 30 30"
  //   >
  //     <path d="M13.83,6.32H6.11a2.19,2.19,0,0,0-2.2,2.19v15.3A2.19,2.19,0,0,0,6.11,26H21.55a2.19,2.19,0,0,0,2.2-2.19V16.16" />
  //     <path d="M22.1,4.68a2.35,2.35,0,0,1,3.31,0,2.31,2.31,0,0,1,0,3.28L14.93,18.35l-4.41,1.09,1.11-4.37Z" />
  //   </svg>
  // )
  // return <Edit size={size} />
  return (
    <svg height={size} width={size} viewBox="0 0 24 24">
      <g fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 7H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-3" />
        <path d="M9 15h3l8.5-8.5a1.5 1.5 0 0 0-3-3L9 12v3" />
        <path d="M16 5l3 3" />
      </g>
    </svg>
  )
}
