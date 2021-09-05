import { memo, useEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import { $draggingField } from '../../GlobalStates'

function Tools({ setNewData, setDrgElm, value, setisToolDragging, children, title }) {
  console.log('%c $render Tools', 'background:red;padding:3px;border-radius:5px;color:white')
  const setDraggingField = useSetRecoilState($draggingField)

  useEffect(() => {
    const a = document.createElement('div')
    a.innerHTML = 'asd'
    a.classList.add('tools')
    document.body.appendChild(a)
  }, [])

  return (
    <div
      tabIndex={0}
      title={title}
      type="button"
      role="button"
      className="tools"
      draggable
      // onDrag={e => debounce(bounce(e), 1000)}
      unselectable="on"
      onClick={() => setNewData(value)}
      onKeyPress={() => setNewData(value)}
      onDragStart={(e) => {
        e.dataTransfer.setData('text/plain', '')
        // setDrgElm(value)
        // setisToolDragging(true)
        setDraggingField(value)
      }}
      onDragEnd={() => setDraggingField(null)}
    >
      {children}
    </div>
  )
}

export default memo(Tools)
