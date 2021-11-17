/* eslint-disable jsx-a11y/control-has-associated-label */
import { useState } from 'react'
import { useFela } from 'react-fela'
import { NavLink, useHistory, useParams } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil'
import { $breakpoint, $flags } from '../GlobalStates'
import AddIcon from '../Icons/AddIcon'
import BrushIcn from '../Icons/BrushIcn'
import EditIcn from '../Icons/EditIcn'
import EllipsisIcon from '../Icons/EllipsisIcon'
import LaptopIcn from '../Icons/LaptopIcn'
import MobileIcon from '../Icons/MobileIcon'
import TabletIcon from '../Icons/TabletIcon'
import ut from '../styles/2.utilities'
import OptionToolBarStyle from '../styles/OptionToolbar.style'
import BreakpointSizeControl from './BreakpointSizeControl'
import FormBuilderHistory from './FormBuilderHistory'
import Downmenu from './Utilities/Downmenu'
import SingleToggle from './Utilities/SingleToggle'
import StyleSegmentControl from './Utilities/StyleSegmentControl'
import Tip from './Utilities/Tip'
import Modal from './Utilities/Modal'
import Editor from './CompSettings/Editor'

export default function OptionToolBar({ setResponsiveView, setShowToolbar, showToolBar, toggleToolBar }) {
  const { css } = useFela()
  const history = useHistory()
  const { formType, formID, rightBar } = useParams()
  const [flags, setFlags] = useRecoilState($flags)
  const breakpoint = useRecoilValue($breakpoint)
  const [responsiveMenu, setResponsiveMenu] = useState(false)
  const [modal, setModal] = useState(false)

  const styleModeHandler = ({ target: { checked } }) => setFlags(prv => ({ ...prv, styleMode: checked }))

  const handleRightPanel = (currentActive) => {
    if (currentActive === 'fld-settings') {
      history.push(`/form/builder/${formType}/${formID}/fields-list`)
    } else if (currentActive === 'theme-customize') {
      history.push(`/form/builder/${formType}/${formID}/themes`)
    }
  }

  return (
    <div className={css(OptionToolBarStyle.optionToolBar)}>
      <div className={css(OptionToolBarStyle.form_section)}>
        <button onClick={toggleToolBar} type="button" className={`${css(OptionToolBarStyle.field_btn)} ${!showToolBar && 'active'}`}>
          <AddIcon size="22" />
          <span className={css(OptionToolBarStyle.txt)}>Form Fields</span>
        </button>
        <div className={css(OptionToolBarStyle.option_section)}>
          <Tip msg="Small Screen View">
            <button onClick={() => setResponsiveView('sm')} className={`${css([OptionToolBarStyle.icn_btn, ut.icn_hover])} ${breakpoint === 'sm' && 'active'}`} type="button"><MobileIcon size={23} /></button>
          </Tip>
          <Tip msg="Medium Screen View">
            <button onClick={() => setResponsiveView('md')} className={`${css([OptionToolBarStyle.icn_btn, ut.icn_hover])} ${breakpoint === 'md' && 'active'}`} type="button"><TabletIcon size={22} /></button>
          </Tip>
          <Tip msg="Large Screen View">
            <button onClick={() => setResponsiveView('lg')} className={`${css([OptionToolBarStyle.icn_btn, ut.icn_hover])} ${breakpoint === 'lg' && 'active'}`} type="button"><LaptopIcn size={29} stroke={1.6} /></button>
          </Tip>
          <Downmenu
            place="bottom-end"
            onShow={() => setResponsiveMenu(true)}
            onHide={() => setResponsiveMenu(false)}
          >
            <button className={`${css([OptionToolBarStyle.icn_btn, ut.icn_hover])} ${responsiveMenu ? 'active' : ''}`} type="button"><EllipsisIcon size="38" /></button>
            <BreakpointSizeControl />
          </Downmenu>

          <div className={css(OptionToolBarStyle.border_right)} />

          <FormBuilderHistory />
          <div className={css(OptionToolBarStyle.border_right)} />
          <Tip msg="Custom CSS and JS">
            <button type="button" onClick={() => setModal(true)}>
              Editor
            </button>
          </Tip>
          <Modal
            md
            autoHeight
            show={modal}
            setModal={setModal}
            className="o-v"
            title=""
          >
            <div className="pos-rel" />
            <Editor />
          </Modal>

          <div className={css(OptionToolBarStyle.border_right)} />

          <div className={css([ut.flxc, OptionToolBarStyle.rightSideBarBtn])}>
            <Tip msg="Fields Settings">
              <NavLink
                className={css([OptionToolBarStyle.icn_btn, ut.icn_hover])}
                activeClassName="active"
                to={`/form/builder/${formType}/${formID}/fields-list`}
              >
                <EditIcn size="21" />
              </NavLink>
            </Tip>
            <Tip msg="Theme Customization">
              <NavLink
                className={css([OptionToolBarStyle.icn_btn, ut.icn_hover])}
                activeClassName="active"
                to={`/form/builder/${formType}/${formID}/themes`}
              >
                <BrushIcn size="20" />
              </NavLink>
            </Tip>
            <Tip msg="Custom Styling">
              <NavLink
                className={css([OptionToolBarStyle.icn_btn, ut.icn_hover])}
                activeClassName="active"
                to={`/form/builder/${formType}/${formID}/style`}
              >
                <BrushIcn size="20" />
              </NavLink>
            </Tip>
            <StyleSegmentControl
              borderRadius={10}
              width={180}
              show={['icn']}
              tipPlace="bottom"
              defaultActive={rightBar.match(/themes|theme-customize/gi) ? 'theme-customize' : 'fld-settings'}
              options={[
                { icn: <EditIcn size="19" />, label: 'fld-settings', tip: 'Field Settings' },
                { icn: <BrushIcn size="15" />, label: 'theme-customize', tip: 'Theme Customization' },
              ]}
              onChange={handleRightPanel}
              wideTab
              className={css(ut.mr4)}
            />

            <Tip msg="Style render">
              <SingleToggle
                name="styleMood"
                isChecked={flags.styleMode}
                action={styleModeHandler}
              />
            </Tip>
          </div>
        </div>
      </div>
      <div className="theme-section" />
    </div>
  )
}
