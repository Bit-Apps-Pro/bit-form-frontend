/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-param-reassign */
import { useAtom, useAtomValue } from 'jotai'
import { create } from 'mutative'
import { useEffect, useState } from 'react'
import { useFela } from 'react-fela'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { $bits, $fieldsArr, $pdfTemplates } from '../../GlobalStates/GlobalStates'
import BackIcn from '../../Icons/BackIcn'
import { fontList, pageSizes } from '../../Utils/StaticData/pdfConfigurationData'
import { __ } from '../../Utils/i18nwrap'
import app from '../../styles/app.style'
import CheckBox from '../Utilities/CheckBox'
import ConfirmModal from '../Utilities/ConfirmModal'
import TinyMCE from '../Utilities/TinyMCE'

export default function NewPdfTemplate() {
  const [pdfTem, setPdfTem] = useAtom($pdfTemplates)
  const formFields = useAtomValue($fieldsArr)
  const { formType, formID } = useParams()
  const navigate = useNavigate()
  const { css } = useFela()

  const bits = useAtomValue($bits)
  const { pdf } = bits.allFormSettings
  const [confMdl, setConfMdl] = useState({ show: false })

  const backToPdfList = () => {
    confMdl.show = false
    setConfMdl({ ...confMdl })
    navigate(`/form/settings/${formType}/${formID}/pdf-templates`)
  }

  const gotoPDFSetting = () => {
    confMdl.show = false
    setConfMdl({ ...confMdl })
    navigate('/app-settings/pdf')
  }

  const alertConfig = () => {
    confMdl.btnTxt = __('Go to PDF Settings')
    confMdl.body = __('Please configure PDF settings first.')
    confMdl.btnClass = 'blue'
    confMdl.action = () => { gotoPDFSetting() }
    confMdl.show = true
    confMdl.btn2Txt = __('Back')
    setConfMdl({ ...confMdl })
  }

  useEffect(() => {
    if (undefined === pdf) {
      alertConfig()
    }
  }, [pdf])

  if (pdf?.id) delete pdf.id

  const [tem, setTem] = useState({
    title: 'New Template',
    setting: { ...pdf },
    body: 'PDF body',
  })

  const handleBody = value => {
    setTem(prevState => create(prevState, draft => {
      draft.body = value
    }))
  }

  const handleInput = ({ target: { name, value } }) => {
    setTem(prev => ({ ...prev, [name]: value }))
  }

  const save = () => {
    const newPdfTem = create(pdfTem, draft => {
      draft.push(tem)
      draft.push({ updateTem: 1 })
    })

    setPdfTem(newPdfTem)
    navigate(`/form/settings/${formType}/${formID}/pdf-templates`)
  }

  const handleOverride = (e) => {
    setTem(prevState => create(prevState, draft => {
      if (e.target.checked) draft.setting.override = true
      else draft.setting.override = false
    }))
  }

  return (
    <div style={{ width: 900 }}>
      <ConfirmModal
        show={confMdl.show}
        close={backToPdfList}
        btnTxt={confMdl.btnTxt}
        btnClass={confMdl.btnClass}
        body={confMdl.body}
        action={confMdl.action}
        btn2Txt={__('Back')}
        btn2Action={backToPdfList}
      />

      <NavLink
        to={`/form/settings/${formType}/${formID}/pdf-templates`}
        className={`${css(app.btn)} btcd-btn-o-gray`}
      >
        <BackIcn className="mr-1" />
        {__('Back', 'bitfrom')}
      </NavLink>

      <button
        id="secondary-update-btn"
        onClick={save}
        className={`${css(app.btn)} blue f-right`}
        type="button"
      >
        {__('Save Template')}
      </button>

      <div className="mt-3 flx">
        <b className="w-2" style={{ width: 103 }}>
          {__('Template Name:')}
          {' '}
        </b>
        <input
          onChange={handleInput}
          name="title"
          type="text"
          className="btcd-paper-inp w-9"
          placeholder="Name"
          value={tem.title}
        />
      </div>

      <div className="mt-3">
        <b>{__('Body:')}</b>
        {/* <div className="flx flx-between">
          <button className="btn" onClick={() => setTemplateModal(true)} type="button">{__('Choose Template')}</button>
        </div> */}
        <label htmlFor={`pdf-tem-${formID}`} className="mt-2 w-10">
          <TinyMCE
            id={`pdf-tem-${formID}`}
            formFields={formFields}
            value={tem.body}
            onChangeHandler={handleBody}
            width="100%"
            height={300}
          />
        </label>
      </div>
      <div className={css(cs.checkbox)}>
        <CheckBox
          onChange={e => handleOverride(e, 'update')}
          checked={tem.setting.override}
          title="Override PDF global setting"
        />
      </div>

      {/* ============== */}
      {tem.setting.override && (
        <>
          <div className="mt-2">
            <label htmlFor="paper_size">
              <b>{__('Paper Size')}</b>
              <select
                id="paper_size"
                name="paperSize"
                onChange={(e) => handleInput(e.target.name, e.target.value)}
                value={tem.setting.paperSize}
                className="btcd-paper-inp mt-1"
              >
                {pageSizes.map((item, index) => (
                  <option
                    key={`${index}-${item.val}`}
                    value={item.value}
                  >
                    {item.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="mt-2">
            <label htmlFor="orientation">
              <b>{__('Orientation')}</b>
              <select
                id="orientation"
                name="orientation"
                onChange={(e) => handleInput(e.target.name, e.target.value)}
                value={tem.setting.orientation}
                className="btcd-paper-inp mt-1"
              >
                <option value="p">{__('Portrait')}</option>
                <option value="l">{__('Landscape')}</option>
              </select>
            </label>
          </div>

          <div className="mt-2">
            <label htmlFor="font">
              <b>{__('Font Family')}</b>
              <select
                id="font"
                name="font"
                onChange={(e) => handleInput(e.target.name, e.target.value)}
                value={tem.setting.font}
                className="btcd-paper-inp mt-1"
              >
                {fontList.map((item, index) => (
                  <option
                    key={`${index}-${item.name}`}
                    value={item.font}
                  >
                    {item.name}
                  </option>
                ))}

              </select>
            </label>
          </div>

          <div className="mt-4">
            <label htmlFor="fontSize">
              <b>{__('Font Size (Pixels)')}</b>
              <input
                id="fontSize"
                name="fontSize"
                onChange={(e) => handleInput(e.target.name, e.target.value)}
                value={tem.setting.fontSize}
                className="btcd-paper-inp mt-1"
                placeholder="Font Size"
                type="number"
              />
            </label>
          </div>
          <div className="mt-4">
            <label htmlFor="watermarkText">
              <b>{__('Font Size (Pixels)')}</b>
              <input
                id="watermarkText"
                name="watermarkText"
                onChange={(e) => handleInput(e.target.name, e.target.value)}
                value={tem.setting.watermarkText}
                className="btcd-paper-inp mt-1"
                placeholder="Watermark Text"
                type="text"
              />
            </label>
          </div>
          {/* <div className="mt-4">
            <label htmlFor="fontColor" className={css(cs.font)}>
              <b>{__('Font Color')}</b>
              <input
                id="fontColor"
                name="fontColor"
                type="color"
                className={css(cs.color)}
                value={tem.setting.fontColor}
                onChange={(e) => handleInput(e.target.name, e.target.value)}
              />
            </label>
          </div> */}

          <div className="mt-2">
            <label htmlFor="direction">
              <b>{__('Language Direction')}</b>
              <CheckBox
                radio
                name="direction"
                onChange={e => handleInput(e.target.name, e.target.value)}
                checked={tem.setting.direction === 'ltr'}
                title={<small className="txt-dp"><b>LTR</b></small>}
                value="ltr"
              />
              <CheckBox
                radio
                name="direction"
                onChange={e => handleInput(e.target.name, e.target.value)}
                checked={tem.setting.direction === 'rtl'}
                title={<small className="txt-dp"><b>RTL</b></small>}
                value="rtl"
              />
            </label>
          </div>
        </>
      )}
      {/* ============== */}

    </div>
  )
}

const cs = {
  checkbox: {
    mt: 10,
  },
  font: {
    flx: 'align-center',
  },
  color: {
    b: '1px solid rgb(239 239 239) !important',
    w: 30,
    h: 30,
    ml: 20,
  },
}
