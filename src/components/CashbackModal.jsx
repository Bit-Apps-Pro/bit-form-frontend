import { useState } from 'react'
import { useFela } from 'react-fela'
import { __ } from '../Utils/i18nwrap'
import Modal from './Utilities/Modal'

export default function CashbackModal() {
  const [show, setShow] = useState(false)
  const { css } = useFela()

  return (
    <div className="changelog-toggle">
      <button
        title={__('What\'s New')}
        type="button"
        className={css(styles.button)}
        onClick={() => setShow(true)}
      >
        Get $10
      </button>
      <Modal sm show={show} onCloseMdl={() => setShow(false)} className={css(styles.modal)}>
        <div>
          <div className={css(styles.titleWrapper)}>
            <h3 className={css(styles.title)}>
              Get $10 Cashback
            </h3>
            <b>Thank you for using Bit Form.</b>
          </div>
          <div className={css(styles.detailsWrapper)}>

            <p className={css({ m: '0px 5px 5px' })}>
              To get
              {' '}
              <strong>$10 cashback</strong>
              : give us a review on
              <a href="https://wordpress.org/support/plugin/bit-form/reviews/" target="_blank" rel="noreferrer">
                {__('Wordprss ')}
              </a>
              {' '}
              by clicking the
              {' '}
              <a href="https://wordpress.org/support/plugin/bit-form/reviews/" target="_blank" rel="noreferrer">
                {__('Review us')}
              </a>
              {' '}
              button and send an email with the review link to &quot;support@bitapps.pro&quot;.
            </p>
          </div>
        </div>
        <div className={css(styles.footer)}>
          <a className={css(styles.footerBtn)} href="https://wordpress.org/support/plugin/bit-form/reviews/" target="_blank" rel="noreferrer">
            {__('Review us')}
          </a>
        </div>
      </Modal>
    </div>
  )
}

const styles = {
  modal: {
    '&>div.btcd-modal-content': {
      p: '0px !important',
    },
  },
  button: {
    b: 'none',
    cr: 'var(--dp-blue)',
    brs: '10px',
    curp: 'pointer',
    flx: 'center',
    p: '0px 15px',
    h: '40px',
    bd: 'rgb(78 255 191)',
    fs: '15px',
    fw: '700',
    mr: '10px',
    '&:hover': {
      bd: '#90ffd7',
    },
  },
  titleWrapper: {
    flx: 'center',
    fd: 'column',
    jc: 'center',
    ai: 'center',
    h: '20vh',
    mb: 10,
    ff: '"Outfit", sans-serif !important',
    bd: '#3582c4',
    cr: '#ffffff',
  },
  title: {
    m: 0,
    fs: 35,
    fw: 700,
    cr: '#ffffff',
  },
  detailsWrapper: {
    flx: 'center',
    fd: 'column',
    jc: 'center',
    ai: 'center',
    p: 20,

  },
  footer: {
    p: 10,
    dy: 'flex',
    jc: 'center',
    ai: 'center',
  },
  footerBtn: {
    b: 'none',
    brs: '5px',
    dy: 'inline-block',
    fw: '500',
    lh: '1.4',
    p: '2px 13px',
    pn: 'relative',
    fs: '1rem',
    bd: '#006a9d',
    cr: '#ffffff',
    '&:focus': {
      cr: '#ffffff',
    },
    '&:hover': {
      bd: '#3582c4',
      cr: '#ffffff',
    },
  },
}
