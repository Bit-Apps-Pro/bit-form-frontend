import { memo } from 'react'
import { useRecoilValue } from 'recoil'
import { $styles } from '../GlobalStates/StylesState'
import '../resource/sass/components.scss'
import AdvanceFileUp from './Fields/AdvanceFileUp'
import Button from './Fields/Button'
import CheckBox from './Fields/CheckBox'
import CountryField from './Fields/CountryField/CountryField'
import CurrencyField from './Fields/CurrencyField/CurrencyField'
import DecisionBox from './Fields/DecisionBox'
import Divider from './Fields/Divider'
import DropDown from './Fields/DropDown'
import FileUpload from './Fields/FileUpload/FileUpload'
import HiddenField from './Fields/HiddenField'
import Html from './Fields/Html'
import HtmlSelect from './Fields/HtmlSelect/HtmlSelect'
import Image from './Fields/Image'
import Paypal from './Fields/Paypal'
import RadioBox from './Fields/RadioBox'
import RazorPay from './Fields/RazorPay'
import ReCaptchaV2 from './Fields/ReCaptchaV2/ReCaptchaV2'
import SubmitBtn from './Fields/SubmitBtn'
import TextArea from './Fields/TextArea'
import TextField from './Fields/TextField'
import TitleField from './Fields/TitleField'

// import NewDropDown from './Fields/NewDropDown'
/*
typ: input type
lbl: label
cls: class
ph: placeholder
mn: min
mx: mix
val: default value
ac: autocomplete on/off
req: required
mul: multiple
*/

function MapComponents({ atts, fieldKey, formID, onBlurHandler, resetFieldValue, handleReset, fieldData, buttonDisabled, contentID, isBuilder, entryID, handleFormValidationErrorMessages }) {
  const styles = useRecoilValue($styles)
  switch (atts?.typ) {
    case 'text':
    case 'number':
    case 'password':
    case 'username':
    case 'email':
    case 'url':
    case 'date':
    case 'datetime-local':
    case 'time':
    case 'month':
    case 'week':
    case 'color':
      return <TextField fieldKey={fieldKey} styleClasses={styles.fields[fieldKey]?.classes} formID={formID} attr={atts} onBlurHandler={onBlurHandler} resetFieldValue={resetFieldValue} />
    case 'textarea':
      return <TextArea fieldKey={fieldKey} styleClasses={styles.fields[fieldKey]?.classes} formID={formID} attr={atts} onBlurHandler={onBlurHandler} resetFieldValue={resetFieldValue} />
    case 'check':
      return <CheckBox fieldKey={fieldKey} styleClasses={styles.fields[fieldKey]?.classes} formID={formID} attr={atts} onBlurHandler={onBlurHandler} resetFieldValue={resetFieldValue} />
    case 'radio':
      return <RadioBox fieldKey={fieldKey} styleClasses={styles.fields[fieldKey]?.classes} formID={formID} attr={atts} onBlurHandler={onBlurHandler} resetFieldValue={resetFieldValue} />
    case 'html-select':
      return <HtmlSelect fieldKey={fieldKey} styleClasses={styles.fields[fieldKey]?.classes} isBuilder={isBuilder} formID={formID} attr={atts} />
    case 'select':
      return <DropDown fieldKey={fieldKey} styleClasses={styles.fields[fieldKey]?.classes} isBuilder={isBuilder} formID={formID} attr={atts} onBlurHandler={onBlurHandler} resetFieldValue={resetFieldValue} />
    // case 'dropdown':
    //   return <NewDropDown isBuilder={isBuilder} formID={formID} attr={atts} onBlurHandler={onBlurHandler} resetFieldValue={resetFieldValue} />
    case 'file-up':
      return <FileUpload fieldKey={fieldKey} styleClasses={styles.fields[fieldKey]?.classes} formID={formID} attr={atts} entryID={entryID} resetFieldValue={resetFieldValue} />
    case 'advanced-file-up':
      return <AdvanceFileUp fieldKey={fieldKey} styleClasses={styles.fields[fieldKey]?.classes} formID={formID} attr={atts} entryID={entryID} resetFieldValue={resetFieldValue} />
    case 'submit':
      return <SubmitBtn fieldKey={fieldKey} styleClasses={styles.fields[fieldKey]?.classes} formID={formID} attr={atts} buttonDisabled={buttonDisabled} handleReset={handleReset} />
    case 'hidden':
      return <HiddenField fieldKey={fieldKey} styleClasses={styles.fields[fieldKey]?.classes} formID={formID} attr={atts} />
    case 'recaptcha':
      return <ReCaptchaV2 fieldKey={fieldKey} styleClasses={styles.fields[fieldKey]?.classes} formID={formID} attr={atts} />
    case 'decision-box':
      return <DecisionBox fieldKey={fieldKey} styleClasses={styles.fields[fieldKey]?.classes} formID={formID} attr={atts} fieldData={fieldData} resetFieldValue={resetFieldValue} />
    case 'html':
      return <Html fieldKey={fieldKey} styleClasses={styles.fields[fieldKey]?.classes} formID={formID} attr={atts} fieldData={fieldData} resetFieldValue={resetFieldValue} />
    case 'button':
      return <Button fieldKey={fieldKey} styleClasses={styles.fields[fieldKey]?.classes} formID={formID} attr={atts} fieldData={fieldData} buttonDisabled={buttonDisabled} handleReset={handleReset} />
    case 'paypal':
      return <Paypal isBuilder={isBuilder} styleClasses={styles.fields[fieldKey]?.classes} fieldKey={fieldKey} formID={formID} attr={atts} contentID={contentID} fieldData={fieldData} resetFieldValue={resetFieldValue} handleFormValidationErrorMessages={handleFormValidationErrorMessages} />
    case 'razorpay':
      return <RazorPay fieldKey={fieldKey} styleClasses={styles.fields[fieldKey]?.classes} contentID={contentID} formID={formID} attr={atts} buttonDisabled={buttonDisabled} resetFieldValue={resetFieldValue} handleFormValidationErrorMessages={handleFormValidationErrorMessages} />
    case 'title':
      return <TitleField fieldKey={fieldKey} styleClasses={styles.fields[fieldKey]?.classes} formID={formID} attr={atts} />
    case 'image':
      return <Image fieldKey={fieldKey} styleClasses={styles.fields[fieldKey]?.classes} formID={formID} attr={atts} />
    case 'divider':
      return <Divider fieldKey={fieldKey} styleClasses={styles.fields[fieldKey]?.classes} formID={formID} attr={atts} />
    case 'currency':
      return <CurrencyField fieldKey={fieldKey} styleClasses={styles.fields[fieldKey]?.classes} formID={formID} attr={atts} contentID={contentID} />
    case 'country':
      return <CountryField fieldKey={fieldKey} styleClasses={styles.fields[fieldKey]?.classes} formID={formID} attr={atts} contentID={contentID} />
    case 'blank':
      return <div className="blnk-blk drag" />
    default:
      break
  }
  return <div>Loading</div>
}

export default memo(MapComponents)
