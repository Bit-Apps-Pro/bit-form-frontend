import { lazy, memo, Suspense, useEffect } from 'react'
import { Switch, Route, NavLink, useRouteMatch, useParams } from 'react-router-dom'
import { withQuicklink } from 'quicklink/dist/react/hoc'
import { __ } from '../Utils/i18nwrap'
import FSettingsLoader from '../components/Loaders/FSettingsLoader'
import IntegLoader from '../components/Loaders/IntegLoader'
import MailOpenIcn from '../Icons/MailOpenIcn'

const EmailTemplate = lazy(() => import('../components/EmailTemplate'))
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
          <span className="mr-1"><MailOpenIcn size="21" /></span>
          {__('Email Templates', 'bitform')}
        </NavLink>
        <NavLink to={`/form/settings/${formType}/${formID}/integrations`} activeClassName="btcd-f-a em-tem">
          <span className="btcd-icn icn-code" />
          {__('Integrations', 'bitform')}
        </NavLink>
      </aside>

      <div id="btcd-settings-wrp" className="btcd-s-wrp">
        <Switch>
          <Suspense fallback={<FSettingsLoader />}>
            <Route path={`${path}form-settings`} component={withQuicklink(SingleFormSettings, { origins: [] })} />
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
