/* eslint-disable no-param-reassign */
import React from 'react'
import TableCheckBox from '../../ElmSettings/Childs/TableCheckBox'

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

    setRecruitConf({ ...newConf })
  }

  return (
    <>
      <div className="d-flx flx-wrp">
        <TableCheckBox onChange={(e) => actionHandler(e, 'workflow')} checked={'workflow' in recruitConf.actions} className="wdt-200 mt-4 mr-2" value="Workflow" title="Workflow" subTitle="Trigger workflows in Zoho Recruit." />
        <TableCheckBox onChange={(e) => actionHandler(e, 'approval')} checked={'approval' in recruitConf.actions} className="wdt-200 mt-4 mr-2" value="Approval" title="Approval" subTitle="Send entries to approval list in Zoho Recruit." />
        <TableCheckBox onChange={(e) => actionHandler(e, 'upsert')} checked={'upsert' in recruitConf.actions} className="wdt-200 mt-4 mr-2" value="Upsert_Record" title="Upsert Record" subTitle="A record gets updated if the email already exists, else a new record will be created." />
      </div>
    </>
  )
}
