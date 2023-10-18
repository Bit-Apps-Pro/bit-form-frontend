import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { create } from 'mutative'
import { useRef } from 'react'
import { useFela } from 'react-fela'
import { $bits, $formId, $formInfo, $updateBtn } from '../../GlobalStates/GlobalStates'
import { IS_PRO, isObject } from '../../Utils/Helpers'
import tutorialLinks from '../../Utils/StaticData/tutorialLinks'
import { copyToClipboard } from '../../Utils/globalHelpers'
import { __ } from '../../Utils/i18nwrap'
import ut from '../../styles/2.utilities'
import SizeControl from '../CompSettings/StyleCustomize/ChildComp/SizeControl'
import CopyText from '../Utilities/CopyText'
import SingleToggle2 from '../Utilities/SingleToggle2'
import { assignNestedObj, jsObjtoCssStr } from '../style-new/styleHelpers'
import BorderControlUtil from '../style-new/util-components/BorderControlUtil'
import BoxSizingUtil from '../style-new/util-components/BoxSizingUtil'
import ColorPickerUtil from '../style-new/util-components/ColorPickerUtil'

export default function StandaloneForm() {
  const textareaRef = useRef(null)
  const [formInfo, setFormInfo] = useAtom($formInfo)
  const { standaloneSettings = {} } = formInfo
  const setUpdateBtn = useSetAtom($updateBtn)
  const bits = useAtomValue($bits)
  const formId = useAtomValue($formId)
  const { css } = useFela()

  const handleChanges = (path, val) => {
    if (!IS_PRO) return true
    const statePath = `standaloneSettings->${path}`

    setFormInfo(oldConf => create(oldConf, draftConf => {
      assignNestedObj(draftConf, statePath, val)
    }))

    setUpdateBtn(prevState => ({ ...prevState, unsaved: true }))
  }

  const handleStyles = (path, val) => {
    if (!IS_PRO) return true
    const statePath = `standaloneSettings->${path}`
    setFormInfo(oldConf => create(oldConf, draftConf => {
      if (isObject(val)) {
        Object.keys(val).forEach(k => {
          assignNestedObj(draftConf, `${statePath}->${k}`, val[k])
        })
      } else assignNestedObj(draftConf, statePath, val)
      if (draftConf.standaloneSettings?.styles) {
        const stylescss = jsObjtoCssStr(draftConf.standaloneSettings.styles)
        console.log({ stylescss })
      }
    }))
  }

  console.log({ formInfo })

  const wrpStyle = {}
  if (standaloneSettings.active) {
    wrpStyle.opacity = 1
    wrpStyle.pointerEvents = 'auto'
    wrpStyle.userSelect = 'auto'
  } else {
    wrpStyle.opacity = 0.6
    wrpStyle.pointerEvents = 'none'
    wrpStyle.userSelect = 'none'
  }

  const standaloneUrl = `${bits.siteURL}/?bit-form=${formId}`

  return (
    <div className="pos-rel">
      <div className="flx mt-4">
        <h2 className="m-0">{__('Standalone Form')}</h2>
        <SingleToggle2 name="status" action={e => handleChanges('active', e.target.checked)} checked={standaloneSettings.active || false} className="ml-2 flx" />
      </div>
      <h5 className="mt-3">
        {__('How to setup Standalone Form')}
        :
        <a href={tutorialLinks.doubleOptIn.link} target="_blank" rel="noreferrer" className="yt-txt ml-1 mr-1">
          {__('YouTube')}
        </a>
        <a href={tutorialLinks.doubleOptInDoc.link} target="_blank" rel="noreferrer" className="doc-txt">
          {__('Documentation')}
        </a>
      </h5>
      {!IS_PRO && (
        <div className="pro-blur flx" style={{ height: '111%', left: -53, width: '104%' }}>
          <div className="pro">
            {__('Available On')}
            <a href="https://www.bitapps.pro/bit-form" target="_blank" rel="noreferrer">
              <span className="txt-pro">
                {__('Premium')}
              </span>
            </a>
          </div>
        </div>
      )}
      <div className="w-10">
        <div style={wrpStyle} className="mt-4">
          <div className={`flx ${standaloneSettings.showWarningMsg ? 'mt-2' : 'mt-3'}`}>
            <SingleToggle2
              name="disable_loggin_user"
              action={(e) => handleChanges('onlyLoggedInUsers', e.target.checked)}
              checked={standaloneSettings.onlyLoggedInUsers || false}
              className="flx"
            />
            <label htmlFor="disable_loggin_user">
              {__('Visible only for logged in users')}
            </label>
          </div>
          <div className="w-5">
            <div>
              <h4>Share via Direct URL</h4>
              <CopyText
                value={standaloneUrl}
                className="field-key-cpy w-12 ml-0"
                readOnly
              />
            </div>
            <div>
              <h4>Embed via HTML Code</h4>
              <textarea ref={textareaRef} rows={5} readOnly className={css(ut.w10, st.embed)} onClick={() => copyToClipboard({ ref: textareaRef })}>
                {`<iframe id="bit-form" width="100%" height="500px" style="min-height: 500px; width: 100%" frameborder="0" src="${standaloneUrl}&embedded=1"></iframe>`}
              </textarea>
            </div>
            <div className={css(ut.w5)}>
              <h4>Styling</h4>
              <div>
                <h5>Body</h5>
                <div className={css(st.prop)}>
                  <p>Background</p>
                  <ColorPickerUtil value={standaloneSettings?.styles?.['.standalone-form-container'] || ''} onChangeHandler={val => handleStyles('styles->.standalone-form-container', val)} colorProp="background-color" />
                </div>
              </div>
              <div className={css(ut.flxClm)}>
                <h5>Wrapper</h5>
                <div className={css(st.prop)}>
                  <p>Height</p>
                  <SizeControl
                    // className={css(style.select)}
                    width={150}
                    max={1000}
                    // inputHandler={handleFormWidth}
                    // sizeHandler={({ unitKey, unitValue }) => handleFormWidth({ value: unitValue, unit: unitKey })}
                    // value={(formWidth && getNumFromStr(formWidth)) || ''}
                    // unit={(formWidth && getStrFromStr(formWidth)) || 'px'}
                    sliderWidth="40%"
                    actualValue="auto"
                  />
                  {/* <ColorPickerUtil value={standaloneSettings?.styles?.wrapper?.background || ''} onChangeHandler={val => handleChanges('styles->wrapper->background', val)} /> */}
                </div>
                <div className={css(st.prop)}>
                  <p>Width</p>
                  <SizeControl
                    // className={css(style.select)}
                    width={150}
                    max={1000}
                    // inputHandler={handleFormWidth}
                    // sizeHandler={({ unitKey, unitValue }) => handleFormWidth({ value: unitValue, unit: unitKey })}
                    // value={(formWidth && getNumFromStr(formWidth)) || ''}
                    // unit={(formWidth && getStrFromStr(formWidth)) || 'px'}
                    sliderWidth="40%"
                    actualValue="auto"
                  />
                </div>
                <div className={css(st.prop)}>
                  <p>Background</p>
                  <ColorPickerUtil value={standaloneSettings?.styles?.['.standalone-form-wrapper'] || ''} onChangeHandler={val => handleStyles('styles->.standalone-form-wrapper', val)} colorProp="background-color" />
                </div>
                <div className={css(st.prop)}>
                  <p>Border</p>
                  <BorderControlUtil value={standaloneSettings?.styles?.['.standalone-form-wrapper']?.border} onChangeHandler={val => handleChanges('styles->.standalone-form-wrapper->border', val)} />
                </div>
                <div className={css(st.prop)}>
                  <p>Padding</p>
                  <BoxSizingUtil value={standaloneSettings?.styles?.['.standalone-form-wrapper']?.padding} onChangeHandler={val => handleChanges('styles->.standalone-form-wrapper->padding', val)} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const st = {
  embed: {
    curp: 1,
  },
  prop: {
    flx: 'between',
  },
}
