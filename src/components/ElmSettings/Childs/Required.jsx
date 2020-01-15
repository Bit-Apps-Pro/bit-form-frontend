/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'

export default function Required(props) {
  function onChecked() {
    props.elm.data.child.map(node => {
      if (node.tag === props.tag) {
        // eslint-disable-next-line no-param-reassign
        node.attr.required = !props.isChecked
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
          checked={props.isChecked}
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
