// eslint-disable-next-line import/no-extraneous-dependencies
import { __ } from '@wordpress/i18n';
import { useContext, useState } from 'react';
import { AppSettings } from '../../Utils/AppSettingsContext';
import { sortArrOfObj } from '../../Utils/Helpers';
import { razorpayCurrencyCodes } from '../../Utils/StaticData/razorpayData';
import CheckBox from '../ElmSettings/Childs/CheckBox';
import SelectBox2 from '../ElmSettings/Childs/SelectBox2';
import SingleInput from '../ElmSettings/Childs/SingleInput';
import SingleToggle from '../ElmSettings/Childs/SingleToggle';
import Back2FldList from './Back2FldList';
import StyleAccordion from './StyleCustomize/ChildComp/StyleAccordion';

export default function RazorpaySettings({ elm, fields, updateData, setElementSetting }) {
  const { payments } = useContext(AppSettings)
  const formFields = Object.entries(fields)
  const [payNotes, setPayNotes] = useState([{}])
  const isSubscription = elm.data?.payType === 'subscription'
  const isDynamicAmount = elm.data.options.amountType === 'dynamic'

  const pos = [
    { name: __('Left', 'bitform'), value: 'left' },
    { name: __('Center', 'bitform'), value: 'center' },
    { name: __('Right', 'bitform'), value: 'right' },
  ]

  const handleInput = (name, value, type) => {
    const tmp = { ...elm }
    if (type) {
      if (value) {
        tmp.data.options[type][name] = value
      } else {
        delete tmp.data.options[type][name]
      }
    } else if (value) {
      tmp.data.options[name] = value
    } else {
      delete tmp.data.options[name]
    }

    updateData(tmp)
  }

  const setAmountType = e => {
    const tmp = { ...elm }
    if (e.target.value) tmp.data.options.amountType = e.target.value
    else delete tmp.data.options.amountType
    delete tmp.data.options.amount
    delete tmp.data.options.amountFld

    updateData(tmp)
  }

  const handleBtnStyle = e => {
    const tmp = { ...elm }
    tmp.data[e.target.name] = e.target.value
    updateData(tmp)
  }

  const setFulW = e => {
    const tmp = { ...elm }
    tmp.data.fulW = e.target.checked
    updateData(tmp)
  }

  const setBtnSiz = e => {
    const tmp = { ...elm }
    if (e.target.checked) {
      tmp.data.btnSiz = 'sm'
    } else {
      tmp.data.btnSiz = 'md'
    }
    updateData(tmp)
  }

  const handleNotes = (action, i, type, val) => {
    const tmpNotes = [...payNotes]
    if (action === 'add') {
      tmpNotes.push({})
      setPayNotes(tmpNotes)
      return mapNotesToElmData(tmpNotes)
    }

    if (action === 'delete') {
      tmpNotes.splice(i, 1)
      setPayNotes(tmpNotes)
      return mapNotesToElmData(tmpNotes)
    }

    tmpNotes[i][type] = val
    setPayNotes(tmpNotes)
    mapNotesToElmData(tmpNotes)
  }

  const mapNotesToElmData = notes => {
    const tmp = { ...elm }
    const noteObj = {}

    let i = -1
    const { length } = payNotes
    // eslint-disable-next-line no-plusplus
    while (++i < length) {
      if (notes[i]?.key && notes[i]?.value) {
        noteObj[notes[i].key] = notes[i].value
      }
    }

    tmp.data.options.notes = noteObj
    updateData(tmp)
  }

  const getSpecifiedFields = type => {
    let pattern
    if (type === 'amount') {
      pattern = /number|radio/g
    } else if (type === 'desc') {
      pattern = /text/g
    } else if (type === 'email') {
      pattern = /text|email/g
    } else if (type === 'number') {
      pattern = /number/g
    }
    const filteredFields = formFields.filter(field => field[1].typ.match(pattern))
    return filteredFields.map(itm => (<option key={itm[0]} value={itm[0]}>{itm[1].adminLbl || itm[1].lbl}</option>))
  }

  const getRazorpayConfigs = () => {
    const razorpayConfigs = payments.filter(pay => pay.type === 'razorpay')
    return razorpayConfigs.map(razor => (
      <option key={razor.id} value={razor.id}>{razor.name}</option>
    ))
  }

  return (
    <div className="ml-2 mr-4">
      <Back2FldList setElementSetting={setElementSetting} />
      <div className="mb-2">
        <span className="font-w-m">{__('Field Type : ', 'bitform')}</span>
        {__('Razor Pay', 'bitform')}
      </div>

      <div className="mt-3">
        <b>{__('Select Config', 'bitform')}</b>
        <br />
        <select name="payIntegID" id="payIntegID" onChange={e => handleInput(e.target.name, e.target.value)} className="btcd-paper-inp mt-1" value={elm.data.options.payIntegID}>
          <option value="">Select Config</option>
          {getRazorpayConfigs()}
        </select>
      </div>

      {/* <div className="mt-2">
        <SingleToggle title={__('Subscription:', 'bitform')} action={setSubscription} isChecked={isSubscription} className="mt-3" />
        {isSubscription && <SingleInput inpType="text" title={__('Plan Id', 'bitform')} value={elm.data.planId || ''} action={e => handleInput('planId', e.target.value)} />}
      </div> */}

      {!isSubscription && (
        <>
          <div>
            <div className="mt-2">
              <b>{__('Amount Type', 'bitform')}</b>
              <br />
              <CheckBox onChange={setAmountType} radio checked={!isDynamicAmount} title={__('Fixed', 'bitform')} />
              <CheckBox onChange={setAmountType} radio checked={isDynamicAmount} title={__('Dynamic', 'bitform')} value="dynamic" />
            </div>
            {!isDynamicAmount && <SingleInput inpType="number" title={__('Amount', 'bitform')} value={elm.data.options.amount || ''} action={e => handleInput('amount', e.target.value)} />}
            {isDynamicAmount && (
              <div className="mt-3">
                <b>{__('Select Amount Field', 'bitform')}</b>
                <select onChange={e => handleInput(e.target.name, e.target.value)} name="amountFld" className="btcd-paper-inp mt-1" value={elm.data.options.amountFld}>
                  <option value="">{__('Select Field', 'bitform')}</option>
                  {getSpecifiedFields('amount')}
                </select>
              </div>
            )}
          </div>
          <div className="mt-2">
            <label htmlFor="recap-thm">
              <b>{__('Currency', 'bitform')}</b>
              <select onChange={e => handleInput(e.target.name, e.target.value)} name="currency" value={elm.data.options.currency} className="btcd-paper-inp mt-1">
                {sortArrOfObj(razorpayCurrencyCodes, 'currency').map(itm => (
                  <option key={itm.currency} value={itm.code}>
                    {`${itm.currency} - ${itm.code}`}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="mt-2">
            <b>{__('Account Name', 'bitform')}</b>
            <br />
            <input type="text" className="mt-1 btcd-paper-inp" placeholder="Account Name" name="name" value={elm.data.options.name || ''} onChange={e => handleInput(e.target.name, e.target.value)} />
          </div>
          <div className="mt-2">
            <b>{__('Description', 'bitform')}</b>
            <br />
            <textarea className="mt-1 btcd-paper-inp" placeholder="Order Description" name="description" rows="5" value={elm.data.options.description || ''} onChange={e => handleInput(e.target.name, e.target.value)} />
          </div>
        </>
      )}

      <StyleAccordion title="Additional Settings" className="style-acc">
        <StyleAccordion title="Button" className="style-acc">
          <SingleInput inpType="text" title={__('Button Text', 'bitform')} value={elm.data.btnTxt || ''} name="btnTxt" action={handleBtnStyle} className="mt-0" />
          <SelectBox2 title={__('Button Align:', 'bitform')} options={pos} value={elm.data.align} action={handleBtnStyle} name="align" />
          <SingleToggle title={__('Full Width Button:', 'bitform')} action={setFulW} isChecked={elm.data.fulW} className="mt-5" />
          <SingleToggle title={__('Small Button:', 'bitform')} action={setBtnSiz} isChecked={elm.data.btnSiz === 'sm'} className="mt-5" />
        </StyleAccordion>
        <div className="btcd-hr" />

        <StyleAccordion title="Theme" className="style-acc">
          <div>
            <b>{__('Theme Color:', 'bitform')}</b>
            <input className="ml-2" type="color" value={elm.data.options.theme.color} onChange={e => handleInput('color', e.target.value, 'theme')} />
          </div>
          <div className="mt-2">
            <b>{__('Background Color:', 'bitform')}</b>
            <input className="ml-2" type="color" value={elm.data.options.theme.backdrop_color} onChange={e => handleInput('backdrop_color', e.target.value, 'theme')} />
          </div>
        </StyleAccordion>
        <div className="btcd-hr" />

        <StyleAccordion title="Modal" className="style-acc">
          <SingleToggle title={__('Confirm on Close:', 'bitform')} action={e => handleInput('confirm_close', e.target.checked, 'modal')} isChecked={elm.data.options.modal.confirm_close} />
        </StyleAccordion>
        <div className="btcd-hr" />

        <StyleAccordion title="Prefill" className="style-acc">
          <div className="mt-2">
            <b>{__('Name :', 'bitform')}</b>
            <select onChange={e => handleInput(e.target.name, e.target.value, 'prefill')} name="prefillNameFld" className="btcd-paper-inp mt-1" value={elm.data.options.prefill.prefillNameFld}>
              <option value="">{__('Select Field', 'bitform')}</option>
              {getSpecifiedFields('desc')}
            </select>
          </div>
          <div className="mt-2">
            <b>{__('Email :', 'bitform')}</b>
            <select onChange={e => handleInput(e.target.name, e.target.value, 'prefill')} name="prefillEmailFld" className="btcd-paper-inp mt-1" value={elm.data.options.prefill.prefillEmailFld}>
              <option value="">{__('Select Field', 'bitform')}</option>
              {getSpecifiedFields('email')}
            </select>
          </div>
          <div className="mt-2">
            <b>{__('Contact :', 'bitform')}</b>
            <select onChange={e => handleInput(e.target.name, e.target.value, 'prefill')} name="prefillContactFld" className="btcd-paper-inp mt-1" value={elm.data.options.prefill.prefillContactFld}>
              <option value="">{__('Select Field', 'bitform')}</option>
              {getSpecifiedFields('number')}
            </select>
          </div>
        </StyleAccordion>
        <div className="btcd-hr" />

        <StyleAccordion title="Notes" className="style-acc">
          <div className="flx">
            <div className="w-10"><b>{__('Key :', 'bitform')}</b></div>
            <div className="w-10"><b>{__('Value :', 'bitform')}</b></div>
          </div>
          {payNotes.map((notes, indx) => (
            <div className="flx" key={indx}>
              <div>
                <input className="btcd-paper-inp mt-1" type="text" value={notes.key} onChange={e => handleNotes('edit', indx, 'key', e.target.value)} />
              </div>
              <div className="ml-1">
                <input className="btcd-paper-inp mt-1" type="text" value={notes.value} onChange={e => handleNotes('edit', indx, 'value', e.target.value)} />
              </div>
              <button className="icn-btn ml-1 mt-3" type="button" aria-label="btn" onClick={() => handleNotes('delete', indx)}>
                <span className="btcd-icn icn-trash-2" />
              </button>
            </div>
          ))}
          <div className="txt-center mt-2"><button className="icn-btn" type="button" onClick={() => handleNotes('add')}>+</button></div>
        </StyleAccordion>
        <div className="btcd-hr" />

      </StyleAccordion>

    </div>
  )
}
