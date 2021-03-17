import { useState } from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import { __ } from '@wordpress/i18n'
import { Link, useParams } from 'react-router-dom'
import CopyText from '../ElmSettings/Childs/CopyText'
import SnackMsg from '../ElmSettings/Childs/SnackMsg'
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
import GoogleSheetAuthorization from './GoogleSheet/GoogleSheetAuthorization'
import MailChimpAuthorization from './MailChimp/MailChimpAuthorization'
import SendinBlueAuthorization from './SendinBlue/SendinBlueAuthorization'
import ActiveCampaignAuthorization from './ActiveCampaign/ActiveCampaignAuthorization'

export default function IntegInfo({ allIntegURL, integrations }) {
  const { id } = useParams()
  const [snack, setSnackbar] = useState({ show: false })

  console.log('integ info', integrations[id])
  const integ = integrations[id]

  // route is info/:id but for redirect uri need to make new/:type
  let location = window.location.toString()

  const toReplaceInd = location.indexOf('/info')
  location = window.encodeURI(`${location.slice(0, toReplaceInd)}/new/${integrations[id].type}`)

  // let activeStatus = 0
  // if (integrations[id].type === 'Google Sheet') {
  //   activeStatus = 1
  // } else if (integrations[id].type === 'Mail Chimp') {
  //   activeStatus = 1
  // }

  const showIntegInfo = () => {
    switch (integ.type) {
      case 'Zoho Analytics':
        return <ZohoAnalyticsAuthorization analyticsConf={integ} step={1} redirectLocation={location} setSnackbar={setSnackbar} isInfo />
      case 'Zoho Campaigns':
        return <ZohoCampaignsAuthorization campaignsConf={integ} step={1} redirectLocation={location} setSnackbar={setSnackbar} isInfo />
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
        return <GoogleSheetAuthorization sheetConf={integ} step={1} redirectLocation={location} setSnackbar={setSnackbar} isInfo />
      case 'Sendinblue':
        return <SendinBlueAuthorization sendinBlueConf={integ} step={1} redirectLocation={location} setSnackbar={setSnackbar} isInfo />
      case 'ActiveCampaign':
        return <ActiveCampaignAuthorization activeCampaingConf={integ} step={1} setSnackbar={setSnackbar} isInfo />
      default:
        return ''
    }
  }

  // console.log(allIntegURL)
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

      {/* <div className="btcd-stp-page" style={{ width: 900, height: `${100}%` }}>
        <div className="mt-3"><b>{__('Integration Name:', 'bitform')}</b></div>
        <input className="btcd-paper-inp w-6 mt-1" name="name" defaultValue={integrations[id].name} type="text" placeholder={__('Integration Name...', 'bitform')} readOnly />
        {activeStatus === 0 && (
          <>
            <div className="mt-3"><b>Data Center:</b></div>
            <select name="dataCenter" defaultValue={integrations[id].dataCenter} className="btcd-paper-inp w-9 mt-1" disabled>
              <option value="com">zoho.com</option>
              <option value="eu">zoho.eu</option>
              <option value="com.cn">zoho.com.cn</option>
              <option value="in">zoho.in</option>
              <option value="com.au">zoho.com.au</option>
            </select>
          </>
        )}
        <div className="mt-3"><b>Homepage URL:</b></div>
        <CopyText value={`${window.location.origin}`} setSnackbar={setSnackbar} className="field-key-cpy w-6 ml-0" readOnly />

        <div className="mt-3"><b>Authorized Redirect URIs:</b></div>
        {integrations[id].type !== 'Google Sheet'
          ? (<CopyText value={`${location}/redirect`} setSnackbar={setSnackbar} className="field-key-cpy w-6 ml-0" readOnly />)
          : (<CopyText value={bits.googleRedirectURL} setSnackbar={setSnackbar} className="field-key-cpy w-6 ml-0" readOnly />)}

        <div className="mt-3"><b>Client id:</b></div>
        <input className="btcd-paper-inp w-6 mt-1" name="clientId" defaultValue={integrations[id].clientId} type="text" placeholder="Client id..." readOnly />

        <div className="mt-3"><b>Client secret:</b></div>
        <input className="btcd-paper-inp w-6 mt-1" name="clientSecret" defaultValue={integrations[id].clientSecret} type="text" placeholder="Client secret..." readOnly />

        {integrations[id].type === 'Zoho Analytics' && (
          <>
            <div className="mt-3"><b>Zoho Analytics Owner Email:</b></div>
            <input className="btcd-paper-inp w-6 mt-1" name="ownerEmail" defaultValue={integrations[id].ownerEmail} type="email" placeholder="Owner Email" readOnly />
          </>
        )}

        {integrations[id].type === 'Zoho Creator' && (
          <>
            <div className="mt-3"><b>Owner Name (Your Zoho Creator screen name):</b></div>
            <input className="btcd-paper-inp w-6 mt-1" name="accountOwner" defaultValue={integrations[id].accountOwner} type="text" placeholder="Your Zoho Creator screen name..." readOnly />
          </>
        )}
      </div> */}
    </>
  )
}
