import React, { memo } from 'react'

function Button({ cls, type, onClick, icn, children, style }) {
  // console.log('%c $render Button', 'background:lightgray;padding:3px;border-radius:5px;')
  return (
    <button
      style={style}
      className={`${icn ? 'icn-btn' : 'btn'}  ${cls}`}
      type={type === undefined ? 'button' : type}
      onClick={onClick}
      aria-label="btcd-button"
    >
      {children}
    </button>
  )
}

export default memo(Button)
