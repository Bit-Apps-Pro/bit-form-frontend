import React from 'react'
import MtInput from '../../ElmSettings/Childs/MtInput'

export default function ZohoCampaignsFieldMap({ i, formFields, field, campaignsConf, setCampaignsConf }) {
  const { list } = campaignsConf
  const isNotRequired = field.zohoFormField !== 'contact_email'

  const addMap = ind => {
    const newConf = { ...campaignsConf }

    newConf.field_map.splice(ind, 0, { formField: '', zohoFormField: '' })

    setCampaignsConf({ ...newConf })
  }

  const delMap = ind => {
    const newConf = { ...campaignsConf }
    if (newConf.field_map.length > 1) {
      newConf.field_map.splice(ind, 1)
    }
    setCampaignsConf({ ...newConf })
  }

  const handleFieldMapping = (event, index) => {
    const newConf = { ...campaignsConf }
    newConf.field_map[index][event.target.name] = event.target.value
    setCampaignsConf({ ...newConf })
  }

  const handleCustomValue = (e, ind) => {
    const newConf = { ...campaignsConf }
    newConf.field_map[ind].customValue = e.target.value
    setCampaignsConf({ ...newConf })
  }

  return (
    <div
      className={`flx flx-around mt-2 ${isNotRequired && 'mr-1'}`}
    >
      <select className="btcd-paper-inp mr-2" name="formField" value={field.formField} onChange={(ev) => handleFieldMapping(ev, i)}>
        <option value="">Select Field</option>
        {
          formFields.map(f => f.type !== 'file-up' && <option key={`ff-zhcrm-${f.key}`} value={f.key}>{f.name}</option>)
        }
        <option value="custom">Custom...</option>
      </select>

      {field.formField === 'custom' && <MtInput onChange={e => handleCustomValue(e, i)} label="Custom Value" className="mr-2" type="text" value={field.customValue} placeholder="Custom Value" />}

      <select className="btcd-paper-inp" name="zohoFormField" value={field.zohoFormField} disabled={!isNotRequired} onChange={(ev) => handleFieldMapping(ev, i)}>
        <option value="">Select Field</option>
        <option key="contact_email-1" value="contact_email">
          contact_email
        </option>
        {

          // isNotRequired
          //   ? Object.values(campaignsConf.default.fields[list]).map(contactField => contactField !== 'contact_email' && (
          //     <option key={`${contactField}-1`} value={contactField}>
          //       {contactField}
          //     </option>
          //   )) : (
          //     <option key="contact_email-1" value="contact_email">
          //       contact_email
          //     </option>
          //   )
        }
      </select>
      {/* <button
        onClick={() => addMap(i)}
        className={`icn-btn sh-sm ml-2 ${!isNotRequired && 'mr-8'}`}
        type="button"
      >
        +
      </button> */}
      {
        isNotRequired && (
          <button onClick={() => delMap(i)} className="icn-btn sh-sm ml-1" type="button" aria-label="btn">
            <span className="btcd-icn icn-trash-2" />
          </button>
        )
      }
    </div>
  )
}
