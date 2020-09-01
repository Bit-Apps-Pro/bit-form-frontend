/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import EditIcn from '../Icons/EditIcn'

export default function TitleModal(props) {
  return (
    <div className="action-btn-wrapper">
      <div className="action-btn" onClick={props.action} >
        <EditIcn />
      </div>
      {props.children}
    </div>
  )
}
