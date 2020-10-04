import React from 'react'
import { Link, useParams } from 'react-router-dom'
import ZohoAnalytics from './ZohoAnalytics/ZohoAnalytics'
import ZohoCampaigns from './ZohoCampaigns/ZohoCampaigns'
import ZohoCRM from './ZohoCRM/ZohoCRM'
import ZohoDesk from './ZohoDesk/ZohoDesk'
import ZohoMail from './ZohoMail/ZohoMail'
import ZohoRecruit from './ZohoRecruit/ZohoRecruit'
import ZohoSheet from './ZohoSheet/ZohoSheet'
import ZohoWorkDrive from './ZohoWorkDrive/ZohoWorkDrive'

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
          <div>Integration Settings</div>
        </div>
      </div>
      <IntegType />
    </div>
  )
}

export default NewInteg
