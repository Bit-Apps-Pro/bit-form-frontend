/* eslint-disable jsx-a11y/control-has-associated-label */
import { useState } from 'react'
import { useFela } from 'react-fela'
import { NavLink, useParams } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil'
import { $breakpoint, $builderHelperStates } from '../GlobalStates'
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
import Tip from './Utilities/Tip'

export default function OptionToolBar({ setResponsiveView, setShowToolbar, showToolBar, toggleToolBar }) {
  const { css } = useFela()
  const { formType, formID } = useParams()
  const [builderHelperStates, setBuilderHelperStates] = useRecoilState($builderHelperStates)
  const breakpoint = useRecoilValue($breakpoint)
  const [responsiveMenu, setResponsiveMenu] = useState(false)

  const styleMoodHandler = () => setBuilderHelperStates(prv => ({ ...prv, styleMood: !prv.styleMood }))

  return (
    <div className={css(OptionToolBarStyle.optionToolBar)}>
      <div className={css(OptionToolBarStyle.form_section)}>
        <button onClick={toggleToolBar} type="button" className={`${css(OptionToolBarStyle.field_btn)} ${showToolBar && 'active'}`}>
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
            <Tip msg="Style render">
              <SingleToggle name="styleMood" isChecked={builderHelperStates.styleMood} action={styleMoodHandler} />
            </Tip>
          </div>
        </div>
      </div>
      <div className="theme-section" />
    </div>
  )
}
