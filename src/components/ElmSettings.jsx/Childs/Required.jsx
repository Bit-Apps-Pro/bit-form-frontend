import React, { useState, useEffect } from 'react'

export default function Required(props) {
  const [isChecked, setisChecked] = useState(props.isChecked)

  useEffect(() => {
    setisChecked(props.isChecked)
  }, [props])

  function onChecked() {
    setisChecked(!isChecked)
    props.elm.data.child.map(node => {
      if (node.tag === props.tag) {
        node.attr.required = !isChecked
      }
      return null
    })
    props.updateData(props.elm)
  }
  return (
    <div className="flx flx-between">
      <span>Required</span>
      <div className="onoffswitch">
        <input
          checked={isChecked}
          type="checkbox"
          name="onoffswitch"
          onChange={onChecked}
          className="onoffswitch-checkbox"
          id="btcd-onoffswitch"
        />

        <label className="onoffswitch-label" htmlFor="btcd-onoffswitch">
          <span className="onoffswitch-inner" />
          <span className="onoffswitch-switch" />
        </label>
      </div>
    </div>
  )
}
