import { useParams } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { $fields } from '../../GlobalStates/GlobalStates'
import { $styles } from '../../GlobalStates/StylesState'
import AdvanceFileUpSettings from './AdvanceFileUpSettings'
import ButtonSettings from './ButtonSettings'
import CountryFieldSettings from './CountryFieldSettings'
import CurrencyFieldSettings from './CurrencyFieldSettings'
import DecisionBoxSettings from './DecisionBoxSettings'
import DividerSettings from './DividerSettings'
import DropdownSettings from './DropdownFieldSettings'
import FileUploadSettings from './FileUploadSettings'
import HtmlFieldSettings from './HtmlFieldSettings'
import HtmlSelectSettings from './HtmlSelectSettings'
import ImageSettings from './ImageSettings'
import PaypalFieldSettings from './PaypalFieldSettings'
import PhoneNumberFieldSettings from './PhoneNumberFieldSettings'
import RadioCheckSettings from './RadioCheckSettings'
import RazorpayFieldSettings from './RazorpayFieldSettings'
import ReCaptchaSettings from './ReCaptchaSettings'
import TextFieldSettings from './TextFieldSettings'
import TitleSettings from './TitleSettings'

export default function FieldSettings() {
  const { fieldKey } = useParams()
  const fields = useRecoilValue($fields)
  const styles = useRecoilValue($styles)
  const seletedFieldType = fields?.[fieldKey]?.typ

  if (!fieldKey || !seletedFieldType || !styles?.fields?.[fieldKey]?.classes) {
    return <>Loading</>
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
    case 'html-select':
      return <HtmlSelectSettings />
    case 'select':
    case 'dropdown':
      return <DropdownSettings />
    case 'file-up': return <FileUploadSettings />
    case 'advanced-file-up': return <AdvanceFileUpSettings />
    case 'recaptcha': return <ReCaptchaSettings />
    case 'decision-box': return <DecisionBoxSettings />
    case 'html': return <HtmlFieldSettings />
    case 'button': return <ButtonSettings />
    case 'paypal': return <PaypalFieldSettings />
    case 'razorpay': return <RazorpayFieldSettings />
    case 'title': return <TitleSettings />
    case 'image': return <ImageSettings />
    case 'divider': return <DividerSettings />
    case 'currency': return <CurrencyFieldSettings />
    case 'country': return <CountryFieldSettings />
    case 'phone-number': return <PhoneNumberFieldSettings />

    default: return <>No field found with this key.</>
  }
}
