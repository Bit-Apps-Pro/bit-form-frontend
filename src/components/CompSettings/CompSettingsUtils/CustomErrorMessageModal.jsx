import produce from 'immer'
import { useEffect, useState } from 'react'
import { useFela } from 'react-fela'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { $builderHistory, $fields, $selectedFieldId, $updateBtn } from '../../../GlobalStates'
import app from '../../../styles/app.style'
import { addToBuilderHistory } from '../../../Utils/FormBuilderHelper'
import { deepCopy } from '../../../Utils/Helpers'
import { __ } from '../../../Utils/i18nwrap'
import Modal from '../../Utilities/Modal'
import TinyMCE from '../../Utilities/TinyMCE'

export default function CustomErrorMessageModal({ errorModal, setErrorModal, type }) {
  const fldKey = useRecoilValue($selectedFieldId)
  const [fields, setFields] = useRecoilState($fields)
  const { css } = useFela()
  const fld = fields[fldKey]
  const fieldData = deepCopy(fld)
  const errMsg = fieldData?.err?.[type]?.custom ? fieldData?.err?.[type]?.msg : fieldData?.err?.[type]?.dflt
  const [value, setValue] = useState(errMsg)
  const setBuilderHistory = useSetRecoilState($builderHistory)
  const setUpdateBtn = useSetRecoilState($updateBtn)

  useEffect(() => {
    if (errorModal) setValue(errMsg)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorModal])

  const setErrMsg = (name, val) => {
    const fdata = deepCopy(fieldData)
    if (!fdata.err) fdata.err = {}
    if (!fdata.err[name]) fdata.err[name] = {}
    fdata.err[name].msg = val
    // setFields(allFields => ({ ...allFields, ...{ [fldKey]: fdata } }))
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory(setBuilderHistory, { event: 'Field required custom error message updated', type: 'change_custom_error_message', state: { fields: allFields, fldKey } }, setUpdateBtn)
  }

  const cancelModal = () => {
    fieldData.err[type].msg = value
    setTimeout(() => {
      // eslint-disable-next-line no-param-reassign
      setFields(allFields => produce(allFields, draft => { draft[fldKey] = fieldData }))
      setErrorModal(false)
    })
  }

  return (
    <Modal
      md
      show={errorModal}
      setModal={cancelModal}
      title={__('Edit Custom Error Message', 'bitform')}
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
