import { useHistory, useParams } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import { $selectedFieldId } from '../../GlobalStates/GlobalStates'
import BtnIcn from '../../Icons/BtnIcn'
import CheckBoxIcn from '../../Icons/CheckBoxIcn'
import ChevronRightIcon from '../../Icons/ChevronRightIcon'
import CodeSnippetIcn from '../../Icons/CodeSnippetIcn'
import ColorPickerIcn from '../../Icons/ColorPickerIcn'
import DateIcn from '../../Icons/DateIcn'
import DateTimeIcn from '../../Icons/DateTimeIcn'
import DecisionBoxIcn from '../../Icons/DecisionBoxIcn'
import DropDownIcn from '../../Icons/DropDownIcn'
import FileUploadIcn from '../../Icons/FileUploadIcn'
import MailIcn from '../../Icons/MailIcn'
import MonthIcn from '../../Icons/MonthIcn'
import NumberIcn from '../../Icons/NumberIcn'
import PasswordIcn from '../../Icons/PasswordIcn'
import PaypalIcn from '../../Icons/PaypalIcn'
import RadioIcn from '../../Icons/RadioIcn'
import RazorPayIcn from '../../Icons/RazorPayIcn'
import ReCaptchaIcn from '../../Icons/ReCaptchaIcn'
import TextareaIcn from '../../Icons/TextareaIcn'
import TextIcn from '../../Icons/TextIcn'
import TimeIcn from '../../Icons/TimeIcn'
import UrlIcn from '../../Icons/UrlIcn'
import UserIcn from '../../Icons/UserIcn'
import WeekIcn from '../../Icons/WeekIcn'
import { __ } from '../../Utils/i18nwrap'

export default function FieldLinkBtn({ icn, title, subTitle, fieldKey }) {
  const { formType, formID } = useParams()
  const setSeletedFieldId = useSetRecoilState($selectedFieldId)
  const history = useHistory()

  const handleFldLink = () => {
    setSeletedFieldId(fieldKey)
    history.push(`/form/builder/${formType}/${formID}/field-settings/${fieldKey}`)
  }
  return (
    <button type="button" onClick={handleFldLink} className="btc-s-l mt-2">
      <div className="flx flx-between ">
        <div className="flx w-9">
          <span className="lft-icn mr-2 flx br-50">
            {typeof icn === 'string' ? FieldIcon(icn) : icn}
          </span>
          <div className="w-nwrp o-h">
            <div className="txt-o o-h mb-1">{title}</div>
            {subTitle && (
              <small>
                {__('Key:', 'bitform')}
                {` ${subTitle}`}
              </small>
            )}
          </div>
        </div>
        <ChevronRightIcon size={18} />
      </div>
    </button>
  )
}
const FieldIcon = icon => {
  switch (icon) {
    case 'text':
      return <TextIcn size="14" />
    case 'username':
      return <UserIcn size="14" />
    case 'textarea':
      return <TextareaIcn size="14" />
    case 'check':
      return <CheckBoxIcn w="14" />
    case 'radio':
      return <RadioIcn size="14" />
    case 'number':
      return <NumberIcn w="14" />
    case 'select':
      return <DropDownIcn w="14" />
    case 'password':
      return <PasswordIcn size="14" />
    case 'email':
      return <MailIcn size="14" />
    case 'url':
      return <UrlIcn w="14" />
    case 'file-up':
      return <FileUploadIcn w="14" />
    case 'date':
      return <DateIcn w="14" />
    case 'time':
      return <TimeIcn size="14" />
    case 'datetime-local':
      return <DateTimeIcn w="14" />
    case 'month':
      return <MonthIcn w="14" />
    case 'week':
      return <WeekIcn size="14" />
    case 'color':
      return <ColorPickerIcn w="14" />
    case 'recaptcha':
      return <ReCaptchaIcn size="14" />
    case 'decision-box':
      return <DecisionBoxIcn size="14" />
    case 'button':
      return <BtnIcn size="14" />
    case 'html':
      return <CodeSnippetIcn size="14" />
    case 'paypal':
      return <PaypalIcn w="14" />
    case 'razorpay':
      return <RazorPayIcn w="14" h="19" />
    default:
      return false
  }
}
