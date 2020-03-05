import React, { useEffect, useState, memo } from 'react'
import Accordions from './ElmSettings/Childs/Accordions'
import Button from './ElmSettings/Childs/Button'
import bitsFetch from '../Utils/bitsFetch'

function RedirUrl({ formSettings, setFormSettings, formID }) {
  const [formFields, setformFields] = useState(null)

  useEffect(() => {
    let mount = false
    mount = true
    bitsFetch({ id: formID }, 'bitapps_get_form_entry_count')
      .then(res => {
        if (res !== undefined && res.success) {
          if (mount) {
            setformFields(res.data.Labels)
          }
        }
      })
    return function cleanup() { mount = false }
  }, [])

  const handleUrlTitle = (e, idx) => {
    const tmp = { ...formSettings }
    tmp.confirmation.type.url[idx].title = e.target.value
    setFormSettings(tmp)
  }


  const handlePage = (e, idx) => {
    const tmp = { ...formSettings }
    tmp.confirmation.type.url[idx].url = e.target.value
    setFormSettings(tmp)
  }

  const handleLink = (val, i) => {
    const tmp = { ...formSettings }
    tmp.confirmation.type.url[i].url = val
    setFormSettings(tmp)
  }

  const getUrlParams = url => url.match(/(\?|&)([^=]+)=([^&]+|)/gi)

  const handleParam = (typ, val, pram, i) => {
    const tmp = { ...formSettings }
    if (val !== '') {
      if (typ === 'key') {
        tmp.confirmation.type.url[i].url = tmp.confirmation.type.url[i].url.replace(pram, `${pram.charAt(0)}${val}=${pram.split('=')[1]}`)
      } else {
        tmp.confirmation.type.url[i].url = tmp.confirmation.type.url[i].url.replace(pram, `${pram.split('=')[0]}=${val}`)
      }
    } else if (pram.match(/\?/g) === null) {
      tmp.confirmation.type.url[i].url = tmp.confirmation.type.url[i].url.replace(pram, '')
    } else {
      tmp.confirmation.type.url[i].url = tmp.confirmation.type.url[i].url.replace(`${pram}&`, '?')
    }
    setFormSettings(tmp)
  }

  const delParam = (i, param) => {
    const tmp = { ...formSettings }
    tmp.confirmation.type.url[i].url = tmp.confirmation.type.url[i].url.replace(param, '')
    setFormSettings(tmp)
  }

  const addParam = i => {
    const tmp = { ...formSettings }
    if (tmp.confirmation.type.url[i].url.match(/\?/g) !== null) {
      tmp.confirmation.type.url[i].url += '&key=value'
    } else {
      tmp.confirmation.type.url[i].url += '?key=value'
    }
    setFormSettings(tmp)
  }

  const getFromField = (val, i, param) => {
    const tmp = { ...formSettings }
    const a = param.split('=')
    a[1] = val
    tmp.confirmation.type.url[i].url = tmp.confirmation.type.url[i].url.replace(param, a.join('='))
    setFormSettings(tmp)
  }

  const addMoreUrl = () => {
    const tmp = { ...formSettings }
    tmp.confirmation.type.url.push({ title: `Redirect Url ${tmp.confirmation.type.url.length + 1}`, url: '' })
    setFormSettings(tmp)
  }

  const rmvUrl = i => {
    const tmp = { ...formSettings }
    tmp.confirmation.type.url.splice(i, 1)
    setFormSettings(tmp)
  }

  return (
    <div>
      {formSettings.confirmation.type.url.map((itm, i) => (
        <div key={`f-u-${i + 1}`} className="flx btcd-conf-list">
          <Accordions
            title={itm.title}
            titleEditable
            cls="mt-2 mr-2"
            onTitleChange={e => handleUrlTitle(e, i)}
          >
            <div className="f-m">Select A Page:</div>
            <select className="btcd-paper-inp" onChange={e => handlePage(e, i)}>
              <option value="">Custom Link</option>
              <option value="https://www.Page-1.com?aaa=wwww&ssss=dddd">Page 1</option>
              <option value="https://www.Page-2.com?aaa=wwww&ssss=dddd">Page 2</option>
              <option value="https://www.Page-3.com?aaa=wwww&ssss=dddd">Page 3</option>
            </select>
            <br />
            <br />
            <div className="f-m">Link:</div>
            <input onChange={e => handleLink(e.target.value, i)} className="btcd-paper-inp" type="text" value={itm.url} />
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
                    <div className="td"><input onChange={e => handleParam('key', e.target.value, item, i)} type="text" value={item.split('=')[0].substr(1)} /></div>
                    <div className="td">
                      <input onChange={e => handleParam('val', e.target.value, item, i)} type="text" value={item.split('=')[1]} />
                    </div>
                    <div className="flx p-atn">
                      <Button onClick={() => delParam(i, item)} icn><span className="btcd-icn icn-trash-2" style={{ fontSize: 16 }} /></Button>
                      <span className="tooltip" style={{ '--tooltip-txt': '"Get Form Field"', position: 'relative' }}>
                        <select onChange={e => getFromField(e.target.value, i, item)} defaultValue={item.split('=')[1]}>
                          <option disabled>Select From Field</option>
                          {formFields !== null && formFields.map(f => <option key={f.key} value={`{${f.name}}`}>{f.name}</option>)}
                        </select>
                      </span>
                    </div>
                  </div>
                ))}
                <Button onClick={() => addParam(i)} cls="add-pram" icn>+</Button>
              </div>
            </div>
          </Accordions>
          <Button onClick={() => rmvUrl(i)} icn cls="sh-sm white mt-2"><span className="btcd-icn icn-trash-2" style={{ fontSize: 16 }} /></Button>
        </div>
      ))}
      <div className="txt-center"><Button onClick={addMoreUrl} icn cls="sh-sm blue tooltip mt-2" style={{ '--tooltip-txt': '"Add More Alternative URl"' }}><b>+</b></Button></div>
    </div>
  )
}

export default memo(RedirUrl)
