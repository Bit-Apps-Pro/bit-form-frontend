/* eslint-disable-next-line no-undef */
import { useState } from 'react'
import { withQuicklink } from 'quicklink/dist/react/hoc'
import { Link, Route, Switch, useHistory, useParams, useRouteMatch } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil'
import toast from 'react-hot-toast'
import { $bits, $integrations } from '../GlobalStates'
import EditIcn from '../Icons/EditIcn'
import acf from '../resource/img/integ/ACF.svg'
import metabox from '../resource/img/integ/metabox.svg'
import activeCampaign from '../resource/img/integ/activeCampaign.svg'
import zohoAnalytics from '../resource/img/integ/analytics.svg'
import zohoBigin from '../resource/img/integ/bigin.svg'
import zohoCamp from '../resource/img/integ/campaigns.svg'
import zohoCreator from '../resource/img/integ/creator.svg'
import zohoCRM from '../resource/img/integ/crm.svg'
import zohoDesk from '../resource/img/integ/desk.svg'
import encharge from '../resource/img/integ/encharge .svg'
import fluentcrm from '../resource/img/integ/fluentcrm.svg'
import googleSheet from '../resource/img/integ/googleSheets.svg'
import zohoHub from '../resource/img/integ/hub.svg'
import integrately from '../resource/img/integ/integrately.svg'
import integromat from '../resource/img/integ/integromat.svg'
import zohoMail from '../resource/img/integ/mail.svg'
import mailChimp from '../resource/img/integ/mailchimp.svg'
import mailPoet from '../resource/img/integ/mailpoet.svg'
import pabbly from '../resource/img/integ/pabbly.svg'
import pods from '../resource/img/integ/pods.svg'
import zohoProjects from '../resource/img/integ/projects.svg'
import zohoRecruit from '../resource/img/integ/recruit.svg'
import sendinblue from '../resource/img/integ/sendinblue.svg'
import zohoSheet from '../resource/img/integ/sheet.svg'
import zohoSign from '../resource/img/integ/sign.svg'
import telegram from '../resource/img/integ/telegram.svg'
import webhooks from '../resource/img/integ/webhooks.svg'
import wooCommerce from '../resource/img/integ/woocommerce.svg'
import zohoWorkdrive from '../resource/img/integ/workdrive.svg'
import zapier from '../resource/img/integ/zapier.svg'
import zohoflow from '../resource/img/integ/zohoflow.svg'
import bitsFetch from '../Utils/bitsFetch'
import { __ } from '../Utils/i18nwrap'
import EditInteg from './AllIntegrations/EditInteg'
import IntegInfo from './AllIntegrations/IntegInfo'
import NewInteg from './AllIntegrations/NewInteg'
import ConfirmModal from './Utilities/ConfirmModal'
import Modal from './Utilities/Modal'
import SnackMsg from './Utilities/SnackMsg'
import TrashIcn from '../Icons/TrashIcn'
import { deepCopy } from '../Utils/Helpers'
import { useFela } from 'react-fela'
import app from '../styles/app.style'

function Integrations() {
  const [integrs, setIntegration] = useRecoilState($integrations)
  const integrations = deepCopy(integrs)
  const [showMdl, setShowMdl] = useState(false)
  const [confMdl, setconfMdl] = useState({ show: false })
  const [snack, setSnackbar] = useState({ show: false })
  const { path, url } = useRouteMatch()
  const allIntegURL = url
  const history = useHistory()
  const { formID } = useParams()
  const bits = useRecoilValue($bits)
  const { isPro } = bits
  const { css } = useFela()
  const integs = [
    { type: 'Zoho CRM', logo: zohoCRM, pro: !isPro },
    { type: 'Web Hooks', logo: webhooks, pro: !isPro },
    { type: 'Zapier', logo: zapier, pro: !isPro },
    { type: 'Integromat', logo: integromat, pro: !isPro },
    { type: 'Integrately', logo: integrately, pro: !isPro },
    { type: 'Pabbly', logo: pabbly, pro: !isPro },
    { type: 'Zoho Flow', logo: zohoflow, pro: !isPro },
    { type: 'Google Sheet', logo: googleSheet, pro: !isPro },
    { type: 'Mail Chimp', logo: mailChimp, pro: !isPro },
    { type: 'ACF', logo: acf, pro: !isPro },
    { type: 'MetaBox', logo: metabox, pro: !isPro },
    { type: 'Pods', logo: pods, pro: !isPro },
    { type: 'Mail Poet', logo: mailPoet, pro: !isPro },
    { type: 'Sendinblue', logo: sendinblue, pro: !isPro },
    { type: 'WooCommerce', logo: wooCommerce, pro: !isPro },
    { type: 'ActiveCampaign', logo: activeCampaign, pro: !isPro },
    { type: 'Telegram', logo: telegram, pro: !isPro },
    { type: 'Fluent CRM', logo: fluentcrm, pro: !isPro },
    { type: 'Encharge', logo: encharge, pro: !isPro },
    { type: 'Zoho Recruit', logo: zohoRecruit, pro: !isPro },
    { type: 'Zoho Analytics', logo: zohoAnalytics, pro: !isPro },
    { type: 'Zoho Campaigns', logo: zohoCamp, pro: !isPro },
    { type: 'Zoho WorkDrive', logo: zohoWorkdrive, pro: !isPro },
    { type: 'Zoho Desk', logo: zohoDesk, pro: !isPro },
    { type: 'Zoho Mail', logo: zohoMail, pro: !isPro },
    { type: 'Zoho Sheet', logo: zohoSheet, pro: !isPro },
    { type: 'Zoho Projects', logo: zohoProjects, pro: !isPro },
    { type: 'Zoho Sign', logo: zohoSign, pro: !isPro },
    { type: 'Zoho Marketing Hub', logo: zohoHub, pro: !isPro },
    { type: 'Zoho Creator', logo: zohoCreator, pro: !isPro },
    { type: 'Zoho Bigin', logo: zohoBigin, pro: !isPro },

  ]

  const [availableIntegs, setAvailableIntegs] = useState(integs)

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
          toast.error(`${__('Integration deletion failed Cause', 'bitform')}:${response.data.data}. ${__('please try again', 'bitform')}`)
        } else {
          newInteg.splice(i, 0, tempIntegration)
          setIntegration(newInteg)
          toast.error(__('Integration deletion failed. please try again', 'bitform'))
        }
      })
  }

  const inteDelConf = i => {
    confMdl.btnTxt = __('Delete', 'bitform')
    confMdl.body = __('Are you sure to delete this integration?', 'bitform')
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

  const setNewInteg = (type) => {
    closeIntegModal()
    history.push(`${allIntegURL}/new/${type}`)
  }

  const closeIntegModal = () => {
    setShowMdl(false)
    setTimeout(() => setAvailableIntegs(integs), 500)
  }

  const closeConfMdl = () => {
    confMdl.show = false
    setconfMdl({ ...confMdl })
  }

  const searchInteg = e => {
    const { value } = e.target
    const filtered = integs.filter(integ => integ.type.toLowerCase().includes(value.toLowerCase()))
    setAvailableIntegs(filtered)
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
      <Switch>
        <Route exact path={path}>
          <h2>{__('Integrations', 'bitform')}</h2>
          <div className="flx flx-wrp">
            <Modal
              title={__('Available Integrations', 'bitform')}
              show={showMdl}
              setModal={closeIntegModal}
              style={{ width: 1000 }}
            >
              <div className=" btcd-inte-wrp txt-center">
                <input type="search" className="btcd-paper-inp w-5 mt-3" onChange={searchInteg} placeholder="Search Integrations..." style={{ height: 37 }} />
                <div className="flx flx-center flx-wrp pb-3">
                  {availableIntegs.map((inte, i) => (
                    <div
                      key={`inte-sm-${i + 2}`}
                      onClick={() => !inte.disable && !inte.pro && setNewInteg(inte.type)}
                      onKeyPress={() => !inte.disable && !inte.pro && setNewInteg(inte.type)}
                      role="button"
                      tabIndex="0"
                      className={`btcd-inte-card inte-sm mr-4 mt-3 ${inte.disable && !inte.pro && 'btcd-inte-dis'} ${inte.pro && 'btcd-inte-pro'}`}
                    >
                      {inte.pro && (
                        <div className="pro-filter">
                          <span className="txt-pro"><a href="https://bitpress.pro/" target="_blank" rel="noreferrer">{__('Premium', 'bitform')}</a></span>
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
                  <Link to={`${allIntegURL}/edit/${i}`} className="btn btcd-btn-o-blue btcd-btn-sm mr-2 tooltip pos-rel" style={{ '--tooltip-txt': `'${__('Edit', 'bitform')}'` }} type="button">
                    <EditIcn size="15" />
                  </Link>
                  <button className="btn btcd-btn-o-blue btcd-btn-sm mr-2 tooltip pos-rel" style={{ '--tooltip-txt': `'${__('Delete', 'bitform')}'` }} onClick={() => inteDelConf(i)} type="button">
                    <TrashIcn />
                  </button>
                  {typeof (integs.find(int => int.type === inte.type)?.info) !== 'boolean' && (
                    <Link to={`${allIntegURL}/info/${i}`} className="btn btcd-btn-o-blue btcd-btn-sm tooltip pos-rel" style={{ '--tooltip-txt': `'${__('Info', 'bitform')}'` }} type="button">
                      <span className="btcd-icn icn-information-outline" />
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
        </Route>

        <Route path={`${path}/new/:integUrlName`}>
          <NewInteg allIntegURL={allIntegURL} />
        </Route>

        {integrations?.length
          && (
            <Route exact path={`${path}/edit/:id`}>
              <EditInteg allIntegURL={allIntegURL} />
            </Route>
          )}
        {integrations && integrations.length > 0
          && (
            <Route exact path={`${path}/info/:id`}>
              <IntegInfo allIntegURL={allIntegURL} />
            </Route>
          )}
      </Switch>

    </div>
  )
}

export default withQuicklink(Integrations)
