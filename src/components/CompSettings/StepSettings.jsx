import { useAtom, useAtomValue } from 'jotai'
import { useFela } from 'react-fela'
import { create } from 'mutative'
import { useState } from 'react'
import { $activeStepSettings, $allLayouts, $builderRightPanelScroll, $formInfo, $layouts } from '../../GlobalStates/GlobalStates'
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
import FieldIconSettings from './StyleCustomize/ChildComp/FieldIconSettings'
import AutoResizeInput from './CompSettingsUtils/AutoResizeInput'
import Icons from './Icons'
import Modal from '../Utilities/Modal'

export default function StepSettings() {
  const allLayouts = useAtomValue($allLayouts)
  const activeBuilderStep = useAtomValue($activeBuilderStep)
  const scrollTo = useAtomValue($builderRightPanelScroll)
  const [formInfo, setFormInfo] = useAtom($formInfo)
  const [activeStepSettings, setActiveStepSettings] = useAtom($activeStepSettings)
  const { css } = useFela()
  console.log('activeStepSettings', activeStepSettings)
  const stepData = activeStepSettings || {}
  const [icnMdl, setIcnMdl] = useState(false)
  const [icnType, setIcnType] = useState('')

  const { showStepHeader, headerIcon, themeStyle, btnSettings } = formInfo.multiStepSettings || {}
  const { lbl, showLbl, subtitle, showSubtitle, lblPreIcn, lblSufIcn } = stepData || {}

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

  const setIconModel = (iconType) => {
    // if (!isStyleExist(styles, fldKey, styleClasses[iconType])) addDefaultStyleClasses(selectedFieldId, iconType)
    // setIconFilterValue(iconType, fldKey)
    setIcnType(iconType)
    setIcnMdl(true)
  }

  const removeIcon = (iconType) => {
    if (stepData[iconType]) {
      delete stepData[iconType]
    }
  }

  const setStepLabel = (e) => {
    const { value } = e.target
    setActiveStepSettings(oldSettings => create(oldSettings, draft => {
      draft.lbl = value.replace(/\\\\/g, '$_bf_$')
    }))
  }

  return (
    <>
      <div>
        <div className={css(style.section, style.flxColumn, style.fixed, scrollTo && style.shw)}>
          <Back2FldBtn size="16" className={css(style.btn, ut.fontBody)} />
          <div>
            <div className={css(style.mainTitle)}>{__('Step Settings')}</div>
            <span className={css(style.subtitle, ut.fontBody)}>{__(ucFirst(`${activeBuilderStep}`))}</span>
          </div>
        </div>
        <FieldSettingsDivider />
        <div className={css(style.section, { mx: 15 })}>
          <span className={css(style.title)}>Step key</span>
          <CoolCopy id="fld-stng-key" value={activeBuilderStep} />
        </div>
        <FieldSettingsDivider />

        <SimpleAccordion
          id="fld-lbl-stng"
          title={__('Step Label')}
          className={`${css(FieldStyle.fieldSection)} ${css(FieldStyle.hover_tip)}`}
          switching
          tip={tippyHelperMsg.lbl}
          tipProps={{ width: 250, icnSize: 17 }}
          toggleAction={showLbl}
          toggleChecked={!stepData.valid.hideLbl}
          open={!stepData.valid.hideLbl}
          disable={stepData.valid.hideLbl}
          proTip="Use this feature? please buy pro version."
        >
          <div>
            <div className={css({ w: '97%', mx: 5 })}>
              <AutoResizeInput
                id="fld-lbl-stng"
                ariaLabel="Label input"
                changeAction={setStepLabel}
                value={lbl.replace(/\$_bf_\$/g, '\\')}
              />
            </div>

            <div className={css(ut.mt1)}>
              <FieldIconSettings
                label="Leading Icon"
                iconSrc={stepData?.lblPreIcn}
                styleRoute="lbl-pre-i"
                setIcon={() => setIconModel('lblPreIcn')}
                removeIcon={() => removeIcon('lblPreIcn')}
                isPro
                proProperty="leadingIcon"
              />

              <FieldIconSettings
                label="Trailing Icon"
                iconSrc={stepData?.lblSufIcn}
                styleRoute="lbl-suf-i"
                setIcon={() => setIconModel('lblSufIcn')}
                removeIcon={() => removeIcon('lblSufIcn')}
                isPro
                proProperty="trailingIcon"
              />
            </div>
          </div>
        </SimpleAccordion>
        <FieldSettingsDivider />

        <div className={css(FieldStyle.fieldSection, FieldStyle.hover_tip)}>
          <FieldIconSettings
            label="Step Icon"
            iconSrc={stepData.icon}
            styleRoute="step-icn"
            setIcon={() => setIcnMdl(true)}
            isPro
            proProperty="stepIcon"
          />
        </div>
        <FieldSettingsDivider />

      </div>
      <Modal
        md
        autoHeight
        show={icnMdl}
        setModal={setIcnMdl}
        className="o-v"
        title={__('Icons')}
      >
        <div className="pos-rel" />
        <Icons iconType="opt" setModal={setIcnMdl} />
      </Modal>
    </>
  )
}

const iconTypes = {
  image: 'Image',
  number: 'Number',
}
