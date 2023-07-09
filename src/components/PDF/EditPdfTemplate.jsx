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
import Btn from '../Utilities/Btn'
import CheckBox from '../Utilities/CheckBox'
import TinyMCE from '../Utilities/TinyMCE'
import { assignNestedObj } from '../style-new/styleHelpers'

export default function EditPdfTemplate() {
  const { formType, formID, id } = useParams()
  const navigate = useNavigate()
  const [pdfTemp, setPdfTem] = useAtom($pdfTemplates)
  const formFields = useAtomValue($fieldsArr)
  const { css } = useFela()

  const pdfConf = pdfTemp[id]

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

  const settingHandler = (path, value) => {
    let val = value
    setPdfTem(prevState => create(prevState, draft => {
      if (path === 'setting->font') {
        const fontObj = fontList.find((item) => item.name === val)
        val = fontObj
      }

      assignNestedObj(draft[id], path, val)
    }))
  }

  const watermarkHandler = (e, value) => {
    setPdfTem(prvState => create(prvState, draft => {
      if (e.target.checked) {
        draft[id].setting.watermark.active = value
      } else {
        delete draft[id].setting.watermark.active
      }
    }))
  }

  const setWpMedia = () => {
    if (typeof wp !== 'undefined' && wp.media) {
      const wpMediaMdl = wp.media({
        title: 'Media',
        button: { text: 'Select picture' },
        library: { type: 'image' },
        multiple: false,
      })

      wpMediaMdl.on('select', () => {
        const { url } = wpMediaMdl.state().get('selection').first().toJSON()

        settingHandler('setting->watermark->img->src', url)
      })

      wpMediaMdl.open()
    }
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
            onChange={(e) => settingHandler(e.target.name, e.target.value)}
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
              onChangeHandler={(val) => settingHandler('body', val)}
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
                  onChange={(e) => settingHandler('setting->paperSize', e.target.value)}
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
                  onChange={(e) => settingHandler('setting->orientation', e.target.value)}
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
                  onChange={(e) => settingHandler('setting->font', e.target.value)}
                  value={pdfConf.setting.font.name}
                  className="btcd-paper-inp mt-1"
                >
                  {fontList.map((item, index) => (
                    <option
                      key={`${index}-${item.name}`}
                      value={item.name}
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
                  onChange={(e) => settingHandler('setting->fontSize', e.target.value)}
                  value={pdfConf.setting.fontSize}
                  className="btcd-paper-inp mt-1"
                  placeholder="Font Size"
                  type="number"
                />
              </label>
            </div>

            <div className="mt-4">
              <label htmlFor="pdfFileName">
                <b>{__('PDF File Name')}</b>
                <input
                  id="pdfFileName"
                  name="pdfFileName"
                  onChange={(e) => settingHandler('setting->pdfFileName', e.target.value)}
                  value={pdfConf.setting?.pdfFileName}
                  className="btcd-paper-inp mt-1"
                  placeholder="PDF File Name"
                  type="text"
                />
              </label>
            </div>

            <div className="mt-2">
              <label htmlFor="active">
                <b>{__('Watermark')}</b>
                <CheckBox
                  name="active"
                  onChange={e => watermarkHandler(e, 'txt')}
                  checked={pdfConf.setting?.watermark?.active === 'txt'}
                  title={<small className="txt-dp"><b>Text</b></small>}
                />
                <CheckBox
                  name="active"
                  onChange={e => watermarkHandler(e, 'img')}
                  checked={pdfConf.setting?.watermark?.active === 'img'}
                  title={<small className="txt-dp"><b>Image</b></small>}
                />
              </label>
            </div>
            { pdfConf.setting.watermark?.active && (
              <div className={css(cs.bdr)}>
                {pdfConf.setting.watermark.active === 'txt' && (
                  <div className="mt-4">
                    <label htmlFor="watermarkText">
                      <b>{__('Watermark Text')}</b>
                      <input
                        id="watermarkText"
                        name="watermarkText"
                        onChange={(e) => settingHandler('setting->watermark->txt', e.target.value)}
                        value={pdfConf.setting?.watermark?.txt}
                        className="btcd-paper-inp mt-1"
                        placeholder="Watermark Text"
                        type="text"
                      />
                    </label>
                  </div>
                )}
                {pdfConf.setting.watermark.active === 'img' && (
                  <>
                    <div className="mt-4">
                      <label htmlFor="watermarkImg" className={css({ flx: 'align-center' })}>
                        <b>{__('Watermark Image')}</b>
                        <Btn className="ml-2" onClick={setWpMedia}>Upload</Btn>

                        <img className={css(cs.img)} src={pdfConf.setting.watermark?.img?.src} alt="" />

                      </label>
                    </div>
                    <div className={css(cs.size)}>
                      <label htmlFor="width" className={css({ w: 300 })}>
                        <b>{__('Width')}</b>
                        <input
                          id="width"
                          onChange={(e) => settingHandler('setting->watermark->img->width', e.target.value)}
                          value={pdfConf.setting?.watermark?.img?.width}
                          className="btcd-paper-inp mt-1"
                          placeholder="Image width"
                          type="number"
                        />
                      </label>
                      <label htmlFor="height" className={css({ w: 300 })}>
                        <b>{__('Height')}</b>
                        <input
                          id="height"
                          onChange={(e) => settingHandler('setting->watermark->img->height', e.target.value)}
                          value={pdfConf.setting?.watermark?.img?.height}
                          className="btcd-paper-inp mt-1"
                          placeholder="Image height"
                          type="number"
                        />
                      </label>
                    </div>
                    <div className={css(cs.size)}>
                      <label htmlFor="posX" className={css({ w: 300 })}>
                        <b>{__('Position X (Units in millimeters)')}</b>
                        <input
                          id="posX"
                          onChange={(e) => settingHandler('setting->watermark->img->posX', e.target.value)}
                          value={pdfConf.setting?.watermark?.img?.posX}
                          className="btcd-paper-inp mt-1"
                          placeholder="Position x"
                          type="number"
                        />
                      </label>
                      <label htmlFor="posY" className={css({ w: 300 })}>
                        <b>{__('Position Y (Units in millimeters)')}</b>
                        <input
                          id="posY"
                          onChange={(e) => settingHandler('setting->watermark->img->posY', e.target.value)}
                          value={pdfConf.setting?.watermark?.img?.posY}
                          className="btcd-paper-inp mt-1"
                          placeholder="Position Y"
                          type="number"
                        />
                      </label>
                    </div>
                    <div className="mt-2">
                      <label htmlFor="imgBehind">
                        <b>{__('Show watermark behind the page content')}</b>
                        <CheckBox
                          radio
                          onChange={e => settingHandler('setting->watermark->img->imgBehind', e.target.value)}
                          checked={pdfConf.setting?.watermark?.img?.imgBehind === 'true'}
                          title={<small className="txt-dp"><b>Yes</b></small>}
                          value="true"
                        />
                        <CheckBox
                          radio
                          onChange={e => settingHandler('setting->watermark->img->imgBehind', e.target.value)}
                          checked={pdfConf.setting?.watermark?.img?.imgBehind === 'false'}
                          title={<small className="txt-dp"><b>No</b></small>}
                          value="false"
                        />
                      </label>
                    </div>
                  </>
                )}
                <div className="mt-2">
                  <label htmlFor="opacity">
                    <b>{__('Opacity (0-100)')}</b>
                    <input
                      id="opacity"
                      onChange={(e) => settingHandler('setting->watermark->alpha', e.target.value)}
                      value={pdfConf.setting?.watermark?.alpha}
                      className="btcd-paper-inp mt-1"
                      placeholder="Opacity"
                      max="100"
                      type="number"
                    />
                  </label>
                </div>

              </div>
            )}

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
                  onChange={e => settingHandler('setting->direction', e.target.value)}
                  checked={pdfConf.setting.direction === 'ltr'}
                  title={<small className="txt-dp"><b>LTR</b></small>}
                  value="ltr"
                />
                <CheckBox
                  radio
                  onChange={e => settingHandler('setting->direction', e.target.value)}
                  checked={pdfConf.setting.direction === 'rtl'}
                  title={<small className="txt-dp"><b>RTL</b></small>}
                  value="rtl"
                />
              </label>
            </div>

            {/* ============== */}
            <button
              id="secondary-update-btn"
              onClick={update}
              className={`${css(app.btn)} blue f-right`}
              type="button"
            >
              {__('Update Template')}

            </button>
          </>

        )}
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
  bdr: {
    pl: 15,
  },
  size: {
    flx: 'align-center',
    mt: 20,
    gp: 40,
  },

  img: {
    w: 50,
    ml: 20,
    b: '1px solid var(--white-0-89)',
    bs: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
    brs: 5,
  },
}
