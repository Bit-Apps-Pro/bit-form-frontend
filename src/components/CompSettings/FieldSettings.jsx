import { useHistory, useParams } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { $fields, $selectedFieldId } from '../../GlobalStates'
import PaypalSettings from '../PaypalSettings'
import RazorpaySettings from '../RazorpaySettings'
import ButtonSettings from './ButtonSettings'
import DecisionBoxSettings from './DecisionBoxSettings'
import FileUpSettings from './FileUpSettings'
import HtmlFieldSettings from './HtmlFieldSettings'
import RadioCheckSettings from './RadioCheckSettings'
import ReCaptchaSettigns from './ReCaptchaSettigns'
import SelectSettings from './SelectSettings'
import TextFieldSettings from './TextFieldSettings'

export default function FieldSettings() {
  const { formType, formID } = useParams()
  const history = useHistory()
  const fields = useRecoilValue($fields)
  const selectedFieldId = useRecoilValue($selectedFieldId)

  const seletedFieldType = fields?.[selectedFieldId]?.typ
  if (!selectedFieldId) {
    history.push(`/form/builder/${formType}/${formID}/fields-list`)
    return <></>
  }
  switch (seletedFieldType) {
    case 'text':
    case 'username':
    case 'number':
    case 'password':
    case 'email':
    case 'url':
    case 'textarea':
    case 'date':
    case 'datetime-local':
    case 'time':
    case 'month':
    case 'week':
    case 'color':
      return <TextFieldSettings />
    case 'check':
    case 'radio':
      return <RadioCheckSettings />
    case 'select':
    case 'dropdown':
      return <SelectSettings />
    case 'file-up':
      return <FileUpSettings />
    case 'recaptcha':
      return <ReCaptchaSettigns />
    case 'decision-box':
      return <DecisionBoxSettings />
    case 'html':
      return <HtmlFieldSettings />
    case 'button':
      return <ButtonSettings />
    case 'paypal':
      return <PaypalSettings />
    case 'razorpay':
      return <RazorpaySettings />
    default:
      return <></>
  }
}
