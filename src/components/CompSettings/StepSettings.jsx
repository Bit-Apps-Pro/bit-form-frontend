import { useAtom, useAtomValue } from 'jotai'
import { create } from 'mutative'
import { useState } from 'react'
import { useFela } from 'react-fela'
import { $activeBuilderStep } from '../../GlobalStates/FormBuilderStates'
import { $activeStepSettings, $allLayouts, $builderRightPanelScroll, $formInfo } from '../../GlobalStates/GlobalStates'
import { ucFirst } from '../../Utils/Helpers'
import tippyHelperMsg from '../../Utils/StaticData/tippyHelperMsg'
import { __ } from '../../Utils/i18nwrap'
import ut from '../../styles/2.utilities'
import style from '../../styles/FieldSettingTitle.style'
import FieldStyle from '../../styles/FieldStyle.style'
import CoolCopy from '../Utilities/CoolCopy'
import Modal from '../Utilities/Modal'
import Back2FldBtn from './Back2FldBtn'
import AutoResizeInput from './CompSettingsUtils/AutoResizeInput'
import FieldSettingsDivider from './CompSettingsUtils/FieldSettingsDivider'
import Icons from './Icons'
import FieldIconSettings from './StyleCustomize/ChildComp/FieldIconSettings'
import SimpleAccordion from './StyleCustomize/ChildComp/SimpleAccordion'

export default function StepSettings() {
  const allLayouts = useAtomValue($allLayouts)
  const activeBuilderStep = useAtomValue($activeBuilderStep)
  const scrollTo = useAtomValue($builderRightPanelScroll)
  const [formInfo, setFormInfo] = useAtom($formInfo)
  const [activeStepSettings, setActiveStepSettings] = useAtom($activeStepSettings)
  const { css } = useFela()
  const stepData = activeStepSettings || {}
  const [icnMdl, setIcnMdl] = useState(false)
  const [icnType, setIcnType] = useState('')

  const {
    lbl, showLbl, subtitle, showSubtitle, lblPreIcn, lblSufIcn, subTlePreIcn, subTleSufIcn,
  } = stepData || {}


  const setIconModel = (iconType) => {
    // if (!isStyleExist(styles, fldKey, styleClasses[iconType])) addDefaultStyleClasses(selectedFieldId, iconType)
    // setIconFilterValue(iconType, fldKey)
    setIcnType(iconType)
    setIcnMdl(true)
  }

  const removeIcon = (iconType) => {
    setActiveStepSettings(create(activeStepSettings, draft => {
      delete draft[iconType]
    }))
  }

  const setStepSettings = (propName, value) => {
    console.log(propName, value)
    setActiveStepSettings(create(activeStepSettings, draft => {
      draft[propName] = value
    }))
  }

  const setIconAction = (icon) => {
    setActiveStepSettings(create(activeStepSettings, draft => {
      draft[icnType] = icon
    }))
    setIcnMdl(false)
  }

  const removeIconAction = (file) => {
    if (activeStepSettings[icnType] === file) {
      setActiveStepSettings(create(activeStepSettings, draft => {
        delete draft[icnType]
      }))
    }
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
          tip={tippyHelperMsg.stepLbl}
          tipProps={{ width: 250, icnSize: 17 }}
          toggleAction={(e) => setStepSettings('showLbl', e.target.checked)}
          toggleChecked={showLbl}
          open={showLbl}
          disable={!showLbl}
          proTip="Use this feature? please buy pro version."
        >
          <div>
            <div className={css({ w: '97%', mx: 5 })}>
              <AutoResizeInput
                id="fld-lbl-stng"
                ariaLabel="Label input"
                changeAction={(e) => setStepSettings('lbl', e.target.value?.replace(/\\\\/g, '$_bf_$'))}
                value={lbl.replace(/\$_bf_\$/g, '\\')}
              />
            </div>

            <div className={css(ut.mt1)}>
              <FieldIconSettings
                label="Leading Icon"
                iconSrc={lblPreIcn}
                styleRoute="lbl-pre-i"
                setIcon={() => setIconModel('lblPreIcn')}
                removeIcon={() => removeIcon('lblPreIcn')}
                isPro
                proProperty="leadingIcon"
              />

              <FieldIconSettings
                label="Trailing Icon"
                iconSrc={lblSufIcn}
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

        <SimpleAccordion
          id="fld-sub-titl-stng"
          title={__('Step Subtitle')}
          className={`${css(FieldStyle.fieldSection)} ${css(FieldStyle.hover_tip)}`}
          switching
          tip={tippyHelperMsg.stepSubtitle}
          tipProps={{ width: 250, icnSize: 17 }}
          toggleAction={(e) => setStepSettings('showSubtitle', e.target.checked)}
          toggleChecked={showSubtitle}
          open={showSubtitle}
          disable={!showSubtitle}
          proTip="Use this feature? please buy pro version."
        >
          <div>
            <div className={css({ w: '97%', mx: 5 })}>
              <AutoResizeInput
                id="fld-lbl-stng"
                ariaLabel="Label input"
                changeAction={(e) => setStepSettings('subtitle', e.target.value?.replace(/\\\\/g, '$_bf_$'))}
                value={subtitle.replace(/\$_bf_\$/g, '\\')}
              />
            </div>

            <div className={css(ut.mt1)}>
              <FieldIconSettings
                label="Leading Icon"
                iconSrc={subTlePreIcn}
                styleRoute="lbl-pre-i"
                setIcon={() => setIconModel('subTlePreIcn')}
                removeIcon={() => removeIcon('subTlePreIcn')}
                isPro
                proProperty="leadingIcon"
              />

              <FieldIconSettings
                label="Trailing Icon"
                iconSrc={subTleSufIcn}
                styleRoute="lbl-suf-i"
                setIcon={() => setIconModel('subTleSufIcn')}
                removeIcon={() => removeIcon('subTleSufIcn')}
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
            setIcon={() => setIconModel('icon')}
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
        <Icons iconType="opt" setModal={setIcnMdl} setIconAction={setIconAction} removeIconAction={removeIconAction} />
      </Modal>
    </>
  )
}

const iconTypes = {
  image: 'Image',
  number: 'Number',
}
