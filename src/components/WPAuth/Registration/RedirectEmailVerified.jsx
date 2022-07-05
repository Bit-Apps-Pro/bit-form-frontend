import produce from 'immer'
import { __ } from '../../../Utils/i18nwrap'
import Cooltip from '../../Utilities/Cooltip'
import Modal from '../../Utilities/Modal'
import SingleToggle2 from '../../Utilities/SingleToggle2'

export default function RedirectEmailVerified({ dataConf, setDataConf, showMdl, setCustomRedirectMdl, pages, type }) {
  const handleInput = (e) => {
    const { name, value } = e.target
    setDataConf(tmpConf => produce(tmpConf, draft => {
      // eslint-disable-next-line no-param-reassign
      draft[type][name] = value
    }))
  }

  const handleCustomRedirect = (e) => {
    const { checked } = e.target
    if (checked) {
      setDataConf(tmpConf => produce(tmpConf, draft => {
        // eslint-disable-next-line no-param-reassign
        draft[type].custom_redirect = 1
      }))
    } else {
      setDataConf(tmpConf => produce(tmpConf, draft => {
        // eslint-disable-next-line no-param-reassign
        delete draft[type].custom_redirect
      }))
    }
  }

  return (
    <div>
      <Modal md show={showMdl} setModal={setCustomRedirectMdl} title="Redirect after verification" style={{ minWidth: 800 }}>
        <>
          <div>
            <div className="mt-2 ml-1 flx">
              <label htmlFor="status">
                <b>{__('Custom Redirect Page Enable', 'bitform')}</b>
              </label>
              <SingleToggle2 action={handleCustomRedirect} checked={dataConf[type]?.custom_redirect === 1} className="ml-4 flx" />
              <Cooltip width={250} icnSize={17} className="ml-1">
                <div className="txt-body">
                  Enable this option to add the custom redirect URL or pages for the success, already activated, and invalid verification. by default BitForm will redirect to the default page.
                  <br />
                </div>
              </Cooltip>
            </div>
            {dataConf[type]?.custom_redirect === 1 && (
              <div className="mt-3">
                <div className="flx integ-fld-wrp">
                  <div className="w-5 ">
                    <div className="f-m">
                      {__('Success redirect Page:', 'bitform')}
                      <Cooltip width={250} icnSize={17} className="ml-2">
                        <div className="txt-body">
                          This page will show when the verification is successful.
                          <br />
                        </div>
                      </Cooltip>
                    </div>

                    <select className="btcd-paper-inp mt-1" name="succ_url" value={dataConf[type]?.succ_url} onChange={handleInput}>
                      <option value="">{__('Custom Link', 'bitform')}</option>
                      {pages && pages.map((urlDetail, ind) => (
                        <option key={`r-url-${ind + 22}`} value={urlDetail.url}>{urlDetail.title}</option>
                      ))}
                    </select>

                  </div>
                  <div className="w-5 ml-2">
                    <div className="f-m fw-500">Link</div>
                    <input onChange={handleInput} name="succ_url" className="btcd-paper-inp mt-1" type="text" value={dataConf[type]?.succ_url} />
                  </div>
                </div>

                <div className="flx integ-fld-wrp mt-3">
                  <div className="w-5 ">
                    <div className="f-m">
                      {__('Redirect page (already activated):', 'bitform')}
                      <Cooltip width={250} icnSize={17} className="ml-2">
                        <div className="txt-body">
                          This page will show if the account had already been activated.
                          {' '}
                          <br />
                        </div>
                      </Cooltip>
                    </div>
                    <select className="btcd-paper-inp mt-1" name="already_activated_url" value={dataConf[type]?.already_activated_url} onChange={handleInput}>
                      <option value="">{__('Custom Link', 'bitform')}</option>
                      {pages && pages.map((urlDetail, ind) => (
                        <option key={`r-url-${ind + 22}`} value={urlDetail.url}>{urlDetail.title}</option>
                      ))}
                    </select>
                  </div>
                  <div className="w-5 ml-2">
                    <div className="f-m fw-500">Link</div>
                    <input onChange={handleInput} name="already_activated_url" className="btcd-paper-inp mt-1" type="text" value={dataConf[type]?.already_activated_url} />
                  </div>
                </div>

                <div className="flx integ-fld-wrp mt-3">
                  <div className="w-5 ">
                    <div className="f-m">
                      {__('Invalid redirect page:', 'bitform')}
                      <Cooltip width={250} icnSize={17} className="ml-2">
                        <div className="txt-body">
                          This page will show if the account activation fails or if the activation URL is invalid.
                          {' '}
                          {' '}
                          <br />
                        </div>
                      </Cooltip>
                    </div>
                    <select className="btcd-paper-inp mt-1" name="invalid_key_url" value={dataConf[type]?.invalid_key_url} onChange={handleInput}>
                      <option value="">{__('Custom Link', 'bitform')}</option>
                      {pages && pages.map((urlDetail, ind) => (
                        <option key={`r-url-${ind + 22}`} value={urlDetail.url}>{urlDetail.title}</option>
                      ))}
                    </select>
                  </div>
                  <div className="w-5 ml-2">
                    <div className="f-m fw-500">Link</div>
                    <input onChange={handleInput} name="invalid_key_url" className="btcd-paper-inp mt-1" type="text" value={dataConf[type]?.invalid_key_url} />
                  </div>
                </div>
              </div>
            )}
            {!dataConf[type]?.custom_redirect && (
              <div className="mt-3">
                <span>{__('Custom messages', 'bitform')}</span>
                <div className="w-8 mt-2">
                  <div className="f-m fw-500">{__('Activation success', 'bitform')}</div>
                  <input className="btcd-paper-inp mt-1" onChange={handleInput} name="acti_succ_msg" value={dataConf[type]?.acti_succ_msg} type="text" placeholder={__('Activation Success Message', 'bitform')} />
                </div>
                <div className="w-8 mt-2">
                  <div className="f-m fw-500">{__('Already activated account', 'bitform')}</div>
                  <input className="btcd-paper-inp mt-1" onChange={handleInput} name="already_activated_msg" value={dataConf[type]?.already_activated_msg} type="text" placeholder={__('Already account activation message', 'bitform')} />
                </div>
                <div className="w-8 mt-2">
                  <div className="f-m fw-500">{__('Invalid activation key', 'bitform')}</div>
                  <input className="btcd-paper-inp mt-1" onChange={handleInput} name="invalid_key_msg" value={dataConf[type]?.invalid_key_msg} type="text" placeholder={__('Invalid url or fail activation message', 'bitform')} />
                </div>
              </div>
            )}
            <div className="mt-2 f-right">
              <button type="button" className="btn blue" onClick={() => setCustomRedirectMdl(false)}>Close</button>
            </div>
          </div>
        </>
      </Modal>
    </div>
  )
}
