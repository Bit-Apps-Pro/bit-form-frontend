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
    const btnName = e.target.dataset.name
    navigator.clipboard.writeText(btnName)
  }
  const KeyPressHandler = (e) => {
    if (e.code === 'Enter') {
      copyVar(e)
    }
  }
  return (
    <div className="flx">
      <button onClick={copyVar} onKeyPress={KeyPressHandler} type="button" className="icon" data-name='<MenuIcon size="30" />'>
        <MenuIcon size="30" />
      </button>
      <button onClick={copyVar} onKeyPress={KeyPressHandler} type="button" className="icon" data-name='<AddIcon size="30" stroke="" />'>
        <AddIcon size="30" />
      </button>
      <button onClick={copyVar} onKeyPress={KeyPressHandler} type="button" className="icon" data-name='<APIIcon size="30" />'>
        <APIIcon size="30" />
      </button>
      <button onClick={copyVar} onKeyPress={KeyPressHandler} type="button" className="icon" data-name='<BackIcn size="30", stroke="", className="" />'>
        <BackIcn size="30" />
      </button>
      <button onClick={copyVar} onKeyPress={KeyPressHandler} type="button" className="icon" data-name='<BdrDashIcn size="30" />'>
        <BdrDashIcn size="30" />
      </button>
      <button onClick={copyVar} onKeyPress={KeyPressHandler} type="button" className="icon" data-name='<BdrDottedIcn size="30" />'>
        <BdrDottedIcn size="30" />
      </button>
      <button onClick={copyVar} onKeyPress={KeyPressHandler} type="button" className="icon" data-name='<BdrDoubleIcn size="30" />'>
        <BdrDoubleIcn size="30" />
      </button>
      <button onClick={copyVar} onKeyPress={KeyPressHandler} type="button" className="icon" data-name='<BdrSolidIcn size="30" />'>
        <BdrSolidIcn size="30" />
      </button>
      <button onClick={copyVar} onKeyPress={KeyPressHandler} type="button" className="icon" data-name='<BlurIcn h="25" w="17" />'>
        <BlurIcn h="25" w="17" />
      </button>
      <button onClick={copyVar} onKeyPress={KeyPressHandler} type="button" className="icon" data-name='<BrushIcn stroke="", height="", width="" />'>
        <BrushIcn height="30" />
      </button>
      <button onClick={copyVar} onKeyPress={KeyPressHandler} type="button" className="icon" data-name='<BtnIcn size="30" />'>
        <BtnIcn size="30" />
      </button>
      <button onClick={copyVar} onKeyPress={KeyPressHandler} type="button" className="icon" data-name='<CheckBoxIcn w="30" />'>
        <CheckBoxIcn w="30" />
      </button>
      <button onClick={copyVar} onKeyPress={KeyPressHandler} type="button" className="icon" data-name='<CloseIcn size="30", stroke="", className="" />'>
        <CloseIcn size="30" />
      </button>
      <button onClick={copyVar} onKeyPress={KeyPressHandler} type="button" className="icon" data-name='<CodeSnippetIcn size="30" />'>
        <CodeSnippetIcn size="30" />
      </button>
      <button onClick={copyVar} onKeyPress={KeyPressHandler} type="button" className="icon" data-name='<ColorIcn  h="30", w="20", className="", style={} />'>
        <ColorIcn w="30" h="20" />
      </button>
      <button onClick={copyVar} onKeyPress={KeyPressHandler} type="button" className="icon" data-name='<ColorPickerIcn w="30" />'>
        <ColorPickerIcn w="30" />
      </button>
      <button onClick={copyVar} onKeyPress={KeyPressHandler} type="button" className="icon" data-name='<CopyIcn size="30" stroke ="" />'>
        <CopyIcn size="30" />
      </button>
      <button onClick={copyVar} onKeyPress={KeyPressHandler} type="button" className="icon" data-name='<CPTIcn size="30" />'>
        <CPTIcn size="30" />
      </button>
      <button onClick={copyVar} onKeyPress={KeyPressHandler} type="button" className="icon" data-name='<DateIcn w="30" />'>
        <DateIcn w="30" />
      </button>
      <button onClick={copyVar} onKeyPress={KeyPressHandler} type="button" className="icon" data-name='<DateTimeIcn w="30" />'>
        <DateTimeIcn w="30" />
      </button>
      <button onClick={copyVar} onKeyPress={KeyPressHandler} type="button" className="icon" data-name='<DecisionBoxIcn size="30" />'>
        <DecisionBoxIcn size="30" />
      </button>
      <button onClick={copyVar} onKeyPress={KeyPressHandler} type="button" className="icon" data-name='<DocIcn size="30" className="" />'>
        <DocIcn size="30" />
      </button>
      <button onClick={copyVar} onKeyPress={KeyPressHandler} type="button" className="icon" data-name='<DownloadIcon size="30" />'>
        <DownloadIcon size="30" />
      </button>
      <button onClick={copyVar} onKeyPress={KeyPressHandler} type="button" className="icon" data-name='<DropDownIcn w="30" />'>
        <DropDownIcn w="30" />
      </button>
      <button onClick={copyVar} onKeyPress={KeyPressHandler} type="button" className="icon" data-name='<EditIcn size="30" className="", stroke="" />'>
        <EditIcn size="30" />
      </button>
      <button onClick={copyVar} onKeyPress={KeyPressHandler} type="button" className="icon" data-name='<EditIcon size="30" stroke="" />'>
        <EditIcon size="30" />
      </button>
      <button onClick={copyVar} onKeyPress={KeyPressHandler} type="button" className="icon" data-name='<EllipsisIcon size="30" stroke="" />'>
        <EllipsisIcon size="30" />
      </button>
      <button onClick={copyVar} onKeyPress={KeyPressHandler} type="button" className="icon" data-name='<FieldIcn w="30" />'>
        <FieldIcn w="30" />
      </button>
      <button onClick={copyVar} onKeyPress={KeyPressHandler} type="button" className="icon" data-name='<FileUploadIcn w="30" />'>
        <FileUploadIcn w="30" />
      </button>
      <button onClick={copyVar} onKeyPress={KeyPressHandler} type="button" className="icon" data-name='<FlagIcn size="30" />'>
        <FlagIcn size="30" />
      </button>
      <button onClick={copyVar} onKeyPress={KeyPressHandler} type="button" className="icon" data-name='<FormIcn w="30" />'>
        <FormIcn w="30" />
      </button>
      <button onClick={copyVar} onKeyPress={KeyPressHandler} type="button" className="icon" data-name='<GoogleAdIcn size="30" />'>
        <GoogleAdIcn size="30" />
      </button>
      <button onClick={copyVar} onKeyPress={KeyPressHandler} type="button" className="icon" data-name='<HeightIcn h="30" />'>
        <HeightIcn h="30" />
      </button>
      <button onClick={copyVar} onKeyPress={KeyPressHandler} type="button" className="icon" data-name='<HoneypotIcn h="30" w="20" />'>
        <HoneypotIcn h="30" w="20" />
      </button>
      <button onClick={copyVar} onKeyPress={KeyPressHandler} type="button" className="icon" data-name='<HWordinateIcn h="30" w="20"className="" style="" />'>
        <HWordinateIcn h="30" w="20" />
      </button>
      <button onClick={copyVar} onKeyPress={KeyPressHandler} type="button" className="icon" data-name='<ImageIcn w="20" />'>
        <ImageIcn w="20" />
      </button>
      <button onClick={copyVar} onKeyPress={KeyPressHandler} type="button" className="icon" data-name='<InsideIcn size="30" />'>
        <InsideIcn size="30" />
      </button>
      <button onClick={copyVar} onKeyPress={KeyPressHandler} type="button" className="icon" data-name='<ItemBlockIcn w="20" />'>
        <ItemBlockIcn w="20" />
      </button>
      <button onClick={copyVar} onKeyPress={KeyPressHandler} type="button" className="icon" data-name='<LaptopIcn size="30" stroke="" />'>
        <LaptopIcn size="30" />
      </button>
      <button onClick={copyVar} onKeyPress={KeyPressHandler} type="button" className="icon" data-name='<LayerIcon size="30" stroke="" />'>
        <LayerIcon size="30" />
      </button>
      <button onClick={copyVar} onKeyPress={KeyPressHandler} type="button" className="icon" data-name='<MailIcn size="30" />'>
        <MailIcn size="30" />
      </button>
      <button onClick={copyVar} onKeyPress={KeyPressHandler} type="button" className="icon" data-name='<MailOpenIcn size="30" />'>
        <MailOpenIcn size="30" />
      </button>
      <button onClick={copyVar} onKeyPress={KeyPressHandler} type="button" className="icon" data-name='<MobileIcon size="30" stroke="" />'>
        <MobileIcon size="30" />
      </button>
      <button onClick={copyVar} onKeyPress={KeyPressHandler} type="button" className="icon" data-name='<MonthIcn w="30" />'>
        <MonthIcn w="30" />
      </button>
      <button onClick={copyVar} onKeyPress={KeyPressHandler} type="button" className="icon" data-name='<MoveIcn size="30" stroke=""/>'>
        <MoveIcn size="30" />
      </button>
      <button onClick={copyVar} onKeyPress={KeyPressHandler} type="button" className="icon" data-name='<NoneIcn size="30" />'>
        <NoneIcn size="30" />
      </button>
      <button onClick={copyVar} onKeyPress={KeyPressHandler} type="button" className="icon" data-name='<NumberIcn w="30" />'>
        <NumberIcn w="30" />
      </button>
      <button onClick={copyVar} onKeyPress={KeyPressHandler} type="button" className="icon" data-name='<PasswordIcn size="30" />'>
        <PasswordIcn size="30" />
      </button>
      <button onClick={copyVar} onKeyPress={KeyPressHandler} type="button" className="icon" data-name='<PaymentsIcn size="30" className="" />'>
        <PaymentsIcn size="30" />
      </button>
      <button onClick={copyVar} onKeyPress={KeyPressHandler} type="button" className="icon" data-name='<PaypalIcn w="30" />'>
        <PaypalIcn w="30" />
      </button>
      <button onClick={copyVar} onKeyPress={KeyPressHandler} type="button" className="icon" data-name='<QuestionIcn size="30" stroke="" />'>
        <QuestionIcn size="30" />
      </button>
      <button onClick={copyVar} onKeyPress={KeyPressHandler} type="button" className="icon" data-name='<RadioIcn size="30" />'>
        <RadioIcn size="30" />
      </button>
      <button onClick={copyVar} onKeyPress={KeyPressHandler} type="button" className="icon" data-name='<RazorPayIcn w="20" h="25" />'>
        <RazorPayIcn w="20" h="25" />
      </button>
      <button onClick={copyVar} onKeyPress={KeyPressHandler} type="button" className="icon" data-name='<ReCaptchaIcn size="30" className="", stroke="" />'>
        <ReCaptchaIcn size="30" />
      </button>
      <button onClick={copyVar} onKeyPress={KeyPressHandler} type="button" className="icon" data-name='<RedoIcon size="30" stroke="" />'>
        <RedoIcon size="30" />
      </button>
      <button onClick={copyVar} onKeyPress={KeyPressHandler} type="button" className="icon" data-name='<Settings2 size="30" />'>
        <Settings2 size="30" />
      </button>
      <button onClick={copyVar} onKeyPress={KeyPressHandler} type="button" className="icon" data-name='<SettingsIcn size="30" stroke="" />'>
        <SettingsIcn size="30" />
      </button>
      <button onClick={copyVar} onKeyPress={KeyPressHandler} type="button" className="icon" data-name='<SpreadIcn size="30" />'>
        <SpreadIcn size="30" />
      </button>
      <button onClick={copyVar} onKeyPress={KeyPressHandler} type="button" className="icon" data-name='<TabletIcon size="30" stroke="" />'>
        <TabletIcon size="30" />
      </button>
      <button onClick={copyVar} onKeyPress={KeyPressHandler} type="button" className="icon" data-name='<TextareaIcn size="30" />'>
        <TextareaIcn size="30" />
      </button>
      <button onClick={copyVar} onKeyPress={KeyPressHandler} type="button" className="icon" data-name='<TextIcn size="30" />'>
        <TextIcn size="30" />
      </button>
      <button onClick={copyVar} onKeyPress={KeyPressHandler} type="button" className="icon" data-name='<TimeIcn size="30" />'>
        <TimeIcn size="30" />
      </button>
      <button onClick={copyVar} onKeyPress={KeyPressHandler} type="button" className="icon" data-name='<TrashIcn size="30" stroke="" />'>
        <TrashIcn size="30" />
      </button>
      <button onClick={copyVar} onKeyPress={KeyPressHandler} type="button" className="icon" data-name='<UndoIcon size="30" stroke="" />'>
        <UndoIcon size="30" />
      </button>
      <button onClick={copyVar} onKeyPress={KeyPressHandler} type="button" className="icon" data-name='<UrlIcn w="30" />'>
        <UrlIcn w="30" />
      </button>
      <button onClick={copyVar} onKeyPress={KeyPressHandler} type="button" className="icon" data-name='<WeekIcn size="30" />'>
        <WeekIcn size="30" />
      </button>
      <button onClick={copyVar} onKeyPress={KeyPressHandler} type="button" className="icon" data-name='<XYordinateIcn size="30" />'>
        <XYordinateIcn size="30" />
      </button>
      <button onClick={copyVar} onKeyPress={KeyPressHandler} type="button" className="icon" data-name='<YoutubeIcn size="30" color="" className />'>
        <YoutubeIcn size="30" />
      </button>
    </div>
  )
}
