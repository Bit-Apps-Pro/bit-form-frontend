import React, { useEffect, useContext } from 'react'
import { NavLink, Switch, Route } from 'react-router-dom'
import Captcha from '../components/Captcha'
import { AppSettings } from '../Utils/AppSettingsContext'
import bitsFetch from '../Utils/bitsFetch'

function AppSettingsPage() {
  const { reCaptchaV2, setreCaptchaV2 } = useContext(AppSettings)
  useEffect(() => {
    return () => {
      bitsFetch({ reCaptchaV2 }, 'bitforms_save_grecaptcha')
        .then(res => {
          if (res !== undefined && res.success) {
            if (res.data && res.data.id) {
              setreCaptchaV2({ ...reCaptchaV2, id: res.data.id })
            }
          }
        })
    }
  }, [])

  return (
    <div className="d-flx">
      <aside className="btcd-app-setting-sidebar mr-4">
        <NavLink to="/settings/recaptcha" activeClassName="btcd-app-s-a">
          <span className="btcd-icn icn-loop" />
          reCAPTCHA
        </NavLink>
      </aside>

      <Switch>
        <Route path="/settings/recaptcha">
          <Captcha />
        </Route>
      </Switch>
    </div>
  )
}

export default AppSettingsPage
