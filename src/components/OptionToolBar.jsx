/* eslint-disable jsx-a11y/control-has-associated-label */
import { useState } from 'react'
import { useFela } from 'react-fela'
import { NavLink, useHistory, useParams } from 'react-router-dom'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { $breakpoint, $fields, $flags, $selectedFieldId } from '../GlobalStates/GlobalStates'
import { $styles } from '../GlobalStates/StylesState'
import AddIcon from '../Icons/AddIcon'
import BrushIcn from '../Icons/BrushIcn'
import EditIcn from '../Icons/EditIcn'
import EllipsisIcon from '../Icons/EllipsisIcon'
import LaptopIcn from '../Icons/LaptopIcn'
import LayerIcon from '../Icons/LayerIcon'
import MobileIcon from '../Icons/MobileIcon'
import SettingsIcn from '../Icons/SettingsIcn'
import TabletIcon from '../Icons/TabletIcon'
import ut from '../styles/2.utilities'
import OptionToolBarStyle from '../styles/OptionToolbar.style'
import BreakpointSizeControl from './BreakpointSizeControl'
import Editor from './CompSettings/Editor'
import FormBuilderHistory from './FormBuilderHistory'
import { removeUnuseStyles } from './style-new/styleHelpers'
import Downmenu from './Utilities/Downmenu'
import Modal from './Utilities/Modal'
import SingleToggle from './Utilities/SingleToggle'
import StyleSegmentControl from './Utilities/StyleSegmentControl'
import Tip from './Utilities/Tip'

export default function OptionToolBar({ setResponsiveView, setShowToolbar, showToolBar, toggleToolBar }) {
  const { css } = useFela()
  const history = useHistory()
  const { formType, formID, rightBar } = useParams()
  const [flags, setFlags] = useRecoilState($flags)
  const breakpoint = useRecoilValue($breakpoint)
  const [responsiveMenu, setResponsiveMenu] = useState(false)
  const [modal, setModal] = useState(false)
  const fields = useRecoilValue($fields)
  const setStyles = useSetRecoilState($styles)
  const selectedFldId = useRecoilValue($selectedFieldId)

  const styleModeHandler = ({ target: { checked } }) => {
    setFlags(prv => ({ ...prv, styleMode: checked }))
    if (checked) {
      history.replace(history.location.pathname.replace(/(theme-customize|style|fields-list|themes|field-settings).*/g, `field-theme-customize/quick-tweaks/${selectedFldId}`))
    } else {
      history.replace(history.location.pathname.replace(/(field-theme-customize|style|fields-list|themes|field-settings).*/g, 'theme-customize/quick-tweaks'))
    }
  }
  const styleModeButtonHandler = () => {
    setFlags(prvFlags => {
      if (prvFlags.styleMode || showToolBar) toggleToolBar()
      return { ...prvFlags, styleMode: true }
    })
    if (selectedFldId !== null) {
      history.replace(history.location.pathname.replace(/(theme-customize|style|fields-list|themes|field-settings).*/g, `field-theme-customize/quick-tweaks/${selectedFldId}`))
    } else {
      history.replace(history.location.pathname.replace(/(field-theme-customize|style|fields-list|themes|field-settings).*/g, 'theme-customize/quick-tweaks'))
    }
    removeUnuseStyles(fields, setStyles)
  }
  const formFieldButtonHandler = () => {
    setFlags(prvFlags => {
      if (!prvFlags.styleMode || showToolBar) toggleToolBar()
      return { ...prvFlags, styleMode: false }
    })
    history.replace(history.location.pathname.replace(/(field-theme-customize|style|theme-customize|themes|field-settings).*/g, 'fields-list'))
    removeUnuseStyles(fields, setStyles)
  }

  const handleRightPanel = (currentActive) => {
    if (currentActive === 'fld-settings') {
      history.push(`/form/builder/${formType}/${formID}/fields-list`)
    } else if (currentActive === 'theme-customize') {
      history.push(`/form/builder/${formType}/${formID}/themes`)
    }
    removeUnuseStyles(fields, setStyles)
  }

  return (
    <div className={css(OptionToolBarStyle.optionToolBar)}>
      <div className={css(OptionToolBarStyle.form_section)}>
        <div className={css(ut.flxc)}>
          <Tip msg="Form Fields">
            <button onClick={formFieldButtonHandler} type="button" className={`${css(OptionToolBarStyle.icn_btn, ut.icn_hover, ut.ml2)} ${(!flags.styleMode && !showToolBar) && 'active'}`}>
              <AddIcon size="22" />
            </button>
          </Tip>
          <Tip msg="Elements & Layers">
            <button onClick={styleModeButtonHandler} type="button" className={`${css([OptionToolBarStyle.icn_btn, ut.icn_hover])} ${(flags.styleMode && !showToolBar) && 'active'}`}>
              <LayerIcon size="22" />
            </button>
          </Tip>
        </div>
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
            <button className={`${css([OptionToolBarStyle.icn_btn, ut.icn_hover])}`} onClick={() => setModal(true)} type="button"><SettingsIcn size={22} /></button>
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
            {/* <Tip msg="Fields Settings">
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
            </Tip> */}
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
              defaultActive={rightBar.match(/themes|theme-customize/gi) && 'theme-customize'}
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
