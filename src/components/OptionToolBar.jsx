/* eslint-disable jsx-a11y/control-has-associated-label */
import { useState } from 'react'
import { useFela } from 'react-fela'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { $breakpoint, $colorScheme, $flags, $selectedFieldId } from '../GlobalStates/GlobalStates'
import AddIcon from '../Icons/AddIcon'
import BrushIcn from '../Icons/BrushIcn'
import BtnIcn from '../Icons/BtnIcn'
import DarkIcn from '../Icons/DarkIcn'
import EditIcn from '../Icons/EditIcn'
import EllipsisIcon from '../Icons/EllipsisIcon'
import LaptopIcn from '../Icons/LaptopIcn'
import LayerIcon from '../Icons/LayerIcon'
import LightIcn from '../Icons/LightIcn'
import MobileIcon from '../Icons/MobileIcon'
import SettingsIcn from '../Icons/SettingsIcn'
import TabletIcon from '../Icons/TabletIcon'
import ut from '../styles/2.utilities'
import OptionToolBarStyle from '../styles/OptionToolbar.style'
import BreakpointSizeControl from './BreakpointSizeControl'
import BuilderSettings from './BuilderSettings'
import CustomCodeEditor from './CompSettings/CustomCodeEditor'
import Grow from './CompSettings/StyleCustomize/ChildComp/Grow'
import FormBuilderHistory from './FormBuilderHistory'
import { removeUnuseStyles } from './style-new/styleHelpers'
import Downmenu from './Utilities/Downmenu'
import Modal from './Utilities/Modal'
import StyleSegmentControl from './Utilities/StyleSegmentControl'
import Tip from './Utilities/Tip'

export default function OptionToolBar({ setResponsiveView, setShowToolbar, showToolBar, toggleToolBar }) {
  const { css } = useFela()
  const history = useNavigate()

  const { formType, formID, rightBar } = useParams()
  const [flags, setFlags] = useRecoilState($flags)
  const breakpoint = useRecoilValue($breakpoint)
  const colorScheme = useRecoilValue($colorScheme)
  const setColorScheme = useSetRecoilState($colorScheme)
  const [responsiveMenu, setResponsiveMenu] = useState(false)
  const [modal, setModal] = useState(false)
  const selectedFldId = useRecoilValue($selectedFieldId)
  const [settingsModalTab, setSettingsModalTab] = useState('Builder Settings')
  const navigate = useNavigate()

  const styleModeButtonHandler = () => {
    setFlags(prvFlags => {
      if (prvFlags.styleMode || showToolBar) toggleToolBar()
      return { ...prvFlags, styleMode: true, inspectMode: false }
    })
    if (selectedFldId) {
      navigate(`/form/builder/${formType}/${formID}/field-theme-customize/quick-tweaks/${selectedFldId}`, { replace: true })
    } else {
      navigate(`/form/builder/${formType}/${formID}/theme-customize/quick-tweaks`, { replace: true })
    }
    removeUnuseStyles()
  }

  const formFieldButtonHandler = () => {
    setFlags(prvFlags => {
      if (!prvFlags.styleMode || showToolBar) toggleToolBar()
      return { ...prvFlags, styleMode: false, inspectMode: false }
    })
    if (selectedFldId) {
      navigate(`/form/builder/${formType}/${formID}/field-settings/${selectedFldId}`, { replace: true })
    } else {
      navigate(`/form/builder/${formType}/${formID}/fields-list`, { replace: true })
    }
    removeUnuseStyles()
  }

  const handleRightPanel = (currentActive) => {
    if (currentActive === 'fld-settings') {
      navigate(`/form/builder/${formType}/${formID}/fields-list`)
    } else if (currentActive === 'theme-customize') {
      navigate(`/form/builder/${formType}/${formID}/themes`)
    }
    removeUnuseStyles()
  }

  const inspectModeButtonHandler = () => {
    setFlags(prvFlags => ({ ...prvFlags, inspectMode: !prvFlags.inspectMode }))
  }

  const handleRightPanelDefaultActive = () => {
    if (rightBar.match(/fields-list|field-settings/)) {
      if (flags.styleMode || flags.inspectMode) {
        setFlags(prvFlags => ({ ...prvFlags, styleMode: false, inspectMode: false }))
      }
      return 'fld-settings'
    }
    if (rightBar.match(/themes|style|field-theme-customize|theme-customize/)) {
      if (!flags.styleMode) {
        setFlags(prvFlags => ({ ...prvFlags, styleMode: true }))
      }
      return 'theme-customize'
    }
  }

  const handleColorSchemeSwitch = () => {
    setColorScheme(prv => (prv === 'light' ? 'dark' : 'light'))
  }

  return (
    <div className={css(OptionToolBarStyle.optionToolBar)}>
      <div className={css(OptionToolBarStyle.form_section)}>
        <div className={css(ut.flxc)}>
          <Tip msg="Form Fields">
            <button data-testid="field-mode" onClick={formFieldButtonHandler} type="button" className={`${css(OptionToolBarStyle.icn_btn, ut.icn_hover, ut.ml2)} ${(!flags.styleMode && !showToolBar) && 'active'}`}>
              <AddIcon size="22" />
            </button>
          </Tip>
          <Tip msg="Elements & Layers">
            <button data-testid="style-mode" onClick={styleModeButtonHandler} type="button" className={`${css([OptionToolBarStyle.icn_btn, ut.icn_hover])} ${(flags.styleMode && !showToolBar) && 'active'}`}>
              <LayerIcon size="22" />
            </button>
          </Tip>
          {flags.styleMode && (
            <Tip msg="Inspect Element">
              <button data-testid="inspect-element" onClick={inspectModeButtonHandler} type="button" className={`${css([OptionToolBarStyle.icn_btn, ut.icn_hover])} ${(flags.inspectMode && !showToolBar) && 'active'}`}>
                <BtnIcn size="22" />
              </button>
            </Tip>
          )}
        </div>
        <div className={css(OptionToolBarStyle.option_section)}>
          {/* <Tip msg="Small Screen View">
            <button
              data-testid="bp-sm"
              onClick={() => setResponsiveView('sm')}
              className={`${css([OptionToolBarStyle.icn_btn, ut.icn_hover])} ${breakpoint === 'sm' && 'active'}`}
              type="button"
            >
              <MobileIcon size={23} />
            </button>
          </Tip>
          <Tip msg="Medium Screen View">
            <button
              data-testid="bp-md"
              onClick={() => setResponsiveView('md')}
              className={`${css([OptionToolBarStyle.icn_btn, ut.icn_hover])} ${breakpoint === 'md' && 'active'}`}
              type="button"
            >
              <TabletIcon size={22} />

            </button>
          </Tip>
          <Tip msg="Large Screen View">
            <button
              data-testid="bp-lg"
              onClick={() => setResponsiveView('lg')}
              className={`${css([OptionToolBarStyle.icn_btn, ut.icn_hover])} ${breakpoint === 'lg' && 'active'}`}
              type="button"
            >
              <LaptopIcn size={29} stroke={1.6} />
            </button>
          </Tip> */}

          <StyleSegmentControl
            width={130}
            wideTab
            show={['icn']}
            tipPlace="bottom"
            defaultActive={breakpoint}
            onChange={setResponsiveView}
            className={css(ut.mr2)}
            options={[
              {
                icn: <span className={css(OptionToolBarStyle.respIcnWrp)}><MobileIcon size={23} /></span>,
                label: 'sm',
                tip: 'Small Screen View',
              },
              {
                icn: <span className={css(OptionToolBarStyle.respIcnWrp)}><TabletIcon size={22} /></span>,
                label: 'md',
                tip: 'Medium Screen View',
              },
              {
                icn: <span className={css(OptionToolBarStyle.respIcnWrp)}><LaptopIcn size={29} stroke={1.6} /></span>,
                label: 'lg',
                tip: 'Large Screen View',
              },
            ]}
          />

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
            <button
              data-testid="custom-css-js"
              className={`${css([OptionToolBarStyle.icn_btn, ut.icn_hover])}`}
              onClick={() => setModal(true)}
              type="button"
            >
              <SettingsIcn size={22} />
            </button>
          </Tip>

          <div className={css(OptionToolBarStyle.border_right)} />

          <div className={css([ut.flxc])}>
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
              width={90}
              wideTab
              show={['icn']}
              tipPlace="bottom"
              defaultActive={colorScheme}
              onChange={handleColorSchemeSwitch}
              className={css(ut.mr2)}
              options={[
                { icn: <LightIcn size="19" />, label: 'light', tip: 'Light Mode' },
                { icn: <DarkIcn size="19" />, label: 'dark', tip: 'Dark Mode' },
              ]}
            />
            <StyleSegmentControl
              borderRadius={10}
              width={180}
              show={['icn']}
              tipPlace="bottom"
              defaultActive={handleRightPanelDefaultActive()}
              options={[
                { icn: <EditIcn size="19" />, label: 'fld-settings', tip: 'Field Settings' },
                { icn: <BrushIcn size="15" />, label: 'theme-customize', tip: 'Theme Customization' },
              ]}
              onChange={handleRightPanel}
              wideTab
            // className={css(ut.mr1)}
            />

            {/* <Tip msg="Style render">
              <SingleToggle
                name="styleMood"
                isChecked={flags.styleMode}
                action={styleModeHandler}
                id="style-mode"
              />
            </Tip> */}
          </div>
        </div>
      </div>
      <Modal
        md
        autoHeight
        show={modal}
        setModal={setModal}
        className="o-v"
        title={(
          <div className={css(OptionToolBarStyle.modalTitleBar)}>
            <StyleSegmentControl
              width={300}
              wideTab
              tipPlace="bottom"
              defaultActive={settingsModalTab}
              onChange={setSettingsModalTab}
              options={[
                { label: 'Builder Settings' },
                { label: 'Custom Code' },
              ]}
            />
          </div>
        )}
        closeOnOutsideClick={false}
      >
        <Grow open={settingsModalTab === 'Builder Settings'}><BuilderSettings /></Grow>
        <Grow open={settingsModalTab === 'Custom Code'}><CustomCodeEditor /></Grow>
      </Modal>
      <div className="theme-section" />
    </div>
  )
}
