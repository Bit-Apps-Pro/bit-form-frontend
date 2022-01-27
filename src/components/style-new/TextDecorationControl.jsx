import produce from 'immer'
import { useFela } from 'react-fela'
import { useRecoilState } from 'recoil'
import { $draggableModal } from '../../GlobalStates/GlobalStates'
import { $styles } from '../../GlobalStates/StylesState'
import { $themeVars } from '../../GlobalStates/ThemeVarsState'
import CloseIcn from '../../Icons/CloseIcn'
import ut from '../../styles/2.utilities'
import { assignNestedObj } from '../../Utils/FormBuilderHelper'
import ColorPreview from './ColorPreview'
import Important from './Important'
import { getObjByKey, getValueByObjPath, showDraggableModal } from './styleHelpers'

export default function TextDecorationControl({ subtitle, value, objectPaths, id, allowImportant }) {
  const { css } = useFela()

  const [draggableModel, setDraggableModal] = useRecoilState($draggableModal)

  const [themeVars, setThemeVars] = useRecoilState($themeVars)
  const [styles, setStyles] = useRecoilState($styles)

  const stateObj = getObjByKey(objectPaths.object, { themeVars, styles })

  const { textDecorationLine, textDecorationStyle, textDecorationColor, textDecorationThickness } = objectPaths.paths

  const txtDcrtnValue = `${getValueByObjPath(stateObj, textDecorationLine)} ${getValueByObjPath(stateObj, textDecorationStyle)} ${getValueByObjPath(stateObj, textDecorationThickness)}`

  const clearValue = () => {
    switch (objectPaths.txtObjName) {
      case 'themeVars':
        setThemeVars(prvThemeVars => produce(prvThemeVars, drft => {
          assignNestedObj(drft, textDecorationLine, '')
          assignNestedObj(drft, textDecorationStyle, '')
          assignNestedObj(drft, textDecorationColor, '')
          assignNestedObj(drft, textDecorationThickness, '')
        }))
        break
      case 'styles':
        setStyles(prvState => produce(prvState, drft => {
          assignNestedObj(drft, textDecorationLine, '')
          assignNestedObj(drft, textDecorationStyle, '')
          assignNestedObj(drft, textDecorationColor, '')
          assignNestedObj(drft, textDecorationThickness, '')
        }))
        break
      default:
        break
    }
  }

  return (
    <div className={css(ut.flxc)}>
      {allowImportant && (<Important className={css({ mr: 3 })} propertyPath={textDecorationLine} />)}
      <div className={css(c.preview_wrp, draggableModel.id === id && c.active)}>
        <button
          onClick={e => showDraggableModal(e, setDraggableModal, { component: 'text-decoration', subtitle, objectPaths, id })}
          type="button"
          className={css(c.pickrBtn)}
        >
          <ColorPreview bg={getValueByObjPath(stateObj, textDecorationColor)?.replace(/!important/gi, '')} h={24} w={24} className={css(ut.mr2)} />
          <span className={css(c.clrVal)}>{txtDcrtnValue || 'Add Text Decoration Style'}</span>
        </button>
        {txtDcrtnValue && (
          <button title="Clear Value" className={css(c.clearBtn)} onClick={clearValue} type="button" aria-label="Clear TextDecoration">
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
