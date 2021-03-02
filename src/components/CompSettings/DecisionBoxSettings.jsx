// eslint-disable-next-line import/no-extraneous-dependencies
import { __ } from '@wordpress/i18n'
import CopyText from '../ElmSettings/Childs/CopyText'
import SingleInput from '../ElmSettings/Childs/SingleInput'
import SingleToggle from '../ElmSettings/Childs/SingleToggle'
import TinyMCE from '../TinyMCE'
import Back2FldList from './Back2FldList'

export default function DecisionBoxSettings({ setElementSetting, elm, fields, updateData }) {
  const elmId = elm.id
  const elmData = { ...fields[elmId] }

  function setAdminLabel(e) {
    if (e.target.value === '') {
      delete elmData.adminLbl
    } else {
      elmData.adminLbl = e.target.value
    }
    updateData({ id: elmId, data: elmData })
  }

  function setRequired(e) {
    if (e.target.checked) {
      const tmp = { ...elmData.valid }
      tmp.req = true
      elmData.valid = tmp
    } else {
      delete elmData.valid.req
    }
    updateData({ id: elmId, data: elmData })
  }

  function setChecked(e) {
    if (e.target.checked) {
      const tmp = { ...elmData.valid }
      tmp.checked = true
      elmData.valid = tmp
    } else {
      delete elmData.valid.checked
    }
    updateData({ id: elmId, data: elmData })
  }

  const setLbl = val => {
    elmData.lbl = val

    updateData({ id: elmId, data: elmData })
  }

  const setMsg = (val, typ) => {
    elmData.msg[typ] = val

    updateData({ id: elmId, data: elmData })
  }

  return (
    <div className="mr-4 ml-2">
      <Back2FldList setElementSetting={setElementSetting} />
      <div className="mb-2">
        <span className="font-w-m">Field Type :</span>
        {' '}
        {elmData.typ.charAt(0).toUpperCase() + elmData.typ.slice(1)}
      </div>
      <span className="font-w-m">{__('Field Key', 'bitform')}</span>
      <CopyText value={elmId} setSnackbar={() => { }} className="field-key-cpy" />
      <SingleInput inpType="text" title={__('Admin Label:', 'bitform')} value={elmData.adminLbl || ''} action={setAdminLabel} />
      <SingleToggle title={__('Required:', 'bitform')} action={setRequired} isChecked={elmData.valid.req} className="mt-3" />
      <SingleToggle title={__('Checked by Default:', 'bitform')} action={setChecked} isChecked={elmData.valid.checked} className="mt-3" />
      <TinyMCE
        value={elmData.lbl}
        onChangeHandler={setLbl}
      />
      <SingleInput inpType="text" title={__('Checked Value:', 'bitform')} value={elmData.msg.checked || ''} action={e => setMsg(e.target.value, 'checked')} />
      <SingleInput inpType="text" title={__('Unchecked Value:', 'bitform')} value={elmData.msg.unchecked || ''} action={e => setMsg(e.target.value, 'unchecked')} />
    </div>
  )
}
