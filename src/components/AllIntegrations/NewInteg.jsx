import React from 'react'
import { useParams, Link } from 'react-router-dom'
import ZohoCRM from './ZohoCRM';

function NewInteg({ allIntegURL, formFields, setIntegration, integrations }) {
  const { type } = useParams()

  const IntegType = () => {
    switch (type) {
      case 'Zoho CRM':
        return <ZohoCRM allIntegURL={allIntegURL} formFields={formFields} integrations={integrations} setIntegration={setIntegration} />
      default:
        break;
    }
    return ''
  }
  return (
    <div>
      <div className="flx">
        <Link to={allIntegURL} className="btn btcd-btn-o-gray">
          <span className="btcd-icn icn-chevron-left" />
          &nbsp;Back
        </Link>
        <div className="w-8 txt-center">
          <b className="f-lg">{type}</b>
          <div>Integration Settings</div>
        </div>
      </div>
      <IntegType />
    </div>
  )
}

export default NewInteg
