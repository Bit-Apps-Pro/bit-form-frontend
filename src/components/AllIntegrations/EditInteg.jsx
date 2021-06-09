import { lazy, Suspense } from 'react'
import { Link, useParams } from 'react-router-dom'
import { __ } from '../../Utils/i18nwrap'
import Loader from '../Loaders/Loader'

const EditZohoAnalytics = lazy(() => import('./ZohoAnalytics/EditZohoAnalytics'))
const EditZohoBigin = lazy(() => import('./ZohoBigin/EditZohoBigin'))
const EditZohoCampaigns = lazy(() => import('./ZohoCampaigns/EditZohoCampaigns'))
const EditZohoCreator = lazy(() => import('./ZohoCreator/EditZohoCreator'))
const EditZohoCRM = lazy(() => import('./ZohoCRM/EditZohoCRM'))
const EditZohoDesk = lazy(() => import('./ZohoDesk/EditZohoDesk'))
const EditZohoMail = lazy(() => import('./ZohoMail/EditZohoMail'))
const EditZohoMarketingHub = lazy(() => import('./ZohoMarketingHub/EditZohoMarketingHub'))
const EditZohoProjects = lazy(() => import('./ZohoProjects/EditZohoProjects'))
const EditZohoRecruit = lazy(() => import('./ZohoRecruit/EditZohoRecruit'))
const EditZohoSheet = lazy(() => import('./ZohoSheet/EditZohoSheet'))
const EditZohoSign = lazy(() => import('./ZohoSign/EditZohoSign'))
const EditZohoWorkDrive = lazy(() => import('./ZohoWorkDrive/EditZohoWorkDrive'))
const EditGoogleSheet = lazy(() => import('./GoogleSheet/EditGoogleSheet'))
const EditMailChimp = lazy(() => import('./MailChimp/EditMailChimp'))
const EditAcf = lazy(() => import('./Acf/EditAcf'))
const EditPod = lazy(() => import('./Pods/EditPod'))
const EditMailPoet = lazy(() => import('./MailPoet/EditMailPoet'))
const EditSendinBlue = lazy(() => import('./SendinBlue/EditSendinBlue'))
const EditWooCommerce = lazy(() => import('./WooCommerce/EditWooCommerce'))
const EditActiveCampaign = lazy(() => import('./ActiveCampaign/EditActiveCampaign'))
const EditWebHooks = lazy(() => import('./WebHooks/EditWebHooks'))
const EditZapier = lazy(() => import('./Zapier/EditZapier'))
const EditIntegromat = lazy(() => import('./Integromat/EditIntegromat'))
const EditZohoFlow = lazy(() => import('./ZohoFlow/EditZohoFlow'))
const EditIntegrately = lazy(() => import('./Integrately/EditIntegrately'))
const EditPabbly = lazy(() => import('./Pabbly/EditPabbly'))
const EditTelegram = lazy(() => import('./Telegram/EditTelegram'))
const EditFluentCrm = lazy(() => import('./FluentCRM/EditFluentCrm'))
const EditEncharge = lazy(() => import('./Encharge/EditEncharge'))

export default function EditInteg({ allIntegURL, formFields, setIntegration, integrations }) {
  const { id } = useParams()
  const IntegType = () => {
    switch (integrations[id].type) {
      case 'Zoho CRM':
        return <EditZohoCRM allIntegURL={allIntegURL} formFields={formFields} integrations={integrations} setIntegration={setIntegration} />
      case 'Zoho Recruit':
        return <EditZohoRecruit allIntegURL={allIntegURL} formFields={formFields} integrations={integrations} setIntegration={setIntegration} />
      case 'Zoho Analytics':
        return <EditZohoAnalytics allIntegURL={allIntegURL} formFields={formFields} integrations={integrations} setIntegration={setIntegration} />
      case 'Zoho Campaigns':
        return <EditZohoCampaigns allIntegURL={allIntegURL} formFields={formFields} integrations={integrations} setIntegration={setIntegration} />
      case 'Zoho Desk':
        return <EditZohoDesk allIntegURL={allIntegURL} formFields={formFields} integrations={integrations} setIntegration={setIntegration} />
      case 'Zoho WorkDrive':
        return <EditZohoWorkDrive allIntegURL={allIntegURL} formFields={formFields} integrations={integrations} setIntegration={setIntegration} />
      case 'Zoho Mail':
        return <EditZohoMail allIntegURL={allIntegURL} formFields={formFields} integrations={integrations} setIntegration={setIntegration} />
      case 'Zoho Sheet':
        return <EditZohoSheet allIntegURL={allIntegURL} formFields={formFields} integrations={integrations} setIntegration={setIntegration} />
      case 'Zoho Projects':
        return <EditZohoProjects allIntegURL={allIntegURL} formFields={formFields} integrations={integrations} setIntegration={setIntegration} />
      case 'Zoho Sign':
        return <EditZohoSign allIntegURL={allIntegURL} formFields={formFields} integrations={integrations} setIntegration={setIntegration} />
      case 'Zoho Marketing Hub':
        return <EditZohoMarketingHub allIntegURL={allIntegURL} formFields={formFields} integrations={integrations} setIntegration={setIntegration} />
      case 'Zoho Creator':
        return <EditZohoCreator allIntegURL={allIntegURL} formFields={formFields} integrations={integrations} setIntegration={setIntegration} />
      case 'Zoho Bigin':
        return <EditZohoBigin allIntegURL={allIntegURL} formFields={formFields} integrations={integrations} setIntegration={setIntegration} />
      case 'Google Sheet':
        return <EditGoogleSheet allIntegURL={allIntegURL} formFields={formFields} integrations={integrations} setIntegration={setIntegration} />
      case 'Mail Chimp':
        return <EditMailChimp allIntegURL={allIntegURL} formFields={formFields} integrations={integrations} setIntegration={setIntegration} />
      case 'ACF':
        return <EditAcf allIntegURL={allIntegURL} formFields={formFields} integrations={integrations} setIntegration={setIntegration} />
      case 'Pods':
        return <EditPod allIntegURL={allIntegURL} formFields={formFields} integrations={integrations} setIntegration={setIntegration} />
      case 'Mail Poet':
        return <EditMailPoet allIntegURL={allIntegURL} formFields={formFields} integrations={integrations} setIntegration={setIntegration} />
      case 'Sendinblue':
        return <EditSendinBlue allIntegURL={allIntegURL} formFields={formFields} integrations={integrations} setIntegration={setIntegration} />
      case 'WooCommerce':
        return <EditWooCommerce allIntegURL={allIntegURL} formFields={formFields} integrations={integrations} setIntegration={setIntegration} />
      case 'ActiveCampaign':
        return <EditActiveCampaign allIntegURL={allIntegURL} formFields={formFields} integrations={integrations} setIntegration={setIntegration} />
      case 'Web Hooks':
        return <EditWebHooks allIntegURL={allIntegURL} formFields={formFields} integrations={integrations} setIntegration={setIntegration} />
      case 'Zapier':
        return <EditZapier allIntegURL={allIntegURL} formFields={formFields} integrations={integrations} setIntegration={setIntegration} />
      case 'Integromat':
        return <EditIntegromat allIntegURL={allIntegURL} formFields={formFields} integrations={integrations} setIntegration={setIntegration} />
      case 'Integrately':
        return <EditIntegrately allIntegURL={allIntegURL} formFields={formFields} integrations={integrations} setIntegration={setIntegration} />
      case 'Pabbly':
        return <EditPabbly allIntegURL={allIntegURL} formFields={formFields} integrations={integrations} setIntegration={setIntegration} />
      case 'Zoho Flow':
        return <EditZohoFlow allIntegURL={allIntegURL} formFields={formFields} integrations={integrations} setIntegration={setIntegration} />
      case 'Telegram':
        return <EditTelegram allIntegURL={allIntegURL} formFields={formFields} integrations={integrations} setIntegration={setIntegration} />
      case 'Fluent CRM':
        return <EditFluentCrm allIntegURL={allIntegURL} formFields={formFields} integrations={integrations} setIntegration={setIntegration} />
      case 'Encharge':
        return <EditEncharge allIntegURL={allIntegURL} formFields={formFields} integrations={integrations} setIntegration={setIntegration} />
      default:
        break
    }
    return ''
  }

  return (
    <div>
      <div className="flx">
        <Link to={allIntegURL} className="btn btcd-btn-o-gray">
          <span className="btcd-icn icn-chevron-left" />
          &nbsp;Back
        </Link>
        <div className="w-8 txt-center">
          <b className="f-lg">{integrations[id].type}</b>
          <div>{__('Integration Settings', 'bitform')}</div>
        </div>
      </div>
      <Suspense fallback={<Loader className="g-c" style={{ height: '90vh' }} />}>
        <IntegType />
      </Suspense>
    </div>
  )
}
