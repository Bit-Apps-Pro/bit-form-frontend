import React from 'react'

export default function Tools(props) {
  return (
    <div
      tabIndex={0}
      type="button"
      role="button"
      className="tools"
      draggable
      unselectable="on"
      onClick={() => props.setNewData(props.value)}
      onKeyPress={e => console.log(e)}
      onDragStart={(e) => { e.dataTransfer.setData('text/plain', ''); props.setDrgElm(props.value) }}
    >
      {props.children}
    </div>
  )
}
