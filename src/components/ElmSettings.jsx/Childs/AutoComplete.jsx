/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'

export default function AutoComplete(props) {
  function onChecked() {
    props.elm.data.child.map(node => {
      if (node.tag === props.tag) {
        // eslint-disable-next-line no-param-reassign
        node.attr.autoComplete = props.isAutocomplete ? 'off' : 'on'
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
          checked={props.isAutocomplete}
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
