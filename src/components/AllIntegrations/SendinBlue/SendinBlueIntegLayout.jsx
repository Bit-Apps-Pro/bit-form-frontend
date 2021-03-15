// eslint-disable-next-line import/no-extraneous-dependencies
import { __ } from '@wordpress/i18n'
import MultiSelect from 'react-multiple-select-dropdown-lite'
import Loader from '../../Loaders/Loader'
import { addFieldMap } from '../IntegrationHelpers/IntegrationHelpers'
import SendinBlueActions from './SendinBlueActions'
import { refreshLists, refreshSendinBlueHeader } from './SendinBlueCommonFunc'
import SendinBlueFieldMap from './SendinBlueFieldMap'

export default function SendinBlueIntegLayout({ formID, formFields, sendinBlueConf, setSendinBlueConf, isLoading, setisLoading, setSnackbar }) {
  const lists = (val) => {
    const newConf = { ...sendinBlueConf }
    if (val) {
      newConf.lists = val ? val.split(',') : []
      refreshSendinBlueHeader(newConf, setSendinBlueConf, setisLoading, setSnackbar)
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

  return (
    <>
      <br />
      <div className="flx">
        <b className="wdt-100 d-in-b">{__('List: ', 'bitform')}</b>
        <MultiSelect
          defaultValue={sendinBlueConf?.lists}
          className="btcd-paper-drpdwn w-5"
          options={listOptions()}
          onChange={val => lists(val)}
        />
        <button onClick={() => refreshLists(sendinBlueConf, setSendinBlueConf, setisLoading, setSnackbar)} className="icn-btn sh-sm ml-2 mr-2 tooltip" style={{ '--tooltip-txt': `'${__('Refresh MailPoet List', 'bitform')}'` }} type="button" disabled={isLoading}>&#x21BB;</button>
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
      {sendinBlueConf?.lists.length !== 0
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
            <div className="mt-4"><b className="wdt-100">{__('Actions', 'bitform')}</b></div>
            <div className="btcd-hr mt-1" />
            <SendinBlueActions
              sendinBlueConf={sendinBlueConf}
              setSendinBlueConf={setSendinBlueConf}
            />
          </>
        )}
    </>
  )
}
