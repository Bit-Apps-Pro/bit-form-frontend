import { useContext, useState } from 'react'
import { useFela } from 'react-fela'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { $bits } from '../GlobalStates/GlobalStates'
import EditIcn from '../Icons/EditIcn'
import TrashIcn from '../Icons/TrashIcn'
import paypal from '../resource/img/settings/paypal.svg'
import razorpay from '../resource/img/settings/razorpay.svg'
import app from '../styles/app.style'
import { AppSettings } from '../Utils/AppSettingsContext'
import bitsFetch from '../Utils/bitsFetch'
import { __ } from '../Utils/i18nwrap'
import ConfirmModal from './Utilities/ConfirmModal'
import Modal from './Utilities/Modal'

export default function PaymentSettings({ setSnackbar }) {
  const bits = useRecoilValue($bits)
  const navigate = useNavigate()
  const [showMdl, setShowMdl] = useState(false)
  const [confMdl, setconfMdl] = useState({ show: false })
  const { css } = useFela()
  const { payments, setPayments } = useContext(AppSettings)
  const { isPro } = bits
  const { pathname } = useLocation()

  const pays = [
    { type: 'PayPal', logo: paypal },
    { type: 'Razorpay', logo: razorpay },
  ]

  const setNewInteg = (type) => {
    setShowMdl(false)
    navigate(`${pathname}/${type}`)
  }

  const getLogo = type => {
    for (let i = 0; i < pays.length; i += 1) {
      if (pays[i].type === type) {
        return (
          <img
            src={pays[i].logo}
            alt={type}
            className="p-0"
          />
        )
      }
    }
    return null
  }

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
          setSnackbar({ show: true, msg: `${__('Integration deletion failed Cause')}:${response.data.data}. ${__('please try again')}` })
        } else {
          newInteg.splice(i, 0, tmpPayments)
          setPayments([...newInteg])
          setSnackbar({ show: true, msg: __('Integration deletion failed. please try again') })
        }
      })
  }

  const closeConfMdl = () => {
    confMdl.show = false
    setconfMdl({ ...confMdl })
  }

  const payDelConf = i => {
    confMdl.btnTxt = __('Delete')
    confMdl.body = __('Are you sure to delete this integration?')
    confMdl.btnClass = ''
    confMdl.action = () => { removeInteg(i); closeConfMdl() }
    confMdl.show = true
    setconfMdl({ ...confMdl })
  }

  return (
    <>
      <ConfirmModal
        show={confMdl.show}
        close={closeConfMdl}
        btnTxt={confMdl.btnTxt}
        btnClass={confMdl.btnClass}
        body={confMdl.body}
        action={confMdl.action}
      />
      <h2>{__('Payment Settings')}</h2>
      <div className="btcd-hr" />
      <div className="flx flx-wrp pos-rel">
        {!isPro && (
          <div className="pro-blur flx w-10" style={{ top: 5, left: -10 }}>
            <div className="pro">
              {__('Available On')}
              <a href="https://www.bitapps.pro/bit-form" target="_blank" rel="noreferrer">
                <span className="txt-pro">
                  {' '}
                  {__('Premium')}
                </span>
              </a>
            </div>
          </div>
        )}
        <Modal
          title={__('Available Payments')}
          show={showMdl}
          setModal={setShowMdl}
          style={{ width: 700 }}
        >
          <div className="d-flx flx-wrp btcd-inte-wrp">
            {pays.map((pay, i) => (
              <div
                key={`-${i + 2}`}
                onClick={() => !pay.disable && !pay.pro && setNewInteg(pay.type)}
                onKeyPress={() => !pay.disable && !pay.pro && setNewInteg(pay.type)}
                role="button"
                tabIndex="0"
                className={`btcd-inte-card  mr-4 mt-3 ${pay.disable && !pay.pro && css([app.btcd_inte_dis, 'btcd-inte-dis'])} ${pay.pro && 'btcd-inte-pro'}`}
              >
                {pay.pro && (
                  <div className="pro-filter">
                    <span className="txt-pro">
                      <a
                        href="https://www.bitapps.pro/bit-form"
                        target="_blank"
                        rel="noreferrer"
                      >
                        {__('Premium')}
                      </a>
                    </span>
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

        <div
          role="button"
          className="btcd-inte-card  flx flx-center add-inte mr-4 mt-3"
          tabIndex="0"
          onClick={() => setShowMdl(true)}
          onKeyPress={() => setShowMdl(true)}
        >
          <div>+</div>
        </div>

        {payments?.map((pay, i) => (
          <div role="button" className="btcd-inte-card  mr-4 mt-3 inte-edit" key={`inte-${i + 3}`}>
            {getLogo(pay.type)}
            <div className="btcd-inte-atn txt-center">
              <Link
                to={`${pathname}/${pay.type}/${i}`}
                className={`${css(app.btn)} btcd-btn-o-blue btcd-btn-sm mr-2 tooltip pos-rel`}
                style={{ '--tooltip-txt': `'${__('Edit')}'` }}
                type="button"
              >
                <EditIcn size="15" />
              </Link>
              <button
                className={`${css(app.btn)} btcd-btn-o-blue btcd-btn-sm mr-2 tooltip pos-rel`}
                style={{ '--tooltip-txt': `'${__('Delete')}'` }}
                onClick={() => payDelConf(i)}
                type="button"
              >
                <TrashIcn />
              </button>
            </div>
            <div className="txt-center body py-1" title={`${pay.name} | ${pay.type}`}>
              <div className="int-name">{pay.name}</div>
              <small className="int-type">{pay.type}</small>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
