import { Route, Routes } from 'react-router-dom'
import CaptchaList from './AllCaptcha/CaptchaList'
import GoogleCaptcha from './AllCaptcha/GoogleCaptcha'
import Turnstile from './AllCaptcha/Turnstile'

export default function CaptchaRoutes() {
  return (
    <div className="pb-6 w-7">
      <Routes>
        <Route index element={<CaptchaList />} />
        <Route path="reCaptchaV2" element={<GoogleCaptcha ver="v2" />} />
        <Route path="reCaptchaV3" element={<GoogleCaptcha ver="v3" />} />
        <Route path="turnstile" element={<Turnstile />} />
      </Routes>
    </div>
  )
}
