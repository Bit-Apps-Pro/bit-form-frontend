import { useState } from 'react'
import { useFela } from 'react-fela'
import { useHistory } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { $newFormId } from '../GlobalStates/GlobalStates'

import DownloadIcon from '../Icons/DownloadIcon'
import FormIcn from '../Icons/FormIcn'
import app from '../styles/app.style'
import { __ } from '../Utils/i18nwrap'
import FormImporter from './FormImporter'
import Modal from './Utilities/Modal'

const staticTem = [{ slug: 'Blank', img: '' }, { slug: 'Contact Form', img: '' }]

export default function FormTemplates({ setTempModal, setSnackbar }) {
  const newFormId = useRecoilValue($newFormId)

  const history = useHistory()
  const [modal, setModal] = useState(false)
  const { css } = useFela()

  const handleTemplateBtnClick = (templatSlug) => () => {
    history.push(`/form/builder/${templatSlug}/${newFormId}/fields-list`)
  }

  return (
    <div className="btcd-tem-lay flx">
      {staticTem.map((tem, i) => (
        <div key={tem.slug} className="btcd-tem flx" data-testid={`create-form-wrp-${i}`}>
          <FormIcn w="50" />
          <div>{tem.slug}</div>
          <div className="btcd-hid-btn">
            <button
              onClick={handleTemplateBtnClick(tem.slug)}
              className={`${css(app.btn)} btn-white sh-sm`}
              type="button"
              data-testid={`create-form-btn-${i}`}
            >
              {__('Create')}
            </button>
          </div>
        </div>
      ))}

      <div className="btcd-tem flx">
        <DownloadIcon size="60" />
        <div>Form Import</div>
        <div className="btcd-hid-btn">
          <button onClick={() => setModal(true)} className={`${css(app.btn)} btn-white sh-sm`} type="button">{__('Import')}</button>
        </div>
      </div>

      <Modal
        show={modal}
        setModal={setModal}
        title={__('Import Form')}
        subTitle=""
      >
        <FormImporter setModal={setModal} setTempModal={setTempModal} newFormId={newFormId} setSnackbar={setSnackbar} />
      </Modal>
    </div>
  )
}
