/* eslint-disable no-param-reassign */
import React, { useState } from 'react'
import MultiSelect from 'react-multiple-select-dropdown-lite'
import { ReactSortable } from 'react-sortablejs'
import TableCheckBox from '../../ElmSettings/Childs/TableCheckBox'
import bitsFetch from '../../../Utils/bitsFetch'
import CheckBox from '../../ElmSettings/Childs/CheckBox'
import ConfirmModal from '../../ConfirmModal'
import Modal from '../../Modal'
import 'react-multiple-select-dropdown-lite/dist/index.css'

export default function ZohoCrmActions({ crmConf, setCrmConf, formFields, tab, formID, setSnackbar }) {
  const [upsertMdl, setUpsertMdl] = useState(false)
  const [actionMdl, setActionMdl] = useState({ show: false, action: () => { } })

  const actionHandler = (val, typ) => {
    if (tab === 0) {
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
        if (val !== '') {
          crmConf.actions.tag_rec = val
        } else {
          delete crmConf.actions.tag_rec
        }
      }
      if (typ === 'rec_owner') {
        if (val !== '') {
          crmConf.actions.rec_owner = val
        } else {
          delete crmConf.actions.rec_owner
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
    } else {
      if (typ === 'attachment') {
        if (val !== '') {
          crmConf.relatedlist.actions.attachment = val
        } else {
          delete crmConf.relatedlist.actions.attachment
        }
      }
      if (typ === 'approval') {
        if (val.target.checked) {
          crmConf.relatedlist.actions.approval = true
        } else {
          delete crmConf.relatedlist.actions.approval
        }
      }
      if (typ === 'workflow') {
        if (val.target.checked) {
          crmConf.relatedlist.actions.workflow = true
        } else {
          delete crmConf.relatedlist.actions.workflow
        }
      }
      if (typ === 'gclid') {
        if (val.target.checked) {
          crmConf.relatedlist.actions.gclid = true
        } else {
          delete crmConf.relatedlist.actions.gclid
        }
      }
      if (typ === 'assignment_rules') {
        if (val.target.checked) {
          crmConf.relatedlist.actions.assignment_rules = true
        } else {
          delete crmConf.relatedlist.actions.assignment_rules
        }
      }
      if (typ === 'tag_rec') {
        if (val !== '') {
          crmConf.relatedlist.actions.tag_rec = val
        } else {
          delete crmConf.relatedlist.actions.tag_rec
        }
      }
      if (typ === 'rec_owner') {
        if (val !== '') {
          crmConf.relatedlist.actions.rec_owner = val
        } else {
          delete crmConf.relatedlist.actions.rec_owner
        }
      }
      if (typ === 'upsert') {
        if (val.target.checked) {
          const crmField = crmConf.default.layouts[crmConf.relatedlist.module][crmConf.relatedlist.layout].required.map((name, i) => ({ i, name }))
          crmConf.relatedlist.actions.upsert = { overwrite: true, crmField }
          setUpsertMdl(true)
        } else {
          delete crmConf.relatedlist.actions.upsert
        }
      }
    }

    setCrmConf({ ...crmConf })
  }

  const clsActionMdl = () => {
    setActionMdl({ show: false })
  }

  const module = tab === 0 ? crmConf.module : crmConf.relatedlist.module
  const getTags = () => {
    if (!crmConf.default.tags?.[module] && actionMdl.show === 'tag_rec') {
      refreshTags()
    }
    const arr = [
      { title: 'Zoho CRM Tags', type: 'group', childs: [] },
      { title: 'Form Fields', type: 'group', childs: [] },
    ]
    if (crmConf.default.tags?.[module]) {
      console.log('crmConf.default.tags?.[module]', crmConf.default.tags?.[module])
      arr[0].childs = Object.values(crmConf.default.tags?.[module]).map(tagName => ({ label: tagName, value: tagName }))
    }
    arr[1].childs = formFields.map(itm => ({ label: itm.name, value: `\${${itm.key}}` }))
    return arr
  }

  const refreshTags = () => {
    const refreshTagsParams = {
      formID,
      module,
      dataCenter: crmConf.dataCenter,
      clientId: crmConf.clientId,
      clientSecret: crmConf.clientSecret,
      tokenDetails: crmConf.tokenDetails,
    }
    bitsFetch(refreshTagsParams, 'bitforms_zcrm_get_tags').then(result => {
      if (result && result.success) {
        const newConf = { ...crmConf }
        if (result.data.tags) {
          if (!newConf.default.tags) {
            newConf.default.tags = {}
          }
          newConf.default.tags[module] = { ...result.data.tags }
        }
        if (result.data.tokenDetails) {
          newConf.tokenDetails = result.data.tokenDetails
        }
        setCrmConf({ ...crmConf, ...newConf })
        setSnackbar({ show: true, msg: 'Tags refreshed' })
      } else if ((result?.data?.data) || (!result.success && typeof result.data === 'string')) {
        setSnackbar({ show: true, msg: `Tags refresh failed Cause:${result.data.data || result.data}. please try again` })
      } else {
        setSnackbar({ show: true, msg: 'Tags refresh failed. please try again' })
      }
    })
  }
  const getOwners = () => {
    const getOwnersParams = {
      formID,
      dataCenter: crmConf.dataCenter,
      clientId: crmConf.clientId,
      clientSecret: crmConf.clientSecret,
      tokenDetails: crmConf.tokenDetails,
    }
    bitsFetch(getOwnersParams, 'bitforms_zcrm_get_users')
      .then(result => {
        if (result && result.success) {
          const newConf = { ...crmConf }
          newConf.default.crmOwner = result.data.users
          setCrmConf({ ...crmConf, ...newConf })
        }
      })
      .catch(() => console.log("error"))
  }

  const setUpsertSettings = (val, typ) => {
    if (tab === 0) {
      if (typ === 'list') {
        crmConf.actions.upsert.crmField = val
      }
      if (typ === 'overwrite') {
        crmConf.actions.upsert.overwrite = val
      }
    } else {
      if (typ === 'list') {
        crmConf.relatedlist.actions.upsert.crmField = val
      }
      if (typ === 'overwrite') {
        crmConf.relatedlist.actions.upsert.overwrite = val
      }
    }
    setCrmConf({ ...crmConf })
  }

  const openRecOwnerModal = () => {
    setActionMdl({ show: 'rec_owner' })
    getOwners()
  }

  return (
    <>
      <div className="d-flx flx-wrp">
        <TableCheckBox onChange={(e) => actionHandler(e, 'workflow')} checked={tab === 0 ? 'workflow' in crmConf.actions : 'workflow' in crmConf.relatedlist.actions} className="wdt-200 mt-4 mr-2" value="Workflow" title="Workflow" subTitle="Trigger CRM workflows" />
        <TableCheckBox onChange={() => setActionMdl({ show: 'attachment' })} checked={tab === 0 ? 'attachment' in crmConf.actions : 'attachment' in crmConf.relatedlist.actions} className="wdt-200 mt-4 mr-2" value="Attachment" title="Attachment" subTitle="Add attachments or signatures from BitFroms to CRM." />
        <TableCheckBox onChange={(e) => actionHandler(e, 'approval')} checked={tab === 0 ? 'approval' in crmConf.actions : 'approval' in crmConf.relatedlist.actions} className="wdt-200 mt-4 mr-2" value="Approval" title="Approval" subTitle="Send entries to CRM approval list." />
        <TableCheckBox onChange={(e) => actionHandler(e, 'gclid')} checked={tab === 0 ? 'gclid' in crmConf.actions : 'gclid' in crmConf.relatedlist.actions} className="wdt-200 mt-4 mr-2" value="Capture_GCLID" title="Capture GCLID" subTitle="Sends the click details of AdWords Ads to Zoho CRM." />
        <TableCheckBox onChange={(e) => actionHandler(e, 'upsert')} checked={tab === 0 ? 'upsert' in crmConf.actions : 'upsert' in crmConf.relatedlist.actions} className="wdt-200 mt-4 mr-2" value="Upsert_Record" title="Upsert Record" subTitle="The record is updated if it already exists else it is inserted as a new record." />
        <TableCheckBox onChange={(e) => actionHandler(e, 'assignment_rules')} checked={tab === 0 ? 'assignment_rules' in crmConf.actions : 'assignment_rules' in crmConf.relatedlist.actions} className="wdt-200 mt-4 mr-2" value="Assignment_Rules" title="Assignment Rules" subTitle="Trigger Assignment Rules in Zoho CRM." />
        <TableCheckBox onChange={() => setActionMdl({ show: 'tag_rec' })} checked={tab === 0 ? 'tag_rec' in crmConf.actions : 'tag_rec' in crmConf.relatedlist.actions} className="wdt-200 mt-4 mr-2" value="Tag_Records" title="Tag Records" subTitle="Add a tag to records pushed to Zoho CRM." />
        <TableCheckBox onChange={openRecOwnerModal} checked={tab === 0 ? 'rec_owner' in crmConf.actions : 'rec_owner' in crmConf.relatedlist.actions} className="wdt-200 mt-4 mr-2" value="Record_Owner" title="Record Owner" subTitle="Add a tag to records pushed to Zoho CRM." />
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
          defaultValue={tab === 0 ? crmConf.actions.attachment : crmConf.relatedlist.actions.attachment}
          className="mt-2 w-9"
          onChange={(val) => actionHandler(val, 'attachment')}
          options={formFields.filter(itm => (itm.type === 'file-up')).map(itm => ({ label: itm.name, value: itm.key }))}
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
          defaultValue={tab === 0 ? crmConf.actions.tag_rec : crmConf.relatedlist.actions.tag_rec}
          className="mt-2"
          singleSelect
          options={getTags()}
          onChange={(val) => actionHandler(val, 'tag_rec')}
        />
      </ConfirmModal>

      <ConfirmModal
        className="custom-conf-mdl"
        mainMdlCls="o-v"
        btnClass="blue"
        btnTxt="Ok"
        show={actionMdl.show === 'rec_owner'}
        close={clsActionMdl}
        action={clsActionMdl}
        title="Record Owner"
      >
        <div className="btcd-hr mt-1" />
        <small>Add a tag to records pushed to Zoho CRM</small>
        <div className="mt-3">Owner Name</div>
        <select
          className="mt-2 btcd-paper-inp"
        >
          {crmConf.default?.crmOwner?.map(owner => <option>{owner.full_name}</option>)}
        </select>
      </ConfirmModal>

      <Modal
        md
        show={upsertMdl}
        setModal={setUpsertMdl}
        title="Upsert Record"
      >
        <div className="o-a">
          {
            tab === 0
              ? crmConf?.actions?.upsert && (
                <>
                  <div className="font-w-m mt-2">Upsert Using</div>
                  <small>Arrange fields in order of preferance for upsertion</small>
                  <ReactSortable list={crmConf.actions.upsert?.crmField} setList={l => setUpsertSettings(l, 'list')}>
                    {crmConf.actions.upsert?.crmField.map((itm) => (
                      <div key={`cf-${itm.i}`} className="upsert_rec w-7 mt-1 flx">
                        <span className="btcd-icn btcd-mnu mr-2" />
                        {itm.name}
                      </div>
                    ))}
                  </ReactSortable>

                  <div className="font-w-m mt-3">Upsert Preferance</div>
                  <small>Overwrite existing field values in Zoho CRM with empty field values from Zoho Forms while upserting a record?</small>
                  <div>
                    <CheckBox onChange={() => setUpsertSettings(true, 'overwrite')} radio checked={crmConf.actions.upsert?.overwrite} name="up-rec" title="Yes" />
                    <CheckBox onChange={() => setUpsertSettings(false, 'overwrite')} radio checked={!crmConf.actions.upsert?.overwrite} name="up-rec" title="No" />
                  </div>
                </>
              )
              : crmConf?.relatedlist?.actions?.upsert && (
                <>
                  <div className="font-w-m mt-2">Upsert Using</div>
                  <small>Arrange fields in order of preferance for upsertion</small>
                  <ReactSortable list={crmConf.relatedlist.actions.upsert?.crmField} setList={l => setUpsertSettings(l, 'list')}>
                    {crmConf.relatedlist.actions?.upsert?.crmField.map((itm) => (
                      <div key={`cf-${itm.i}`} className="upsert_rec w-7 mt-1 flx">
                        <span className="btcd-icn btcd-mnu mr-2" />
                        {itm.name}
                      </div>
                    ))}
                  </ReactSortable>

                  <div className="font-w-m mt-3">Upsert Preferance</div>
                  <small>Overwrite existing field values in Zoho CRM with empty field values from Zoho Forms while upserting a record?</small>
                  <div>
                    <CheckBox onChange={() => setUpsertSettings(true, 'overwrite')} radio checked={crmConf.relatedlist.actions.upsert?.overwrite} name="up-rec" title="Yes" />
                    <CheckBox onChange={() => setUpsertSettings(false, 'overwrite')} radio checked={!crmConf.relatedlist.actions.upsert?.overwrite} name="up-rec" title="No" />
                  </div>
                </>
              )
          }
        </div>
      </Modal>
    </>
  )
}
