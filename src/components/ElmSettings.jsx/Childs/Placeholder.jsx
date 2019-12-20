import React, { useState, useEffect } from 'react'

export default function Placeholder(props) {
  const [txt, setTxt] = useState(props.placeholder)

  useEffect(() => {
    setTxt(props.placeholder)
  }, [props])

  const updatePlaceholder = e => {
    e.preventDefault()
    setTxt(e.target.value)
    props.elm.data.child.map(node => {
      if (node.tag === 'input' || node.tag === 'textarea') {
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
      <input type="text" onChange={updatePlaceholder} value={txt} />
    </div>
  )
}
