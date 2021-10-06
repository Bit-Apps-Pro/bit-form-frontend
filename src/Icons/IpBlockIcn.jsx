export default function IpBlockIcn({ size = 30, stroke = 2 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 30 30">
      <ellipse
        className="svg-icn"
        strokeWidth={stroke}
        cx="15"
        cy="15"
        rx="11"
        ry="10.93"
      />
      <line
        className="svg-icn"
        strokeWidth={stroke}
        x1="7.23"
        y1="7.26"
        x2="22.77"
        y2="22.74"
      />
      <path
        fill="currentColor"
        d="M8.9,20.36V9.64a1.21,1.21,0,0,1,1.21-1.2h0a1.2,1.2,0,0,1,1.2,1.2V20.36a1.2,1.2,0,0,1-1.2,1.2h0A1.21,1.21,0,0,1,8.9,20.36Z"
      />
      <path
        fill="currentColor"
        d="M17.1,16.48h-.64l-.59,0v3.93a1.21,1.21,0,0,1-1.21,1.2h0a1.2,1.2,0,0,1-1.2-1.2V9.64a1.2,1.2,0,0,1,1.2-1.2h2.6a16.25,16.25,0,0,1,1.67.08,8.16,8.16,0,0,1,1.27.25,4.21,4.21,0,0,1,2.08,1.32A3.55,3.55,0,0,1,23,12.38a3.66,3.66,0,0,1-.4,1.71,3.45,3.45,0,0,1-1.15,1.29,5.52,5.52,0,0,1-1.85.82A10,10,0,0,1,17.1,16.48Zm-1.23-2.07c.14,0,.31,0,.53.05h.66a6.85,6.85,0,0,0,1.63-.16,3.22,3.22,0,0,0,1.07-.43,1.63,1.63,0,0,0,.58-.68,2.05,2.05,0,0,0,.18-.87,1.82,1.82,0,0,0-.27-1,1.71,1.71,0,0,0-.93-.65,4,4,0,0,0-.85-.18c-.34,0-.75-.05-1.24-.05h-.16a1.2,1.2,0,0,0-1.2,1.2Z"
      />
    </svg>
  )
}