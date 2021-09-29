import { useState } from 'react'
import { useFela } from 'react-fela'
import { useRecoilState, useRecoilValue } from 'recoil'
import { $bits, $fields, $selectedFieldId } from '../../../GlobalStates'
import EditIcn from '../../../Icons/EditIcn'
import ut from '../../../styles/2.utilities'
import { deepCopy } from '../../../Utils/Helpers'
import { __ } from '../../../Utils/i18nwrap'
import CheckBoxMini from '../../Utilities/CheckBoxMini'
import Cooltip from '../../Utilities/Cooltip'
import SimpleAccordion from '../StyleCustomize/ChildComp/SimpleAccordion'
import CustomErrorMessageModal from './CustomErrorMessageModal'
import ErrorMessages from '../../../styles/ErrorMessages.style'

export default function UniqField({ type, title, tipTitle, isUnique, className }) {
  const bits = useRecoilValue($bits)
  const { css } = useFela()
  const [errorModal, setErrorModal] = useState(false)
  const fldKey = useRecoilValue($selectedFieldId)
  const [fields, setFields] = useRecoilState($fields)
  const fieldData = deepCopy(fields[fldKey])
  const errMsg = fieldData?.err?.[type]?.custom ? fieldData?.err?.[type]?.msg : fieldData?.err?.[type]?.dflt
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
    setFields(allFields => ({ ...allFields, ...{ [fldKey]: fieldData } }))
  }

  const setShowErrMsg = e => {
    const { name, checked } = e.target

    if (!fieldData.err) fieldData.err = {}
    if (!fieldData.err[type]) fieldData.err[type] = {}
    if (checked) {
      fieldData.err[type][name] = true
      const msg = 'That field is taken. Try another'
      if (!fieldData.err[type].dflt) fieldData.err[type].dflt = msg
    } else {
      delete fieldData.err[type][name]
    }
    setFields(allFields => ({ ...allFields, ...{ [fldKey]: fieldData } }))
  }

  const openErrorModal = () => {
    if (!bits.isPro) return
    if (!fieldData.err) fieldData.err = {}
    if (!fieldData.err[type]) fieldData.err[type] = {}
    fieldData.err[type].custom = true
    if (!fieldData.err[type].msg) fieldData.err[type].msg = fieldData.err[type].dflt
    setTimeout(() => {
      setFields(allFields => ({ ...allFields, ...{ [fldKey]: fieldData } }))
      setErrorModal(true)
    })
  }

  return (
    <SimpleAccordion
      title={title}
      className={className}
      tip={tipTitle}
      toggleName={isUnique}
      toggleAction={setShowErrMsg}
      toggleChecked={fieldData?.err?.[type]?.[isUnique]}
      switching
      tipProps={{ width: 200, icnSize: 17 }}
      open
    >
      <>
        {/* <div className="err-msg-wrapper">
          <div className="flx flx-between ">
            <h4 className="mt-2 mb-2 flx">
              {__(title, 'bitform')}
              <Cooltip width={250} icnSize={17} className="ml-2">
                <div className="txt-body">{__(tipTitle, 'bitform')}</div>
              </Cooltip>
            </h4>
            <SingleToggle name={isUnique} action={setShowErrMsg} isChecked={fieldData?.err?.[type]?.[isUnique]} />
          </div> */}
        {fieldData?.err?.[type]?.[isUnique] && (
          <>
            <div className={`${css(ErrorMessages.flxBetween)} ${css(ErrorMessages.checked)}`}>
              <div className={css(ErrorMessages.flx)}>
                <CheckBoxMini className={`${css(ut.mr2)} ${css(ut.fw500)} `} name={type} disabled={!bits.isPro} checked={fieldData?.err?.[type]?.custom || false} title={__('Custom Error Message', 'bitform')} onChange={setCustomErrMsg} />
                <Cooltip width={250} icnSize={17} className={`${css(ut.mr2)} hover-tip`}>
                  <div className={css(ErrorMessages.tipBody)}>
                    Check the box to enable the custom error message.
                    <br />
                    Note: You can edit the message by clicking on edit icon.
                  </div>
                </Cooltip>
                {!bits.isPro && <span className="pro-badge ml-2">{__('Pro', 'bitform')}</span>}
              </div>
              <span
                role="button"
                tabIndex="-1"
                className={css(ErrorMessages.btn)}
                onClick={openErrorModal}
                onKeyPress={openErrorModal}
              >
                <EditIcn size={19} />
              </span>

            </div>
            {!$bits.isPro && (
              <div
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: errMsg }}
                className={`${css(ErrorMessages.errMsgBox)} ${css(ut.mt2)}`}
              />
            )}
          </>
        )}

        <CustomErrorMessageModal
          errorModal={errorModal}
          setErrorModal={setErrorModal}
          type={type}
        />
        {/* </div> */}
      </>

    </SimpleAccordion>
  )
}
