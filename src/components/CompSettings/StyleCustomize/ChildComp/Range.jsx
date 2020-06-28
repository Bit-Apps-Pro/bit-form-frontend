import React from 'react'
import { setCharAt } from '../../../../Utils/Helpers'

export default function Range({ className, title, value, onChange }) {
  let vals = null
  if (value !== undefined) {
    vals = [...value.matchAll(/(\d\.\d)|(\d\d\.\d\d)|(\d)/g)]
    console.log('sssss', vals)
  }
  console.log('ssss', vals)

  const handleVal = (v, ind) => {
    let newVal = value
    newVal = setCharAt(newVal, ind, v)
    onChange(newVal)
  }

  return (
    <div className={className}>
      <div className="title">{title}</div>
      {vals !== null && vals.length > 1 && vals.map(arr => (
        <div className="flx flx-between mt-1 inp-grp">
          <span className="icn br-50 flx mr-1"><span className="btcd-icn icn-settings" /></span>
          <input onChange={e => handleVal(e.target.value, arr[4])} className="btc-range mr-1" type="range" min="0" max="50" value={arr[0]} />
          <input onChange={e => handleVal(e.target.value, arr[4])} className="ml-1" type="number" placeholder="auto" value={arr[0]} />
        </div>
      ))}
    </div>
  )
}
