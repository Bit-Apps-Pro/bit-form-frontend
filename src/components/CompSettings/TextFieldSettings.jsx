/* eslint-disable jsx-a11y/label-has-associated-control */
import { memo } from 'react'
import { useRecoilValue } from 'recoil'
import { __ } from '../../Utils/i18nwrap'
import SingleInput from '../Utilities/SingleInput'
import SingleToggle from '../Utilities/SingleToggle'
import CopyText from '../Utilities/CopyText'
import Back2FldList from './Back2FldList'
import { deepCopy } from '../../Utils/Helpers'
import { $fields } from '../../GlobalStates'

function TextFieldSettings(props) {
  const elmId = props.elm.id
  const fields = useRecoilValue($fields)
  const elmData = deepCopy(fields[elmId])
  console.log('%c $render TextFieldSettings', 'background:gray;padding:3px;border-radius:5px;color:white')
  const isRequired = elmData.valid.req !== undefined
  const isAutoComplete = elmData.ac === 'on'
  const label = elmData.lbl === undefined ? '' : elmData.lbl
  const adminLabel = elmData.adminLbl === undefined ? '' : elmData.adminLbl
  const placeholder = elmData.ph === undefined ? '' : elmData.ph
  const min = elmData.mn === undefined ? '' : elmData.mn
  const max = elmData.mx === undefined ? '' : elmData.mx
  const fldKey = elmId

  function setRequired(e) {
    if (e.target.checked) {
      const tmp = { ...elmData.valid }
      tmp.req = true
      elmData.valid = tmp
    } else {
      delete elmData.valid.req
    }
    props.updateData({ id: elmId, data: elmData })
  }

  function setAutoComplete(e) {
    if (e.target.checked) {
      elmData.ac = 'on'
    } else {
      delete elmData.ac
    }
    props.updateData({ id: elmId, data: elmData })
  }

  function setLabel(e) {
    if (e.target.value === '') {
      delete elmData.lbl
    } else {
      elmData.lbl = e.target.value
    }
    props.updateData({ id: elmId, data: elmData })
  }

  function setAdminLabel(e) {
    if (e.target.value === '') {
      delete elmData.adminLbl
    } else {
      elmData.adminLbl = e.target.value
    }
    props.updateData({ id: elmId, data: elmData })
  }

  function setPlaceholder(e) {
    if (e.target.value === '') {
      delete elmData.ph
    } else {
      elmData.ph = e.target.value
    }
    props.updateData({ id: elmId, data: elmData })
  }

  function setMin(e) {
    if (e.target.value === '') {
      delete elmData.mn
    } else {
      elmData.mn = e.target.value
    }
    props.updateData({ id: elmId, data: elmData })
  }

  function setMax(e) {
    if (e.target.value === '') {
      delete elmData.mx
    } else {
      elmData.mx = e.target.value
    }
    props.updateData({ id: elmId, data: elmData })
  }

  return (
    <div className="mr-4 ml-2">
      <Back2FldList setElementSetting={props.setElementSetting} />
      <div className="mb-2">
        <span className="font-w-m">Field Type :</span>
        {' '}
        {elmData.typ.charAt(0).toUpperCase() + elmData.typ.slice(1)}
      </div>
      <span className="font-w-m">{__('Field Key', 'bitform')}</span>
      <CopyText value={fldKey} setSnackbar={() => { }} className="field-key-cpy" />
      <SingleInput inpType="text" title={__('Admin Label:', 'bitform')} value={adminLabel} action={setAdminLabel} />
      <SingleToggle title={__('Required:', 'bitform')} action={setRequired} isChecked={isRequired} className="mt-3" />
      {elmData.typ !== 'textarea'
        && elmData.typ.match(/^(text|url|password|number|email|)$/)
        && <SingleToggle title={__('Auto Fill:', 'bitform')} action={setAutoComplete} isChecked={isAutoComplete} className="mt-3" />}
      <SingleInput inpType="text" title={__('Field Label:', 'bitform')} value={label} action={setLabel} />
      {elmData.typ.match(/^(text|url|textarea|password|number|email|)$/) && <SingleInput inpType="text" title={__('Placeholder:', 'bitform')} value={placeholder} action={setPlaceholder} />}
      {elmData.typ === 'number' && <SingleInput inpType="number" title={__('Min:', 'bitform')} value={min} action={setMin} width={100} className="mr-4" />}
      {elmData.typ === 'number' && <SingleInput inpType="number" title={__('Max:', 'bitform')} value={max} action={setMax} width={100} />}
    </div>
  )
}

export default memo(TextFieldSettings)
