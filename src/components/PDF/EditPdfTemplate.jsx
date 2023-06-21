/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-param-reassign */

import { useAtom, useAtomValue } from 'jotai'
import { create } from 'mutative'
import { useFela } from 'react-fela'
import { NavLink, Navigate, useNavigate, useParams } from 'react-router-dom'
import { $fieldsArr, $pdfTemplates } from '../../GlobalStates/GlobalStates'
import BackIcn from '../../Icons/BackIcn'
import { fontList, pageSizes } from '../../Utils/StaticData/pdfConfigurationData'
import { __ } from '../../Utils/i18nwrap'
import app from '../../styles/app.style'
import CheckBox from '../Utilities/CheckBox'
import TinyMCE from '../Utilities/TinyMCE'

export default function EditPdfTemplate() {
  const { formType, formID, id } = useParams()
  const navigate = useNavigate()
  const [pdfTemp, setPdfTem] = useAtom($pdfTemplates)
  const formFields = useAtomValue($fieldsArr)
  const { css } = useFela()

  const pdfConf = pdfTemp[id]

  const inputHandler = (key, val) => {
    setPdfTem(prevState => create(prevState, draft => {
      draft[id][key] = val
    }))
  }

  const update = () => {
    const newPdfTem = create(pdfTemp, draft => {
      draft.push({ updateTem: 1 })
    })
    setPdfTem(newPdfTem)
    navigate(`/form/settings/${formType}/${formID}/pdf-templates`)
  }

  const handleOverride = (e) => {
    setPdfTem(prevState => create(prevState, draft => {
      if (e.target.checked) draft[id].setting.override = true
      else draft[id].setting.override = false
    }))
  }

  const settingHandler = (key, value) => {
    setPdfTem(prevState => create(prevState, draft => {
      draft[id].setting[key] = value
    }))
  }

  return (
    pdfTemp.length < 1 ? (
      <Navigate
        to={`/form/settings/edit/${formID}/pdf-templates`}
        replace
      />
    ) : (
      <div style={{ width: 900 }}>
        <NavLink
          to={`/form/settings/${formType}/${formID}/pdf-templates`}
          className={`${css(app.btn)} btcd-btn-o-gray`}
        >
          <BackIcn className="mr-1" />
          {__('Back')}
        </NavLink>

        <button
          id="secondary-update-btn"
          onClick={update}
          className={`${css(app.btn)} blue f-right`}
          type="button"
        >
          {__('Update Template')}

        </button>

        <div className="mt-3 flx">
          <b className="w-2">
            {__('Template Name:')}
          </b>
          <input
            onChange={(e) => inputHandler(e.target.name, e.target.value)}
            type="text"
            className="btcd-paper-inp w-9"
            placeholder="Name"
            value={pdfConf.title}
            name="title"
          />
        </div>

        <div className="mt-3">
          <div>
            <b>{__('Body:')}</b>
          </div>

          <label
            htmlFor={`t-m-e-${id}-${formID}`}
            className="mt-2 w-10"
          >
            <TinyMCE
              id={`mail-tem-${formID}`}
              formFields={formFields}
              value={pdfConf.body}
              onChangeHandler={(val) => inputHandler('body', val)}
              width="100%"
            />
          </label>
        </div>
        <div className={css(cs.checkbox)}>
          <CheckBox
            onChange={e => handleOverride(e)}
            checked={pdfConf.setting.override}
            title="Override global PDF setting"
          />
        </div>

        {/* ============== */}
        {pdfConf.setting.override && (
          <>
            <div className="mt-2">
              <label htmlFor="paper_size">
                <b>{__('Paper Size')}</b>
                <select
                  id="paper_size"
                  name="paperSize"
                  onChange={(e) => settingHandler(e.target.name, e.target.value)}
                  value={pdfConf.setting.paperSize}
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
                  onChange={(e) => settingHandler(e.target.name, e.target.value)}
                  value={pdfConf.setting.orientation}
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
                  onChange={(e) => settingHandler(e.target.name, e.target.value)}
                  value={pdfConf.setting.font}
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
                  onChange={(e) => settingHandler(e.target.name, e.target.value)}
                  value={pdfConf.setting.fontSize}
                  className="btcd-paper-inp mt-1"
                  placeholder="Font Size"
                  type="number"
                />
              </label>
            </div>

            <div className="mt-4">
              <label htmlFor="watermarkText">
                <b>{__('Watermark Text')}</b>
                <input
                  id="watermarkText"
                  name="watermarkText"
                  onChange={(e) => settingHandler(e.target.name, e.target.value)}
                  value={pdfConf.setting.watermarkText}
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
                  value={pdfConf.setting.fontColor}
                  onChange={(e) => settingHandler(e.target.name, e.target.value)}
                />
              </label>
            </div> */}

            <div className="mt-2">
              <label htmlFor="direction">
                <b>{__('Language Direction')}</b>
                <CheckBox
                  radio
                  name="direction"
                  onChange={e => settingHandler(e.target.name, e.target.value)}
                  checked={pdfConf.setting.direction === 'ltr'}
                  title={<small className="txt-dp"><b>LTR</b></small>}
                  value="ltr"
                />
                <CheckBox
                  radio
                  name="direction"
                  onChange={e => settingHandler(e.target.name, e.target.value)}
                  checked={pdfConf.setting.direction === 'rtl'}
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
