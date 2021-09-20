/* eslint-disable jsx-a11y/no-redundant-roles */
/* eslint-disable react/button-has-type */
import { useState } from 'react'
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
import ChevronLeft from '../Icons/ChevronLeft'
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
  const [searchIcon, setSearchIcon] = useState([])
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
  const searchHandler = (e) => {
    const val = e.target.value

    if (val !== '') {
      const items = icons.filter((itm) => (itm.key.toLowerCase().includes(val.toLowerCase())))
      setSearchIcon([...items])
    } else {
      setSearchIcon([])
    }
  }
  const icons = [
    {
      key: 'Menu Icon',
      icon: <MenuIcon size="30" />,
      com: '<MenuIcon size="30" />',
    },
    {
      key: 'Add Icon',
      icon: <AddIcon size="30" />,
      com: '<AddIcon size="30" />',
    },
    {
      key: 'API Icon',
      icon: <APIIcon size="30" />,
      com: '<APIIcon size="30" />',
    },
    {
      key: 'Back or left arrow Icon',
      icon: <BackIcn size="30" />,
      com: '<BackIcn size="30" />',
    },
    {
      key: 'Broder Desh Icon',
      icon: <BdrDashIcn size="30" />,
      com: '<BdrDashIcn size="30" />',
    },
    {
      key: 'Broder Dotted Icon',
      icon: <BdrDottedIcn size="30" />,
      com: '<BdrDottedIcn size="30" />',
    },
    {
      key: 'Broder Double Icon',
      icon: <BdrDoubleIcn size="30" />,
      com: '<BdrDoubleIcn size="30" />',
    },
    {
      key: 'Broder Solid Icon',
      icon: <BdrSolidIcn size="30" />,
      com: '<BdrSolidIcn size="30" />',
    },
    {
      key: 'Blur Icon',
      icon: <BlurIcn h="25" w="17" />,
      com: '<BlurIcn h="25" w="17" />',
    },
    {
      key: 'Brush Icon',
      icon: <BrushIcn height="30" />,
      com: '<BrushIcn height="30" />',
    },
    {
      key: 'Button Icon',
      icon: <BtnIcn size="30" />,
      com: '<BtnIcn size="30" />',
    },
    {
      key: 'CheckBox Icon',
      icon: <CheckBoxIcn w="30" />,
      com: '<CheckBoxIcn w="30" />',
    },
    {
      key: 'Close Icon',
      icon: <CloseIcn size="30" />,
      com: '<CloseIcn size="30" />',
    },
    {
      key: 'Code Snippet Icon',
      icon: <CodeSnippetIcn size="30" />,
      com: '<CodeSnippetIcn size="30" />',
    },
    {
      key: 'Color Icon',
      icon: <ColorIcn w="30" h="20" />,
      com: '<ColorIcn w="30" h="20" />',
    },
    {
      key: 'Color Picker Icon',
      icon: <ColorPickerIcn w="30" />,
      com: '<ColorPickerIcn w="30" />',
    },
    {
      key: 'Copy Icon',
      icon: <CopyIcn w="30" />,
      com: '<CopyIcn w="30" />',
    },
    {
      key: 'CPT Icon',
      icon: <CPTIcn size="30" />,
      com: '<CPTIcn size="30" />',
    },
    {
      key: 'Data Icon',
      icon: <DateIcn w="30" />,
      com: '<DateIcn w="30" />',
    },
    {
      key: 'Data Time Icon',
      icon: <DateTimeIcn w="30" />,
      com: '<DateTimeIcn w="30" />',
    },
    {
      key: 'Decision Box Icon',
      icon: <DecisionBoxIcn size="30" />,
      com: '<DecisionBoxIcn size="30" />',
    },
    {
      key: 'Doc Icon',
      icon: <DocIcn size="30" />,
      com: '<DocIcn size="30" />',
    },
    {
      key: 'Download Icon',
      icon: <DownloadIcon size="30" />,
      com: '<DownloadIcon size="30" />',
    },
    {
      key: 'DropDown Icon',
      icon: <DropDownIcn w="30" />,
      com: '<DropDownIcn w="30" />',
    },
    {
      key: 'Edit Icon',
      icon: <EditIcn size="30" />,
      com: '<EditIcn size="30" />',
    },
    {
      key: 'Edit Icon',
      icon: <EditIcon size="30" />,
      com: '<EditIcon size="30" />',
    },
    {
      key: 'Ellipsis Icon',
      icon: <EllipsisIcon size="30" />,
      com: '<EllipsisIcon size="30" />',
    },
    {
      key: 'Field Icon',
      icon: <FieldIcn size="30" />,
      com: '<FieldIcn size="30" />',
    },
    {
      key: 'FileupLoad Icon',
      icon: <FileUploadIcn w="30" />,
      com: '<FileUploadIcn w="30" />',
    },
    {
      key: 'Flag Icon',
      icon: <FlagIcn size="30" />,
      com: '<FlagIcn size="30" />',
    },
    {
      key: 'Form Icon',
      icon: <FormIcn w="30" />,
      com: '<FormIcn w="30" />',
    },
    {
      key: 'Google ADI Icon',
      icon: <GoogleAdIcn size="30" />,
      com: '<GoogleAdIcn size="30" />',
    },
    {
      key: 'Height Icon',
      icon: <HeightIcn h="30" />,
      com: '<HeightIcn h="30" />',
    },
    {
      key: 'Honeypot Icon',
      icon: <HoneypotIcn h="30" w="20" />,
      com: '<HoneypotIcn h="30" w="20" />',
    },
    {
      key: 'HWordinate Icon',
      icon: <HWordinateIcn h="30" w="20" />,
      com: '<HWordinateIcn h="30" w="20" />',
    },
    {
      key: 'Image Icon',
      icon: <ImageIcn w="20" />,
      com: '<ImageIcn w="20" />',
    },
    {
      key: 'Inside Icon',
      icon: <InsideIcn size="30" />,
      com: '<InsideIcn size="30" />',
    },
    {
      key: 'ItemBlock Icon',
      icon: <ItemBlockIcn w="20" />,
      com: '<ItemBlockIcn w="20" />',
    },
    {
      key: 'Laptop Icon',
      icon: <LaptopIcn size="30" />,
      com: '<LaptopIcn size="30" />',
    },
    {
      key: 'Layer Icon',
      icon: <LayerIcon size="30" />,
      com: '<LayerIcon size="30" />',
    },
    {
      key: 'Mail Icon',
      icon: <MailIcn size="30" />,
      com: '<MailIcn size="30" />',
    },
    {
      key: 'Mail Open Icon',
      icon: <MailOpenIcn size="30" />,
      com: '<MailOpenIcn size="30" />',
    },
    {
      key: 'Mobile Icon',
      icon: <MobileIcon size="30" />,
      com: '<MobileIcon size="30" />',
    },
    {
      key: 'Month Icon',
      icon: <MonthIcn w="30" />,
      com: '<MonthIcn w="30" />',
    },
    {
      key: 'Move Icon',
      icon: <MoveIcn size="30" />,
      com: '<MoveIcn size="30" />',
    },
    {
      key: 'None Icon',
      icon: <NoneIcn size="30" />,
      com: '<NoneIcn size="30" />',
    },
    {
      key: 'Number Icon',
      icon: <NumberIcn w="30" />,
      com: '<NumberIcn w="30" />',
    },
    {
      key: 'Password Icon',
      icon: <PasswordIcn size="30" />,
      com: '<PasswordIcn size="30" />',
    },
    {
      key: 'Payments Icon',
      icon: <PaymentsIcn size="30" />,
      com: '<PaymentsIcn size="30" />',
    },
    {
      key: 'Paypal Icon',
      icon: <PaypalIcn w="30" />,
      com: '<PaypalIcn w="30" />',
    },
    {
      key: 'Question Icon',
      icon: <QuestionIcn size="30" />,
      com: '<QuestionIcn size="30" />',
    },
    {
      key: 'Question Icon',
      icon: <RadioIcn size="30" />,
      com: '<RadioIcn size="30" />',
    },
    {
      key: 'RazorPay Icon',
      icon: <RazorPayIcn w="20" h="25" />,
      com: '<RazorPayIcn w="20" h="25" />',
    },
    {
      key: 'ReCaptcha Icon',
      icon: <ReCaptchaIcn size="30" />,
      com: '<ReCaptchaIcn size="30" />',
    },
    {
      key: 'Redo Icon',
      icon: <RedoIcon size="30" />,
      com: '<RedoIcon size="30" />',
    },
    {
      key: 'Settings2 Icon',
      icon: <Settings2 size="30" />,
      com: '<Settings2 size="30" />',
    },
    {
      key: 'Settings Icon',
      icon: <SettingsIcn size="30" />,
      com: '<SettingsIcn size="30" />',
    },
    {
      key: 'Spread Icon',
      icon: <SpreadIcn size="30" />,
      com: '<SpreadIcn size="30" />',
    },
    {
      key: 'Tablet Icon',
      icon: <TabletIcon size="30" />,
      com: '<TabletIcon size="30" />',
    },
    {
      key: 'Textarea Icon',
      icon: <TextareaIcn size="30" />,
      com: '<TextareaIcn size="30" />',
    },
    {
      key: 'Text Icon',
      icon: <TextIcn size="30" />,
      com: '<TextIcn size="30" />',
    },
    {
      key: 'Time Icon',
      icon: <TimeIcn size="30" />,
      com: '<TimeIcn size="30" />',
    },
    {
      key: 'Trash Icon',
      icon: <TrashIcn size="30" />,
      com: '<TrashIcn size="30" />',
    },
    {
      key: 'Undo Icon',
      icon: <UndoIcon size="30" />,
      com: '<UndoIcon size="30" />',
    },
    {
      key: 'URL Icon',
      icon: <UrlIcn w="30" />,
      com: '<UrlIcn w="30" />',
    },
    {
      key: 'Week Icon',
      icon: <WeekIcn size="30" />,
      com: '<WeekIcn size="30" />',
    },
    {
      key: 'XYordinateIcn Icon',
      icon: <XYordinateIcn size="30" />,
      com: '<XYordinateIcn size="30" />',
    },
    {
      key: 'Youtube Icon',
      icon: <YoutubeIcn size="30" />,
      com: '<YoutubeIcn size="30" />',
    },
    {
      key: 'Chevron Down arrow Icon',
      icon: <ChevronDownIcn size="30" />,
      com: '<ChevronDownIcn size="30" />',
    },
    {
      key: 'Chevron Left arrow Icon',
      icon: <ChevronLeft size="24" />,
      com: '<ChevronLeft size="30" />',
    },
    {
      key: 'Eye Icon',
      icon: <EyeIcon size="30" />,
      com: '<EyeIcon size="30" />',
    },
    {
      key: 'Eye Off Icon',
      icon: <EyeOffIcon size="30" />,
      com: '<EyeOffIcon size="30" />',
    },
    {
      key: 'Chevron Right Icon',
      icon: <ChevronRightIcon size="30" />,
      com: '<ChevronRightIcon size="30" />',
    },
    {
      key: 'Search Icon',
      icon: <SearchIcon size="24" />,
      com: '<SearchIcon size="24" />',
    },
  ]
  return (
    <>
      <div className="icn-search flx">
        <input type="text" placeholder="Search Icon" onChange={searchHandler} />
      </div>

      {searchIcon
        && (
          <div className="flx">
            {searchIcon.map((icn, i) => (
              <button key={`icon-id-${i * 5}`} onClick={copyVar} onKeyPress={KeyPressHandler} type="button" className="icon" data-component-name={icn.com}>
                {icn.icon}
              </button>
            ))}
          </div>
        )}

      {searchIcon.length === 0
        && (
          <div className="flx">
            {icons.map((icn, i) => (
              <button key={`icon-id-${i * 2}`} onClick={copyVar} onKeyPress={KeyPressHandler} type="button" className="icon" data-component-name={icn.com}>
                {icn.icon}
              </button>
            ))}
          </div>
        )}
    </>
  )
}
