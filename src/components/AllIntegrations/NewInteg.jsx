import { Link, Route, useParams, useRouteMatch } from 'react-router-dom'

import { lazy, Suspense } from 'react'
import { __ } from '../../Utils/i18nwrap'
import Loader from '../Loaders/Loader'

const ZohoCRM = lazy(() => import('./ZohoCRM/ZohoCRM'))
const ZohoAnalytics = lazy(() => import('./ZohoAnalytics/ZohoAnalytics'))
const ZohoBigin = lazy(() => import('./ZohoBigin/ZohoBigin'))
const ZohoCampaigns = lazy(() => import('./ZohoCampaigns/ZohoCampaigns'))
const ZohoCreator = lazy(() => import('./ZohoCreator/ZohoCreator'))
const ZohoDesk = lazy(() => import('./ZohoDesk/ZohoDesk'))
const ZohoMail = lazy(() => import('./ZohoMail/ZohoMail'))
const ZohoMarketingHub = lazy(() => import('./ZohoMarketingHub/ZohoMarketingHub'))
const ZohoProjects = lazy(() => import('./ZohoProjects/ZohoProjects'))
const ZohoRecruit = lazy(() => import('./ZohoRecruit/ZohoRecruit'))
const ZohoSheet = lazy(() => import('./ZohoSheet/ZohoSheet'))
const ZohoSign = lazy(() => import('./ZohoSign/ZohoSign'))
const ZohoWorkDrive = lazy(() => import('./ZohoWorkDrive/ZohoWorkDrive'))
const GoogleSheet = lazy(() => import('./GoogleSheet/GoogleSheet'))
const MailChimp = lazy(() => import('./MailChimp/MailChimp'))
const Cpt = lazy(() => import('./Cpt/Cpt'))
const MailPoet = lazy(() => import('./MailPoet/MailPoet'))
const Sendinblue = lazy(() => import('./SendinBlue/SendinBlue'))
const WooCommerce = lazy(() => import('./WooCommerce/WooCommerce'))
const ActiveCampaign = lazy(() => import('./ActiveCampaign/ActiveCampaign'))
const WebHooks = lazy(() => import('./WebHooks/WebHooks'))
const Zapier = lazy(() => import('./Zapier/Zapier'))
const Integromat = lazy(() => import('./Integromat/Integromat'))
const ZohoFlow = lazy(() => import('./ZohoFlow/ZohoFlow'))
const Integrately = lazy(() => import('./Integrately/Integrately'))
const Pabbly = lazy(() => import('./Pabbly/Pabbly'))
const Telegram = lazy(() => import('./Telegram/Telegram'))

function NewInteg({ allIntegURL, formFields, setIntegration, integrations }) {
  const { type } = useParams()
  const { path } = useRouteMatch()

  const integs = [
    {
      urlName: 'Zoho CRM',
      component: <ZohoCRM allIntegURL={allIntegURL} formFields={formFields} integrations={integrations} setIntegration={setIntegration} />,
    },
    {
      urlName: 'Zoho Recruit',
      component: <ZohoRecruit allIntegURL={allIntegURL} formFields={formFields} integrations={integrations} setIntegration={setIntegration} />,
    },
    {
      urlName: 'Zoho Analytics',
      component: <ZohoAnalytics allIntegURL={allIntegURL} formFields={formFields} integrations={integrations} setIntegration={setIntegration} />,
    },
    {
      urlName: 'Zoho Campaigns',
      component: <ZohoCampaigns allIntegURL={allIntegURL} formFields={formFields} integrations={integrations} setIntegration={setIntegration} />,
    },
    {
      urlName: 'Zoho Desk',
      component: <ZohoDesk allIntegURL={allIntegURL} formFields={formFields} integrations={integrations} setIntegration={setIntegration} />,
    },
    {
      urlName: 'Zoho WorkDrive',
      component: <ZohoWorkDrive allIntegURL={allIntegURL} formFields={formFields} integrations={integrations} setIntegration={setIntegration} />,
    },
    {
      urlName: 'Zoho Mail',
      component: <ZohoMail allIntegURL={allIntegURL} formFields={formFields} integrations={integrations} setIntegration={setIntegration} />,
    },
    {
      urlName: 'Zoho Sheet',
      component: <ZohoSheet allIntegURL={allIntegURL} formFields={formFields} integrations={integrations} setIntegration={setIntegration} />,
    },
    {
      urlName: 'Zoho Projects',
      component: <ZohoProjects allIntegURL={allIntegURL} formFields={formFields} integrations={integrations} setIntegration={setIntegration} />,
    },
    {
      urlName: 'Zoho Sign',
      component: <ZohoSign allIntegURL={allIntegURL} formFields={formFields} integrations={integrations} setIntegration={setIntegration} />,
    },
    {
      urlName: 'Zoho Marketing Hub',
      component: <ZohoMarketingHub allIntegURL={allIntegURL} formFields={formFields} integrations={integrations} setIntegration={setIntegration} />,
    },
    {
      urlName: 'Zoho Creator',
      component: <ZohoCreator allIntegURL={allIntegURL} formFields={formFields} integrations={integrations} setIntegration={setIntegration} />,
    },
    {
      urlName: 'Zoho Bigin',
      component: <ZohoBigin allIntegURL={allIntegURL} formFields={formFields} integrations={integrations} setIntegration={setIntegration} />,
    },
    {
      urlName: 'Google Sheet',
      component: <GoogleSheet allIntegURL={allIntegURL} formFields={formFields} integrations={integrations} setIntegration={setIntegration} />,
    },
    {
      urlName: 'Mail Chimp',
      component: <MailChimp allIntegURL={allIntegURL} formFields={formFields} integrations={integrations} setIntegration={setIntegration} />,
    },
    {
      urlName: 'CPT',
      component: <Cpt allIntegURL={allIntegURL} formFields={formFields} integrations={integrations} setIntegration={setIntegration} />,
    },
    {
      urlName: 'Mail Poet',
      component: <MailPoet allIntegURL={allIntegURL} formFields={formFields} integrations={integrations} setIntegration={setIntegration} />,
    },
    {
      urlName: 'Sendinblue',
      component: <Sendinblue allIntegURL={allIntegURL} formFields={formFields} integrations={integrations} setIntegration={setIntegration} />,
    },
    {
      urlName: 'WooCommerce',
      component: <WooCommerce allIntegURL={allIntegURL} formFields={formFields} integrations={integrations} setIntegration={setIntegration} />,
    },
    {
      urlName: 'ActiveCampaign',
      component: <ActiveCampaign allIntegURL={allIntegURL} formFields={formFields} integrations={integrations} setIntegration={setIntegration} />,
    },
    {
      urlName: 'Web Hooks',
      component: <WebHooks allIntegURL={allIntegURL} formFields={formFields} integrations={integrations} setIntegration={setIntegration} />,
    },
    {
      urlName: 'Zapier',
      component: <Zapier allIntegURL={allIntegURL} formFields={formFields} integrations={integrations} setIntegration={setIntegration} />,
    },
    {
      urlName: 'Integromat',
      component: <Integromat allIntegURL={allIntegURL} formFields={formFields} integrations={integrations} setIntegration={setIntegration} />,
    },
    {
      urlName: 'Integrately',
      component: <Integrately allIntegURL={allIntegURL} formFields={formFields} integrations={integrations} setIntegration={setIntegration} />,
    },
    {
      urlName: 'Pabbly',
      component: <Pabbly allIntegURL={allIntegURL} formFields={formFields} integrations={integrations} setIntegration={setIntegration} />,
    },
    {
      urlName: 'Zoho Flow',
      component: <ZohoFlow allIntegURL={allIntegURL} formFields={formFields} integrations={integrations} setIntegration={setIntegration} />,
    },
    {
      urlName: 'Telegram',
      component: <Telegram allIntegURL={allIntegURL} formFields={formFields} integrations={integrations} setIntegration={setIntegration} />,
    },
  ]

  return (
    <div>
      <div className="flx">
        <Link to={allIntegURL} className="btn btcd-btn-o-gray">
          <span className="btcd-icn icn-chevron-left" />
          &nbsp;Back
        </Link>
        <div className="w-8 txt-center">
          <b className="f-lg">{type}</b>
          <div>{__('Integration Settings', 'bitform')}</div>
        </div>
      </div>

      {
        integs.map(iteg => (
          <Route key={iteg.urlName} path={`${path}/new/${iteg.urlName}`}>
            <Suspense fallback={<Loader className="g-c" style={{ height: '90vh' }} />}>
              {iteg.component}
            </Suspense>
          </Route>
        ))
      }
    </div>
  )
}

export default NewInteg
