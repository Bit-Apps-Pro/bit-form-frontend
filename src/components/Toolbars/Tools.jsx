function Tools({ setNewData, setDrgElm, value, setisToolDragging, children, title }) {
  console.log('%c $render Tools', 'background:red;padding:3px;border-radius:5px;color:white')
  return (
    <div
      tabIndex={0}
      title={title}
      type="button"
      role="button"
      className="tools"
      draggable
      unselectable="on"
      onClick={() => setNewData(value)}
      onKeyPress={() => setNewData(value)}
      onDragStart={(e) => {
        e.dataTransfer.setData('text/plain', '')
        setDrgElm(value)
        setisToolDragging(true)
      }}
      onDragEnd={() => setisToolDragging(false)}
    >
      {children}
    </div>
  )
}

export default Tools
