import produce from 'immer'
import { useFela } from 'react-fela'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { $fields, $selectedFieldId, $updateBtn } from '../GlobalStates'
import BrushIcn from '../Icons/BrushIcn'
import CheckBoxIcn from '../Icons/CheckBoxIcn'
import ChevronDownIcn from '../Icons/ChevronDownIcn'
import ChevronRightIcon from '../Icons/ChevronRightIcon'
import CopyIcn from '../Icons/CopyIcn'
import EditIcn from '../Icons/EditIcn'
import EyeOffIcon from '../Icons/EyeOffIcon'
import LaptopIcn from '../Icons/LaptopIcn'
import MobileIcon from '../Icons/MobileIcon'
import TabletIcon from '../Icons/TabletIcon'
import context from '../styles/fieldContextMenu.style'
import { __ } from '../Utils/i18nwrap'
import FieldDeleteButton from './FieldDeleteButton'
import Downmenu from './Utilities/Downmenu'

export default function FieldContextMenu({ show, layoutItem, navigateToFieldSettings, navigateToStyle, cloneLayoutItem, removeLayoutItem }) {
  const setSelectedFieldId = useSetRecoilState($selectedFieldId)
  const [fields, setFields] = useRecoilState($fields)
  const setUpdateBtn = useSetRecoilState($updateBtn)
  const { css } = useFela()

  const handleFieldHide = brkpnt => {
    setFields(allFields => produce(allFields, draft => {
      const fldData = draft[layoutItem.i]
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
    }))

    setUpdateBtn({ unsaved: true })
  }

  const checkIfHidden = brkpnt => {
    const fldData = fields[layoutItem.i]
    if (fldData?.hidden?.length === 3) return true
    if (fldData?.hidden?.includes(brkpnt)) return true
    return false
  }

  return (
    <div
      {...show.show && { style: { top: show.y, left: show.x, position: 'absolute' } }}
    >
      <div className={css(context.menu)}>
        <ul className={css(context.list)}>
          <li className={css(context.item)}>
            <button type="button" className={css(context.btn)} onClick={() => setSelectedFieldId(null)}>
              <EditIcn size="19" />
              <span>Deselect</span>
            </button>
          </li>
          <li className={css(context.item)}>
            <button type="button" className={css(context.btn)} onClick={navigateToFieldSettings}>
              <EditIcn size="19" />
              <span>Settings</span>
            </button>
          </li>
          <li className={css(context.item)}>
            <button type="button" className={css(context.btn)} onClick={() => navigateToStyle(fields[layoutItem.i].typ)}>
              <BrushIcn height="18" width="14" stroke="1.6" />
              <span>Style</span>
            </button>
          </li>
          <li className={css(context.item)}>
            <button type="button" className={css(context.btn)} onClick={() => cloneLayoutItem(layoutItem.i)}>
              <CopyIcn size="19" />
              <span>Clone</span>
            </button>
          </li>
          <li className={css(context.item)}>
            <Downmenu place="right-start" arrow={false}>
              <button
                data-close
                type="button"
                className={`${css(context.btn)}}`}
                unselectable="on"
                draggable="false"
                title={__('More Options', 'bitform')}
              >
                <EyeOffIcon size="16" />
                <span>Hide</span>
                <ChevronRightIcon size="19" />
              </button>
              <div className={css(context.menu)}>
                <ul className={css(context.list)}>
                  <li className={css(context.item)}>
                    <button type="button" className={css(context.btn)} onClick={() => handleFieldHide('all')}>
                      <ChevronDownIcn size="19" />
                      <span>all</span>
                      {checkIfHidden() && <CheckBoxIcn w="19" />}
                    </button>
                  </li>
                  <li className={css(context.item)}>
                    <button type="button" className={css(context.btn)} onClick={() => handleFieldHide('lg')}>
                      <LaptopIcn size="19" />
                      <span>Large</span>
                      {checkIfHidden('lg') && <CheckBoxIcn w="19" />}
                    </button>
                  </li>
                  <li className={css(context.item)}>
                    <button type="button" className={css(context.btn)} onClick={() => handleFieldHide('md')}>
                      <TabletIcon size="19" />
                      <span>Medium</span>
                      {checkIfHidden('md') && <CheckBoxIcn w="19" />}
                    </button>
                  </li>
                  <li className={css(context.item)}>
                    <button type="button" className={css(context.btn, context.checked)} onClick={() => handleFieldHide('sm')}>
                      <MobileIcon size="18" />
                      <span>Small</span>
                      {checkIfHidden('sm') && <CheckBoxIcn w="19" />}
                    </button>
                  </li>
                </ul>
              </div>
            </Downmenu>
          </li>
          <li className={css(context.item)}>
            <FieldDeleteButton placement="bottom" className={css(context.btn, context.delete)} label="Remove" removeLayoutItem={removeLayoutItem} fieldId={layoutItem.i} />
          </li>
        </ul>
      </div>
    </div>

  )
}
