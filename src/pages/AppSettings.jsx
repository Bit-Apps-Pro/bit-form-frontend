import React, { useEffect } from 'react'
import { NavLink, Switch, Route } from 'react-router-dom'
import Captcha from '../components/Captcha'

function AppSettings() {

  useEffect(() => {
    return () => {
      // save in db
      // bitsFetch('Save-app-setting in database')
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

export default AppSettings
