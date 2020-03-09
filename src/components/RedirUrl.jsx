import React, { memo } from 'react'
import Accordions from './ElmSettings/Childs/Accordions'
import Button from './ElmSettings/Childs/Button'

function RedirUrl({ formSettings, setFormSettings, formFields }) {

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
    console.log(val)
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
                  <div key={`url-p-${childIdx + 21}`} className="tr">
                    <div className="td"><input className="btcd-paper-inp p-i-sm" onChange={e => handleParam('key', e.target.value, item, i)} type="text" value={item.split('=')[0].substr(1)} /></div>
                    <div className="td">
                      <input className="btcd-paper-inp p-i-sm" onChange={e => handleParam('val', e.target.value, item, i)} type="text" value={item.split('=')[1]} />
                    </div>
                    <div className="flx p-atn mt-1">
                      <Button onClick={() => delParam(i, item)} icn><span className="btcd-icn icn-trash-2" style={{ fontSize: 16 }} /></Button>
                      <span className="tooltip" style={{ '--tooltip-txt': '"Get Form Field"', position: 'relative' }}>
                        <select className="btcd-paper-inp p-i-sm" onChange={e => getFromField(e.target.value, i, item)} defaultValue={item.split('=')[1]}>
                          <option disabled>Select From Field</option>
                          {formFields !== null && formFields.map(f => <option key={f.key} value={`{${f.key}}`}>{f.name}</option>)}
                        </select>
                      </span>
                    </div>
                  </div>
                ))}
                <Button onClick={() => addParam(i)} className="add-pram" icn>+</Button>
              </div>
            </div>
          </Accordions>
          <Button onClick={() => rmvUrl(i)} icn className="sh-sm white mt-2"><span className="btcd-icn icn-trash-2" style={{ fontSize: 16 }} /></Button>
        </div>
      ))}
      <div className="txt-center"><Button onClick={addMoreUrl} icn className="sh-sm blue tooltip mt-2" style={{ '--tooltip-txt': '"Add More Alternative URl"' }}><b>+</b></Button></div>
    </div>
  )
}

export default memo(RedirUrl)
