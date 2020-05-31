import React from 'react'

export default function SingleInput(props) {
  return (
    <div className={`mt-3 setting-inp ${props.className}`} style={{ ...(props.width && { width: props.width }) }}>
      <span>{props.title}</span>
      <input className="btcd-paper-inp" type={props.inpType} onChange={props.action} value={props.value} placeholder={props.placeholder} />
    </div>
  )
}
