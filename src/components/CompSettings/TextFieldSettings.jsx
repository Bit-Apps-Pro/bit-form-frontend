/* eslint-disable jsx-a11y/label-has-associated-control */
import { memo } from 'react'
import { __ } from '../../Utils/i18nwrap'
import CopyText from '../Utilities/CopyText'
import SingleInput from '../Utilities/SingleInput'
import SingleToggle from '../Utilities/SingleToggle'
import TableCheckBox from '../Utilities/TableCheckBox'
import Back2FldList from './Back2FldList'
import ErrorMessageSettings from './CompSettingsUtils/ErrorMessageSettings'

function TextFieldSettings(props) {
  const elmId = props.elm.id
  const elmData = { ...props.fields[elmId] }
  console.log('%c $render TextFieldSettings', 'background:gray;padding:3px;border-radius:5px;color:white')
  const isRequired = elmData.valid.req !== undefined
  const isAutoComplete = elmData.ac === 'on'
  const label = elmData.lbl === undefined ? '' : elmData.lbl
  const adminLabel = elmData.adminLbl === undefined ? '' : elmData.adminLbl
  const placeholder = elmData.ph === undefined ? '' : elmData.ph
  const min = elmData.mn === undefined ? '' : elmData.mn
  const max = elmData.mx === undefined ? '' : elmData.mx
  const fldKey = elmId
  const regexr = elmData.valid.regexr === undefined ? '' : elmData.valid.regexr
  const flags = elmData.valid.flags === undefined ? '' : elmData.valid.flags

  const generateBackslashPattern = str => str.replaceAll('$_bf_$', '\\')
  const escapeBackslashPattern = str => str.replaceAll('\\', '$_bf_$')

  function setRequired(e) {
    if (e.target.checked) {
      const tmp = { ...elmData.valid }
      tmp.req = true
      elmData.valid = tmp
      if (!elmData.err) elmData.err = {}
      if (!elmData.err.req) elmData.err.req = {}
      elmData.err.req.dflt = '<p>This field is required</p>'
      elmData.err.req.show = true
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
      if (!elmData.err) elmData.err = {}
      if (!elmData.err.mn) elmData.err.mn = {}
      elmData.err.mn.dflt = `<p>Minimum number is ${e.target.value}<p>`
      elmData.err.mn.show = true
    }
    props.updateData({ id: elmId, data: elmData })
  }

  function setMax(e) {
    if (e.target.value === '') {
      delete elmData.mx
    } else {
      elmData.mx = e.target.value
      if (!elmData.err) elmData.err = {}
      if (!elmData.err.mx) elmData.err.mx = {}
      elmData.err.mx.dflt = `<p>Maximum number is ${e.target.value}</p>`
      elmData.err.mx.show = true
    }
    props.updateData({ id: elmId, data: elmData })
  }

  const setRegexr = e => {
    if (e.target.value === '') {
      delete elmData.valid.regexr
    } else {
      elmData.valid.regexr = escapeBackslashPattern(e.target.value)
      if (!elmData.err) elmData.err = {}
      if (!elmData.err.regexr) elmData.err.regexr = {}
      elmData.err.regexr.dflt = '<p>Pattern not matched</p>'
      elmData.err.regexr.show = true
      if (elmData.typ === 'password') {
        delete elmData.valid.validations
      }
    }
    props.updateData({ id: elmId, data: elmData })
  }

  const setFlags = e => {
    if (e.target.value === '') {
      delete elmData.valid.flags
    } else {
      elmData.valid.flags = e.target.value
    }
    props.updateData({ id: elmId, data: elmData })
  }

  const generatePasswordPattern = validations => `^${validations.digit || ''}${validations.lower || ''}${validations.upper || ''}${validations.special || ''}.{${validations?.limit?.mn || 0},${validations?.limit?.mx || ''}}$`

  const generatePasswordErrMsg = validations => `<p>Password must consist at least ${Object.keys(validations).map(vld => {
    if (vld === 'digit') {
      return 'one number'
    } if (vld === 'lower') {
      return 'one lowercase character'
    } if (vld === 'upper') {
      return 'one uppercase character'
    } if (vld === 'special') {
      return 'one special character'
    } if (vld === 'limit') {
      return `${validations.limit.mn}${validations.limit.mx ? ` to ${validations.limit.mx}` : ''} characters`
    }
  }).join(', ').replace(/, ([^,]*)$/, ' and $1')}</p>`

  const setPasswordValidation = e => {
    const { checked, name, value } = e.target
    if (!elmData.err) elmData.err = {}
    if (!elmData.err.regexr) elmData.err.regexr = {}
    if (!elmData.valid.validations) elmData.valid.validations = {}
    const { validations } = elmData.valid
    if (checked) {
      if (name === 'limit') {
        validations.limit = {}
        validations.limit.mn = 8
        validations.limit.mx = 32
      } else {
        validations[name] = value
      }
    } else {
      delete validations[name]
    }
    elmData.valid.validations = validations

    if (Object.keys(validations).length) {
      elmData.valid.regexr = generatePasswordPattern(validations)
      elmData.err.regexr.dflt = generatePasswordErrMsg(validations)
      elmData.err.regexr.show = true
    } else {
      elmData.err.regexr.dflt = '<p>Pattern not matched</p>'
      delete elmData.valid.regexr
      delete elmData.err.regexr.show
    }

    props.updateData({ id: elmId, data: elmData })
  }

  const setPasswordLimit = e => {
    const { name, value } = e.target
    const { validations } = elmData.valid
    if (value) {
      elmData.valid.validations.limit[name] = value
    } else {
      delete elmData.valid.validations.limit[name]
    }

    elmData.valid.regexr = generatePasswordPattern(validations)

    elmData.err.regexr.dflt = generatePasswordErrMsg(validations)

    props.updateData({ id: elmId, data: elmData })
  }

  console.log('elmData', elmData)

  return (
    <div className="mr-4 ml-2">
      <Back2FldList setElementSetting={props.setElementSetting} />
      <div className="mb-2">
        <span className="font-w-m">Field Type :</span>
        {elmData.typ.charAt(0).toUpperCase() + elmData.typ.slice(1)}
      </div>
      <div className="flx">
        <span className="font-w-m mr-1">{__('Field Key : ', 'bitform')}</span>
        <CopyText value={fldKey} setSnackbar={() => { }} className="field-key-cpy m-0 w-7" />
      </div>
      <SingleInput inpType="text" title={__('Field Label:', 'bitform')} value={label} action={setLabel} />
      <SingleInput inpType="text" title={__('Admin Label:', 'bitform')} value={adminLabel} action={setAdminLabel} />
      <SingleToggle title={__('Required:', 'bitform')} action={setRequired} isChecked={isRequired} className="mt-3" />
      {elmData?.valid?.req && (
        <ErrorMessageSettings
          elmId={elmId}
          elmData={elmData}
          type="req"
          title="Error Message"
          updateAction={() => props.updateData({ id: elmId, data: elmData })}
        />
      )}
      {elmData.typ.match(/^(text|url|password|number|email|)$/) && <SingleToggle title={__('Auto Fill:', 'bitform')} action={setAutoComplete} isChecked={isAutoComplete} className="mt-3" />}
      {elmData.typ.match(/^(text|url|textarea|password|number|email|)$/) && <SingleInput inpType="text" title={__('Placeholder:', 'bitform')} value={placeholder} action={setPlaceholder} />}
      {elmData.typ === 'number' && (
        <>
          <SingleInput inpType="number" title={__('Min:', 'bitform')} value={min} action={setMin} width={100} className="mr-4" />
          <SingleInput inpType="number" title={__('Max:', 'bitform')} value={max} action={setMax} width={100} />
          {elmData.mn && (
            <ErrorMessageSettings
              elmId={elmId}
              elmData={elmData}
              type="mn"
              title="Min Error Message"
              updateAction={() => props.updateData({ id: elmId, data: elmData })}
            />
          )}
          {elmData.mx && (
            <ErrorMessageSettings
              elmId={elmId}
              elmData={elmData}
              type="mx"
              title="Max Error Message"
              updateAction={() => props.updateData({ id: elmId, data: elmData })}
            />
          )}
        </>
      )}
      {elmData.typ.match(/^(url|number|email|)$/) && (
        <ErrorMessageSettings
          elmId={elmId}
          elmData={elmData}
          type="invalid"
          title="Invalid Error Message"
          updateAction={() => props.updateData({ id: elmId, data: elmData })}
        />
      )}

      {elmData.typ === 'password' && (
        <div>
          <h4>{__('Validations:', 'bitform')}</h4>
          <TableCheckBox className="w-10" name="digit" checked={elmData.valid?.validations?.digit || false} value="(?=.*[0-9])" title={__('At least one digit (0-9)', 'bitform')} onChange={setPasswordValidation} />
          <TableCheckBox className="w-10 mt-2" name="lower" checked={elmData.valid?.validations?.lower || false} value="(?=.*[a-z])" title={__('At least one lowercase character (a-z)', 'bitform')} onChange={setPasswordValidation} />
          <TableCheckBox className="w-10 mt-2" name="upper" checked={elmData.valid?.validations?.upper || false} value="(?=.*[A-Z])" title={__('At least one uppercase character (A-Z)', 'bitform')} onChange={setPasswordValidation} />
          <TableCheckBox className="w-10 mt-2" name="special" checked={elmData.valid?.validations?.special || false} value="(?=.*[~!@#$%^&*(){}[$_bf_$]<>+$_bf_$-_=$_bf_$$_bf_$/|;:,.])" title={__('At least one special character (~!@#$%^&*(){}[]<>+-_=/\\|;:,.)', 'bitform')} onChange={setPasswordValidation} />
          <TableCheckBox className="w-10 mt-2" name="limit" checked={elmData.valid?.validations?.limit || false} value=".{8,32}" title={__('Limit Password Length', 'bitform')} onChange={setPasswordValidation} />
          {elmData.valid?.validations?.limit && (
            <div>
              <SingleInput inpType="number" name="mn" title={__('Min:', 'bitform')} value={elmData.valid?.validations?.limit?.mn} action={setPasswordLimit} width={100} className="mr-4" />
              <SingleInput inpType="number" name="mx" title={__('Max:', 'bitform')} value={elmData.valid?.validations?.limit?.mx} action={setPasswordLimit} width={100} />
            </div>
          )}
        </div>
      )}

      {elmData.typ.match(/^(text|url|textarea|password|number|email|)$/) && (
        <>
          <div>
            <SingleInput inpType="text" title={__('Pattern:', 'bitform')} value={generateBackslashPattern(regexr)} action={setRegexr} className="mr-2 w-7" placeholder="e.g. ([A-Z])\w+" list="patterns" />
            <datalist id="patterns">
              <option value="^[a-zA-Z]+$">Only Characters</option>
              <option value="^[a-z0-9_.]+$">Username</option>
              <option value="^[a-zA-Z .]+$">Name</option>
              <option value="^[0-9]+$">Only Digits</option>
              <option value="^[a-z0-9](\.?[a-z0-9]){0,}@(gmail)\.com$">Only Gmail</option>
              <option value="^.{0,35}$">Character Length</option>
            </datalist>
            <SingleInput inpType="text" title={__('Flags:', 'bitform')} value={flags} action={setFlags} placeholder="e.g. g" className="w-2" />
          </div>
          {regexr && (
            <ErrorMessageSettings
              elmId={elmId}
              elmData={elmData}
              type="regexr"
              title="Error Message"
              updateAction={() => props.updateData({ id: elmId, data: elmData })}
            />
          )}
        </>
      )}
    </div>
  )
}

export default memo(TextFieldSettings)
