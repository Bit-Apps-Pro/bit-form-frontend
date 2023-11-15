import { useFela } from 'react-fela'
import style from '../../styles/integrations.style'
import { __ } from '../../Utils/i18nwrap'

export default function ReCaptchaV3() {
  const { css } = useFela()
  return (
    <>
      <h2>{__('reCaptcha V3 Api')}</h2>
      <div className="btcd-hr" />
      <div className={`pos-rel ${css(style.integWrp)}`} />

    </>
  )
}
