import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { create } from 'mutative'
import { useFela } from 'react-fela'
import { $bits, $formId, $formInfo, $updateBtn } from '../../GlobalStates/GlobalStates'
import { IS_PRO } from '../../Utils/Helpers'
import tutorialLinks from '../../Utils/StaticData/tutorialLinks'
import { __ } from '../../Utils/i18nwrap'
import CopyText from '../Utilities/CopyText'
import SingleToggle2 from '../Utilities/SingleToggle2'
import { assignNestedObj } from '../style-new/styleHelpers'
import { RenderPortal } from '../../RenderPortal'
import ColorPicker from '../CompSettings/StyleCustomize/ChildComp/ColorPicker'
import ut from '../../styles/2.utilities'

export default function StandaloneForm() {
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
              {__('Save draft only for logged in users')}
            </label>
          </div>
          <div className="d-flx">
            <div className="w-3">
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
                <textarea className="w-10" rows={5} readOnly>
                  {`<iframe id="bit-form" width="100%" height="500px" style="min-height: 500px; width: 100%" frameborder="0" src="${standaloneUrl}&embedded=1"></iframe>`}
                </textarea>
              </div>
              <div>
                <h4>Styling</h4>
                <div>
                  <h5>Body</h5>
                  <div className={css(ut.flxc, ut.g10)}>
                    <p>Background Color</p>
                    <ColorPicker value="#ddd" />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-6">
              <h4>Preview</h4>
              <iframe title="bit-form" id="bit-form" width="100%" height="500px" style={{ minHeight: '500px', width: '100%' }} frameBorder="0" src={`${standaloneUrl}&embedded=1`} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
