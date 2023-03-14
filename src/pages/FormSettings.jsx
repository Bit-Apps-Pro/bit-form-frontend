import loadable from '@loadable/component'
import { lazy, memo, Suspense, useEffect } from 'react'
import { NavLink, Route, Routes, useParams } from 'react-router-dom'
import { useRecoilState, useSetRecoilState } from 'recoil'
import FSettingsLoader from '../components/Loaders/FSettingsLoader'
import IntegLoader from '../components/Loaders/IntegLoader'
import ProModal from '../components/Utilities/ProModal'
import { $isNewThemeStyleLoaded } from '../GlobalStates/GlobalStates'
import { $savedStylesAndVars } from '../GlobalStates/SavedStylesAndVars'
import { $allStyles } from '../GlobalStates/StylesState'
import { $allThemeColors } from '../GlobalStates/ThemeColorsState'
import { $allThemeVars } from '../GlobalStates/ThemeVarsState'
import CodeSnippetIcn from '../Icons/CodeSnippetIcn'
import ConditionalIcn from '../Icons/ConditionalIcn'
import EmailInbox from '../Icons/EmailInbox'
import InfoIcn from '../Icons/InfoIcn'
import MailOpenIcn from '../Icons/MailOpenIcn'
import Settings2 from '../Icons/Settings2'
import UserIcn from '../Icons/UserIcn'
import bitsFetch from '../Utils/bitsFetch'
import { JCOF } from '../Utils/globalHelpers'
import { isObjectEmpty } from '../Utils/Helpers'
import { __ } from '../Utils/i18nwrap'

const EmailTemplate = lazy(() => import('../components/EmailTemplate'))
const WpAuth = lazy(() => import('../components/AuthSettings'))
const Integrations = loadable(() => import('../components/Integrations'), { fallback: <IntegLoader /> })
const Workflow = lazy(() => import('../components/Workflows/Workflow'))
const ConfType = lazy(() => import('../components/ConfType'))
const SingleFormSettings = lazy(() => import('../components/SingleFormSettings'))
const DoubleOptin = lazy(() => import('../components/CompSettings/doubleOptin/DoubleOptin'))

function FormSettings({ setProModal }) {
  // const { path } = useMatch()
  const { formType, formID } = useParams()
  const [isNewThemeStyleLoaded, setIsNewThemeStyleLoaded] = useRecoilState($isNewThemeStyleLoaded)
  const setAllThemeColors = useSetRecoilState($allThemeColors)
  const setAllThemeVars = useSetRecoilState($allThemeVars)
  const setAllStyles = useSetRecoilState($allStyles)
  const setSavedStylesAndVars = useSetRecoilState($savedStylesAndVars)

  useEffect(() => {
    if (!isNewThemeStyleLoaded) {
      bitsFetch({ formID }, 'bitforms_form_helpers_state')
        .then(res => {
          const fetchedBuilderHelperStates = res.data?.[0]?.builder_helper_state || {}
          if (!isObjectEmpty(fetchedBuilderHelperStates)) {
            const { themeVars, themeColors, style: oldAllStyles } = fetchedBuilderHelperStates
            setAllThemeColors(JCOF.parse(themeColors))
            setAllThemeVars(JCOF.parse(themeVars))
            setAllStyles(JCOF.parse(oldAllStyles))

            setSavedStylesAndVars({
              allThemeColors: themeColors,
              allThemeVars: themeVars,
              allStyles: oldAllStyles,
            })
            setIsNewThemeStyleLoaded(true)
          }
        })
    }
  }, [])

  return (
    <div className="btcd-f-settings">
      <aside className="btcd-f-sidebar">
        <br />
        <br />
        <NavLink
          to={`/form/settings/${formType}/${formID}/form-settings`}
          className={({ isActive }) => ((isActive ? 'btcd-f-a' : ''))}
        >
          <span className="mr-1"><Settings2 size={21} /></span>
          {__('Form Settings')}
        </NavLink>
        <NavLink
          to={`/form/settings/${formType}/${formID}/confirmations`}
          className={({ isActive }) => (isActive ? 'btcd-f-a' : '')}
        >
          <span><InfoIcn size="20" stroke="3" /></span>
          {__('Confirmations')}
        </NavLink>
        <NavLink
          to={`/form/settings/${formType}/${formID}/workflow`}
          className={({ isActive }) => (isActive ? 'btcd-f-a' : '')}
        >
          <span><ConditionalIcn size="20" /></span>
          {__('Conditional Logics')}
        </NavLink>
        <NavLink
          to={`/form/settings/${formType}/${formID}/email-templates`}
          className={({ isActive }) => (isActive ? 'btcd-f-a' : '')}
        >
          <span className="mr-1"><MailOpenIcn size="21" /></span>
          {__('Email Templates')}
        </NavLink>
        <NavLink
          to={`/form/settings/${formType}/${formID}/double-optin`}
          className={({ isActive }) => (isActive ? 'btcd-f-a' : '')}
        >
          <span className="mr-1"><EmailInbox size="21" /></span>
          {__('Double Opt-In')}
        </NavLink>
        <NavLink
          to={`/form/settings/${formType}/${formID}/integrations`}
          className={({ isActive }) => (isActive ? 'btcd-f-a' : '')}
        >
          <span className="mr-1"><CodeSnippetIcn size="19" /></span>
          {__('Integrations')}
        </NavLink>
        <NavLink
          to={`/form/settings/${formType}/${formID}/auth-settings`}
          className={({ isActive }) => (isActive ? 'btcd-f-a' : '')}
        >
          <span className="mr-1"><UserIcn size="18" /></span>
          {__('WP Auth')}
        </NavLink>
      </aside>

      <div id="btcd-settings-wrp" className="btcd-s-wrp">
        <Suspense fallback={<FSettingsLoader />}>
          <Routes>
            <Route path="form-settings" element={<SingleFormSettings />} />
            <Route path="auth-settings" element={<WpAuth formID={formID} />} />
            <Route path="confirmations/*" element={<ConfType formType={formType} formID={formID} />} />
            <Route path="email-templates/*" element={<EmailTemplate formID={formID} />} />
            <Route path="double-optin" element={<DoubleOptin formID={formID} />} />
            <Route path="workflow" element={<Workflow setProModal={setProModal} formID={formID} />} />
            <Route path="integrations/*" element={<Integrations setProModal={setProModal} />} />
          </Routes>
        </Suspense>
        {/* <Routes>
          <>
            <Suspense fallback={<IntegLoader />}>
              <Route path={`${path}integrations`} element={<Integrations setProModal={setProModal} />} />
            </Suspense>
          </>
        </Routes> */}
        <ProModal />
        <div className="mb-50" />
      </div>
    </div>
  )
}

export default memo(FormSettings)
