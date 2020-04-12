import React, { useEffect, useState, lazy, Suspense } from 'react'
import { Switch, Route, NavLink, useRouteMatch, useParams, useHistory } from 'react-router-dom'
import ConfType from '../components/ConfType'
import EmailTemplate from '../components/EmailTemplate'
import Workflow from '../components/Workflow'
import bitsFetch from '../Utils/bitsFetch'
import EmailTemplateEdit from '../components/EmailTemplateEdit'
import Integrations from '../components/Integrations'
import FSettingsLoader from '../components/Loaders/FSettingsLoader'

const SingleFormSettings = lazy(() => import('../components/SingleFormSettings'))

export default function FormSettings(props) {
  console.log('%c $render FormSettings', 'background:green;padding:3px;border-radius:5px;color:white')

  const { path, url } = useRouteMatch()
  const history = useHistory()
  const { formType, formID } = useParams()

  const [formFields, setformFields] = useState([])

  useEffect(() => {
    if (url.match(/settings\/.+/g) === null) {
      history.push(`${url}form-settings`)
    }

    let mount = false
    mount = true
    bitsFetch({ id: formID }, 'bitapps_get_form_entry_count')
      .then(res => {
        if (res !== undefined && res.success) {
          if (mount) {
            setformFields(res.data.Labels)
          }
        }
      })

    return function cleanup() { mount = false }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="btcd-f-settings">

      <aside className="btcd-f-sidebar">
        <br />
        <br />
        <br />
        <NavLink to={`/builder/${formType}/${formID}/settings/form-settings`} activeClassName="btcd-f-a">
          <span className="btcd-icn icn-params" />
          Form Settings
        </NavLink>
        <NavLink to={`/builder/${formType}/${formID}/settings/confirmations`} activeClassName="btcd-f-a">
          <span className="btcd-icn icn-information-outline" />
          Confirmations
        </NavLink>
        <NavLink to={`/builder/${formType}/${formID}/settings/workflow`} activeClassName="btcd-f-a">
          <span className="btcd-icn icn-flow-tree" />
          Workflow
        </NavLink>
        <NavLink to={`/builder/${formType}/${formID}/settings/email-templates`} activeClassName="btcd-f-a em-tem">
          <span className="btcd-icn icn-envelope-open-o" />
          Email Templates
        </NavLink>
        <NavLink to={`/builder/${formType}/${formID}/settings/integrations`} activeClassName="btcd-f-a em-tem">
          <span className="btcd-icn icn-code" />
          Integrations
        </NavLink>
      </aside>

      <div className="btcd-s-wrp">
        <Switch>
          <Route path={`${path}form-settings`}>
            <Suspense fallback={<FSettingsLoader />}>
              <SingleFormSettings additional={props.additional} setadditional={props.setadditional} />
            </Suspense>
          </Route>
          <Route path={`${path}confirmations`}>
            <ConfType formFields={formFields} formID={formID} formSettings={props.formSettings} setFormSettings={props.setFormSettings} />
          </Route>
          <Route exact path={`${path}email-templates`}>
            <EmailTemplate mailTem={props.mailTem} setMailTem={props.setMailTem} formID={formID} />
          </Route>
          <Route exact path={`${path}email-templates/:id`}>
            <EmailTemplateEdit mailTem={props.mailTem} setMailTem={props.setMailTem} />
          </Route>
          <Route path={`${path}workflow`}>
            <Workflow formFields={formFields} formSettings={props.formSettings} workFlows={props.workFlows} setworkFlows={props.setworkFlows} formID={formID} />
          </Route>
          <Route path={`${path}integrations`}>
            <Integrations integrations={props.integrations} formFields={formFields} setIntegration={props.setIntegration} />
          </Route>
        </Switch>
      </div>
    </div>
  )
}
