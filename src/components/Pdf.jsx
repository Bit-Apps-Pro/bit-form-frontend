/* eslint-disable react/no-array-index-key */
import { useAtom } from 'jotai'
import { create } from 'mutative'
import { useEffect, useState } from 'react'
import { useFela } from 'react-fela'
import { $bits } from '../GlobalStates/GlobalStates'
import { fontList, pageSizes } from '../Utils/StaticData/pdfConfigurationData'
import bitsFetch from '../Utils/bitsFetch'
import { __ } from '../Utils/i18nwrap'
import LoaderSm from './Loaders/LoaderSm'
import Btn from './Utilities/Btn'
import CheckBox from './Utilities/CheckBox'
import SnackMsg from './Utilities/SnackMsg'

export default function Pdf() {
  const [bits, setBits] = useAtom($bits)
  const { isPro } = bits

  const [snack, setSnackbar] = useState({ show: false })
  const [isLoading, setisLoading] = useState(false)

  const [pdfSetting, setPdfSetting] = useState({
    paperSize: 'a4',
    orientation: 'p',
    font: 'AboriginalSansREGULAR.ttf',
    fontSize: 10,
    fontColor: '#000000',
    direction: 'ltr',
  })

  useEffect(() => {
    bitsFetch({}, 'bitforms_get_pdf_setting').then((res) => {
      if (res !== undefined && res.success) {
        if (res.data?.integration_details) {
          const tmp = JSON.parse(res.data.integration_details)
          tmp.id = res.data.id
          setPdfSetting(tmp)
        }
      }
    })
  }, [])

  const { css } = useFela()

  const handleInput = (typ, val) => {
    const tmp = { ...pdfSetting }
    tmp[typ] = val
    setPdfSetting(tmp)
  }

  const saveConfig = () => {
    if (!isPro) return
    const tempSetting = { ...pdfSetting }
    setisLoading(true)

    bitsFetch({ pdfSetting }, 'bitforms_save_pdf_setting')
      .then(res => {
        if (res !== undefined && res.success) {
          if (res.data && res.data.id) {
            tempSetting.id = res.data.id
          }
          setBits(prvState => create(prvState, draft => {
            draft.allFormSettings.pdf = tempSetting
          }))
          setPdfSetting(tempSetting)
        }
        setSnackbar({ show: true, msg: `${res.data.message}` })
        setisLoading(false)
      })
  }

  return (
    <div className="btcd-captcha w-5 mb-4">
      <div className="pos-rel">
        {!isPro && (
          <div className="pro-blur flx" style={{ height: '110%', left: -15, width: '104%', top: -3 }}>
            <div className="pro">
              <a href="https://www.bitapps.pro/bit-form" target="_blank" rel="noreferrer">
                <span className="txt-pro">
                  {' '}
                  {__('Available On Pro')}
                </span>
              </a>
            </div>
          </div>
        )}
        <SnackMsg snack={snack} setSnackbar={setSnackbar} />

        <h2>{__('Global PDF Setting')}</h2>
        <p>This global settings will be set as default for your new PDF attachment for any form. You can customize for a specific PDF.</p>
        <div className="btcd-hr" />

        <div className="mt-2">
          <label htmlFor="paper_size">
            <b>{__('Paper Size')}</b>
            <select
              id="paper_size"
              name="paperSize"
              onChange={(e) => handleInput(e.target.name, e.target.value)}
              value={pdfSetting.paperSize}
              className="btcd-paper-inp mt-1"
            >
              {pageSizes.map((item, index) => (<option key={`${index}-${item.val}`} value={item.value}>{item.label}</option>))}
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
              value={pdfSetting.orientation}
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
              value={pdfSetting.font}
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
              value={pdfSetting.fontSize}
              className="btcd-paper-inp mt-1"
              placeholder="Font Size"
              type="number"
            />
          </label>
        </div>
        <div className="mt-4">
          <label htmlFor="fontColor" className={css(c.font)}>
            <b>{__('Font Color')}</b>
            <input
              id="fontColor"
              name="fontColor"
              type="color"
              className={css(c.color)}
              value={pdfSetting.fontColor}
              onChange={(e) => handleInput(e.target.name, e.target.value)}
            />
          </label>
        </div>

        <div className="mt-2">
          <label htmlFor="direction">
            <b>{__('Language Direction')}</b>
            <CheckBox
              radio
              name="direction"
              onChange={e => handleInput(e.target.name, e.target.value)}
              checked={pdfSetting.direction === 'ltr'}
              title={<small className="txt-dp"><b>LTR</b></small>}
              value="ltr"
            />
            <CheckBox
              radio
              name="direction"
              onChange={e => handleInput(e.target.name, e.target.value)}
              checked={pdfSetting.direction === 'rtl'}
              title={<small className="txt-dp"><b>RTL</b></small>}
              value="rtl"
            />
          </label>
        </div>

        <Btn
          onClick={() => saveConfig()}
        >
          {pdfSetting.id ? __('Update') : __('Save')}
          {isLoading && <LoaderSm size={20} clr="#fff" className="ml-2" />}
        </Btn>
      </div>
    </div>
  )
}

const c = {
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
