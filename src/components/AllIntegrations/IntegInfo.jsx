// eslint-disable-next-line import/no-extraneous-dependencies
import { __ } from '@wordpress/i18n'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import SnackMsg from '../ElmSettings/Childs/SnackMsg'
import GoogleSheetAuthorization from './GoogleSheet/GoogleSheetAuthorization'
import MailChimpAuthorization from './MailChimp/MailChimpAuthorization'
import ZohoAnalyticsAuthorization from './ZohoAnalytics/ZohoAnalyticsAuthorization'
import ZohoBiginAuthorization from './ZohoBigin/ZohoBiginAuthorization'
import ZohoCampaignsAuthorization from './ZohoCampaigns/ZohoCampaignsAuthorization'
import ZohoCreatorAuthorization from './ZohoCreator/ZohoCreatorAuthorization'
import ZohoCRMAuthorization from './ZohoCRM/ZohoCRMAuthorization'
import ZohoDeskAuthorization from './ZohoDesk/ZohoDeskAuthorization'
import ZohoMailAuthorization from './ZohoMail/ZohoMailAuthorization'
import ZohoMarketingHubAuthorization from './ZohoMarketingHub/ZohoMarketingHubAuthorization'
import ZohoProjectsAuthorization from './ZohoProjects/ZohoProjectsAuthorization'
import ZohoRecruitAuthorization from './ZohoRecruit/ZohoRecruitAuthorization'
import ZohoSheetAuthorization from './ZohoSheet/ZohoSheetAuthorization'
import ZohoSignAuthorization from './ZohoSign/ZohoSignAuthorization'
import ZohoWorkDriveAuthorization from './ZohoWorkDrive/ZohoWorkDriveAuthorization'
// import SendinBlueAuthorization from './SendinBlue/SendinBlueAuthorization'
export default function IntegInfo({ allIntegURL, integrations }) {
  const { id } = useParams()
  const [snack, setSnackbar] = useState({ show: false })
  const integ = integrations[id]

  // route is info/:id but for redirect uri need to make new/:type
  let location = window.location.toString()

  const toReplaceInd = location.indexOf('/info')
  location = window.encodeURI(`${location.slice(0, toReplaceInd)}/new/${integrations[id].type}`)

  const showIntegInfo = () => {
    switch (integ.type) {
      case 'Zoho Analytics':
        return <ZohoAnalyticsAuthorization analyticsConf={integ} step={1} redirectLocation={location} setSnackbar={setSnackbar} isInfo />
      case 'Zoho Campaigns':
        return <ZohoCampaignsAuthorization campaignsConf={integ} step={1} redirectLocation={location} setSnackbar={setSnackbar} isInfo />
      case 'Zoho Creator':
        return <ZohoCreatorAuthorization creatorConf={integ} step={1} redirectLocation={location} setSnackbar={setSnackbar} isInfo />
      case 'Zoho Bigin':
        return <ZohoBiginAuthorization biginConf={integ} step={1} redirectLocation={location} setSnackbar={setSnackbar} isInfo />
      case 'Zoho Marketing Hub':
        return <ZohoMarketingHubAuthorization marketingHubConf={integ} step={1} redirectLocation={location} setSnackbar={setSnackbar} isInfo />
      case 'Zoho Sheet':
        return <ZohoSheetAuthorization sheetConf={integ} step={1} redirectLocation={location} setSnackbar={setSnackbar} isInfo />
      case 'Zoho Mail':
        return <ZohoMailAuthorization mailConf={integ} step={1} redirectLocation={location} setSnackbar={setSnackbar} isInfo />
      case 'Zoho Sign':
        return <ZohoSignAuthorization signConf={integ} step={1} redirectLocation={location} setSnackbar={setSnackbar} isInfo />
      case 'Zoho Desk':
        return <ZohoDeskAuthorization deskConf={integ} step={1} redirectLocation={location} setSnackbar={setSnackbar} isInfo />
      case 'Mail Chimp':
        return <MailChimpAuthorization sheetConf={integ} step={1} redirectLocation={location} setSnackbar={setSnackbar} isInfo />
      case 'Zoho WorkDrive':
        return <ZohoWorkDriveAuthorization workDriveConf={integ} step={1} redirectLocation={location} setSnackbar={setSnackbar} isInfo />
      case 'Zoho CRM':
        return <ZohoCRMAuthorization crmConf={integ} step={1} redirectLocation={location} setSnackbar={setSnackbar} isInfo />
      case 'Zoho Recruit':
        return <ZohoRecruitAuthorization recruitConf={integ} step={1} redirectLocation={location} setSnackbar={setSnackbar} isInfo />
      case 'Zoho Projects':
        return <ZohoProjectsAuthorization projectsConf={integ} step={1} redirectLocation={location} setSnackbar={setSnackbar} isInfo />
      case 'Google Sheet':
        return <GoogleSheetAuthorization sheetConf={integ} step={1} redirectLocation={bits.googleRedirectURL} setSnackbar={setSnackbar} isInfo />
      case 'Sendinblue':
        return <SendinBlueAuthorization sendinBlueConf={integ} step={1} redirectLocation={location} setSnackbar={setSnackbar} isInfo />
      default:
        return ''
    }
  }

  return (
    <>
      <SnackMsg snack={snack} setSnackbar={setSnackbar} />
      <div className="flx">
        <Link to={allIntegURL} className="btn btcd-btn-o-gray">
          <span className="btcd-icn icn-chevron-left" />
          &nbsp;Back
        </Link>
        <div className="w-8 txt-center">
          <b className="f-lg">{integrations[id].type}</b>
          <div>{__('Integration Info', 'bitform')}</div>
        </div>
      </div>
      {showIntegInfo()}
    </>
  )
}
