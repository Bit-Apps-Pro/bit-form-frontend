import React from 'react'

function Tools(props) {
  console.log('%c $render Tools', 'background:red;padding:3px;border-radius:5px;color:white')
  return (
    <div
      tabIndex={0}
      type="button"
      role="button"
      className="tools"
      draggable
      unselectable="on"
      onClick={() => props.setNewData(props.value)}
      onKeyPress={() => props.setNewData(props.value)}
      onDragStart={(e) => {
        e.dataTransfer.setData('text/plain', '')
        props.setDrgElm(props.value)
        props.setisToolDragging(true)
      }}
      onDragEnd={() => props.setisToolDragging(false)}
    >
      {props.children}
    </div>
  )
}

export default Tools
