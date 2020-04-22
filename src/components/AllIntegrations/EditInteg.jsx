import React from 'react'
import { useParams, Link } from 'react-router-dom'
import ZohoCRM from './edit/ZohoCRM';

function EditInteg({ url, formFields, setIntegration, integrations }) {
  const { id } = useParams()

  const IntegType = () => {
    switch (integrations[id].type) {
      case 'Zoho CRM':
        return <ZohoCRM formFields={formFields} integrations={integrations} setIntegration={setIntegration} />
      default:
        break;
    }
    return ''
  }

  return (
    <div>
      <div className="flx">
        <Link to={url} className="btn btcd-btn-o-gray">
          <span className="btcd-icn icn-chevron-left" />
          &nbsp;Back
        </Link>
        <div className="w-8 txt-center">
          <b className="f-lg">{integrations[id].type}</b>
          <div>Integration Settings</div>
        </div>
      </div>
      <IntegType />
    </div>
  )
}

export default EditInteg
