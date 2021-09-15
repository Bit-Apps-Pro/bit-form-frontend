/* eslint-disable jsx-a11y/no-redundant-roles */
/* eslint-disable react/button-has-type */
import AddIcon from '../Icons/AddIcon'
import APIIcon from '../Icons/APIIcon'
import BackIcn from '../Icons/BackIcn'
import BdrDashIcn from '../Icons/BdrDashIcn'
import BdrDottedIcn from '../Icons/BdrDottedIcn'
import BdrDoubleIcn from '../Icons/BdrDoubleIcn'
import BdrSolidIcn from '../Icons/BdrSolidIcn'
import BlurIcn from '../Icons/BlurIcn'
import BrushIcn from '../Icons/BrushIcn'
import BtnIcn from '../Icons/BtnIcn'
import CheckBoxIcn from '../Icons/CheckBoxIcn'
import ChevronDownIcn from '../Icons/ChevronDownIcn'
import ChevronRightIcon from '../Icons/ChevronRightIcon'
import CloseIcn from '../Icons/CloseIcn'
import CodeSnippetIcn from '../Icons/CodeSnippetIcn'
import ColorIcn from '../Icons/ColorIcn'
import ColorPickerIcn from '../Icons/ColorPickerIcn'
import CopyIcn from '../Icons/CopyIcn'
import CPTIcn from '../Icons/CPTIcn'
import DateIcn from '../Icons/DateIcn'
import DateTimeIcn from '../Icons/DateTimeIcn'
import DecisionBoxIcn from '../Icons/DecisionBoxIcn'
import DocIcn from '../Icons/DocIcn'
import DownloadIcon from '../Icons/DownloadIcon'
import DropDownIcn from '../Icons/DropDownIcn'
import EditIcn from '../Icons/EditIcn'
import EditIcon from '../Icons/EditIcon'
import EllipsisIcon from '../Icons/EllipsisIcon'
import EyeIcon from '../Icons/EyeIcon'
import EyeOffIcon from '../Icons/EyeOffIcon'
import FieldIcn from '../Icons/FieldIcn'
import FileUploadIcn from '../Icons/FileUploadIcn'
import FlagIcn from '../Icons/FlagIcn'
import FormIcn from '../Icons/FormIcn'
import GoogleAdIcn from '../Icons/GoogleAdIcn'
import HeightIcn from '../Icons/HeightIcn'
import HoneypotIcn from '../Icons/HoneypotIcn'
import HWordinateIcn from '../Icons/HWordinateIcn'
import ImageIcn from '../Icons/ImageIcn'
import InsideIcn from '../Icons/InsideIcn'
import ItemBlockIcn from '../Icons/ItemBlockIcn'
import LaptopIcn from '../Icons/LaptopIcn'
import LayerIcon from '../Icons/LayerIcon'
import MailIcn from '../Icons/MailIcn'
import MailOpenIcn from '../Icons/MailOpenIcn'
import MobileIcon from '../Icons/MobileIcon'
import MonthIcn from '../Icons/MonthIcn'
import MoveIcn from '../Icons/MoveIcn'
import NoneIcn from '../Icons/NoneIcn'
import NumberIcn from '../Icons/NumberIcn'
import PasswordIcn from '../Icons/PasswordIcn'
import PaymentsIcn from '../Icons/PaymentsIcn'
import PaypalIcn from '../Icons/PaypalIcn'
import QuestionIcn from '../Icons/QuestionIcn'
import RadioIcn from '../Icons/RadioIcn'
import RazorPayIcn from '../Icons/RazorPayIcn'
import ReCaptchaIcn from '../Icons/ReCaptchaIcn'
import RedoIcon from '../Icons/RedoIcon'
import SearchIcon from '../Icons/SearchIcon'
import Settings2 from '../Icons/Settings2'
import SettingsIcn from '../Icons/SettingsIcn'
import SpreadIcn from '../Icons/SpreadIcn'
import TabletIcon from '../Icons/TabletIcon'
import TextareaIcn from '../Icons/TextareaIcn'
import TextIcn from '../Icons/TextIcn'
import TimeIcn from '../Icons/TimeIcn'
import TrashIcn from '../Icons/TrashIcn'
import UndoIcon from '../Icons/UndoIcon'
import UrlIcn from '../Icons/UrlIcn'
import WeekIcn from '../Icons/WeekIcn'
import XYordinateIcn from '../Icons/XYordinateIcn'
import YoutubeIcn from '../Icons/YoutubeIcn'
import MenuIcon from '../Icons/__MenuIcon'
import './ShowIcon.css'

export default function ShowIcon() {
  const copyVar = (e) => {
    const btnName = e.target.dataset.componentName
    // console.log(e.target.dataset)
    navigator.clipboard.writeText(btnName)
  }
  const KeyPressHandler = (e) => {
    if (e.code === 'Enter') {
      copyVar(e)
    }
  }
  const icons = [
    {
      name: 'Menu Icon',
      icon: <MenuIcon size="30" />,
      com: '<MenuIcon size="30" />',
    },
    {
      name: 'Add Icon',
      icon: <AddIcon size="30" />,
      com: '<AddIcon size="30" />',
    },
    {
      name: 'API Icon',
      icon: <APIIcon size="30" />,
      com: '<APIIcon size="30" />',
    },
    {
      name: 'Back Icon',
      icon: <BackIcn size="30" />,
      com: '<BackIcn size="30" />',
    },
    {
      name: 'Broder Desh Icon',
      icon: <BdrDashIcn size="30" />,
      com: '<BdrDashIcn size="30" />',
    },
    {
      name: 'Broder Dotted Icon',
      icon: <BdrDottedIcn size="30" />,
      com: '<BdrDottedIcn size="30" />',
    },
    {
      name: 'Broder Double Icon',
      icon: <BdrDoubleIcn size="30" />,
      com: '<BdrDoubleIcn size="30" />',
    },
    {
      name: 'Broder Solid Icon',
      icon: <BdrSolidIcn size="30" />,
      com: '<BdrSolidIcn size="30" />',
    },
    {
      name: 'Blur Icon',
      icon: <BlurIcn h="25" w="17" />,
      com: '<BlurIcn h="25" w="17" />',
    },
    {
      name: 'Brush Icon',
      icon: <BrushIcn height="30" />,
      com: '<BrushIcn height="30" />',
    },
    {
      name: 'Button Icon',
      icon: <BtnIcn size="30" />,
      com: '<BtnIcn size="30" />',
    },
    {
      name: 'CheckBox Icon',
      icon: <CheckBoxIcn w="30" />,
      com: '<CheckBoxIcn w="30" />',
    },
    {
      name: 'Close Icon',
      icon: <CloseIcn size="30" />,
      com: '<CloseIcn size="30" />',
    },
    {
      name: 'Code Snippet Icon',
      icon: <CodeSnippetIcn size="30" />,
      com: '<CodeSnippetIcn size="30" />',
    },
    {
      name: 'Color Icon',
      icon: <ColorIcn w="30" h="20" />,
      com: '<ColorIcn w="30" h="20" />',
    },
    {
      name: 'Color Picker Icon',
      icon: <ColorPickerIcn w="30" />,
      com: '<ColorPickerIcn w="30" />',
    },
    {
      name: 'Copy Icon',
      icon: <CopyIcn w="30" />,
      com: '<CopyIcn w="30" />',
    },
    {
      name: 'CPT Icon',
      icon: <CPTIcn size="30" />,
      com: '<CPTIcn size="30" />',
    },
    {
      name: 'Data Icon',
      icon: <DateIcn w="30" />,
      com: '<DateIcn w="30" />',
    },
    {
      name: 'Data Time Icon',
      icon: <DateTimeIcn w="30" />,
      com: '<DateTimeIcn w="30" />',
    },
    {
      name: 'Decision Box Icon',
      icon: <DecisionBoxIcn size="30" />,
      com: '<DecisionBoxIcn size="30" />',
    },
    {
      name: 'Doc Icon',
      icon: <DocIcn size="30" />,
      com: '<DocIcn size="30" />',
    },
    {
      name: 'Download Icon',
      icon: <DownloadIcon size="30" />,
      com: '<DownloadIcon size="30" />',
    },
    {
      name: 'DropDown Icon',
      icon: <DropDownIcn w="30" />,
      com: '<DropDownIcn w="30" />',
    },
    {
      name: 'Edit Icon',
      icon: <EditIcn size="30" />,
      com: '<EditIcn size="30" />',
    },
    {
      name: 'Edit Icon',
      icon: <EditIcon size="30" />,
      com: '<EditIcon size="30" />',
    },
    {
      name: 'Ellipsis Icon',
      icon: <EllipsisIcon size="30" />,
      com: '<EllipsisIcon size="30" />',
    },
    {
      name: 'Field Icon',
      icon: <FieldIcn size="30" />,
      com: '<FieldIcn size="30" />',
    },
    {
      name: 'FileupLoad Icon',
      icon: <FileUploadIcn w="30" />,
      com: '<FileUploadIcn w="30" />',
    },
    {
      name: 'Flag Icon',
      icon: <FlagIcn size="30" />,
      com: '<FlagIcn size="30" />',
    },
    {
      name: 'Form Icon',
      icon: <FormIcn w="30" />,
      com: '<FormIcn w="30" />',
    },
    {
      name: 'Google ADI Icon',
      icon: <GoogleAdIcn size="30" />,
      com: '<GoogleAdIcn size="30" />',
    },
    {
      name: 'Height Icon',
      icon: <HeightIcn h="30" />,
      com: '<HeightIcn h="30" />',
    },
    {
      name: 'Honeypot Icon',
      icon: <HoneypotIcn h="30" w="20" />,
      com: '<HoneypotIcn h="30" w="20" />',
    },
    {
      name: 'HWordinate Icon',
      icon: <HWordinateIcn h="30" w="20" />,
      com: '<HWordinateIcn h="30" w="20" />',
    },
    {
      name: 'Image Icon',
      icon: <ImageIcn w="20" />,
      com: '<ImageIcn w="20" />',
    },
    {
      name: 'Inside Icon',
      icon: <InsideIcn size="30" />,
      com: '<InsideIcn size="30" />',
    },
    {
      name: 'ItemBlock Icon',
      icon: <ItemBlockIcn w="20" />,
      com: '<ItemBlockIcn w="20" />',
    },
    {
      name: 'Laptop Icon',
      icon: <LaptopIcn size="30" />,
      com: '<LaptopIcn size="30" />',
    },
    {
      name: 'Layer Icon',
      icon: <LayerIcon size="30" />,
      com: '<LayerIcon size="30" />',
    },
    {
      name: 'Mail Icon',
      icon: <MailIcn size="30" />,
      com: '<MailIcn size="30" />',
    },
    {
      name: 'Mail Open Icon',
      icon: <MailOpenIcn size="30" />,
      com: '<MailOpenIcn size="30" />',
    },
    {
      name: 'Mobile Icon',
      icon: <MobileIcon size="30" />,
      com: '<MobileIcon size="30" />',
    },
    {
      name: 'Month Icon',
      icon: <MonthIcn w="30" />,
      com: '<MonthIcn w="30" />',
    },
    {
      name: 'Move Icon',
      icon: <MoveIcn size="30" />,
      com: '<MoveIcn size="30" />',
    },
    {
      name: 'None Icon',
      icon: <NoneIcn size="30" />,
      com: '<NoneIcn size="30" />',
    },
    {
      name: 'Number Icon',
      icon: <NumberIcn w="30" />,
      com: '<NumberIcn w="30" />',
    },
    {
      name: 'Password Icon',
      icon: <PasswordIcn size="30" />,
      com: '<PasswordIcn size="30" />',
    },
    {
      name: 'Payments Icon',
      icon: <PaymentsIcn size="30" />,
      com: '<PaymentsIcn size="30" />',
    },
    {
      name: 'Paypal Icon',
      icon: <PaypalIcn w="30" />,
      com: '<PaypalIcn w="30" />',
    },
    {
      name: 'Question Icon',
      icon: <QuestionIcn size="30" />,
      com: '<QuestionIcn size="30" />',
    },
    {
      name: 'Question Icon',
      icon: <RadioIcn size="30" />,
      com: '<RadioIcn size="30" />',
    },
    {
      name: 'RazorPay Icon',
      icon: <RazorPayIcn w="20" h="25" />,
      com: '<RazorPayIcn w="20" h="25" />',
    },
    {
      name: 'ReCaptcha Icon',
      icon: <ReCaptchaIcn size="30" />,
      com: '<ReCaptchaIcn size="30" />',
    },
    {
      name: 'Redo Icon',
      icon: <RedoIcon size="30" />,
      com: '<RedoIcon size="30" />',
    },
    {
      name: 'Settings2 Icon',
      icon: <Settings2 size="30" />,
      com: '<Settings2 size="30" />',
    },
    {
      name: 'Settings Icon',
      icon: <SettingsIcn size="30" />,
      com: '<SettingsIcn size="30" />',
    },
    {
      name: 'Spread Icon',
      icon: <SpreadIcn size="30" />,
      com: '<SpreadIcn size="30" />',
    },
    {
      name: 'Tablet Icon',
      icon: <TabletIcon size="30" />,
      com: '<TabletIcon size="30" />',
    },
    {
      name: 'Textarea Icon',
      icon: <TextareaIcn size="30" />,
      com: '<TextareaIcn size="30" />',
    },
    {
      name: 'Text Icon',
      icon: <TextIcn size="30" />,
      com: '<TextIcn size="30" />',
    },
    {
      name: 'Time Icon',
      icon: <TimeIcn size="30" />,
      com: '<TimeIcn size="30" />',
    },
    {
      name: 'Trash Icon',
      icon: <TrashIcn size="30" />,
      com: '<TrashIcn size="30" />',
    },
    {
      name: 'Undo Icon',
      icon: <UndoIcon size="30" />,
      com: '<UndoIcon size="30" />',
    },
    {
      name: 'URL Icon',
      icon: <UrlIcn w="30" />,
      com: '<UrlIcn w="30" />',
    },
    {
      name: 'Week Icon',
      icon: <WeekIcn size="30" />,
      com: '<WeekIcn size="30" />',
    },
    {
      name: 'XYordinateIcn Icon',
      icon: <XYordinateIcn size="30" />,
      com: '<XYordinateIcn size="30" />',
    },
    {
      name: 'Youtube Icon',
      icon: <YoutubeIcn size="30" />,
      com: '<YoutubeIcn size="30" />',
    },
    {
      name: 'ChevronDown Icon',
      icon: <ChevronDownIcn size="30" />,
      com: '<ChevronDownIcn size="30" />',
    },
    {
      name: 'Eye Icon',
      icon: <EyeIcon size="30" />,
      com: '<EyeIcon size="30" />',
    },
    {
      name: 'Eye Off Icon',
      icon: <EyeOffIcon size="30" />,
      com: '<EyeOffIcon size="30" />',
    },
    {
      name: 'Chevron Right Icon',
      icon: <ChevronRightIcon size="30" />,
      com: '<ChevronRightIcon size="30" />',
    },
    {
      name: 'Search Icon',
      icon: <SearchIcon size="24" />,
      com: '<SearchIcon size="24" />',
    },
  ]
  return (
    <div className="flx">
      {icons.map((icn, i) => (
        <button key={`icon-id-${i * 2}`} onClick={copyVar} onKeyPress={KeyPressHandler} type="button" className="icon" data-component-name={icn.com}>
          {icn.icon}
        </button>
      ))}
    </div>
  )
}
