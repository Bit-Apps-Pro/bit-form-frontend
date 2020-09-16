import React from 'react'

export default function IntegrationStepThree({ step, saveConfig, edit, disabled }) {
  return (
    edit
      ? (
        <div className="txt-center w-9 mt-3">
          <button onClick={saveConfig} className="btn btcd-btn-lg green sh-sm flx" type="button" disabled={disabled}>
            Save
          </button>
        </div>
      )
      : (
        <div className="btcd-stp-page txt-center" style={{ width: step === 3 && '90%', height: step === 3 && '100%' }}>
          <h2 className="ml-3">Successfully Integrated</h2>
          <button onClick={saveConfig} className="btn btcd-btn-lg green sh-sm flx" type="button">
            Finish & Save
            ✔
          </button>
        </div>
      )
  )
}
