import React from 'react'

export default function Tools(props) {
  return (
    <div
      className="tools"
      draggable
      unselectable="on"
      onDragStart={(e) => { e.dataTransfer.setData('text/plain', 'sd'); props.setDrgElm(props.value) }}
      onDragOver={(e) => { e.dataTransfer.dropEffect = 'copy'; e.preventDefault() }}
    >
      {props.children}
    </div>
  )
}
