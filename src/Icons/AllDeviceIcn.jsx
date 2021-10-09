export default function AllDeviceIcn({ size = 30, stroke = 2 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 30 30">
      <line className="svg-icn" strokeWidth={stroke} x1="18.37" y1="21.71" x2="19.93" y2="21.71" />
      <path
        className="svg-icn"
        strokeWidth={stroke}
        d="M27.72,14.19V24.76a1.31,1.31,0,0,1-1.3,1.31h-5a1.31,1.31,0,0,1-1.3-1.31V14.19a1.3,1.3,0,0,1,1.3-1.31h5A1.31,1.31,0,0,1,27.72,14.19Z"
      />
      <line className="svg-icn" strokeWidth={stroke} x1="23.93" y1="23.6" x2="23.93" y2="23.6" />
      <path
        className="svg-icn"
        strokeWidth={stroke}
        d="M20.53,4.55V9.89H14.72a1.25,1.25,0,0,0-1.25,1.25v7.28H4.91a1.08,1.08,0,0,1-1.07-1.08V4.55A1.07,1.07,0,0,1,4.91,3.48H19.45A1.07,1.07,0,0,1,20.53,4.55Z"
      />
      <path
        className="svg-icn"
        strokeWidth={stroke}
        d="M24.42,11.14v1.74h-3a1.3,1.3,0,0,0-1.3,1.31V24.25H14.72A1.25,1.25,0,0,1,13.47,23V11.14a1.25,1.25,0,0,1,1.25-1.25h8.45A1.25,1.25,0,0,1,24.42,11.14Z"
      />
      <line className="svg-icn" strokeWidth={stroke} x1="13.47" y1="22.3" x2="2.28" y2="22.3" />
    </svg>
  )
}
