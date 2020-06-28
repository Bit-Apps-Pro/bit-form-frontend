import React from 'react'

export default function Back2FldList({ setElementSetting }) {
  return (
    <div className="flx">
      <button onClick={() => setElementSetting({ id: null, data: { typ: '' } })} className="icn-btn" type="button" aria-label="back to field list">
        <span className="btcd-icn icn-arrow_back" />
      </button>
      <h4>All Field List</h4>
    </div>
  )
}
