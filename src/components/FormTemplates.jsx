import { useState } from 'react'
import { useFela } from 'react-fela'
import { useNavigate } from 'react-router-dom'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { $formInfo, $newFormId } from '../GlobalStates/GlobalStates'
import DownloadIcon from '../Icons/DownloadIcon'
import FormIcn from '../Icons/FormIcn'
// import bitsFetch from '../Utils/bitsFetch'
import app from '../styles/app.style'
import { __ } from '../Utils/i18nwrap'
import FormImporter from './FormImporter'
import Modal from './Utilities/Modal'

export default function FormTemplates({ setTempModal, setSnackbar }) {
  const newFormId = useRecoilValue($newFormId)
  const setFormInfo = useSetRecoilState($formInfo)
  let navigate = useNavigate()
  const [modal, setModal] = useState(false)
  // console.log("navigate", navigate)

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

  const handleTemplateBtnClick = (e, tem) => {
    e.preventDefault()
    setFormInfo(oldInfo => ({ ...oldInfo, formName: tem.lbl === 'Blank' ? oldInfo.formName : tem.lbl, template: tem.lbl }))
    navigate(`/form/builder/new/${newFormId}/fields-list`, { replace: true, state: true })
  }

  return (
    <div className="btcd-tem-lay flx">
      {staticTem.map((tem, i) => (
        <div key={tem.lbl} className="btcd-tem flx" data-testid={`create-form-wrp-${i}`}>
          <FormIcn w="50" />
          <div>{tem.lbl}</div>
          <div className="btcd-hid-btn">
            <button onClick={e => handleTemplateBtnClick(e, tem)} className={`${css(app.btn)} btn-white sh-sm`} type="button" data-testid={`create-form-btn-${i}`}>{__('Create')}</button>
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
