import React, { useState } from 'react'
import { Link, Switch, Route, useRouteMatch } from 'react-router-dom'
import Modal from './Modal'
import Allintegrations from './AllIntegrations/ALllIntegrations'
import zohoAnalytics from '../resource/img/integ/zohoAnalytics.png'
import zohoDesk from '../resource/img/integ/zohoDesk.png'
import zohoCRM from '../resource/img/integ/zohoCRM.png'
import zohoRecruit from '../resource/img/integ/zohoRecruit.png'
import zohoCamp from '../resource/img/integ/zohoCamp.png'
import zohoHub from '../resource/img/integ/zohoHub.png'
import zohoCreator from '../resource/img/integ/zohoCreator.png'
import zohoProjects from '../resource/img/integ/zohoProjects.png'
import zohoPeople from '../resource/img/integ/zohoPeople.png'

function Integrations({ integrations, setIntegration }) {
  const [showMdl, setShowMdl] = useState(false)
  const { path, url } = useRouteMatch()
  const integs = [
    { type: 'Zoho Marketing Hub', logo: zohoHub },
    { type: 'Zoho Campaigns', logo: zohoCamp },
    { type: 'Zoho CRM', logo: zohoCRM },
    { type: 'Zoho Recruit', logo: zohoRecruit },
    { type: 'Zoho Analytics', logo: zohoAnalytics },
    { type: 'Zoho Desk', logo: zohoDesk },
    { type: 'Zoho Creator', logo: zohoCreator },
    { type: 'Zoho Projects', logo: zohoProjects, disable: true },
    { type: 'Zoho People', logo: zohoPeople, disable: true },
  ]
  const addIntegration = i => {
    integrations.push({
      name: `${integs[i].type} ${integrations.length + 1}`,
      type: integs[i].type,
      logo: integs[i].logo,
    })
    setIntegration([...integrations])
    setShowMdl(false)
  }

  const removeInteg = i => {
    integrations.splice(i, 1)
    setIntegration([...integrations])
  }

  return (
    <div>
      <Switch>
        <Route exact path={path}>
          <div className="flx flx-wrp">
            <Modal
              title="Available Integrations"
              show={showMdl}
              setModal={setShowMdl}
            >
              <div className="flx flx-wrp">
                {integs.map((inte, i) => (
                  <div className={`btcd-inte-card inte-sm mr-4 mt-3 ${inte.disable && 'btcd-inte-dis'}`} role="button" onClick={() => addIntegration(i)} onKeyPress={addIntegration} key={`inte-sm-${i + 2}`} tabIndex="0">
                    <img src={inte.logo} alt="" />
                    <div className="txt-center">
                      {inte.type}
                    </div>
                  </div>
                ))}
              </div>
            </Modal>

            <div role="button" className="btcd-inte-card flx flx-center add-inte mr-4 mt-3" tabIndex="0" onClick={() => setShowMdl(true)} onKeyPress={() => setShowMdl(true)}>
              <div>+</div>
            </div>

            {integrations.map((inte, i) => (
              <div role="button" className="btcd-inte-card mr-4 mt-3" key={`inte-${i + 3}`}>
                <img src={inte.logo} alt="" />
                <div className="btcd-inte-atn txt-center">
                  <Link to={`${url}/edit/${i}`} className="btn btcd-btn-o-blue btcd-btn-sm mr-2" type="button">
                    <div>
                      <span className="btcd-icn icn-edit" />
                       &nbsp;Edit
                    </div>
                  </Link>
                  <button className="btn btcd-btn-o-blue btcd-btn-sm" onClick={() => removeInteg(i)} type="button">
                    <div>
                      <span className="btcd-icn icn-trash-2" />
                        &nbsp;Delete
                    </div>
                  </button>
                </div>
                <div className="txt-center body" title={`${inte.name} | ${inte.type}`}>
                  <div>{inte.name}</div>
                  <small className="txt-dp">{inte.type}</small>
                </div>
              </div>
            ))}
          </div>
        </Route>
        <Route exact path={`${path}/edit/:id`}>
          <Allintegrations url={url} integrations={integrations} setIntegration={setIntegration} />
        </Route>
      </Switch>

    </div>
  )
}

export default Integrations
