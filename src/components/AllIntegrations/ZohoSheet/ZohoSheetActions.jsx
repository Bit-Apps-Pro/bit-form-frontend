/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from 'react'
import CheckBox from '../../ElmSettings/Childs/CheckBox'
import TableCheckBox from '../../ElmSettings/Childs/TableCheckBox'
import Modal from '../../Modal'
import TitleModal from '../../TitleModal'

export default function ZohoSheetActions({ sheetConf, setSheetConf }) {
  const [updateMdl, setUpdateMdl] = useState(false)

  const actionHandler = (val, typ) => {
    const newConf = { ...sheetConf }
    if (typ === 'update') {
      if (val.target.checked && !newConf?.actions?.update) {
        newConf.actions.update = { insert: true, criteria: '', firstMatch: false }
        setUpdateMdl(true)
      } else {
        delete newConf.actions.update
      }
    }

    setSheetConf({ ...newConf })
  }

  console.log('sheetConf', sheetConf)

  const setUpdateSettings = (val, typ) => {
    const newConf = { ...sheetConf }
    if (typ === 'criteria') {
      newConf.actions.update.criteria = val
    }
    if (typ === 'insert') {
      newConf.actions.update.insert = val
    }
    if (typ === 'firstMatch') {
      newConf.actions.update.firstMatch = val
    }
    setSheetConf({ ...newConf })
  }

  const openUpdateModal = () => {
    if (!sheetConf.actions?.update) {
      const newConf = { ...sheetConf }
      newConf.actions.update = { insert: true, criteria: '', firstMatch: false }
      setSheetConf({ ...newConf })
    }

    setUpdateMdl(true)
  }

  useEffect(() => {
    if (!updateMdl && !sheetConf.actions?.update?.criteria) {
      const newConf = { ...sheetConf }
      delete newConf.actions.update
      setSheetConf({ ...newConf })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateMdl])

  return (
    <div className="pos-rel">
      <div className="d-flx flx-wrp">
        <TitleModal action={openUpdateModal}>
          <TableCheckBox onChange={(e) => actionHandler(e, 'update')} checked={'update' in sheetConf?.actions} className="wdt-200 mt-4 mr-2" value="Upsert_Record" title="Update Row" subTitle="Control how the row gets updated." />
        </TitleModal>
      </div>

      <Modal
        md
        show={updateMdl}
        setModal={setUpdateMdl}
        title="Update Row"
      >
        <div className="o-a">
          {sheetConf?.actions?.update && (
            <>
              <small>Enter the criteria to update rows. Please use the below format.</small>
              <br />
              <div className="mt-4">
                <small>
                  Example:&nbsp;
                  {'("Month"="March" or "Month"="April") and "Amount">30'}
                </small>
                <br />
                <small>Here Month and Amount are Zoho Sheet&apos;s worksheet header name</small>
                {' '}
                <span className="icn-btn ml-2 tooltip" style={{ '--tooltip-txt': '"Supported Relational Operators: =, !=, <, >, <=, >=, contains"', fontSize: 15 }}>
                  <span className="btcd-icn icn-information-outline" />
                </span>
                <textarea name="" rows="5" className="btcd-paper-inp mt-1" onChange={e => setUpdateSettings(e.target.value, 'criteria')} value={sheetConf.actions?.update?.criteria} />
              </div>

              <div className="font-w-m mt-3">Update Preferance</div>
              <small>update row for first match only?</small>
              <div>
                <CheckBox onChange={() => setUpdateSettings(true, 'firstMatch')} radio checked={sheetConf.actions.update?.firstMatch} name="firstMatch" title="Yes" />
                <CheckBox onChange={() => setUpdateSettings(false, 'firstMatch')} radio checked={!sheetConf.actions.update?.firstMatch} name="firstMatch" title="No" />
              </div>
              <small>insert new row if the above criteria doesn&apos;t met?</small>
              <div>
                <CheckBox onChange={() => setUpdateSettings(true, 'insert')} radio checked={sheetConf.actions.update?.insert} name="up-row" title="Yes" />
                <CheckBox onChange={() => setUpdateSettings(false, 'insert')} radio checked={!sheetConf.actions.update?.insert} name="up-row" title="No" />
              </div>
            </>
          )}
        </div>
      </Modal>
    </div>
  )
}
