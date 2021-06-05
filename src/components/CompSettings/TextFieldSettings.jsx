/* eslint-disable jsx-a11y/label-has-associated-control */
import { memo } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { __ } from '../../Utils/i18nwrap'
import SingleInput from '../Utilities/SingleInput'
import SingleToggle from '../Utilities/SingleToggle'
import CopyText from '../Utilities/CopyText'
import Back2FldList from './Back2FldList'
import { deepCopy } from '../../Utils/Helpers'
import { $fields, $selectedFieldId } from '../../GlobalStates'

function TextFieldSettings(props) {
  console.log('%c $render TextFieldSettings', 'background:gray;padding:3px;border-radius:5px;color:white')
  const elmId = useRecoilValue($selectedFieldId)
  const [fields, setFields] = useRecoilState($fields)
  const fieldData = deepCopy(fields[elmId])
  const isRequired = fieldData.valid.req || false
  const isAutoComplete = fieldData.ac === 'on'
  const label = fieldData.lbl || ''
  const adminLabel = fieldData.adminLbl || ''
  const placeholder = fieldData.ph || ''
  const min = fieldData.mn || ''
  const max = fieldData.mx || ''
  const fldKey = elmId

  function setRequired(e) {
    if (e.target.checked) {
      fieldData.valid.req = true
    } else {
      delete fieldData.valid.req
    }
    setFields(allFields => ({ ...allFields, ...{ [elmId]: fieldData } }))
  }

  function setAutoComplete(e) {
    if (e.target.checked) {
      fieldData.ac = 'on'
    } else {
      delete fieldData.ac
    }
    setFields(allFields => ({ ...allFields, ...{ [elmId]: fieldData } }))
  }

  function setLabel(e) {
    if (e.target.value === '') {
      delete fieldData.lbl
    } else {
      fieldData.lbl = e.target.value
    }
    setFields(allFields => ({ ...allFields, ...{ [elmId]: fieldData } }))
  }

  function setAdminLabel(e) {
    if (e.target.value === '') {
      delete fieldData.adminLbl
    } else {
      fieldData.adminLbl = e.target.value
    }
    setFields(allFields => ({ ...allFields, ...{ [elmId]: fieldData } }))
  }

  function setPlaceholder(e) {
    if (e.target.value === '') {
      delete fieldData.ph
    } else {
      fieldData.ph = e.target.value
    }
    setFields(allFields => ({ ...allFields, ...{ [elmId]: fieldData } }))
  }

  function setMin(e) {
    if (e.target.value === '') {
      delete fieldData.mn
    } else {
      fieldData.mn = e.target.value
    }
    setFields(allFields => ({ ...allFields, ...{ [elmId]: fieldData } }))
  }

  function setMax(e) {
    if (e.target.value === '') {
      delete fieldData.mx
    } else {
      fieldData.mx = e.target.value
    }
    setFields(allFields => ({ ...allFields, ...{ [elmId]: fieldData } }))
  }

  return (
    <div className="mr-4 ml-2">
      <Back2FldList setElementSetting={props.setElementSetting} />
      <div className="mb-2">
        <span className="font-w-m">Field Type :</span>
        {' '}
        {fieldData.typ.charAt(0).toUpperCase() + fieldData.typ.slice(1)}
      </div>
      <span className="font-w-m">{__('Field Key', 'bitform')}</span>
      <CopyText value={fldKey} setSnackbar={() => { }} className="field-key-cpy" />
      <SingleInput inpType="text" title={__('Admin Label:', 'bitform')} value={adminLabel} action={setAdminLabel} />
      <SingleToggle title={__('Required:', 'bitform')} action={setRequired} isChecked={isRequired} className="mt-3" />
      {fieldData.typ !== 'textarea'
        && fieldData.typ.match(/^(text|url|password|number|email|)$/)
        && <SingleToggle title={__('Auto Fill:', 'bitform')} action={setAutoComplete} isChecked={isAutoComplete} className="mt-3" />}
      <SingleInput inpType="text" title={__('Field Label:', 'bitform')} value={label} action={setLabel} />
      {fieldData.typ.match(/^(text|url|textarea|password|number|email|)$/) && <SingleInput inpType="text" title={__('Placeholder:', 'bitform')} value={placeholder} action={setPlaceholder} />}
      {fieldData.typ === 'number' && <SingleInput inpType="number" title={__('Min:', 'bitform')} value={min} action={setMin} width={100} className="mr-4" />}
      {fieldData.typ === 'number' && <SingleInput inpType="number" title={__('Max:', 'bitform')} value={max} action={setMax} width={100} />}
    </div>
  )
}

export default memo(TextFieldSettings)
