import React from 'react'

export default function SingleInput(props) {
  return (
    <div className="mt-3 setting-inp">
      <span>{props.title}</span>
      <input type={props.inpType} onChange={props.action} value={props.value} placeholder={props.placeholder} />
    </div>
  )
}
