import React from 'react'

export default function Tools(props) {
  return (
    <div
      className="tools"
      draggable
      unselectable="on"
      onDragStart={(e) => { e.dataTransfer.setData('text/plain', ''); props.setDrgElm(props.value) }}
    >
      {props.children}
    </div>
  )
}
