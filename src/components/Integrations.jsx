/* eslint-disable-next-line no-undef */
// import { withQuicklink } from 'quicklink/dist/react/hoc'
import { useState } from 'react'
import { useFela } from 'react-fela'
import toast from 'react-hot-toast'
import { Link, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil'
import { $bits, $integrations } from '../GlobalStates/GlobalStates'
import CopyIcn from '../Icons/CopyIcn'
import EditIcn from '../Icons/EditIcn'
import InfoIcn from '../Icons/InfoIcn'
import TrashIcn from '../Icons/TrashIcn'
import acf from '../resource/img/integ/ACF.svg'
import activeCampaign from '../resource/img/integ/activeCampaign.svg'
import Acumbamail from '../resource/img/integ/Acumbamail.svg'
import zohoAnalytics from '../resource/img/integ/analytics.svg'
import autonami from '../resource/img/integ/autonami.svg'
import zohoBigin from '../resource/img/integ/bigin.svg'
import zohoCamp from '../resource/img/integ/campaigns.svg'
import zohoCreator from '../resource/img/integ/creator.svg'
import zohoCRM from '../resource/img/integ/crm.svg'
import zohoDesk from '../resource/img/integ/desk.svg'
import dropbox from '../resource/img/integ/dropbox.svg'
import elasticemail from '../resource/img/integ/elasticemail.svg'
import encharge from '../resource/img/integ/encharge .svg'
import fluentcrm from '../resource/img/integ/fluentcrm.svg'
import getgist from '../resource/img/integ/getgist.svg'
import googleSheet from '../resource/img/integ/googleSheets.svg'
import groundhogg from '../resource/img/integ/groundhogg.svg'
import zohoHub from '../resource/img/integ/hub.svg'
import hubspot from '../resource/img/integ/hubspot.svg'
import integrately from '../resource/img/integ/integrately.svg'
import integromat from '../resource/img/integ/integromat.svg'
import zohoMail from '../resource/img/integ/mail.svg'
import mailChimp from '../resource/img/integ/mailchimp.svg'
import mailerLite from '../resource/img/integ/mailerLite.svg'
import mailPoet from '../resource/img/integ/mailpoet.svg'
import metabox from '../resource/img/integ/metabox.svg'
import oneDrive from '../resource/img/integ/OneDrive.svg'
import pabbly from '../resource/img/integ/pabbly.svg'
import pods from '../resource/img/integ/pods.svg'
import zohoProjects from '../resource/img/integ/projects.svg'
import rapidmail from '../resource/img/integ/rapidmail.svg'
import zohoRecruit from '../resource/img/integ/recruit.svg'
import sendfox from '../resource/img/integ/sendfox.svg'
import sendinblue from '../resource/img/integ/sendinblue.svg'
import zohoSheet from '../resource/img/integ/sheet.svg'
import zohoSign from '../resource/img/integ/sign.svg'
import telegram from '../resource/img/integ/telegram.svg'
import twilio from '../resource/img/integ/twilio.svg'
import webhooks from '../resource/img/integ/webhooks.svg'
import wooCommerce from '../resource/img/integ/woocommerce.svg'
import zohoWorkdrive from '../resource/img/integ/workdrive.svg'
import zapier from '../resource/img/integ/zapier.svg'
import zohoflow from '../resource/img/integ/zohoflow.svg'
import app from '../styles/app.style'
import bitsFetch from '../Utils/bitsFetch'
import { compareBetweenVersions, deepCopy, sortArrOfObj } from '../Utils/Helpers'
import { __ } from '../Utils/i18nwrap'
import EditInteg from './AllIntegrations/EditInteg'
import IntegInfo from './AllIntegrations/IntegInfo'
import NewInteg from './AllIntegrations/NewInteg'
import ConfirmModal from './Utilities/ConfirmModal'
import Modal from './Utilities/Modal'
import SnackMsg from './Utilities/SnackMsg'

function Integrations() {
  const [integrs, setIntegration] = useRecoilState($integrations)
  const integrations = deepCopy(integrs)
  const [showMdl, setShowMdl] = useState(false)
  const [confMdl, setconfMdl] = useState({ show: false })
  const [snack, setSnackbar] = useState({ show: false })
  // const { path, url } = useRouteMatch()
  const location = useLocation()
  const allIntegURL = location.pathname
  const navigate = useNavigate()
  const { formID } = useParams()
  const bits = useRecoilValue($bits)
  const { isPro, proInfo } = bits
  const { css } = useFela()

  const pro = 1

  const integs = [
    { type: 'Zoho CRM', logo: zohoCRM, pro },
    { type: 'Web Hooks', logo: webhooks, pro },
    { type: 'Zapier', logo: zapier, pro },
    { type: 'Integromat', logo: integromat, pro },
    { type: 'Integrately', logo: integrately, pro },
    { type: 'Pabbly', logo: pabbly, pro },
    { type: 'Zoho Flow', logo: zohoflow, pro },
    { type: 'Google Sheet', logo: googleSheet, pro },
    { type: 'Mail Chimp', logo: mailChimp, pro },
    { type: 'ACF', logo: acf, pro },
    { type: 'MetaBox', logo: metabox, pro },
    { type: 'Pods', logo: pods, pro },
    { type: 'Mail Poet', logo: mailPoet, pro },
    { type: 'Sendinblue', logo: sendinblue, pro },
    { type: 'WooCommerce', logo: wooCommerce, pro },
    { type: 'ActiveCampaign', logo: activeCampaign, pro },
    { type: 'Telegram', logo: telegram, pro },
    { type: 'Fluent CRM', logo: fluentcrm, pro },
    { type: 'Autonami', logo: autonami, pro },
    { type: 'Acumbamail', logo: Acumbamail, pro, proVer: '1.4.23' },
    { type: 'OneDrive', logo: oneDrive, pro },
    { type: 'Dropbox', logo: dropbox, pro, proVer: '1.4.15' },
    { type: 'Encharge', logo: encharge, pro },
    { type: 'Rapidmail', logo: rapidmail, pro, proVer: '1.5.0' },
    { type: 'Hubspot', logo: hubspot, pro, proVer: '1.5.0' },
    { type: 'Getgist', logo: getgist, pro, proVer: '1.5.0' },
    { type: 'ElasticEmail', logo: elasticemail, pro, proVer: '1.5.0' },
    { type: 'Groundhogg', logo: groundhogg, pro, proVer: '1.5.0' },
    { type: 'SendFox', logo: sendfox, pro, proVer: '1.5.0' },
    { type: 'Zoho Recruit', logo: zohoRecruit, pro },
    { type: 'Zoho Analytics', logo: zohoAnalytics, pro },
    { type: 'Zoho Campaigns', logo: zohoCamp, pro },
    { type: 'Zoho WorkDrive', logo: zohoWorkdrive, pro },
    { type: 'Zoho Desk', logo: zohoDesk, pro },
    { type: 'Zoho Mail', logo: zohoMail, pro },
    { type: 'Zoho Sheet', logo: zohoSheet, pro },
    { type: 'Zoho Projects', logo: zohoProjects, pro },
    { type: 'Zoho Sign', logo: zohoSign, pro },
    { type: 'Zoho Marketing Hub', logo: zohoHub, pro },
    { type: 'Zoho Creator', logo: zohoCreator, pro },
    { type: 'Zoho Bigin', logo: zohoBigin, pro },
    { type: 'MailerLite', logo: mailerLite, pro, proVer: '1.5.1' },
    { type: 'Twilio', logo: twilio, pro, proVer: '1.5.1' },
  ]

  const [availableIntegs, setAvailableIntegs] = useState(sortArrOfObj(integs, 'type'))

  const removeInteg = i => {
    const tempIntegration = { ...integrations[i] }
    const newInteg = [...integrations]
    newInteg.splice(i, 1)
    setIntegration(newInteg)
    bitsFetch({ formID, id: tempIntegration.id }, 'bitforms_delete_integration')
      .then(response => {
        if (response && response.success) {
          toast.success(response.data.message)
        } else if (response?.data?.data) {
          newInteg.splice(i, 0, tempIntegration)
          setIntegration(newInteg)
          toast.error(`${__('Integration deletion failed Cause')}:${response.data.data}. ${__('please try again')}`)
        } else {
          newInteg.splice(i, 0, tempIntegration)
          setIntegration(newInteg)
          toast.error(__('Integration deletion failed. please try again'))
        }
      })
  }

  const inteDelConf = i => {
    confMdl.btnTxt = __('Delete')
    confMdl.body = __('Are you sure to delete this integration?')
    confMdl.btnClass = ''
    confMdl.action = () => { removeInteg(i); closeConfMdl() }
    confMdl.show = true
    setconfMdl({ ...confMdl })
  }

  const getLogo = type => {
    for (let i = 0; i < integs.length; i += 1) {
      if (integs[i].type === type) {
        return <img alt={type || 'bitform integration logo'} loading="lazy" src={integs[i].logo} />
      }
    }
    return null
  }

  const setNewInteg = inte => {
    if (inte.pro && !proInfo?.installedVersion && !isPro) {
      toast.error('This integration is only available in Bit Form Pro.')
      return false
    }
    if (inte.proVer && isPro && proInfo?.installedVersion && compareBetweenVersions(inte?.proVer, proInfo.installedVersion) === 1) {
      toast.error('Please update to the latest version of Bit Form Pro.')
      return false
    }
    const { type } = inte
    closeIntegModal()
    navigate(`${allIntegURL}/new/${type}`)
  }

  const closeIntegModal = () => {
    setShowMdl(false)
    setTimeout(() => setAvailableIntegs(sortArrOfObj(integs, 'type')), 500)
  }

  const closeConfMdl = () => {
    confMdl.show = false
    setconfMdl({ ...confMdl })
  }

  const searchInteg = e => {
    const { value } = e.target
    const filtered = integs.filter(integ => integ.type.toLowerCase().includes(value.toLowerCase()))
    setAvailableIntegs(sortArrOfObj(filtered, 'type'))
  }

  const inteCloneConf = i => {
    confMdl.btnTxt = __('Clone')
    confMdl.body = __('Are you sure to clone this integration?')
    confMdl.btnClass = ''
    confMdl.action = () => { inteClone(i); closeConfMdl() }
    confMdl.show = true
    setconfMdl({ ...confMdl })
  }

  const inteClone = (i) => {
    const existInteg = { ...integrations[i] }
    const tmpInteg = [...integrations]
    toast.loading('cloning...')
    bitsFetch({ formID, id: existInteg.id }, 'bitforms_clone_integration')
      .then(response => {
        if (response && response.success) {
          existInteg.id = response.data
          existInteg.name = `Duplicate of ${existInteg.name}`
          tmpInteg.push(existInteg)
          setIntegration(tmpInteg)
          toast.success('Integration clone successfully done.')
        } else {
          toast.error(`${__('Integration clone failed Cause')}: ${response.data} ${__('please try again')}`)
        }
      }).catch(() => toast.error(__('Integration clone failed.')))
  }

  return (
    <div>
      <SnackMsg snack={snack} setSnackbar={setSnackbar} />
      <ConfirmModal
        show={confMdl.show}
        close={closeConfMdl}
        btnTxt={confMdl.btnTxt}
        btnClass={confMdl.btnClass}
        body={confMdl.body}
        action={confMdl.action}
      />
      <Routes>
        <Route
          index
          element={(
            <>
              <h2>{__('Integrations')}</h2>
              <div className="flx flx-wrp">
                <Modal
                  title={__('Available Integrations')}
                  show={showMdl}
                  setModal={closeIntegModal}
                  style={{ width: 1000 }}
                >
                  <div className=" btcd-inte-wrp txt-center">
                    <input aria-label="Search Ingegration" type="search" className="btcd-paper-inp w-5 mt-3" onChange={searchInteg} placeholder="Search Integrations..." style={{ height: 37 }} />
                    <div className="flx flx-center flx-wrp pb-3">
                      {availableIntegs.map((inte, i) => (
                        <div
                          key={`inte-sm-${i + 2}`}
                          onClick={() => !inte.disable && setNewInteg(inte)}
                          onKeyPress={() => !inte.disable && setNewInteg(inte)}
                          role="button"
                          tabIndex="0"
                          className={`btcd-inte-card ${css(app.inte_sm)} mr-4 mt-3 ${inte.disable && !inte.pro && css([app.btcd_inte_dis, 'btcd-inte-dis'])} ${(inte.pro && !isPro) && 'btcd-inte-pro'}`}
                        >
                          {(inte.pro && !isPro) && (
                            <div className="pro-filter">
                              <span className="txt-pro"><a href="https://www.bitapps.pro/bit-form" target="_blank" rel="noreferrer">{__('Premium')}</a></span>
                            </div>
                          )}
                          <img className={css(app.inte_sm_img)} loading="lazy" src={inte.logo} alt="" />
                          <div className="txt-center">
                            {inte.type}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Modal>

                <div role="button" className="btcd-inte-card flx flx-center add-inte mr-4 mt-3" tabIndex="0" onClick={() => setShowMdl(true)} onKeyPress={() => setShowMdl(true)}>
                  <div>+</div>
                </div>

                {integrations.map((inte, i) => (
                  <div role="button" className="btcd-inte-card mr-4 mt-3" key={`inte-${i + 3}`}>
                    {getLogo(inte.type)}
                    <div className="btcd-inte-atn txt-center">
                      <Link to={`${allIntegURL}/edit/${i}`} className={`${css(app.btn)} btcd-btn-o-blue btcd-btn-sm mr-2 tooltip pos-rel`} style={{ '--tooltip-txt': `'${__('Edit')}'` }} type="button">
                        <EditIcn size="15" />
                      </Link>
                      <button className={`${css(app.btn)} btcd-btn-o-blue btcd-btn-sm mr-2 tooltip pos-rel`} style={{ '--tooltip-txt': `'${__('Delete')}'` }} onClick={() => inteDelConf(i)} type="button">
                        <TrashIcn />
                      </button>
                      <button className="btn btcd-btn-o-blue btcd-btn-sm mr-2 tooltip pos-rel" style={{ '--tooltip-txt': `'${__('Clone')}'` }} onClick={() => inteCloneConf(i)} type="button">
                        <CopyIcn size="15" />
                      </button>
                      {typeof (integs.find(int => int.type === inte.type)?.info) !== 'boolean' && (
                        <Link to={`${allIntegURL}/info/${i}`} className={`${css(app.btn)} btcd-btn-o-blue btcd-btn-sm tooltip pos-rel`} style={{ '--tooltip-txt': `'${__('Info')}'` }} type="button">
                          <InfoIcn />
                        </Link>
                      )}
                    </div>
                    <div className="txt-center body w-10 py-1" title={`${inte.name} | ${inte.type}`}>
                      <div className="int-name">{inte.name}</div>
                      <small className="txt-dp int-type">{inte.type}</small>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        />
        <Route path="new/:integUrlName" element={<NewInteg allIntegURL={allIntegURL} />} />
        {integrations?.length
          && (<Route path="/edit/:id" element={<EditInteg allIntegURL={allIntegURL} />} />)}
        {integrations && integrations.length > 0
          && (<Route path="/info/:id" element={<IntegInfo allIntegURL={allIntegURL} />} />)}
      </Routes>
    </div>
  )
}

export default Integrations
