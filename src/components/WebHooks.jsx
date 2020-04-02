import React, { useEffect, useState, memo } from 'react'
import Accordions from './ElmSettings/Childs/Accordions'
import Button from './ElmSettings/Childs/Button'

function WebHooks({ formSettings, setFormSettings, removeIntegration }) {

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
    const tmp = { ...formSettings }
    tmp.confirmation.type.webHooks.push({ title: `Web Hook ${tmp.confirmation.type.webHooks.length + 1}`, url: '', method: 'GET' })
    setFormSettings(tmp)
  }

  const rmvHook = i => {
    const tmp = { ...formSettings }
    if (removeIntegration(tmp.confirmation.type.webHooks[i].id)) {
      tmp.confirmation.type.webHooks.splice(i, 1)
      setFormSettings(tmp)
    }
  }

  return (
    <div>
      {formSettings.confirmation.type.webHooks.map((itm, i) => (
        <div key={`f-u-${i + 1}`} className="flx btcd-conf-list">
          <Accordions
            title={itm.title}
            titleEditable
            cls="mt-2 mr-2"
            onTitleChange={e => handleHookTitle(e, i)}
          >
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
                    <div className="flx p-atn mt-1">
                      <Button onClick={() => delParam(i, item)} icn><span className="btcd-icn icn-trash-2" style={{ fontSize: 16 }} /></Button>
                    </div>
                  </div>
                ))}
                <Button onClick={() => addParam(i)} className="add-pram" icn>+</Button>
              </div>
            </div>
          </Accordions>
          <Button onClick={() => rmvHook(i)} icn className="sh-sm white mt-2"><span className="btcd-icn icn-trash-2" style={{ fontSize: 16 }} /></Button>
        </div>
      ))}
      <div className="txt-center"><Button onClick={addMoreHook} icn className="sh-sm blue tooltip mt-2" style={{ '--tooltip-txt': '"Add More Hook"' }}><b>+</b></Button></div>
    </div>
  )
}

export default memo(WebHooks)
