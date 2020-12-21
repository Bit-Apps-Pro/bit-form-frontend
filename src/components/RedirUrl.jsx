import { memo, useEffect, useState } from 'react';
import { __ } from '@wordpress/i18n';
import Accordions from './ElmSettings/Childs/Accordions'
import Button from './ElmSettings/Childs/Button'
import bitsFetch from '../Utils/bitsFetch'
import ConfirmModal from './ConfirmModal'

function RedirUrl({ formSettings, setFormSettings, formFields, removeIntegration }) {
  const [confMdl, setConfMdl] = useState({ show: false, action: null })
  const [redirectUrls, setredirectUrls] = useState(null)

  useEffect(() => {
    bitsFetch(null, 'bitforms_get_all_wp_pages')
      .then(res => {
        if (res !== undefined && res.success && res.data !== undefined) {
          setredirectUrls(res.data)
        }
      })
  }, [])

  const handleUrlTitle = (e, idx) => {
    const tmp = { ...formSettings }
    tmp.confirmation.type.redirectPage[idx].title = e.target.value
    setFormSettings(tmp)
  }

  const handlePage = (e, idx) => {
    const tmp = { ...formSettings }
    tmp.confirmation.type.redirectPage[idx].url = e.target.value
    setFormSettings(tmp)
  }

  const handleLink = (val, i) => {
    const tmp = { ...formSettings }
    tmp.confirmation.type.redirectPage[i].url = val
    setFormSettings(tmp)
  }

  const getUrlParams = url => url.match(/(\?|&)([^=]+)=([^&]+|)/gi)

  const handleParam = (typ, val, pram, i) => {
    const tmp = { ...formSettings }
    if (val !== '') {
      if (typ === 'key') {
        tmp.confirmation.type.redirectPage[i].url = tmp.confirmation.type.redirectPage[i].url.replace(pram, `${pram.charAt(0)}${val}=${pram.split('=')[1]}`)
      } else {
        tmp.confirmation.type.redirectPage[i].url = tmp.confirmation.type.redirectPage[i].url.replace(pram, `${pram.split('=')[0]}=${val}`)
      }
    } else if (pram.match(/\?/g) === null) {
      tmp.confirmation.type.redirectPage[i].url = tmp.confirmation.type.redirectPage[i].url.replace(pram, '')
    } else {
      tmp.confirmation.type.redirectPage[i].url = tmp.confirmation.type.redirectPage[i].url.replace(`${pram}&`, '?')
    }
    setFormSettings(tmp)
  }

  const delParam = (i, param) => {
    const tmp = { ...formSettings }
    tmp.confirmation.type.redirectPage[i].url = tmp.confirmation.type.redirectPage[i].url.replace(param, '')
    setFormSettings(tmp)
  }

  const addParam = i => {
    const tmp = { ...formSettings }
    if (tmp.confirmation.type.redirectPage[i].url.match(/\?/g) !== null) {
      tmp.confirmation.type.redirectPage[i].url += '&key=value'
    } else {
      tmp.confirmation.type.redirectPage[i].url += '?key=value'
    }
    setFormSettings(tmp)
  }

  const setFromField = (val, i, param) => {
    const tmp = { ...formSettings }
    const a = param.split('=')
    a[1] = val
    tmp.confirmation.type.redirectPage[i].url = tmp.confirmation.type.redirectPage[i].url.replace(param, a.join('='))
    setFormSettings(tmp)
  }

  const addMoreUrl = () => {
    if (!('confirmation' in formSettings)) {
      // eslint-disable-next-line no-param-reassign
      formSettings.confirmation = { type: { redirectPage: [] } }
      formSettings.confirmation.type.redirectPage.push({ title: `Redirect Url ${formSettings.confirmation.type.redirectPage.length + 1}`, url: '' })
    } else if ('redirectPage' in formSettings.confirmation.type) {
      formSettings.confirmation.type.redirectPage.push({ title: `Redirect Url ${formSettings.confirmation.type.redirectPage.length + 1}`, url: '' })
    } else {
      // eslint-disable-next-line no-param-reassign
      formSettings.confirmation.type.redirectPage = []
      formSettings.confirmation.type.redirectPage.push({ title: `Redirect Url ${formSettings.confirmation.type.redirectPage.length + 1}`, url: '' })
    }
    setFormSettings({ ...formSettings })
  }

  const rmvUrl = async i => {
    const tmpData = formSettings.confirmation.type.redirectPage[i]
    formSettings.confirmation.type.redirectPage.splice(i, 1)
    setFormSettings({ ...formSettings })
    confMdl.show = false
    setConfMdl({ ...confMdl })
    if (tmpData.id !== undefined) {
      const status = await removeIntegration(tmpData.id, 'url')
      if (!status) {
        formSettings.confirmation.type.redirectPage.splice(i, 0, tmpData)
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
    confMdl.action = () => rmvUrl(i)
    setConfMdl({ ...confMdl })
  }

  return (
    <div>
      <ConfirmModal
        action={confMdl.action}
        show={confMdl.show}
        body={__('Are you sure to delete this URL ?', 'bitform')}
        btnTxt={__('Delete', 'bitform')}
        close={closeMdl}
      />
      {'confirmation' in formSettings
        && formSettings.confirmation.type.redirectPage !== undefined
        ? formSettings.confirmation.type.redirectPage.map((itm, i) => (
          <div key={`f-u-${i + 1}`} className="flx">
            <Accordions
              title={itm.title}
              titleEditable
              cls="mt-2 mr-2 w-9"
              onTitleChange={e => handleUrlTitle(e, i)}
            >
              <div className="f-m">{__('Select A Page:', 'bitform')}</div>
              <select className="btcd-paper-inp mt-1" onChange={e => handlePage(e, i)}>
                <option value="">{__('Custom Link', 'bitform')}</option>
                {redirectUrls
                  && redirectUrls.map((urlDetail, ind) => (
                    <option key={`r-url-${ind + 22}`} value={urlDetail.url}>{urlDetail.title}</option>
                  ))}
              </select>
              <br />
              <br />
              <div className="f-m">Link:</div>
              <input onChange={e => handleLink(e.target.value, i)} className="btcd-paper-inp mt-1" type="text" value={itm.url} />
              <br />
              <br />
              <div className="f-m">{__('Add Url Parameter: (optional)', 'bitform')}</div>
              <div className="btcd-param-t-wrp mt-1">
                <div className="btcd-param-t">
                  <div className="tr">
                    <div className="td">{__('Key', 'bitform')}</div>
                    <div className="td">{__('Value', 'bitform')}</div>
                  </div>
                  {getUrlParams(itm.url) !== null && getUrlParams(itm.url).map((item, childIdx) => (
                    <div key={`url-p-${childIdx + 21}`} className="tr">
                      <div className="td"><input className="btcd-paper-inp p-i-sm" onChange={e => handleParam('key', e.target.value, item, i)} type="text" value={item.split('=')[0].substr(1)} /></div>
                      <div className="td">
                        <input className="btcd-paper-inp p-i-sm" onChange={e => handleParam('val', e.target.value, item, i)} type="text" value={item.split('=')[1]} />
                      </div>
                      <div className="flx p-atn">
                        <Button onClick={() => delParam(i, item)} icn><span className="btcd-icn icn-trash-2" style={{ fontSize: 16 }} /></Button>
                        <span className="tooltip" style={{ '--tooltip-txt': `'${ __('set Form Field', 'bitform') }'`, position: 'relative' }}>
                          <select className="btcd-paper-inp p-i-sm mt-1" onChange={e => setFromField(e.target.value, i, item)} defaultValue={item.split('=')[1]}>
                            <option value="">{__('Select Form Field', 'bitform')}</option>
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
            {__('Empty', 'bitform')}
          </div>
        )}
      <div className="txt-center"><Button onClick={addMoreUrl} icn className="sh-sm blue tooltip mt-2" style={{ '--tooltip-txt': `'${ __('Add More Alternative URl', 'bitform') }'` }}><span className="btcd-icn icn-clear icn-rotate-45" /></Button></div>
    </div>
  )
}

export default memo(RedirUrl)
