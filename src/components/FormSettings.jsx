import React from 'react'
import { Switch, Route, NavLink, useRouteMatch, useParams } from 'react-router-dom'
import ConfType from './ConfType'
import EmailNotfication from './EmailNotfication'

export default function FormSettings(props) {
  console.log('%c $render FormSettings', 'background:green;padding:3px;border-radius:5px;color:white')

  const { path } = useRouteMatch()
  const { formType, formID } = useParams()

  console.log({ formType, formID })
  return (
    <div className="btcd-f-settings">
      <aside className="btcd-f-sidebar">
        <br />
        <br />
        <br />
        <NavLink exact to={`/builder/${formType}/${formID}/settings/`} activeClassName="btcd-f-a">
          <span className="btcd-icn icn-file" />
          Form Settings
        </NavLink>
        <NavLink to={`/builder/${formType}/${formID}/settings/email-notification`} activeClassName="btcd-f-a">
          <span className="btcd-icn icn-envelope-open-o" />
          Email Notification
        </NavLink>
        <NavLink to="b" activeClassName="btcd-f-a">Form Settings</NavLink>
        <NavLink to="c" activeClassName="btcd-f-a">Form Settings</NavLink>
      </aside>

      <div className="btcd-s-wrp">
        <Switch>
          <Route path={`/builder/${formType}/${formID}/settings/`}>
            <div>
              <div><b>Form Name: </b></div>
              <input className="btcd-paper-inp" type="text" value={props.formName} onChange={(e) => props.setFormName(e.target.value)} placeholder="Form Name" />
            </div>
            <ConfType formSettings={props.formSettings} setFormSettings={props.setFormSettings} />
          </Route>
          <Route path={`/builder/${formType}/${formID}/settings/email-notification`}>
            <EmailNotfication />
          </Route>
          <Route path={`${path}/b`}>
            B
          </Route>
          <Route path={`${path}/c`}>
            C
          </Route>
        </Switch>
      </div>
    </div>
  )
}
