import React, { useState, useEffect } from 'react'

export default function AutoComplete(props) {
  const [isAutocomplete, setisAutocomplete] = useState(props.isAutocomplete)
  useEffect(() => {
    setisAutocomplete(props.isAutocomplete)
  }, [props])
  function onChecked() {
    setisAutocomplete(!isAutocomplete)
    props.elm.data.child.map(node => {
      if (node.tag === props.tag) {
        node.attr.autoComplete = isAutocomplete ? 'off' : 'on'
      }
      return null
    })
    props.updateData(props.elm)
  }
  return (
    <div className="mt-2 flx flx-between">
      <span>Auto Complete</span>
      <div className="onoffswitch">
        <input
          checked={isAutocomplete}
          type="checkbox"
          name="onoffswitch"
          onChange={onChecked}
          className="onoffswitch-checkbox"
          id="btcd-onoffswitch-autocomplete"
        />

        <label className="onoffswitch-label" htmlFor="btcd-onoffswitch-autocomplete">
          <span className="onoffswitch-inner" />
          <span className="onoffswitch-switch" />
        </label>
      </div>
    </div>
  )
}
