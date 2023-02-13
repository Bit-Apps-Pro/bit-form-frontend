import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { $bits } from '../GlobalStates/GlobalStates'
import bitsFetch from '../Utils/bitsFetch'
import { generateUpdateFormData, getConfirmationStyle, setFormReponseDataToStates, setStyleRelatedStates } from '../Utils/Helpers'
import { __ } from '../Utils/i18nwrap'
import themeProvider from './style-new/themes/themeProvider'
import Modal from './Utilities/Modal'
import Progressbar from './Utilities/Progressbar'

export default function MigrationModal() {
  const bits = useRecoilValue($bits)
  const [migratingCount, setMigratingCount] = useState(0)
  const [totalForms, setTotalForms] = useState(0)

  useEffect(() => {
    if (bits.isMigratingToV2) {
      document.body.style.overflow = 'hidden'
      // do not close this window
      window.onbeforeunload = () => true

      bitsFetch({}, 'bitforms_get_migrated_form_contents')
        .then((res) => {
          if (res.success && res.data.length) {
            setTotalForms(res.data.length)
            const updateFormPromises = []
            res.data.forEach(formData => {
              const { id: formID } = formData
              const fieldsArr = Object.entries(formData.form_content.fields)
              const { themeVars, themeColors, styles } = themeProvider('bitformDefault', fieldsArr, formID)
              setFormReponseDataToStates(formData)
              styles.lgLightStyles.confirmations = getConfirmationStyle(formData)
              setStyleRelatedStates({ themeVars, themeColors, styles })
              const migratedFormData = generateUpdateFormData(formID)
              const updateFormPromise = bitsFetch(migratedFormData, 'bitforms_update_form').then(() => { setMigratingCount(prevCount => prevCount + 1) })
              updateFormPromises.push(updateFormPromise)
            })
            Promise.all(updateFormPromises)
              .then(() => {
                bitsFetch({}, 'bitforms_migrate_to_v2_complete')
                  .then(() => {
                    window.onbeforeunload = null
                    window.location.reload()
                  })
              })
          }
        })
    }
  }, [])

  const backToV1 = () => {
    sessionStorage.removeItem('btcd-fs')
    sessionStorage.removeItem('btcd-lc')
    sessionStorage.removeItem('btcd-rh')
    bitsFetch({}, 'bitforms_migrate_back_to_v1')
      .then(() => {
        window.location.reload()
      })
  }

  const getMigratedPercentage = () => {
    if (migratingCount === 0) return 0
    return Math.round((migratingCount / totalForms) * 100)
  }

  return (
    <Modal sm show={bits.isMigratingToV2} showCloseBtn={false}>
      <div className="flx flx-col flx-center">
        <h3 className="mb-0">{__('Migrating to V2')}</h3>
        <p className="mb-2">{__('Please wait while we migrate your data to V2')}</p>
        {/* <Loader /> */}
        <div className="flx flx-center" style={{ width: '70%' }}><Progressbar value={getMigratedPercentage()} /></div>
        <p className="m-0">{`Migrated ${migratingCount} out of ${totalForms} forms`}</p>
        <p className="m-0 mt-2">{__('This may take a few minutes...')}</p>
        <p className="mt-0 mb-2">{__('Meanwhile do not close this window.')}</p>
        <button type="button" onClick={backToV1}>Back to v1</button>
      </div>
    </Modal>
  )
}
