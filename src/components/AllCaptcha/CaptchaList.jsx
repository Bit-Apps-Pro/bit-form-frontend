import { useFela } from 'react-fela'
import { Link, useLocation } from 'react-router-dom'
import EditIcn from '../../Icons/EditIcn'
import { __ } from '../../Utils/i18nwrap'
import style from '../../styles/integrations.style'
import Tip from '../Utilities/Tip'

export default function CaptchaList() {
  const { css } = useFela()
  const { pathname } = useLocation()

  console.log('pathname', pathname)

  const captcha = [
    {
      name: 'reCaptcha V2',
      type: 'reCaptchaV2',
      logo: '',
      path: 'reCaptchaV2',
    },
    {
      name: 'reCaptcha V3',
      type: 'reCaptchaV3',
      logo: '',
      path: 'reCaptchaV3',
    },
    {
      name: 'hCaptcha',
      type: 'hCaptcha',
      logo: '',
      path: 'hCaptcha',
    },
    {
      name: 'Cloudflare Turnstile',
      type: 'turnstile',
      logo: '',
      path: 'turnstile',
    },

  ]
  return (
    <div>
      <h2>{__('reCaptcha Settings')}</h2>
      <div className="btcd-hr" />
      <div className={`pos-rel ${css(style.integWrp)}`}>

        {captcha?.map((pay, i) => (
          <div role="button" className={css(style.itegCard)} key={`pay-${i + 3}`}>
            <img
              src={pay.logo}
              alt={pay.type}
              className={css(style.integLogo)}
            />
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
                  to={`${pathname}/${pay.type}`}
                  className={`${css(style.actionBtn)}`}
                  type="button"
                >
                  <EditIcn size={19} />
                </Link>
              </Tip>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
