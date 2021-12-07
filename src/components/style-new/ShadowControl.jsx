import produce from 'immer'
import { useFela } from 'react-fela'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { $draggableModal, $themeVars } from '../../GlobalStates'
import CloseIcn from '../../Icons/CloseIcn'
import ut from '../../styles/2.utilities'
import ColorPreview from './ColorPreview'
import { showDraggableModal, splitValueBySpaces } from './styleHelpers'

export default function ShadowControl({ value, subtitle, objectPaths, id }) {
  const { css } = useFela()
  const setThemeVars = useSetRecoilState($themeVars)

  const colorVal = splitValueBySpaces(value)[4]
  const [draggableModal, setDraggableModal] = useRecoilState($draggableModal)
  const clearValue = () => {
    if (Object.prototype.hasOwnProperty.call(objectPaths.paths, 'shadow')) {
      setThemeVars(prvThemeVars => produce(prvThemeVars, drft => {
        drft[objectPaths.paths.shadow] = ''
      }))
    }
  }
  return (
    <div className={css(c.preview_wrp, draggableModal.id === id && c.active)}>
      <button
        onClick={e => showDraggableModal(e, setDraggableModal, { component: 'shadow-control', subtitle, objectPaths, id })}
        type="button"
        className={css(c.pickrBtn)}
      >
        <ColorPreview bg={colorVal} h={25} w={25} className={css(ut.mr2)} />
        <span className={css(c.clrVal)}>{value || 'Add Shadow'}</span>
        {value && (
          <button className={css(c.clearBtn)} onClick={clearValue} type="button" aria-label="Clear Color">
            <CloseIcn size="12" />
          </button>
        )}
      </button>
    </div>
  )
}

const c = {
  preview_wrp: {
    bd: 'var(--white-0-95)',
    w: 130,
    mnw: 130,
    brs: 10,
    p: 3,
    flx: 'center-between',
  },
  preview: {
    w: 25,
    h: 25,
    b: '1px solid gray',
    brs: 7,
    curp: 1,
    mr: 7,
  },
  clearBtn: {
    brs: '50%',
    pn: 'absolute',
    tp: 3,
    rt: 1,
    w: 20,
    h: 20,
    b: 'none',
    flx: 'center',
    // bd: 'transparent',
    bd: '#d3d1d1',
    cr: 'var(--white-0-50)',
    curp: 1,
    ':hover': { cr: 'var(--black-0)' },
  },
  pickrBtn: {
    pn: 'relative',
    b: 'none',
    curp: 1,
    flx: 'center',
    bd: 'transparent',
    p: 0,
  },
  clrVal: {
    w: 90,
    ws: 'nowrap',
    textOverflow: 'ellipsis',
    ow: 'hidden',
  },
  active: { focusShadow: 1 },
}
