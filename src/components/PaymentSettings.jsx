import { useState } from 'react'
import { useFela } from 'react-fela'
import toast from 'react-hot-toast'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAtom } from 'recoil'
import { $payments } from '../GlobalStates/AppSettingsStates'
import EditIcn from '../Icons/EditIcn'
import PlusIcn from '../Icons/PlusIcn'
import TrashIcn from '../Icons/TrashIcn'
import { IS_PRO, deepCopy } from '../Utils/Helpers'
import bitsFetch from '../Utils/bitsFetch'
import { __ } from '../Utils/i18nwrap'
import paypal from '../resource/img/settings/paypal.svg'
import razorpay from '../resource/img/settings/razorpay.svg'
import stripe from '../resource/img/settings/stripe.svg'
import style from '../styles/integrations.style'
import ConfirmModal from './Utilities/ConfirmModal'
import Modal from './Utilities/Modal'
import Tip from './Utilities/Tip'

export default function PaymentSettings({ setSnackbar }) {
  const navigate = useNavigate()
  const [showMdl, setShowMdl] = useState(false)
  const [confMdl, setconfMdl] = useState({ show: false })
  const { css } = useFela()
  const [payments, setPayments] = useAtom($payments)
  const { pathname } = useLocation()
  console.log('payments', payments)
  const pays = [
    { type: 'PayPal', logo: paypal },
    { type: 'Razorpay', logo: razorpay },
    { type: 'Stripe', logo: stripe },
  ]

  const setNewInteg = (type) => {
    if (!IS_PRO) {
      toast.error('This payment is only available in Bit Form Pro.')
      return false
    }
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
            className={css(style.integLogo)}
          />
        )
      }
    }
    return null
  }

  const removeInteg = i => {
    const tmpPayments = { ...payments[i] }
    const newInteg = deepCopy(payments)
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
      <div className={`pos-rel ${css(style.integWrp)}`}>
        <Modal
          title={__('Available Payments')}
          show={showMdl}
          setModal={setShowMdl}
          style={{ width: 700 }}
        >
          <div className="flx flx-center flx-wrp pb-3">
            {pays.map((pay, i) => (
              <div
                key={`payment-${i + 2}`}
                onClick={() => IS_PRO && setNewInteg(pay.type)}
                onKeyDown={() => IS_PRO && setNewInteg(pay.type)}
                role="button"
                tabIndex="0"
                className={`${css(style.thumb)} ${pay.disable && !IS_PRO && css(style.integCardDisabled)}`}
              >
                {!IS_PRO && (
                  <div className={css(style.thumbPro)}>
                    <a
                      className={css(style.thumbProTxt)}
                      href="https://www.bitapps.pro/bit-form"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {__('Available on')}
                      <br />
                      {__('Pro')}
                    </a>
                  </div>
                )}
                <img className={css(style.thumbImg)} loading="lazy" src={pay.logo} alt="" />
                <div className={css(style.thumbTitle)}>
                  {pay.type}
                </div>
              </div>
            ))}
          </div>
        </Modal>

        <div
          role="button"
          className={css(style.itegCard)}
          tabIndex="0"
          onClick={() => setShowMdl(true)}
          onKeyDown={() => setShowMdl(true)}
        >
          <div className={css(style.integPlus)}>
            <PlusIcn size={80} />
          </div>
        </div>

        {payments?.map((pay, i) => (
          <div role="button" className={css(style.itegCard)} key={`pay-${i + 3}`}>
            {getLogo(pay.type)}
            <div className="py-1" title={`${pay.name} | ${pay.type}`}>
              <div className={css(style.integTitle)}>
                {pay.name}
              </div>
              <small className={css(style.integSubtitle)}>
                {pay.type}
              </small>
            </div>
            <div className={`${css(style.actionWrp)} action-wrp`}>
              <Tip msg={__('Edit')}>
                <Link
                  to={`${pathname}/${pay.type}/${i}`}
                  className={`${css(style.actionBtn)}`}
                  type="button"
                >
                  <EditIcn size={19} />
                </Link>
              </Tip>
              <Tip msg={__('Delete')}>
                <button
                  className={`${css(style.actionBtn)}`}
                  onClick={() => payDelConf(i)}
                  type="button"
                >
                  <TrashIcn size={18} />
                </button>
              </Tip>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
