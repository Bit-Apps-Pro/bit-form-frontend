// eslint-disable-next-line import/no-extraneous-dependencies
import { __ } from '@wordpress/i18n';
import { useContext, useEffect, useState } from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import Captcha from '../components/Captcha';
import SnackMsg from '../components/ElmSettings/Childs/SnackMsg';
// import GCLID from '../components/GCLID'
 import SMTP from '../components/Smtp/SMTP'
import { AppSettings } from '../Utils/AppSettingsContext';
import bitsFetch from '../Utils/bitsFetch';
// import Cpt from '../components/Cpt/Cpt';
import Apikey from '../components/Apikey';

function AppSettingsPage() {
  const { reCaptchaV2, setreCaptchaV2 } = useContext(AppSettings)
  const [snack, setsnack] = useState({ show: false })

  const saveCaptcha = () => {
    bitsFetch({ reCaptchaV2 }, 'bitforms_save_grecaptcha')
      .then(res => {
        if (res !== undefined && res.success) {
          if (res.data && res.data.id) {
            setreCaptchaV2({ ...reCaptchaV2, id: res.data.id })
          }
          setsnack({ ...{ show: true, msg: __('Captcha Settings Updated', 'bitform') } })
        }
      })
  }

  useEffect(() => () => {
    bitsFetch({ reCaptchaV2 }, 'bitforms_save_grecaptcha')
      .then(res => {
        if (res !== undefined && res.success) {
          if (res.data && res.data.id) {
            setreCaptchaV2({ ...reCaptchaV2, id: res.data.id })
            setsnack({ ...{ show: true, msg: __('Captcha Settings Updated', 'bitform') } })
          }
        }
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="d-flx">
      <SnackMsg snack={snack} setSnackbar={setsnack} />
      <aside className="btcd-app-setting-sidebar mr-4">
        <NavLink to="/app-settings/recaptcha" activeClassName="btcd-app-s-a">
          <span className="btcd-icn icn-loop" />
          {__('reCAPTCHA', 'bitform')}
        </NavLink>
        {/* <NavLink to="/app-settings/gclid" activeClassName="btcd-app-s-a">
          <span className="btcd-icn icn-loop" />
          GCLID
        </NavLink> */}
        <NavLink to="/app-settings/smtp" activeClassName="btcd-app-s-a">
          <span className="btcd-icn icn-envelope-open-o" />
          {__('SMTP Settings', 'bitform')}
        </NavLink>
        {/* <NavLink to="/app-settings/cpt" activeClassName="btcd-app-s-a">
          <span className="btcd-icn icn-envelope-open-o" />
          {__('CPT', 'bitform')}
        </NavLink> */}
        <NavLink to="/app-settings/api-key" activeClassName="btcd-app-s-a">
          <span className="btcd-icn icn-envelope-open-o" />
          {__('Api Key', 'bitform')}
        </NavLink>
      </aside>

      <Switch>
        <Route path="/app-settings/recaptcha">
          <Captcha saveCaptcha={saveCaptcha} />
        </Route>
        {/* <Route path="/app-settings/gclid">
          <GCLID saveCaptcha={saveCaptcha} />
        </Route> */}
        <Route path="/app-settings/smtp">
          <SMTP setsnack={setsnack} />
        </Route>
        {/* <Route path="/app-settings/cpt">
          <Cpt />
        </Route> */}
        <Route path="/app-settings/api-key">
          <Apikey />
        </Route>
      </Switch>
    </div>
  )
}

export default AppSettingsPage
