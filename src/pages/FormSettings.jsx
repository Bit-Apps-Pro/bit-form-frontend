import { lazy, Suspense, useState } from 'react'
import { Switch, Route, NavLink, useRouteMatch, useParams } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { __ } from '../Utils/i18nwrap'
import FSettingsLoader from '../components/Loaders/FSettingsLoader'
import IntegLoader from '../components/Loaders/IntegLoader'
import { $fieldsArr } from '../GlobalStates'

const EmailTemplate = lazy(() => import('../components/EmailTemplate'))
const EmailTemplateEdit = lazy(() => import('../components/EmailTemplateEdit'))
const EmailTemplateNew = lazy(() => import('../components/EmailTemplateNew'))
const Integrations = lazy(() => import('../components/Integrations'))
const Workflow = lazy(() => import('../components/Workflow'))
const ConfType = lazy(() => import('../components/ConfType'))
const SingleFormSettings = lazy(() => import('../components/SingleFormSettings'))

export default function FormSettings({ formSettings, setFormSettings, setProModal, saveForm, fields, integrations, setIntegration }) {
  console.log('%c $render FormSettings', 'background:green;padding:3px;border-radius:5px;color:white')
  const formFields = useRecoilValue($fieldsArr)
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
          {__('Form Settings', 'bitform')}
        </NavLink>
        <NavLink to={`/form/settings/${formType}/${formID}/confirmations`} activeClassName="btcd-f-a">
          <span className="btcd-icn icn-information-outline" />
          {__('Confirmations', 'bitform')}
        </NavLink>
        <NavLink to={`/form/settings/${formType}/${formID}/workflow`} activeClassName="btcd-f-a">
          <span className="btcd-icn icn-flow-tree" />
          {__('Conditional Logics', 'bitform')}
        </NavLink>
        <NavLink to={`/form/settings/${formType}/${formID}/email-templates`} activeClassName="btcd-f-a em-tem">
          <span className="btcd-icn icn-envelope-open-o" />
          {__('Email Templates', 'bitform')}
        </NavLink>
        <NavLink to={`/form/settings/${formType}/${formID}/integrations`} activeClassName="btcd-f-a em-tem">
          <span className="btcd-icn icn-code" />
          {__('Integrations', 'bitform')}
        </NavLink>
      </aside>

      <div className="btcd-s-wrp">
        <Switch>
          <Route path={`${path}form-settings`}>
            <Suspense fallback={<FSettingsLoader />}>
              <SingleFormSettings fields={fields} />
            </Suspense>
          </Route>
          <Route path={`${path}confirmations`}>
            <Suspense fallback={<FSettingsLoader />}>
              <ConfType formFields={formFields} formID={formID} formSettings={formSettings} setFormSettings={setFormSettings} />
            </Suspense>
          </Route>
          <Route exact path={`${path}email-templates`}>
            <Suspense fallback={<FSettingsLoader />}>
              <EmailTemplate formID={formID} />
            </Suspense>
          </Route>
          <Route exact path={`${path}email-templates/new`}>
            <Suspense fallback={<FSettingsLoader />}>
              <EmailTemplateNew saveForm={saveForm} />
            </Suspense>
          </Route>
          <Route exact path={`${path}email-templates/:id`}>
            <Suspense fallback={<FSettingsLoader />}>
              <EmailTemplateEdit saveForm={saveForm} />
            </Suspense>
          </Route>
          <Route path={`${path}workflow`}>
            <Suspense fallback={<FSettingsLoader />}>
              <Workflow formFields={formFields} fields={fields} setProModal={setProModal} formSettings={formSettings} formID={formID} />
            </Suspense>
          </Route>
          <Route path={`${path}integrations`}>
            <Suspense fallback={<IntegLoader />}>
              <Integrations integrations={integrations} setProModal={setProModal} formFields={formFields} setIntegration={setIntegration} />
            </Suspense>
          </Route>
        </Switch>
        <div className="mb-50" />
      </div>
    </div>
  )
}
