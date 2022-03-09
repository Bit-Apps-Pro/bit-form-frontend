import produce from 'immer'
import { useFela } from 'react-fela'
import { useRecoilState } from 'recoil'
import { $draggableModal } from '../../GlobalStates/GlobalStates'
import { $styles } from '../../GlobalStates/StylesState'
import { $themeColors } from '../../GlobalStates/ThemeColorsState'
import CloseIcn from '../../Icons/CloseIcn'
import ut from '../../styles/2.utilities'
import { assignNestedObj } from '../../Utils/FormBuilderHelper'
import Important from './Important'
import { getValueByObjPath, getValueFromStateVar, showDraggableModal } from './styleHelpers'

export default function FilterController({ subtitle, action, value, objectPaths, id, allowImportant }) {
  const { css } = useFela()
  const [draggableModal, setDraggableModal] = useRecoilState($draggableModal)
  const [styles, setStyles] = useRecoilState($styles)
  const [themeColors, setThemeColors] = useRecoilState($themeColors)

  const { object, paths } = objectPaths

  const val = getValueByObjPath(styles, paths?.filter)

  const getValue = () => {
    let valu = ''
    if (object === 'themeColors') {
      valu = themeColors[paths.filter]
    }
    if (valu === '' || valu === null) {
      valu = getValueFromStateVar(themeColors, val)
    }
    return valu
  }

  const clearHandler = () => {
    switch (object) {
      case 'styles':
        setStyles(prvStyle => produce(prvStyle, drft => {
          assignNestedObj(drft, paths?.filter, '')
        }))
        break

      case 'themeColors':
        setThemeColors(prvThemeClr => produce(prvThemeClr, drft => {
          assignNestedObj(drft, paths?.filter, '')
        }))
        break

      default:
        break
    }
  }

  return (
    <div className={css(ut.flxc, { cg: 3 })}>
      {allowImportant && getValue() && (<Important propertyPath={paths?.filter} />)}
      <div title={getValue() || 'Configure'} className={css(c.preview_wrp, draggableModal.id === id && c.active)}>
        <button
          onClick={e => showDraggableModal(e, setDraggableModal, { component: 'filter-control', width: 250, subtitle, action, value, objectPaths, id })}
          type="button"
          className={css(c.pickrBtn)}
        // title={val}
        >
          {getValue() || 'Configure'}
        </button>
        {getValue() && (
          <button title="Clear Value" onClick={clearHandler} className={css(c.clearBtn)} type="button" aria-label="Clear Filter">
            <CloseIcn size="10" />
          </button>
        )}
      </div>
    </div>
  )
}

const c = {
  preview_wrp: {
    bd: 'var(--white-0-95)',
    w: 130,
    mnw: 130,
    brs: 10,
    p: 7,
    pr: '3px !important',
    flx: 'center-between',
    h: 30,
    ':hover': { bs: '0 0 0 1px var(--white-0-83)' },
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
    p: 4,
    // pr: '1px !important',
    w: 17,
    h: 17,
    b: 'none',
    flx: 'center',
    bd: 'transparent',
    cr: 'var(--white-0-50)',
    curp: 1,
    ':hover': { cr: 'var(--black-0)', bd: '#d3d1d1' },
  },
  pickrBtn: {
    b: 'none',
    curp: 1,
    bd: 'transparent',
    ws: 'nowrap',
    to: 'ellipsis',
    p: 0,
    h: 28,
    w: 94,
    dy: 'block',
    ow: 'hidden',
    ta: 'start',
  },
  clrVal: {
    w: 90,
    ws: 'nowrap',
    textOverflow: 'ellipsis',
    ow: 'hidden',
  },
  active: { focusShadow: 1 },
}
