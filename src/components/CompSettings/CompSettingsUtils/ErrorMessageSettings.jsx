import { useState } from 'react'
import EditIcn from '../../../Icons/EditIcn'
import { __ } from '../../../Utils/i18nwrap'
import CheckBoxMini from '../../Utilities/CheckBoxMini'
import Cooltip from '../../Utilities/Cooltip'
import SingleToggle from '../../Utilities/SingleToggle'
import CustomErrorMessageModal from './CustomErrorMessageModal'

export default function ErrorMessageSettings({ elmId, fieldData, type, title, tipTitle, updateAction }) {
  const [errorModal, setErrorModal] = useState(false)
  const errMsg = fieldData?.err?.[type]?.custom ? fieldData?.err?.[type]?.msg : fieldData?.err?.[type]?.dflt

  const setCustomErrMsg = e => {
    const { name, checked } = e.target
    const tmpErr = { ...fieldData }
    if (!tmpErr.err) tmpErr.err = {}
    if (!tmpErr.err[name]) tmpErr.err[name] = {}
    if (checked) {
      tmpErr.err[name].custom = true
      if (!tmpErr.err[name].msg) tmpErr.err[name].msg = tmpErr.err[name].dflt
    } else {
      delete tmpErr.err[name].custom
    }
    updateAction()
  }

  const setShowErrMsg = e => {
    const { name, checked } = e.target
    const tmpErr = { ...fieldData }
    if (!tmpErr.err) tmpErr.err = {}
    if (!tmpErr.err[name]) tmpErr.err[name] = {}
    if (checked) {
      tmpErr.err[name].show = true
    } else {
      delete tmpErr.err[name].show
    }
    updateAction()
  }

  const openErrorModal = () => {
    const tmpErr = { ...fieldData }
    if (!tmpErr.err) tmpErr.err = {}
    if (!tmpErr.err[type]) tmpErr.err[type] = {}
    tmpErr.err[type].custom = true
    if (!tmpErr.err[type].msg) tmpErr.err[type].msg = tmpErr.err[type].dflt
    updateAction()
    setErrorModal(true)
  }

  return (
    <div className="err-msg-wrapper">
      <div className="flx flx-between ">
        <h4 className="mt-2 mb-2 flx">
          {__(title, 'bitform')}
          <Cooltip width={250} icnSize={17} className="ml-2">
            <div className="txt-body">{__(tipTitle, 'bitform')}</div>
          </Cooltip>
        </h4>
        <SingleToggle name={type} action={setShowErrMsg} isChecked={fieldData?.err?.[type]?.show} />
      </div>
      <div className="flx flx-between mt-1 mb-1 mr-2">
        <div className="flx">
          <CheckBoxMini className=" mr-2" name={type} checked={fieldData?.err?.[type]?.custom || false} title={__('Custom Error Message', 'bitform')} onChange={setCustomErrMsg} />
          <Cooltip width={250} icnSize={17} className="mr-2">
            <div className="txt-body">
              Check the box to enable the custom error message.
              <br />
              Note: You can edit the message by clicking on edit icon.
            </div>
          </Cooltip>
        </div>
        <span
          role="button"
          tabIndex="-1"
          className="cp"
          onClick={openErrorModal}
          onKeyPress={openErrorModal}
        >
          <EditIcn size={19} />
        </span>
      </div>
      <div
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: errMsg }}
        className="err-msg-box mt-2"
      />

      <CustomErrorMessageModal
        errorModal={errorModal}
        setErrorModal={setErrorModal}
        type={type}
        elmId={elmId}
        fieldData={fieldData}
        updateAction={updateAction}
      />
    </div>
  )
}
