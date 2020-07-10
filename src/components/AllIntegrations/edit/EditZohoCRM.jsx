/* eslint-disable no-param-reassign */
import React, { useState, useEffect } from 'react'
import { useRouteMatch, useHistory, useParams } from 'react-router-dom'
import MultiSelect from 'react-multiple-select-dropdown-lite'
import { ReactSortable } from 'react-sortablejs'
import TableCheckBox from '../../ElmSettings/Childs/TableCheckBox'
import SnackMsg from '../../ElmSettings/Childs/SnackMsg'
import bitsFetch from '../../../Utils/bitsFetch'
import ConfirmModal from '../../ConfirmModal'
import 'react-multiple-select-dropdown-lite/dist/index.css'
import Loader from '../../Loaders/Loader'
import Modal from '../../Modal'
import CheckBox from '../../ElmSettings/Childs/CheckBox'

function EditZohoCRM({ formFields, setIntegration, integrations }) {
  const { url } = useRouteMatch()
  const history = useHistory()
  const { id, formID } = useParams()

  const [crmConf, setCrmConf] = useState({ ...integrations[id] })
  const [isLoading, setisLoading] = useState(false)
  const [isLayoutClearable, setisLayoutClearable] = useState(false)
  const [isFieldMappingClearable, setisFieldMappingClearable] = useState(false)
  const [snack, setSnackbar] = useState({ show: false })
  const [upsertMdl, setUpsertMdl] = useState(false)
  const [actionMdl, setActionMdl] = useState({ show: false, action: () => { } })

  console.log('crmConf.module', crmConf.module, integrations[id].module)
  useEffect(() => {
    const newConf = { ...crmConf }
    console.log('object', integrations[id], crmConf.module)
    if (crmConf.default && crmConf.default.layouts && !crmConf.default.layouts[crmConf.module]) {
      console.log('object1', integrations[id], crmConf.module)
      refreshLayouts()
    } else if (integrations[id].module) {
      if (isLayoutClearable) {
        console.log('object2', integrations[id], crmConf.module)
        const layouts = [...Object.keys(crmConf.default.layouts[crmConf.module])]
        console.log('laouts', layouts[0], layouts)
        if (layouts.length === 1) {
          newConf.layout = layouts[0]
          console.log('===1', newConf.layout, crmConf.layout)
          if (newConf.layout === crmConf.layout) {
            newConf.field_map = newConf.default.layouts[crmConf.module][crmConf.layout].required ? newConf.default.layouts[crmConf.module][crmConf.layout].required.map(field => ({ formField: '', zohoFormField: field })) : [{ formField: '', zohoFormField: '' }]
          }
        } else {
          newConf.layout = ''
          newConf.field_map = [{ formField: '', zohoFormField: '' }]
        }
        setCrmConf({ ...crmConf, ...newConf })
      } else {
        setisLayoutClearable(true)
      }
    }
  }, [crmConf.module])
  useEffect(() => {
    console.log('layout', integrations[id].layout, crmConf.layout)
    if (integrations[id].layout
      && isFieldMappingClearable
    ) {
      console.log('newFieldlayout', integrations[id].layout, crmConf.layout)
      const newConf = { ...crmConf }
      newConf.field_map = [{ formField: '', zohoFormField: '' }]
      if (crmConf.default && crmConf.default.layouts && newConf.default.layouts[crmConf.module][crmConf.layout] && newConf.default.layouts[crmConf.module][crmConf.layout].required) {
        newConf.field_map = newConf.default.layouts[crmConf.module][crmConf.layout].required.map(field => ({ formField: '', zohoFormField: field }))
      }
      setCrmConf({ ...crmConf, ...newConf })
    } else {
      setisFieldMappingClearable(true)
    }
  }, [crmConf.layout])

  const handleInput = e => {
    crmConf[e.target.name] = e.target.value
    setCrmConf({ ...crmConf })
  }

  const handleFieldMapping = (event, index) => {
    const newConf = { ...crmConf }
    newConf.field_map[index][event.target.name] = event.target.value
    setCrmConf({ ...crmConf, ...newConf })
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


  const saveConfig = () => {
    const mappedFields = crmConf.field_map.filter(mappedField => (!mappedField.formField && mappedField.zohoFormField && (crmConf.default.layouts[crmConf.module][crmConf.layout].required && crmConf.default.layouts[crmConf.module][crmConf.layout].required.indexOf(mappedField.zohoFormField) !== -1) && mappedField.zohoFormField))
    if (mappedFields.length > 0) {
      setSnackbar({ show: true, msg: 'Please map mandatory fields' })
      return
    }
    integrations[id] = { ...integrations[id], ...crmConf }
    console.log('mappedFields', integrations[id])
    setIntegration([...integrations])
    history.push(url.match(/\/builder\/edit\/[0-9]+\/settings.integrations/g).join())
  }

  const refreshModules = () => {
    setisLoading(true)
    const refreshModulesRequestParams = {
      formID,
      id: crmConf.id,
      dataCenter: crmConf.dataCenter,
      clientId: crmConf.clientId,
      clientSecret: crmConf.clientSecret,
      tokenDetails: crmConf.tokenDetails,
    }
    const response = bitsFetch(refreshModulesRequestParams, 'bitforms_zcrm_refresh_modules')
      .then(result => result)
    response.then(result => {
      if (result && result.success) {
        const newConf = { ...crmConf }
        if (result.data.modules) {
          newConf.default = { ...newConf.default, modules: result.data.modules }
        }
        if (result.data.tokenDetails) {
          newConf.tokenDetails = result.data.tokenDetails
        }
        console.log('newConf', newConf)
        setCrmConf({ ...crmConf, ...newConf })
      } else if ((result && result.data && result.data.data) || (!result.success && typeof result.data === 'string')) {
        setSnackbar({ show: true, msg: `Modules refresh failed Cause:${result.data.data || result.data}. please try again` })
      } else {
        setSnackbar({ show: true, msg: 'Modules refresh failed. please try again' })
      }
    })
    setisLoading(false)
  }

  const refreshLayouts = () => {
    if (!crmConf.module) {
      return
    }
    setisLoading(true)
    const refreshLayoutsRequestParams = {
      formID,
      id: crmConf.id,
      module: crmConf.module,
      dataCenter: crmConf.dataCenter,
      clientId: crmConf.clientId,
      clientSecret: crmConf.clientSecret,
      tokenDetails: crmConf.tokenDetails,
    }
    const response = bitsFetch(refreshLayoutsRequestParams, 'bitforms_zcrm_refresh_layouts')
      .then(result => result)
    response.then(result => {
      if (result && result.success) {
        const newConf = { ...crmConf }
        if (result.data.layouts) {
          if (!newConf.default.layouts) {
            newConf.default.layouts = {}
          }
          newConf.default.layouts[newConf.module] = { ...result.data.layouts }
          const layouts = [...Object.keys(result.data.layouts)]
          if (layouts.length === 1) {
            newConf.layout = layouts[0]
          }
        }
        if (result.data.tokenDetails) {
          newConf.tokenDetails = result.data.tokenDetails
        }
        setCrmConf({ ...crmConf, ...newConf })
        setSnackbar({ show: true, msg: 'Layouts refreshed' })
      } else if ((result && result.data && result.data.data) || (!result.success && typeof result.data === 'string')) {
        setSnackbar({ show: true, msg: `Layouts refresh failed Cause:${result.data.data || result.data}. please try again` })
      } else {
        setSnackbar({ show: true, msg: 'Layouts refresh failed. please try again' })
      }
    })
    setisLoading(false)
  }

  const clsActionMdl = () => {
    setActionMdl({ show: false })
  }

  const actioHandler = (val, typ) => {
    if (typ === 'attachment') {
      if (val !== '') {
        crmConf.actions.attachment = val
      } else {
        delete crmConf.actions.attachment
      }
    }
    if (typ === 'approval') {
      if (val.target.checked) {
        crmConf.actions.approval = true
      } else {
        delete crmConf.actions.approval
      }
    }
    if (typ === 'workflow') {
      if (val.target.checked) {
        crmConf.actions.workflow = true
      } else {
        delete crmConf.actions.workflow
      }
    }
    if (typ === 'gclid') {
      if (val.target.checked) {
        crmConf.actions.gclid = true
      } else {
        delete crmConf.actions.gclid
      }
    }
    if (typ === 'assignment_rules') {
      if (val.target.checked) {
        crmConf.actions.assignment_rules = true
      } else {
        delete crmConf.actions.assignment_rules
      }
    }
    if (typ === 'tag_rec') {
      if (val.target.value !== '') {
        crmConf.actions.tag_rec = val.target.value
      } else {
        delete crmConf.actions.tag_rec
      }
    }
    if (typ === 'upsert') {
      if (val.target.checked) {
        crmConf.actions.upsert = { overwrite: true, crmField: [{ id: 3, name: 'asds' }, { id: 4, name: 'sssss' }] }
        setUpsertMdl(true)
      } else {
        delete crmConf.actions.upsert
      }
    }

    setCrmConf({ ...crmConf })
  }

  const setUpsertSettings = (val, typ) => {
    if (typ === 'list') {
      crmConf.actions.upsert.crmField = val
    }
    if (typ === 'overwrite') {
      crmConf.actions.upsert.overwrite = val
    }
    setCrmConf({ ...crmConf })
  }


  return (
    <div style={{ width: 900 }}>
      <SnackMsg snack={snack} setSnackbar={setSnackbar} />
      <div className="flx mt-3">
        <b className="wdt-100 d-in-b">Integration Name:</b>
        <input className="btcd-paper-inp w-7" onChange={handleInput} name="name" value={crmConf.name} type="text" placeholder="Integration Name..." />
      </div>

      <ConfirmModal
        className="custom-conf-mdl"
        mainMdlCls="o-v"
        btnClass="blue"
        btnTxt="Ok"
        show={actionMdl.show === 'attachment'}
        close={clsActionMdl}
        action={clsActionMdl}
        title="Select Attachment"
      >
        <div className="btcd-hr mt-1" />
        <div className="mt-3">Select file upload fields</div>
        <MultiSelect
          className="mt-2 w-9"
          onChange={(val) => actioHandler(val, 'attachment')}
          options={formFields.map(itm => ({ label: itm.name, value: itm.key }))}
        />
      </ConfirmModal>

      <ConfirmModal
        className="custom-conf-mdl"
        mainMdlCls="o-v"
        btnClass="blue"
        btnTxt="Ok"
        show={actionMdl.show === 'tag_rec'}
        close={clsActionMdl}
        action={clsActionMdl}
        title="Tag Records"
      >
        <div className="btcd-hr mt-1" />
        <small>Add a tag to records pushed to Zoho CRM</small>
        <div className="mt-3">Tag Name</div>
        <select onChange={e => actioHandler(e, 'tag_rec')} className="btcd-paper-inp mt-2 w-9">
          <option value="">Select One</option>
        </select>
      </ConfirmModal>

      <Modal
        md
        show={upsertMdl}
        setModal={setUpsertMdl}
        title="Upsert Record"
      >
        <div className="o-a">
          {crmConf.actions?.upsert && (
            <>
              <div className="font-w-m mt-2">Upsert Using</div>
              <small>Arrange fields in order of preferance for upsertion</small>
              <ReactSortable list={crmConf.actions.upsert.crmField} setList={l => setUpsertSettings(l, 'list')}>
                {crmConf.actions.upsert.crmField.map((itm, i) => (
                  <div key={`cf-${i + 8}`} className="upsert_rec w-7 mt-1">
                    <span className="btcd-icn btcd-mnu mr-2" />
                    {itm.name}
                  </div>
                ))}
              </ReactSortable>

              <div className="font-w-m mt-3">Upsert Preferance</div>
              <small>Overwrite existing field values in Zoho CRM with empty field values from Zoho Forms while upserting a record?</small>
              <div>
                <CheckBox onChange={() => setUpsertSettings(true, 'overwrite')} radio checked={crmConf.actions.upsert.overwrite} name="up-rec" title="Yes" />
                <CheckBox onChange={() => setUpsertSettings(false, 'overwrite')} radio checked={!crmConf.actions.upsert.overwrite} name="up-rec" title="No" />
              </div>
            </>
          )}
        </div>
      </Modal>

      <br />
      <b className="wdt-100 d-in-b">Module:</b>
      <select onChange={handleInput} name="module" value={crmConf.module} className="btcd-paper-inp w-7">
        <option>Select Module</option>
        {
          crmConf.default && crmConf.default.modules && Object.keys(crmConf.default.modules).map(moduleApiName => (
            <option value={moduleApiName}>
              {crmConf.default.modules[moduleApiName].plural_label}
            </option>
          ))
        }
      </select>
      <button onClick={refreshModules} className="icn-btn sh-sm ml-2 mr-2" type="button" disabled={isLoading}>&#x21BB;</button>
      <br />
      <br />
      <b className="wdt-100 d-in-b">Layout:</b>
      <select onChange={handleInput} name="layout" value={crmConf.layout} className="btcd-paper-inp w-7">
        <option>Select Layout</option>
        {
          crmConf.default && crmConf.default.layouts && crmConf.default.layouts[crmConf.module] && Object.keys(crmConf.default.layouts[crmConf.module]).map(layoutApiName => (
            <option value={layoutApiName}>
              {layoutApiName}
            </option>
          ))
        }
      </select>
      <button onClick={refreshLayouts} className="icn-btn sh-sm ml-2 mr-2" type="button" disabled={isLoading}>&#x21BB;</button>
      <br />
      <br />
      {
        isLoading && (
          <Loader style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 100,
            transform: 'scale(0.7)',
          }}
          />
        )
      }
      {
        crmConf.module && crmConf.module && crmConf.default && crmConf.default.layouts && crmConf.default.layouts[crmConf.module] && crmConf.default.layouts[crmConf.module][crmConf.layout] && crmConf.default.layouts[crmConf.module][crmConf.layout].fields
        && (
          <>
            <div className="mt-4"><b className="wdt-100">Field Map</b></div>
            <div className="btcd-hr mt-1" />
            <div className="mt-3 txt-center d-in-b w-4 txt-dp"><b className="wdt-100">Form Fields</b></div>
            <div className="mt-3 txt-center d-in-b w-4 txt-dp"><b className="wdt-100">Zoho Fields</b></div>

            {crmConf.field_map.map((itm, i) => (
              <MapField
                i={i}
                field={itm}
                crmConf={crmConf}
                formFields={formFields}
                handleFieldMapping={handleFieldMapping}
                addMap={addMap}
                delMap={delMap}
              />
            ))}

            <div className="txt-center mt-2 mr-4"><button onClick={() => addMap()} className="icn-btn sh-sm" type="button">+</button></div>

            <br />
            <br />
            <div className="mt-4"><b className="wdt-100">Actions</b></div>
            <div className="btcd-hr mt-1" />

            <div className="d-flx flx-wrp">
              <TableCheckBox onChange={(e) => actioHandler(e, 'workflow')} checked={'workflow' in crmConf.actions} className="wdt-200 mt-4" value="Workflow" title="Workflow" subTitle="Trigger CRM workflows" />
              <TableCheckBox onChange={() => setActionMdl({ show: 'attachment' })} checked={'attachment' in crmConf.actions} className="wdt-200 mt-4" value="Attachment" title="Attachment" subTitle="Add attachments or signatures from BitFroms to CRM." />
              <TableCheckBox onChange={(e) => actioHandler(e, 'approval')} checked={'approval' in crmConf.actions} className="wdt-200 mt-4" value="Approval" title="Approval" subTitle="Send entries to CRM approval list." />
              <TableCheckBox onChange={(e) => actioHandler(e, 'gclid')} checked={'gclid' in crmConf.actions} className="wdt-200 mt-4" value="Capture_GCLID" title="Capture GCLID" subTitle="Sends the click details of AdWords Ads to Zoho CRM." />
              <TableCheckBox onChange={(e) => actioHandler(e, 'upsert')} checked={crmConf.actions.Upsert_Record} className="wdt-200 mt-4" value="Upsert_Record" title="Upsert Record" subTitle="The record is updated if it already exists else it is inserted as a new record." />
              <TableCheckBox onChange={(e) => actioHandler(e, 'assignment_rules')} checked={'assignment_rules' in crmConf.actions} className="wdt-200 mt-4" value="Assignment_Rules" title="Assignment Rules" subTitle="Trigger Assignment Rules in Zoho CRM." />
              <TableCheckBox onChange={() => setActionMdl({ show: 'tag_rec' })} checked={'tag_rec' in crmConf.actions} className="wdt-200 mt-4" value="Tag_Records" title="Tag Records" subTitle="Add a tag to records pushed to Zoho CRM." />
            </div>
          </>
        )
      }

      <div className="txt-center">
        <button onClick={saveConfig} className="btn btcd-btn-lg green sh-sm flx" type="button">
          Save
        </button>
      </div>
      <br />
    </div>
  )
}

export default EditZohoCRM

function MapField({ i, formFields, field, handleFieldMapping, crmConf, addMap, delMap }) {

  const isNotRequired = crmConf?.default?.layouts?.[crmConf.module]?.[crmConf.layout]?.required?.indexOf(field.zohoFormField) === -1

  return (
    <div key={`f-m-${i + 9}`} className="flx flx-around mt-1 mr-1">
      <select className="btcd-paper-inp mr-2" name="formField" value={field.formField} onChange={(ev) => handleFieldMapping(ev, i)}>
        <option value="">Select Field</option>
        {formFields.map(f => field.type !== 'file-up' && <option key={`ff-zhcrm-${f.key}`} value={f.key}>{f.name}</option>)}
      </select>
      <select className="btcd-paper-inp" disabled={!isNotRequired} name="zohoFormField" value={field.zohoFormField} onChange={(ev) => handleFieldMapping(ev, i)}>
        <option value="">Select Field</option>
        {
          Object.keys(crmConf.default.layouts[crmConf.module][crmConf.layout].fields).map(fieldApiName => (
            <option value={fieldApiName}>
              {crmConf.default.layouts[crmConf.module][crmConf.layout].fields[fieldApiName].display_label}
            </option>
          ))
        }
      </select>
      <button
        onClick={() => addMap(i)}
        className={`icn-btn sh-sm ml-2 ${!isNotRequired && 'mr-8'}`}
        type="button"
      >
        +
      </button>
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
