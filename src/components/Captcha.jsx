import { useAtom, useAtomValue } from 'jotai'
import { useRef, useState } from 'react'
import { useFela } from 'react-fela'
import { Route, Routes, useLocation } from 'react-router-dom'
import { $reCaptchaV2, $reCaptchaV3 } from '../GlobalStates/AppSettingsStates'
import { $bits } from '../GlobalStates/GlobalStates'
import { deepCopy } from '../Utils/Helpers'
import bitsFetch from '../Utils/bitsFetch'
import { __ } from '../Utils/i18nwrap'
import CaptchaList from './AllCaptcha/CaptchaList'
import ReCaptchaV2 from './AllCaptcha/ReCaptchaV2'
import ReCaptchaV3 from './AllCaptcha/ReCaptchaV3'
import Turnstile from './AllCaptcha/Turnstile'
import SnackMsg from './Utilities/SnackMsg'

export default function Captcha() {
  const [reCaptchaV2, setreCaptchaV2] = useAtom($reCaptchaV2)
  const [reCaptchaV3, setreCaptchaV3] = useAtom($reCaptchaV3)
  const location = useLocation()
  const bits = useAtomValue($bits)
  const [snack, setsnack] = useState({ show: false })
  const [loading, setLoading] = useState(false)
  const { css } = useFela()
  const allIntegURL = useRef(location.pathname).current

  console.log('reCaptchaV2', reCaptchaV2)
  console.log('reCaptchaV3', reCaptchaV3)

  return (
    <div className="pb-6 w-7">
      <SnackMsg snack={snack} setSnackbar={setsnack} />
      <Routes>
        <Route index element={<CaptchaList setSnackbar={setsnack} />} />
        <Route path="reCaptchaV2" element={<ReCaptchaV2 />} />
        <Route path="reCaptchaV3" element={<ReCaptchaV3 />} />
        <Route path="turnstile" element={<Turnstile />} />
      </Routes>
    </div>
  )
}
