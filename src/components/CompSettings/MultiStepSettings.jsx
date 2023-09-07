import { useAtom, useAtomValue } from 'jotai'
import { create } from 'mutative'
import { useFela } from 'react-fela'
import { $activeBuilderStep } from '../../GlobalStates/FormBuilderStates'
import { $allLayouts, $builderRightPanelScroll, $formInfo } from '../../GlobalStates/GlobalStates'
import { $styles } from '../../GlobalStates/StylesState'
import tippyHelperMsg from '../../Utils/StaticData/tippyHelperMsg'
import { __ } from '../../Utils/i18nwrap'
import ut from '../../styles/2.utilities'
import style from '../../styles/FieldSettingTitle.style'
import FieldStyle from '../../styles/FieldStyle.style'
import sc from '../../styles/commonStyleEditorStyle'
import SingleToggle from '../Utilities/SingleToggle'
import ThemeStyleReset from '../style-new/ThemeStyleReset'
import Back2FldBtn from './Back2FldBtn'
import FieldSettingsDivider from './CompSettingsUtils/FieldSettingsDivider'
import MultistepButtonSettings from './CompSettingsUtils/MultistepButtonSettings'
import SimpleAccordion from './StyleCustomize/ChildComp/SimpleAccordion'

export default function MultiStepSettings() {
  const allLayouts = useAtomValue($allLayouts)
  const activeBuilderStep = useAtomValue($activeBuilderStep)
  const scrollTo = useAtomValue($builderRightPanelScroll)
  const [formInfo, setFormInfo] = useAtom($formInfo)
  const [styles, setStyles] = useAtom($styles)
  const { css } = useFela()
  const stepLayout = allLayouts[activeBuilderStep]

  const {
    showStepHeader, headerIcon, themeStyle, btnSettings, showLbl, showSubtitle, validateOnStepChange, stepHeaderSwitchable, maintainStepHistory, saveProgress, progressSettings,
  } = formInfo.multiStepSettings || {}

  const setMultistepSettings = (propName, value) => {
    setFormInfo(oldInfo => create(oldInfo, draft => {
      draft.multiStepSettings[propName] = value
    }))
  }

  const setHeaderIcon = (propName, value) => {
    setFormInfo(oldInfo => create(oldInfo, draft => {
      draft.multiStepSettings.headerIcon[propName] = value
    }))
  }

  const setButtonSettings = (propName, value) => {
    setFormInfo(oldInfo => create(oldInfo, draft => {
      draft.multiStepSettings.btnSettings[propName] = value
    }))
  }

  const setProgressSettings = (propName, value) => {
    setFormInfo(oldInfo => create(oldInfo, draft => {
      draft.multiStepSettings.progressSettings[propName] = value
    }))
  }

  return (
    <div>
      <div className={css(style.section, style.flxColumn, style.fixed, scrollTo && style.shw)}>
        <Back2FldBtn size="16" className={css(style.btn, ut.fontBody)} />
        <div>
          <div className={css(style.mainTitle)}>{__('Multisteps Settings')}</div>
        </div>
      </div>
      <div className={css(ut.flxcb, FieldStyle.fieldSection)}>
        <span className={css(ut.fw500)}>Multistep Theme</span>
        <span className={css(ut.flxc)}>
          <ThemeStyleReset id="global-theme" />
          <select
            value={themeStyle}
            onChange={(e) => setMultistepSettings('themeStyle', e.target.value)}
            className={css(sc.select)}
            data-testid="field-sizes-select"
          >
            {Object.keys(themeStyles).map((key, index) => (
              <option
                key={`style-${index * 5 * 2}`}
                value={key}
                data-testid={`step-style-${key}`}
              >
                {themeStyles[key]}
              </option>
            ))}
          </select>
        </span>
      </div>

      <FieldSettingsDivider />
      <div className={css(FieldStyle.fieldSection)}>
        <SingleToggle
          id="show-stp-header"
          tip="By disabling this option, the Step Header will be hidden."
          title={__('Show Step Header')}
          action={e => setMultistepSettings('showStepHeader', e.target.checked)}
          isChecked={showStepHeader || ''}
        />
      </div>

      <FieldSettingsDivider />
      <SimpleAccordion
        id="show-hdr-icn"
        title={__('Show Header Icon')}
        className={css(FieldStyle.fieldSection, FieldStyle.hover_tip)}
        switching
        tip={tippyHelperMsg.showHeaderIcon}
        tipProps={{ width: 250, icnSize: 17 }}
        toggleAction={(e) => setHeaderIcon('show', e.target.checked)}
        toggleChecked={headerIcon?.show}
        open={headerIcon?.show}
        disable={!headerIcon?.show}
      >
        <div className={css(FieldStyle.placeholder)}>
          <div className={css(FieldStyle.fieldNumber)}>
            <span>{__('Icon Type:')}</span>
            <select
              value={headerIcon?.iconType}
              onChange={(e) => setHeaderIcon('iconType', e.target.value)}
              className={css(FieldStyle.input, FieldStyle.w140)}
              data-testid="hdr-icn-select"
            >
              {Object.keys(iconTypes).map((key, index) => (
                <option
                  key={`icon-${index * 5 * 2}`}
                  value={key}
                  data-testid={`icon-typ-${key}`}
                >
                  {iconTypes[key]}
                </option>
              ))}
            </select>
          </div>
        </div>
      </SimpleAccordion>

      <FieldSettingsDivider />

      <div className={css(FieldStyle.fieldSection)}>
        <SingleToggle
          id="show-header-lbl"
          tip="By disabling this option, the Step Header Label will be hidden."
          title={__('Show Header Label')}
          action={e => setMultistepSettings('showLbl', e.target.checked)}
          isChecked={showLbl || ''}
        />
      </div>

      <FieldSettingsDivider />

      <div className={css(FieldStyle.fieldSection)}>
        <SingleToggle
          id="show-header-subtitle"
          tip="By disabling this option, the Step Header Subtitle will be hidden."
          title={__('Show Header Subtitle')}
          action={e => setMultistepSettings('showSubtitle', e.target.checked)}
          isChecked={showSubtitle || ''}
        />
      </div>

      <FieldSettingsDivider />

      <SimpleAccordion
        id="show-step-btn"
        title={__('Show Buttons')}
        className={css(FieldStyle.fieldSection, FieldStyle.hover_tip)}
        switching
        tip="By disabling this option, the Step Button will be hidden."
        tipProps={{ width: 250, icnSize: 17 }}
        toggleAction={(e) => setButtonSettings('show', e.target.checked)}
        toggleChecked={btnSettings?.show}
        open={btnSettings?.show}
        disable={!btnSettings?.show}
      >
        <div className={css({ mx: 5 })}>
          <div className={css(FieldStyle.fieldNumber, { py: '0px !important' })}>
            <span>{__('Button Position:')}</span>
            <select
              data-testid="btn-posn-slct"
              className={css(FieldStyle.input, FieldStyle.w140)}
              name=""
              id=""
              value={btnSettings?.position}
              onChange={(e) => setButtonSettings('position', e.target.value)}
            >
              {btnPositionList.map(itm => <option key={`btcd-k-${itm.name}`} value={itm.value}>{itm.name}</option>)}
            </select>
          </div>
          <div className={css(FieldStyle.fieldNumber, { py: '0px !important' })}>
            <span>{__('Button Alignment:')}</span>
            <select
              data-testid="btn-algn-slct"
              className={css(FieldStyle.input, FieldStyle.w140)}
              name=""
              id=""
              value={btnSettings?.alignment}
              onChange={(e) => setButtonSettings('alignment', e.target.value)}
            >
              {btnAlignmentList.map(itm => <option key={`btcd-k-${itm.name}`} value={itm.value}>{itm.name}</option>)}
            </select>
          </div>
          <div className={css(FieldStyle.fieldNumber, { py: '0px !important' })}>
            <span>{__('Button Orientation:')}</span>
            <select
              data-testid="btn-view-slct"
              className={css(FieldStyle.input, FieldStyle.w140)}
              name=""
              id=""
              value={btnSettings?.orientation}
              onChange={(e) => setButtonSettings('orientation', e.target.value)}
            >
              {btnOrientationList.map(itm => <option key={`btcd-k-${itm.name}`} value={itm.value}>{itm.name}</option>)}
            </select>
          </div>
        </div>
      </SimpleAccordion>
      <FieldSettingsDivider />

      {btnSettings?.show && (
        <>
          <MultistepButtonSettings
            btnType="prevBtn"
            btnName="Previous"
            styleRoute="prev-btn"
          />
          <FieldSettingsDivider />
          <MultistepButtonSettings
            btnType="nextBtn"
            btnName="Next"
            styleRoute="next-btn"
          />
          <FieldSettingsDivider />
        </>
      )}
      <SimpleAccordion
        id="show-progress"
        title={__('Show Progress Bar')}
        className={css(FieldStyle.fieldSection, FieldStyle.hover_tip)}
        switching
        tip="By disabling this option, the Progress bar will be hidden."
        tipProps={{ width: 250, icnSize: 17 }}
        toggleAction={(e) => setProgressSettings('show', e.target.checked)}
        toggleChecked={progressSettings?.show}
        open={progressSettings?.show}
        disable={!progressSettings?.show}
      >
        <div className={css({ mx: 5 })}>
          <div className={css(FieldStyle.fieldNumber, { py: '0px !important' })}>
            <span>{__('Bar Position:')}</span>
            <select
              data-testid="btn-posn-slct"
              className={css(FieldStyle.input, FieldStyle.w140)}
              name=""
              id=""
              value={progressSettings?.position}
              onChange={(e) => setProgressSettings('position', e.target.value)}
            >
              {btnPositionList.map(itm => <option key={`btcd-k-${itm.name}`} value={itm.value}>{itm.name}</option>)}
            </select>
          </div>
          <SingleToggle
            id="show-pecentage"
            // tip="By disabling this option, the Progress Percentage will be hidden."
            title={__('Show Percentage')}
            action={e => setProgressSettings('showPercentage', e.target.checked)}
            isChecked={progressSettings?.showPercentage || ''}
          />
        </div>

      </SimpleAccordion>
      <FieldSettingsDivider />
      <div className={css(FieldStyle.fieldSection)}>
        <SingleToggle
          id="validate-step-change"
          tip="Validate Field Input on step change"
          title={__('Validate on Step Change')}
          action={e => setMultistepSettings('validateOnStepChange', e.target.checked)}
          isChecked={validateOnStepChange || ''}
        />
      </div>
      <FieldSettingsDivider />
      <div className={css(FieldStyle.fieldSection)}>
        <SingleToggle
          id="step-header-switchable"
          tip="Switch steps by clicking on step header icon & title"
          title={__('Step Header Switchable')}
          action={e => setMultistepSettings('stepHeaderSwitchable', e.target.checked)}
          isChecked={stepHeaderSwitchable || ''}
        />
      </div>
      <FieldSettingsDivider />

      <div className={css(FieldStyle.fieldSection)}>
        <SingleToggle
          id="maintain-step-history"
          tip="Step Flow History will be maintained when click on previous button"
          title={__('Maintain Step History')}
          action={e => setMultistepSettings('maintainStepHistory', e.target.checked)}
          isChecked={maintainStepHistory || ''}
        />
      </div>
      <FieldSettingsDivider />

      <div className={css(FieldStyle.fieldSection)}>
        <SingleToggle
          id="save-progress"
          tip="User Input will be saved as draft when click on next button"
          title={__('Save Step Progress')}
          action={e => setMultistepSettings('saveProgress', e.target.checked)}
          isChecked={saveProgress || ''}
        />
      </div>
      <FieldSettingsDivider />
    </div>
  )
}

const themeStyles = {
  'style-0': 'Default',
  'style-1': 'Style 1',
  'style-2': 'Style 2',
  'style-3': 'Style 3',
}
const iconTypes = {
  icon: 'Icon',
  number: 'Number',
}
const btnPositionList = [
  { name: 'Top', value: 'column-reverse' },
  { name: 'Bottom', value: 'column' },
  { name: 'Left', value: 'row-reverse' },
  { name: 'Right', value: 'row' },
]

const btnAlignmentList = [
  { name: 'Start', value: 'start' },
  { name: 'Center', value: 'center' },
  { name: 'End', value: 'end' },
]

const btnOrientationList = [
  { name: 'Vertical', value: 'column' },
  { name: 'Vertical-reverse', value: 'column-reverse' },
  { name: 'Horizontal', value: 'row' },
  { name: 'Horizontal-Reverse', value: 'row-reverse' },
]
