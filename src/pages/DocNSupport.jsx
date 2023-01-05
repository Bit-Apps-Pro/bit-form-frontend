/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useFela } from 'react-fela'
import logo from '../../logo.svg'
import ExternalLinkIcn from '../Icons/ExternalLinkIcn'
import MailIcn from '../Icons/MailIcn'
import ut from '../styles/2.utilities'

export default function DocNSupport() {
  const { css } = useFela()
  return (
    <>
      <div className={css(style.main)}>
        <img className={css(style.logo)} src={logo} alt="bit form logo" />
        <h2 className={css(style.title)}>Bit Form</h2>
      </div>
      <div className={css(style.container)}>
        <h2>Professional & Easy To Use WordPress Form Builder</h2>
        <p className={css(style.fs)}>Drag and Drop WordPress Form Builder will allow you to build any kind of forms for WordPress website that you can imagine. The Professional design of Bit Form keeps all the tools right where you want them! You can make integration among various CRM and application with no zero experience.</p>
        <h2>Doc</h2>
        <p className={css(style.fs)}>
          Explore our extensive documentation. From beginners to developers - everyone will get an answer
          {' '}
          <a target="_blank" href="https://www.bitapps.pro/bit-form" rel="noreferrer">
            here
            {' '}
            <ExternalLinkIcn size="15" />
          </a>
        </p>
        <h2>Support</h2>
        <p className={css(style.fs)}>In Bit Apps, we provide all kind product support for any types of customer, it doesn't matter FREE or PRO user. We actively provide support through Email and Live Char. Our support team is always ready to help you. We are here to answer your questions and help you with any issues you may have.</p>
        <div className={css(style.suprt)}>
          <span className={css(ut.mr2)}>
            <MailIcn size="20" />
          </span>
          <span>
            support@bitapps.pro
          </span>
        </div>
      </div>
    </>
  )
}
const style = {
  main: {
    flx: 'align-center',
  },
  logo: {
    w: 30,
    h: 30,
    ml: 10,
    mt: 10,
  },
  title: {
    fs: 20,
    fw: 600,
    m: 10,
  },
  container: {
    m: 10,
  },
  fs: {
    fs: 14,
  },
  suprt: {
    flx: 'align-center',
  },
}
