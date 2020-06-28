import React from 'react'

export default function BtnGrp({ btns, value, onChange }) {
  return (
    <div className="btc-btn-grp">
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
