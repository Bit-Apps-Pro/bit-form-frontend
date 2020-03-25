import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Modal from './Modal'

function Integrations({ integrations, setIntegration }) {
  const [showMdl, setShowMdl] = useState(true)
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
    <div className="flx flx-wrp">
      <Modal
        title="Available Integrations"
        show={showMdl}
        setModal={setShowMdl}
      >
        <div className="flx">
          {integs.map((inte, i) => (
            <div role="button" onClick={() => addIntegration(i)} onKeyPress={addIntegration} tabIndex="0" className="btcd-inte-card inte-sm mr-4 mt-1">
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
          <button className="icn-btn rmv-integ" type="button" onClick={() => removeInteg(i)}>&times;</button>
          <Link to="">
            <img src="" alt="" />
            <div className="txt-center">
              {inte.name}
              <br />
              <small className="txt-dp">{inte.type}</small>
            </div>
          </Link>
        </div>
      ))}

    </div>
  )
}

export default Integrations
