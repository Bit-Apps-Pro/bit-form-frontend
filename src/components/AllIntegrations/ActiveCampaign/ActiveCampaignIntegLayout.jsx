// eslint-disable-next-line import/no-extraneous-dependencies
import { __ } from '@wordpress/i18n'
import { addFieldMap } from '../IntegrationHelpers/IntegrationHelpers'
import ActiveCampaignActions from './ActiveCampaignActions'
import ActiveCampaignFieldMap from './ActiveCampaignFieldMap'

export default function ActiveCampaignIntegLayout({ formID, formFields, activeCampaingConf, setActiveCampaingConf, isLoading, setisLoading, setSnackbar }) {
  return (
    <>
      <br />
      <div className="mt-4">
        <b className="wdt-100">{__('Map Fields', 'bitform')}</b>
      </div>
      <div className="btcd-hr mt-1" />
      <div className="flx flx-around mt-2 mb-1">
        <div className="txt-dp"><b>{__('Form Fields', 'bitform')}</b></div>
        <div className="txt-dp"><b>{__('ActiveCampaign Fields', 'bitform')}</b></div>
      </div>

      {activeCampaingConf.field_map.map((itm, i) => (
        <ActiveCampaignFieldMap
          key={`Activecampaign-m-${i + 9}`}
          i={i}
          field={itm}
          activeCampaingConf={activeCampaingConf}
          formFields={formFields}
          setActiveCampaingConf={setActiveCampaingConf}
        />
      ))}
      <div className="txt-center  mt-2" style={{ marginRight: 85 }}><button onClick={() => addFieldMap(activeCampaingConf.field_map.length, activeCampaingConf, setActiveCampaingConf)} className="icn-btn sh-sm" type="button">+</button></div>
      <br />
      <br />
      <div className="mt-4"><b className="wdt-100">{__('Actions', 'bitform')}</b></div>
      <div className="btcd-hr mt-1" />
      <ActiveCampaignActions
        activeCampaingConf={activeCampaingConf}
        setActiveCampaingConf={setActiveCampaingConf}
      />
    </>
  )
}
