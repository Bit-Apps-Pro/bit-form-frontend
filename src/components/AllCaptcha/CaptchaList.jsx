import { useAtomValue } from 'jotai'
import { useFela } from 'react-fela'
import { Link, useLocation } from 'react-router-dom'
import { $reCaptchaV2, $reCaptchaV3, $turnstile } from '../../GlobalStates/AppSettingsStates'
import EditIcn from '../../Icons/EditIcn'
import { __ } from '../../Utils/i18nwrap'
import style from '../../styles/integrations.style'
import Tip from '../Utilities/Tip'

export default function CaptchaList() {
  const { css } = useFela()
  const { pathname } = useLocation()

  const reCaptchaV2 = useAtomValue($reCaptchaV2)
  const reCaptchaV3 = useAtomValue($reCaptchaV3)
  const turnstile = useAtomValue($turnstile)

  const captcha = [
    {
      name: 'reCaptcha V2',
      type: 'reCaptchaV2',
      logo: '',
      path: 'reCaptchaV2',
      siteKey: reCaptchaV2?.siteKey,
      secretKey: reCaptchaV2?.secretKey,
    },
    {
      name: 'reCaptcha V3',
      type: 'reCaptchaV3',
      logo: '',
      path: 'reCaptchaV3',
      siteKey: reCaptchaV3?.siteKey,
      secretKey: reCaptchaV3?.secretKey,
    },
    // {
    //   name: 'hCaptcha',
    //   type: 'hCaptcha',
    //   logo: '',
    //   path: 'hCaptcha',
    // },
    {
      name: 'Turnstile',
      type: 'Cloudflare Turnstile',
      logo: '',
      path: 'turnstile',
      siteKey: turnstile?.siteKey,
      secretKey: turnstile?.secretKey,
    },

  ]

  const subStr = str => {
    const len = str.length
    const first = str.substring(0, 5)
    const last = str.substring(len - 5, len)
    return `${first}*****${last}`
  }
  return (
    <div>
      <h2>{__('reCaptcha Settings')}</h2>
      <div className="btcd-hr" />
      <div className={`pos-rel ${css(style.integWrp)}`}>

        {captcha?.map((captch, i) => (
          <Link
            to={`${pathname}/${captch.type}`}
            role="button"
            className={css(style.itegCard)}
            key={`captch-${i + 3}`}
          >
            <img
              src={captch.logo}
              alt={captch.type}
              className={css(style.integLogo)}
            />
            <div className="py-1" title={`${captch.name} | ${captch.type}`}>
              <div className={css(style.integTitle)}>
                {captch.name}
              </div>
              <small className={css(style.integSubtitle)}>
                {captch.type}
              </small>
              {captch.siteKey && (
                <div className={css({ fs: 14 })}>
                  Site Key:
                  {' '}
                  {subStr(captch.siteKey)}
                </div>
              )}
              {captch.secretKey && (
                <div className={css({ fs: 14 })}>
                  Secret Key:
                  {' '}
                  {subStr(captch.secretKey)}
                </div>
              )}
              {(!captch.siteKey && !captch.secretKey) && (
                <div className={css({ fs: 14, cr: 'red' })}>
                  Please Configure
                </div>
              )}
            </div>
            <div className={`${css(style.actionWrp)} action-wrp`}>
              <Tip msg={__('Edit')}>
                <Link
                  to={`${pathname}/${captch.type}`}
                  className={`${css(style.actionBtn)}`}
                  type="button"
                >
                  <EditIcn size={19} />
                </Link>
              </Tip>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
