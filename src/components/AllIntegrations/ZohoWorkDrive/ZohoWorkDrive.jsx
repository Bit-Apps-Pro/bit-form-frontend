import { useEffect, useState } from 'react';
import 'react-multiple-select-dropdown-lite/dist/index.css'
import { useHistory, useParams } from 'react-router-dom'
import SnackMsg from '../../ElmSettings/Childs/SnackMsg'
import Steps from '../../ElmSettings/Childs/Steps'
import { handleAuthorize, saveIntegConfig, setGrantTokenResponse } from '../IntegrationHelpers/IntegrationHelpers'
import IntegrationStepOne from '../IntegrationHelpers/IntegrationStepOne'
import IntegrationStepThree from '../IntegrationHelpers/IntegrationStepThree'
import { handleInput, refreshTeams } from './ZohoWorkDriveCommonFunc'
import ZohoWorkDriveIntegLayout from './ZohoWorkDriveIntegLayout'

function ZohoWorkDrive({ formFields, setIntegration, integrations, allIntegURL }) {
  const history = useHistory()
  const { formID } = useParams()
  const [isAuthorized, setisAuthorized] = useState(false)
  const [isLoading, setisLoading] = useState(false)
  const [step, setstep] = useState(1)
  const [error, setError] = useState({ dataCenter: '', clientId: '', clientSecret: '' })
  const [snack, setSnackbar] = useState({ show: false })
  const scopes = 'WorkDrive.team.READ,WorkDrive.workspace.READ,WorkDrive.workspace.CREATE,WorkDrive.workspace.UPDATE,WorkDrive.files.READ,WorkDrive.files.CREATE'
  const [workDriveConf, setWorkDriveConf] = useState({
    name: 'Zoho WorkDrive API',
    type: 'Zoho WorkDrive',
    clientId: process.env.NODE_ENV === 'development' ? '1000.67J41WQIOYYH44QY0QUBJDRK2M2J5I' : '',
    clientSecret: process.env.NODE_ENV === 'development' ? 'bc98018ebc5f2af8c51d9bf5e013ac2208b2322fd9' : '',
    team: '',
    folder: '',
    folderMap: [],
    actions: {},
  })

  useEffect(() => {
    window.opener && setGrantTokenResponse('zohoWorkDrive')
  }, [])

  const nextPage = val => {
    if (val === 3) {
      if (workDriveConf.team !== '' && workDriveConf.folder !== '') {
        setstep(val)
      }
    } else {
      setstep(val)
      if (val === 2 && !workDriveConf.team) {
        refreshTeams(formID, workDriveConf, setWorkDriveConf, setisLoading, setSnackbar)
      }
    }

    document.querySelector('.btcd-s-wrp').scrollTop = 0
  }

  console.log('workDriveConf', workDriveConf);

  return (
    <div>
      <SnackMsg snack={snack} setSnackbar={setSnackbar} />
      <div className="txt-center w-9 mt-2"><Steps step={3} active={step} /></div>

      {/* STEP 1 */}
      <IntegrationStepOne
        step={step}
        confTmp={workDriveConf}
        handleInput={(e) => handleInput(e, workDriveConf, setWorkDriveConf, formID, setisLoading, setSnackbar, null, true, error, setError)}
        error={error}
        setSnackbar={setSnackbar}
        handleAuthorize={() => handleAuthorize('zohoWorkDrive', 'zworkdrive', scopes, workDriveConf, setWorkDriveConf, setError, setisAuthorized, setisLoading, setSnackbar)}
        isLoading={isLoading}
        isAuthorized={isAuthorized}
        nextPage={nextPage}
      />

      {/* STEP 2 */}
      <div className="btcd-stp-page" style={{ width: step === 2 && 900, height: step === 2 && `${100}%` }}>
        <ZohoWorkDriveIntegLayout
          formID={formID}
          formFields={formFields}
          workDriveConf={workDriveConf}
          setWorkDriveConf={setWorkDriveConf}
          isLoading={isLoading}
          setisLoading={setisLoading}
          setSnackbar={setSnackbar}
        />
        <button
          onClick={() => nextPage(3)}
          disabled={workDriveConf.team === '' || workDriveConf.folder === ''}
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
        saveConfig={() => saveIntegConfig(integrations, setIntegration, allIntegURL, workDriveConf, history)}
      />
    </div>
  )
}

export default ZohoWorkDrive
