import { create } from 'mutative'
import { useEffect, useState } from 'react'
import { useFela } from 'react-fela'
import { useParams } from 'react-router-dom'
import { useAtom } from 'jotai'
import { $fields } from '../../../GlobalStates/GlobalStates'
import app from '../../../styles/app.style'
import { deepCopy } from '../../../Utils/Helpers'
import { __ } from '../../../Utils/i18nwrap'
import Modal from '../../Utilities/Modal'
import TinyMCE from '../../Utilities/TinyMCE'

export default function CustomErrorMessageModal({ errorModal, setErrorModal, type }) {
  const { fieldKey: fldKey } = useParams()
  const [fields, setFields] = useAtom($fields)
  const { css } = useFela()
  const fld = fields[fldKey]
  const fieldData = deepCopy(fld)
  const errMsg = fieldData?.err?.[type]?.custom ? fieldData?.err?.[type]?.msg : fieldData?.err?.[type]?.dflt
  const [value, setValue] = useState(errMsg)

  useEffect(() => {
    if (errorModal) setValue(errMsg)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorModal])

  const setErrMsg = (name, val) => {
    setFields(prevState => create(prevState, draft => {
      if (!draft[fldKey].err) draft[fldKey].err = {}
      if (!draft[fldKey].err[name]) draft[fldKey].err[name] = {}
      draft[fldKey].err[name].msg = val
    }))
    // addToBuilderHistory(setBuilderHistory, { event: 'Field required custom error message updated', type: 'change_custom_error_message', state: { fields: allFields, fldKey } }, setUpdateBtn)
  }

  const cancelModal = () => {
    fieldData.err[type].msg = value
    setTimeout(() => {
      // eslint-disable-next-line no-param-reassign
      setFields(allFields => create(allFields, draft => { draft[fldKey] = fieldData }))
      setErrorModal(false)
    })
  }

  return (
    <Modal
      md
      show={errorModal}
      setModal={cancelModal}
      title={__('Edit Custom Error Message')}
    >
      <TinyMCE
        id={`${fldKey}-${type}`}
        menubar={false}
        value={errMsg}
        onChangeHandler={val => setErrMsg(type, val)}
      />
      <div className="mt-2 f-right">
        <button type="button" className={`${css(app.btn)} mr-2`} onClick={cancelModal}>Cancel</button>
        <button type="button" className={`${css(app.btn)} blue`} onClick={() => setErrorModal(false)}>Save</button>
      </div>
    </Modal>
  )
}
