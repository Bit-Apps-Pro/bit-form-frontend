/* eslint-disable no-param-reassign */
import produce from 'immer'
import { useFela } from 'react-fela'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { $draggableModal } from '../../GlobalStates/GlobalStates'
import { $styles } from '../../GlobalStates/StylesState'
import { $themeColors } from '../../GlobalStates/ThemeColorsState'
import { $themeVars } from '../../GlobalStates/ThemeVarsState'
import CloseIcn from '../../Icons/CloseIcn'
import ut from '../../styles/2.utilities'
import { assignNestedObj } from '../../Utils/FormBuilderHelper'
import ColorPreview from './ColorPreview'
import Important from './Important'
import { showDraggableModal, splitValueBySpaces } from './styleHelpers'

export default function BorderControl({ subtitle, value, objectPaths, id, allowImportant, state }) {
  const { css } = useFela()

  const [, color] = splitValueBySpaces(value)
  const [draggableModel, setDraggableModal] = useRecoilState($draggableModal)

  const setThemeVars = useSetRecoilState($themeVars)
  const setThemeColors = useSetRecoilState($themeColors)
  const setStyles = useSetRecoilState($styles)
  const { paths } = objectPaths
  const borderProps = Object.keys(paths)

  const clearValue = () => {
    switch (objectPaths.object) {
      case 'themeColors':
      case 'themeVars':
        setThemeVars(prvThemeVars => produce(prvThemeVars, drft => {
          drft[paths[borderProps[0]]] = ''
          drft[paths['border-width']] = ''
          drft[paths['border-radius']] = ''
        }))
        setThemeColors(prvThemeColors => produce(prvThemeColors, drft => {
          drft[paths['border-color']] = ''
        }))
        break
      case 'styles':
        setStyles(prvState => produce(prvState, drft => {
          borderProps.map(propName => {
            assignNestedObj(drft, paths[propName], '')
          })
        }))
        break
      default:
        break
    }
  }

  return (
    <div className={css(ut.flxc)}>
      {allowImportant && (<Important className={css({ mr: 3 })} propertyPath={paths[borderProps[0]]} />)}
      <div title={value} className={css(c.preview_wrp, draggableModel.id === id && c.active)}>
        <button
          onClick={e => showDraggableModal(e, setDraggableModal, { component: 'border-style', subtitle, objectPaths, state, id })}
          type="button"
          className={css(c.pickrBtn)}
        >
          <ColorPreview bg={color?.replace(/!important/gi, '')} h={24} w={24} className={css(ut.mr2)} />
          <span className={css(c.clrVal)}>{value || 'Add Border Style'}</span>
        </button>
        {value && (
          <button title="Clear Value" className={css(c.clearBtn)} onClick={clearValue} type="button" aria-label="Clear Border">
            <CloseIcn size="12" />
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
    p: 3,
    flx: 'center-between',
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
    flx: 'center',
    bd: 'transparent',
    p: 0,
  },
  clrVal: {
    w: 73,
    ws: 'nowrap',
    textOverflow: 'ellipsis',
    ow: 'hidden',
  },
  active: { focusShadow: 1 },
}
