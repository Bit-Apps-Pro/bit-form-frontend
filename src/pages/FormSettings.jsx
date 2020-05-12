import React, { useEffect, useState, lazy, Suspense } from 'react'
import { Switch, Route, NavLink, useRouteMatch, useParams, useHistory } from 'react-router-dom'
import bitsFetch from '../Utils/bitsFetch'
import FSettingsLoader from '../components/Loaders/FSettingsLoader'
import IntegLoader from '../components/Loaders/IntegLoader'

const EmailTemplate = lazy(() => import('../components/EmailTemplate'))
const EmailTemplateEdit = lazy(() => import('../components/EmailTemplateEdit'))
const EmailTemplateNew = lazy(() => import('../components/EmailTemplateNew'))
const Integrations = lazy(() => import('../components/Integrations'))
const Workflow = lazy(() => import('../components/Workflow'))
const ConfType = lazy(() => import('../components/ConfType'))
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
    bitsFetch({ id: formID }, 'bitforms_get_form_entry_count')
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
            <Suspense fallback={<FSettingsLoader />}>
              <ConfType formFields={formFields} formID={formID} formSettings={props.formSettings} setFormSettings={props.setFormSettings} />
            </Suspense>
          </Route>
          <Route exact path={`${path}email-templates`}>
            <Suspense fallback={<FSettingsLoader />}>
              <EmailTemplate mailTem={props.mailTem} setMailTem={props.setMailTem} formID={formID} />
            </Suspense>
          </Route>
          <Route exact path={`${path}email-templates/new`}>
            <Suspense fallback={<FSettingsLoader />}>
              <EmailTemplateNew mailTem={props.mailTem} setMailTem={props.setMailTem} />
            </Suspense>
          </Route>
          <Route exact path={`${path}email-templates/:id`}>
            <Suspense fallback={<FSettingsLoader />}>
              <EmailTemplateEdit mailTem={props.mailTem} setMailTem={props.setMailTem} />
            </Suspense>
          </Route>
          <Route path={`${path}workflow`}>
            <Suspense fallback={<FSettingsLoader />}>
              <Workflow formFields={formFields} formSettings={props.formSettings} workFlows={props.workFlows} setworkFlows={props.setworkFlows} formID={formID} />
            </Suspense>
          </Route>
          <Route path={`${path}integrations`}>
            <Suspense fallback={<IntegLoader />}>
              <Integrations integrations={props.integrations} formFields={formFields} setIntegration={props.setIntegration} />
            </Suspense>
          </Route>
        </Switch>
      </div>
    </div>
  )
}
