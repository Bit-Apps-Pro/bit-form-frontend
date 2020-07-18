import React from 'react'

export default function BtnGrp({ btns, value, onChange, className }) {
  return (
    <div className={`btc-btn-grp ${className}`}>
      {btns.map(btn => (
        <button
          key={btn.lbl}
          onClick={() => onChange(btn.lbl)}
          className={`tooltip ${value === btn.lbl && 'active'}`}
          style={{ '--tooltip-txt': `"${btn.lbl}"` }}
          type="button"
        >
          {btn.icn}
        </button>
      ))}
    </div>
  )
}
