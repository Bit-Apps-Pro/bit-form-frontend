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
import CopyText from '../Utilities/CopyText'
import SingleToggle2 from '../Utilities/SingleToggle2'
import { assignNestedObj } from '../style-new/styleHelpers'
import BorderControlUtil from '../style-new/util-components/BorderControlUtil'
import BoxSizingUtil from '../style-new/util-components/BoxSizingUtil'
import ColorPickerUtil from '../style-new/util-components/ColorPickerUtil'
import SizeControlUtil from '../style-new/util-components/SizeControlUtil'
import Accordion from '../style-new/util-components/Accordion'

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
      } else {
        assignNestedObj(draftConf, statePath, val)
      }
    }))
  }

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

  const generateStyleObj = (path, styleProps = []) => styleProps.reduce((acc, prop) => ({ ...acc, [prop]: standaloneSettings.styles?.[path]?.[prop] || '' }), {})

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
            <div className={css(ut.w6)}>
              <h4>Styling</h4>
              <Accordion title="Body">
                <div className={css(st.prop)}>
                  <p>Background</p>
                  <ColorPickerUtil
                    value={generateStyleObj('.standalone-form-container', ['background-color', 'background-image', 'background-position', 'background-repeat'])}
                    onChangeHandler={val => handleStyles('styles->.standalone-form-container', val)}
                    colorProp="background-color"
                  />
                </div>
              </Accordion>
              <Accordion title="Wrapper">
                <div className={css(st.prop)}>
                  <p>Width</p>
                  <SizeControlUtil
                    value={standaloneSettings?.styles?.['.standalone-form-wrapper']?.width || '60%'}
                    onChangeHandler={val => handleChanges('styles->.standalone-form-wrapper->width', val)}
                    width={130}
                  />
                </div>
                <div className={css(st.prop)}>
                  <p>Height</p>
                  <SizeControlUtil
                    value={standaloneSettings?.styles?.['.standalone-form-wrapper']?.height || '100%'}
                    onChangeHandler={val => handleChanges('styles->.standalone-form-wrapper->height', val)}
                    width={130}
                  />
                </div>
                <div className={css(st.prop)}>
                  <p>Background</p>
                  <ColorPickerUtil
                    value={generateStyleObj('.standalone-form-wrapper', ['background-color', 'background-image', 'background-position', 'background-repeat'])}
                    onChangeHandler={val => handleStyles('styles->.standalone-form-wrapper', val)}
                    colorProp="background-color"
                  />
                </div>
                <div className={css(st.prop)}>
                  <p>Border</p>
                  <BorderControlUtil
                    value={generateStyleObj('.standalone-form-wrapper', ['border-color', 'border-width', 'border-style', 'border-radius'])}
                    onChangeHandler={val => handleStyles('styles->.standalone-form-wrapper', val)}
                  />
                </div>
                <div className={css(st.prop)}>
                  <p>Padding</p>
                  <BoxSizingUtil
                    value={standaloneSettings?.styles?.['.standalone-form-wrapper']?.padding}
                    onChangeHandler={val => handleStyles('styles->.standalone-form-wrapper->padding', val)}
                  />
                </div>
              </Accordion>
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
