/* eslint-disable no-param-reassign */
import React, { useState } from 'react'
import MultiSelect from 'react-multiple-select-dropdown-lite'
import { ReactSortable } from 'react-sortablejs'
import TableCheckBox from '../../ElmSettings/Childs/TableCheckBox'
import CheckBox from '../../ElmSettings/Childs/CheckBox'
import ConfirmModal from '../../ConfirmModal'
import Modal from '../../Modal'
import 'react-multiple-select-dropdown-lite/dist/index.css'

export default function ZohoCrmActions({ crmConf, setCrmConf, formFields }) {
  const [upsertMdl, setUpsertMdl] = useState(false)
  const [actionMdl, setActionMdl] = useState({ show: false, action: () => { } })

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
        const crmField = crmConf.default.layouts[crmConf.module][crmConf.layout].required.map((name, i) => ({ i, name }))
        crmConf.actions.upsert = { overwrite: true, crmField }
        setUpsertMdl(true)
      } else {
        delete crmConf.actions.upsert
      }
    }
    setCrmConf({ ...crmConf })
  }

  const clsActionMdl = () => {
    setActionMdl({ show: false })
  }

  const getTags = () => {
    const arr = [
      { title: 'Zoho CRM Tags', type: 'group', child: [] },
      { title: 'Form Fields', type: 'group', child: [] },
    ]
    arr[0].childs = [{ label: 'test 1', value: 1 }, { label: 'test 2', value: 2 }]
    arr[1].childs = formFields.map(itm => ({ label: itm.name, value: itm.key }))
    return arr
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
    <>
      <div className="d-flx flx-wrp">
        <TableCheckBox onChange={(e) => actioHandler(e, 'workflow')} checked={'workflow' in crmConf.actions} className="wdt-200 mt-4 mr-2" value="Workflow" title="Workflow" subTitle="Trigger CRM workflows" />
        <TableCheckBox onChange={() => setActionMdl({ show: 'attachment' })} checked={'attachment' in crmConf.actions} className="wdt-200 mt-4 mr-2" value="Attachment" title="Attachment" subTitle="Add attachments or signatures from BitFroms to CRM." />
        <TableCheckBox onChange={(e) => actioHandler(e, 'approval')} checked={'approval' in crmConf.actions} className="wdt-200 mt-4 mr-2" value="Approval" title="Approval" subTitle="Send entries to CRM approval list." />
        <TableCheckBox onChange={(e) => actioHandler(e, 'gclid')} checked={'gclid' in crmConf.actions} className="wdt-200 mt-4 mr-2" value="Capture_GCLID" title="Capture GCLID" subTitle="Sends the click details of AdWords Ads to Zoho CRM." />
        <TableCheckBox onChange={(e) => actioHandler(e, 'upsert')} checked={crmConf.actions.Upsert_Record} className="wdt-200 mt-4 mr-2" value="Upsert_Record" title="Upsert Record" subTitle="The record is updated if it already exists else it is inserted as a new record." />
        <TableCheckBox onChange={(e) => actioHandler(e, 'assignment_rules')} checked={'assignment_rules' in crmConf.actions} className="wdt-200 mt-4 mr-2" value="Assignment_Rules" title="Assignment Rules" subTitle="Trigger Assignment Rules in Zoho CRM." />
        <TableCheckBox onChange={() => setActionMdl({ show: 'tag_rec' })} checked={'tag_rec' in crmConf.actions} className="wdt-200 mt-4 mr-2" value="Tag_Records" title="Tag Records" subTitle="Add a tag to records pushed to Zoho CRM." />
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
        <MultiSelect
          className="mt-2"
          singleSelect
          options={getTags()}
        />
      </ConfirmModal>

      <Modal
        md
        show={upsertMdl}
        setModal={setUpsertMdl}
        title="Upsert Record"
      >
        <div className="o-a">
          {crmConf?.actions?.upsert && (
            <>
              <div className="font-w-m mt-2">Upsert Using</div>
              <small>Arrange fields in order of preferance for upsertion</small>
              <ReactSortable list={crmConf.actions.upsert.crmField} setList={l => setUpsertSettings(l, 'list')}>
                {crmConf.actions.upsert.crmField.map((itm) => (
                  <div key={`cf-${itm.i}`} className="upsert_rec w-7 mt-1 flx">
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
    </>
  )
}
