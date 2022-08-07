import { NavLink, Route, Routes } from 'react-router-dom'
// import Cpt from '../components/Cpt/Cpt'
import Apikey from '../components/Apikey'
import Captcha from '../components/Captcha'
import Cpt from '../components/Cpt/Cpt'
import GCLID from '../components/GCLID'
// import Cpt from '../components/Cpt/Cpt';
import Payments from '../components/Payments'
import SMTP from '../components/Smtp/SMTP'
import APIIcon from '../Icons/APIIcon'
import CPTIcn from '../Icons/CPTIcn'
import GoogleAdIcn from '../Icons/GoogleAdIcn'
import MailOpenIcn from '../Icons/MailOpenIcn'
import PaymentsIcn from '../Icons/PaymentsIcn'
import ReCaptchaIcn from '../Icons/ReCaptchaIcn'
import { __ } from '../Utils/i18nwrap'

function AppSettingsPage() {
  return (
    <div className="d-flx">
      <aside className="btcd-app-setting-sidebar mr-4">
        <NavLink
          to="/app-settings/recaptcha"
          className={({ isActive }) => (isActive ? 'btcd-app-s-a' : '')}
        >
          <ReCaptchaIcn size="21" className="mr-1" />
          {__('reCAPTCHA')}
        </NavLink>
        <NavLink
          to="/app-settings/gclid"
          className={({ isActive }) => (isActive ? 'btcd-app-s-a' : '')}
        >
          <span className="mr-1"><GoogleAdIcn size={19} /></span>
          {__('Google Ads')}
        </NavLink>
        <NavLink
          to="/app-settings/smtp"
          className={({ isActive }) => (isActive ? 'btcd-app-s-a' : '')}
        >
          <span className="mr-1"><MailOpenIcn size="21" /></span>
          {__('SMTP')}
        </NavLink>
        <NavLink
          to="/app-settings/cpt"
          className={({ isActive }) => (isActive ? 'btcd-app-s-a' : '')}
        >
          <span className="mr-1"><CPTIcn size={21} /></span>
          {__('CPT')}
        </NavLink>
        <NavLink
          to="/app-settings/api"
          className={({ isActive }) => (isActive ? 'btcd-app-s-a' : '')}
        >
          <span className="mr-1"><APIIcon size={21} /></span>
          {__('API')}
        </NavLink>
        <NavLink
          to="/app-settings/payments"
          className={({ isActive }) => (isActive ? 'btcd-app-s-a' : '')}
        >
          <PaymentsIcn size="16" className="mr-2" />
          <span className="ml-2">{__('Payments')}</span>
        </NavLink>
      </aside>

      <Routes>
        {/* <Route path="/app-settings/recaptcha" element={<Captcha />} />
        <Route path="/app-settings/gclid" element={<GCLID />} />
        <Route path="/app-settings/smtp" element={<SMTP />} />
        <Route path="/app-settings/cpt" element={<Cpt />} />
        <Route path="/app-settings/api" element={<Apikey />} />
        <Route path="/app-settings/payments" element={<Payments />} /> */}
        {/* <Route path="app-settings/*"> */}
        <Route index path="recaptcha" element={<Captcha />} />
        <Route path="gclid" element={<GCLID />} />
        <Route path="smtp" element={<SMTP />} />
        <Route path="cpt" element={<Cpt />} />
        <Route path="api" element={<Apikey />} />
        <Route path="payments/*" element={<Payments />} />
        {/* </Route> */}
      </Routes>
    </div>
  )
}

export default AppSettingsPage
