import { useAtomValue } from 'jotai'
import { useEffect, useRef } from 'react'
import { $turnstile } from '../../GlobalStates/AppSettingsStates'
import { $breakpoint, $fields, $flags } from '../../GlobalStates/GlobalStates'
import { reCalculateFldHeights } from '../../Utils/FormBuilderHelper'
import { loadScript, removeScript, selectInGrid } from '../../Utils/globalHelpers'
import RenderStyle from '../style-new/RenderStyle'

export default function TurnstileField({ fieldKey, styleClasses }) {
  const turnstileWrapElmRef = useRef(null)
  const turnstileResetIntervalRef = useRef(null)
  const fields = useAtomValue($fields)
  const fieldData = fields[fieldKey]
  const breakpoint = useAtomValue($breakpoint)
  const { styleMode } = useAtomValue($flags)
  const isHidden = fieldData.hidden?.includes(breakpoint) || false
  const turnstileId = useRef(null)
  const turnstile = useAtomValue($turnstile)
  const { siteKey } = turnstile || {}
  console.log('siteKey', siteKey)

  useEffect(() => {
    window.onloadTurnstileCallback = onloadTurnstileCallback
    console.log('window.onloadTurnstileCallback', window.onloadTurnstileCallback)

    const src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onloadTurnstileCallback'
    const srcData = {
      src,
      integrity: '',
      id: 'bf-turnstile-script',
      async: true,
      defer: true,
    }

    loadScript(srcData)

    return () => {
      clearInterval(turnstileResetIntervalRef.current)
      removeScript(srcData.id)
    }
  }, [])

  function O(e, n) {
    return n != null && typeof Symbol !== 'undefined' && n[Symbol.hasInstance] ? !!n[Symbol.hasInstance](e) : O(e, n)
  }

  function onloadTurnstileCallback() {
    let turnstileElm = selectInGrid(`.${fieldKey}-turnstile`)
    console.log('turnstileElm', turnstileElm, typeof turnstileElm, O(turnstileElm, HTMLElement))
    if (turnstileId.current !== null) {
      console.log('turnstileElm', { turnstileElm, turnstileId })
      turnstileElm?.remove()
      window.turnstile.reset(turnstileId.current)
      turnstileElm = document.createElement('div')
      turnstileElm.classList.add(`${fieldKey}-turnstile`)
      turnstileWrapElmRef.current.appendChild(turnstileElm)
    }
    turnstileId.current = window.turnstile.render(turnstileElm, {
      sitekey: siteKey,
      theme: fieldData.config.theme,
      size: fieldData.config.size,
      callback: (token) => {
        console.log('token', token)
      },
    })
    reCalculateFldHeights(fieldKey)
    if (turnstileResetIntervalRef.current) {
      clearInterval(turnstileResetIntervalRef.current)
    }
    turnstileResetIntervalRef.current = setInterval(() => {
      window.turnstile.reset(turnstileId.current)
    }, 30000)
  }

  useEffect(() => {
    console.log('window.turnstile', window.turnstile)
    if (window.turnstile) onloadTurnstileCallback()
  }, [fieldData])

  return (
    <>
      <RenderStyle styleClasses={styleClasses} />
      <div
        data-dev-fld-wrp={fieldKey}
        className={`${fieldKey}-turnstile-container ${fieldKey}-fld-wrp ${styleMode ? '' : 'drag'} ${isHidden ? 'fld-hide' : ''}`}
      >
        <div className={`${fieldKey}-turnstile-wrp`} ref={turnstileWrapElmRef}>
          <div className={`${fieldKey}-turnstile`} />
        </div>
      </div>
    </>
  )
}
