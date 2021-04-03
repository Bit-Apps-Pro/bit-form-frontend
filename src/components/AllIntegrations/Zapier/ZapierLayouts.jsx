import { useState } from 'react'
import MultiSelect from 'react-multiple-select-dropdown-lite'
import { __ } from '../../../Utils/i18nwrap'
import Button from '../../ElmSettings/Childs/Button'
import LoaderSm from '../../Loaders/LoaderSm'
import { testWebHook, handleInput, setFromField, addParam, delParam, handleParam } from '../IntegrationHelpers/WebHooksHelpers'

export default function ZapierLayouts({ formID, formFields, zapier, setZapier, step, setstep, setSnackbar, create, isInfo }) {
  const getUrlParams = url => url.match(/(\?|&)([^=]+)=([^&]+|)/gi)
  const [isLoading, setIsLoading] = useState(false)
  const method = ['GET', 'POST', 'PUT', 'PATCH', 'OPTION', 'DELETE', 'TRACE', 'CONNECT']
  console.log('from layout', zapier)
  const nextPage = () => {
    setstep(2)
  }
  return (
    <>
      <div style={{ ...{ width: isInfo && 900 } }}>
        <div className="flx ">
          <div className="w-7 mr-2 mb-4">
            <div className="f-m">{__('Zapier Web Hook name:', 'bitform')}</div>
            <input name="name" onChange={e => handleInput(e, zapier, setZapier)} className="btcd-paper-inp mt-1" type="text" value={zapier.name} disabled={isInfo} />
          </div>
        </div>
        <div className="flx">
          <div className="w-7 mr-2">
            <div className="f-m">{__('Link:', 'bitform')}</div>
            <input name="url" onChange={e => handleInput(e, zapier, setZapier)} className="btcd-paper-inp mt-1" type="text" value={zapier.url} disabled={isInfo} />
          </div>

          <div className="w-3">
            <div className="f-m">{__('Method:', 'bitform')}</div>
            <select name="method" onChange={e => handleInput(e, zapier, setZapier)} defaultValue={zapier.method} className="btcd-paper-inp mt-1" disabled={isInfo}>
              {method.map((itm, indx) => (<option key={`method-${indx}`} value={itm}>{itm}</option>))}
            </select>
          </div>
        </div>
        {!isInfo && (
          <Button onClick={() => testWebHook(zapier, setIsLoading, setSnackbar)} className="btn btcd-btn-o-blue">
            {__('Test Webhook', 'bitform')}
            {isLoading && <LoaderSm size="14" clr="#022217" className="ml-2" />}
          </Button>
        )}
        <br />
        <br />
        <div className="f-m">{__('Add Url Parameter: (optional)', 'bitform')}</div>
        <div className="btcd-param-t-wrp mt-1">
          <div className="btcd-param-t">
            <div className="tr">
              <div className="td">{__('Key', 'bitform')}</div>
              <div className="td">{__('Value', 'bitform')}</div>
            </div>
            {getUrlParams(zapier.url) !== null && getUrlParams(zapier.url).map((itm, childindx) => (
              <div className="tr" key={`fu-1${childindx}`}>
                <div className="td">
                  <input className="btcd-paper-inp p-i-sm" onChange={e => handleParam('key', e.target.value, itm, zapier, setZapier)} type="text" value={itm.split('=')[0].substr(1)} disabled={isInfo} />
                </div>
                <div className="td">
                  <input className="btcd-paper-inp p-i-sm" onChange={e => handleParam('val', e.target.value, itm, zapier, setZapier)} type="text" value={itm.split('=')[1]} disabled={isInfo} />
                </div>
                {!isInfo && (
                  <div className="flx p-atn">
                    <Button onClick={() => delParam(itm, zapier, setZapier)} icn><span className="btcd-icn icn-trash-2" style={{ fontSize: 16 }} /></Button>
                    <MultiSelect
                      options={formFields.map(f => ({ label: f.name, value: `\${${f.key}}` }))}
                      className="btcd-paper-drpdwn wdt-200 ml-2"
                      singleSelect
                      onChange={val => setFromField(val, itm, zapier, setZapier)}
                      defaultValue={itm.split('=')[1]}
                    />
                  </div>
                )}
              </div>
            ))}
            {!isInfo && (
              <Button onClick={() => addParam(zapier, setZapier)} className="add-pram" icn><span className="btcd-icn icn-clear icn-rotate-45" /></Button>
            )}
          </div>
        </div>
        {create && (
          <button onClick={() => nextPage()} className="btn btcd-btn-lg green sh-sm flx" type="button">
            {__('Next', 'bitform')}
            <div className="btcd-icn icn-arrow_back rev-icn d-in-b" />
          </button>
        )}
      </div>
    </>
  )
}
