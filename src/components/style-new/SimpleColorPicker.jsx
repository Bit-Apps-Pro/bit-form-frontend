/* eslint-disable no-param-reassign */
import produce from 'immer'
import { useFela } from 'react-fela'
import { useParams } from 'react-router-dom'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { $draggableModal } from '../../GlobalStates/GlobalStates'
import { $styles } from '../../GlobalStates/StylesState'
import { $themeColors } from '../../GlobalStates/ThemeColorsState'
import { $themeVars } from '../../GlobalStates/ThemeVarsState'
import CloseIcn from '../../Icons/CloseIcn'
import TrashIcn from '../../Icons/TrashIcn'
import ut from '../../styles/2.utilities'
import { addToBuilderHistory, assignNestedObj, generateHistoryData, getLatestState } from '../../Utils/FormBuilderHelper'
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
  fldKey,
  canSetVariable }) {
  const { css } = useFela()
  const { element, fieldKey } = useParams()
  const setStyles = useSetRecoilState($styles)
  const setThemeVars = useSetRecoilState($themeVars)
  const [themeColors, setThemeColors] = useRecoilState($themeColors)
  const [draggableModal, setDraggableModal] = useRecoilState($draggableModal)

  const clearHandler = () => {
    switch (stateObjName) {
      case 'themeColors':
        setThemeColors(prvStyle => produce(prvStyle, drft => {
          drft[`${propertyPath}`] = ''
        }))
        addToBuilderHistory(generateHistoryData(element, fieldKey, `Clear ${propertyPath}`, '', { themeColors: getLatestState('themeColors') }))
        break
      case 'themeVars':
        setThemeVars(prvStyle => produce(prvStyle, drft => {
          drft[`${propertyPath}`] = ''
        }))
        addToBuilderHistory(generateHistoryData(element, fieldKey, `Clear ${propertyPath}`, '', { themeVars: getLatestState('themeVars') }))
        break
      case 'styles':
        setStyles(prvState => produce(prvState, drftStyles => {
          if (Array.isArray(propertyPath)) {
            propertyPath.map(prop => assignNestedObj(drftStyles, prop, ''))
          } else {
            assignNestedObj(drftStyles, propertyPath, '')
          }
        }))
        if (Array.isArray(propertyPath)) {
          addToBuilderHistory(generateHistoryData(element, fieldKey, `${propertyPath[0]} Clear`, '', { styles: getLatestState('styles') }))
        } else {
          addToBuilderHistory(generateHistoryData(element, fieldKey, `${propertyPath} Clear`, '', { styles: getLatestState('styles') }))
        }
        break
      default:
        break
    }
  }

  const checkVarValue = () => {
    let val = value
    if (value?.match(/(var)/gi)?.[0]) {
      const str = value.replaceAll(/\(|var|,.*|\)|(!important)|\s/gi, '')
      val = themeColors[str]
    }
    if (val?.match(/(!important)/gi)) {
      val = val?.replaceAll(/(!important)/gi, '')
    }
    return val
  }

  const colorStr = checkVarValue()

  return (
    <div data-testid={`${modalId}-hover`} className={css(ut.flxcb, ut.mt2, c.containerHover)}>
      <div className={css(ut.flxc, deleteable && ut.ml1)}>
        {deleteable && (
          <button
            title="Delete Property"
            onClick={delPropertyHandler}
            className={`${css(c.delBtn)} delete-btn`}
            type="button"
            data-testid={`${modalId}-delete-btn`}
          >
            <TrashIcn size="14" />
          </button>
        )}
        <span className={css(ut.fw500)}>{__(title)}</span>
      </div>
      <div className={css(ut.flxc)}>
        <ResetStyle stateObjName={stateObjName} propertyPath={propertyPath} id={modalId} />
        {allowImportant && value && (
          <Important
            className={css({ mr: 3 })}
            stateObjName={stateObjName}
            propertyPath={propertyPath}
            id={modalId}
          />
        )}
        <div
          className={css(c.preview_wrp, draggableModal.id === modalId && c.active)}
          title={colorStr || `Add ${title}`}
        >
          <button
            onClick={e => showDraggableModal(e, setDraggableModal, { component: 'color-picker', subtitle, action: { type: modalType }, value, id: modalId, objectPaths, stateObjName, propertyPath, hslaPaths, fldKey, canSetVariable })}
            type="button"
            className={css(c.pickrBtn)}
            data-testid={`${modalId}-modal-btn`}
          >
            <ColorPreview bg={colorStr} h={24} w={24} className={css(ut.mr2)} />
            <span className={css(c.clrVal)}>{colorStr || 'Configure Color'}</span>
          </button>
          {colorStr && (
            <button
              title="Clear Value"
              onClick={clearHandler}
              className={css(c.clearBtn)}
              type="button"
              aria-label="Clear Color"
              data-testid={`${modalId}-clear-btn`}
            >
              <CloseIcn size="12" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

const c = {
  delBtn: {
    se: 20,
    flx: 'center',
    b: 'none',
    p: 0,
    mr: 1,
    tn: '.2s all',
    curp: 1,
    brs: '50%',
    tm: 'scale(0)',
    bd: 'none',
    cr: 'var(--red-100-61)',
    pn: 'absolute',
    lt: -15,
    ':hover': { bd: '#ffd0d0', cr: '#460000' },
  },
  containerHover: { '&:hover .delete-btn': { tm: 'scale(1)' } },
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

  clrVal: {
    w: 73,
    ws: 'nowrap',
    textOverflow: 'ellipsis',
    ow: 'hidden',
  },
  active: { focusShadow: 1 },

}
