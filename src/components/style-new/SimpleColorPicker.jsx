import produce from 'immer'
import { useFela } from 'react-fela'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { $draggableModal, $styles, $themeColors, $themeVars } from '../../GlobalStates'
import CloseIcn from '../../Icons/CloseIcn'
import TrashIcn from '../../Icons/TrashIcn'
import ut from '../../styles/2.utilities'
import { assignNestedObj } from '../../Utils/FormBuilderHelper'
import { __ } from '../../Utils/i18nwrap'
import ColorPreview from './ColorPreview'
import Important from './Important'
import ResetStyle from './ResetStyle'
import { showDraggableModal } from './styleHelpers'

export default function SimpleColorPicker({ title,
  stateObjName,
  propertyPath,
  subtitle,
  value,
  objectPaths,
  modalType,
  modalId,
  deleteable,
  delPropertyHandler,
  allowImportant,
  hslaPaths,
  fldKey }) {
  const { css } = useFela()
  const setStyles = useSetRecoilState($styles)
  const setThemeVars = useSetRecoilState($themeVars)
  const setThemeColors = useSetRecoilState($themeColors)
  const [draggableModal, setDraggableModal] = useRecoilState($draggableModal)

  const clearHandler = () => {
    switch (stateObjName) {
      case 'themeColors':
        setThemeColors(prvStyle => produce(prvStyle, drft => {
          drft[`${propertyPath}`] = ''
        }))
        break
      case 'themeVars':
        setThemeVars(prvStyle => produce(prvStyle, drft => {
          drft[`${propertyPath}`] = ''
        }))
        break
      case 'styles':
        setStyles(prvState => produce(prvState, drftStyles => {
          assignNestedObj(drftStyles, propertyPath, '')
        }))
        break
      default:
        break
    }
  }

  return (
    <div className={css(ut.flxcb, ut.mt2, c.containerHover)}>
      <div className={css(ut.flxc)}>
        {deleteable && (
          <button title="Delete Property" onClick={delPropertyHandler} className={`${css(c.delBtn)} delete-btn`} type="button">
            <TrashIcn size="15" />
          </button>
        )}
        <span className={css(ut.fw500)}>{__(title, 'bitform')}</span>
      </div>
      <div className={css(ut.flxc)}>
        <ResetStyle objectKey={`--${modalType}`} stateObjName={stateObjName} objectPaths={objectPaths} propertyPath={propertyPath} />
        {allowImportant && <Important stateObjName={stateObjName} propertyPath={propertyPath} />}
        <div className={css(c.preview_wrp, draggableModal.id === modalId && c.active)}>
          <button
            onClick={e => showDraggableModal(e, setDraggableModal, { component: 'color-picker', subtitle, action: { type: modalType }, value, id: modalId, objectPaths, stateObjName, propertyPath, hslaPaths, fldKey })}
            type="button"
            className={css(c.pickrBtn)}
          >
            <ColorPreview bg={value?.replace(/!important/gi, '')} h={24} w={24} className={css(ut.mr2)} />
            <span className={css(c.clrVal)}>{value?.replaceAll(/\(|var|\)/gi, '')}</span>
          </button>
          {value && (
            <button title="Clear Value" onClick={clearHandler} className={css(c.clearBtn)} type="button" aria-label="Clear Color">
              <CloseIcn size="12" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

const c = {
  containerHover: {
    '&:hover .delete-btn': {
      bd: 'var(--b-79-96)',
      brs: '50%',
      cr: 'var(--b-50)',
      oy: 1,
      tm: 'scale(1.1)',
    },
  },
  preview_wrp: {
    bd: 'var(--white-0-95)',
    w: 130,
    mnw: 130,
    brs: 10,
    p: 3,
    flx: 'center-between',
    ':hover': { bs: '0 0 0 1px var(--white-0-83)' },
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
  delBtn: {
    b: 'none',
    p: 5,
    bd: 'transparent',
    mr: 5,
    oy: 0,
    tn: '.2s all',
    curp: 1,
  },
  clrVal: {
    w: 73,
    ws: 'nowrap',
    textOverflow: 'ellipsis',
    ow: 'hidden',
  },
  active: { focusShadow: 1 },

}
