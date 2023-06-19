import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { create } from 'mutative'
import { $formAbandonment, $formId, $updateBtn } from '../../GlobalStates/GlobalStates'
import { IS_PRO } from '../../Utils/Helpers'
import tutorialLinks from '../../Utils/StaticData/tutorialLinks'
import { __ } from '../../Utils/i18nwrap'
import useSWROnce from '../../hooks/useSWROnce'
import Loader from '../Loaders/Loader'
import CheckBox from '../Utilities/CheckBox'
import Cooltip from '../Utilities/Cooltip'
import SingleToggle2 from '../Utilities/SingleToggle2'
import { assignNestedObj } from '../style-new/styleHelpers'

const FormAbandonment = () => {
  const [abandonmentConf, setAbandonmentConf] = useAtom($formAbandonment)
  const setUpdateBtn = useSetAtom($updateBtn)
  const formID = useAtomValue($formId)
  const { isLoading } = useSWROnce(['bitforms_get_form_abandonment_config', formID], { formID }, data => setAbandonmentConf(data))

  const handleChanges = (path, val) => {
    setAbandonmentConf(oldConf => create(oldConf, draftConf => {
      assignNestedObj(draftConf, path, val)
      if (path === 'active' && val && !('saveFormDraft' in draftConf)) {
        draftConf.saveFormDraft = true
        draftConf.saveMode = 'always'
      }
      if (path === 'showWarningMsg' && val && !('warningMsg' in draftConf)) {
        draftConf.warningMsg = 'Please note that your information is saved on our server as you enter it.'
      }
      if (path === 'saveFormDraft') {
        if (!val) delete draftConf.saveMode
        else draftConf.saveMode = 'always'
      }
    }))

    setUpdateBtn(prevState => ({ ...prevState, unsaved: true }))
  }

  const wrpStyle = {}
  if (abandonmentConf.active) {
    wrpStyle.opacity = 1
    wrpStyle.pointerEvents = 'auto'
    wrpStyle.userSelect = 'auto'
  } else {
    wrpStyle.opacity = 0.6
    wrpStyle.pointerEvents = 'none'
    wrpStyle.userSelect = 'none'
  }

  console.log({ abandonmentConf })

  return (
    <div className="pos-rel">
      <div className="flx mt-4">
        <h2 className="m-0">{__('Form Abandonment')}</h2>
        {!isLoading && (
          <SingleToggle2 name="status" action={e => handleChanges('active', e.target.checked)} checked={abandonmentConf.active || false} className="ml-2 flx" />
        )}
      </div>
      <h5 className="mt-3">
        How to setup Form Abandonment & save partial form progress:
        <a href={tutorialLinks.doubleOptIn.link} target="_blank" rel="noreferrer" className="yt-txt ml-1 mr-1">
          YouTube
        </a>
        <a href={tutorialLinks.doubleOptInDoc.link} target="_blank" rel="noreferrer" className="doc-txt">
          Documentation
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

      {
        isLoading
          ? (
            <Loader style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: 70,
              transform: 'scale(0.7)',
            }}
            />
          ) : (
            <div className="w-5">
              <div style={wrpStyle} className="mt-4">
                <div className="mt-2 mb-2 flx">
                  <SingleToggle2
                    name="dflt_temp"
                    action={(e) => handleChanges('showWarningMsg', e.target.checked)}
                    checked={abandonmentConf.showWarningMsg || false}
                    className="flx"
                  />
                  <label htmlFor="dflt_temp">
                    {__('Show warning message below the form description')}
                  </label>
                  <Cooltip
                    className="ml-1"
                    icnSize={14}
                    width={600}
                  >
                    {__('Places an admin-defined message below the form description, making your users aware that their field values are being saved before submission.')}
                  </Cooltip>
                </div>
                {abandonmentConf.showWarningMsg && (
                  <div className="flx">
                    <input
                      onChange={e => handleChanges('warningMsg', e.target.value)}
                      name="warningMsg"
                      value={abandonmentConf.warningMsg || ''}
                      className="btcd-paper-inp mr-2 w-10"
                      placeholder="Set warning message"
                      type="text"
                    />
                  </div>
                )}
                <div className={`flx ${abandonmentConf.showWarningMsg ? 'mt-2' : 'mt-3'}`}>
                  <SingleToggle2
                    name="disable_loggin_user"
                    action={(e) => handleChanges('onlyLoggedInUsers', e.target.checked)}
                    checked={abandonmentConf.onlyLoggedInUsers || false}
                    className="flx"
                  />
                  <label htmlFor="disable_loggin_user">
                    {__('Save draft only for logged in users')}
                  </label>
                </div>
                <div className="mt-3 flx">
                  <SingleToggle2
                    name="repopulate_fields"
                    action={(e) => handleChanges('repopulateForm', e.target.checked)}
                    checked={abandonmentConf.repopulateForm || false}
                    className="flx"
                  />
                  <label htmlFor="repopulate_fields">
                    {__('Repopulate form fields with previous partial entry')}
                  </label>
                  <Cooltip
                    className="ml-1"
                    icnSize={14}
                    width={600}
                  >
                    {__(`If the user is logged in, the form will be repopulated with the previous partial entry from the database.
                    Otherwise, from the local storage of the browser.
                    `)}
                  </Cooltip>
                </div>
                <div className="mt-3 flx">
                  <SingleToggle2
                    name="save_from_draft"
                    action={(e) => handleChanges('saveFormDraft', e.target.checked)}
                    checked={abandonmentConf.saveFormDraft || false}
                    className="flx"
                  />
                  <label htmlFor="save_from_draft">
                    {__('Save draft when user leaves the form page')}
                  </label>
                  <Cooltip
                    className="ml-1"
                    icnSize={14}
                    width={600}
                  >
                    {__(`
                    If turned off, the form will save draft when clicks on the save button or using conditional logic.
                    `)}
                  </Cooltip>
                </div>
                {abandonmentConf.saveFormDraft && (
                  <div className="mt-3">
                    <b className="wdt-150 d-in-b">{__('When to save: ')}</b>
                    <br />
                    <CheckBox
                      radio
                      onChange={() => handleChanges('saveMode', 'always')}
                      name="saveMode"
                      title={<small className="txt-dp">{__('Always save abandoned form entries')}</small>}
                      checked={abandonmentConf.saveMode === 'always'}
                      value="always"
                    />
                    <CheckBox
                      radio
                      onChange={() => handleChanges('saveMode', 'onlyIfEmailPhone')}
                      name="saveMode"
                      title={<small className="txt-dp">{__('Save only if email address or phone number is provided')}</small>}
                      checked={abandonmentConf.saveMode === 'onlyIfEmailPhone'}
                      value="onlyIfEmailPhone"
                    />
                  </div>
                )}
              </div>

            </div>
          )
      }
    </div>
  )
}

export default FormAbandonment
