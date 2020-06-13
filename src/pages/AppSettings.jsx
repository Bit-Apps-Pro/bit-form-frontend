import React, { useEffect, useContext, useState } from 'react'
import { NavLink, Switch, Route } from 'react-router-dom'
import Captcha from '../components/Captcha'
import { AppSettings } from '../Utils/AppSettingsContext'
import bitsFetch from '../Utils/bitsFetch'
import SnackMsg from '../components/ElmSettings/Childs/SnackMsg'

function AppSettingsPage() {
  const { reCaptchaV2, setreCaptchaV2 } = useContext(AppSettings)
  const [snack, setsnack] = useState  ({ show: false })

  const saveCaptcha = () => {
    bitsFetch({ reCaptchaV2 }, 'bitforms_save_grecaptcha')
      .then(res => {
        if (res !== undefined && res.success) {
          if (res.data && res.data.id) {
            setreCaptchaV2({ ...reCaptchaV2, id: res.data.id })
          }
        }
      })
  }

  useEffect(() => {
    return () => {
      bitsFetch({ reCaptchaV2 }, 'bitforms_save_grecaptcha')
        .then(res => {
          if (res !== undefined && res.success) {
            if (res.data && res.data.id) {
              setreCaptchaV2({ ...reCaptchaV2, id: res.data.id })
              setsnack({ ...{ show: true, msg: 'Captcha Settings Updated' } })
            }
          }
        })
    }
  }, [])

  return (
    <div className="d-flx">
      <SnackMsg snack={snack} setSnackbar={setsnack} />
      <aside className="btcd-app-setting-sidebar mr-4">
        <NavLink to="/settings/recaptcha" activeClassName="btcd-app-s-a">
          <span className="btcd-icn icn-loop" />
          reCAPTCHA
        </NavLink>
      </aside>

      <Switch>
        <Route path="/settings/recaptcha">
          <Captcha saveCaptcha={saveCaptcha} />
        </Route>
      </Switch>
    </div>
  )
}

export default AppSettingsPage
