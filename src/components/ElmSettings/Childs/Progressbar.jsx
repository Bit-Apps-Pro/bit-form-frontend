import React from 'react'

export default function Progressbar(props) {
  return (
    <div className="flx">
      <span style={{ width: 40 }}>
        {props.value}
        %
      </span>

      <div className="btcd-prgrs-wrp">
        <div className="btcd-prgrs" style={{ width: `${props.value}%` }} />
      </div>
    </div>
  )
}
