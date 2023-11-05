import { useAtom } from 'jotai'
import { useState } from 'react'
import { useFela } from 'react-fela'
import { $bits } from '../GlobalStates/GlobalStates'
import CashBackIcn from '../Icons/CashBackIcn'
import ExternalLinkIcn from '../Icons/ExternalLinkIcn'
import changelogInfo from '../Utils/StaticData/changelogInfo'
import bitsFetch from '../Utils/bitsFetch'
import { __ } from '../Utils/i18nwrap'
import Modal from './Utilities/Modal'

export default function CashbackToggle() {
  const [bits, setBits] = useAtom($bits)
  const [show, setShow] = useState(bits.changelogVersion !== bits.version)
  const currentChangelog = '2.6.0'
  const currenChangelog = changelogInfo[currentChangelog]
  const { css } = useFela()
  console.log('bits', bits)
  const setChangeLogVersion = () => {
    setShow(false)
    bitsFetch({
      version: bits.version,
    }, 'bitforms_changelog_version')
      .then(() => {
        console.log('done')
        setBits(prevBits => ({ ...prevBits, changelogVersion: prevBits.version }))
      })
  }

  if (!currenChangelog) return

  return (
    <div className="changelog-toggle">
      <button
        title={__('What\'s New')}
        type="button"
        className={css(styles.button)}
        onClick={() => setShow(true)}
      >
        {/* <QuestionIcn size={25} /> */}
        <CashBackIcn size={25} />
        <span className={css(styles.btnTxt)}>Get 10$</span>
      </button>
      <Modal sm show={show} onCloseMdl={setChangeLogVersion} className={css(styles.modal)}>
        <div>
          <div className={css(styles.titleWrapper)}>
            <h3 className={css(styles.title)}>
              Get 10$ Cashback
            </h3>
          </div>
          <p className={css({ m: '0px 5px 5px' })}>
            <b>Thank you for using Bit Assist.</b>
            <br />
            {' '}
            To get
            {' '}
            <strong>$10 cashback</strong>
            : give us a review on WordPress by clicking the button and send an email with the review link to support@bitapps.pro
          </p>
        </div>
        <div className={css(styles.content)}>
          {Object.entries(currenChangelog.changes).map(([titile, obj]) => (
            <div className={css({ p: '0px 5px' })} key={titile}>
              <span className={css(styles.bdg, styles[titile])}>{obj.label}</span>
              {obj.tag && <span className={css(styles.tag)}>{obj.tag}</span>}

            </div>
          ))}
        </div>
        <div className={css({})}>
          <span className={css({ m: '0px 5px 5px' })}>{__('For more details,')}</span>
          <a href="https://bitapps.pro/docs/bit-form/changelog/" target="_blank" rel="noreferrer">
            {__('Click here ')}
            <ExternalLinkIcn size="14" />
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
  content: {
    owy: 'scroll',
    mxh: '70vh',
  },
  button: {
    b: 'none',
    cr: 'white',
    brs: '10px',
    curp: 'pointer',
    flx: 'center',
    h: '40px',
    bd: '#70707085',
    mr: '10px',
    '&:hover': {
      bd: '#707070',
    },
  },
  btnTxt: {
    ml: 5,
    fs: 13,
    fw: 500,
  },
  titleWrapper: {
    flx: 'center',
    jc: 'center',
    ai: 'center',
    h: '20vh',
    mb: 10,
    ff: 'emoji',
    bd: '#0db1ff',
  },
  title: {
    m: 0,
    fs: 20,
    fw: 700,
  },
  ul: {
    ml: 20,
    '> li': {
      mb: 10,
      listStyle: 'circle',
      fs: 14,
      fw: 400,
    },
  },
  tag: {
    bd: '#f6cbff',
    brs: '20px',
    cr: '#161a2e !important',
    fs: '.75rem',
    fw: '500',
    lh: '1.4',
    p: '2px 13px',
    ml: '5px',
  },
  bdg: {
    brs: '5px',
    dy: 'inline-block',
    fw: '500',
    lh: '1.4',
    p: '2px 13px',
    pn: 'relative',
    '&::before': {
      bd: 'inherit',
      brs: '3px',
      ct: '',
      h: '20px',
      lt: '-6px',
      pn: 'absolute',
      tp: '3px',
      tm: 'rotate(45deg)',
      w: '20px',
      zx: '-1',
    },
  },
  added: {
    bd: '#0DB1FF',
    c: '#24292e',
  },
  imporovement: {
    bd: '#00FFBF',
    c: '#24292e',
  },
  fixed: {
    bd: '#FFD000',
    c: '#24292e',
  },
}
