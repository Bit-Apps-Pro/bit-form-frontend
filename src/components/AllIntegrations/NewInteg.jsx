import { lazy, Suspense } from 'react'
import { Link, Route, useParams, useRouteMatch } from 'react-router-dom'
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
const Pods = lazy(() => import('./Pods/Pods'))
const Telegram = lazy(() => import('./Telegram/Telegram'))
const FluentCrm = lazy(() => import('./FluentCRM/FluentCrm'))
const Encharge = lazy(() => import('./Encharge/Encharge'))
export default function NewInteg({ allIntegURL, formFields, setIntegration, integrations }) {
  const { integUrlName } = useParams()

  const NewIntegs = () => {
    switch (integUrlName) {
      case 'Zoho CRM':
        return <ZohoCRM allIntegURL={allIntegURL} formFields={formFields} integrations={integrations} setIntegration={setIntegration} />
      case 'Zoho Recruit':
        return <ZohoRecruit allIntegURL={allIntegURL} formFields={formFields} integrations={integrations} setIntegration={setIntegration} />
      case 'Zoho Analytics':
        return <ZohoAnalytics allIntegURL={allIntegURL} formFields={formFields} integrations={integrations} setIntegration={setIntegration} />
      case 'Zoho Campaigns':
        return <ZohoCampaigns allIntegURL={allIntegURL} formFields={formFields} integrations={integrations} setIntegration={setIntegration} />
      case 'Zoho Desk':
        return <ZohoDesk allIntegURL={allIntegURL} formFields={formFields} integrations={integrations} setIntegration={setIntegration} />
      case 'Zoho WorkDrive':
        return <ZohoWorkDrive allIntegURL={allIntegURL} formFields={formFields} integrations={integrations} setIntegration={setIntegration} />
      case 'Zoho Mail':
        return <ZohoMail allIntegURL={allIntegURL} formFields={formFields} integrations={integrations} setIntegration={setIntegration} />
      case 'Zoho Sheet':
        return <ZohoSheet allIntegURL={allIntegURL} formFields={formFields} integrations={integrations} setIntegration={setIntegration} />
      case 'Zoho Projects':
        return <ZohoProjects allIntegURL={allIntegURL} formFields={formFields} integrations={integrations} setIntegration={setIntegration} />
      case 'Zoho Sign':
        return <ZohoSign allIntegURL={allIntegURL} formFields={formFields} integrations={integrations} setIntegration={setIntegration} />
      case 'Zoho Marketing Hub':
        return <ZohoMarketingHub allIntegURL={allIntegURL} formFields={formFields} integrations={integrations} setIntegration={setIntegration} />
      case 'Zoho Creator':
        return <ZohoCreator allIntegURL={allIntegURL} formFields={formFields} integrations={integrations} setIntegration={setIntegration} />
      case 'Zoho Bigin':
        return <ZohoBigin allIntegURL={allIntegURL} formFields={formFields} integrations={integrations} setIntegration={setIntegration} />
      case 'Google Sheet':
        return <GoogleSheet allIntegURL={allIntegURL} formFields={formFields} integrations={integrations} setIntegration={setIntegration} />
      case 'Mail Chimp':
        return <MailChimp allIntegURL={allIntegURL} formFields={formFields} integrations={integrations} setIntegration={setIntegration} />
      case 'CPT':
        return <Cpt allIntegURL={allIntegURL} formFields={formFields} integrations={integrations} setIntegration={setIntegration} />
      case 'Mail Poet':
        return <MailPoet allIntegURL={allIntegURL} formFields={formFields} integrations={integrations} setIntegration={setIntegration} />
      case 'Sendinblue':
        return <Sendinblue allIntegURL={allIntegURL} formFields={formFields} integrations={integrations} setIntegration={setIntegration} />
      case 'WooCommerce':
        return <WooCommerce allIntegURL={allIntegURL} formFields={formFields} integrations={integrations} setIntegration={setIntegration} />
      case 'ActiveCampaign':
        return <ActiveCampaign allIntegURL={allIntegURL} formFields={formFields} integrations={integrations} setIntegration={setIntegration} />
      case 'Web Hooks':
        return <WebHooks allIntegURL={allIntegURL} formFields={formFields} integrations={integrations} setIntegration={setIntegration} />
      case 'Zapier':
        return <Zapier allIntegURL={allIntegURL} formFields={formFields} integrations={integrations} setIntegration={setIntegration} />
      case 'Integromat':
        return <Integromat allIntegURL={allIntegURL} formFields={formFields} integrations={integrations} setIntegration={setIntegration} />
      case 'Integrately':
        return <Integrately allIntegURL={allIntegURL} formFields={formFields} integrations={integrations} setIntegration={setIntegration} />
      case 'Pabbly':
        return <Pabbly allIntegURL={allIntegURL} formFields={formFields} integrations={integrations} setIntegration={setIntegration} />
      case 'Pods':
        return <Pods allIntegURL={allIntegURL} formFields={formFields} integrations={integrations} setIntegration={setIntegration} />
      case 'Zoho Flow':
        return <ZohoFlow allIntegURL={allIntegURL} formFields={formFields} integrations={integrations} setIntegration={setIntegration} />
      case 'Telegram':
        return <Telegram allIntegURL={allIntegURL} formFields={formFields} integrations={integrations} setIntegration={setIntegration} />
      case 'Encharge':
        return <Encharge allIntegURL={allIntegURL} formFields={formFields} integrations={integrations} setIntegration={setIntegration} />
      default:
        break;
    }
    return <></>
  }

  return (
    <div>
      <div className="flx">
        <Link to={allIntegURL} className="btn btcd-btn-o-gray">
          <span className="btcd-icn icn-chevron-left" />
          &nbsp;Back
        </Link>
        <div className="w-8 txt-center">
          <div className="mb-1"><b className="f-lg">{integUrlName}</b></div>
          <div>{__('Integration Settings', 'bitform')}</div>
        </div>
      </div>

      <Suspense fallback={<Loader className="g-c" style={{ height: '90vh' }} />}>
        <NewIntegs />
      </Suspense>
    </div>
  )
}
