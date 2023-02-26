/* eslint-disable import/no-unresolved */
import produce from 'immer'
import { useRef, useState } from 'react'
import { useFela } from 'react-fela'
import { CSSTransition } from 'react-transition-group'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { hideAll } from 'tippy.js'
import { $fields, $proModal, $selectedFieldId } from '../GlobalStates/GlobalStates'
import BrushIcn from '../Icons/BrushIcn'
import CheckMarkIcn from '../Icons/CheckMarkIcn'
import CopyIcn from '../Icons/CopyIcn'
import DeSelectIcn from '../Icons/DeSelectIcn'
import EditIcn from '../Icons/EditIcn'
import EyeOffIcon from '../Icons/EyeOffIcon'
import { addToBuilderHistory } from '../Utils/FormBuilderHelper'
import { IS_PRO } from '../Utils/Helpers'
import proHelperData from '../Utils/StaticData/proHelperData'
import FieldDeleteButton from './FieldDeleteButton'
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
  const setSelectedFieldId = useSetRecoilState($selectedFieldId)
  const setProModal = useSetRecoilState($proModal)
  const [fields, setFields] = useRecoilState($fields)
  const fldKey = isContextMenu ? contextMenu.fldKey : layoutItem.i
  const { css } = useFela()
  const nodeRef = useRef(null)
  const [activeSubMenus, setActiveSubMenus] = useState([])

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
    const allFields = produce(fields, draft => {
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
            {/* <MenuItemWrapper isContextMenu={isContextMenu}>
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
                  <EyeOffIcon size="19" classes={css({ p: '2px 0px 0px 2px' })} />
                  <span>Hide</span>
                  <ChevronRightIcon size="19" />
                </button>
                <div className="flx pos-rel">
                  <ul className="context-list">
                    <ContextMenuItem onClick={() => handleFieldHide('all')} label="Always" icn={<AllDeviceIcn size="19" />} postIcn={checkIfHidden('all') && <CheckMarkIcn cls="context-btn-color" size="19" />} />
                    <ContextMenuItem onClick={() => handleFieldHide('lg')} label="Large" icn={<LaptopIcn size="19" />} postIcn={checkIfHidden('lg') && <CheckMarkIcn cls="context-btn-color" size="19" />} />
                    <ContextMenuItem onClick={() => handleFieldHide('md')} label="Medium" icn={<TabletIcon size="19" />} postIcn={checkIfHidden('md') && <CheckMarkIcn cls="context-btn-color" size="19" />} />
                    <ContextMenuItem onClick={() => handleFieldHide('sm')} label="Small" icn={<MobileIcon size="18" />} postIcn={checkIfHidden('sm') && <CheckMarkIcn cls="context-btn-color" size="19" />} />
                  </ul>
                </div>
              </Downmenu>
            </li>
          </MenuItemWrapper> */}
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
