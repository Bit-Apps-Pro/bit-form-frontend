import { useAtomValue } from 'jotai'
import { $breakpoint, $fields, $flags } from '../../GlobalStates/GlobalStates'
import turnstileImg from '../../resource/img/cloudflareRecaptcha.svg'
import RenderStyle from '../style-new/RenderStyle'

export default function TurnstileField({ fieldKey, styleClasses }) {
  const fields = useAtomValue($fields)
  const fieldData = fields[fieldKey]
  const breakpoint = useAtomValue($breakpoint)
  const { styleMode } = useAtomValue($flags)
  const isHidden = fieldData.hidden?.includes(breakpoint) || false

  console.log(fieldData)
  return (
    <>
      <RenderStyle styleClasses={styleClasses} />
      <div
        data-dev-fld-wrp={fieldKey}
        className={`${fieldKey}-turnstile-container ${fieldKey}-fld-wrp ${styleMode ? '' : 'drag'} ${isHidden ? 'fld-hide' : ''}`}
      >
        <div className={`${fieldKey}-turnstile-wrp`}>
          <img height="70" src={turnstileImg} alt="cloudflare turnstile reCaptcha" />
        </div>
      </div>
    </>
  )
}
