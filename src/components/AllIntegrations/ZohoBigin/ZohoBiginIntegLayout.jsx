import { Panel, Tab, Tabs } from '@bumaga/tabs'

import { __ } from '../../../Utils/i18nwrap'
import ZohoBiginNewRecord from './ZohoBiginNewRecord'
import ZohoBiginRelatedRecord from './ZohoBiginRelatedRecord'
import { refreshModules } from './ZohoBiginCommonFunc'

export default function ZohoBiginIntegLayout({ tab, settab, formID, formFields, handleInput, biginConf, setBiginConf, isLoading, setisLoading, setSnackbar }) {
  const addNewRelatedTab = () => {
    const newConf = { ...biginConf }

    if (newConf.relatedlists.length < 3) {
      newConf.relatedlists.push({
        actions: {},
        field_map: [{ formField: '', zohoFormField: '' }],
        module: '',
        upload_field_map: [{ formField: '', zohoFormField: '' }],
      })
    }

    setBiginConf({ ...newConf })
  }

  const removeRelatedTab = indx => {
    const newConf = { ...biginConf }

    newConf.relatedlists.splice(indx, 1)

    if (!newConf.relatedlists.length) settab(0)

    setBiginConf({ ...newConf })
  }
  return (
    <>
      <br />
      <b className="wdt-100 d-in-b">{__('Module:', 'bitform')}</b>
      <select onChange={handleInput} name="module" value={biginConf.module} className="btcd-paper-inp w-7" disabled={tab === 1}>
        <option value="">{__('Select Module', 'bitform')}</option>
        {
          biginConf.default && biginConf.default.modules && Object.values(biginConf.default.modules).map(module => (
            <option key={module.api_name} value={module.api_name}>
              {module.plural_label}
            </option>
          ))
        }
      </select>
      {tab === 0 && <button onClick={() => refreshModules(formID, biginConf, setBiginConf, setisLoading, setSnackbar)} className="icn-btn sh-sm ml-2 mr-2 tooltip" style={{ '--tooltip-txt': `'${__('Refresh Bigin Modules', 'bitform')}'` }} type="button" disabled={isLoading}>&#x21BB;</button>}
      <br />
      <Tabs>
        <div className="flx mt-2">
          <Tab>
            <button className={`btcd-s-tab-link ${tab === 0 && 's-t-l-active'}`} type="button">
              {__('New Record', 'bitform')}
            </button>
          </Tab>

          {/* {biginConf?.relatedlists && biginConf.relatedlists.map((_, indx) => (
            <>
              <Tab key={`rel-${indx + 64}`}>
                <button className={`btcd-s-tab-link ${tab === indx + 1 && 's-t-l-active'}`} type="button">
                  Related List #
                  {indx + 1}
                </button>
              </Tab>
              <button onClick={() => removeRelatedTab(indx)} className="icn-btn" aria-label="delete-relatedlist" type="button"><span className="btcd-icn icn-clear" /></button>
            </>
          ))}
          {biginConf.relatedlists.length < 3 && <button onClick={addNewRelatedTab} className="icn-btn sh-sm ml-2 mr-2 tooltip" style={{ '--tooltip-txt': '"Add More Related List"' }} type="button">+</button>} */}
        </div>
        <div className="btcd-hr" />

        <Panel>
          <ZohoBiginNewRecord
            tab={tab}
            settab={settab}
            formID={formID}
            formFields={formFields}
            biginConf={biginConf}
            setBiginConf={setBiginConf}
            isLoading={isLoading}
            setSnackbar={setSnackbar}
          />
        </Panel>
        {
          biginConf?.relatedlists && biginConf.relatedlists.map((_, indx) => (
            <Panel key={`rlt-${indx + 89}`}>
              <ZohoBiginRelatedRecord
                indx={indx}
                tab={tab}
                settab={settab}
                formID={formID}
                formFields={formFields}
                biginConf={biginConf}
                setBiginConf={setBiginConf}
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
