import React from 'react'
import { Link, useParams } from 'react-router-dom'
import EditZohoAnalytics from './ZohoAnalytics/EditZohoAnalytics'
import EditZohoCampaigns from './ZohoCampaigns/EditZohoCampaigns'
import EditZohoCreator from './ZohoCreator/EditZohoCreator'
import EditZohoCRM from './ZohoCRM/EditZohoCRM'
import EditZohoDesk from './ZohoDesk/EditZohoDesk'
import EditZohoMail from './ZohoMail/EditZohoMail'
import EditZohoMarketingHub from './ZohoMarketingHub/EditZohoMarketingHub'
import EditZohoProjects from './ZohoProjects/EditZohoProjects'
import EditZohoRecruit from './ZohoRecruit/EditZohoRecruit'
import EditZohoSheet from './ZohoSheet/EditZohoSheet'
import EditZohoSign from './ZohoSign/EditZohoSign'
import EditZohoWorkDrive from './ZohoWorkDrive/EditZohoWorkDrive'

function EditInteg({ allIntegURL, formFields, setIntegration, integrations }) {
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
          <b className="f-lg">{integrations[id].type}</b>
          <div>Integration Settings</div>
        </div>
      </div>
      <IntegType />
    </div>
  )
}

export default EditInteg
