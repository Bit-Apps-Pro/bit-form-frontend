import produce from 'immer'
import { useContext } from 'react'
import { useFela } from 'react-fela'
import MultiSelect from 'react-multiple-select-dropdown-lite'
import { useParams } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { $fields } from '../../GlobalStates/GlobalStates'
import ut from '../../styles/2.utilities'
import FieldStyle from '../../styles/FieldStyle.style'
import { AppSettings } from '../../Utils/AppSettingsContext'
import { deepCopy } from '../../Utils/Helpers'
import { __ } from '../../Utils/i18nwrap'
import { currencyCodes, fundLists, localeCodes } from '../../Utils/StaticData/paypalData'
import CheckBox from '../Utilities/CheckBox'
import SingleInput from '../Utilities/SingleInput'
import SingleToggle from '../Utilities/SingleToggle'
import FieldSettingsDivider from './CompSettingsUtils/FieldSettingsDivider'
import SimpleAccordion from './StyleCustomize/ChildComp/SimpleAccordion'
import FieldSettingTitle from './StyleCustomize/FieldSettingTitle'

export default function PaypalFieldSettings() {
  const { fieldKey: fldKey } = useParams()
  const [fields, setFields] = useRecoilState($fields)
  const fieldData = deepCopy(fields[fldKey])
  const formFields = Object.entries(fields)
  const { payments } = useContext(AppSettings)
  const isSubscription = fieldData?.payType === 'subscription'
  const isDynamicDesc = fieldData?.descType === 'dynamic'
  const isDynamicAmount = fieldData?.amountType === 'dynamic'
  const isDynamicShipping = fieldData?.shippingType === 'dynamic'
  const isDynamicTax = fieldData?.taxType === 'dynamic'

  const { css } = useFela()

  const handleInput = (name, value) => {
    if (value) {
      fieldData[name] = value
    } else {
      delete fieldData[name]
    }
    if (name === 'locale') {
      const localeArr = fieldData.locale.split(' - ')
      fieldData.locale = localeArr[localeArr.length - 1]
    }
    // eslint-disable-next-line no-param-reassign
    setFields(allFields => produce(allFields, draft => { draft[fldKey] = fieldData }))
  }

  const setSubscription = e => {
    if (e.target.checked) {
      fieldData.payType = 'subscription'
      delete fieldData.currency
    } else {
      fieldData.currency = 'USD'
      delete fieldData.payType
      delete fieldData.planId
    }
    delete fieldData.amountType
    delete fieldData.amount
    delete fieldData.amountFld

    // eslint-disable-next-line no-param-reassign
    setFields(allFields => produce(allFields, draft => { draft[fldKey] = fieldData }))
  }

  const setAmountType = e => {
    if (e.target.value) fieldData.amountType = e.target.value
    else delete fieldData.amountType
    delete fieldData.amount
    delete fieldData.amountFld

    // eslint-disable-next-line no-param-reassign
    setFields(allFields => produce(allFields, draft => { draft[fldKey] = fieldData }))
  }

  const setShippingType = e => {
    if (e.target.value) fieldData.shippingType = e.target.value
    else delete fieldData.shippingType
    delete fieldData.shipping
    delete fieldData.shippingFld

    // eslint-disable-next-line no-param-reassign
    setFields(allFields => produce(allFields, draft => { draft[fldKey] = fieldData }))
  }

  const setTaxType = e => {
    if (e.target.value) fieldData.taxType = e.target.value
    else delete fieldData.taxType
    delete fieldData.tax
    delete fieldData.taxFld

    // eslint-disable-next-line no-param-reassign
    setFields(allFields => produce(allFields, draft => { draft[fldKey] = fieldData }))
  }

  const setDescType = e => {
    if (e.target.value) fieldData.descType = e.target.value
    else delete fieldData.descType
    delete fieldData.description
    delete fieldData.descFld

    // eslint-disable-next-line no-param-reassign
    setFields(allFields => produce(allFields, draft => { draft[fldKey] = fieldData }))
  }

  const getAmountFields = () => {
    const filteredFields = formFields.filter(field => field[1].typ.match(/number|radio/g))
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
    value: `${locale.region} - ${locale.code}`,
  }))

  const getPaypalConfigs = () => {
    const paypalConfigs = payments.filter(pay => pay.type === 'PayPal')
    return paypalConfigs.map(paypal => (
      <option key={paypal.id} value={paypal.id}>{paypal.name}</option>
    ))
  }

  const fundOptions = () => fundLists.map(fund => ({ label: fund.label, value: fund.value }))

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
        <select data-testid="slct-cnfg-slct" name="payIntegID" id="payIntegID" onChange={e => handleInput(e.target.name, e.target.value)} className={css(FieldStyle.input)} value={fieldData.payIntegID}>
          <option value="">Select Config</option>
          {getPaypalConfigs()}
        </select>
      </SimpleAccordion>
      <FieldSettingsDivider />

      {/* <div className="mt-3">
        <b>{__('Select Config')}</b>
        <br />
        <select name="payIntegID" id="payIntegID" onChange={e => handleInput(e.target.name, e.target.value)} className="btcd-paper-inp mt-1" value={fieldData.payIntegID}>
          <option value="">Select Config</option>
          {getPaypalConfigs()}
        </select>
      </div> */}

      {fieldData.payIntegID && (
        <>
          <div className={css(ut.ml2, ut.mr2, ut.p1)}>
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
          </div>
          {!isSubscription && (
            <>
              <div className={css(ut.ml2, ut.mr2, ut.p1)}>
                <b>{__('Language')}</b>
                <MultiSelect
                  className="w-10 btcd-paper-drpdwn mt-1"
                  options={localeCodeOptions()}
                  onChange={val => handleInput('locale', val)}
                  largeData
                  singleSelect
                />
              </div>
              <div className={css(ut.ml2, ut.mr2, ut.p1)}>
                <b>{__('Disable Card')}</b>
                <MultiSelect
                  className="w-10 btcd-paper-drpdwn mt-1 btcd-ttc"
                  options={fundOptions()}
                  onChange={val => handleInput('disableFunding', val)}
                />
              </div>
              <div className={css(ut.ml2, ut.mr2, ut.p1)}>
                <b>{__('Amount Type')}</b>
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
                    value={fieldData.amount || ''}
                    action={e => handleInput('amount', e.target.value)}
                  />
                </div>
              )}
              {isDynamicAmount && (
                <div className={css(ut.ml2, ut.mr2, ut.p1)}>
                  <b>{__('Select Amount Field')}</b>
                  <select
                    data-testid="slct-amnt-slct"
                    onChange={e => handleInput(e.target.name, e.target.value)}
                    name="amountFld"
                    className={css(FieldStyle.input)}
                    value={fieldData.amountFld}
                  >
                    <option value="">{__('Select Field')}</option>
                    {getAmountFields()}
                  </select>
                </div>
              )}
              <div className={css(ut.ml2, ut.mr2, ut.p1)}>
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
              </div>
              {!isDynamicShipping && (
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
              )}
              {isDynamicShipping && (
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
              )}
              <div className={css(ut.ml2, ut.mr2, ut.p1)}>
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
              </div>
              {!isDynamicTax && (
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
              )}
              {isDynamicTax && (
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
              )}
              <div className={css(ut.ml2, ut.mr2, ut.p1)}>
                <label htmlFor="recap-thm">
                  <b>{__('Currency')}</b>
                  <select
                    data-testid="crncy-fld-slct"
                    onChange={e => handleInput(e.target.name, e.target.value)}
                    name="currency"
                    value={fieldData.currency}
                    className={css(FieldStyle.input)}
                  >
                    {currencyCodes.map(itm => (
                      <option key={itm.currency} value={itm.code}>
                        {`${itm.currency} - ${itm.code}`}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
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
              )}
            </>
          )}
        </>
      )}

    </div>
  )
}
