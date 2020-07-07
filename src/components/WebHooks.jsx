import React, { memo, useState } from 'react'
import Accordions from './ElmSettings/Childs/Accordions'
import Button from './ElmSettings/Childs/Button'
import ConfirmModal from './ConfirmModal'
import bitsFetch from '../Utils/bitsFetch'
import SnackMsg from './ElmSettings/Childs/SnackMsg'

function WebHooks({ formSettings, setFormSettings, removeIntegration, formFields }) {
  const [confMdl, setConfMdl] = useState({ show: false, action: null })
  const [snack, setSnackbar] = useState({ show: false })
  const handleHookTitle = (e, idx) => {
    const tmp = { ...formSettings }
    tmp.confirmation.type.webHooks[idx].title = e.target.value
    setFormSettings(tmp)
  }

  const handleLink = (val, i) => {
    const tmp = { ...formSettings }
    tmp.confirmation.type.webHooks[i].url = val
    setFormSettings(tmp)
  }

  const handleMethod = (val, i) => {
    const tmp = { ...formSettings }
    tmp.confirmation.type.webHooks[i].method = val
    setFormSettings(tmp)
  }

  const getUrlParams = url => url.match(/(\?|&)([^=]+)=([^&]+|)/gi)

  const handleParam = (typ, val, pram, i) => {
    const tmp = { ...formSettings }
    if (val !== '') {
      if (typ === 'key') {
        tmp.confirmation.type.webHooks[i].url = tmp.confirmation.type.webHooks[i].url.replace(pram, `${pram.charAt(0)}${val}=${pram.split('=')[1]}`)
      } else {
        tmp.confirmation.type.webHooks[i].url = tmp.confirmation.type.webHooks[i].url.replace(pram, `${pram.split('=')[0]}=${val}`)
      }
    } else if (pram.match(/\?/g) === null) {
      tmp.confirmation.type.webHooks[i].url = tmp.confirmation.type.webHooks[i].url.replace(pram, '')
    } else {
      tmp.confirmation.type.webHooks[i].url = tmp.confirmation.type.webHooks[i].url.replace(`${pram}&`, '?')
    }
    setFormSettings(tmp)
  }

  const delParam = (i, param) => {
    const tmp = { ...formSettings }
    tmp.confirmation.type.webHooks[i].url = tmp.confirmation.type.webHooks[i].url.replace(param, '')
    setFormSettings(tmp)
  }

  const addParam = i => {
    const tmp = { ...formSettings }
    if (tmp.confirmation.type.webHooks[i].url.match(/\?/g) !== null) {
      tmp.confirmation.type.webHooks[i].url += '&key=value'
    } else {
      tmp.confirmation.type.webHooks[i].url += '?key=value'
    }
    setFormSettings(tmp)
  }

  const addMoreHook = () => {
    if (!('confirmation' in formSettings)) {
      // eslint-disable-next-line no-param-reassign
      formSettings.confirmation = { type: { webHooks: [] } }
      formSettings.confirmation.type.webHooks.push({ title: `Web Hook ${formSettings.confirmation.type.webHooks.length + 1}`, url: '', method: 'GET' })
    } else if ('webHooks' in formSettings.confirmation.type) {
      formSettings.confirmation.type.webHooks.push({ title: `Web Hook ${formSettings.confirmation.type.webHooks.length + 1}`, url: '', method: 'GET' })
    } else {
      // eslint-disable-next-line no-param-reassign
      formSettings.confirmation.type.webHooks = []
      formSettings.confirmation.type.webHooks.push({ title: `Web Hook ${formSettings.confirmation.type.webHooks.length + 1}`, url: '', method: 'GET' })
    }
    setFormSettings({ ...formSettings })
  }

  const rmvHook = async i => {
    const tmpData = formSettings.confirmation.type.webHooks[i]
    formSettings.confirmation.type.webHooks.splice(i, 1)
    setFormSettings({ ...formSettings })
    confMdl.show = false
    setConfMdl({ ...confMdl })
    if (tmpData.id !== undefined) {
      const status = await removeIntegration(tmpData.id, 'hook')
      if (!status) {
        formSettings.confirmation.type.webHooks.splice(i, 0, tmpData)
        setFormSettings({ ...formSettings })
      }
    }
  }

  const closeMdl = () => {
    confMdl.show = false
    setConfMdl({ ...confMdl })
  }

  const showDelConf = (i) => {
    confMdl.show = true
    confMdl.action = () => rmvHook(i)
    setConfMdl({ ...confMdl })
  }

  const setFromField = (val, i, param) => {
    const tmp = { ...formSettings }
    const a = param.split('=')
    a[1] = val
    tmp.confirmation.type.webHooks[i].url = tmp.confirmation.type.webHooks[i].url.replace(param, a.join('='))
    setFormSettings(tmp)
  }

  const testWebhook = webHookId => {
    bitsFetch({ hookDetails: formSettings.confirmation.type.webHooks[webHookId] }, 'bitforms_test_webhook').then(response => {
      if (response && response.success) {
        setSnackbar({ show: true, msg: `${response.data}` })
      } else if (response && response.data && response.data.data) {
        setSnackbar({ show: true, msg: `${response.data.data}. please try again` })
      } else {
        setSnackbar({ show: true, msg: 'Webhook tests failed. please try again' })
      }
    })
  }

  return (
    <div>
      <SnackMsg snack={snack} setSnackbar={setSnackbar} />
      <ConfirmModal
        action={confMdl.action}
        show={confMdl.show}
        body="Are you sure to delete this message ?"
        btnTxt="Delete"
        close={closeMdl}
      />
      {'confirmation' in formSettings
        && formSettings.confirmation.type.webHooks !== undefined
        ? formSettings.confirmation.type.webHooks.map((itm, i) => (
          <div key={`f-u-${i + 1}`} className="flx">
            <Accordions
              title={itm.title}
              titleEditable
              cls="mt-2 mr-2 w-9"
              onTitleChange={e => handleHookTitle(e, i)}
            >
              <Button onClick={() => testWebhook(i)} icn className="sh-sm white mt-2 mr-4 tooltip f-right" style={{ '--tooltip-txt': '"Test WebHook"' }}><span className="btcd-icn icn-loop" style={{ fontSize: 16 }} /></Button>
              <br />
              <br />
              <div className="flx">
                <div className="w-7 mr-2">
                  <div className="f-m">Link:</div>
                  <input onChange={e => handleLink(e.target.value, i)} className="btcd-paper-inp" type="text" value={itm.url} />
                </div>

                <div className="w-3">
                  <div className="f-m">Method:</div>
                  <select onChange={e => handleMethod(e.target.value, i)} defaultValue={itm.method} className="btcd-paper-inp">
                    <option value="GET">GET</option>
                    <option value="POST">POST</option>
                    <option value="PUT">PUT</option>
                    <option value="PATCH">PATCH</option>
                    <option value="OPTION">OPTION</option>
                    <option value="DELETE">DELETE</option>
                    <option value="TRACE">TRACE</option>
                    <option value="CONNECT">CONNECT</option>
                  </select>
                </div>
              </div>
              <br />
              <br />
              <div className="f-m">Add Url Parameter: (optional)</div>
              <div className="btcd-param-t-wrp mt-1">
                <div className="btcd-param-t">
                  <div className="tr">
                    <div className="td">Key</div>
                    <div className="td">Value</div>
                  </div>
                  {getUrlParams(itm.url) !== null && getUrlParams(itm.url).map((item, childIdx) => (
                    <div key={`url-p-${childIdx + 11}`} className="tr">
                      <div className="td"><input className="btcd-paper-inp p-i-sm" onChange={e => handleParam('key', e.target.value, item, i)} type="text" value={item.split('=')[0].substr(1)} /></div>
                      <div className="td">
                        <input className="btcd-paper-inp p-i-sm" onChange={e => handleParam('val', e.target.value, item, i)} type="text" value={item.split('=')[1]} />
                      </div>
                      <div className="flx p-atn">
                        <Button onClick={() => delParam(i, item)} icn><span className="btcd-icn icn-trash-2" style={{ fontSize: 16 }} /></Button>
                        <span className="tooltip" style={{ '--tooltip-txt': '"set Form Field"', position: 'relative' }}>
                          <select className="btcd-paper-inp p-i-sm" onChange={e => setFromField(e.target.value, i, item)} defaultValue={item.split('=')[1]}>
                            <option value="">Select From Field</option>
                            {formFields !== null && formFields.map(f => !f.type.match(/^(file-up|recaptcha)$/) && <option key={f.key} value={`\${${f.key}}`}>{f.name}</option>)}
                          </select>
                        </span>
                      </div>
                    </div>
                  ))}
                  <Button onClick={() => addParam(i)} className="add-pram" icn><span className="btcd-icn icn-clear icn-rotate-45" /></Button>
                </div>
              </div>
            </Accordions>
            <Button onClick={() => showDelConf(i)} icn className="sh-sm white mt-2"><span className="btcd-icn icn-trash-2" style={{ fontSize: 16 }} /></Button>
          </div>
        )) : (
          <div className="txt-center btcd-empty">
            <span className="btcd-icn icn-stack" />
            Empty
          </div>
        )}
      <div className="txt-center"><Button onClick={addMoreHook} icn className="sh-sm blue tooltip mt-2" style={{ '--tooltip-txt': '"Add More Hook"' }}><span className="btcd-icn icn-clear icn-rotate-45" /></Button></div>
    </div>
  )
}

export default memo(WebHooks)
