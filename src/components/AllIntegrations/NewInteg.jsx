import { Link, useParams } from 'react-router-dom'

import { __ } from '../../Utils/i18nwrap'
import ZohoAnalytics from './ZohoAnalytics/ZohoAnalytics'
import ZohoBigin from './ZohoBigin/ZohoBigin'
import ZohoCampaigns from './ZohoCampaigns/ZohoCampaigns'
import ZohoCreator from './ZohoCreator/ZohoCreator'
import ZohoCRM from './ZohoCRM/ZohoCRM'
import ZohoDesk from './ZohoDesk/ZohoDesk'
import ZohoMail from './ZohoMail/ZohoMail'
import ZohoMarketingHub from './ZohoMarketingHub/ZohoMarketingHub'
import ZohoProjects from './ZohoProjects/ZohoProjects'
import ZohoRecruit from './ZohoRecruit/ZohoRecruit'
import ZohoSheet from './ZohoSheet/ZohoSheet'
import ZohoSign from './ZohoSign/ZohoSign'
import ZohoWorkDrive from './ZohoWorkDrive/ZohoWorkDrive'
import GoogleSheet from './GoogleSheet/GoogleSheet'
import MailChimp from './MailChimp/MailChimp'
import Cpt from './Cpt/Cpt'
import MailPoet from './MailPoet/MailPoet'
import Sendinblue from './SendinBlue/SendinBlue'
import WooCommerce from './WooCommerce/WooCommerce'
import ActiveCampaign from './ActiveCampaign/ActiveCampaign'
import WebHooks from './WebHooks/WebHooks'
import Zapier from './Zapier/Zapier'
import Integromat from './Integromat/Integromat'
import ZohoFlow from './ZohoFlow/ZohoFlow'
import Integrately from './Integrately/Integrately'
import Pabbly from './Pabbly/Pabbly'
import Telegram from './Telegram/Telegram'

function NewInteg({ allIntegURL, formFields, setIntegration, integrations }) {
  const { type } = useParams()

  const IntegType = () => {
    switch (type) {
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
      case 'Zoho Flow':
        return <ZohoFlow allIntegURL={allIntegURL} formFields={formFields} integrations={integrations} setIntegration={setIntegration} />
      case 'Telegram':
        return <Telegram allIntegURL={allIntegURL} formFields={formFields} integrations={integrations} setIntegration={setIntegration} />
      default:
        break;
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
          <b className="f-lg">{type}</b>
          <div>{__('Integration Settings', 'bitform')}</div>
        </div>
      </div>
      <IntegType />
    </div>
  )
}

export default NewInteg
