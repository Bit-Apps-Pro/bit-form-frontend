import { useNavigate, useParams } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import { $selectedFieldId } from '../../GlobalStates/GlobalStates'
import BtnIcn from '../../Icons/BtnIcn'
import CheckBoxIcn from '../../Icons/CheckBoxIcn'
import ChevronDownIcn from '../../Icons/ChevronDownIcn'
import ChevronRightIcon from '../../Icons/ChevronRightIcon'
import CodeSnippetIcn from '../../Icons/CodeSnippetIcn'
import ColorPickerIcn from '../../Icons/ColorPickerIcn'
import CurrencyIcn from '../../Icons/CurrencyIcn'
import DateIcn from '../../Icons/DateIcn'
import DateTimeIcn from '../../Icons/DateTimeIcn'
import DecisionBoxIcn from '../../Icons/DecisionBoxIcn'
import DividerIcn from '../../Icons/DividerIcn'
import DropDownIcn from '../../Icons/DropDownIcn'
import FileUploadIcn from '../../Icons/FileUploadIcn'
import FlagIcn from '../../Icons/FlagIcn'
import ImageIcn from '../../Icons/ImageIcn'
import MailIcn from '../../Icons/MailIcn'
import MonthIcn from '../../Icons/MonthIcn'
import NumberIcn from '../../Icons/NumberIcn'
import PasswordIcn from '../../Icons/PasswordIcn'
import PaypalIcn from '../../Icons/PaypalIcn'
import PhoneNumberIcn from '../../Icons/PhoneNumberIcn'
import RadioIcn from '../../Icons/RadioIcn'
import RazorPayIcn from '../../Icons/RazorPayIcn'
import ReCaptchaIcn from '../../Icons/ReCaptchaIcn'
import TextareaIcn from '../../Icons/TextareaIcn'
import TextIcn from '../../Icons/TextIcn'
import TimeIcn from '../../Icons/TimeIcn'
import TitleIcn from '../../Icons/TitleIcn'
import UrlIcn from '../../Icons/UrlIcn'
import UserIcn from '../../Icons/UserIcn'
import WeekIcn from '../../Icons/WeekIcn'
import { ucFirst } from '../../Utils/Helpers'
import { __ } from '../../Utils/i18nwrap'

export default function FieldLinkBtn({ icn, title, subTitle, fieldKey }) {
  const { formType, formID } = useParams()
  const setSeletedFieldId = useSetRecoilState($selectedFieldId)
  const naviage = useNavigate()
  console.log('fieldKey', fieldKey)
  const handleFldLink = () => {
    setSeletedFieldId(fieldKey)
    naviage(`/form/builder/${formType}/${formID}/field-settings/${fieldKey}`)
  }
  return (
    <button type="button" data-testid={`fld-lst-itm-${icn}-${fieldKey}`} onClick={handleFldLink} className="btc-s-l mt-2">
      <div className="flx flx-between ">
        <div className="flx w-9">
          <span className="lft-icn mr-2 flx br-50">
            {typeof icn === 'string' ? FieldIcon(icn) : icn}
          </span>
          <div className="w-nwrp o-h">
            <div className="txt-o o-h mb-1">{ucFirst(title)}</div>
            {subTitle && (
              <small>
                {__('Key:')}
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
  const icons = {
    title: <TitleIcn w="14" />,
    divider: <DividerIcn w="14" />,
    image: <ImageIcn w="14" />,
    text: <TextIcn size="14" />,
    username: <UserIcn size="14" />,
    textarea: <TextareaIcn size="14" />,
    check: <CheckBoxIcn w="14" />,
    radio: <RadioIcn size="14" />,
    number: <NumberIcn w="14" />,
    'html-select': <ChevronDownIcn size="14" />,
    select: <DropDownIcn w="14" />,
    password: <PasswordIcn size="14" />,
    email: <MailIcn size="14" />,
    url: <UrlIcn w="14" />,
    'file-up': <FileUploadIcn w="14" />,
    date: <DateIcn w="14" />,
    time: <TimeIcn size="14" />,
    'datetime-local': <DateTimeIcn w="14" />,
    month: <MonthIcn w="14" />,
    week: <WeekIcn size="14" />,
    color: <ColorPickerIcn w="14" />,
    recaptcha: <ReCaptchaIcn size="14" />,
    'decision-box': <DecisionBoxIcn size="14" />,
    button: <BtnIcn size="14" />,
    html: <CodeSnippetIcn size="14" />,
    paypal: <PaypalIcn w="14" />,
    razorpay: <RazorPayIcn w="14" h="19" />,
    'advanced-file-up': <FileUploadIcn w="14" />,
    currency: <CurrencyIcn size="15" />,
    'phone-number': <PhoneNumberIcn size="15" />,
    country: <FlagIcn size="14" />,
  }
  return icons[icon]
}
