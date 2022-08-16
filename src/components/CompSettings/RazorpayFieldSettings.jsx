/* eslint-disable no-param-reassign */
import produce from 'immer'
import { useContext, useState } from 'react'
import { useFela } from 'react-fela'
import { useParams } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { $fields } from '../../GlobalStates/GlobalStates'
import { $styles } from '../../GlobalStates/StylesState'
import TrashIcn from '../../Icons/TrashIcn'
import ut from '../../styles/2.utilities'
import FieldStyle from '../../styles/FieldStyle.style'
import { AppSettings } from '../../Utils/AppSettingsContext'
import { addToBuilderHistory } from '../../Utils/FormBuilderHelper'
import { deepCopy, sortArrOfObj } from '../../Utils/Helpers'
import { __ } from '../../Utils/i18nwrap'
import { razorpayCurrencyCodes } from '../../Utils/StaticData/razorpayData'
import CheckBox from '../Utilities/CheckBox'
import SelectBox2 from '../Utilities/SelectBox2'
import SingleInput from '../Utilities/SingleInput'
import SingleToggle from '../Utilities/SingleToggle'
import FieldSettingsDivider from './CompSettingsUtils/FieldSettingsDivider'
import SimpleAccordion from './StyleCustomize/ChildComp/SimpleAccordion'
import FieldSettingTitle from './StyleCustomize/FieldSettingTitle'

export default function RazorpayFieldSettings() {
  const { fieldKey: fldKey } = useParams()
  const [fields, setFields] = useRecoilState($fields)
  const [styles, setStyles] = useRecoilState($styles)
  const fieldData = deepCopy(fields[fldKey])
  const formFields = Object.entries(fields)
  const { payments } = useContext(AppSettings)
  const { css } = useFela()
  const [payNotes, setPayNotes] = useState([{}])
  const isSubscription = fieldData?.payType === 'subscription'
  const isDynamicAmount = fieldData.options.amountType === 'dynamic'

  const pos = [
    { name: __('Left'), value: 'left' },
    { name: __('Center'), value: 'center' },
    { name: __('Right'), value: 'right' },
  ]

  const btnTheme = [
    { name: __('Razorpay Dark'), value: 'dark' },
    { name: __('Razorpay Light'), value: 'light' },
    { name: __('Razorpay Outline'), value: 'outline' },
    { name: __('Brand Color'), value: 'brand' },
  ]

  const setPayIntegId = e => {
    fieldData.payIntegID = e.target.value

    // eslint-disable-next-line no-param-reassign
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory({ event: `Cofiguration changed to "${e.target.value}": ${fieldData.lbl || fldKey}`, type: 'set_configuration', state: { fields: allFields, fldKey } })
  }

  const handleInput = (name, value, type) => {
    if (type) {
      if (!fieldData.options[type]) fieldData.options[type] = {}
      if (value) {
        fieldData.options[type][name] = value
      } else {
        delete fieldData.options[type][name]
      }
    } else if (value) {
      fieldData.options[name] = value
    } else {
      delete fieldData.options[name]
    }

    if (type === 'invoice' && name === 'generate') {
      fieldData.options.invoice.itemName = 'Due Amount'
    }

    // eslint-disable-next-line no-param-reassign
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory({ event: `${propNameLabel[name]} to ${value}: ${fieldData.lbl || fldKey}`, type: `${name}_changed`, state: { fields: allFields, fldKey } })
  }

  const setAmountType = e => {
    if (e.target.value) fieldData.options.amountType = e.target.value
    else delete fieldData.options.amountType
    delete fieldData.options.amount
    delete fieldData.options.amountFld

    // eslint-disable-next-line no-param-reassign
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory({ event: `Amount Type changed to "${e.target.value}": ${fieldData.lbl || fldKey}`, type: 'set_amount_type', state: { fields: allFields, fldKey } })
  }

  const handleBtnStyle = ({ target: { name, value } }) => {
    fieldData[name] = value
    // eslint-disable-next-line no-param-reassign
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    let newStyles = styles
    if (name === 'align') {
      newStyles = produce(styles, drft => {
        drft.fields[fldKey].classes[`.${fldKey}-razorpay-wrp`]['justify-content'] = value
      })
      setStyles(newStyles)
    }
    addToBuilderHistory({ event: `Button Style changed to "${value}": ${fieldData.lbl || fldKey}`, type: 'set_button_style', state: { fields: allFields, styles: newStyles, fldKey } })
  }

  const setFulW = (e) => {
    fieldData.fulW = e.target.checked
    // eslint-disable-next-line no-param-reassign
    const newStyles = produce(styles, drft => {
      if (e.target.checked) {
        drft.fields[fldKey].classes[`.${fldKey}-razorpay-btn`].width = '100%'
        delete drft.fields[fldKey].classes[`.${fldKey}-razorpay-btn`]['min-width']
      } else {
        drft.fields[fldKey].classes[`.${fldKey}-razorpay-btn`]['min-width'] = '160px'
        delete drft.fields[fldKey].classes[`.${fldKey}-razorpay-btn`].width
      }
    })
    setStyles(newStyles)
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory({ event: `Full Width "${e.target.checked ? 'On' : 'Off'}": ${fieldData.lbl || fldKey}`, type: 'set_button_width', state: { fields: allFields, styles: newStyles, fldKey } })
  }

  const setSubTitl = (e) => {
    fieldData.subTitl = e.target.checked
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory({ event: `Subtitle "${e.target.checked ? 'On' : 'Off'}": ${fieldData.lbl || fldKey}`, type: 'set_sub_title', state: { fields: allFields, fldKey } })
  }

  const setBtnSiz = e => {
    if (e.target.checked) {
      fieldData.btnSiz = 'sm'
    } else {
      fieldData.btnSiz = 'md'
    }
    // eslint-disable-next-line no-param-reassign
    setFields(allFields => produce(allFields, draft => { draft[fldKey] = fieldData }))
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
    const noteObj = {}

    let i = -1
    const { length } = payNotes
    // eslint-disable-next-line no-plusplus
    while (++i < length) {
      if (notes[i]?.key && notes[i]?.value) {
        noteObj[notes[i].key] = notes[i].value
      }
    }

    fieldData.options.notes = noteObj
    // eslint-disable-next-line no-param-reassign
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory({ event: `Notes Changes: ${fieldData.lbl || fldKey}`, type: 'set_notes', state: { fields: allFields, fldKey } })
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
    const razorpayConfigs = payments.filter(pay => pay.type === 'Razorpay')
    return razorpayConfigs.map(razor => (
      <option key={razor.id} value={razor.id}>{razor.name}</option>
    ))
  }

  return (
    <div>
      <FieldSettingTitle
        title="Field Settings"
        subtitle={fieldData.typ}
        fieldKey={fldKey}
      />

      <div className={css(ut.ml2, ut.mr2, ut.mt2, ut.p1)}>
        <b>{__('Select Config')}</b>
        <br />
        <select
          data-testid="slct-cnfg-slct"
          name="payIntegID"
          id="payIntegID"
          onChange={setPayIntegId}
          className={css(FieldStyle.input)}
          value={fieldData.payIntegID}
        >
          <option value="">Select Config</option>
          {getRazorpayConfigs()}
        </select>
      </div>

      {/* <div className="mt-2">
        <SingleToggle title={__('Subscription:')} action={setSubscription} isChecked={isSubscription} className="mt-3" />
        {isSubscription && <SingleInput inpType="text" title={__('Plan Id')} value={fieldData.planId || ''} action={e => handleInput('planId', e.target.value)} />}
      </div> */}

      {fieldData?.payIntegID && (
        <>
          {!isSubscription && (
            <>
              <div>
                <div className={css(ut.ml2, ut.p1)}>
                  <b>{__('Amount Type')}</b>
                  <br />
                  <CheckBox id="amnt-typ-fxd" onChange={setAmountType} radio checked={!isDynamicAmount} title={__('Fixed')} />
                  <CheckBox id="amnt-typ-dynmc" onChange={setAmountType} radio checked={isDynamicAmount} title={__('Dynamic')} value="dynamic" />
                </div>
                {!isDynamicAmount && (
                  <div className={css(ut.ml2, ut.mr2, ut.p1)}>
                    <SingleInput
                      id="amnt"
                      inpType="number"
                      title={__('Amount')}
                      value={fieldData.options.amount || ''}
                      action={e => handleInput('amount', e.target.value)}
                      cls={css(FieldStyle.input)}
                    />
                  </div>
                )}
                {isDynamicAmount && (
                  <div className={css(ut.ml2, ut.mr2, ut.p1)}>
                    <b>{__('Select Amount Field')}</b>
                    <select
                      data-testid="slct-amnt-fld-slct"
                      onChange={e => handleInput(e.target.name, e.target.value)}
                      name="amountFld"
                      className={css(FieldStyle.input)}
                      value={fieldData.options.amountFld}
                    >
                      <option value="">{__('Select Field')}</option>
                      {getSpecifiedFields('amount')}
                    </select>
                  </div>
                )}
              </div>
              <div className={css(ut.ml2, ut.mr2, ut.p1)}>
                <label htmlFor="recap-thm">
                  <b>{__('Currency')}</b>
                  <select
                    data-testid="crncy-slct"
                    onChange={e => handleInput(e.target.name, e.target.value)}
                    name="currency"
                    value={fieldData.options.currency}
                    className={css(FieldStyle.input)}
                  >
                    {sortArrOfObj(razorpayCurrencyCodes, 'currency').map(itm => (
                      <option key={itm.currency} value={itm.code}>
                        {`${itm.currency} - ${itm.code}`}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <div className={css(ut.ml2, ut.mr2, ut.p1)}>
                <b>{__('Account Name')}</b>
                <br />
                <input
                  data-testid="acnt-nam-inp"
                  aria-label="Account Name"
                  type="text"
                  className={css(FieldStyle.input)}
                  placeholder="Account Name"
                  name="name"
                  value={fieldData.options.name || ''}
                  onChange={e => handleInput(e.target.name, e.target.value)}
                />
              </div>
              <div className={css(ut.ml2, ut.mr2, ut.p1)}>
                <b>{__('Description')}</b>
                <br />
                <textarea
                  data-testid="dscrptn-txt-ara"
                  className={css(FieldStyle.input)}
                  placeholder="Order Description"
                  name="description"
                  rows="5"
                  value={fieldData.options.description || ''}
                  onChange={e => handleInput(e.target.name, e.target.value)}
                />
              </div>
            </>
          )}
          <FieldSettingsDivider />
          <SimpleAccordion
            id="adtnl-stng"
            title="Additional Settings"
            className={css(FieldStyle.fieldSection)}
          >
            <SimpleAccordion
              id="adtnl-stng-btn"
              title="Button"
              className={css(FieldStyle.fieldSection)}
            >
              <SingleInput
                id="btn-txt"
                inpType="text"
                title={__('Button Text')}
                value={fieldData.btnTxt || ''}
                name="btnTxt"
                action={handleBtnStyle}
                className={css(ut.mt0, { pr: 1 })}
                cls={css(FieldStyle.input)}
              />
              <SelectBox2
                id="btn-algn"
                className={css({ pr: 1 })}
                title={__('Button Align:')}
                options={pos}
                value={fieldData.align}
                action={handleBtnStyle}
                name="align"
                cls={css(FieldStyle.input)}
              />
              <SingleToggle
                id="btn-txt"
                title={__('Full Width Button:')}
                action={setFulW}
                isChecked={fieldData.fulW}
                className="mt-5"
              />
              <SingleToggle
                id="sub-titl"
                title={__('Sub Title:')}
                action={setSubTitl}
                isChecked={fieldData?.subTitl}
                className="mt-5"
              />
              {/* <SingleToggle
                title={__('Small Button:')}
                action={setBtnSiz}
                isChecked={fieldData.btnSiz === 'sm'}
                className="mt-5"
              /> */}
            </SimpleAccordion>
            <div className="btcd-hr" />

            <SimpleAccordion id="thm-stng" title="Theme" className={css(FieldStyle.fieldSection)}>
              <div className={css(ut.flxcb, ut.mt2)}>
                <b>{__('Theme Color:')}</b>
                <input
                  data-testid="thm-clr-inp"
                  aria-label="Theme color"
                  className="ml-2"
                  type="color"
                  value={fieldData.options.theme.color}
                  onChange={e => handleInput('color', e.target.value, 'theme')}
                />
              </div>
              <div className={css(ut.flxcb, ut.mt2)}>
                <b>{__('Background Color:')}</b>
                <input
                  data-testid="bg-clr-inp"
                  aria-label="Background color"
                  className="ml-2"
                  type="color"
                  value={fieldData.options.theme.backdrop_color}
                  onChange={e => handleInput('backdrop_color', e.target.value, 'theme')}
                />
              </div>
            </SimpleAccordion>
            <div className="btcd-hr" />

            <SimpleAccordion id="mdl-stng" title="Modal" className={css(FieldStyle.fieldSection)}>
              <SingleToggle
                id="cnfrm-cls"
                className={css(ut.mt2)}
                title={__('Confirm on Close:')}
                action={e => handleInput('confirm_close', e.target.checked, 'modal')}
                isChecked={fieldData.options.modal.confirm_close}
              />
            </SimpleAccordion>
            <div className="btcd-hr" />

            <SimpleAccordion id="prfil-stng" title="Prefill" className={css(FieldStyle.fieldSection)}>
              <div>
                <div className={css(ut.mt2, { px: 1 })}>
                  <b>{__('Name :')}</b>
                  <select
                    data-testid="prfil-nam-slct"
                    onChange={e => handleInput(e.target.name, e.target.value, 'prefill')}
                    name="prefillNameFld"
                    className={css(FieldStyle.input)}
                    value={fieldData.options.prefill.prefillNameFld}
                  >
                    <option value="">{__('Select Field')}</option>
                    {getSpecifiedFields('desc')}
                  </select>
                </div>
                <div className={css(ut.mt2, { px: 1 })}>
                  <b>{__('Email :')}</b>
                  <select
                    data-testid="prfil-eml-slct"
                    onChange={e => handleInput(e.target.name, e.target.value, 'prefill')}
                    name="prefillEmailFld"
                    className={css(FieldStyle.input)}
                    value={fieldData.options.prefill.prefillEmailFld}
                  >
                    <option value="">{__('Select Field')}</option>
                    {getSpecifiedFields('email')}
                  </select>
                </div>
                <div className={css(ut.mt2, { px: 1 })}>
                  <b>{__('Contact :')}</b>
                  <select
                    data-testid="prfil-cntct-slct"
                    onChange={e => handleInput(e.target.name, e.target.value, 'prefill')}
                    name="prefillContactFld"
                    className={css(FieldStyle.input)}
                    value={fieldData.options.prefill.prefillContactFld}
                  >
                    <option value="">{__('Select Field')}</option>
                    {getSpecifiedFields('number')}
                  </select>
                </div>
              </div>
            </SimpleAccordion>
            <div className="btcd-hr" />

            <SimpleAccordion
              id="nots-stng"
              title="Notes"
              className={css(FieldStyle.fieldSection)}
            >
              <div className="flx">
                <div className="w-10"><b>{__('Key :')}</b></div>
                <div className="w-10"><b>{__('Value :')}</b></div>
              </div>
              {payNotes.map((notes, indx) => (
                <div className="flx" key={`rp${indx * 2}`}>
                  <div className={css({ pl: 2 })}>
                    <input
                      data-testid="nots-key-inp"
                      aria-label="Note key"
                      className={css(FieldStyle.input, { pr: 1 })}
                      type="text"
                      value={notes.key}
                      onChange={e => handleNotes('edit', indx, 'key', e.target.value)}
                    />
                  </div>
                  <div className="ml-1">
                    <input
                      data-testid="nots-val-inp"
                      aria-label="Note value"
                      className={css(FieldStyle.input)}
                      type="text"
                      value={notes.value}
                      onChange={e => handleNotes('edit', indx, 'value', e.target.value)}
                    />
                  </div>
                  <button
                    data-testid="nots-del-btn"
                    className="icn-btn ml-1 mt-3"
                    type="button"
                    aria-label="btn"
                    onClick={() => handleNotes('delete', indx)}
                  >
                    <TrashIcn />
                  </button>
                </div>
              ))}
              <div className="txt-center mt-2">
                <button
                  data-testid="nots-ad-btn"
                  className="icn-btn"
                  type="button"
                  onClick={() => handleNotes('add')}
                >
                  +
                </button>

              </div>
            </SimpleAccordion>
            {/* <div className="btcd-hr" /> */}
            {/* invoice */}
            {/* <SimpleAccordion title="Invoice" className={css(FieldStyle.fieldSection)}>
              <SingleToggle title={__('Generate Invoice')} action={e => handleInput('generate', e.target.checked, 'invoice')} isChecked={fieldData.options?.invoice?.generate} />
              <SingleInput inpType="text" title={__('Item Name')} value={fieldData.options?.invoice?.itemName || ''} name="btnTxt" action={e => handleInput('itemName', e.target.value, 'invoice')} className="mt-3" />
              <SingleToggle title={__('Send SMS to customer')} action={e => handleInput('sendSMS', e.target.checked, 'invoice')} isChecked={fieldData.options?.invoice?.sendSMS} className="mt-3" />
              <SingleToggle title={__('Send Email to customer')} action={e => handleInput('sendEmail', e.target.checked, 'invoice')} isChecked={fieldData.options?.invoice?.sendEmail} className="mt-3" />
            </SimpleAccordion>
            <div className="btcd-hr" /> */}
          </SimpleAccordion>
          <FieldSettingsDivider />
        </>
      )}

    </div>
  )
}

const propNameLabel = {
  amount: 'Amount changed',
  amountFld: 'Amount Field Selected',
  currency: 'Currency Selected',
  name: 'Account Name Modifyed',
  description: 'Description Changed',
  color: 'Color changed',
  backdrop_color: 'Backdrop Color changed',
  confirm_close: 'Confirm on close',
  prefillNameFld: 'Profile Name Selected',
  prefillEmailFld: 'Profile Email Selected',
  prefillContactFld: 'Profile Contact Field',
}
