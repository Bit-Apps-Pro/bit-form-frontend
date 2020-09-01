/* eslint-disable no-param-reassign */
import React, { useState } from 'react'
import TableCheckBox from '../../ElmSettings/Childs/TableCheckBox'
import CheckBox from '../../ElmSettings/Childs/CheckBox'
import Modal from '../../Modal'
import TitleModal from '../../TitleModal'

export default function ZohoCampaignsActions({ campaignsConf, setCampaignsConf }) {
  const [updateMdl, setUpdateMdl] = useState(false)

  const actionHandler = (val, typ) => {
    const newConf = { ...campaignsConf }
    if (typ === 'update') {
      if (val.target.checked) {
        newConf.actions.update = { insert: true, criteria: '' }
      } else {
        delete newConf.actions.update
      }
    }

    setCampaignsConf({ ...newConf })
  }

  console.log('campaignsConf', campaignsConf)

  const setUpdateSettings = (val, typ) => {
    const newConf = { ...campaignsConf }
    if (typ === 'criteria') {
      newConf.actions.update.criteria = val
    }
    if (typ === 'insert') {
      newConf.actions.update.insert = val
    }
    setCampaignsConf({ ...newConf })
  }

  const openUpdateModal = () => {
    if (!campaignsConf.actions?.update) {
      const newConf = { ...campaignsConf }
      newConf.actions.update = { insert: true, criteria: '' }
      setCampaignsConf({ ...newConf })
    }

    setUpdateMdl(true)
  }

  return (
    <div className="pos-rel">
      <div className="d-flx flx-wrp">
        <TitleModal action={openUpdateModal}>
          <TableCheckBox onChange={(e) => actionHandler(e, 'update')} checked={'update' in campaignsConf?.actions} className="wdt-200 mt-4 mr-2" value="Upsert_Record" title="Update Row" subTitle="Control how the row gets updated." />
        </TitleModal>
      </div>

      <Modal
        md
        show={updateMdl}
        setModal={setUpdateMdl}
        title="Update Row"
      >
        <div className="o-a">
          {campaignsConf?.actions?.update && (
            <>
              <small>Enter the criteria to update rows. Please use the below format.</small>
              <br />
              <div className="mt-4">
                <small>
                  Example:&nbsp;
                  {'("Table Name"."Department" = \'Finance\' and "Table Name"."Salary" < 9000 or "Table Name"."Country" = \'USA\')'}
                </small>
                <br />
                <small>Here Department, Salary and Country are Zoho Campaigns table column name</small>
                {' '}
                <button className="icn-btn sh-sm ml-2 mr-2 tooltip" style={{ '--tooltip-txt': '"Supported Arithmetic Operators: +, -, *, /"' }} type="button">
                  <span className="btcd-icn icn-information-outline" />
                </button>
                <button className="icn-btn sh-sm ml-2 mr-2 tooltip" style={{ '--tooltip-txt': '"Supported Relational Operators: =, !=, <, >, <=, >=, LIKE, NOT LIKE, IN, NOT IN, BETWEEN"' }} type="button">
                  <span className="btcd-icn icn-information-outline" />
                </button>
                <textarea name="" rows="5" className="btcd-paper-inp mt-1" onChange={e => setUpdateSettings(e.target.value, 'criteria')} value={campaignsConf.actions?.update?.criteria} />
              </div>

              <div className="font-w-m mt-3">Update Preferance</div>
              <small>insert new row if the above criteria doesn&apos;t met?</small>
              <div>
                <CheckBox onChange={() => setUpdateSettings(true, 'insert')} radio checked={campaignsConf.actions.update?.insert} name="up-row" title="Yes" />
                <CheckBox onChange={() => setUpdateSettings(false, 'insert')} radio checked={!campaignsConf.actions.update?.insert} name="up-row" title="No" />
              </div>
            </>
          )}
        </div>
      </Modal>
    </div>
  )
}
