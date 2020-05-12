import React, { memo } from 'react'

function MtSelect({ className, onChange, value, label, children,style }) {
  return (
    <div onChange={onChange} className={`btcd-mt-sel ${className}`} style={style}>
      <select value={value}>
        {children}
      </select>
      <small>{label}</small>
    </div>
  )
}

export default memo(MtSelect)
