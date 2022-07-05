import { lazy, memo, Suspense, useEffect } from 'react'
import { Switch, Route, NavLink, useRouteMatch, useParams } from 'react-router-dom'
import { withQuicklink } from 'quicklink/dist/react/hoc'
import { __ } from '../Utils/i18nwrap'
import FSettingsLoader from '../components/Loaders/FSettingsLoader'
import IntegLoader from '../components/Loaders/IntegLoader'
import MailOpenIcn from '../Icons/MailOpenIcn'
import Settings2 from '../Icons/Settings2'
import UserIcn from '../Icons/UserIcn'
import CodeSnippetIcn from '../Icons/CodeSnippetIcn'
import InfoIcn from '../Icons/InfoIcn'
import ConditionalIcn from '../Icons/ConditionalIcn'

const EmailTemplate = lazy(() => import('../components/EmailTemplate'))
const WpAuth = lazy(() => import('../components/AuthSettings'))
const Integrations = lazy(() => import('../components/Integrations'))
const Workflow = lazy(() => import('../components/Workflow'))
const ConfType = lazy(() => import('../components/ConfType'))
const SingleFormSettings = lazy(() => import('../components/SingleFormSettings'))

function FormSettings({ setProModal }) {
  console.log('%c $render FormSettings', 'background:green;padding:3px;border-radius:5px;color:white')
  const { path } = useRouteMatch()
  const { formType, formID } = useParams()
  useEffect(() => {
    const link = document.createElement('link')
    link.rel = 'prefetch'
    link.href = '/wp-content/plugins/bit-form/assets/js/src_components_SingleFormSettings_jsx.js'
    link.as = 'script'
    link.type = 'script'
    document.head.appendChild(link)
  }, [])

  return (
    <div className="btcd-f-settings">
      <aside className="btcd-f-sidebar">
        <br />
        <br />
        <NavLink to={`/form/settings/${formType}/${formID}/form-settings`} activeClassName="btcd-f-a">
          <span className="mr-1"><Settings2 size={21} /></span>
          {__('Form Settings')}
        </NavLink>
        <NavLink to={`/form/settings/${formType}/${formID}/confirmations`} activeClassName="btcd-f-a">
          <span><InfoIcn size="20" stroke="3" /></span>
          {__('Confirmations')}
        </NavLink>
        <NavLink to={`/form/settings/${formType}/${formID}/workflow`} activeClassName="btcd-f-a">
          <span><ConditionalIcn size="20" /></span>
          {__('Conditional Logics')}
        </NavLink>
        <NavLink to={`/form/settings/${formType}/${formID}/email-templates`} activeClassName="btcd-f-a em-tem">
          <span className="mr-1"><MailOpenIcn size="21" /></span>
          {__('Email Templates')}
        </NavLink>
        <NavLink to={`/form/settings/${formType}/${formID}/integrations`} activeClassName="btcd-f-a em-tem">
          <span className="mr-1"><CodeSnippetIcn size="19" /></span>
          {__('Integrations')}
        </NavLink>
        <NavLink to={`/form/settings/${formType}/${formID}/auth-settings`} activeClassName="btcd-f-a em-tem">
          <span className="mr-1"><UserIcn size="18" /></span>
          {__('WP Auth')}
        </NavLink>
      </aside>

      <div id="btcd-settings-wrp" className="btcd-s-wrp">
        <Switch>
          <Suspense fallback={<FSettingsLoader />}>
            <Route path={`${path}form-settings`} component={withQuicklink(SingleFormSettings, { origins: [] })} />
            <Route path={`${path}auth-settings`}>
              <WpAuth formID={formID} />
            </Route>
            <Route path={`${path}confirmations`}>
              <ConfType formID={formID} />
            </Route>
            <Route path={`${path}email-templates`}>
              <EmailTemplate formID={formID} />
            </Route>
            <Route path={`${path}workflow`}>
              <Workflow setProModal={setProModal} formID={formID} />
            </Route>
          </Suspense>
        </Switch>
        <Switch>
          <Suspense fallback={<IntegLoader />}>
            <Route path={`${path}integrations`}>
              <Integrations setProModal={setProModal} />
            </Route>
          </Suspense>
        </Switch>
        <div className="mb-50" />
      </div>
    </div>
  )
}

export default memo(FormSettings)
