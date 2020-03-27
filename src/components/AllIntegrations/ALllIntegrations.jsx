/* eslint-disable no-param-reassign */
import React from 'react'
import { useParams, Link } from 'react-router-dom'

function Allintegrations({ url, integrations, setIntegration }) {
  const { id } = useParams()

  const handleName = e => {
    integrations[id].name = e.target.value
    setIntegration([...integrations])
  }
  return (
    <div>
      <Link to={url} className="btn btcd-btn-o-gray">
        <span className="btcd-icn icn-arrow_back" />
              &nbsp;Back
      </Link>
      <b className="d-in-b w-8 f-lg txt-center">
        {integrations[id].type}
        {' '}
        Integration Settings
      </b>

      <div className="mt-3"><b>Integration Name:</b></div>
      <input className="btcd-paper-inp w-6" onChange={handleName} value={integrations[id].name} type="text" />
    </div>
  )
}

export default Allintegrations
