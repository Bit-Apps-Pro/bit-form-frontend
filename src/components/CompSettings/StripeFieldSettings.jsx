import { produce } from 'immer'
import { useContext, useEffect } from 'react'
import { useFela } from 'react-fela'
import MultiSelect from 'react-multiple-select-dropdown-lite'
import { useParams } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { $fields } from '../../GlobalStates/GlobalStates'
import { AppSettings } from '../../Utils/AppSettingsContext'
import { addFormUpdateError, addToBuilderHistory, deleteNestedObj, removeFormUpdateError } from '../../Utils/FormBuilderHelper'
import { deepCopy } from '../../Utils/Helpers'
import { currencyCodes, layouts, themes, localeCodes, paymentMethodType } from '../../Utils/StaticData/StripeData'
import { __ } from '../../Utils/i18nwrap'
import ut from '../../styles/2.utilities'
import FieldStyle from '../../styles/FieldStyle.style'
import CheckBox from '../Utilities/CheckBox'
import SingleInput from '../Utilities/SingleInput'
import { assignNestedObj } from '../style-new/styleHelpers'
import FieldHideSettings from './CompSettingsUtils/FieldHideSettings'
import FieldSettingsDivider from './CompSettingsUtils/FieldSettingsDivider'
import SimpleAccordion from './StyleCustomize/ChildComp/SimpleAccordion'
import FieldSettingTitle from './StyleCustomize/FieldSettingTitle'
import Cooltip from '../Utilities/Cooltip'
import RenderHtml from '../Utilities/RenderHtml'
import tippyHelperMsg from '../../Utils/StaticData/tippyHelperMsg'
import AutoResizeInput from './CompSettingsUtils/AutoResizeInput'

export default function StripeFieldSettings() {
  const { fieldKey: fldKey } = useParams()
  const [fields, setFields] = useRecoilState($fields)
  const fieldData = deepCopy(fields[fldKey])
  const formFields = Object.entries(fields)
  const { payments } = useContext(AppSettings)
  const isSubscription = fieldData?.payType === 'subscription'
  // const isDynamicDesc = fieldData?.descType === 'dynamic'
  const isDynamicAmount = fieldData.config?.amountType === 'dynamic'
  // const isDynamicShipping = fieldData?.shippingType === 'dynamic'
  // const isDynamicTax = fieldData?.taxType === 'dynamic'
  // const [filterCurrency, setFilterCurrency] = useState(currencyCodes)
  let filterCurrency = currencyCodes
  console.log('fieldData', fieldData)
  const { css } = useFela()
  useEffect(() => {
    removeFormUpdateError(fldKey, 'stripeAmountFldMissing')
    removeFormUpdateError(fldKey, 'paypalAmountMissing')
    console.log(isDynamicAmount, 'amountfield', fieldData.config.amountFld)
    if (isDynamicAmount && !fieldData.config.amountFld) {
      addFormUpdateError({
        fieldKey: fldKey,
        errorKey: 'stripeAmountFldMissing',
        errorMsg: __('Stripe Dyanmic Amount Field is not Selected'),
        errorUrl: `field-settings/${fldKey}`,
      })
    } else if (!isDynamicAmount && (!fieldData.config.amount || fieldData.config.amount <= 0)) {
      addFormUpdateError({
        fieldKey: fldKey,
        errorKey: 'paypalAmountMissing',
        errorMsg: __('PayPal Fixed Amount is not valid'),
        errorUrl: `field-settings/${fldKey}`,
      })
    }
  }, [fieldData?.config?.amountType, fieldData?.config?.amount])

  const handleInput = (name, value) => {
    if (value) {
      // fieldData[name] = value
      assignNestedObj(fieldData, name, value)
      // if (name === 'locale') {
      //   const localeArr = value.split(' - ')
      //   fieldData.locale = localeArr[localeArr.length - 1]
      //   fieldData.locale = value
      //   fieldData.language = value
      // }
    } else {
      deleteNestedObj(fieldData, name)
      // delete fieldData[name]
    }
    // eslint-disable-next-line no-param-reassign
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory({ event: `${propNameLabel[name]} to ${value}: ${fieldData.lbl || fldKey}`, type: `${name}_changed`, state: { fields: allFields, fldKey } })
  }
  function findCommonItems(types) {
    if (!types || types.length === 0) return []
    const cntris = paymentMethodType.filter(item => types.includes(item.type))
    const arrays = cntris.map(item => item.currency)
    const codes = arrays?.reduce((a, b) => a.filter(c => b.includes(c)))
    const currencies = currencyCodes.filter(item => codes.includes(item.code))
    return currencies || []
  }
  const handlePaymentMethodType = (val) => {
    if (val) {
      const valArr = val.split(',')
      console.log({ valArr })
      assignNestedObj(fieldData, 'config->options->payment_method_types', valArr)
      filterCurrency = findCommonItems(fieldData?.config?.options?.payment_method_types)
    } else {
      deleteNestedObj(fieldData, 'config->options->payment_method_types')
    }
    console.log({ fieldData })
  }

  // useEffect(() => {
  //   const filterCurrencies = findCommonItems(fieldData?.config?.options?.payment_method_types)
  //   console.log('filterCurrencies', filterCurrencies)
  //   setFilterCurrency(filterCurrencies)
  // }, [fieldData?.config?.options?.payment_method_types])

  const handleLayout = (value) => {
    if (value) {
      fieldData.config.layout = layouts[value]
    } else {
      delete fieldData.config.layout
    }
    // eslint-disable-next-line no-param-reassign
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory({ event: `${propNameLabel.layout} to ${value}: ${fieldData.lbl || fldKey}`, type: `${name}_changed`, state: { fields: allFields, fldKey } })
  }
  const handleTheme = (value) => {
    if (value) {
      fieldData.config.theme.name = value
      fieldData.config.theme.style = themes[value]
    } else {
      delete fieldData.config.theme
    }
    // eslint-disable-next-line no-param-reassign
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory({ event: `${propNameLabel.layout} to ${value}: ${fieldData.lbl || fldKey}`, type: `${name}_changed`, state: { fields: allFields, fldKey } })
  }
  // console.log('fieldData', fieldData)
  // const setSubscription = e => {
  //   if (e.target.checked) {
  //     fieldData.payType = 'subscription'
  //     delete fieldData.currency
  //     removeFormUpdateError(fldKey, 'paypalAmountMissing')
  //   } else {
  //     fieldData.currency = 'USD'
  //     delete fieldData.payType
  //     delete fieldData.planId
  //     addFormUpdateError({
  //       fieldKey: fldKey,
  //       errorKey: 'paypalAmountMissing',
  //       errorMsg: __('PayPal Fixed Amount is not valid'),
  //       errorUrl: `field-settings/${fldKey}`,
  //     })
  //   }
  //   delete fieldData.amountType
  //   delete fieldData.amount
  //   delete fieldData.amountFld

  //   // eslint-disable-next-line no-param-reassign
  //   const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
  //   setFields(allFields)
  //   addToBuilderHistory({ event: `Subscription "${e.target.checked ? 'On' : 'Off'}": ${fieldData.lbl || fldKey}`, type: 'toggle_subscription', state: { fields: allFields, fldKey } })
  // }

  const setAmountType = e => {
    if (e.target.value) fieldData.config.amountType = e.target.value
    else delete fieldData.config.amountType
    delete fieldData.config.amount
    // delete fieldData.config.amountFld

    // eslint-disable-next-line no-param-reassign
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory({ event: `Ammount Type Changed to "${e.target.value}": ${fieldData.lbl || fldKey}`, type: 'set_amount', state: { fields: allFields, fldKey } })
  }

  const setShippingType = e => {
    if (e.target.value) fieldData.shippingType = e.target.value
    else delete fieldData.shippingType
    delete fieldData.shipping
    delete fieldData.shippingFld

    // eslint-disable-next-line no-param-reassign
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory({ event: `Shipping Type changed to "${e.target.value}": ${fieldData.lbl || fldKey}`, type: 'set_shipping_type', state: { fields: allFields, fldKey } })
  }

  const setTaxType = e => {
    if (e.target.value) fieldData.taxType = e.target.value
    else delete fieldData.taxType
    delete fieldData.tax
    delete fieldData.taxFld

    // eslint-disable-next-line no-param-reassign
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory({ event: `Tax type changed to "${e.target.value}": ${fieldData.lbl || fldKey}`, type: 'set_tax_type', state: { fields: allFields, fldKey } })
  }

  const setDescType = e => {
    if (e.target.value) fieldData.descType = e.target.value
    else delete fieldData.descType
    delete fieldData.description
    delete fieldData.descFld

    // eslint-disable-next-line no-param-reassign
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory({ event: `Description type to "${e.target.value}": ${fieldData.lbl || fldKey}`, type: 'set_description_type', state: { fields: allFields, fldKey } })
  }

  const getAmountFields = () => {
    const filteredFields = formFields.filter(field => field[1].typ.match(/^(radio|number|currency)/))
    return filteredFields.map(itm => (<option key={itm[0]} value={itm[0]}>{itm[1].adminLbl || itm[1].lbl}</option>))
  }

  const getDescFields = () => {
    const filteredFields = formFields.filter(field => field[1].typ.match(/text/g))
    return filteredFields.map(itm => (<option key={itm[0]} value={itm[0]}>{itm[1].adminLbl || itm[1].lbl}</option>))
  }

  const localeCodeOptions = () => localeCodes.map(locale => ({
    label: (
      <div className="flx flx-between">
        <span className="btcd-ttl-ellipsis">{locale.region}</span>
        <code className="btcd-code">{locale.code}</code>
      </div>
    ),
    title: `${locale.region} - ${locale.code}`,
    value: locale.code,
  }))

  const getStripeConfigs = () => {
    const stripeConfigs = payments.filter(pay => pay.type === 'Stripe')
    return stripeConfigs.map(stripe => (
      <option key={stripe.id} value={stripe.id}>{stripe.name}</option>
    ))
  }

  const paymentMethodTypes = () => paymentMethodType?.map(method => ({ label: method.name, value: method.type }))

  function setBtnTxt(e) {
    fieldData.txt = e.target.value
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory({ event: `Stripe button text updated : ${fieldData.txt}`, type: 'change_stripe_btn_txt', state: { fields: allFields, fldKey } })
  }
  function setPayBtnTxt(e) {
    fieldData.config.payBtnTxt = e.target.value
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory({ event: `Stripe pay button text updated : ${fieldData.config.payBtnTxt}`, type: 'change_stripe_pay_btn_txt', state: { fields: allFields, fldKey } })
  }

  return (
    <div>
      <FieldSettingTitle
        title="Field Settings"
        subtitle={fieldData.typ}
        fieldKey={fldKey}
      />

      {/*
      <div className="mb-2">
        <span className="font-w-m">{__('Field Type : ')}</span>
        {__('Paypal')}
      </div> */}

      <SimpleAccordion
        id="slct-cnfg-stng"
        title="Select Config"
        className={css(FieldStyle.fieldSection)}
      >
        <select
          data-testid="slct-cnfg-slct"
          name="payIntegID"
          id="payIntegID"
          onChange={e => handleInput(e.target.name, e.target.value)}
          className={css(FieldStyle.input)}
          value={fieldData.payIntegID}
        >
          <option value="">Select Config</option>
          {getStripeConfigs()}
        </select>
      </SimpleAccordion>
      <FieldSettingsDivider />

      {/* <div className="mt-3">
        <b>{__('Select Config')}</b>
        <br />
        <select name="payIntegID" id="payIntegID" onChange={e => handleInput(e.target.name, e.target.value)} className="btcd-paper-inp mt-1" value={fieldData.payIntegID}>
          <option value="">Select Config</option>
          {getStripeConfigs()}
        </select>
      </div> */}
      {fieldData.payIntegID && (
        <>
          <SimpleAccordion
            id="btn-txt-stng"
            title={__('Button Text')}
            className={css(FieldStyle.fieldSection)}
            open
          >
            <div className={css(FieldStyle.placeholder)}>
              <AutoResizeInput
                id="btn-txt"
                aria-label="Stripe button text"
                placeholder="Type text here..."
                value={fieldData.txt}
                changeAction={setBtnTxt}
              />
            </div>
          </SimpleAccordion>

          <FieldSettingsDivider />
          <SimpleAccordion
            id="btn-txt-stng"
            title={__('Pay Button Text')}
            className={css(FieldStyle.fieldSection)}
            open
          >
            <div className={css(FieldStyle.placeholder)}>
              <AutoResizeInput
                id="pay-btn-txt"
                aria-label="Stripe pay button text"
                placeholder="Type text here..."
                value={fieldData.config.payBtnTxt}
                changeAction={setPayBtnTxt}
              />
            </div>
          </SimpleAccordion>

          <FieldSettingsDivider />
          <SimpleAccordion
            id="slct-cnfg-stng"
            title="Layout"
            className={css(FieldStyle.fieldSection)}
          >
            <select
              data-testid="slct-cnfg-layout"
              name="layout"
              id="layout"
              onChange={e => handleLayout(e.target.value)}
              className={css(FieldStyle.input)}
              value={fieldData.config.layout.type}
            >
              {/* <option value="">Select Layout</option> */}
              {Object
                .keys(layouts)
                .map(layout => (<option key={layout} value={layout}>{layout}</option>))}
            </select>
          </SimpleAccordion>
          <FieldSettingsDivider />
          <SimpleAccordion
            id="slct-cnfg-stng"
            title="Theme"
            className={css(FieldStyle.fieldSection, FieldStyle.hover_tip)}
            tip={tippyHelperMsg.stripeTheme}
            tipProps={{ width: 250, icnSize: 17 }}
          >
            <select
              data-testid="slct-cnfg-theme"
              name="theme"
              id="theme"
              onChange={e => handleTheme(e.target.value)}
              className={css(FieldStyle.input)}
              value={fieldData.config?.theme.name}
            >
              {/* <option value="">Select Layout</option> */}
              {Object
                .keys(themes)
                .map(tm => (<option key={`${themes[tm].theme}-${tm}`} value={tm}>{tm}</option>))}
            </select>
          </SimpleAccordion>
          <FieldSettingsDivider />
          {/* <div className={css(ut.ml2, ut.mr2, ut.p1)}>
            <SingleToggle
              id="sbscrptn"
              title={__('Subscription:')}
              action={setSubscription}
              isChecked={isSubscription}
              className="mt-3"
            />
            {isSubscription && (
              <SingleInput
                id="pln-id"
                inpType="text"
                title={__('Plan Id')}
                value={fieldData.planId || ''}
                action={e => handleInput('planId', e.target.value)}
                cls={css(FieldStyle.input)}
              />
            )}
          </div> */}
          {!isSubscription && (
            <>
              <div className={css(ut.ml2, ut.mr2, ut.p1)}>
                <b>{__('Language')}</b>
                <MultiSelect
                  className="w-10 btcd-paper-drpdwn mt-1"
                  options={localeCodeOptions()}
                  onChange={val => handleInput('config->options->locale', val)}
                  defaultValue={fieldData.config.options?.locale}
                  largeData
                  singleSelect
                />
              </div>
              <div className={css(ut.ml2, ut.mr2, ut.p1)}>
                <b>{__('Payment Method Type')}</b>
                <MultiSelect
                  className="w-10 btcd-paper-drpdwn mt-1 btcd-ttc"
                  options={paymentMethodTypes()}
                  // onChange={val => handleInput('config->options->payment_method_types', val)}
                  onChange={val => handlePaymentMethodType(val)}
                  defaultValue={fieldData.config.options?.payment_method_types || []}
                />
              </div>

              <FieldSettingsDivider />
              <div className={css(ut.ml2, ut.mr2, ut.p1)}>
                <label htmlFor="recap-thm">
                  <b>
                    {__('Currency')}
                    {' '}
                  </b>
                  <select
                    data-testid="crncy-fld-slct"
                    onChange={e => handleInput('config->options->currency', e.target.value)}
                    name="currency"
                    value={fieldData.config.options?.currency}
                    className={css(FieldStyle.input)}
                  >
                    {filterCurrency?.map(cn => (
                      <option key={cn.code} value={cn.code}>
                        {cn.currency}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <div className={css(ut.ml2, ut.mr2, ut.p1)}>
                <b className={css(style.amountType)}>
                  {__('Amount Type')}
                  <Cooltip>
                    <div className="txt-body">
                      <RenderHtml html={tippyHelperMsg.amountType} />
                    </div>
                  </Cooltip>

                </b>
                <br />
                <CheckBox
                  id="amnt-typ-fxd"
                  onChange={setAmountType}
                  radio
                  checked={!isDynamicAmount}
                  title={__('Fixed')}
                />
                <CheckBox
                  id="amnt-typ-dynmc"
                  onChange={setAmountType}
                  radio
                  checked={isDynamicAmount}
                  title={__('Dynamic')}
                  value="dynamic"
                />
              </div>
              {!isDynamicAmount && (
                <div className={css(ut.ml2, ut.mr2, ut.p1)}>
                  <SingleInput
                    id="amnt"
                    cls={css(FieldStyle.input)}
                    inpType="number"
                    title={__('Amount')}
                    value={fieldData.config?.amount || ''}
                    action={e => handleInput('config->amount', e.target.value)}
                  />
                </div>
              )}
              {isDynamicAmount && (
                <div className={css(ut.ml2, ut.mr2, ut.p1)}>
                  <b>{__('Select Amount Field')}</b>
                  <select
                    data-testid="slct-amnt-slct"
                    onChange={e => handleInput('config->amountFld', e.target.value)}
                    name="amountFld"
                    className={css(FieldStyle.input)}
                    value={fieldData.config.amountFld}
                  >
                    <option value="">{__('Select Field')}</option>
                    {getAmountFields()}
                  </select>
                </div>
              )}
              {/* <div className={css(ut.ml2, ut.mr2, ut.p1)}>
                <b>{__('Shipping Amount')}</b>
                <br />
                <CheckBox
                  id="shpng-amnt-fxd"
                  onChange={setShippingType}
                  radio
                  checked={!isDynamicShipping}
                  title={__('Fixed')}
                />
                <CheckBox
                  id="shpng-amnt-dynmc"
                  onChange={setShippingType}
                  radio
                  checked={isDynamicShipping}
                  title={__('Dynamic')}
                  value="dynamic"
                />
              </div> */}
              {/* {!isDynamicShipping && (
                <div className={css(ut.ml2, ut.mr2, ut.p1)}>
                  <SingleInput
                    id="spng-cst"
                    cls={css(FieldStyle.input)}
                    inpType="number"
                    title={__('Shipping Cost')}
                    value={fieldData.shipping || ''}
                    action={e => handleInput('shipping', e.target.value)}
                  />
                </div>
              )} */}
              {/* {isDynamicShipping && (
                <div className={css(ut.ml2, ut.mr2, ut.p1)}>
                  <b>{__('Select Shipping Amount Field')}</b>
                  <select
                    data-testid="slct-shpng-amnt"
                    onChange={e => handleInput(e.target.name, e.target.value)}
                    name="shippingFld"
                    className={css(FieldStyle.input)}
                    value={fieldData.shippingFld}
                  >
                    <option value="">{__('Select Field')}</option>
                    {getAmountFields()}
                  </select>
                </div>
              )} */}
              {/* <div className={css(ut.ml2, ut.mr2, ut.p1)}>
                <b>{__('Tax Amount Type')}</b>
                <br />
                <CheckBox
                  id="tx-amnt-fxd"
                  onChange={setTaxType}
                  radio
                  checked={!isDynamicTax}
                  title={__('Fixed')}
                />
                <CheckBox
                  id="tx-amnt-dynmc"
                  onChange={setTaxType}
                  radio
                  checked={isDynamicTax}
                  title={__('Dynamic')}
                  value="dynamic"
                />
              </div> */}
              {/* {!isDynamicTax && (
                <div className={css(ut.ml2, ut.mr2, ut.p1)}>
                  <SingleInput
                    id="tax"
                    cls={css(FieldStyle.input)}
                    inpType="number"
                    title={__('Tax (%)')}
                    value={fieldData.tax || ''}
                    action={e => handleInput('tax', e.target.value)}
                  />
                </div>
              )} */}
              {/* {isDynamicTax && (
                <div className={css(ut.ml2, ut.mr2, ut.p1)}>
                  <b>{__('Select Amount Field')}</b>
                  <select
                    data-testid="slct-amnt-fld"
                    onChange={e => handleInput(e.target.name, e.target.value)}
                    name="taxFld"
                    className={css(FieldStyle.input)}
                    value={fieldData.taxFld}
                  >
                    <option value="">{__('Select Field')}</option>
                    {getAmountFields()}
                  </select>
                </div>
              )} */}

              {/*
              // ---------Description Added in bit-paypal-filed.js whith form-id,entry-id,field-key value----------
              <div className={css(ut.ml2, ut.mr2, ut.p1)}>
                <b>{__('Description')}</b>
                <br />
                <CheckBox id="dscrptn-sttc" onChange={setDescType} radio checked={!isDynamicDesc} title={__('Static')} />
                <CheckBox id="dscrptn-dynmc" onChange={setDescType} radio checked={isDynamicDesc} title={__('Dynamic')} value="dynamic" />
              </div>
              {!isDynamicDesc
                && (
                  <div className={css(ut.ml2, ut.mr2, ut.p1)}>
                    <textarea
                      data-testid="ordr-dscrptn-txt-ara"
                      className="mt-1 btcd-paper-inp"
                      placeholder="Order Description"
                      name="description"
                      rows="5"
                      onChange={e => handleInput(e.target.name, e.target.value)}
                    />
                  </div>
                )}
              {isDynamicDesc && (
                <div className={css(ut.ml2, ut.mr2, ut.p1)}>
                  <b>{__('Select Description Field')}</b>
                  <select
                    data-testid="slct-dscrptn-fld"
                    onChange={e => handleInput(e.target.name, e.target.value)}
                    name="descFld"
                    className={css(FieldStyle.input)}
                    value={fieldData.descFld}
                  >
                    <option value="">{__('Select Field')}</option>
                    {getDescFields()}
                  </select>
                </div>
              )} */}
            </>
          )}
        </>
      )}

      <FieldSettingsDivider />
      <FieldHideSettings />
    </div>
  )
}

const propNameLabel = {
  payIntegID: 'Payment Configuration Changed',
  planId: 'Plan Id Changed',
  locale: 'Language Selected',
  disableFunding: 'Disabled Card',
  amount: 'Amount',
  amountFld: 'Amount Field Selected',
  shipping: 'Shipping Cost',
  shippingFld: 'Shipping Amount Field Selected',
  tax: 'Tax changed',
  taxFld: 'Tax Amount Field Selected',
  currency: 'Currency Selected',
  description: 'Other Description',
  descFld: 'Description Field Selected',
  layout: 'Layout Changed',
}

const style = {
  amountType: {
    dy: 'flex !important',
    // flx: 'align-center',
    fw: 600,
    '& .hover-tip': { oy: 0 },
  },
}
