/* eslint-disable no-param-reassign */
// eslint-disable-next-line import/no-extraneous-dependencies
import { __ } from '@wordpress/i18n'
import { useSetAtom } from 'jotai'
import { create } from 'mutative'
import { useEffect } from 'react'
import { $updateBtn } from '../../GlobalStates/GlobalStates'
import FieldMap from './FieldMap'

function ResetPassword({ fields, dataConf, setDataConf, type, pages, status }) {
  const setUpdateBtn = useSetAtom($updateBtn)
  const resetPasswordFields = [
    {
      key: 'new_password',
      name: 'New Password',
      required: true,
    },
    {
      key: 'conf_password',
      name: 'Confirm Password',
      required: true,
    },
  ]

  const inputHandler = (e) => {
    setDataConf(tmpConf => create(tmpConf, draft => {
      const { name, value } = e.target
      draft[type][name] = value
    }))
    setUpdateBtn(prevState => ({ ...prevState, unsaved: true }))
  }

  useEffect(() => {
    setDataConf(tmpConf => create(tmpConf, draft => {
      if (!draft[type]?.reset_map?.[0]?.resetField) {
        draft[type].reset_map = resetPasswordFields.filter(fld => fld.required).map(fl => ({ formField: '', resetField: fl.key, required: fl.required }))
      }
    }))
  }, [])

  const handlePage = (e) => {
    setDataConf(tmpConf => create(tmpConf, draft => {
      draft[type].redirect_url = e.target.value
    }))
    setUpdateBtn(prevState => ({ ...prevState, unsaved: true }))
  }

  return (
    <div style={{ width: 800, opacity: status === 0 && 0.6, pointerEvents: status === 0 && 'none' }}>
      <div>
        <div>
          <div className="mt-3 mb-1"><b>Login Fields Mapping</b></div>
          <div className="btcd-hr" />
          <div className="flx flx-around mt-2 mb-1">
            <div className="txt-dp"><b>{__('Form Fields')}</b></div>
            <div className="txt-dp"><b>{__('Reset Password Fields')}</b></div>
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
          <div className="f-m fw-500">{__('Redirect Page:')}</div>
          <select className="btcd-paper-inp mt-1" value={dataConf[type]?.redirect_url} onChange={e => handlePage(e)}>
            <option value="">{__('Custom Link')}</option>
            {pages && pages.map((urlDetail, ind) => (
              <option key={`r-url-${ind + 22}`} value={urlDetail.url}>{urlDetail.title}</option>
            ))}
          </select>
        </div>
        <div className="w-5 ml-2">
          <div className="f-m fw-500">Link:</div>
          <input onChange={inputHandler} name="redirect_url" className="btcd-paper-inp mt-1" type="text" value={dataConf[type]?.redirect_url} />
        </div>
      </div>
      <br />
      <div className="flx integ-fld-wrp">
        <div className="w-5">
          <div className="f-m fw-500">{__('Success Message:')}</div>
          <input className="btcd-paper-inp mt-1" onChange={(e) => inputHandler(e)} name="succ_msg" value={dataConf[type]?.succ_msg} type="text" placeholder={__('Success Message')} />
        </div>
      </div>

      <br />
    </div>
  )
}

export default ResetPassword
