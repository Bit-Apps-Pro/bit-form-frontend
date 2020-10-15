/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from 'react'
import MultiSelect from 'react-multiple-select-dropdown-lite'
import CheckBox from '../../ElmSettings/Childs/CheckBox'
import TableCheckBox from '../../ElmSettings/Childs/TableCheckBox'
import Modal from '../../Modal'
import TitleModal from '../../TitleModal'

export default function ZohoAnalyticsActions({ analyticsConf, setAnalyticsConf, formFields }) {
  const [updateMdl, setUpdateMdl] = useState(false)
  const [actionMdl, setActionMdl] = useState({ show: false })
  const [permissions, setPermissions] = useState({})

  useEffect(() => {
    const permissionsObj = {
      read: [
        { apiName: 'ZOHO_READ', displayLabel: 'Read Access' },
        { apiName: 'ZOHO_EXPORT', displayLabel: 'Export Data' },
      ],
      write: [
        { apiName: 'ZOHO_ADDROW', displayLabel: 'Add Row' },
        { apiName: 'ZOHO_UPDATEROW', displayLabel: 'Modify Row' },
        { apiName: 'ZOHO_DELETEROW', displayLabel: 'Delete Row' },
        { apiName: 'ZOHO_DELETEALLROWS', displayLabel: 'Delete All' },
      ],
      import: [
        { apiName: 'ZOHO_IMPORT_APPEND', displayLabel: 'Only Append Rows' },
        { apiName: 'ZOHO_IMPORT_ADDORUPDATE', displayLabel: 'Add or Update Rows' },
        { apiName: 'ZOHO_IMPORT_DELETEALLADD', displayLabel: 'Delete All Rows and Add New Rows' },
      ],
      share: [
        { apiName: 'ZOHO_SHARE', displayLabel: 'Share View / Child Reports' },
      ],
    }

    setPermissions(permissionsObj)
  }, [])

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

  const handleShareSetting = (act, val, parent) => {
    const newConf = { ...analyticsConf }
    if (!newConf.actions?.share) newConf.actions.share = {}
    if (!newConf.actions.share.permissions) newConf.actions.share.permissions = { read: ['ZOHO_READ'] }

    if (act === 'parent') {
      if (!newConf.actions.share.permissions[val]) newConf.actions.share.permissions[val] = []

      const defaultPerms = permissions[val].map(perm => perm.apiName)

      if (defaultPerms.every(perm => newConf.actions.share.permissions[val].includes(perm))) {
        if (val === 'read') newConf.actions.share.permissions.read = ['ZOHO_READ']
        else delete newConf.actions.share.permissions[val]
      } else {
        newConf.actions.share.permissions[val] = defaultPerms
      }
    } else if (act === 'value') {
      if (!newConf.actions.share.permissions[parent]) newConf.actions.share.permissions[parent] = []
      const valIndx = newConf.actions.share.permissions[parent].indexOf(val)

      if (valIndx !== -1) {
        newConf.actions.share.permissions[parent].splice(valIndx, 1)
        if (!newConf.actions.share.permissions[parent].length) delete newConf.actions.share.permissions[parent]
      } else {
        newConf.actions.share.permissions[parent].push(val)
      }
    } else {
      newConf.actions.share[act] = val
    }

    setAnalyticsConf({ ...newConf })
  }

  // const openShareModal = () => {
  //   const newConf = { ...analyticsConf }
  //   if (!newConf.actions.share) {
  //     newConf.actions.share = {
  //       email: '',

  //     }
  //   }
  //   setAnalyticsConf({ ...newConf })
  // }

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

        <TableCheckBox checked={analyticsConf?.actions?.share?.email} onChange={() => setActionMdl({ show: 'share' })} className="wdt-200 mt-4 mr-2" value="user_share" title="Share Table" subTitle="Share Table with users pushed to Zoho Analytics." />
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

      <Modal
        md
        show={actionMdl.show === 'share'}
        setModal={() => setActionMdl({ show: false })}
        title="Share Settings"
      >
        <div className="o-a" style={{ height: '95%' }}>
          <div className="flx flx-between mt-2">
            <MultiSelect
              className="btcd-paper-drpdwn w-8 mr-2"
              placeholder="Input Email Address(s)"
              defaultValue={analyticsConf?.actions?.share?.email}
              onChange={(e) => handleShareSetting('email', e)}
              options={analyticsConf?.default?.users?.map(user => ({ label: user, value: user }))}
              customValue
            />

            <select className="btcd-paper-inp w-2" value={analyticsConf?.actions?.share?.field} onChange={(e) => handleShareSetting('field', e.target.value)}>
              <option value="">Field</option>
              {formFields.map(f => f.type !== 'file-up' && <option key={`ff-zhcrm-${f.key}`} value={`\${${f.key}}`}>{f.name}</option>)}
            </select>
          </div>
          <div className="btcd-hr mt-2" />
          <div className="mt-2 mb-1 font-w-m">Permissions Settings</div>
          <div className="btcd-hr mt-2" />
          {Object.keys(permissions).map(permission => (
            <div key={permission}>
              <CheckBox className="font-w-m btcd-ttc" onChange={() => handleShareSetting('parent', permission)} title={`${permission} Options`} checked={permissions[permission].map(perm => perm.apiName).every(perm => analyticsConf?.actions?.share?.permissions?.[permission]?.includes(perm))} />
              <div className="flx">
                {permissions[permission].map(perm => <CheckBox className="scl-7" key={perm.apiName} value="true" title={<span>{perm.displayLabel}</span>} sqr checked={analyticsConf.actions?.share?.permissions?.[permission]?.indexOf(perm.apiName) >= 0} onChange={() => handleShareSetting('value', perm.apiName, permission)} disabled={perm.apiName === 'ZOHO_READ' || false} />)}
              </div>
              <div className="btcd-hr mt-2" />
            </div>
          ))}
        </div>
      </Modal>
    </div>
  )
}
