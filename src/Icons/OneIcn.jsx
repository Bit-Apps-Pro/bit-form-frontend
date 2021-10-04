export default function OneIcn({ size = 30, stroke = 2, style }) {
  return (
    <svg width={size} height={size} viewBox="0 0 30 30" style={{ ...style }}>
      <path
        className="svg-icn"
        strokeWidth={stroke}
        strokeMiterlimit="10"
        d="M23.21,18.2v.69a5.68,5.68,0,0,1-5.7,5.67H9.7A5.68,5.68,0,0,1,4,18.89V11.11A5.68,5.68,0,0,1,9.7,5.44h7.81a5.68,5.68,0,0,1,5.7,5.67v2.47"
      />
      <path d="M10.05,19.14h2.63V11.42H10.51V10.09A9.85,9.85,0,0,0,12,9.69a6.6,6.6,0,0,0,1.2-.56h1.6v10h2.32v1.73H10.05Z" />
      <polyline className="svg-icn" strokeWidth={stroke} strokeLinejoin="round" points="20.47 11.29 23.22 14.02 26 11.25" />
    </svg>
  )
}
