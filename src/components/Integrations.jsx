import React, { useState } from 'react'
import { Link, Switch, Route, useRouteMatch } from 'react-router-dom'
import Modal from './Modal'
import Allintegrations from './AllIntegrations/ALllIntegrations'

function Integrations({ integrations, setIntegration }) {
  const [showMdl, setShowMdl] = useState(false)
  const { path, url } = useRouteMatch()
  const integs = [
    { type: 'Zoho CRM' },
    { type: 'Zoho Sheet' },
  ]
  const addIntegration = i => {
    integrations.push({
      name: `${integs[i].type} ${integrations.length + 1}`,
      type: integs[i].type,
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
              <div className="flx">
                {integs.map((inte, i) => (
                  <div className="btcd-inte-card inte-sm mr-4 mt-1" role="button" onClick={() => addIntegration(i)} onKeyPress={addIntegration} tabIndex="0">
                    <img src="" alt="" />
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
              <div role="button" className="btcd-inte-card mr-4 mt-3">
                <img src="" alt="" />
                <div className="txt-center body">
                  {inte.name}
                  <br />
                  <small className="txt-dp">{inte.type}</small>
                  <br />
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
