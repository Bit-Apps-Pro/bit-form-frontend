import React from 'react'

export default function Placeholder(props) {
  const updatePlaceholder = e => {
    e.preventDefault()
    props.elm.data.child.map(node => {
      if (node.tag === 'input' || node.tag === 'textarea' || node.tag === 'select') {
        // eslint-disable-next-line no-param-reassign
        node.attr.placeholder = e.target.value
      }
      return null
    })
    props.updateData(props.elm)
  }
  return (
    <div className="mt-3 setting-inp">
      <span>Placeholder:</span>
      <input type="text" onChange={updatePlaceholder} value={props.placeholder} />
    </div>
  )
}
