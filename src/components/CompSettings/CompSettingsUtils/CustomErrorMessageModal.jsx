import { useState } from 'react'
import { __ } from '../../../Utils/i18nwrap'
import Modal from '../../Utilities/Modal'
import TinyMCE from '../../Utilities/TinyMCE'

export default function CustomErrorMessageModal({ errorModal, setErrorModal, type, elmId, elmData, updateAction }) {
  const errMsg = elmData?.err?.[type]?.custom ? elmData?.err?.[type]?.msg : elmData?.err?.[type]?.dflt
  const [value] = useState(errMsg)

  const setErrMsg = (name, val) => {
    const tmpErr = { ...elmData }
    if (!tmpErr.err) tmpErr.err = {}
    if (!tmpErr.err[name]) tmpErr.err[name] = {}
    tmpErr.err[name].msg = val
    updateAction()
  }

  const cancelModal = () => {
    const tmpErr = { ...elmData }
    tmpErr.err[type].msg = value
    updateAction()
    setErrorModal(false)
  }

  return (
    <Modal
      md
      show={errorModal}
      setModal={cancelModal}
      title={__('Edit Custom Error Message', 'bitform')}
    >
      <TinyMCE
        id={`${elmId}-${type}`}
        menubar={false}
        value={errMsg}
        onChangeHandler={val => setErrMsg(type, val)}
      />
      <div className="mt-2 f-right">
        <button type="button" className="btn mr-2" onClick={cancelModal}>cancel</button>
        <button type="button" className="btn blue" onClick={() => setErrorModal(false)}>save</button>
      </div>
    </Modal>
  )
}
