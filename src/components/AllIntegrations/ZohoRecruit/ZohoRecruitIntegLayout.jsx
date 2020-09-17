import React from 'react'
import Loader from '../../Loaders/Loader'
import { addFieldMap } from '../IntegrationHelpers/IntegrationHelpers'
import ZohoRecruitActions from './ZohoRecruitActions'
import { handleTabChange, refreshModules, refreshRelatedList } from './ZohoRecruitCommonFunc'
import ZohoRecruitFieldMap from './ZohoRecruitFieldMap'

export default function ZohoRecruitIntegLayout({ tab, settab, formID, formFields, handleInput, recruitConf, setRecruitConf, isLoading, setisLoading, setSnackbar }) {
  return (
    <>
      <br />
      <b className="wdt-100 d-in-b">Module:</b>
      <select onChange={handleInput} name="module" value={recruitConf.module} className="btcd-paper-inp w-7" disabled={tab === 1}>
        <option value="">Select Module</option>
        {
          recruitConf.default && recruitConf.default.modules && Object.keys(recruitConf.default.modules).map(moduleApiName => (
            <option key={moduleApiName} value={moduleApiName}>
              {recruitConf.default.modules[moduleApiName].pl}
            </option>
          ))
        }
      </select>
      {tab === 0 && <button onClick={() => refreshModules(formID, recruitConf, setRecruitConf, setisLoading, setSnackbar)} className="icn-btn sh-sm ml-2 mr-2 tooltip" style={{ '--tooltip-txt': '"Refresh Recruit Modules"' }} type="button" disabled={isLoading}>&#x21BB;</button>}
      <br />
      <div className="flx mt-2">
        <button onClick={() => handleTabChange(0, settab)} className={`btcd-s-tab-link ${tab === 0 && 's-t-l-active'}`} type="button">New Record</button>
        <button onClick={() => handleTabChange(1, settab, recruitConf, setRecruitConf, formID, setisLoading, setSnackbar)} className={`btcd-s-tab-link ${tab === 1 && 's-t-l-active'}`} type="button">Related List</button>
      </div>
      <div className="btcd-hr" />
      <br />
      {
        tab === 1
        && (
          <>
            <b className="wdt-100 d-in-b">Related List:</b>
            <select onChange={event => handleInput(event, tab)} name="module" value={recruitConf?.relatedlist?.module} className="btcd-paper-inp w-7" disabled={!recruitConf.module}>
              <option value="">Select Related Module</option>
              {
                recruitConf?.default.relatedlists?.[recruitConf.module] && Object.values(recruitConf.default.relatedlists[recruitConf.module]).map(relatedlistApiName => (
                  <option key={relatedlistApiName.aMod} value={relatedlistApiName.aMod}>
                    {relatedlistApiName.pl}
                  </option>
                ))
              }
            </select>
            <button onClick={() => refreshRelatedList(formID, recruitConf, setRecruitConf, setisLoading, setSnackbar)} className="icn-btn sh-sm ml-2 mr-2 tooltip" style={{ '--tooltip-txt': '"Refresh CRM Related Lists"' }} type="button" disabled={isLoading}>&#x21BB;</button>
            <br />
            <br />
          </>
        )
      }
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
      {tab === 0
        && recruitConf.default?.moduleData?.[recruitConf.module]?.fields
        && (
          <>
            <div className="mt-4"><b className="wdt-100">Map Fields</b></div>
            <div className="btcd-hr mt-1" />
            <div className="flx flx-around mt-2 mb-1">
              <div className="txt-dp"><b>Form Fields</b></div>
              <div className="txt-dp"><b>Zoho Fields</b></div>
            </div>

            {recruitConf.field_map.map((itm, i) => (
              <ZohoRecruitFieldMap
                key={`recruit-m-${i + 9}`}
                i={i}
                field={itm}
                recruitConf={recruitConf}
                formFields={formFields}
                setRecruitConf={setRecruitConf}
                tab={tab}
                setSnackbar={setSnackbar}
              />
            ))}
            <div className="txt-center  mt-2" style={{ marginRight: 85 }}><button onClick={() => addFieldMap(recruitConf.field_map.length, recruitConf, setRecruitConf, false, tab)} className="icn-btn sh-sm" type="button">+</button></div>
            <br />
            <br />
            {Object.keys(recruitConf.default?.moduleData?.[recruitConf.module]?.fileUploadFields).length !== 0 && (
              <>
                <div className="mt-4"><b className="wdt-100">Map Attachments</b></div>
                <div className="btcd-hr mt-1" />
                <div className="flx flx-around mt-2 mb-1">
                  <div className="txt-dp"><b>Form Fields</b></div>
                  <div className="txt-dp"><b>Zoho Fields</b></div>
                </div>

                {recruitConf.upload_field_map.map((itm, i) => (
                  <ZohoRecruitFieldMap
                    key={`crm-m-${i + 9}`}
                    uploadFields={1}
                    i={i}
                    field={itm}
                    recruitConf={recruitConf}
                    formFields={formFields}
                    setRecruitConf={setRecruitConf}
                    tab={tab}
                    setSnackbar={setSnackbar}
                  />
                ))}
                <div className="txt-center  mt-2" style={{ marginRight: 85 }}><button onClick={() => addFieldMap(recruitConf.upload_field_map.length, recruitConf, setRecruitConf, true, tab)} className="icn-btn sh-sm" type="button">+</button></div>
                <br />
                <br />
              </>
            )}
            <div className="mt-4"><b className="wdt-100">Actions</b></div>
            <div className="btcd-hr mt-1" />

            <ZohoRecruitActions
              recruitConf={recruitConf}
              setRecruitConf={setRecruitConf}
              tab={tab}
            />
          </>
        )}
      {tab === 1
        && recruitConf.default?.moduleData?.[recruitConf.relatedlist.module]?.fields
        && (
          <>
            <div className="mt-4"><b className="wdt-100">Map Fields</b></div>
            <div className="btcd-hr mt-1" />
            <div className="flx flx-around mt-2 mb-1">
              <div className="txt-dp"><b>Form Fields</b></div>
              <div className="txt-dp"><b>Zoho Fields</b></div>
            </div>

            {recruitConf.relatedlist.field_map.map((itm, i) => (
              <ZohoRecruitFieldMap
                key={`crm-m-${i + 9}`}
                i={i}
                field={itm}
                recruitConf={recruitConf}
                formFields={formFields}
                setRecruitConf={setRecruitConf}
                tab={tab}
              />
            ))}
            <div className="txt-center  mt-2" style={{ marginRight: 85 }}><button onClick={() => addFieldMap(recruitConf.relatedlist.field_map.length, recruitConf, setRecruitConf, false, tab)} className="icn-btn sh-sm" type="button">+</button></div>
            <br />
            <br />
            {Object.keys(recruitConf.default?.moduleData?.[recruitConf.relatedlist.module]?.fileUploadFields).length !== 0 && (
              <>
                <div className="mt-4"><b className="wdt-100">Map Attachments</b></div>
                <div className="btcd-hr mt-1" />
                <div className="flx flx-around mt-2 mb-1">
                  <div className="txt-dp"><b>Form Fields</b></div>
                  <div className="txt-dp"><b>Zoho Fields</b></div>
                </div>

                {recruitConf.relatedlist.upload_field_map.map((itm, i) => (
                  <ZohoRecruitFieldMap
                    key={`crm-m-${i + 9}`}
                    uploadFields={1}
                    i={i}
                    field={itm}
                    recruitConf={recruitConf}
                    formFields={formFields}
                    setRecruitConf={setRecruitConf}
                    tab={tab}
                  />
                ))}
                <div className="txt-center  mt-2" style={{ marginRight: 85 }}><button onClick={() => addFieldMap(recruitConf.relatedlist.upload_field_map.length, recruitConf, setRecruitConf, true, tab)} className="icn-btn sh-sm" type="button">+</button></div>
                <br />
                <br />
              </>
            )}
            <div className="mt-4"><b className="wdt-100">Actions</b></div>
            <div className="btcd-hr mt-1" />

            <ZohoRecruitActions
              recruitConf={recruitConf}
              setRecruitConf={setRecruitConf}
              tab={tab}
            />
          </>
        )}
    </>
  )
}
