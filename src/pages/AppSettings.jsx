import { useState } from 'react'
import { NavLink, Route, Switch } from 'react-router-dom'
import { __ } from '../Utils/i18nwrap'
// import Cpt from '../components/Cpt/Cpt'
import Apikey from '../components/Apikey'
import Captcha from '../components/Captcha'
import SnackMsg from '../components/Utilities/SnackMsg'
// import Cpt from '../components/Cpt/Cpt';
import Payments from '../components/Payments'
import GCLID from '../components/GCLID'
import SMTP from '../components/Smtp/SMTP'
import Cpt from '../components/Cpt/Cpt'
import CPTIcn from '../Icons/CPTIcn'
import APIIcon from '../Icons/APIIcon'
import GoogleAdIcn from '../Icons/GoogleAdIcn'
import PaymentsIcn from '../Icons/PaymentsIcn'

function AppSettingsPage() {
  const [snack, setsnack] = useState({ show: false })

  return (
    <div className="d-flx">
      <SnackMsg snack={snack} setSnackbar={setsnack} />
      <aside className="btcd-app-setting-sidebar mr-4">
        <NavLink to="/app-settings/recaptcha" activeClassName="btcd-app-s-a">
          <span className="btcd-icn icn-loop" />
          {__('reCAPTCHA', 'bitform')}
        </NavLink>
        <NavLink to="/app-settings/gclid" activeClassName="btcd-app-s-a">
          <span className="mr-1"><GoogleAdIcn size={21} /></span>
          {__('Google Ads', 'bitform')}
        </NavLink>
        <NavLink to="/app-settings/smtp" activeClassName="btcd-app-s-a">
          <span className="btcd-icn icn-envelope-open-o" />
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
        <Route path="/app-settings/recaptcha">
          <Captcha />
        </Route>
        <Route path="/app-settings/gclid">
          <GCLID />
        </Route>
        <Route path="/app-settings/smtp">
          <SMTP setsnack={setsnack} />
        </Route>
        <Route path="/app-settings/cpt">
          <Cpt />
        </Route>
        <Route path="/app-settings/api">
          <Apikey />
        </Route>
        <Route path="/app-settings/payments">
          <Payments />
        </Route>
      </Switch>
    </div>
  )
}

export default AppSettingsPage
