/* eslint-disable no-param-reassign */
import produce from 'immer'
import { useState } from 'react'
import { useFela } from 'react-fela'
import { useParams } from 'react-router-dom'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { $bits, $builderHistory, $fields, $updateBtn } from '../../../GlobalStates/GlobalStates'
import EditIcn from '../../../Icons/EditIcn'
import ut from '../../../styles/2.utilities'
import ErrorMessages from '../../../styles/ErrorMessages.style'
import { addToBuilderHistory } from '../../../Utils/FormBuilderHelper'
import { deepCopy } from '../../../Utils/Helpers'
import { __ } from '../../../Utils/i18nwrap'
import CheckBoxMini from '../../Utilities/CheckBoxMini'
import Cooltip from '../../Utilities/Cooltip'
import SimpleAccordion from '../StyleCustomize/ChildComp/SimpleAccordion'
import CustomErrorMessageModal from './CustomErrorMessageModal'
import ErrorMessageSettings from './ErrorMessageSettings'

export default function UniqFieldSettings({ type, title, tipTitle, isUnique, className }) {
  const bits = useRecoilValue($bits)
  const { css } = useFela()
  const [errorModal, setErrorModal] = useState(false)
  const { fieldKey: fldKey } = useParams()
  const [fields, setFields] = useRecoilState($fields)
  const fieldData = deepCopy(fields[fldKey])
  const errMsg = fieldData?.err?.[type]?.custom ? fieldData?.err?.[type]?.msg : fieldData?.err?.[type]?.dflt
  const setBuilderHistory = useSetRecoilState($builderHistory)
  const setUpdateBtn = useSetRecoilState($updateBtn)

  const setCustomErrMsg = e => {
    const { name, checked } = e.target
    // console.log('name', name)
    if (!fieldData.err) fieldData.err = {}
    if (!fieldData.err[name]) fieldData.err[name] = {}
    if (checked) {
      fieldData.err[name].custom = true
      if (!fieldData.err[name].msg) fieldData.err[name].msg = fieldData.err[name].dflt
    } else {
      delete fieldData.err[name].custom
    }
    // setFields(allFields => ({ ...allFields, ...{ [fldKey]: fieldData } }))
    const req = checked ? 'on' : 'off'
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory(setBuilderHistory, { event: `Validate as Entry Unique ${req}`, type: `validate_entry_unique_${req}`, state: { fields: allFields, fldKey } }, setUpdateBtn)
  }

  const setShowErrMsg = e => {
    const { checked } = e.target
    // console.log('name', name)
    if (!fieldData.err) fieldData.err = {}
    if (!fieldData.err[type]) fieldData.err[type] = {}
    if (checked) {
      fieldData.err[type].show = true
      const msg = 'That field is taken. Try another'
      if (!fieldData.err[type].dflt) fieldData.err[type].dflt = msg
    } else {
      delete fieldData.err[type].show
    }
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory(setBuilderHistory, { event: 'Field required custom error message updated', type: 'change_custom_error_message', state: { fields: allFields, fldKey } }, setUpdateBtn)
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
  // console.log('Unic', fieldData.err, fieldData.err[type][isUnique], type, isUnique)

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
      open={fieldData?.err?.[type]?.[isUnique]}
      disable={!fieldData?.err?.[type]?.[isUnique]}
    >
      <ErrorMessageSettings
        type={type}
        title={title}
        tipTitle={tipTitle}
      />
    </SimpleAccordion>
  )
}
