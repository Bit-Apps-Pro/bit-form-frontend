import { useState } from 'react'
import ExternalLinkIcn from '../Icons/ExternalLinkIcn'
import { __ } from '../Utils/i18nwrap'
import '../resource/css/cashback-modal.css'
import Modal from './Utilities/Modal'
import { IS_PRO } from '../Utils/Helpers'

const PRODUCT_NAME = 'Bit Form'
const REVIEW_URL = 'https://wordpress.org/support/plugin/bit-form/reviews/#new-post'

export default function CashbackModal() {
  const [show, setShow] = useState(false)

  if (!IS_PRO) return

  return (
    <div className="cashback-modal">
      <button
        title={__('Get $10 Cashback')}
        type="button"
        className="cashback-btn"
        onClick={() => setShow(true)}
      >
        Get $10 Cashback
      </button>
      <Modal sm show={show} onCloseMdl={() => setShow(false)} className="modal">
        <div>
          <div className="title-wrapper">
            <h3 className="title">
              Get $10 Cashback
            </h3>
            <b>
              Thank you for using
              &nbsp;
              {PRODUCT_NAME}
            </b>
          </div>
          <div className="details-wrapper">
            <p className="details">
              Give us a review on WordPress by clicking the
              &nbsp;
              <a href={REVIEW_URL} target="_blank" rel="noreferrer">Review us</a>
              &nbsp;
              button and send an email with the review link to
              &nbsp;
              <a href="mailto:support@bitapps.pro" target="_blank" rel="noreferrer">support@bitapps.pro</a>
              . We will honour you with
              &nbsp;
              <strong>$10 cashback</strong>
              &nbsp;
              for your time & effort.
            </p>
            <div className="review-tips">
              <span>Suggestions on how you may write the review:</span>
              <ol>
                <li>What features do you like most in Bit Form?</li>
                <li>Which software did you previously used for these features?</li>
              </ol>
            </div>
          </div>
        </div>
        <div className="footer-wrapper">
          <a className="footer-btn blue" href={REVIEW_URL} target="_blank" rel="noreferrer">
            {__('Review us')}
            <ExternalLinkIcn size={16} className="" />
          </a>
        </div>
      </Modal>
    </div>
  )
}
