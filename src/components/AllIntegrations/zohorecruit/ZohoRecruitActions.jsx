/* eslint-disable no-param-reassign */
import { useState } from 'react';
import ConfirmModal from '../../ConfirmModal'
import TableCheckBox from '../../ElmSettings/Childs/TableCheckBox'

export default function ZohoRecruitActions({ recruitConf, setRecruitConf, tab }) {
  const [recOwnerMdl, setrecOwnerMdl] = useState(false)
  const actionHandler = (val, typ) => {
    const newConf = { ...recruitConf }
    if (tab === 0) {
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
    } else {
      if (typ === 'approval') {
        if (val.target.checked) {
          newConf.relatedlist.actions.approval = true
        } else {
          delete newConf.relatedlist.actions.approval
        }
      }
      if (typ === 'workflow') {
        if (val.target.checked) {
          newConf.relatedlist.actions.workflow = true
        } else {
          delete newConf.relatedlist.actions.workflow
        }
      }
      if (typ === 'recordOwner') {
        if (val !== '') {
          newConf.relatedlist.actions.recordOwner = val
        } else {
          delete newConf.relatedlist.actions.recordOwner
        }
      }
    }

    setRecruitConf({ ...newConf })
  }

  return (
    <>
      <div className="d-flx flx-wrp">
        {recruitConf?.relatedlist?.module !== 'Notes'
          && (
            <>
              <TableCheckBox onChange={(e) => actionHandler(e, 'workflow')} checked={tab === 0 ? 'workflow' in recruitConf.actions : 'workflow' in recruitConf.relatedlist.actions} className="wdt-200 mt-4 mr-2" value="Workflow" title="Workflow" subTitle="Trigger workflows in Zoho Recruit." />
              <TableCheckBox onChange={(e) => actionHandler(e, 'approval')} checked={tab === 0 ? 'approval' in recruitConf.actions : 'approval' in recruitConf.relatedlist.actions} className="wdt-200 mt-4 mr-2" value="Approval" title="Approval" subTitle="Send entries to approval list in Zoho Recruit." />
              {tab === 0 && <TableCheckBox onChange={(e) => actionHandler(e, 'upsert')} checked={'upsert' in recruitConf.actions} className="wdt-200 mt-4 mr-2" value="Upsert_Record" title="Upsert Record" subTitle="A record gets updated if the email already exists, else a new record will be created." />}
            </>
          )}
        <TableCheckBox onChange={() => setrecOwnerMdl(true)} checked={tab === 0 ? 'recordOwner' in recruitConf.actions : 'recordOwner' in recruitConf.relatedlist.actions} className="wdt-200 mt-4 mr-2" value="recordOwner" title="Record Owner" subTitle="Set owner of current record" />
      </div>
      <ConfirmModal
        className="custom-conf-mdl"
        mainMdlCls="o-v"
        btnClass="blue"
        btnTxt="Ok"
        show={recOwnerMdl}
        close={() => setrecOwnerMdl(false)}
        action={() => setrecOwnerMdl(false)}
        title="Record Owner"
      >
        <div className="btcd-hr mt-2 mb-2" />
        <div className="mt-2">Owner ID</div>
        <div className="flx flx-between">
          <input onChange={e => actionHandler(e.target.value, 'recordOwner')} className="btcd-paper-inp mt-2" type="number" min="0" value={tab === 0 ? (recruitConf?.actions?.recordOwner || '') : (recruitConf.relatedlist?.actions?.recordOwner || '')} placeholder="Enter Owner ID" />
        </div>

      </ConfirmModal>
    </>
  )
}
