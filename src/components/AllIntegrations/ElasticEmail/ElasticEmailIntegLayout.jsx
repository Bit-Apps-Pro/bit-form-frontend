import MultiSelect from 'react-multiple-select-dropdown-lite'
import { __ } from '../../../Utils/i18nwrap'
import ElasticEmailActions from './ElasticEmailActions'
import { getAllList } from './ElasticEmailCommonFunc'
import ElasticEmailFieldMap from './ElasticEmailFieldMap'
import { addFieldMap } from './IntegrationHelpers'

export default function ElasticEmailIntegLayout({ formFields, elasticEmailConf, setElasticEmailConf, isLoading, setIsLoading, setSnackbar }) {
  const setLists = (val) => {
    const newConf = { ...elasticEmailConf }
    newConf.list_id = val ? val.split(',') : []
    setElasticEmailConf({ ...newConf })
  }
  return (
    <>
      <br />
      <div className="flx">
        <b className="wdt-200 d-in-b">{__('Lists:')}</b>
        <MultiSelect
          defaultValue={elasticEmailConf.list_id}
          className="btcd-paper-drpdwn w-5"
          options={elasticEmailConf?.default?.lists && elasticEmailConf.default.lists.map(list => ({ label: list.listName, value: list.listName.toString() }))}
          onChange={val => setLists(val)}
        />

        <button
          onClick={() => getAllList(elasticEmailConf, setElasticEmailConf, setIsLoading)}
          className="icn-btn sh-sm ml-2 mr-2 tooltip"
          style={{ '--tooltip-txt': `'${__('Fetch All Recipients')}'` }}
          type="button"
          disabled={isLoading}
        >
          &#x21BB;
        </button>
      </div>
      <br />
      <div className="mt-5"><b className="wdt-100">{__('Field Map')}</b></div>
      <div className="btcd-hr mt-1" />
      <div className="flx flx-around mt-2 mb-2 btcbi-field-map-label">
        <div className="txt-dp"><b>{__('Form Fields')}</b></div>
        <div className="txt-dp"><b>{__('Elastic Email Fields')}</b></div>
      </div>

      {elasticEmailConf.list_id && elasticEmailConf?.field_map.map((itm, i) => (
        <ElasticEmailFieldMap
          key={`rp-m-${i + 9}`}
          i={i}
          field={itm}
          elasticEmailConf={elasticEmailConf}
          formFields={formFields}
          setElasticEmailConf={setElasticEmailConf}
          setSnackbar={setSnackbar}
        />
      ))}
      <div className="txt-center mt-2" style={{ marginRight: 85 }}>
        <button
          onClick={() => addFieldMap(elasticEmailConf.field_map.length, elasticEmailConf, setElasticEmailConf, false)}
          className="icn-btn sh-sm"
          type="button"
        >
          +
        </button>
      </div>
      <br />
      <br />
      {elasticEmailConf?.list_id && (
        <>
          <div className="mt-4"><b className="wdt-100">{__('Actions')}</b></div>
          <div className="btcd-hr mt-1" />
          <ElasticEmailActions
            elasticEmailConf={elasticEmailConf}
            setElasticEmailConf={setElasticEmailConf}
            formFields={formFields}
          />
        </>
      )}
    </>
  )
}
