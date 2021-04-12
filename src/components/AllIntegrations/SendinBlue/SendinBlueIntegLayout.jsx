// eslint-disable-next-line import/no-extraneous-dependencies
import MultiSelect from 'react-multiple-select-dropdown-lite'
import { __ } from '../../../Utils/i18nwrap'
import Loader from '../../Loaders/Loader'
import { addFieldMap } from '../IntegrationHelpers/IntegrationHelpers'
import SendinBlueActions from './SendinBlueActions'
import { refreshLists, refreshSendinBlueHeader, refreshTemplate } from './SendinBlueCommonFunc'
import SendinBlueFieldMap from './SendinBlueFieldMap'

export default function SendinBlueIntegLayout({ formID, formFields, sendinBlueConf, setSendinBlueConf, isLoading, setisLoading, setSnackbar, error, setError }) {
  const lists = (val) => {
    const newConf = { ...sendinBlueConf }
    if (val) {
      newConf.lists = val ? val.split(',') : []
      !newConf.default.fields && refreshSendinBlueHeader(newConf, setSendinBlueConf, setisLoading, setSnackbar)
    } else {
      delete newConf.lists
    }
    setSendinBlueConf({ ...newConf })
  }

  const listOptions = () => {
    if (sendinBlueConf?.default?.sblueList) {
      return Object.values(sendinBlueConf.default.sblueList).map(sb => ({ label: sb.name, value: String(sb.id) }))
    }
    return []
  }

  const handleInput = (e) => {
    const newConf = { ...sendinBlueConf }
    const newError = { ...error }
    newError[e.target.name] = ''
    newConf[e.target.name] = e.target.value
    setError(newError)
    setSendinBlueConf({ ...newConf })
  }

  return (
    <>
      <br />
      <div className="flx">
        <b className="wdt-150 d-in-b">{__('List: ', 'bitform')}</b>
        <MultiSelect
          defaultValue={sendinBlueConf?.lists}
          className="btcd-paper-drpdwn w-5"
          options={listOptions()}
          onChange={val => lists(val)}
        />
        <button onClick={() => refreshLists(sendinBlueConf, setSendinBlueConf, setisLoading, setSnackbar)} className="icn-btn sh-sm ml-2 mr-2 tooltip" style={{ '--tooltip-txt': `'${__('Refresh Sendinblue Lists', 'bitform')}'` }} type="button" disabled={isLoading}>&#x21BB;</button>
      </div>
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
      {sendinBlueConf?.lists?.length !== 0
        && (
          <>
            <div className="mt-4">
              <b className="wdt-100">{__('Map Fields', 'bitform')}</b>
            </div>
            <div className="btcd-hr mt-1" />
            <div className="flx flx-around mt-2 mb-1">
              <div className="txt-dp"><b>{__('Form Fields', 'bitform')}</b></div>
              <div className="txt-dp"><b>{__('Sendinblue Fields', 'bitform')}</b></div>
            </div>

            {sendinBlueConf.field_map.map((itm, i) => (
              <SendinBlueFieldMap
                key={`sendinblue-m-${i + 9}`}
                i={i}
                field={itm}
                sendinBlueConf={sendinBlueConf}
                formFields={formFields}
                setSendinBlueConf={setSendinBlueConf}
              />
            ))}
            <div className="txt-center  mt-2" style={{ marginRight: 85 }}><button onClick={() => addFieldMap(sendinBlueConf.field_map.length, sendinBlueConf, setSendinBlueConf)} className="icn-btn sh-sm" type="button">+</button></div>
            <br />
            <br />
            {sendinBlueConf.actions?.double_optin && (
              <>
                <div className="flx">
                  <b className="wdt-150 d-in-b">{__('Template: ', 'bitform')}</b>
                  <div className="w-5">
                    <select onChange={handleInput} name="templateId" value={sendinBlueConf?.templateId} className="btcd-paper-inp">
                      <option value="">{__('Select Template', 'bitform')}</option>
                      {sendinBlueConf?.default?.sblueTemplates && Object.values(sendinBlueConf.default.sblueTemplates).map((template) => (
                        <option key={`sendinblue-${template.id + 2}`} value={template.id || sendinBlueConf.templateId}>
                          {template.name}
                        </option>
                      ))}
                    </select>
                    <div style={{ color: 'red', fontSize: '15px', marginTop: '3px' }}>{error.templateId}</div>
                  </div>
                  <button onClick={() => refreshTemplate(sendinBlueConf, setSendinBlueConf, setSnackbar)} className="icn-btn sh-sm ml-2 mr-2 tooltip" style={{ '--tooltip-txt': `'${__('Refresh Sendinblue Templates', 'bitform')}'` }} type="button" disabled={isLoading}>&#x21BB;</button>
                </div>
                <br />
                <br />
                <div className="flx">
                  <b className="wdt-150 d-in-b">{__('RedirectionUrl:', 'bitform')}</b>
                  <div className="w-5">
                    <input type="url" className="btcd-paper-inp" placeholder="Redirection URL" onChange={handleInput} value={sendinBlueConf?.redirectionUrl || ''} name="redirectionUrl" />
                    <div style={{ color: 'red', fontSize: '15px', marginTop: '3px' }}>{error.redirectionUrl}</div>
                  </div>
                </div>
                <br />
                <br />
              </>
            )}
            <div className="mt-4"><b className="wdt-100">{__('Actions', 'bitform')}</b></div>
            <div className="btcd-hr mt-1" />
            <SendinBlueActions
              sendinBlueConf={sendinBlueConf}
              setSendinBlueConf={setSendinBlueConf}
              setisLoading={setisLoading}
              setSnackbar={setSnackbar}
            />
          </>
        )}
    </>
  )
}