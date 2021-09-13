// eslint-disable-next-line import/no-extraneous-dependencies
import { __ } from '@wordpress/i18n'
import { useEffect } from 'react'
import FieldMap from './FieldMap'

function ResetPassword({ fields, dataConf, setDataConf, type, pages }) {
  const resetPasswordFields = [
    {
      key: 'new_password',
      name: 'New Passord',
      required: true,
    },
    {
      key: 'conf_password',
      name: 'Confirm Password',
      required: true,
    },
  ]

  const inputHandler = (e) => {
    const tmpConf = { ...dataConf }
    const { name, value } = e.target
    tmpConf[type][name] = value
    setDataConf(tmpConf)
  }

  useEffect(() => {
    const tmpConf = { ...dataConf }
    if (!tmpConf[type]?.reset_map?.[0]?.resetField) {
      tmpConf[type].reset_map = resetPasswordFields.filter(fld => fld.required).map(fl => ({ formField: '', resetField: fl.key, required: fl.required }))
    }
    setDataConf(tmpConf)
  }, [])

  const handlePage = (e) => {
    const tmpConf = { ...dataConf }
    tmpConf[type].redirect_url = e.target.value
    setDataConf(tmpConf)
  }

  return (
    <div style={{ width: 800 }}>
      <div>
        <div>
          <div className="mt-3 mb-1"><b>Login Fields Mapping</b></div>
          <div className="btcd-hr" />
          <div className="flx flx-around mt-2 mb-1">
            <div className="txt-dp"><b>{__('Form Fields', 'bitform')}</b></div>
            <div className="txt-dp"><b>{__('Reset Password Fields', 'bitform')}</b></div>
          </div>
        </div>
      </div>
      {dataConf[type]?.reset_map?.map((itm, i) => (
        <FieldMap
          key={`analytics-m-${i + 9}`}
          i={i}
          type="reset"
          field={itm}
          formFields={fields}
          dataConf={dataConf}
          setDataConf={setDataConf}
          customFields={resetPasswordFields}
        />
      ))}
      <br />
      <div className="flx integ-fld-wrp">
        <div className="w-5 ">
          <div className="f-m">{__('Reset Page Url:', 'bitform')}</div>
          <select className="btcd-paper-inp mt-1" value={dataConf[type]?.redirect_url} onChange={e => handlePage(e)}>
            <option value="">{__('Custom Link', 'bitform')}</option>
            {pages && pages.map((urlDetail, ind) => (
              <option key={`r-url-${ind + 22}`} value={urlDetail.url}>{urlDetail.title}</option>
            ))}
          </select>
        </div>
        <div className="w-5 ml-2">
          <div className="f-m">Link:</div>
          <input onChange={inputHandler} name="redirect_url" className="btcd-paper-inp mt-1" type="text" value={dataConf[type]?.redirect_url} />
        </div>
      </div>
      <br />
      <div className="flx integ-fld-wrp">
        <div className="w-5">
          <div className="f-m">{__('Success Message:', 'bitform')}</div>
          <input className="btcd-paper-inp mt-1" onChange={(e) => inputHandler(e)} name="succ_msg" value={dataConf[type]?.succ_msg} type="text" placeholder={__('Success Message', 'bitform')} />
        </div>
      </div>

      <br />
    </div>
  )
}

export default ResetPassword
