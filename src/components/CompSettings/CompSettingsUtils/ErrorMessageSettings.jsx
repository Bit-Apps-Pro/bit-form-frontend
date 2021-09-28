/* eslint-disable react/button-has-type */
import produce from 'immer'
import { useState } from 'react'
import { useFela } from 'react-fela'
import { useRecoilState, useRecoilValue } from 'recoil'
import { $fields, $selectedFieldId } from '../../../GlobalStates'
import EditIcn from '../../../Icons/EditIcn'
import ut from '../../../styles/2.utilities'
import { deepCopy } from '../../../Utils/Helpers'
import { __ } from '../../../Utils/i18nwrap'
import CheckBoxMini from '../../Utilities/CheckBoxMini'
import Cooltip from '../../Utilities/Cooltip'
import CustomErrorMessageModal from './CustomErrorMessageModal'
import ErrorMessages from '../../../styles/ErrorMessages.style'

export default function ErrorMessageSettings({ type, title, tipTitle }) {
  const [errorModal, setErrorModal] = useState(false)
  const fldKey = useRecoilValue($selectedFieldId)
  const [fields, setFields] = useRecoilState($fields)
  const { css } = useFela()
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
    // eslint-disable-next-line no-param-reassign
    setFields(allFields => produce(allFields, draft => { draft[fldKey] = fieldData }))
  }

  const setShowErrMsg = e => {
    const { name, checked } = e.target
    if (!fieldData.err) fieldData.err = {}
    if (!fieldData.err[name]) fieldData.err[name] = {}
    if (checked) {
      fieldData.err[name].show = true
    } else {
      delete fieldData.err[name].show
    }
    // eslint-disable-next-line no-param-reassign
    setFields(allFields => produce(allFields, draft => { draft[fldKey] = fieldData }))
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

  return (
    <div className={`${css(ErrorMessages.wrapper)} err-msg-wrapper`}>
      {/* <div className="flx flx-between ">
        <h4 className="mt-2 mb-2 flx">
          {__(title, 'bitform')}
          <Cooltip width={250} icnSize={17} className="ml-2">
            <div className="txt-body">{__(tipTitle, 'bitform')}</div>
          </Cooltip>
        </h4>
        <SingleToggle name={type} action={setShowErrMsg} isChecked={fieldData?.err?.[type]?.show} />
      </div> */}
      <div className={css(ErrorMessages.flxBetween)}>
        {/* flx flx-between mt-1 mb-1 mr-2 */}
        <div className={css(ErrorMessages.flx)}>
          <CheckBoxMini className={`${css(ut.mr2)} ${css(ut.fw500)}`} name={type} checked={fieldData?.err?.[type]?.show || false} title={__('Show Error Message', 'bitform')} onChange={setShowErrMsg} />
          <Cooltip width={250} icnSize={17} className={css(ut.mr2)}>
            <div className={css(ErrorMessages.tipBody)}>
              Check the box to enable the custom error message.
              <br />
              Note: You can edit the message by clicking on edit icon.
            </div>
          </Cooltip>
        </div>
        {/* <span
          role="button"
          tabIndex="-1"
          className="cp"
          onClick={openErrorModal}
          onKeyPress={openErrorModal}
        >
          <EditIcn size={19} />
        </span> */}
      </div>
      {fieldData?.err?.[type]?.show && (
        <>
          {/* <div className="flx flx-between mt-1 mb-1 mr-2"> */}
          <div className={css(ErrorMessages.flxBetween)}>
            <div className={css(ErrorMessages.flx)}>
              <CheckBoxMini className={`${css(ut.mr2)} ${css(ut.fw500)}`} name={type} checked={fieldData?.err?.[type]?.custom || false} title={__('Custom Error Message', 'bitform')} onChange={setCustomErrMsg} />
              <Cooltip width={250} icnSize={17} className={css(ut.mr2)}>
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
        </>
      )}

      <CustomErrorMessageModal
        errorModal={errorModal}
        setErrorModal={setErrorModal}
        type={type}
      />
    </div>
  )
}
