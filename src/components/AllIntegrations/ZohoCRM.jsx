import React, { useState } from 'react'
import { useRouteMatch, useHistory } from 'react-router-dom'
import Steps from '../ElmSettings/Childs/Steps'
import TableCheckBox from '../ElmSettings/Childs/TableCheckBox'

function ZohoCRM({ formFields, setIntegration, integrations }) {
  const { url } = useRouteMatch()
  const history = useHistory()

  const [crmConf, setCrmConf] = useState({
    name: 'Zoho CRM API',
    type: 'Zoho CRM',
    email: '',
    pass: '',
    module: 'Leads',
    layout: 'Standard',
    field_map: [
      { formField: '', zohoFormField: '' },
    ],
    actions: ['Workflow'],
  })

  const [step, setstep] = useState(1)

  const handleInput = e => {
    crmConf[e.target.name] = e.target.value
    setCrmConf({ ...crmConf })
  }

  const nextPage = val => {
    if (val === 3) {
      if (crmConf.module !== '' && crmConf.layout !== '' && crmConf.field_map.length > 0 && crmConf.actions.length > 0) {
        setstep(val)
      }
    } else {
      setstep(val)
    }
  }

  const addMap = i => {
    if (i !== undefined) {
      crmConf.field_map.splice(i, 0, { formField: '', zohoFormField: '' })
    } else {
      crmConf.field_map.push({ formField: '', zohoFormField: '' })
    }
    setCrmConf({ ...crmConf })
  }

  const delMap = i => {
    if (crmConf.field_map.length > 1) {
      crmConf.field_map.splice(i, 1)
    }
    setCrmConf({ ...crmConf })
  }

  const handleAtns = e => {
    if (e.target.checked) {
      crmConf.actions.push(e.target.value)
    } else {
      crmConf.actions.splice(crmConf.actions.indexOf(e.target.value), 1)
    }
    setCrmConf({ ...crmConf })
  }

  const saveConfig = () => {
    integrations.push(crmConf)
    setIntegration([...integrations])
    history.push(url.match(/\/builder\/edit\/[0-9]+\/settings.integrations/g).join())
  }

  return (
    <div>
      <div className="txt-center w-9 mt-2"><Steps step={3} active={step} /></div>

      <div className="btcd-stp-page" style={{ ...{ width: step === 1 && `${80}%` }, ...{ height: step === 1 && `${100}%` } }}>
        <div className="mt-3"><b>Integration Name:</b></div>
        <input className="btcd-paper-inp w-9 mt-1" onChange={handleInput} name="name" value={crmConf.name} type="text" placeholder="Integration Name..." />

        <div className="mt-4"><b>Login Zoho</b></div>
        <a href="#s" className="btn btcd-btn-lg br-50 blue sh-sm d-in-b" type="button">
          Authenticaticate with Zoho &nbsp;
          <span className="btcd-icn icn-external-link" />
        </a>
        <div><b>Or</b></div>
        <div className="mt-3"><b>Email:</b></div>
        <input className="btcd-paper-inp w-9 mt-1" onChange={handleInput} name="email" value={crmConf.email} type="email" placeholder="Email..." />

        <div className="mt-3"><b>Password:</b></div>
        <input className="btcd-paper-inp w-9 mt-1" onChange={handleInput} name="pass" value={crmConf.pass} type="password" placeholder="Password..." />
        <br />
        <button onClick={() => nextPage(2)} className="btn f-right btcd-btn-lg green sh-sm flx" type="button">
          Next &nbsp;
          <div className="btcd-icn icn-arrow_back rev-icn d-in-b" />
        </button>
      </div>

      <div className="btcd-stp-page" style={{ width: step === 2 && `${80}%`, height: step === 2 && `${100}%` }}>
        <br />
        <b className="wdt-100 d-in-b">Module:</b>
        <select onChange={handleInput} name="module" value={crmConf.module} className="btcd-paper-inp w-7">
          <option value="Leads">Leads</option>
          <option value="Contacts">Contacts</option>
          <option value="Accounts">Accounts</option>
          <option value="Deals">Deals</option>
          <option value="Tasks">Tasks</option>
        </select>
        <br />
        <br />
        <b className="wdt-100 d-in-b">Layout:</b>
        <select onChange={handleInput} name="layout" value={crmConf.layout} className="btcd-paper-inp w-7">
          <option value="Standard">Standard</option>
        </select>

        <br />
        <br />
        <div className="mt-4"><b className="wdt-100">Field Map</b></div>
        <div className="btcd-hr mt-1" />
        <div className="mt-3 txt-center d-in-b w-4 txt-dp"><b className="wdt-100">Form Fields</b></div>
        <div className="mt-3 txt-center d-in-b w-4 txt-dp"><b className="wdt-100">Zoho Fields</b></div>

        {crmConf.field_map.map((itm, i) => (
          <div key={`f-m-${i + 9}`}>
            <select className="btcd-paper-inp w-4 mr-2">
              <option value="">Select Field</option>
              {formFields.map(f => itm.type !== 'file-up' && <option key={`ff-zhcrm-${f.key}`} value={f.key}>{f.name}</option>)}
            </select>
            <select className="btcd-paper-inp w-4">
              <option value="">Select Field</option>
              <option value="name">Name</option>
              <option value="email">Email</option>
              <option value="number">Number</option>
            </select>
            <button onClick={() => addMap(i)} className="icn-btn sh-sm ml-2 mr-2" type="button">+</button>
            <button onClick={() => delMap(i)} className="icn-btn sh-sm ml-1" type="button" aria-label="btn"><span className="btcd-icn icn-trash-2" /></button>
          </div>
        ))}
        <div className="txt-center w-8 mt-2"><button onClick={() => addMap()} className="icn-btn sh-sm" type="button">+</button></div>

        <br />
        <br />
        <div className="mt-4"><b className="wdt-100">Actions</b></div>
        <div className="btcd-hr mt-1" />

        <div className="d-flx flx-wrp">
          <TableCheckBox onChange={handleAtns} checked={crmConf.actions.some(i => i === 'Workflow')} className="wdt-200 mt-4" value="Workflow" title="Workflow" subTitle="Trigger CRM workflows" />
          <TableCheckBox onChange={handleAtns} checked={crmConf.actions.some(i => i === 'Attachment')} className="wdt-200 mt-4" value="Attachment" title="Attachment" subTitle="Add attachments or signatures from BitFroms to CRM." />
          <TableCheckBox onChange={handleAtns} checked={crmConf.actions.some(i => i === 'Approval')} className="wdt-200 mt-4" value="Approval" title="Approval" subTitle="Send entries to CRM approval list." />
          <TableCheckBox onChange={handleAtns} checked={crmConf.actions.some(i => i === 'Capture_GCLID')} className="wdt-200 mt-4" value="Capture_GCLID" title="Capture GCLID" subTitle="Sends the click details of AdWords Ads to Zoho CRM." />
          <TableCheckBox onChange={handleAtns} checked={crmConf.actions.some(i => i === 'Upsert_Record')} className="wdt-200 mt-4" value="Upsert_Record" title="Upsert Record" subTitle="The record is updated if it already exists else it is inserted as a new record." />
          <TableCheckBox onChange={handleAtns} checked={crmConf.actions.some(i => i === 'Assignment_Rules')} className="wdt-200 mt-4" value="Assignment_Rules" title="Assignment Rules" subTitle="Trigger Assignment Rules in Zoho CRM." />
          <TableCheckBox onChange={handleAtns} checked={crmConf.actions.some(i => i === 'Tag_Records')} className="wdt-200 mt-4" value="Tag_Records" title="Tag Records" subTitle="Add a tag to records pushed to Zoho CRM." />
        </div>

        <button
          onClick={() => nextPage(3)}
          disabled={crmConf.module === '' || crmConf.layout === '' || crmConf.field_map.length < 1 || crmConf.actions.length < 1}
          className="btn f-right btcd-btn-lg green sh-sm flx"
          type="button"
        >
          Next &nbsp;
          <div className="btcd-icn icn-arrow_back rev-icn d-in-b" />
        </button>

      </div>

      <div className="btcd-stp-page txt-center" style={{ width: step === 3 && `${90}%`, height: step === 3 && `${100}% ` }}>
        <h2 className="ml-3">Successfully Integrated</h2>
        <button onClick={saveConfig} className="btn btcd-btn-lg green sh-sm flx" type="button">
          Finish & Save
          ✔
        </button>
      </div>
    </div>
  )
}

export default ZohoCRM
