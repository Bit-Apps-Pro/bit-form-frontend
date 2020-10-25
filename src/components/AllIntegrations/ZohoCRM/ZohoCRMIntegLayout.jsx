import { Panel, Tab, Tabs } from '@bumaga/tabs'
import NewRecord from './NewRecord'
import RelatedRecord from './RelatedRecord'
import { refreshModules } from './ZohoCRMCommonFunc'

export default function ZohoCRMIntegLayout({ tab, settab, formID, formFields, handleInput, crmConf, setCrmConf, isLoading, setisLoading, setSnackbar }) {
  const addNewRelatedTab = () => {
    const newConf = { ...crmConf }

    if (newConf.relatedlists.length < 3) {
      newConf.relatedlists.push({
        actions: {},
        field_map: [{ formField: '', zohoFormField: '' }],
        layout: '',
        module: '',
        upload_field_map: [{ formField: '', zohoFormField: '' }],
      })
    }

    setCrmConf({ ...newConf })
  }

  const removeRelatedTab = indx => {
    const newConf = { ...crmConf }

    newConf.relatedlists.splice(indx, 1)

    if (!newConf.relatedlists.length) settab(0)

    setCrmConf({ ...newConf })
  }

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
      <div>
        <Tabs>
          <div className="flx mt-2">
            <Tab>
              <button className={`btcd-s-tab-link ${tab === 0 && 's-t-l-active'}`} type="button">
                New Record
              </button>
            </Tab>

            {crmConf?.relatedlists && crmConf.relatedlists.map((relatelist, indx) => (
              <>
                <Tab key={`t-${indx * 3}`}>
                  <button className={`btcd-s-tab-link ${tab === indx + 1 && 's-t-l-active'}`} type="button">
                    Related List #
                    {indx + 1}
                  </button>
                </Tab>
                <button onClick={() => removeRelatedTab(indx)} className="icn-btn" aria-label="delete-relatedlist" type="button"><span className="btcd-icn icn-clear" /></button>
              </>
            ))}
            {crmConf.relatedlists.length < 3 && <button onClick={addNewRelatedTab} className="icn-btn sh-sm ml-2 mr-2 tooltip" style={{ '--tooltip-txt': '"Add More Related List"' }} type="button">+</button>}
          </div>
          <div className="btcd-hr" />

          <Panel>
            <NewRecord
              tab={tab}
              settab={settab}
              formID={formID}
              formFields={formFields}
              crmConf={crmConf}
              setCrmConf={setCrmConf}
              handleInput={handleInput}
              isLoading={isLoading}
              setisLoading={setisLoading}
              setSnackbar={setSnackbar}
            />
          </Panel>
          {
            crmConf?.relatedlists && crmConf.relatedlists.map((relatelist, indx) => (
              <Panel key={`p-${indx + 2.4}`}>
                <RelatedRecord
                  indx={indx}
                  tab={tab}
                  settab={settab}
                  formID={formID}
                  formFields={formFields}
                  crmConf={crmConf}
                  setCrmConf={setCrmConf}
                  handleInput={handleInput}
                  isLoading={isLoading}
                  setisLoading={setisLoading}
                  setSnackbar={setSnackbar}
                />
              </Panel>
            ))
          }
        </Tabs>
      </div>
      <br />

    </>
  )
}
