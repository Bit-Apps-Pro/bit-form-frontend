/* eslint-disable max-len */
/* eslint-disable no-unused-expressions */
import { useState } from 'react'
import toast from 'react-hot-toast'
import 'react-multiple-select-dropdown-lite/dist/index.css'
import { useNavigate } from 'react-router-dom'
import SnackMsg from '../../Utilities/SnackMsg'
import Steps from '../../Utilities/Steps'
import { saveIntegConfig } from '../IntegrationHelpers/IntegrationHelpers'
import IntegrationStepThree from '../IntegrationHelpers/IntegrationStepThree'
import NextBtn from '../NextBtn'
import MailerLiteAuthorization from './MailerLiteAuthorization'
import { checkMappedFields, handleInput } from './MailerLiteCommonFunc'
import MailerLiteIntegLayout from './MailerLiteIntegLayout'

function MailerLite({ formFields, setIntegration, integrations, allIntegURL }) {
  const history = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [step, setstep] = useState(1)
  const [snack, setSnackbar] = useState({ show: false })

  const [mailerLiteConf, setMailerLiteConf] = useState({
    name: 'MailerLite',
    type: 'MailerLite',
    auth_token: process.env.NODE_ENV === 'development' ? 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiOWQzNmNiMDRiZTY0NjdhNTRjYmQ3OWU3ODI2N2JkYzU2ZDYxNTEyZDU0MWZhY2EwNzFhN2RjY2JkZjlmMDZmMTJkMmQzMjliMGU3ZWJlMGMiLCJpYXQiOjE2ODUxNjMzODcuMjQ2MTI0LCJuYmYiOjE2ODUxNjMzODcuMjQ2MTI2LCJleHAiOjQ4NDA4MzY5ODcuMjM3ODU4LCJzdWIiOiI3MTY2MCIsInNjb3BlcyI6W119.e3zrv8mjGMUa6uqfB9QzwX4JWUXn-kC-CmF8jc0Wx4Znt02_g9txem00uSTek3FUUxeuLJQMxzy7-1yxd6ecsTyCvm-3bzvZTQGuoEa11TdQjbCWJWQ4m94DuD6-qZQM9YopfGZwDnajL5WqglASkgLREt59_FrnRnW2H6xUsfGgcV_Bvt4JORI1z-sTDKA-CrBx7yKNQiKJa4rho-te-HRPzpcCaZxTwUfcA678NYFbuXqr4QEApxwCv_kc5sl3nm_2ZoLJbFBp2tBRnTEkQCjs8ZQ0By9QSC-GCfXh647kd200-akj7hLUvuYe9q8N05VfZ94NUsgsdSj4xuP08ltKga59ipHqJ34Imu7eG60JQh5unnDk6pay31yym1BTVf2pdMmgcn6YMHX99JqT95ES787cvGo3bgOzh4EfZLS3B2RgXOuKO0S7NQXN1KznFP4gIIC5J_yfA9Q6Uca8EfSo8cEBxv-sT66vq_5LDfc4CIymmUin3Q3qeNu58pSZ2muYA6h68X2M7O6-1wqfDKuINek3KMEkni2AN5Bh4nxN-gHhF6H9lIK8vXl7IB36kTBag-UMOBSr6zMHtLAebig6LMpCjjUPpw3j0mFlTeZ85UkuN-RHEfaPUuiRaXjx0RkTkeZcXglH-i_oX-8D6z4m1OIU4lEJ4KqgwNPreS0' : '',
    field_map: [
      { formField: '', mailerLiteFormField: 'email' },
    ],
    mailer_lite_type: '',
    mailerLiteFields: [],
    groups: [],
    group_ids: [],
    actions: {},
  })

  const saveConfig = () => {
    setIsLoading(true)
    const resp = saveIntegConfig(integrations, setIntegration, allIntegURL, mailerLiteConf, history, '', '', setIsLoading)
    resp.then(res => {
      if (res.success) {
        toast.success(res.data?.msg)
        history(allIntegURL)
      } else {
        toast.error(res.data || res)
      }
    })
  }
  const nextPage = (pageNo) => {
    if (!checkMappedFields(mailerLiteConf)) {
      toast.error('Please map mandatory fields')
      return
    }
    mailerLiteConf.field_map.length > 0 && setstep(pageNo)
    document.querySelector('.btcd-s-wrp').scrollTop = 0
  }

  return (
    <div>
      <SnackMsg snack={snack} setSnackbar={setSnackbar} />
      <div className="txt-center mt-2"><Steps step={3} active={step} /></div>

      {/* STEP 1 */}

      <MailerLiteAuthorization
        mailerLiteConf={mailerLiteConf}
        setMailerLiteConf={setMailerLiteConf}
        step={step}
        setstep={setstep}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        setSnackbar={setSnackbar}
      />

      {/* STEP 2 */}
      <div
        className="btcd-stp-page"
        style={{ ...(step === 2 && { width: 900, height: 'auto', overintegrations: 'visible' }) }}
      >

        <MailerLiteIntegLayout
          formFields={formFields}
          handleInput={(e) => handleInput(e, mailerLiteConf, setMailerLiteConf, setIsLoading, setSnackbar)}
          mailerLiteConf={mailerLiteConf}
          setMailerLiteConf={setMailerLiteConf}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          setSnackbar={setSnackbar}
        />

        <NextBtn
          nextPageHandler={() => nextPage(3)}
        />
      </div>

      {/* STEP 3 */}
      <IntegrationStepThree
        step={step}
        saveConfig={() => saveConfig()}
      />
    </div>
  )
}

export default MailerLite
