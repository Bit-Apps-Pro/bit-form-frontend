/* eslint-disable no-param-reassign */
import produce from 'immer'
import { useEffect, useState } from 'react'
import { useFela } from 'react-fela'
import { useParams } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { $fields } from '../../../GlobalStates/GlobalStates'
import app from '../../../styles/app.style'
import { addToBuilderHistory, getLatestState } from '../../../Utils/FormBuilderHelper'
import { deepCopy } from '../../../Utils/Helpers'
import { __ } from '../../../Utils/i18nwrap'
import Modal from '../../Utilities/Modal'
import TinyMCE from '../../Utilities/TinyMCE'

export default function DecisionBoxLabelModal({ labelModal, setLabelModal }) {
  const { fieldKey: fldKey } = useParams()
  const { css } = useFela()
  const [fields, setFields] = useRecoilState($fields)
  const fieldData = deepCopy(fields[fldKey])
  const lbl = fieldData.lbl || fieldData?.info?.lbl
  const [value, setValue] = useState(lbl)

  useEffect(() => {
    if (labelModal) setValue(lbl)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [labelModal])

  const setLbl = val => {
    setFields(prevState => produce(prevState, draft => {
      draft[fldKey].lbl = val
    }))
    addToBuilderHistory({ event: 'Modify Decision Box Label', type: 'change_decision_label', state: { fields: getLatestState('fields'), fldKey } })
  }

  const cancelModal = () => {
    fieldData.lbl = value
    setFields(allFields => produce(allFields, draft => { draft[fldKey] = fieldData }))
    addToBuilderHistory({ event: 'Cancel Decision Box Label Editing', type: 'cancel_decision_label_edit', state: { fields: getLatestState('fields'), fldKey } })
    setLabelModal(false)
  }

  return (
    <Modal
      md
      show={labelModal}
      setModal={cancelModal}
      title={__('Edit Decision Box Label')}
    >
      <TinyMCE
        id={fldKey}
        value={lbl}
        onChangeHandler={setLbl}
      />
      <div className="mt-2 f-right">
        <button type="button" className={`${css(app.btn)} mr-2`} onClick={cancelModal}>Cancel</button>
        <button type="button" className={`${css(app.btn)} blue`} onClick={() => setLabelModal(false)}>Save</button>
      </div>
    </Modal>
  )
}
