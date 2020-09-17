import React from 'react'
import ConfirmModal from '../../ConfirmModal'
import Loader from '../../Loaders/Loader'
import { addFieldMap } from '../IntegrationHelpers/IntegrationHelpers'
import ZohoAnalyticsActions from './ZohoAnalyticsActions'
import { refreshTableHeaders, refreshTables, refreshWorkspaces } from './ZohoAnalyticsCommonFunc'
import ZohoAnalyticsFieldMap from './ZohoAnalyticsFieldMap'

export default function ZohoAnalyticsIntegLayout({ formID, formFields, handleInput, analyticsConf, setAnalyticsConf, isLoading, setisLoading, setSnackbar, actionMdl, setActionMdl, action }) {
  return (
    <>
      <br />
      <b className="wdt-100 d-in-b">Workspace:</b>
      <select onChange={handleInput} name="workspace" value={analyticsConf.workspace} className="btcd-paper-inp w-7">
        <option value="">Select Workspace</option>
        {
          analyticsConf?.default?.workspaces && analyticsConf.default.workspaces.map(workspaceApiName => (
            <option key={workspaceApiName} value={workspaceApiName}>
              {workspaceApiName}
            </option>
          ))
        }
      </select>
      <button onClick={() => refreshWorkspaces(formID, analyticsConf, setAnalyticsConf, setisLoading, setSnackbar)} className="icn-btn sh-sm ml-2 mr-2 tooltip" style={{ '--tooltip-txt': '"Refresh Analytics Workspaces"' }} type="button" disabled={isLoading}>&#x21BB;</button>
      <br />
      <br />
      <b className="wdt-100 d-in-b">Table:</b>
      <select onChange={handleInput} name="table" value={analyticsConf.table} className="btcd-paper-inp w-7">
        <option value="">Select Table</option>
        {
          analyticsConf?.default?.tables?.[analyticsConf.workspace] && analyticsConf.default.tables[analyticsConf.workspace].map(tableApiName => (
            <option key={tableApiName} value={tableApiName}>
              {tableApiName}
            </option>
          ))
        }
      </select>
      <button onClick={() => refreshTables(formID, analyticsConf, setAnalyticsConf, setisLoading, setSnackbar)} className="icn-btn sh-sm ml-2 mr-2 tooltip" style={{ '--tooltip-txt': '"Refresh Analytics Tables"' }} type="button" disabled={isLoading}>&#x21BB;</button>
      <br />
      <br />
      <small style={{ color: 'red', marginLeft: 100 }}>** Zoho Analytics doesn&apos;t support data INSERT / UPDATE in other integration table</small>

      {isLoading && (
        <Loader style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 100,
          transform: 'scale(0.7)',
        }}
        />
      )}
      {analyticsConf.default?.tables?.headers?.[analyticsConf.table]
        && (
          <>
            <div className="mt-4">
              <b className="wdt-100">Map Fields</b>
              <button onClick={() => refreshTableHeaders(formID, analyticsConf, setAnalyticsConf, setisLoading, setSnackbar)} className="icn-btn sh-sm ml-2 mr-2 tooltip" style={{ '--tooltip-txt': '"Refresh Analytics Table Headers"' }} type="button" disabled={isLoading}>&#x21BB;</button>
            </div>
            <div className="btcd-hr mt-1" />
            <div className="flx flx-around mt-2 mb-1">
              <div className="txt-dp"><b>Form Fields</b></div>
              <div className="txt-dp"><b>Zoho Fields</b></div>
            </div>

            {analyticsConf.field_map.map((itm, i) => (
              <ZohoAnalyticsFieldMap
                key={`analytics-m-${i + 9}`}
                i={i}
                field={itm}
                analyticsConf={analyticsConf}
                formFields={formFields}
                setAnalyticsConf={setAnalyticsConf}
              />
            ))}
            <div className="txt-center  mt-2" style={{ marginRight: 85 }}><button onClick={() => addFieldMap(analyticsConf.field_map.length, analyticsConf, setAnalyticsConf)} className="icn-btn sh-sm" type="button">+</button></div>
            <br />
            <br />
            <div className="mt-4"><b className="wdt-100">Actions</b></div>
            <div className="btcd-hr mt-1" />

            <ZohoAnalyticsActions
              analyticsConf={analyticsConf}
              setAnalyticsConf={setAnalyticsConf}
            />
          </>
        )}

      <ConfirmModal
        className="custom-conf-mdl"
        mainMdlCls="o-v"
        btnClass="red"
        btnTxt="Ok"
        show={actionMdl.show === 'criteria'}
        close={() => setActionMdl({ show: false })}
        action={action}
        title="Warning!!!"
        warning
      >
        <div className="btcd-hr mt-2" />
        <div className="mt-5">Without any criteria, all data of table will get replaced.</div>
      </ConfirmModal>
    </>
  )
}
