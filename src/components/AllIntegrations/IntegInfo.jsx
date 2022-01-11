import { lazy, Suspense, useState } from 'react'
import { useFela } from 'react-fela'
import { Link, useParams } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { $bits, $integrations } from '../../GlobalStates/GlobalStates'
import ChevronLeft from '../../Icons/ChevronLeft'
import app from '../../styles/app.style'
import { __ } from '../../Utils/i18nwrap'
import SnackMsg from '../Utilities/SnackMsg'

const ActiveCampaignAuthorization = lazy(() => import('./ActiveCampaign/ActiveCampaignAuthorization'))
const GoogleSheetAuthorization = lazy(() => import('./GoogleSheet/GoogleSheetAuthorization'))
const WebHooksIntegration = lazy(() => import('./IntegrationHelpers/WebHooksIntegration'))
const MailChimpAuthorization = lazy(() => import('./MailChimp/MailChimpAuthorization'))
const SendinBlueAuthorization = lazy(() => import('./SendinBlue/SendinBlueAuthorization'))
const TelegramAuthorization = lazy(() => import('./Telegram/TelegramAuthorization'))
const ZohoAnalyticsAuthorization = lazy(() => import('./ZohoAnalytics/ZohoAnalyticsAuthorization'))
const ZohoBiginAuthorization = lazy(() => import('./ZohoBigin/ZohoBiginAuthorization'))
const ZohoCampaignsAuthorization = lazy(() => import('./ZohoCampaigns/ZohoCampaignsAuthorization'))
const ZohoCreatorAuthorization = lazy(() => import('./ZohoCreator/ZohoCreatorAuthorization'))
const ZohoCRMAuthorization = lazy(() => import('./ZohoCRM/ZohoCRMAuthorization'))
const ZohoDeskAuthorization = lazy(() => import('./ZohoDesk/ZohoDeskAuthorization'))
const ZohoMailAuthorization = lazy(() => import('./ZohoMail/ZohoMailAuthorization'))
const ZohoMarketingHubAuthorization = lazy(() => import('./ZohoMarketingHub/ZohoMarketingHubAuthorization'))
const ZohoProjectsAuthorization = lazy(() => import('./ZohoProjects/ZohoProjectsAuthorization'))
const ZohoRecruitAuthorization = lazy(() => import('./ZohoRecruit/ZohoRecruitAuthorization'))
const ZohoSheetAuthorization = lazy(() => import('./ZohoSheet/ZohoSheetAuthorization'))
const ZohoSignAuthorization = lazy(() => import('./ZohoSign/ZohoSignAuthorization'))
const ZohoWorkDriveAuthorization = lazy(() => import('./ZohoWorkDrive/ZohoWorkDriveAuthorization'))
const EnchargeAuthorization = lazy(() => import('./Encharge/EnchargeAuthorization'))
const Loader = lazy(() => import('../Loaders/Loader'))

export default function IntegInfo({ allIntegURL }) {
  const integrations = useRecoilValue($integrations)

  const { id } = useParams()
  const [snack, setSnackbar] = useState({ show: false })
  const integ = integrations[id]
  const bits = useRecoilValue($bits)
  const { css } = useFela()

  // route is info/:id but for redirect uri need to make new/:type
  let location = window.location.toString()

  const toReplaceInd = location.indexOf('/info')
  location = window.encodeURI(`${location.slice(0, toReplaceInd)}/new/${integrations[id].type}`)

  const IntegInfoComponents = () => {
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
      case 'ActiveCampaign':
        return <ActiveCampaignAuthorization activeCampaingConf={integ} step={1} setSnackbar={setSnackbar} isInfo />
      case 'Web Hooks':
        return <WebHooksIntegration webHooks={integ} setSnackbar={setSnackbar} isInfo />
      case 'Zapier':
        return <WebHooksIntegration webHooks={integ} setSnackbar={setSnackbar} isInfo />
      case 'Integromat':
        return <WebHooksIntegration webHooks={integ} setSnackbar={setSnackbar} isInfo />
      case 'Integrately':
        return <WebHooksIntegration webHooks={integ} setSnackbar={setSnackbar} isInfo />
      case 'Pabbly':
        return <WebHooksIntegration webHooks={integ} setSnackbar={setSnackbar} isInfo />
      case 'Zoho Flow':
        return <WebHooksIntegration webHooks={integ} setSnackbar={setSnackbar} isInfo />
      case 'Telegram':
        return <TelegramAuthorization telegramConf={integ} step={1} setSnackbar={setSnackbar} isInfo />
      case 'Encharge':
        return <EnchargeAuthorization enchargeConf={integ} step={1} setSnackbar={setSnackbar} isInfo />
      default:
        return ''
    }
  }

  return (
    <>
      <SnackMsg snack={snack} setSnackbar={setSnackbar} />
      <div className="flx">
        <Link to={allIntegURL} className={`${css(app.btn)} btcd-btn-o-gray`}>
          <ChevronLeft size="15" />
          &nbsp;Back
        </Link>
        <div className="w-8 txt-center">
          <b className="f-lg">{integrations[id].type}</b>
          <div>{__('Integration Info', 'bitform')}</div>
        </div>
      </div>

      <Suspense fallback={<Loader className="g-c" style={{ height: '90vh' }} />}>
        <IntegInfoComponents />
      </Suspense>
    </>
  )
}
