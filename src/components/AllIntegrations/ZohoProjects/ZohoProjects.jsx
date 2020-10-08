import React, { useEffect, useState } from 'react'
import 'react-multiple-select-dropdown-lite/dist/index.css'
import { useHistory, useParams } from 'react-router-dom'
import SnackMsg from '../../ElmSettings/Childs/SnackMsg'
import Steps from '../../ElmSettings/Childs/Steps'
import { handleAuthorize, saveIntegConfig, setGrantTokenResponse } from '../IntegrationHelpers/IntegrationHelpers'
import IntegrationStepOne from '../IntegrationHelpers/IntegrationStepOne'
import IntegrationStepThree from '../IntegrationHelpers/IntegrationStepThree'
import { checkAllRequired, handleInput, refreshPortals } from './ZohoProjectsCommonFunc'
import ZohoProjectsIntegLayout from './ZohoProjectsIntegLayout'

function ZohoProjects({ formFields, setIntegration, integrations, allIntegURL }) {
  const history = useHistory()
  const { formID } = useParams()
  const [isAuthorized, setisAuthorized] = useState(false)
  const [isLoading, setisLoading] = useState(false)
  const [step, setstep] = useState(1)
  const [error, setError] = useState({ dataCenter: '', clientId: '', clientSecret: '' })
  const [snack, setSnackbar] = useState({ show: false })
  // eslint-disable-next-line max-len
  const scopes = 'ZohoProjects.portals.READ,ZohoProjects.projects.READ,ZohoProjects.projects.CREATE,ZohoProjects.milestones.READ,ZohoProjects.milestones.CREATE,ZohoProjects.tasklists.READ,ZohoProjects.tasklists.CREATE,ZohoProjects.tasks.READ,ZohoProjects.tasks.CREATE,ZohoProjects.bugs.READ,ZohoProjects.bugs.CREATE,ZohoProjects.tags.READ,ZohoProjects.tags.CREATE,ZohoProjects.users.READ,ZohoProjects.users.CREATE,ZohoPC.files.ALL'
  const [projectsConf, setProjectsConf] = useState({
    name: 'Zoho Projects API',
    type: 'Zoho Projects',
    clientId: process.env.NODE_ENV === 'development' ? '1000.67J41WQIOYYH44QY0QUBJDRK2M2J5I' : '',
    clientSecret: process.env.NODE_ENV === 'development' ? 'bc98018ebc5f2af8c51d9bf5e013ac2208b2322fd9' : '',
    portalId: '',
    event: '',
    field_map: {},
    actions: {},
  })

  useEffect(() => {
    window.opener && setGrantTokenResponse('zohoProjects')
  }, [])

  const nextPage = val => {
    if (val === 3) {
      if (!checkAllRequired(projectsConf, setSnackbar)) return
      setstep(val)
    } else {
      setstep(val)
      if (val === 2 && !projectsConf.event) {
        refreshPortals(formID, projectsConf, setProjectsConf, setisLoading, setSnackbar)
      }
    }
    document.querySelector('.btcd-s-wrp').scrollTop = 0
  }

  console.log('projectsConf', projectsConf);

  return (
    <div>
      <SnackMsg snack={snack} setSnackbar={setSnackbar} />
      <div className="txt-center w-9 mt-2"><Steps step={3} active={step} /></div>

      {/* STEP 1 */}
      <IntegrationStepOne
        step={step}
        confTmp={projectsConf}
        handleInput={(e) => handleInput(e, projectsConf, setProjectsConf, formID, setisLoading, setSnackbar, true, error, setError)}
        error={error}
        setSnackbar={setSnackbar}
        handleAuthorize={() => handleAuthorize('zohoProjects', 'zprojects', scopes, projectsConf, setProjectsConf, setError, setisAuthorized, setisLoading, setSnackbar)}
        isLoading={isLoading}
        isAuthorized={isAuthorized}
        nextPage={nextPage}
      />

      {/* STEP 2 */}
      <div className="btcd-stp-page" style={{ width: step === 2 && 900, height: step === 2 && `${100}%` }}>
        <ZohoProjectsIntegLayout
          formID={formID}
          formFields={formFields}
          handleInput={(e) => handleInput(e, projectsConf, setProjectsConf, formID, setisLoading, setSnackbar)}
          projectsConf={projectsConf}
          setProjectsConf={setProjectsConf}
          isLoading={isLoading}
          setisLoading={setisLoading}
          setSnackbar={setSnackbar}
        />

        <button
          onClick={() => nextPage(3)}
          // disabled={projectsConf.event === '' || projectsConf.table === '' || projectsConf.field_map.length < 1}
          className="btn f-right btcd-btn-lg green sh-sm flx"
          type="button"
        >
          Next &nbsp;
          <div className="btcd-icn icn-arrow_back rev-icn d-in-b" />
        </button>

      </div>

      {/* STEP 3 */}
      <IntegrationStepThree
        step={step}
        saveConfig={() => saveIntegConfig(integrations, setIntegration, allIntegURL, projectsConf, history)}
      />
    </div>
  )
}

export default ZohoProjects
