/* eslint-disable no-param-reassign */
import produce from 'immer'
import { useFela } from 'react-fela'
import { useRecoilState } from 'recoil'
import { $draggableModal } from '../../GlobalStates/GlobalStates'
import { $styles } from '../../GlobalStates/StylesState'
import { $themeColors } from '../../GlobalStates/ThemeColorsState'
import { $themeVars } from '../../GlobalStates/ThemeVarsState'
import CloseIcn from '../../Icons/CloseIcn'
import ut from '../../styles/2.utilities'
import { assignNestedObj } from '../../Utils/FormBuilderHelper'
import ColorPreview from './ColorPreview'
import Important from './Important'
import { getValueByObjPath, getValueFromStateVar, showDraggableModal } from './styleHelpers'

export default function BorderControl({ subtitle, objectPaths, id, allowImportant, state, hslaPaths }) {
  const { css } = useFela()
  const [draggableModel, setDraggableModal] = useRecoilState($draggableModal)
  const [themeVars, setThemeVars] = useRecoilState($themeVars)
  const [themeColors, setThemeColors] = useRecoilState($themeColors)
  const [styles, setStyles] = useRecoilState($styles)

  /**
   * objectPaths is Array
   * 0 => themeVars
   * 1 => themeColors
   */

  let borderPropsFirst
  let bdrVal
  let bdrClr
  let bdrWdthVal
  let bdrRdsVal
  let valStr = ''
  if (Array.isArray(objectPaths)) {
    const propArr = Object.keys(objectPaths[0].paths)
    borderPropsFirst = objectPaths[0].paths[propArr[0]]

    const bdrStylVar = objectPaths[0].paths[propArr[0]]
    const bdrClrVar = objectPaths[1].paths['border-color']
    const bdrWdthVar = objectPaths[0].paths['border-width']
    const bdrRdsVar = objectPaths[0].paths['border-radius']

    bdrVal = themeVars[bdrStylVar]
    // const [, bdrColor] = splitValueBySpaces(bdrVal?.replaceAll(/(!important)/gi, ''))
    bdrClr = themeColors[bdrClrVar]
    bdrWdthVal = themeVars[bdrWdthVar]
    bdrRdsVal = themeVars[bdrRdsVar]
  } else {
    const propArr = Object.keys(objectPaths.paths)
    borderPropsFirst = objectPaths.paths[propArr[0]]

    bdrVal = getValueFromStateVar(themeVars, getValueByObjPath(styles, objectPaths.paths[propArr[0]]))
    bdrClr = getValueFromStateVar(themeColors, getValueByObjPath(styles, objectPaths.paths['border-color']))

    bdrWdthVal = getValueFromStateVar(themeVars, getValueByObjPath(styles, objectPaths.paths['border-width']))
    bdrRdsVal = getValueFromStateVar(themeVars, getValueByObjPath(styles, objectPaths.paths['border-radius']))
  }

  if (bdrVal) valStr += `Border: ${bdrVal}; `
  if (bdrClr) valStr += `Color: ${bdrClr}; `
  if (bdrWdthVal) valStr += `Width: ${bdrWdthVal}; `
  if (bdrRdsVal) valStr += `Radius: ${bdrRdsVal};`

  const assignValues = (paths, obj, val = '') => {
    const propArray = Object.keys(paths)
    propArray.map(prop => {
      assignNestedObj(obj, paths[prop], val)
    })
  }
  const clearValue = () => {
    if (Array.isArray(objectPaths)) {
      objectPaths.map(obj => {
        const { paths } = obj
        if (obj.object === 'themeVars') {
          setThemeVars(prvThemeVars => produce(prvThemeVars, drft => {
            assignValues(paths, drft)
          }))
        } else if (obj.object === 'themeColors') {
          setThemeColors(prvThemeColor => produce(prvThemeColor, drft => {
            assignValues(paths, drft)
          }))
        }
      })
    } else {
      const { paths } = objectPaths
      setStyles(prvState => produce(prvState, drft => {
        assignValues(paths, drft)
      }))
    }
  }

  return (
    <div className={css(ut.flxc)}>
      {allowImportant && valStr && (
        <Important
          id={id}
          className={css({ mr: 3 })}
          propertyPath={borderPropsFirst}
        />
      )}
      <div title={valStr || 'Add Border Style'} className={css(c.preview_wrp, draggableModel.id === id && c.active)}>
        <button
          onClick={e => showDraggableModal(e, setDraggableModal, { component: 'border-style', subtitle, objectPaths, state, id, hslaPaths })}
          type="button"
          className={css(c.pickrBtn)}
          data-testid={`${id}-modal-btn`}
        >
          <ColorPreview bg={bdrClr} h={24} w={24} className={css(ut.mr2)} />
          <span className={css(c.clrVal)}>{valStr || 'Add Border Style'}</span>
        </button>
        {valStr && (
          <button
            title="Clear Value"
            className={css(c.clearBtn)}
            onClick={clearValue}
            type="button"
            aria-label="Clear Border"
            data-testid={`${id}-clear-btn`}
          >
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
