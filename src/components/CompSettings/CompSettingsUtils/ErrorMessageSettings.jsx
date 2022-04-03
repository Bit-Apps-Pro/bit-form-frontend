/* eslint-disable no-param-reassign */
/* eslint-disable react/button-has-type */
import produce from 'immer'
import { useState } from 'react'
import { useFela } from 'react-fela'
import { useParams } from 'react-router-dom'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { $builderHistory, $fields, $selectedFieldId, $updateBtn } from '../../../GlobalStates/GlobalStates'
import { $styles } from '../../../GlobalStates/StylesState'
import EditIcn from '../../../Icons/EditIcn'
import ut from '../../../styles/2.utilities'
import ErrorMessages from '../../../styles/ErrorMessages.style'
import { addToBuilderHistory } from '../../../Utils/FormBuilderHelper'
import { deepCopy } from '../../../Utils/Helpers'
import { __ } from '../../../Utils/i18nwrap'
import { addDefaultStyleClasses, getStrFromStr, unitConverter } from '../../style-new/styleHelpers'
import CheckBoxMini from '../../Utilities/CheckBoxMini'
import Cooltip from '../../Utilities/Cooltip'
import Modal from '../../Utilities/Modal'
import Icons from '../Icons'
import FieldIconSettings from '../StyleCustomize/ChildComp/FieldIconSettings'
import CustomErrorMessageModal from './CustomErrorMessageModal'

export default function ErrorMessageSettings({ type, title, tipTitle, defaultMsg }) {
  const [errorModal, setErrorModal] = useState(false)
  const { fieldKey: fldKey } = useParams()
  const [fields, setFields] = useRecoilState($fields)
  const { css } = useFela()
  const fieldData = deepCopy(fields[fldKey])
  const errMsg = fieldData?.err?.[type]?.custom ? fieldData?.err?.[type]?.msg : fieldData?.err?.[type]?.dflt
  const setUpdateBtn = useSetRecoilState($updateBtn)
  const setBuilderHistory = useSetRecoilState($builderHistory)
  const [styles, setStyles] = useRecoilState($styles)
  const [icnType, setIcnType] = useState('')
  const [icnMdl, setIcnMdl] = useState(false)
  const selectedFieldId = useRecoilValue($selectedFieldId)

  const errPreIcnCls = `.${selectedFieldId}-err-txt-pre-i`
  const errSufIcnCls = `.${selectedFieldId}-err-txt-suf-i`

  const { width: errPreIcnWidth, height: errPreIcnHeight } = styles?.fields[fldKey]?.classes[errPreIcnCls] || {}
  const { width: errSufIcnWidth, height: errSufIcnHeight } = styles?.fields[fldKey]?.classes[errSufIcnCls] || {}

  const setCustomErrMsg = e => {
    const { name, checked } = e.target
    if (!fieldData.err) fieldData.err = {}
    if (!fieldData.err[name]) fieldData.err[name] = {}
    if (checked) {
      fieldData.err[name].custom = true
      if (!fieldData.err[name].msg) fieldData.err[name].msg = fieldData.err[name].dflt
    } else {
      delete fieldData.err[name].custom
    }
    // eslint-disable-next-line no-param-reassign
    // setFields(allFields => produce(allFields, draft => { draft[fldKey] = fieldData }))
    const req = checked ? 'on' : 'off'
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory(setBuilderHistory, { event: `Field required custom error message ${req}`, type: `custom_error_message_${req}`, state: { fields: allFields, fldKey } }, setUpdateBtn)
  }

  const setShowErrMsg = e => {
    const { name, checked } = e.target
    if (!fieldData.err) fieldData.err = {}
    if (!fieldData.err[name]) fieldData.err[name] = {}
    if (checked) {
      fieldData.err[name].show = true
      if (!fieldData.err[name].dflt) fieldData.err[name].dflt = defaultMsg
    } else {
      delete fieldData.err[name].show
    }
    // eslint-disable-next-line no-param-reassign
    // setFields(allFields => produce(allFields, draft => { draft[fldKey] = fieldData }))
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory(setBuilderHistory, { event: 'Field required custom error message updated', type: 'change_custom_error_message', state: { fields: allFields, fldKey } }, setUpdateBtn)
  }

  const openErrorModal = () => {
    if (!fieldData.err) fieldData.err = {}
    if (!fieldData.err[type]) fieldData.err[type] = {}
    fieldData.err[type].custom = true
    if (!fieldData.err[type].msg) fieldData.err[type].msg = fieldData.err[type].dflt
    setTimeout(() => {
      // eslint-disable-next-line no-param-reassign
      setFields(allFields => produce(allFields, draft => { draft[fldKey] = fieldData }))
      setErrorModal(true)
    })
  }

  const icnWidthHandle = ({ unit, value }, cls, width) => {
    const convertvalue = unitConverter(unit, value, getStrFromStr(width || 'px'))
    setStyles(prvStyle => produce(prvStyle, drftStyle => {
      drftStyle.fields[fldKey].classes[cls].width = `${convertvalue}${unit || 'px'}`
    }))
  }

  const setIconModel = (typ) => {
    console.log(selectedFieldId)
    addDefaultStyleClasses(selectedFieldId, typ, setStyles)
    setIcnType(typ)
    setIcnMdl(true)
  }

  const removeIcon = (iconType) => {
    if (fieldData[iconType]) {
      delete fieldData[iconType]
      const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
      setFields(allFields)
    }
  }
  const icnHeightHandle = ({ unit, value }, cls, height) => {
    const convertvalue = unitConverter(unit, value, getStrFromStr(height || 'px'))
    setStyles(prvStyle => produce(prvStyle, drftStyle => {
      drftStyle.fields[fldKey].classes[cls].height = `${convertvalue}${unit || 'px'}`
    }))
  }

  return (
    <div className={`${css(ErrorMessages.wrapper)} err-msg-wrapper`}>
      <div className={`${css(ErrorMessages.flxBetween)} ${css(ErrorMessages.checked)}`}>
        {/* flx flx-between mt-1 mb-1 mr-2 */}
        <div className={`${css(ErrorMessages.flx)}`}>
          <CheckBoxMini className={`${css(ut.mr2)} ${css(ut.fw500)} `} name={type} checked={fieldData?.err?.[type]?.show || false} title={__('Show Error Message', 'bitform')} onChange={setShowErrMsg} />
          <Cooltip width={250} icnSize={17} className={`${css(ut.mr2)} hovertip`}>
            <div className={css(ErrorMessages.tipBody)}>
              Check the box to enable the custom error message.
              <br />
              Note: You can edit the message by clicking on edit icon.
            </div>
          </Cooltip>
        </div>
      </div>
      {fieldData?.err?.[type]?.show && (
        <>
          {/* <div className="flx flx-between mt-1 mb-1 mr-2"> */}
          <div className={`${css(ErrorMessages.flxBetween)} ${css(ErrorMessages.checked)}`}>
            <div className={css(ErrorMessages.flx)}>
              <CheckBoxMini className={`${css(ut.mr2)} ${css(ut.fw500)} `} name={type} checked={fieldData?.err?.[type]?.custom || false} title={__('Custom Error Message', 'bitform')} onChange={setCustomErrMsg} />
              <Cooltip width={250} icnSize={17} className={`${css(ut.mr2)} hovertip`}>
                <div className={css(ErrorMessages.tipBody)}>
                  Check the box to enable the custom error message.
                  <br />
                  Note: You can edit the message by clicking on edit icon.
                </div>
              </Cooltip>
            </div>
            <button
              tabIndex="-1"
              className={css(ErrorMessages.btn)}
              onClick={openErrorModal}
              onKeyPress={openErrorModal}
            >
              <EditIcn size={19} />
            </button>
          </div>
          <div
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: errMsg }}
            className={`${css(ErrorMessages.errMsgBox)} ${css(ut.mt2)}`}
          />

          <div className={css(ut.mt2, { mx: 10 })}>
            <FieldIconSettings
              label="Prefix Icon"
              iconSrc={fieldData?.errPreIcn}
              styleRoute="err-txt-pre-i"
              setIcon={() => setIconModel('errPreIcn')}
              removeIcon={() => removeIcon('errPreIcn')}
            />

            <FieldIconSettings
              label="Suffix Icon"
              iconSrc={fieldData?.errSufIcn}
              styleRoute="err-txt-suf-i"
              setIcon={() => setIconModel('errSufIcn')}
              removeIcon={() => removeIcon('errSufIcn')}
            />
          </div>

          <CustomErrorMessageModal
            errorModal={errorModal}
            setErrorModal={setErrorModal}
            type={type}
          />

          <Modal
            md
            autoHeight
            show={icnMdl}
            setModal={setIcnMdl}
            className="o-v"
            title={__('Icons', 'bitform')}
          >
            <div className="pos-rel" />
            <Icons iconType={icnType} setModal={setIcnMdl} />
          </Modal>
        </>
      )}
    </div>
  )
}
