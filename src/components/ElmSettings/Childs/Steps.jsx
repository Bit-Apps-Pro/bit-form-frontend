import React from 'react'

function Steps({ step, active, className }) {
  let a = [1, 32, 334, 4, 43, 34]
  for (let i = 0; i < step - active; i += 1) {
    for (let j = 0; j < active; j += 1) {
    }
  }

  return (
    <div className={`d-in-b ${className}`}>
      <div className="flx flx-center">
        {Array(active).fill(0).map((itm, i) => (
          <>
            <div className="btcd-stp stp-a  txt-center">{i + 1}</div>
            {active - 1 !== i && <div className="btcd-stp-line stp-line-a" />}
          </>
        ))}
        {(step - active) !== 0 && <div className="btcd-stp-line" />}
        {Array(step - active).fill(0).map((itm, i) => (
          <>
            <div className="btcd-stp txt-center">{i + active + 1}</div>
            {(step - active - 1) !== i && <div className="btcd-stp-line " />}
          </>
        ))}
      </div>
    </div>
  )
}

export default Steps
