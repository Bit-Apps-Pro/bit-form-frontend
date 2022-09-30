/* eslint-disable no-unused-expressions */
import { useState } from 'react'
import { useFela } from 'react-fela'
import toast from 'react-hot-toast'
import 'react-multiple-select-dropdown-lite/dist/index.css'
import { useNavigate } from 'react-router-dom'
import BackIcn from '../../../Icons/BackIcn'
import ut from '../../../styles/2.utilities'
import { __ } from '../../../Utils/i18nwrap'
import Btn from '../../Utilities/Btn'
import SnackMsg from '../../Utilities/SnackMsg'
import Steps from '../../Utilities/Steps'
import { saveIntegConfig } from '../IntegrationHelpers/IntegrationHelpers'
import IntegrationStepThree from '../IntegrationHelpers/IntegrationStepThree'
import GetgistAuthorization from './GetgistAuthorization'
import { checkMappedFields, handleInput } from './GetgistCommonFunc'
import GetgistIntegLayout from './GetgistIntegLayout'

function Getgist({ formFields, setIntegration, integrations, allIntegURL }) {
  const history = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [step, setstep] = useState(1)
  const [snack, setSnackbar] = useState({ show: false })
  const { css } = useFela()
  // const [snack, setSnackbar] = useState({ show: false })
  const fields = [
    { key: 'name', label: 'Name', required: false },
    { key: 'email', label: 'Email', required: true },
    { key: 'phone', label: 'Phone', required: false },
    { key: 'gender', label: 'Gender', required: false },
    { key: 'country', label: 'Country', required: false },
    { key: 'city', label: 'City', required: false },
    { key: 'company_name', label: 'Company Name', required: false },
    { key: 'industry', label: 'Industry', required: false },
    { key: 'job_title', label: 'Job Title', required: false },
    { key: 'last_name', label: 'Last Name', required: false },
    { key: 'postal_code', label: 'Postal Code', required: false },
    { key: 'state', label: 'State', required: false },
  ]
  const [getgistConf, setGetgistConf] = useState({
    name: 'Getgist',
    type: 'Getgist',
    api_key: process.env.NODE_ENV === 'development' ? 'vpzw4rMLCjo0Crs9GG+EGla3rC+ojHBCT5XFZRyS6Z+DR1Eq2vcTDsqIR6TgwVY70u4=' : '',
    field_map: [
      { formField: '', getgistFormField: '' },
    ],
    actions: {},
    gistFields: fields,
  })

  const saveConfig = () => {
    saveIntegConfig(integrations, setIntegration, allIntegURL, getgistConf, history)
  }
  const nextPage = (pageNo) => {
    if (!checkMappedFields(getgistConf)) {
      toast.error('Please map mandatory fields')
      return
    }
    getgistConf.field_map.length > 0 && setstep(pageNo)
  }
  document.querySelector('.btcd-s-wrp').scrollTop = 0

  return (
    <div>
      <SnackMsg snack={snack} setSnackbar={setSnackbar} />
      <div className="txt-center w-9 mt-2"><Steps step={3} active={step} /></div>

      {/* STEP 1 */}

      <GetgistAuthorization
        getgistConf={getgistConf}
        setGetgistConf={setGetgistConf}
        step={step}
        setstep={setstep}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />

      {/* STEP 2 */}
      <div
        className="btcd-stp-page"
        style={{ ...(step === 2 && { width: 900, height: 'auto', overflow: 'visible' }) }}
      >
        <GetgistIntegLayout
          formFields={formFields}
          handleInput={(e) => handleInput(e, getgistConf, setGetgistConf, setIsLoading)}
          getgistConf={getgistConf}
          setGetgistConf={setGetgistConf}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />

        <Btn
          onClick={() => nextPage(3)}
          className={css(ut.ftRight)}
          type="button"
        >
          {__('Next')}
          &nbsp;
          <BackIcn className="ml-1 rev-icn" />
        </Btn>

        {/* <button
          onClick={() => nextPage(3)}
          className="btn f-right btcd-btn-lg green sh-sm flx"
          type="button"
        >
          {__('Next')}
          {' '}
          &nbsp;
          <div className="btcd-icn icn-arrow_back rev-icn d-in-b" />
        </button> */}
      </div>

      {/* STEP 3 */}
      <IntegrationStepThree
        step={step}
        saveConfig={() => saveConfig()}
        isLoading={isLoading}
        dataConf={getgistConf}
        setDataConf={setGetgistConf}
        formFields={formFields}
      />
    </div>
  )
}

export default Getgist
