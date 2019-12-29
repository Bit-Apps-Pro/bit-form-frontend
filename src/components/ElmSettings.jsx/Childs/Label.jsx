import React from 'react'

export default function Label(props) {
  const updateLabel = e => {
    props.elm.data.child.map(node => {
      if (node.tag === 'label') {
        // eslint-disable-next-line no-param-reassign
        node.child = e.target.value
      }
      return null
    })
    props.updateData(props.elm)
  }
  return (
    <div className="mt-3 setting-inp">
      <span>Label:</span>
      <input type="text" onChange={updateLabel} value={props.label} />
    </div>
  )
}
