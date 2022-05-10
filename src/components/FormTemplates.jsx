import { useState } from 'react'

import { Link } from 'react-router-dom'
import { useFela } from 'react-fela'
import { __ } from '../Utils/i18nwrap'
import Modal from './Utilities/Modal'
import FormImporter from './FormImporter'
import DownloadIcon from '../Icons/DownloadIcon'
import FormIcn from '../Icons/FormIcn'
// import bitsFetch from '../Utils/bitsFetch'
import app from '../styles/app.style'
import TableCheckBox from './Utilities/TableCheckBox'

export default function FormTemplates({ setTempModal, newFormId, setSnackbar }) {
  const [modal, setModal] = useState(false)

  // const [, setTemplates] = useState(null)
  const staticTem = [{ lbl: 'Blank', img: '' }, { lbl: 'Contact Form', img: '' }]
  const { css } = useFela()
  /* useEffect(() => {
    let mount = true
    bitsFetch(null, 'bitforms_templates')
      .then(res => {
        if (typeof res !== 'undefined' && res.success && mount) {
          setTemplates(JSON.parse(res.data))
        }
      })
    return function cleanup() { mount = false }
  }, []) */

  return (
    <div className="btcd-tem-lay flx">
      {staticTem.map((tem, i) => (
        <div key={tem.lbl} className="btcd-tem flx" data-testid={`create-form-wrp-${i}`}>
          <FormIcn w="50" />
          <div>{tem.lbl}</div>
          <div className="btcd-hid-btn">
            <Link to={`/form/builder/new/${newFormId}/fields-list`} className={`${css(app.btn)} btn-white sh-sm`} type="button" data-testid={`create-form-btn-${i}`}>{__('Create', 'bitform')}</Link>
          </div>
        </div>
      ))}

      <div className="btcd-tem flx">
        <DownloadIcon size="60" />
        <div>Form Import</div>
        <div className="btcd-hid-btn">
          <button onClick={() => setModal(true)} className={`${css(app.btn)} btn-white sh-sm`} type="button">{__('Import', 'bitform')}</button>
        </div>
      </div>

      <Modal
        show={modal}
        setModal={setModal}
        title={__('Import Form', 'bitform')}
        subTitle=""
      >
        <FormImporter setModal={setModal} setTempModal={setTempModal} newFormId={newFormId} setSnackbar={setSnackbar} />
      </Modal>
    </div>
  )
}
