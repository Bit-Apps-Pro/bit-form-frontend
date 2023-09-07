/* eslint-disable no-param-reassign */
import { useAtom, useAtomValue } from 'jotai'
import { create } from 'mutative'
import { useState } from 'react'
import { useFela } from 'react-fela'
import { useParams } from 'react-router-dom'
import { set } from 'date-fns'
import { $fields, $formInfo, $selectedFieldId } from '../../../GlobalStates/GlobalStates'
import { $styles } from '../../../GlobalStates/StylesState'
import { addToBuilderHistory, reCalculateFldHeights } from '../../../Utils/FormBuilderHelper'
import { IS_PRO, deepCopy } from '../../../Utils/Helpers'
import { __ } from '../../../Utils/i18nwrap'
import FieldStyle from '../../../styles/FieldStyle.style'
import Modal from '../../Utilities/Modal'
import { addDefaultStyleClasses, isStyleExist, setIconFilterValue, styleClasses } from '../../style-new/styleHelpers'
import Icons from '../Icons'
import FieldIconSettings from '../StyleCustomize/ChildComp/FieldIconSettings'
import SimpleAccordion from '../StyleCustomize/ChildComp/SimpleAccordion'
import AutoResizeInput from './AutoResizeInput'

export default function MultistepButtonSettings({ btnType, btnName, switching, handleButtonAlignment, btnAlignmentList }) {
  const { fieldKey: fldKey } = useParams()
  const selectedFieldId = useAtomValue($selectedFieldId)
  const [styles, setStyles] = useAtom($styles)
  const [icnMdl, setIcnMdl] = useState(false)
  const [icnType, setIcnType] = useState('')
  const { css } = useFela()
  const [formInfo, setFormInfo] = useAtom($formInfo)

  const { btnSettings } = formInfo.multiStepSettings || {}

  const tipMessage = `This ${btnName} Button is use to go in ${btnName} Step.`

  const handleToggleAction = ({ target: { checked } }) => {
    // addDefaultStyleClasses(selectedFieldId, 'subTitl')
    setFormInfo(oldInfo => create(oldInfo, draft => {
      draft.multiStepSettings.btnSettings[btnType].show = checked
    }))
    // addToBuilderHistory({
    //   event: `${status} Repeater ${btnName}:  ${fieldData[btnType].txt || adminLabel || fldKey}`,
    //   type: `${status}_repeater_${btnType}`,
    //   state: { fields: allFields, fldKey },
    // })
  }

  const setButtonText = ({ target: { value } }) => {
    setFormInfo(oldInfo => create(oldInfo, draft => {
      draft.multiStepSettings.btnSettings[btnType].txt = value
    }))
  }

  const setIconModel = (typ) => {
    // if (!IS_PRO) return
    // if (!isStyleExist(styles, fldKey, styleClasses[typ])) addDefaultStyleClasses(selectedFieldId, typ)
    // setIconFilterValue(typ, fldKey)
    setIcnType(typ)
    setIcnMdl(true)
  }

  const removeIcon = (iconType) => {
    setFormInfo(oldInfo => create(oldInfo, draft => {
      if (draft.multiStepSettings.btnSettings[btnType][iconType]) {
        delete draft.multiStepSettings.btnSettings[btnType][iconType]
      }
    }))
  }

  const setIconAction = (icon) => {
    setFormInfo(oldInfo => create(oldInfo, draft => {
      draft.multiStepSettings.btnSettings[btnType][icnType] = icon
    }))
    setIcnMdl(false)
  }

  const removeIconAction = (file) => {
    if (btnSettings[btnType][icnType] === file) {
      delete btnSettings[btnType][icnType]
      setFormInfo(oldInfo => create(oldInfo, draft => {
        draft.multiStepSettings.btnSettings = btnSettings
      }))
    }
  }

  return (
    <div>
      <SimpleAccordion
        id={`${btnType}-stp-btn-stng`}
        title={__(`${btnName} Button`)}
        className={css(FieldStyle.fieldSection, FieldStyle.hover_tip)}
        // switching={switching}
        tip={tipMessage}
        tipProps={{ width: 250, icnSize: 17 }}
        // toggleAction={handleToggleAction}
        // toggleChecked={fieldData?.[btnType].show}
        // disable={!fieldData?.[btnType].show}
        isPro
      >
        <div className={css(FieldStyle.placeholder)}>
          <AutoResizeInput
            id={`${btnType}-rpt-btn-stng`}
            ariaLabel={`${btnName} Repeater Button Text`}
            placeholder="Type Button Text here..."
            value={btnSettings?.[btnType].txt}
            changeAction={setButtonText}
          />
        </div>

        <FieldIconSettings
          label="Leading Icon"
          iconSrc={btnSettings?.[btnType]?.preIcn}
          styleRoute={`${styleRoute[btnType]}-pre-i`}
          setIcon={() => setIconModel('preIcn')}
          removeIcon={() => removeIcon('preIcn')}
          proProperty="leadingIcon"
        />

        <FieldIconSettings
          label="Trailing Icon"
          iconSrc={btnSettings?.[btnType]?.sufIcn}
          styleRoute={`${styleRoute[btnType]}-suf-i`}
          setIcon={() => setIconModel('sufIcn')}
          removeIcon={() => removeIcon('sufIcn')}
          proProperty="trailingIcon"
        />

        {/* {btnType === 'addToEndBtn' && (
          <div className={css(FieldStyle.fieldNumber, { py: '0px !important', mx: 5 })}>
            <span>{__('Button Alignment:')}</span>
            <select
              data-testid="btn-algn-slct"
              className={css(FieldStyle.input, FieldStyle.w140)}
              name=""
              id=""
              value={fieldData[btnType].btnAlignment}
              onChange={handleButtonAlignment}
            >
              {btnAlignmentList.map(itm => <option key={`btcd-k-${itm.name}`} value={itm.value}>{itm.name}</option>)}
            </select>
          </div>
        )} */}

      </SimpleAccordion>
      <Modal
        md
        autoHeight
        show={icnMdl}
        setModal={setIcnMdl}
        className="o-v"
        title={__('Icons')}
      >
        <div className="pos-rel" />
        <Icons iconType={icnType} setModal={setIcnMdl} setIconAction={setIconAction} removeIconAction={removeIconAction} />
      </Modal>
    </div>
  )
}

const styleRoute = {
  nextBtn: 'step-next-btn',
  prevBtn: 'step-prev-btn',
}
