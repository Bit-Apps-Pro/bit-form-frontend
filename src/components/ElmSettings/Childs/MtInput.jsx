import React, { memo } from 'react'

function MtInput({ label, onChange, value }) {
  return (
    <label className="btcd-mt-inp">
      <input onChange={onChange} placeholder=" " value={value} />
      <span>{label}</span>
    </label>
  )
}

export default memo(MtInput)
