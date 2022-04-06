import { memo } from 'react'
import { useFela } from 'react-fela'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { $breakpoint, $builderHookStates, $draggingField } from '../../GlobalStates/GlobalStates'

function Tools({ setNewData, setDrgElm, value, setisToolDragging, children, title }) {
  console.log('%c $render Tools', 'background:red;padding:3px;border-radius:5px;color:white')
  const setDraggingField = useSetRecoilState($draggingField)
  const [brkPoint] = useRecoilState($breakpoint)
  const setBuilderHookStates = useSetRecoilState($builderHookStates)

  const { css } = useFela()

  const handleOnDrag = (e) => {
    e.dataTransfer.setData('text/plain', '')
    setDraggingField(value)
    if (brkPoint !== 'lg') {
      setBuilderHelperStates(prv => ({ ...prv, forceBuilderWidthToLG: !prv.forceBuilderWidthToLG }))
    }
  }

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
      onDragStart={handleOnDrag}
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
  cur: 'grab',
  // ow: 'hidden',
  m: 5,
  bs: '0 0 0 1.5px var(--white-0-86) inset',
  tn: 'all 200ms',
  ':first-child': { mt: 0 },

  ':hover': {
    cr: 'var(--b-50)',
    oe: 'none,',
    tm: 'scale(1.05)',
    bs: '0 0 0 1.5px var(--white-0-86) inset, 0 1px 11px -4px var(--white-0-69)',
  },
  ':focus': {
    cr: 'var(--b-50)',
    oe: 'none,',
    tm: 'scale(1.05)',
    bs: '0 0 0 1.5px var(--white-0-86) inset, 0 1px 11px -4px var(--white-0-69)',
  },
  ':hover .tool-icn': { cr: 'var(--b-50) !important' },
  ':focus .tool-icn': { cr: 'var(--b-50) !important' },
  ':active': { bs: '0 0 0 1.5px var(--b-50) inset, 0 0 2px var(--white-2-47), 0 1px 11px -4px var(--white-0-69)' },
}
