/* eslint-disable no-param-reassign */
import React, { useState } from 'react'
import TableCheckBox from '../../ElmSettings/Childs/TableCheckBox'
import ConfirmModal from '../../ConfirmModal'

export default function ZohoRecruitActions({ recruitConf, setRecruitConf }) {
  const actionHandler = (val, typ) => {
    const newConf = { ...recruitConf }
    if (typ === 'approval') {
      if (val.target.checked) {
        newConf.actions.approval = true
      } else {
        delete newConf.actions.approval
      }
    }
    if (typ === 'workflow') {
      if (val.target.checked) {
        newConf.actions.workflow = true
      } else {
        delete newConf.actions.workflow
      }
    }
    if (typ === 'upsert') {
      if (val.target.checked) {
        newConf.actions.upsert = true
      } else {
        delete newConf.actions.upsert
      }
    }
    if (typ === 'recordOwner') {
      if (val !== '') {
        newConf.actions.recordOwner = val
      } else {
        delete newConf.actions.recordOwner
      }
    }

    setRecruitConf({ ...newConf })
  }

  const [recOwnerMdl, setrecOwnerMdl] = useState(false)
  const openRecOwnerModal = () => {
    setrecOwnerMdl(true)
  }

  const clsActionMdl = () => {
    setrecOwnerMdl(false)
  }

  return (
    <>
      <div className="d-flx flx-wrp">
        <TableCheckBox onChange={(e) => actionHandler(e, 'workflow')} checked={'workflow' in recruitConf.actions} className="wdt-200 mt-4 mr-2" value="Workflow" title="Workflow" subTitle="Trigger workflows in Zoho Recruit." />
        <TableCheckBox onChange={(e) => actionHandler(e, 'approval')} checked={'approval' in recruitConf.actions} className="wdt-200 mt-4 mr-2" value="Approval" title="Approval" subTitle="Send entries to approval list in Zoho Recruit." />
        <TableCheckBox onChange={(e) => actionHandler(e, 'upsert')} checked={'upsert' in recruitConf.actions} className="wdt-200 mt-4 mr-2" value="Upsert_Record" title="Upsert Record" subTitle="A record gets updated if the email already exists, else a new record will be created." />
        <TableCheckBox onChange={openRecOwnerModal} checked={'recordOwner' in recruitConf.actions} className="wdt-200 mt-4 mr-2" value="recordOwner" title="Record Owner" subTitle="Set owner of current record" />
      </div>
      <ConfirmModal
        className="custom-conf-mdl"
        mainMdlCls="o-v"
        btnClass="blue"
        btnTxt="Ok"
        show={recOwnerMdl}
        close={clsActionMdl}
        action={clsActionMdl}
        title="Record Owner"
      >
        <div className="btcd-hr mt-2 mb-2" />
        <small>Add an owner to Zoho Recruit record</small>
        <div className="mt-2">Owner ID</div>
        <div className="flx flx-between mt-2">
          <input onChange={e => actionHandler(e.target.value, 'recordOwner')} className="btcd-paper-inp mt-2" type="number" min="0" value={recruitConf?.actions?.recordOwner} placeholder="Enter Owner ID" />
        </div>

      </ConfirmModal>
    </>
  )
}
