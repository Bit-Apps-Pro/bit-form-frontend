import { useParams } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { $fields } from '../../GlobalStates/GlobalStates'
import { $styles } from '../../GlobalStates/StylesState'
import AdvanceFileUpSettings from './AdvanceFileUpSettings'
import ButtonSettings from './ButtonSettings'
import DecisionBoxSettings from './DecisionBoxSettings'
import DividerSettings from './DividerSettings'
import FileUpSettings from './FileUpSettings'
import HtmlFieldSettings from './HtmlFieldSettings'
import ImageSettings from './ImageSettings'
import PaypalFieldSettings from './PaypalFieldSettings'
import RadioCheckSettings from './RadioCheckSettings'
import RazorpayFieldSettings from './RazorpayFieldSettings'
import ReCaptchaSettigns from './ReCaptchaSettigns'
import SelectSettings from './SelectSettings'
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
    case 'select':
    case 'dropdown':
      return <SelectSettings />
    case 'file-up': return <FileUpSettings />
    case 'advance-file-up': return <AdvanceFileUpSettings />
    case 'recaptcha': return <ReCaptchaSettigns />
    case 'decision-box': return <DecisionBoxSettings />
    case 'html': return <HtmlFieldSettings />
    case 'button': return <ButtonSettings />
    case 'paypal': return <PaypalFieldSettings />
    case 'razorpay': return <RazorpayFieldSettings />
    case 'title': return <TitleSettings />
    case 'image': return <ImageSettings />
    case 'divider': return <DividerSettings />

    default: return <>No field found with this key.</>
  }
}
