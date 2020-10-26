import Loader from '../../Loaders/Loader'
import { addFieldMap } from '../IntegrationHelpers/IntegrationHelpers'
import { refreshFields, refreshApplications, refreshForms } from './ZohoCreatorCommonFunc'
import ZohoCreatorFieldMap from './ZohoCreatorFieldMap'

export default function ZohoCreatorIntegLayout({ formID, formFields, handleInput, creatorConf, setCreatorConf, isLoading, setisLoading, setSnackbar }) {
  return (
    <>
      <br />
      <b className="wdt-100 d-in-b">Application:</b>
      <select onChange={handleInput} name="applicationId" value={creatorConf.applicationId} className="btcd-paper-inp w-7">
        <option value="">Select Application</option>
        {
          creatorConf?.default?.applications && Object.values(creatorConf.default.applications).map(application => (
            <option key={application.applicationId} value={application.applicationId}>
              {application.applicationName}
            </option>
          ))
        }
      </select>
      <button onClick={() => refreshApplications(formID, creatorConf, setCreatorConf, setisLoading, setSnackbar)} className="icn-btn sh-sm ml-2 mr-2 tooltip" style={{ '--tooltip-txt': '"Refresh Creator Portals"' }} type="button" disabled={isLoading}>&#x21BB;</button>
      <br />
      <br />
      <b className="wdt-100 d-in-b">Form:</b>
      <select onChange={handleInput} name="formId" value={creatorConf.formId} className="btcd-paper-inp w-7">
        <option value="">Select Form</option>
        {
          creatorConf?.default?.forms?.[creatorConf.applicationId] && Object.values(creatorConf.default.forms[creatorConf.applicationId]).map(form => (
            <option key={form.formId} value={form.formId}>
              {form.formName}
            </option>
          ))
        }
      </select>
      <button onClick={() => refreshForms(formID, creatorConf, setCreatorConf, setisLoading, setSnackbar)} className="icn-btn sh-sm ml-2 mr-2 tooltip" style={{ '--tooltip-txt': '"Refresh Creator Departments"' }} type="button" disabled={isLoading}>&#x21BB;</button>
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

      {creatorConf.formId && (
        <>
          <div className="mt-4">
            <b className="wdt-100">Map Fields</b>
            <button onClick={() => refreshFields(formID, creatorConf, setCreatorConf, setisLoading, setSnackbar)} className="icn-btn sh-sm ml-2 mr-2 tooltip" style={{ '--tooltip-txt': '"Refresh Creator Fields"' }} type="button" disabled={isLoading}>&#x21BB;</button>
          </div>
          <div className="btcd-hr mt-1" />
          {creatorConf.default?.fields?.[creatorConf?.applicationId]?.[creatorConf?.formId]
            && (
              <>
                <div className="flx flx-around mt-2 mb-1">
                  <div className="txt-dp"><b>Form Fields</b></div>
                  <div className="txt-dp"><b>Zoho Fields</b></div>
                </div>

                {creatorConf.field_map.map((itm, i) => (
                  <ZohoCreatorFieldMap
                    key={`creator-m-${i + 9}`}
                    i={i}
                    field={itm}
                    creatorConf={creatorConf}
                    formFields={formFields}
                    setCreatorConf={setCreatorConf}
                  />
                ))}
                <div className="txt-center  mt-2" style={{ marginRight: 85 }}><button onClick={() => addFieldMap(creatorConf.field_map.length, creatorConf, setCreatorConf)} className="icn-btn sh-sm" type="button">+</button></div>
                <br />
                <br />
                {Object.keys(creatorConf.default.fields[creatorConf.applicationId][creatorConf.formId]?.fileUploadFields).length !== 0 && (
                  <>
                    <div className="mt-4"><b className="wdt-100">Map File Upload Fields</b></div>
                    <div className="btcd-hr mt-1" />
                    <div className="flx flx-around mt-2 mb-1">
                      <div className="txt-dp"><b>Form Fields</b></div>
                      <div className="txt-dp"><b>Zoho Fields</b></div>
                    </div>

                    {creatorConf?.upload_field_map?.map((itm, i) => (
                      <ZohoCreatorFieldMap
                        key={`creator-m-${i + 9}`}
                        i={i}
                        field={itm}
                        creatorConf={creatorConf}
                        formFields={formFields}
                        setCreatorConf={setCreatorConf}
                        uploadFields
                      />
                    ))}
                    <div className="txt-center  mt-2" style={{ marginRight: 85 }}><button onClick={() => addFieldMap(creatorConf.upload_field_map.length, creatorConf, setCreatorConf, true)} className="icn-btn sh-sm" type="button">+</button></div>
                    <br />
                    <br />
                  </>
                )}
                {/* <div className="mt-4"><b className="wdt-100">Actions</b></div>
                <div className="btcd-hr mt-1" />

                <ZohoCreatorActions
                  creatorConf={creatorConf}
                  setCreatorConf={setCreatorConf}
                  formID={formID}
                  formFields={formFields}
                  setSnackbar={setSnackbar}
                /> */}
              </>
            )}
        </>
      )}
    </>
  )
}
