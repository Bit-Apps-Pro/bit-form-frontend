import { useAtom, useAtomValue } from 'jotai'
import { useFela } from 'react-fela'
import { create } from 'mutative'
import { $allLayouts, $builderRightPanelScroll, $formInfo } from '../../GlobalStates/GlobalStates'
import { $activeBuilderStep } from '../../GlobalStates/FormBuilderStates'
import ut from '../../styles/2.utilities'
import ThemeStyleReset from '../style-new/ThemeStyleReset'
import { $styles } from '../../GlobalStates/StylesState'
import sc from '../../styles/commonStyleEditorStyle'
import Back2FldBtn from './Back2FldBtn'
import style from '../../styles/FieldSettingTitle.style'
import FieldSettingsDivider from './CompSettingsUtils/FieldSettingsDivider'
import { __ } from '../../Utils/i18nwrap'
import CoolCopy from '../Utilities/CoolCopy'
import { ucFirst } from '../../Utils/Helpers'
import FieldStyle from '../../styles/FieldStyle.style'
import SingleToggle from '../Utilities/SingleToggle'
import SimpleAccordion from './StyleCustomize/ChildComp/SimpleAccordion'
import tippyHelperMsg from '../../Utils/StaticData/tippyHelperMsg'
import MultistepButtonSettings from './CompSettingsUtils/MultistepButtonSettings'

export default function MultiStepSettings() {
  const allLayouts = useAtomValue($allLayouts)
  const activeBuilderStep = useAtomValue($activeBuilderStep)
  const scrollTo = useAtomValue($builderRightPanelScroll)
  const [formInfo, setFormInfo] = useAtom($formInfo)
  const [styles, setStyles] = useAtom($styles)
  const { css } = useFela()
  const stepLayout = allLayouts[activeBuilderStep]

  const { showStepHeader, headerIcon, themeStyle, btnSettings } = formInfo.multiStepSettings || {}

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

  return (
    <div>
      <div className={css(style.section, style.flxColumn, style.fixed, scrollTo && style.shw)}>
        <Back2FldBtn size="16" className={css(style.btn, ut.fontBody)} />
        <div>
          <div className={css(style.mainTitle)}>{__('Multisteps Settings')}</div>
          <span className={css(style.subtitle, ut.fontBody)}>{__(ucFirst(`${activeBuilderStep}`))}</span>
        </div>
      </div>
      <FieldSettingsDivider />
      <div className={css(style.section, { mx: 15 })}>
        <span className={css(style.title)}>Step key</span>
        <CoolCopy id="fld-stng-key" value={activeBuilderStep} />
      </div>
      <FieldSettingsDivider />
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
          title={__('Show step Header')}
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
              className={css(sc.select)}
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
          id="show-step-btn"
          tip="By disabling this option, the Step Button will be hidden."
          title={__('Show Button')}
          action={e => setButtonSettings('show', e.target.checked)}
          isChecked={btnSettings?.show || ''}
        />
      </div>
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
  image: 'Image',
  number: 'Number',
}
