import React from 'react'

export default function Tools(props) {
  return (
    <div
      className="tools"
      draggable
      unselectable="on"
      onDragStart={() => props.setDrgElm(props.value)}
    >
      {props.children}
    </div>
  )
}
