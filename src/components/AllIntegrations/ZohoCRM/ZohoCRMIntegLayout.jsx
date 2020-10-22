import Loader from '../../Loaders/Loader'
import { addFieldMap } from '../IntegrationHelpers/IntegrationHelpers'
import ZohoCRMActions from './ZohoCRMActions'
import { handleTabChange, refreshLayouts, refreshModules, refreshRelatedList } from './ZohoCRMCommonFunc'
import ZohoCRMFieldMap from './ZohoCRMFieldMap'

export default function ZohoCRMIntegLayout({ tab, settab, formID, formFields, handleInput, crmConf, setCrmConf, isLoading, setisLoading, setSnackbar }) {
  // eslint-disable-next-line no-undef
  const isPro = typeof bits !== 'undefined' && bits.isPro
  return (
    <>
      <br />
      <b className="wdt-100 d-in-b">Module:</b>
      <select onChange={handleInput} name="module" value={crmConf.module} className="btcd-paper-inp w-7" disabled={tab}>
        <option value="">Select Module</option>
        {
          crmConf?.default?.modules && Object.keys(crmConf.default.modules).map(moduleApiName => (
            <option key={moduleApiName} value={moduleApiName}>
              {crmConf.default.modules[moduleApiName].plural_label}
            </option>
          ))
        }
      </select>
      {tab === 0 && <button onClick={() => refreshModules(formID, crmConf, setCrmConf, setisLoading, setSnackbar)} className="icn-btn sh-sm ml-2 mr-2 tooltip" style={{ '--tooltip-txt': '"Refresh CRM Modules"' }} type="button" disabled={isLoading}>&#x21BB;</button>}
      <br />
      <div className="flx mt-2">
        <button onClick={() => handleTabChange(0, settab)} className={`btcd-s-tab-link ${tab === 0 && 's-t-l-active'}`} type="button">New Record</button>
        <button onClick={() => handleTabChange(1, settab, formID, crmConf, setCrmConf, setisLoading, setSnackbar)} className={`btcd-s-tab-link ${tab && 's-t-l-active'}`} type="button">Related List</button>
      </div>
      <br />
      {
        tab === 1
        && (
          <div className="pos-rel">
            {!isPro && (
              <div className="pro-blur flx w-9">
                <div className="pro">Available On <a href="https://bitpress.pro/" target="_blank"><span className="txt-pro">Premium</span></a></div>
              </div>)}
            <b className="wdt-100 d-in-b">Related List:</b>
            <select onChange={handleInput} name="module" value={crmConf?.relatedlist?.module} className="btcd-paper-inp w-7" disabled={!crmConf.module}>
              <option value="">Select Related Module</option>
              {
                crmConf?.default?.relatedlists?.[crmConf.module] && Object.values(crmConf.default.relatedlists[crmConf.module]).map(relatedlistApiName => (
                  <option key={relatedlistApiName.module} value={relatedlistApiName.module} >
                    {relatedlistApiName.name}
                  </option>
                ))
              }
            </select>
            <button onClick={() => refreshRelatedList(formID, crmConf, setCrmConf, setisLoading, setSnackbar)} className="icn-btn sh-sm ml-2 mr-2 tooltip" style={{ '--tooltip-txt': '"Refresh CRM Related Lists"' }} type="button" disabled={isLoading}>&#x21BB;</button>
            <br />
            <br />
          </div>
        )
      }
      <b className="wdt-100 d-in-b">Layout:</b>
      {
        tab === 0
          ? (
            <select onChange={handleInput} name="layout" value={crmConf.layout} className="btcd-paper-inp w-7">
              <option value="">Select Layout</option>
              {
                crmConf?.default?.layouts?.[crmConf.module] && Object.keys(crmConf.default.layouts[crmConf.module]).map(layoutApiName => (
                  <option key={layoutApiName} value={layoutApiName}>
                    {layoutApiName}
                  </option>
                ))
              }
            </select>
          )
          : (
            <select onChange={handleInput} name="layout" value={crmConf?.relatedlist?.layout} className="btcd-paper-inp w-7" disabled={!crmConf?.relatedlist?.module}>
              <option value="">Select Layout</option>
              {
                crmConf?.default?.layouts?.[crmConf.relatedlist?.module] && Object.keys(crmConf.default.layouts[crmConf.relatedlist.module]).map(layoutApiName => (
                  <option key={layoutApiName} value={layoutApiName}>
                    {layoutApiName}
                  </option>
                ))
              }
            </select>
          )
      }
      <button onClick={() => refreshLayouts(tab, formID, crmConf, setCrmConf, setisLoading, setSnackbar)} className="icn-btn sh-sm ml-2 mr-2 tooltip" style={{ '--tooltip-txt': '"Refresh CRM Layouts"' }} type="button" disabled={isLoading}>&#x21BB;</button>
      <br />
      <br />
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
        && crmConf.default?.layouts?.[crmConf.module]?.[crmConf.layout]?.fields
        && (
          <>
            <div className="mt-4"><b className="wdt-100">Field Map</b></div>
            <div className="btcd-hr mt-1" />
            <div className="flx flx-around mt-2 mb-1">
              <div className="txt-dp"><b>Form Fields</b></div>
              <div className="txt-dp"><b>Zoho Fields</b></div>
            </div>

            {crmConf.field_map.map((itm, i) => (
              <ZohoCRMFieldMap
                key={`crm-m-${i + 9}`}
                i={i}
                field={itm}
                crmConf={crmConf}
                formFields={formFields}
                setCrmConf={setCrmConf}
                tab={tab}
                setSnackbar={setSnackbar}
              />
            ))}
            <div className="txt-center  mt-2" style={{ marginRight: 85 }}><button onClick={() => addFieldMap(crmConf.field_map.length, crmConf, setCrmConf, false, tab)} className="icn-btn sh-sm" type="button">+</button></div>
            <br />
            <br />
            {Object.keys(crmConf.default.layouts[crmConf.module][crmConf.layout]?.fileUploadFields).length !== 0 && (
              <div className="pos-rel">
                {!isPro && (
                  <div className="pro-blur flx">
                    <div className="pro">Available On <a href="https://bitpress.pro/" target="_blank"><span className="txt-pro">Premium</span></a></div>
                  </div>)}
                <div className="mt-4"><b className="wdt-100">Map File Upload Fields</b></div>
                <div className="btcd-hr mt-1" />
                <div className="flx flx-around mt-2 mb-1">
                  <div className="txt-dp"><b>Form Fields</b></div>
                  <div className="txt-dp"><b>Zoho Fields</b></div>
                </div>

                {crmConf.upload_field_map.map((itm, i) => (
                  <ZohoCRMFieldMap
                    key={`crm-m-${i + 9}`}
                    i={i}
                    uploadFields
                    field={itm}
                    crmConf={crmConf}
                    formFields={formFields}
                    setCrmConf={setCrmConf}
                    tab={tab}
                    setSnackbar={setSnackbar}
                  />
                ))}
                <div className="txt-center  mt-2" style={{ marginRight: 85 }}><button onClick={() => addFieldMap(crmConf.upload_field_map.length, crmConf, setCrmConf, true, tab)} className="icn-btn sh-sm" type="button">+</button></div>
                <br />
                <br />
              </div>
            )}
            <div className="mt-4"><b className="wdt-100">Actions</b></div>
            <div className="btcd-hr mt-1" />

            <ZohoCRMActions
              formID={formID}
              formFields={formFields}
              crmConf={crmConf}
              setCrmConf={setCrmConf}
              tab={tab}
              formID={formID}
              setSnackbar={setSnackbar}
            />
          </>
        )}
      {tab === 1
        && crmConf.default?.layouts?.[crmConf?.relatedlist?.module]?.[crmConf?.relatedlist?.layout]?.fields
        && (
          <>
            <div className="mt-4"><b className="wdt-100">Field Map</b></div>
            <div className="btcd-hr mt-1" />
            <div className="flx flx-around mt-2 mb-1">
              <div className="txt-dp"><b>Form Fields</b></div>
              <div className="txt-dp"><b>Zoho Fields</b></div>
            </div>

            {crmConf.relatedlist.field_map?.map((itm, i) => (
              <ZohoCRMFieldMap
                key={`crm-m-${i + 9}`}
                i={i}
                field={itm}
                crmConf={crmConf}
                formFields={formFields}
                setCrmConf={setCrmConf}
                tab={tab}
                setSnackbar={setSnackbar}
              />
            ))}
            <div className="txt-center  mt-2" style={{ marginRight: 85 }}><button onClick={() => addFieldMap(crmConf.relatedlist.field_map.length, crmConf, setCrmConf, false, tab)} className="icn-btn sh-sm" type="button">+</button></div>
            <br />
            <br />
            {crmConf.default?.layouts[crmConf.relatedlist.module]?.[crmConf.relatedlist.layout] && Object.keys(crmConf.default.layouts[crmConf.relatedlist.module][crmConf.relatedlist.layout].fileUploadFields).length !== 0 && (
              <>
                <div className="mt-4"><b className="wdt-100">File Upload Field Map</b></div>
                <div className="btcd-hr mt-1" />
                <div className="flx flx-around mt-2 mb-1">
                  <div className="txt-dp"><b>Form Fields</b></div>
                  <div className="txt-dp"><b>Zoho Fields</b></div>
                </div>

                {crmConf.relatedlist.upload_field_map.map((itm, i) => (
                  <ZohoCRMFieldMap
                    key={`crm-m-${i + 9}`}
                    i={i}
                    uploadFields={1}
                    field={itm}
                    crmConf={crmConf}
                    formFields={formFields}
                    setCrmConf={setCrmConf}
                    tab={tab}
                    setSnackbar={setSnackbar}
                  />
                ))}
                <div className="txt-center  mt-2" style={{ marginRight: 85 }}><button onClick={() => addFieldMap(crmConf.relatedlist.upload_field_map.length, crmConf, setCrmConf, true, tab)} className="icn-btn sh-sm" type="button">+</button></div>
                <br />
                <br />
              </>
            )}
            <div className="mt-4"><b className="wdt-100">Actions</b></div>
            <div className="btcd-hr mt-1" />

            <ZohoCRMActions
              formFields={formFields}
              crmConf={crmConf}
              setCrmConf={setCrmConf}
              tab={tab}
              formID={formID}
              setSnackbar={setSnackbar}
            />
          </>
        )}
    </>
  )
}
