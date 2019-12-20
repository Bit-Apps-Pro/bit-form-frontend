import React, { useState, useEffect } from 'react'

export default function Label(props) {
  const [label, setLabel] = useState(props.label)

  useEffect(() => {
    setLabel(props.label)
  }, [props])

  const updateLabel = e => {
    e.preventDefault()
    setLabel(e.target.value)
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
    <div key="#laeble2" className="mt-3 setting-inp">
      <span>Label:</span>
      <input key="##11" type="text" onChange={updateLabel} value={label} />
    </div>
  )
}
