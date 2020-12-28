import { Panel, Tab, Tabs } from '@bumaga/tabs'
// eslint-disable-next-line import/no-extraneous-dependencies
import { __ } from '@wordpress/i18n'
import ZohoRecruitNewRecord from './ZohoRecruitNewRecord'
import ZohoRecruitRelatedRecord from './ZohoRecruitRelatedRecord'
import { refreshModules } from './ZohoRecruitCommonFunc'

export default function ZohoRecruitIntegLayout({ tab, settab, formID, formFields, handleInput, recruitConf, setRecruitConf, isLoading, setisLoading, setSnackbar }) {
  const addNewRelatedTab = () => {
    const newConf = { ...recruitConf }

    if (newConf.relatedlists.length < 3) {
      newConf.relatedlists.push({
        actions: {},
        field_map: [{ formField: '', zohoFormField: '' }],
        module: '',
        upload_field_map: [{ formField: '', zohoFormField: '' }],
      })
    }

    setRecruitConf({ ...newConf })
  }

  const removeRelatedTab = indx => {
    const newConf = { ...recruitConf }

    newConf.relatedlists.splice(indx, 1)

    if (!newConf.relatedlists.length) settab(0)

    setRecruitConf({ ...newConf })
  }
  return (
    <>
      <br />
      <b className="wdt-100 d-in-b">Module:</b>
      <select onChange={handleInput} name="module" value={recruitConf.module} className="btcd-paper-inp w-7" disabled={tab === 1}>
        <option value="">{__('Select Module', 'bitform')}</option>
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
      <Tabs>
        <div className="flx mt-2">
          <Tab>
            <button className={`btcd-s-tab-link ${tab === 0 && 's-t-l-active'}`} type="button">
              {__('New Record', 'bitform')}
            </button>
          </Tab>

          {recruitConf?.relatedlists && recruitConf.relatedlists.map((relatelist, indx) => (
            <>
              <Tab key={`rel-${indx + 64}`}>
                <button className={`btcd-s-tab-link ${tab === indx + 1 && 's-t-l-active'}`} type="button">
                  {__('Related List #', 'bitform')}
                  {indx + 1}
                </button>
              </Tab>
              <button onClick={() => removeRelatedTab(indx)} className="icn-btn" aria-label="delete-relatedlist" type="button"><span className="btcd-icn icn-clear" /></button>
            </>
          ))}
          {recruitConf.relatedlists.length < 3 && <button onClick={addNewRelatedTab} className="icn-btn sh-sm ml-2 mr-2 tooltip" style={{ '--tooltip-txt': '"Add More Related List"' }} type="button">+</button>}
        </div>
        <div className="btcd-hr" />

        <Panel>
          <ZohoRecruitNewRecord
            tab={tab}
            settab={settab}
            formID={formID}
            formFields={formFields}
            recruitConf={recruitConf}
            setRecruitConf={setRecruitConf}
            isLoading={isLoading}
            setSnackbar={setSnackbar}
          />
        </Panel>
        {
          recruitConf?.relatedlists && recruitConf.relatedlists.map((relatelist, indx) => (
            <Panel key={`rlt-${indx + 89}`}>
              <ZohoRecruitRelatedRecord
                indx={indx}
                tab={tab}
                settab={settab}
                formID={formID}
                formFields={formFields}
                recruitConf={recruitConf}
                setRecruitConf={setRecruitConf}
                handleInput={handleInput}
                isLoading={isLoading}
                setisLoading={setisLoading}
                setSnackbar={setSnackbar}
              />
            </Panel>
          ))
        }
      </Tabs>
    </>
  )
}
