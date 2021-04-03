import bitsFetch from '../../../Utils/bitsFetch'
import { __ } from '../../../Utils/i18nwrap'

// eslint-disable-next-line import/prefer-default-export
export const testWebHook = (webHooksDetaila, setIsLoading, setSnackbar) => {
  setIsLoading(true)
  bitsFetch({ hookDetails: webHooksDetaila }, 'bitforms_test_webhook').then(response => {
    if (response && response.success) {
      setSnackbar({ show: true, msg: `${response.data}` })
      setIsLoading(false)
    } else if (response && response.data) {
      const msg = typeof response.data === 'string' ? response.data : 'Unknown error'
      setSnackbar({ show: true, msg: `${msg}. ${__('please try again', 'bitform')}` })
      setIsLoading(false)
    } else {
      setSnackbar({ show: true, msg: __('Webhook tests failed. please try again', 'bitform') })
      setIsLoading(false)
    }
  })
}
export const handleParam = (typ, val, pram, webHooks, setWebHooks) => {
  const tmpConf = { ...webHooks }
  if (val !== '') {
    if (typ === 'key') {
      tmpConf.url = tmpConf.url.replace(pram, `${pram.charAt(0)}${val}=${pram.split('=')[1]}`)
    } else {
      tmpConf.url = tmpConf.url.replace(pram, `${pram.split('=')[0]}=${val}`)
    }
  } else if (pram.match(/\?/g) === null) {
    tmpConf.url = tmpConf.url.replace(pram, '')
  } else {
    tmpConf.url = tmpConf.url.replace(`${pram}&`, '?')
  }
  setWebHooks(tmpConf)
}

export const handleInput = (e, webHooks, setWebHooks) => {
  const tmpConfConf = { ...webHooks }
  tmpConfConf[e.target.name] = e.target.value
  setWebHooks({ ...tmpConfConf })
}

export const setFromField = (val, param, webHooks, setWebHooks) => {
  const tmpConf = { ...webHooks }
  const a = param.split('=')
  a[1] = val
  tmpConf.url = tmpConf.url.replace(param, a.join('='))
  setWebHooks(tmpConf)
}
export const addParam = (webHooks, setWebHooks) => {
  const tmpConf = { ...webHooks }
  if (tmpConf.url.match(/\?/g) !== null) {
    tmpConf.url += '&key=value'
  } else {
    tmpConf.url += '?key=value'
  }
  setWebHooks(tmpConf)
}
export const delParam = (param, webHooks, setWebHooks) => {
  const tmpConf = { ...webHooks }
  tmpConf.url = tmpConf.url.replace(param, '')
  setWebHooks(tmpConf)
}