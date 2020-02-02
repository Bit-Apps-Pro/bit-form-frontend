/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'

export default function SingleToggle(props) {
  return (
    <div className={`flx flx-between ${props.className}`}>
      <span>{props.title}</span>
      <div className="onoffswitch">
        <input
          checked={props.isChecked}
          type="checkbox"
          name="onoffswitch"
          onChange={props.action}
          className="onoffswitch-checkbox"
          id={`btcd-onoffswitch-${props.title}`}
        />

        <label className="onoffswitch-label" htmlFor={`btcd-onoffswitch-${props.title}`}>
          <span className="onoffswitch-inner" />
          <span className="onoffswitch-switch" />
        </label>
      </div>
    </div>
  )
}
