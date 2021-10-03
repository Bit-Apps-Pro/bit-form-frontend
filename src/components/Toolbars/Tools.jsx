import { memo, useEffect } from 'react'
import { useFela } from 'react-fela'
import { useSetRecoilState } from 'recoil'
import { $draggingField } from '../../GlobalStates'

function Tools({ setNewData, setDrgElm, value, setisToolDragging, children, title }) {
  console.log('%c $render Tools', 'background:red;padding:3px;border-radius:5px;color:white')
  const setDraggingField = useSetRecoilState($draggingField)

  const { css } = useFela()

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
      className={css(tool)}
      // className="tools"
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

const tool = {
  flx: 'align-center',
  bd: 'var(--white)',
  cr: 'var(--dp-blue)',
  fw: 500,
  fs: 15,
  ws: 'nowrap',
  wb: 'keep-all',
  w: 145,
  h: 35,
  p: 8,
  brs: 8,
  // b: '1px solid var(--white-0-75)',
  cur: 'grab',
  ow: 'hidden',
  m: 5,
  bs: '0 1px 3px hsla(var(--blue-h), var(--black-s), var(--black-l), 0.2)',
  tn: 'all 200ms',

  ':hover, :focus': {
    cr: 'var(--b-50)',
    oe: 'none,',
    tm: 'scale(1.05)',
    // box-shadow: 0 1px 11px -4px hsl(0, 0%, 69%);
    bs: '0 1px 11px -4px var(--white-0-69)',

    '& > .tool-icn': { cr: 'var(--b-50) !important' },
  },
  ':active': { b: ' 2px solid var(--b-50)' },
}
