import React, { lazy, useEffect, Suspense } from 'react'
import { Switch, Route, NavLink, useRouteMatch, useParams } from 'react-router-dom'
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

  const { path } = useRouteMatch()
  const { formType, formID } = useParams()

  return (
    <div className="btcd-f-settings">
      <aside className="btcd-f-sidebar">
        <br />
        <br />
        <br />
        <NavLink to={`/form/settings/${formType}/${formID}/form-settings`} activeClassName="btcd-f-a">
          <span className="btcd-icn icn-params" />
          Form Settings
        </NavLink>
        <NavLink to={`/form/settings/${formType}/${formID}/confirmations`} activeClassName="btcd-f-a">
          <span className="btcd-icn icn-information-outline" />
          Confirmations
        </NavLink>
        <NavLink to={`/form/settings/${formType}/${formID}/workflow`} activeClassName="btcd-f-a">
          <span className="btcd-icn icn-flow-tree" />
          Workflows
        </NavLink>
        <NavLink to={`/form/settings/${formType}/${formID}/email-templates`} activeClassName="btcd-f-a em-tem">
          <span className="btcd-icn icn-envelope-open-o" />
          Email Templates
        </NavLink>
        <NavLink to={`/form/settings/${formType}/${formID}/integrations`} activeClassName="btcd-f-a em-tem">
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
              <ConfType formFields={props.formFields} formID={formID} formSettings={props.formSettings} setFormSettings={props.setFormSettings} />
            </Suspense>
          </Route>
          <Route exact path={`${path}email-templates`}>
            <Suspense fallback={<FSettingsLoader />}>
              <EmailTemplate mailTem={props.mailTem} setMailTem={props.setMailTem} formID={formID} />
            </Suspense>
          </Route>
          <Route exact path={`${path}email-templates/new`}>
            <Suspense fallback={<FSettingsLoader />}>
              <EmailTemplateNew saveForm={props.saveForm} formFields={props.formFields} mailTem={props.mailTem} setMailTem={props.setMailTem} />
            </Suspense>
          </Route>
          <Route exact path={`${path}email-templates/:id`}>
            <Suspense fallback={<FSettingsLoader />}>
              <EmailTemplateEdit saveForm={props.saveForm} formFields={props.formFields} mailTem={props.mailTem} setMailTem={props.setMailTem} />
            </Suspense>
          </Route>
          <Route path={`${path}workflow`}>
            <Suspense fallback={<FSettingsLoader />}>
              <Workflow formFields={props.formFields} setProModal={props.setProModal} formSettings={props.formSettings} workFlows={props.workFlows} setworkFlows={props.setworkFlows} formID={formID} />
            </Suspense>
          </Route>
          <Route path={`${path}integrations`}>
            <Suspense fallback={<IntegLoader />}>
              <Integrations integrations={props.integrations} setProModal={props.setProModal} formFields={props.formFields} setIntegration={props.setIntegration} />
            </Suspense>
          </Route>
        </Switch>
        <div className="mb-50" />
      </div>
    </div>
  )
}
