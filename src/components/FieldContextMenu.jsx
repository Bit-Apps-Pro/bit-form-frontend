/* eslint-disable import/no-unresolved */
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { create } from 'mutative'
import { useRef, useState } from 'react'
import { useFela } from 'react-fela'
import { CSSTransition } from 'react-transition-group'
import { hideAll } from 'tippy.js'
import { $activeBuilderStep } from '../GlobalStates/FormBuilderStates'
import {
  $allLayouts, $builderHookStates, $contextMenu, $fields, $layouts, $nestedLayouts, $proModal, $selectedFieldId, $updateBtn,
} from '../GlobalStates/GlobalStates'
import BrushIcn from '../Icons/BrushIcn'
import CheckMarkIcn from '../Icons/CheckMarkIcn'
import ChevronRightIcon from '../Icons/ChevronRightIcon'
import CopyIcn from '../Icons/CopyIcn'
import DeSelectIcn from '../Icons/DeSelectIcn'
import EditIcn from '../Icons/EditIcn'
import EyeOffIcon from '../Icons/EyeOffIcon'
import MoveIcn from '../Icons/MoveIcn'
import { addToBuilderHistory, builderBreakpoints } from '../Utils/FormBuilderHelper'
import { IS_PRO } from '../Utils/Helpers'
import proHelperData from '../Utils/StaticData/proHelperData'
import { __ } from '../Utils/i18nwrap'
import FieldDeleteButton from './FieldDeleteButton'
import Downmenu from './Utilities/Downmenu'
import ProBadge from './Utilities/ProBadge'

const MenuItemWrapper = ({ isContextMenu, children }) => {
  function handleItemClick(event) {
    event.stopPropagation()
  }
  return isContextMenu ? (
    <div
      role="button"
      tabIndex="0"
      onClick={handleItemClick}
      onKeyDown={handleItemClick}
    >
      {children}
    </div>
  ) : children
}

export default function FieldContextMenu({
  isContextMenu,
  contextMenu,
  resetContextMenu,
  layoutItem,
  navigateToFieldSettings,
  navigateToStyle,
  className,
  cloneLayoutItem,
  removeLayoutItem,
  isComponentVisible,
}) {
  const setSelectedFieldId = useSetAtom($selectedFieldId)
  const setProModal = useSetAtom($proModal)
  const [fields, setFields] = useAtom($fields)
  const [allLayouts, setAllLayouts] = useAtom($allLayouts)
  const activeBuilderStep = useAtomValue($activeBuilderStep)
  const fldKey = isContextMenu ? contextMenu.fldKey : layoutItem.i
  const { css } = useFela()
  const nodeRef = useRef(null)
  const [activeSubMenus, setActiveSubMenus] = useState([])
  const layouts = useAtomValue($layouts)
  const setBuilderHookStates = useSetAtom($builderHookStates)
  const setContextMenu = useSetAtom($contextMenu)
  const nestedLayouts = useAtomValue($nestedLayouts)
  const setUpdateBtn = useSetAtom($updateBtn)

  const subMenuParent = parentName => activeSubMenus.includes(parentName)
  const toggleSubMenu = parentName => {
    if (subMenuParent(parentName)) {
      setActiveSubMenus(activeSubMenus.filter(item => item !== parentName))
    } else {
      setActiveSubMenus([...activeSubMenus, parentName])
    }
  }

  const handleFieldHide = () => {
    if (!IS_PRO) {
      setProModal({ show: true, ...proHelperData.hidden })
      return
    }
    const allFields = create(fields, draft => {
      const fldData = draft[fldKey]
      if ('hide' in fldData.valid && fldData.valid?.hide === true) {
        delete fldData.valid.hide
      } else {
        fldData.valid.hide = true
      }
    })

    setFields(allFields)
    addToBuilderHistory({ event: `Field Hidden ${fields[fldKey].valid?.hide ? 'off' : 'on'}  `, state: { fields: allFields, fldKey } })
  }

  const checkIfHidden = () => {
    const fldData = fields[fldKey]
    return fldData?.valid?.hide || false
  }

  const deselectFieldId = e => {
    e.stopPropagation()

    hideAll()
    setSelectedFieldId(null)
    if (resetContextMenu) resetContextMenu()
  }

  const generateContextMenuStyle = () => {
    if (isContextMenu && isComponentVisible) {
      if (contextMenu.fldKey) {
        return { display: 'flex', position: 'absolute', top: contextMenu.y, left: contextMenu.x, transition: 'all .2s ease-out' }
      }
    }
    return { display: 'flex' }
  }

  const styleNavigation = e => {
    e.stopPropagation()
    navigateToStyle(fldKey)
  }

  const stepLayouts = Array.isArray(allLayouts) ? allLayouts : [allLayouts]

  const moveFldToStep = stepIndex => () => {
    const breakpoints = Object.keys(builderBreakpoints)
    breakpoints.forEach(breakpoint => {
      const selectedLayout = layouts[breakpoint].find(layout => layout.i === fldKey)
      if (selectedLayout) {
        setAllLayouts(prevLayouts => create(prevLayouts, draftLayouts => {
          const { layout: newStepLayout } = draftLayouts[stepIndex]
          const maxY = Math.max(...newStepLayout[breakpoint].map(lay => lay.y))
          const newY = maxY > 0 ? maxY + selectedLayout.h : 0
          // move to new step
          newStepLayout[breakpoint].push({ ...selectedLayout, y: newY })
          // remove from old step
          const { layout: oldLayout } = draftLayouts[activeBuilderStep]
          const findLayIndex = oldLayout[breakpoint].findIndex(lay => lay.i === fldKey)
          oldLayout[breakpoint].splice(findLayIndex, 1)
        }))
      }
    })
    setBuilderHookStates(prv => ({ ...prv, reRenderGridLayoutByRootLay: prv.reRenderGridLayoutByRootLay + 1 }))
    setContextMenu({})
    setUpdateBtn(prevState => ({ ...prevState, unsaved: true }))
  }

  const nestedLays = Object.values(nestedLayouts)
  const fieldInsideNestedLayout = nestedLays.some(nestedLay => nestedLay.lg.some(lay => lay.i === fldKey))
  const canMoveToStep = stepLayouts.length > 1 && !fieldInsideNestedLayout

  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={isComponentVisible}
      timeout={150}
      classNames="btc-pk"
      unmountOnExit
      onExit={resetContextMenu}
    >
      <div ref={nodeRef} style={generateContextMenuStyle()}>
        <div className={`context-menu ${className}`}>
          <ul className="context-list">
            <ContextMenuItem onClick={deselectFieldId} label="Deselect" icn={<DeSelectIcn />} />
            <ContextMenuItem onClick={navigateToFieldSettings} label="Settings" icn={<EditIcn size="19" />} />
            <ContextMenuItem onClick={styleNavigation} label="Style" icn={<BrushIcn height="18" width="14" stroke="1.6" />} />
            <ContextMenuItem onClick={() => cloneLayoutItem(fldKey)} label="Clone" icn={<CopyIcn size="19" />} isPro proProperty="fieldClone" />
            <ContextMenuItem onClick={() => handleFieldHide()} label="Hide" icn={<EyeOffIcon size="19" classes={css({ p: '2px 0px 0px 2px' })} />} postIcn={checkIfHidden('all') && <CheckMarkIcn cls="context-btn-color" size="19" />} isPro proProperty="hidden" />
            {canMoveToStep && (
              <MenuItemWrapper isContextMenu={isContextMenu}>
                <li className="context-item">
                  <Downmenu place="right-start" arrow={false} trigger="mouseenter click" onShow={() => toggleSubMenu('hide')} onHide={() => toggleSubMenu('hide')}>
                    <button
                      data-close
                      type="button"
                      className={`context-btn ${subMenuParent('hide') ? 'active' : ''}`}
                      unselectable="on"
                      draggable="false"
                      title={__('More Options')}
                    >
                      <MoveIcn size="15" stroke="0" classes={css({ p: '2px 0px 0px 2px' })} />
                      <span>Move to</span>
                      <ChevronRightIcon size="19" />
                    </button>
                    <div className="flx pos-rel">
                      <ul className="context-list">
                        {stepLayouts.map((_, stepIndx) => activeBuilderStep !== stepIndx && (
                          <ContextMenuItem
                            onClick={moveFldToStep(stepIndx)}
                            label={`Step #${stepIndx + 1}`}
                          />
                        ))}
                      </ul>
                    </div>
                  </Downmenu>
                </li>
              </MenuItemWrapper>
            )}
            <MenuItemWrapper isContextMenu={isContextMenu}>
              <li className="context-item">
                <FieldDeleteButton placement="bottom" className={`context-btn delete ${subMenuParent('delete') ? 'active' : ''}`} label="Remove" fieldId={fldKey} removeLayoutItem={removeLayoutItem} resetContextMenu={resetContextMenu} toggleSubMenu={toggleSubMenu} />
              </li>
            </MenuItemWrapper>
          </ul>
        </div>
      </div>
    </CSSTransition>
  )
}

function ContextMenuItem({ onClick, label, icn, postIcn, isPro, proProperty }) {
  return (
    <li className="context-item">
      <button type="button" className="context-btn" onClick={onClick}>
        {icn}
        <span>{label}</span>
        {postIcn}
        {isPro && !IS_PRO && <ProBadge className="pro-badge" proProperty={proProperty} />}
      </button>
    </li>
  )
}
