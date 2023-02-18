// create a react component

import { useFela } from 'react-fela'
import { __ } from '../../../../Utils/i18nwrap'

export default function PremiumOverlay({ classes }) {
  const { css } = useFela()
  return (
    <>
      <div className={css(style.content)}>
        {__('Note: This is a Pro Feature. to unlock this feature, please ')}
        <a href="https://www.bitapps.pro/bit-form" target="_blank" rel="noreferrer">
          <span className={css(style.textLink)}>
            {__('Upgrade to Pro')}
          </span>
        </a>
        {__('. Please ')}
        <a href="https://docs.form.bitapps.pro" target="_blank" rel="noreferrer">
          <span className={css(style.textLink)}>
            {__('Click Here ')}
          </span>
        </a>
        {__('to learn more about BitForm Pro.')}
      </div>
      <div className={css(style.overlay)} />
    </>
  )
}

const style = {
  content: {
    fs: '12px',
    fw: '400',
    p: '5px 10px',
  },
  overlay: {
    bd: 'hsl(215deg 1% 77% / 22%)',
    brs: 8,
    pn: 'absolute',
    tp: 55,
    lp: 0,
    w: '100%',
    h: 'calc(100% - 55px)',
    zx: 2,
    bpf: 'blur(0.5px)',
  },
  textLink: {
    cr: 'blue',
    td: 'underline',
  },
}
