/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from 'react'
import CheckBox from '../../ElmSettings/Childs/CheckBox'
import TableCheckBox from '../../ElmSettings/Childs/TableCheckBox'
import Modal from '../../Modal'
import TitleModal from '../../TitleModal'

export default function ZohoAnalyticsActions({ analyticsConf, setAnalyticsConf }) {
  const [updateMdl, setUpdateMdl] = useState(false)

  const actionHandler = (val, typ) => {
    const newConf = { ...analyticsConf }
    if (typ === 'update') {
      if (val.target.checked && !newConf?.actions?.update) {
        newConf.actions.update = { insert: true, criteria: '' }
        setUpdateMdl(true)
      } else {
        delete newConf.actions.update
      }
    }

    setAnalyticsConf({ ...newConf })
  }

  console.log('analyticsConf', analyticsConf)

  const setUpdateSettings = (val, typ) => {
    const newConf = { ...analyticsConf }
    if (typ === 'criteria') {
      newConf.actions.update.criteria = val
    }
    if (typ === 'insert') {
      newConf.actions.update.insert = val
    }
    setAnalyticsConf({ ...newConf })
  }

  const openUpdateModal = () => {
    if (!analyticsConf.actions?.update) {
      const newConf = { ...analyticsConf }
      newConf.actions.update = { insert: true, criteria: '' }
      setAnalyticsConf({ ...newConf })
    }

    setUpdateMdl(true)
  }

  useEffect(() => {
    if (!updateMdl && !analyticsConf.actions?.update?.criteria) {
      const newConf = { ...analyticsConf }
      delete newConf.actions.update
      setAnalyticsConf({ ...newConf })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateMdl])

  return (
    <div className="pos-rel">
      <div className="d-flx flx-wrp">
        <TitleModal action={openUpdateModal}>
          <TableCheckBox onChange={(e) => actionHandler(e, 'update')} checked={'update' in analyticsConf?.actions} className="wdt-200 mt-4 mr-2" value="Upsert_Record" title="Update Row" subTitle="Control how the row gets updated." />
        </TitleModal>
      </div>

      <Modal
        md
        show={updateMdl}
        setModal={setUpdateMdl}
        title="Update Row"
      >
        <div className="o-a">
          {analyticsConf?.actions?.update && (
            <>
              <small>Enter the criteria to update rows. Please use the below format.</small>
              <br />
              <div className="mt-4">
                <small>
                  Example:&nbsp;
                  {'("Table Name"."Department" = \'Finance\' and "Table Name"."Salary" < 9000 or "Table Name"."Country" = \'USA\')'}
                </small>
                <br />
                <br />
                <small>Here Department, Salary and Country are Zoho Analytics table column name</small>
                <span className="icn-btn ml-2 tooltip" style={{ '--tooltip-txt': '"Supported Arithmetic Operators: ( +, -, *, / ) and Supported Relational Operators: ( =, !=, <, >, <=, >=, LIKE, NOT LIKE, IN, NOT IN, BETWEEN )"', '--tt-wrap': 'wrap', '--tt-width': '225px', fontSize: 15 }}>
                  <span className="btcd-icn icn-information-outline" />
                </span>
                <textarea name="" rows="5" className="btcd-paper-inp mt-1" onChange={e => setUpdateSettings(e.target.value, 'criteria')} value={analyticsConf.actions?.update?.criteria} />
              </div>

              <div className="font-w-m mt-3">Update Preferance</div>
              <small>insert new row if the above criteria doesn&apos;t met?</small>
              <div>
                <CheckBox onChange={() => setUpdateSettings(true, 'insert')} radio checked={analyticsConf.actions.update?.insert} name="up-row" title="Yes" />
                <CheckBox onChange={() => setUpdateSettings(false, 'insert')} radio checked={!analyticsConf.actions.update?.insert} name="up-row" title="No" />
              </div>
            </>
          )}
        </div>
      </Modal>
    </div>
  )
}
