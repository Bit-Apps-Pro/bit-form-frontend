/* eslint-disable no-param-reassign */
import React from 'react'
import DatePicker from 'react-date-picker'
import TimePicker from 'react-time-picker'
import SingleToggle2 from './ElmSettings/Childs/SingleToggle2'
import Accordions from './ElmSettings/Childs/Accordions'
import CheckBox from './ElmSettings/Childs/CheckBox'

export default function SingleFormSettings({ additional, setadditional }) {
  console.log('..render singlefromsettings')

  const addMoreBlockIp = () => {
    if ('blocked_ip' in additional.settings) {
      additional.settings.blocked_ip.push({ ip: '', status: false })
    } else {
      additional.settings.blocked_ip = []
      additional.settings.blocked_ip.push({ ip: '', status: false })
    }
    setadditional({ ...additional })
  }

  const addMorePrivateIp = () => {
    if ('private_ip' in additional.settings) {
      additional.settings.private_ip.push({ ip: '', status: false })
    } else {
      additional.settings.private_ip = []
      additional.settings.private_ip.push({ ip: '', status: false })
    }
    setadditional({ ...additional })
  }

  const delBlkIp = i => {
    additional.settings.blocked_ip.splice(i, 1)
    setadditional({ ...additional })
  }

  const delPrivateIp = i => {
    additional.settings.private_ip.splice(i, 1)
    setadditional({ ...additional })
  }

  const setEntryLimit = e => {
    additional.settings.entry_limit = e.target.value
    setadditional({ ...additional })
  }

  const setOnePerIp = e => {
    if (e.target.checked) {
      additional.enabled.onePerIp = true
    } else {
      delete additional.enabled.onePerIp
    }
    setadditional({ ...additional })
  }

  const enableCaptcha = e => {
    if (e.target.checked) {
      additional.enabled.captcha = true
    } else {
      delete additional.enabled.captcha
    }
    setadditional({ ...additional })
  }

  const setCaptchaTyp = e => {
    additional.settings.captcha = e.target.value
    setadditional({ ...additional })
  }

  const handleEntryLimit = e => {
    if (e.target.checked) {
      additional.enabled.entry_limit = true
    } else {
      delete additional.enabled.entry_limit
    }
    setadditional({ ...additional })
  }

  const handleIpStatus = (e, i, type) => {
    if (type === 'private') {
      additional.settings.private_ip[i].status = e.target.checked
      if (e.target.checked) {
        additional.enabled.private_ip = true
      } else if (additional.settings.private_ip.some(itm => itm.status === true)) {
        additional.enabled.private_ip = true
      } else if (!(additional.settings.private_ip.some(itm => itm.status === true))) {
        delete additional.enabled.private_ip
      }
    } else {
      additional.settings.blocked_ip[i].status = e.target.checked
      if (e.target.checked) {
        additional.enabled.blocked_ip = true
      } else if (additional.settings.blocked_ip.some(itm => itm.status === true)) {
        additional.enabled.private_ip = true
      } else if (!(additional.settings.blocked_ip.some(itm => itm.status === true))) {
        delete additional.enabled.blocked_ip
      }
    }
    setadditional({ ...additional })
  }

  const handleIp = (e, i, typ) => {
    if (typ === 'blocked') {
      additional.settings.blocked_ip[i].ip = e.target.value
    } else {
      additional.settings.private_ip[i].ip = e.target.value
    }
    setadditional({ ...additional })
  }

  const toggleAllIpStatus = e => {
    if (e.target.checked) {
      additional.enabled.blocked_ip = true
      for (let i = 0; i < additional.settings.blocked_ip.length; i += 1) {
        additional.settings.blocked_ip[i].status = true
      }
    } else {
      delete additional.enabled.blocked_ip
      for (let i = 0; i < additional.settings.blocked_ip.length; i += 1) {
        additional.settings.blocked_ip[i].status = false
      }
    }
    setadditional({ ...additional })
  }

  const toggleAllPvtIpStatus = e => {
    if (e.target.checked) {
      additional.enabled.private_ip = true
      for (let i = 0; i < additional.settings.private_ip.length; i += 1) {
        additional.settings.private_ip[i].status = true
      }
    } else {
      delete additional.enabled.private_ip
      for (let i = 0; i < additional.settings.private_ip.length; i += 1) {
        additional.settings.private_ip[i].status = false
      }
    }
    setadditional({ ...additional })
  }

  const handleRestrictFrom = e => {
    if (e.target.checked) {
      if (!('restrict_form' in additional.settings)) {
        additional.settings.restrict_form = { day: ['Everyday'], date: { from: new Date(), to: new Date() }, time: { from: '00:00', to: '23:59' } }
      }
      additional.enabled.restrict_form = true
    } else {
      delete additional.enabled.restrict_form
    }
    setadditional({ ...additional })
  }

  const checkAllDayInArr = arr => {
    let flg = false
    for (let i = 0; i < arr.length; i += 1) {
      if (arr.length === 7 && (arr[i] === 'Friday'
        || arr[i] === 'Saturday'
        || arr[i] === 'Sunday'
        || arr[i] === 'Monday'
        || arr[i] === 'Tuesday'
        || arr[i] === 'Wednesday'
        || arr[i] === 'Thursday')) {
        flg = true
      } else {
        flg = false
      }
    }
    return flg
  }

  const handleDate = (val, typ) => {
    const y = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(val)
    const m = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(val)
    const d = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(val)
    if (typ === 'from') {
      additional.settings.restrict_form.date.from = `${m}-${d}-${y}`
    } else {
      additional.settings.restrict_form.date.to = `${m}-${d}-${y}`
    }
    setadditional({ ...additional })
  }

  const handleTime = (val, typ) => {
    if (typ === 'from') {
      additional.settings.restrict_form.time.from = val
    } else {
      additional.settings.restrict_form.time.to = val
    }
    setadditional({ ...additional })
  }

  const setRestrictForm = e => {
    if (e.target.checked) {
      if ('day' in additional.settings.restrict_form) {
        if (e.target.value === 'Everyday' || checkAllDayInArr(additional.settings.restrict_form.day)) {
          additional.settings.restrict_form.day = ['Everyday']
        } else if (e.target.value === 'Custom') {
          additional.settings.restrict_form.day = ['Custom']
          additional.settings.restrict_form.date = { from: new Date(), to: new Date() }
        } else {
          if (additional.settings.restrict_form.day.indexOf('Custom') > -1) {
            const i = additional.settings.restrict_form.day.indexOf('Custom')
            additional.settings.restrict_form.day.splice(i, 1)
          }
          additional.settings.restrict_form.day.push(e.target.value)
        }
      } else {
        additional.settings.restrict_form.day = []
        if (e.target.value === 'Everyday' || checkAllDayInArr(additional.settings.restrict_form.day)) {
          additional.settings.restrict_form.day = ['Everyday']
        } else if (e.target.value === 'Custom') {
          additional.settings.restrict_form.day = ['Custom']
        } else {
          if (additional.settings.restrict_form.day.indexOf('Custom') > -1) {
            const i = additional.settings.restrict_form.day.indexOf('Custom')
            additional.settings.restrict_form.day.splice(i, 1)
          }
          additional.settings.restrict_form.day.push(e.target.value)
        }
      }
    } else {
      // eslint-disable-next-line no-lonely-if
      if (e.target.value === 'Everyday') {
        additional.settings.restrict_form.day = ['Friday']
      } else if (e.target.value === 'Custom') {
        additional.settings.restrict_form.day = ['Everyday']
      } else if (e.target.value !== 'Everyday' && e.target.value !== 'Custom' && additional.settings.restrict_form.day.indexOf('Everyday') > -1) {
        const days = ['Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday']
        days.splice(days.indexOf(e.target.value), 1)
        additional.settings.restrict_form.day = days
      } else {
        const i = additional.settings.restrict_form.day.indexOf(e.target.value)
        additional.settings.restrict_form.day.splice(i, 1)
      }
    }
    setadditional({ ...additional })
  }

  const checkRestrictFromExist = val => {
    if ('restrict_form' in additional.settings
      && 'day' in additional.settings.restrict_form
      && additional.settings.restrict_form.day.some(itm => (itm === val))) {
      return true
    }
    if ('restrict_form' in additional.settings
      && 'day' in additional.settings.restrict_form
      && additional.settings.restrict_form.day.some(itm => (itm === val || itm === 'Everyday'))
      && val !== 'Custom'
    ) {
      return true
    }
    return false
  }

  return (
    <div>
      <h2>Settings</h2>
      <div className="w-5">
        <div className="flx flx-between sh-sm br-10 btcd-setting-opt">
          <div>
            <b>
              <span className="btcd-icn icn-loop mr-2" />
              Enable Captcha
            </b>
          </div>
          <div className="flx">
            <select onChange={setCaptchaTyp} className="btcd-paper-inp mr-2 wdt-200" disabled={!('captcha' in additional.enabled)}>
              <option value="google_recaptcha">Google reCaptcha v1</option>
              <option value="google_recaptcha">Google reCaptcha v2</option>
            </select>
            <SingleToggle2 action={enableCaptcha} checked={'captcha' in additional.enabled} className="flx" />
          </div>
        </div>
      </div>

      <div className="w-5 mt-3">
        <div className="flx flx-between sh-sm br-10 btcd-setting-opt">
          <div>
            <b>
              <span className="btcd-icn icn-one mr-2" />
              Allow One Entry for each IP adress
            </b>
          </div>
          <SingleToggle2 action={setOnePerIp} checked={'onePerIp' in additional.enabled} className="flx" />
        </div>
      </div>

      <div className="w-5 mt-3">
        <div className="flx flx-between sh-sm br-10 btcd-setting-opt">
          <div className="">
            <b>
              <span className="btcd-icn icn-block mr-2" />
              Disable this form after limited entry
            </b>
          </div>
          <div className="flx">
            <input onChange={setEntryLimit} value={additional.settings.entry_limit} disabled={!('entry_limit' in additional.enabled)} className="btcd-paper-inp mr-2 wdt-200" placeholder="Limit" type="number" />
            <SingleToggle2 action={handleEntryLimit} checked={'entry_limit' in additional.enabled} className="flx" />
          </div>
        </div>
      </div>

      <Accordions
        customTitle={(
          <b>
            <span className="btcd-icn icn-date mr-2" />
            Restrict Form Period
          </b>
        )}
        cls="w-5 mt-3"
      >
        <div className="flx mb-2 ml-2">
          <SingleToggle2 cls="flx" action={handleRestrictFrom} checked={'restrict_form' in additional.enabled} />
          Enable / Disable
        </div>
        <CheckBox onChange={setRestrictForm} checked={checkRestrictFromExist('Everyday')} value="Everyday" title="Every Day" />
        <CheckBox onChange={setRestrictForm} checked={checkRestrictFromExist('Friday')} value="Friday" title="Friday" />
        <CheckBox onChange={setRestrictForm} checked={checkRestrictFromExist('Saturday')} value="Saturday" title="Saturday" />
        <CheckBox onChange={setRestrictForm} checked={checkRestrictFromExist('Sunday')} value="Sunday" title="Sunday" />
        <CheckBox onChange={setRestrictForm} checked={checkRestrictFromExist('Monday')} value="Monday" title="Monday" />
        <CheckBox onChange={setRestrictForm} checked={checkRestrictFromExist('Tuesday')} value="Tuesday" title="Tuesday" />
        <CheckBox onChange={setRestrictForm} checked={checkRestrictFromExist('Wednesday')} value="Wednesday" title="Wednesday" />
        <CheckBox onChange={setRestrictForm} checked={checkRestrictFromExist('Thursday')} value="Thursday" title="Thursday" />
        <br />
        <CheckBox onChange={setRestrictForm} checked={checkRestrictFromExist('Custom')} value="Custom" title="Custom Date" />
        {'restrict_form' in additional.settings && additional.settings.restrict_form.day.indexOf('Custom') > -1 && (

          <div className="flx">
            <span className="mt-2 ml-2">Date:</span>
            <div className="mr-2 ml-2">
              <div><small>From</small></div>
              <DatePicker
                onChange={val => handleDate(val, 'from')}
                value={new Date(additional.settings.restrict_form.date.from)}
                dayPlaceholder="dd"
                monthPlaceholder="mm"
                yearPlaceholder="year"
                className="btcd-date-pick"
                calendarClassName="btcd-date-pick-cln"
              />
            </div>
            <div>
              <div><small>To</small></div>
              <DatePicker
                onChange={val => handleDate(val, 'to')}
                value={new Date(additional.settings.restrict_form.date.to)}
                dayPlaceholder="dd"
                monthPlaceholder="mm"
                yearPlaceholder="year"
                className="btcd-date-pick"
                calendarClassName="btcd-date-pick-cln"
              />
            </div>
          </div>
        )}

        <div className="flx mt-2">
          <span className="mt-2 ml-2">Time:</span>
          <div className="mr-2 ml-2">
            <div><small>From</small></div>
            <TimePicker
              onChange={val => handleTime(val, 'from')}
              value={'restrict_form' in additional.settings && additional.settings.restrict_form.time.from}
            />
          </div>
          <div>
            <div><small>To</small></div>
            <TimePicker
              onChange={val => handleTime(val, 'to')}
              value={'restrict_form' in additional.settings && additional.settings.restrict_form.time.to}
              className="btcd-date-pick"
            />
          </div>
        </div>
      </Accordions>

      <Accordions
        customTitle={(
          <b>
            <span className="btcd-icn icn-r-block mr-2" />
            Blocked IP list
          </b>
        )}
        cls="w-5 mt-3"
      >
        {'blocked_ip' in additional.settings && additional.settings.blocked_ip.length > 0 && (
          <div className="flx mb-2">
            <SingleToggle2 cls="flx" action={toggleAllIpStatus} checked={'blocked_ip' in additional.enabled} />
            Enable / Disable
          </div>
        )}

        {'blocked_ip' in additional.settings && additional.settings.blocked_ip.map((itm, i) => (
          <div className="flx mt-1" key={`blk-ip-${i + 11}`}>
            <SingleToggle2 action={(e) => handleIpStatus(e, i)} checked={itm.status} />
            <input type="text" onChange={(e) => handleIp(e, i, 'blocked')} className="btcd-paper-inp" value={itm.ip} placeholder="000.0.0.00" />
            <button onClick={() => delBlkIp(i)} className="icn-btn ml-2" aria-label="delete" type="button"><span className="btcd-icn icn-trash-2" /></button>
          </div>
        ))}
        <div className="txt-center">
          <button onClick={addMoreBlockIp} className="icn-btn sh-sm mt-1" type="button">+</button>
        </div>
      </Accordions>

      <Accordions
        customTitle={(
          <b>
            <span className="btcd-icn icn-lock mr-2" />
              &nbsp;Allowed IP
          </b>
        )}
        cls="w-5 mt-3"
      >
        <div>
          <b>Note:</b>
          {' '}
          By enabling this option, this form will not appear in public anymore,
          only listed IP can access this form.
        </div>

        {'private_ip' in additional.settings && additional.settings.private_ip.length > 0 && (
          <div className="flx mb-2 mt-3">
            <SingleToggle2 cls="flx" action={toggleAllPvtIpStatus} checked={'private_ip' in additional.enabled} />
            Enable / Disable
          </div>
        )}

        {'private_ip' in additional.settings && additional.settings.private_ip.map((itm, i) => (
          <div className="flx mt-1" key={`blk-ip-${i + 11}`}>
            <SingleToggle2 action={(e) => handleIpStatus(e, i, 'private')} checked={itm.status} />
            <input type="text" onChange={(e) => handleIp(e, i, 'private')} className="btcd-paper-inp" value={itm.ip} placeholder="000.0.0.00" />
            <button onClick={() => delPrivateIp(i)} className="icn-btn ml-2" aria-label="delete" type="button"><span className="btcd-icn icn-trash-2" /></button>
          </div>
        ))}
        <div className="txt-center">
          <button onClick={addMorePrivateIp} className="icn-btn sh-sm mt-1" type="button">+</button>
        </div>
      </Accordions>
      <div className="mb-4 mt-4"><br /></div>
    </div>
  )
}
