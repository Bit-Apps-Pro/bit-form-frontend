/* eslint-disable no-param-reassign */
import { produce } from 'immer'
import { useState } from 'react'
import { useFela } from 'react-fela'
import { useParams } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil'
import { $fields, $selectedFieldId } from '../../../GlobalStates/GlobalStates'
import { $styles } from '../../../GlobalStates/StylesState'
import { addToBuilderHistory, reCalculateFldHeights } from '../../../Utils/FormBuilderHelper'
import { deepCopy } from '../../../Utils/Helpers'
import { __ } from '../../../Utils/i18nwrap'
import FieldStyle from '../../../styles/FieldStyle.style'
import Modal from '../../Utilities/Modal'
import { addDefaultStyleClasses, isStyleExist, setIconFilterValue, styleClasses } from '../../style-new/styleHelpers'
import Icons from '../Icons'
import FieldIconSettings from '../StyleCustomize/ChildComp/FieldIconSettings'
import SimpleAccordion from '../StyleCustomize/ChildComp/SimpleAccordion'
import AutoResizeInput from './AutoResizeInput'

export default function RepeaterButtonSettings({ btnType, btnName, switching, handleButtonAlignment, btnAlignmentList }) {
  const [fields, setFields] = useRecoilState($fields)
  const { fieldKey: fldKey } = useParams()
  const selectedFieldId = useRecoilValue($selectedFieldId)
  const [styles, setStyles] = useRecoilState($styles)
  const [icnMdl, setIcnMdl] = useState(false)
  const [icnType, setIcnType] = useState('')
  const { css } = useFela()
  const fieldData = deepCopy(fields[fldKey])

  const adminLabel = fieldData.adminLbl || ''

  const tipMessage = `This ${btnName} is use to add/remove a repeatative Section. you can show or hide this ${btnName} by toggling this option.`

  const handleToggleAction = ({ target: { checked } }) => {
    fieldData[btnType].show = checked
    // addDefaultStyleClasses(selectedFieldId, 'subTitl')
    const status = checked ? 'Show' : 'Hide'
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    // recalculate builder field height
    reCalculateFldHeights(fldKey)
    addToBuilderHistory({
      event: `${status} Repeater ${btnName}:  ${fieldData[btnType].txt || adminLabel || fldKey}`,
      type: `${status}_repeater_${btnType}`,
      state: { fields: allFields, fldKey },
    })
  }

  const setButtonText = ({ target: { value } }) => {
    fieldData[btnType].txt = value

    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    reCalculateFldHeights(fldKey)
    addToBuilderHistory({
      event: `${btnName} Text Update: ${adminLabel || fieldData[btnType].txt || fldKey}`,
      type: `${btnType}_txt_change`,
      state: { fields: allFields, fldKey },
    })
  }

  const setIconModel = (typ) => {
    if (!isStyleExist(styles, fldKey, styleClasses[typ])) addDefaultStyleClasses(selectedFieldId, typ)
    setIconFilterValue(typ, fldKey)
    setIcnType(typ)
    setIcnMdl(true)
  }

  const removeIcon = (iconType) => {
    if (fieldData[iconType]) {
      delete fieldData[iconType]
      const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
      setFields(allFields)
      reCalculateFldHeights(fldKey)
    }
  }

  return (
    <div>
      <SimpleAccordion
        id={`${btnType}-rpt-btn-stng`}
        title={__(btnName)}
        className={css(FieldStyle.fieldSection, FieldStyle.hover_tip)}
        switching={switching}
        tip={tipMessage}
        tipProps={{ width: 250, icnSize: 17 }}
        toggleAction={handleToggleAction}
        toggleChecked={fieldData?.[btnType].show}
        // disable={!fieldData?.[btnType].show}
      >
        <div className={css(FieldStyle.placeholder)}>
          <AutoResizeInput
            id={`${btnType}-rpt-btn-stng`}
            ariaLabel={`${btnName} Repeater Button Text`}
            placeholder="Type Button Text here..."
            value={fieldData?.[btnType].txt}
            changeAction={setButtonText}
          />
        </div>

        <FieldIconSettings
          label="Leading Icon"
          iconSrc={fieldData?.[`${btnType}PreIcn`]}
          styleRoute={`${styleRoute[btnType]}-pre-i`}
          setIcon={() => setIconModel(`${btnType}PreIcn`)}
          removeIcon={() => removeIcon(`${btnType}PreIcn`)}
          isPro
          proProperty="leadingIcon"
        />

        <FieldIconSettings
          label="Trailing Icon"
          iconSrc={fieldData?.[`${btnType}SufIcn`]}
          styleRoute={`${styleRoute[btnType]}-suf-i`}
          setIcon={() => setIconModel(`${btnType}SufIcn`)}
          removeIcon={() => removeIcon(`${btnType}SufIcn`)}
          isPro
          proProperty="trailingIcon"
        />

        {btnType === 'addToEndBtn' && (
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
        )}

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
        <Icons iconType={icnType} setModal={setIcnMdl} />
      </Modal>
    </div>
  )
}

const styleRoute = {
  addBtn: 'rpt-add-btn',
  removeBtn: 'rpt-rmv-btn',
  addToEndBtn: 'add-to-end-btn',
}
