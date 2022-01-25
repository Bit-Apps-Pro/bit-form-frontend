// eslint-disable-next-line import/no-extraneous-dependencies
import MultiSelect from 'react-multiple-select-dropdown-lite'
import { __ } from '../../../Utils/i18nwrap'
import Loader from '../../Loaders/Loader'
import { addFieldMap } from '../IntegrationHelpers/IntegrationHelpers'
import AutonamiActions from './AutonamiActions'
import { refreshAutonamiList, refreshAutonamiHeader } from './AutonamiCommonFunc'
import AutonamiFieldMap from './AutonamiFieldMap'

export default function AutonamiIntegLayout({ formID, formFields, autonamiConf, setAutonamiConf, isLoading, setIsLoading, setSnackbar }) {
  const setTags = (val) => {
    const newConf = { ...autonamiConf }
    if (val) {
      newConf.tags = val ? val.split(',') : []
      refreshAutonamiHeader(newConf, setAutonamiConf, setIsLoading, setSnackbar)
    } else {
      delete newConf.tags
    }
    setAutonamiConf({ ...newConf })
  }

  const inputHendler = (e) => {
    const newConf = { ...autonamiConf }
    newConf.list_id = e.target.value
    setAutonamiConf({ ...newConf })
  }
  
  return (
    <>
      <br />
      <div className="flx">
        <b className="wdt-200 d-in-b">{__('Autonami List:', 'bitform')}</b>
        <select onChange={(e) => inputHendler(e)} name="list_id" value={autonamiConf.list_id} className="btcd-paper-inp w-5">
          <option value="">{__('Select Autonami list', 'bitform')}</option>
          {
            autonamiConf?.default?.autonamiList && Object.keys(autonamiConf.default.autonamiList).map(autonamiListName => (
              <option key={autonamiListName} value={autonamiConf.default.autonamiList[autonamiListName].id}>
                {autonamiConf.default.autonamiList[autonamiListName].title}
              </option>
            ))
          }
        </select>
        <button onClick={() => refreshAutonamiList(formID, autonamiConf, setAutonamiConf, setIsLoading, setSnackbar)} className="icn-btn sh-sm ml-2 mr-2 tooltip" style={{ '--tooltip-txt': `'${__('Refresh Autonami List', 'bitform')}'` }} type="button" disabled={isLoading}>&#x21BB;</button>
      </div>
      <div className="flx mt-5">
        <b className="wdt-200 d-in-b">{__('Autonami Tags: ', 'bitform')}</b>
        <MultiSelect
          defaultValue={autonamiConf?.tags}
          className="btcd-paper-drpdwn w-5"
          options={autonamiConf?.default?.autonamiTags && Object.keys(autonamiConf.default.autonamiTags).map(tag => ({ label: autonamiConf.default.autonamiTags[tag].title, value: autonamiConf.default.autonamiTags[tag].id.toString() }))}
          onChange={val => setTags(val)}
        />
      </div>
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
      {autonamiConf?.list_id
        && (
          <>
            <div className="mt-4">
              <b className="wdt-100">{__('Map Fields', 'bitform')}</b>
            </div>
            <div className="btcd-hr mt-1" />
            <div className="flx flx-around mt-2 mb-1">
              <div className="txt-dp"><b>{__('Form Fields', 'bitform')}</b></div>
              <div className="txt-dp"><b>{__('Autonami Fields', 'bitform')}</b></div>
            </div>

            {autonamiConf.field_map.map((itm, i) => (
              <AutonamiFieldMap
                key={`autonami-m-${i + 9}`}
                i={i}
                field={itm}
                autonamiConf={autonamiConf}
                formFields={formFields}
                setAutonamiConf={setAutonamiConf}
              />
            ))}
            <div className="txt-center  mt-2" style={{ marginRight: 85 }}><button onClick={() => addFieldMap(autonamiConf.field_map.length, autonamiConf, setAutonamiConf)} className="icn-btn sh-sm" type="button">+</button></div>

            {/* {autonamiConf.actions?.customField && (
              <>
                <div className="mt-4">
                  <b className="wdt-100">{__('Map Fields', 'bitform')}</b>
                </div>
                <div className="btcd-hr mt-1" />
                <div className="flx flx-around mt-2 mb-1">
                  <div className="txt-dp"><b>{__('Form Fields', 'bitform')}</b></div>
                  <div className="txt-dp"><b>{__('Autonami Custom Fields', 'bitform')}</b></div>
                </div>

                {autonamiConf.field_map.map((itm, i) => (
                  <AutonamiFieldMap
                    key={`autonami-m-${i + 9}`}
                    i={i}
                    field={itm}
                    autonamiConf={autonamiConf}
                    formFields={formFields}
                    setAutonamiConf={setAutonamiConf}
                    customField
                  />
                ))}
                <div className="txt-center  mt-2" style={{ marginRight: 85 }}><button onClick={() => addFieldMap(autonamiConf.field_map.length, autonamiConf, setAutonamiConf)} className="icn-btn sh-sm" type="button">+</button></div>

              </>
            )} */}
            <br />
            <div className="mt-4"><b className="wdt-100">{__('Actions', 'bitform')}</b></div>
            <div className="btcd-hr mt-1" />
            <AutonamiActions
              autonamiConf={autonamiConf}
              setAutonamiConf={setAutonamiConf}
              setIsLoading={setIsLoading}
              setSnackbar={setSnackbar}
            />
          </>
        )}
    </>
  )
}
