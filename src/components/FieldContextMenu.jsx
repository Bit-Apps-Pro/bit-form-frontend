import produce from 'immer'
import { useState } from 'react'
import { useFela } from 'react-fela'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { hideAll } from 'tippy.js'
import { $fields, $selectedFieldId } from '../GlobalStates/GlobalStates'
import AllDeviceIcn from '../Icons/AllDeviceIcn'
import BrushIcn from '../Icons/BrushIcn'
import CheckMarkIcn from '../Icons/CheckMarkIcn'
import ChevronRightIcon from '../Icons/ChevronRightIcon'
import CopyIcn from '../Icons/CopyIcn'
import DeSelectIcn from '../Icons/DeSelectIcn'
import EditIcn from '../Icons/EditIcn'
import EyeOffIcon from '../Icons/EyeOffIcon'
import LaptopIcn from '../Icons/LaptopIcn'
import MobileIcon from '../Icons/MobileIcon'
import TabletIcon from '../Icons/TabletIcon'
import { addToBuilderHistory } from '../Utils/FormBuilderHelper'
import { __ } from '../Utils/i18nwrap'
import FieldDeleteButton from './FieldDeleteButton'
import Downmenu from './Utilities/Downmenu'

const MenuItemWrapper = ({ isContextMenu, children }) => {
  function handleItemClick(event) {
    event.stopPropagation()
  }
  return isContextMenu ? <div role="button" tabIndex="0" onClick={handleItemClick} onKeyPress={handleItemClick}>{children}</div> : children
}

export default function FieldContextMenu({ isContextMenu,
  isComponentVisible,
  contextMenu,
  setContextMenu,
  resetContextMenu,
  layoutItem,
  navigateToFieldSettings,
  navigateToStyle,
  className,
  cloneLayoutItem,
  removeLayoutItem }) {
  const setSelectedFieldId = useSetRecoilState($selectedFieldId)
  const [fields, setFields] = useRecoilState($fields)
  const fldKey = isContextMenu ? contextMenu.fldKey : layoutItem.i
  const { css } = useFela()
  const [activeSubMenus, setActiveSubMenus] = useState([])

  const subMenuParent = parentName => activeSubMenus.includes(parentName)
  const toggleSubMenu = parentName => {
    if (subMenuParent(parentName)) {
      setActiveSubMenus(activeSubMenus.filter(item => item !== parentName))
    } else {
      setActiveSubMenus([...activeSubMenus, parentName])
    }
  }

  const handleFieldHide = brkpnt => {
    // setFields(allFields => produce(allFields, draft => {
    //   const fldData = draft[fldKey]
    //   if (!fldData.hidden) fldData.hidden = []
    //   if (brkpnt === 'all' && fldData.hidden.length < 3) {
    //     fldData.hidden = ['lg', 'md', 'sm']
    //   } else if (brkpnt === 'all') {
    //     fldData.hidden = []
    //   } else if (fldData.hidden.includes(brkpnt)) {
    //     fldData.hidden.splice(fldData.hidden.indexOf(brkpnt), 1)
    //   } else {
    //     fldData.hidden.push(brkpnt)
    //   }
    //   if (!fldData.hidden.length) delete fldData.hidden
    // }))
    const allFields = produce(fields, draft => {
      const fldData = draft[fldKey]
      if (!fldData.hidden) fldData.hidden = []
      if (brkpnt === 'all' && fldData.hidden.length < 3) {
        fldData.hidden = ['lg', 'md', 'sm']
      } else if (brkpnt === 'all') {
        fldData.hidden = []
      } else if (fldData.hidden.includes(brkpnt)) {
        fldData.hidden.splice(fldData.hidden.indexOf(brkpnt), 1)
      } else {
        fldData.hidden.push(brkpnt)
      }
      if (!fldData.hidden.length) delete fldData.hidden
    })

    let activeBrkpnt
    if (brkpnt === 'all') activeBrkpnt = 'all device'
    else if (brkpnt === 'lg') activeBrkpnt = 'large'
    else if (brkpnt === 'md') activeBrkpnt = 'medium'
    else activeBrkpnt = 'small'

    setFields(allFields)
    addToBuilderHistory({ event: `Field Hidden ${activeBrkpnt} ${fields[fldKey].hidden ? 'off' : 'on'}  `, state: { fields: allFields, fldKey } })
  }

  const checkIfHidden = brkpnt => {
    const fldData = fields[fldKey]
    if (fldData?.hidden?.length === 3) return true
    if (fldData?.hidden?.includes(brkpnt)) return true
    return false
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
    <div style={generateContextMenuStyle()}>
      <div className={`context-menu ${className}`}>
        <ul className="context-list">
          <ContextMenuItem onClick={deselectFieldId} label="Deselect" icn={<DeSelectIcn />} />
          <ContextMenuItem onClick={navigateToFieldSettings} label="Settings" icn={<EditIcn size="19" />} />
          <ContextMenuItem onClick={styleNavigation} label="Style" icn={<BrushIcn height="18" width="14" stroke="1.6" />} />
          <ContextMenuItem onClick={() => cloneLayoutItem(fldKey)} label="Clone" icn={<CopyIcn size="19" />} />
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
          </MenuItemWrapper>
          <MenuItemWrapper isContextMenu={isContextMenu}>
            <li className="context-item">
              <FieldDeleteButton placement="bottom" className={`context-btn delete ${subMenuParent('delete') ? 'active' : ''}`} label="Remove" fieldId={fldKey} removeLayoutItem={removeLayoutItem} resetContextMenu={resetContextMenu} toggleSubMenu={toggleSubMenu} />
            </li>
          </MenuItemWrapper>
        </ul>
      </div>
    </div>
  )
}

function ContextMenuItem({ onClick, label, icn, postIcn }) {
  return (
    <li className="context-item">
      <button type="button" className="context-btn" onClick={onClick}>
        {icn}
        <span>{label}</span>
        {postIcn}
      </button>
    </li>
  )
}
