import React, { useEffect } from 'react'
import { Switch, Route, NavLink, useRouteMatch, useParams, useHistory } from 'react-router-dom'
import ConfType from './ConfType'
import EmailNotfication from './EmailNotfication'

export default function FormSettings(props) {
  console.log('%c $render FormSettings', 'background:green;padding:3px;border-radius:5px;color:white')

  const { path, url } = useRouteMatch()
  const history = useHistory()
  const { formType, formID } = useParams()

  useEffect(() => {
    if (url.match(/settings\/.+/g) === null) {
      history.push(`${url}form-settings`)
    }
  }, [])

  return (
    <div className="btcd-f-settings">

      <aside className="btcd-f-sidebar">
        <br />
        <br />
        <br />
        <NavLink to={`/builder/${formType}/${formID}/settings/form-settings`} activeClassName="btcd-f-a">
          <span className="btcd-icn icn-file" />
          Form Settings
        </NavLink>
        <NavLink to={`/builder/${formType}/${formID}/settings/workflow`} activeClassName="btcd-f-a">
          <span className="btcd-icn icn-flow-tree" />
          Workflow
        </NavLink>
        <NavLink to={`/builder/${formType}/${formID}/settings/email-notification`} activeClassName="btcd-f-a">
          <span className="btcd-icn icn-envelope-open-o" />
          Email Notification
        </NavLink>
        <NavLink to={`/builder/${formType}/${formID}/settings/c`} activeClassName="btcd-f-a">Form Settings</NavLink>
      </aside>

      <div className="btcd-s-wrp">
        <Switch>
          <Route path={`${path}form-settings`}>
            <div>
              <div><b>Form Name: </b></div>
              <input className="btcd-paper-inp" type="text" value={props.formName} onChange={(e) => props.setFormName(e.target.value)} placeholder="Form Name" />
            </div>
            <ConfType formID={formID} formSettings={props.formSettings} setFormSettings={props.setFormSettings} />
          </Route>
          <Route path={`${path}email-notification`}>
            <EmailNotfication />
          </Route>
          <Route path={`${path}workflow`}>
            Bsdfasdf
          </Route>
          <Route path={`${path}c`}>
            C
          </Route>
        </Switch>
      </div>
    </div >
  )
}
