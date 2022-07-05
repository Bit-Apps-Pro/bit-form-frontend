import { NavLink, Route, Switch } from 'react-router-dom'
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
        <NavLink to="/app-settings/recaptcha" activeClassName="btcd-app-s-a">
          <ReCaptchaIcn size="21" className="mr-1" />
          {__('reCAPTCHA', 'bitform')}
        </NavLink>
        <NavLink to="/app-settings/gclid" activeClassName="btcd-app-s-a">
          <span className="mr-1"><GoogleAdIcn size={19} /></span>
          {__('Google Ads', 'bitform')}
        </NavLink>
        <NavLink to="/app-settings/smtp" activeClassName="btcd-app-s-a">
          <span className="mr-1"><MailOpenIcn size="21" /></span>
          {__('SMTP', 'bitform')}
        </NavLink>
        <NavLink to="/app-settings/cpt" activeClassName="btcd-app-s-a">
          <span className="mr-1"><CPTIcn size={21} /></span>
          {__('CPT', 'bitform')}
        </NavLink>
        <NavLink to="/app-settings/api" activeClassName="btcd-app-s-a">
          <span className="mr-1"><APIIcon size={21} /></span>
          {__('API', 'bitform')}
        </NavLink>
        <NavLink to="/app-settings/payments" activeClassName="btcd-app-s-a">
          <PaymentsIcn size="16" className="mr-2" />
          <span className="ml-2">{__('Payments', 'bitform')}</span>
        </NavLink>
      </aside>

      <Switch>
        <Route path="/app-settings/recaptcha" component={Captcha} />
        <Route path="/app-settings/gclid" component={GCLID} />
        <Route path="/app-settings/smtp" component={SMTP} />
        <Route path="/app-settings/cpt" component={Cpt} />
        <Route path="/app-settings/api" component={Apikey} />
        <Route path="/app-settings/payments" component={Payments} />
      </Switch>
    </div>
  )
}

export default AppSettingsPage
