import MultiSelect from 'react-multiple-select-dropdown-lite'
import CheckBox from '../ElmSettings/Childs/CheckBox'
import SingleInput from '../ElmSettings/Childs/SingleInput'
import SingleToggle from '../ElmSettings/Childs/SingleToggle'
import Back2FldList from './Back2FldList'
import { fundLists, currencyCodes, localeCodes } from '../../Utils/StaticData/paypalData'

export default function PaypalSettings({ elm, fields, updateData, setElementSetting }) {
  const formFields = Object.entries(fields)
  const isSubscription = elm.data?.payType === 'subscription'
  const isDynamicDesc = elm.data?.descType === 'dynamic'
  const isDynamicAmount = elm.data?.amountType === 'dynamic'
  const isDynamicShipping = elm.data?.shippingType === 'dynamic'
  const isDynamicTax = elm.data?.taxType === 'dynamic'

  const handleInput = (name, value) => {
    const tmp = { ...elm }
    if (value) {
      tmp.data[name] = value
    } else {
      delete tmp.data[name]
    }
    if (name === 'locale') {
      const localeArr = tmp.data.locale.split(' - ')
      tmp.data.locale = localeArr[localeArr.length - 1]
    }
    updateData(tmp)
  }

  const setSubscription = e => {
    const tmp = { ...elm }
    if (e.target.checked) {
      tmp.data.payType = 'subscription'
      delete tmp.data.currency
    } else {
      tmp.data.currency = 'USD'
      delete tmp.data.payType
      delete tmp.data.planId
    }
    delete tmp.data.amountType
    delete tmp.data.amount
    delete tmp.data.amountFld

    updateData(tmp)
  }

  const setAmountType = e => {
    const tmp = { ...elm }
    if (e.target.value) tmp.data.amountType = e.target.value
    else delete tmp.data.amountType
    delete tmp.data.amount
    delete tmp.data.amountFld

    updateData(tmp)
  }

  const setShippingType = e => {
    const tmp = { ...elm }
    if (e.target.value) tmp.data.shippingType = e.target.value
    else delete tmp.data.shippingType
    delete tmp.data.shipping
    delete tmp.data.shippingFld

    updateData(tmp)
  }

  const setTaxType = e => {
    const tmp = { ...elm }
    if (e.target.value) tmp.data.taxType = e.target.value
    else delete tmp.data.taxType
    delete tmp.data.tax
    delete tmp.data.taxFld

    updateData(tmp)
  }

  const setDescType = e => {
    const tmp = { ...elm }
    if (e.target.value) tmp.data.descType = e.target.value
    else delete tmp.data.descType
    delete tmp.data.description
    delete tmp.data.descFld

    updateData(tmp)
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

  const fundOptions = () => fundLists.map(fund => ({ label: fund.label, value: fund.value }))

  return (
    <div className="ml-2 mr-4">
      <Back2FldList setElementSetting={setElementSetting} />
      <div className="mb-2">
        <span className="font-w-m">Field Type : </span>
        Paypal
      </div>
      <SingleInput inpType="text" title="Client Id" value={elm.data.clientId || ''} action={e => handleInput('clientId', e.target.value)} />
      <div className="mt-2">
        <SingleToggle title="Subscription:" action={setSubscription} isChecked={isSubscription} className="mt-3" />
        {isSubscription && <SingleInput inpType="text" title="Plan Id" value={elm.data.planId || ''} action={e => handleInput('planId', e.target.value)} />}
      </div>

      {!isSubscription && (
        <>
          <div className="mt-2">
            <b>Language</b>
            <MultiSelect
              className="w-10 btcd-paper-drpdwn mt-1"
              options={localeCodeOptions()}
              onChange={val => handleInput('locale', val)}
              largeData
              singleSelect
            />
          </div>
          <div className="mt-2">
            <b>Disable Card</b>
            <MultiSelect
              className="w-10 btcd-paper-drpdwn mt-1 btcd-ttc"
              options={fundOptions()}
              onChange={val => handleInput('disableFunding', val)}
            />
          </div>
          <div className="mt-2">
            <b>Amount Type</b>
            <br />
            <CheckBox onChange={setAmountType} radio checked={!isDynamicAmount} title="Fixed" />
            <CheckBox onChange={setAmountType} radio checked={isDynamicAmount} title="Dynamic" value="dynamic" />
          </div>
          {!isDynamicAmount && <SingleInput inpType="number" title="Amount" value={elm.data.amount || ''} action={e => handleInput('amount', e.target.value)} />}
          {isDynamicAmount && (
            <div className="mt-3">
              <b>Select Amount Field</b>
              <select onChange={e => handleInput(e.target.name, e.target.value)} name="amountFld" className="btcd-paper-inp mt-1">
                <option value="">Select Field</option>
                {getAmountFields()}
              </select>
            </div>
          )}
          <div className="mt-2">
            <b>Shipping Amount</b>
            <br />
            <CheckBox onChange={setShippingType} radio checked={!isDynamicShipping} title="Fixed" />
            <CheckBox onChange={setShippingType} radio checked={isDynamicShipping} title="Dynamic" value="dynamic" />
          </div>
          {!isDynamicShipping && <SingleInput inpType="number" title="Shipping Cost" value={elm.data.shipping || ''} action={e => handleInput('shipping', e.target.value)} />}
          {isDynamicShipping && (
            <div className="mt-3">
              <b>Select Shipping Amount Field</b>
              <select onChange={e => handleInput(e.target.name, e.target.value)} name="shippingFld" className="btcd-paper-inp mt-1">
                <option value="">Select Field</option>
                {getAmountFields()}
              </select>
            </div>
          )}
          <div className="mt-2">
            <b>Tax Amount Type</b>
            <br />
            <CheckBox onChange={setTaxType} radio checked={!isDynamicTax} title="Fixed" />
            <CheckBox onChange={setTaxType} radio checked={isDynamicTax} title="Dynamic" value="dynamic" />
          </div>
          {!isDynamicTax && <SingleInput inpType="number" title="Tax (%)" value={elm.data.tax || ''} action={e => handleInput('tax', e.target.value)} />}
          {isDynamicTax && (
            <div className="mt-3">
              <b>Select Amount Field</b>
              <select onChange={e => handleInput(e.target.name, e.target.value)} name="taxFld" className="btcd-paper-inp mt-1">
                <option value="">Select Field</option>
                {getAmountFields()}
              </select>
            </div>
          )}
          <div className="mt-2">
            <label htmlFor="recap-thm">
              <b>Currency</b>
              <select onChange={e => handleInput(e.target.name, e.target.value)} name="currency" value={elm.data.currency} className="btcd-paper-inp mt-1">
                {currencyCodes.map(itm => (
                  <option key={itm.currency} value={itm.code}>
                    {`${itm.currency} - ${itm.code}`}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="mt-2">
            <b>Description</b>
            <br />
            <CheckBox onChange={setDescType} radio checked={!isDynamicDesc} title="Static" />
            <CheckBox onChange={setDescType} radio checked={isDynamicDesc} title="Dynamic" value="dynamic" />
          </div>
          {!isDynamicDesc && <textarea className="mt-1 btcd-paper-inp" placeholder="Order Description" name="description" rows="5" onChange={e => handleInput(e.target.name, e.target.value)} />}
          {isDynamicDesc && (
            <div className="mt-1">
              <b>Select Description Field</b>
              <select onChange={handleInput} name="amountFld" className="btcd-paper-inp mt-1">
                <option value="">Select Field</option>
                {getDescFields()}
              </select>
            </div>
          )}
        </>
      )}
    </div>
  )
}
