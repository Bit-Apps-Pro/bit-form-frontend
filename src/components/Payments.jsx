// eslint-disable-next-line import/no-extraneous-dependencies
import { __ } from '@wordpress/i18n'
import { useContext, useState } from 'react'
import { Link, Route, Switch, useHistory, useRouteMatch } from 'react-router-dom'
import paypal from '../resource/img/settings/paypal.svg'
import razorpay from '../resource/img/settings/razorpay.svg'
import { AppSettings } from '../Utils/AppSettingsContext'
import bitsFetch from '../Utils/bitsFetch'
import ConfirmModal from './ConfirmModal'
import SnackMsg from './ElmSettings/Childs/SnackMsg'
import Modal from './Modal'
import Payment from './Payment'

export default function Payments() {
  /* eslint-disable-next-line no-undef */
  const isPro = typeof bits !== 'undefined' && bits.isPro
  const { payments, setPayments } = useContext(AppSettings)
  const [showMdl, setShowMdl] = useState(false)
  const [confMdl, setconfMdl] = useState({ show: false })
  const [snack, setSnackbar] = useState({ show: false })
  const { path, url } = useRouteMatch()
  const allIntegURL = url
  const history = useHistory()

  const pays = [
    { type: 'paypal', logo: paypal },
    { type: 'razorpay', logo: razorpay },
  ]

  const removeInteg = i => {
    const tmpPayments = { ...payments[i] }
    const newInteg = [...payments]
    newInteg.splice(i, 1)
    setPayments(newInteg)
    bitsFetch({ formID: 0, id: tmpPayments.id }, 'bitforms_delete_integration')
      .then(response => {
        if (response && response.success) {
          setSnackbar({ show: true, msg: `${response.data.message}` })
        } else if (response && response.data && response.data.data) {
          newInteg.splice(i, 0, tmpPayments)
          setPayments([...newInteg])
          setSnackbar({ show: true, msg: `${__('Integration deletion failed Cause', 'bitform')}:${response.data.data}. ${__('please try again', 'bitform')}` })
        } else {
          newInteg.splice(i, 0, tmpPayments)
          setPayments([...newInteg])
          setSnackbar({ show: true, msg: __('Integration deletion failed. please try again', 'bitform') })
        }
      })
  }

  const payDelConf = i => {
    confMdl.btnTxt = __('Delete', 'bitform')
    confMdl.body = __('Are you sure to delete this integration?', 'bitform')
    confMdl.btnClass = ''
    confMdl.action = () => { removeInteg(i); closeConfMdl() }
    confMdl.show = true
    setconfMdl({ ...confMdl })
  }

  const getLogo = type => {
    for (let i = 0; i < pays.length; i += 1) {
      if (pays[i].type === type) {
        return <img src={pays[i].logo} alt={type} className="p-0" />
      }
    }
    return null
  }

  const setNewInteg = (type) => {
    setShowMdl(false)
    history.push(`${allIntegURL}/${type}`)
  }

  const closeConfMdl = () => {
    confMdl.show = false
    setconfMdl({ ...confMdl })
  }

  return (
    <div className="pb-6 w-7">
      <SnackMsg snack={snack} setSnackbar={setSnackbar} />

      <div>
        <ConfirmModal
          show={confMdl.show}
          close={closeConfMdl}
          btnTxt={confMdl.btnTxt}
          btnClass={confMdl.btnClass}
          body={confMdl.body}
          action={confMdl.action}
        />
        <Switch>
          <Route exact path={path}>
            <h2>{__('Payment Settings', 'bitform')}</h2>
            <div className="btcd-hr" />
            <div className="flx flx-wrp pos-rel">
              {!isPro && (
                <div className="pro-blur flx w-10" style={{ top: 5, left: -10 }}>
                  <div className="pro">
                    {__('Available On', 'bitform')}
                    <a href="https://bitpress.pro/" target="_blank" rel="noreferrer">
                      <span className="txt-pro">
                        {' '}
                        {__('Premium', 'bitform')}
                      </span>
                    </a>
                  </div>
                </div>
              )}
              <Modal
                title={__('Available Payments', 'bitform')}
                show={showMdl}
                setModal={setShowMdl}
                style={{ width: 700 }}
              >
                <div className="flx flx-wrp btcd-inte-wrp">
                  {pays.map((pay, i) => (
                    <div
                      key={`inte-sm-${i + 2}`}
                      onClick={() => !pay.disable && !pay.pro && setNewInteg(pay.type)}
                      onKeyPress={() => !pay.disable && !pay.pro && setNewInteg(pay.type)}
                      role="button"
                      tabIndex="0"
                      className={`btcd-inte-card inte-sm mr-4 mt-3 ${pay.disable && !pay.pro && 'btcd-inte-dis'} ${pay.pro && 'btcd-inte-pro'}`}
                    >
                      {pay.pro && (
                        <div className="pro-filter">
                          <span className="txt-pro"><a href="https://bitpress.pro/" target="_blank" rel="noreferrer">{__('Premium', 'bitform')}</a></span>
                        </div>
                      )}
                      <img src={pay.logo} alt="" style={{ padding: 0 }} />
                      <div className="txt-center" style={{ fontSize: 14 }}>
                        {pay.type}
                      </div>
                    </div>
                  ))}
                </div>
              </Modal>

              <div role="button" className="btcd-inte-card inte-sm flx flx-center add-inte mr-4 mt-3" tabIndex="0" onClick={() => setShowMdl(true)} onKeyPress={() => setShowMdl(true)}>
                <div>+</div>
              </div>

              {payments?.map((pay, i) => (
                <div role="button" className="btcd-inte-card inte-sm mr-4 mt-3" key={`inte-${i + 3}`}>
                  {getLogo(pay.type)}
                  <div className="btcd-inte-atn txt-center">
                    <Link to={`${allIntegURL}/${pay.type}/${i}`} className="btn btcd-btn-o-blue btcd-btn-sm mr-2 tooltip pos-rel" style={{ '--tooltip-txt': `'${__('Edit', 'bitform')}'` }} type="button">
                      <span className="btcd-icn icn-edit" />
                    </Link>
                    <button className="btn btcd-btn-o-blue btcd-btn-sm mr-2 tooltip pos-rel" style={{ '--tooltip-txt': `'${__('Delete', 'bitform')}'` }} onClick={() => payDelConf(i)} type="button">
                      <span className="btcd-icn icn-trash-2" />
                    </button>
                  </div>
                  <div className="txt-center body" title={`${pay.name} | ${pay.type}`} style={{ marginTop: -15 }}>
                    <div>{pay.name}</div>
                    <small>{pay.type}</small>
                  </div>
                </div>
              ))}
            </div>
          </Route>
          <Route path={`${path}/:type/:indx?`}>
            <Payment allIntegURL={allIntegURL} />
          </Route>
        </Switch>

      </div>
    </div>
  )
}
