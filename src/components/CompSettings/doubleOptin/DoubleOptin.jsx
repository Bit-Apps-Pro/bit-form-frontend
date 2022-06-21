/* eslint-disable no-param-reassign */
import produce from 'immer'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { $bits, $fieldsArr } from '../../../GlobalStates'
import EditIcn from '../../../Icons/EditIcn'
import bitsFetch from '../../../Utils/bitsFetch'
import { deepCopy } from '../../../Utils/Helpers'
import { __ } from '../../../Utils/i18nwrap'
import { dblOptinTamplate } from '../../../Utils/StaticData/tamplate'
import Loader from '../../Loaders/Loader'
import SingleToggle2 from '../../Utilities/SingleToggle2'
import SnackMsg from '../../Utilities/SnackMsg'
import TableCheckBox from '../../Utilities/TableCheckBox'
import EmailNotification from '../../WPAuth/EmailNotification'
import RedirectEmailVerified from '../../WPAuth/Registration/RedirectEmailVerified'

export default function DoubleOptin() {
  const [tem, setTem] = useState({ sub: 'Confirm the submission', body: dblOptinTamplate, dflt_temp: true, day: 1 })
  const bits = useRecoilValue($bits)
  const [customRedirectMdl, setCustomRedirectMdl] = useState(false)
  const [dfltTampMdl, setDfltTamMdl] = useState(false)
  const [status, setStatus] = useState(false)
  const { isPro, allPages } = bits
  const [isLoad, setIsLoad] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const formFields = useRecoilValue($fieldsArr)
  const [snack, setSnackbar] = useState({ show: false })

  const { formID } = useParams()

  useEffect(() => {
    setIsLoad(true)
    bitsFetch({ formID }, 'bitforms_get_double_opt_in').then((res) => {
      if (res?.success && !res?.data?.errors) {
        setStatus(Number(res.data[0]?.status))
        setTem(JSON.parse(res.data[0]?.integration_details))
      }
      setIsLoad(false)
    })
  }, [])

  const handleInput = ({ target: { name, value } }) => {
    setTem(prev => ({ ...prev, [name]: value }))
  }
  const toggleHandle = ({ target: { checked } }, name) => {
    const temp = deepCopy(tem)
    if (checked) {
      temp[name] = true
    } else {
      delete temp[name]
    }
    setTem(temp)
  }

  const handleStatus = (e) => {
    if (e.target.checked) {
      setStatus(1)
    } else {
      setStatus(0)
    }
  }

  const saveSettings = (e) => {
    e.preventDefault()

    if (tem.dflt_temp && tem?.fldkey === undefined || tem?.fldkey === '') {
      setSnackbar({ show: true, msg: __('form field cann\'t be empty', 'bitform') })
      return
    }
    setIsLoading(true)

    const tmpConf = produce(tem, draft => {
      draft.formId = formID
      draft.status = status
    })

    const prom = bitsFetch(tmpConf,
      'bitforms_save_double_opt_in')
      .then((res) => {
        if (res?.success && !res?.data?.errors) {
          setIsLoading(false)
        }
      })
    toast.promise(prom, {
      success: __('Saved successfully.', 'bitform'),
      loading: __('Saving...', 'bitform'),
      error: __('Something went wrong, Try again.', 'bitform'),
    })
  }

  return (
    <div className="pos-rel">
      {!isPro && (
        <div className="pro-blur flx" style={{ height: '111%', left: -53, width: '104%' }}>
          <div className="pro">
            {__('Available On', 'bitform')}
            <a href="https://www.bitapps.pro/bit-form" target="_blank" rel="noreferrer">
              <span className="txt-pro">
                {__('Premium', 'bitform')}
              </span>
            </a>
          </div>
        </div>
      )}
      {
        isLoad
          ? (
            <Loader style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: 70,
              transform: 'scale(0.7)',
            }}
            />
          ) : (
            <div>
              <SnackMsg snack={snack} setSnackbar={setSnackbar} />
              <div style={{ opacity: !tem?.status === 1 && 0.6 }}>

                <div className="mt-2 ml-1 flx">
                  <label htmlFor="status">
                    <b>{__('Enable Double Opt-In', 'bitform')}</b>
                  </label>
                  <SingleToggle2 action={handleStatus} checked={status === 1} className="ml-4 flx" />
                </div>
                <br />

                {/* <div className="mt-1 ml-0 flx">
                  <SingleToggle2 action={(e) => toggleHandle(e, 'add_param')} checked={'add_param' in tem} className="ml-4 flx" />
                  <label htmlFor="status">
                    {__('Add the verifed e-mail address to the confirmation link as parameter to handle it afterwards.', 'bitform')}
                  </label>
                </div> */}

                <div className="mt-2 ml-0 flx">
                  <SingleToggle2 action={(e) => toggleHandle(e, 'auto_unconfirmed_deleted')} checked={'auto_unconfirmed_deleted' in tem} className="ml-4 flx" />

                  <label htmlFor="status">
                    {__('Specify after how many days unconfirmed entires  will be deleted.', 'bitform')}
                  </label>
               &nbsp;
                  <input onChange={handleInput} name="day" value={tem?.day || 1} disabled={!tem.auto_unconfirmed_deleted} className="btcd-paper-inp mr-2 wdt-100" placeholder="1" type="number" min="1" />

                </div>

                <div className="mt-2 ml-0 flx">
                  <SingleToggle2 action={(e) => toggleHandle(e, 'disable_loggin_user')} checked={'disable_loggin_user' in tem} className="ml-4 flx" />
                  <label htmlFor="disable_loggin_user">
                    {__('Disable for logged in users.', 'bitform')}
                  </label>
                </div>
                <br />

                <div className="flx w-8">

                  <div className="w-4 ml-4 mt-4">
                    <TableCheckBox name="dflt_temp" onChange={(e) => toggleHandle(e, 'dflt_temp')} title={__('Enable default template', 'bitform')} checked={!!tem?.dflt_temp} value={false} />
                  </div>

                  <div className="flx w-4 ml-2 mt-4">
                    <span
                      role="button"
                      tabIndex="-1"
                      className="cp"
                      onClick={() => setCustomRedirectMdl(true)}
                      onKeyPress={() => setCustomRedirectMdl(true)}
                    >
                      <EditIcn size={21} />
                    </span>
                    <div className="f-m ml-1">{__('Show after verification', 'bitform')}</div>
                    <RedirectEmailVerified dataConf={tem} setDataConf={setTem} showMdl={customRedirectMdl} setCustomRedirectMdl={setCustomRedirectMdl} pages={allPages} title="Show after verification" />

                  </div>

                </div>
                {tem?.dflt_temp && (
                  <div className="flx w-8">
                    <div className="w-4 ml-4 mt-4">

                      <b className="mb-2">Email</b>
                      <br />
                      <select className="btcd-paper-inp w-9" name="fldkey" value={tem?.fldkey} onChange={handleInput}>
                        <option selected disabled>{__('Select Email Field', 'bitform')}</option>
                        {
                          formFields?.filter(fld => (fld.type === 'email')).map(header => (
                            <option key={`${header.key}-1`} value={header.key}>
                              {`${header.name}`}
                            </option>
                          ))
                        }
                      </select>

                    </div>
                    <div className="flx w-4 ml-2 mt-4">
                      <span
                        role="button"
                        tabIndex="-1"
                        className="cp"
                        onClick={() => setDfltTamMdl(true)}
                        onKeyPress={() => setDfltTamMdl(true)}
                      >
                        <EditIcn size={21} />
                      </span>
                      <div className="f-m ml-1">{__('Customize email template', 'bitform')}</div>
                      <EmailNotification
                        dataConf={tem}
                        setDataConf={setTem}
                        showMdl={dfltTampMdl}
                        setshowMdl={setDfltTamMdl}
                        title="Customize  Email template"
                      />

                    </div>
                  </div>
                )}
              </div>
              <br />
              <br />
              <button
                type="button"
                id="secondary-update-btn"
                onClick={saveSettings}
                className="btn btcd-btn-lg blue flx ml-4"
                disabled={isLoading}
              >
                {__('Save ', 'bitform')}
              </button>

              <br />
              <div className="br-5 w-6  ">
                <p className="p-1 f-m">
                  <strong>Note : </strong>
                  {' '}
                  the integrations & webhook will only trigger when the responder confirms their Opt-In.</p>
              </div>
            </div>
          )
      }
    </div>
  )
}
