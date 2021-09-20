import { memo } from 'react'
import { useRecoilValue } from 'recoil'
import ReCaptcha from './Fields/Recaptcha'
import TextField from './Fields/TextField'
import TextArea from './Fields/TextArea'
import CheckBox from './Fields/CheckBox'
import DecisionBox from './Fields/DecisionBox'
import Html from './Fields/Html'
import RadioBox from './Fields/RadioBox'
import DropDown from './Fields/DropDown'
import FileUp from './Fields/FileUp'
import HiddenField from './Fields/HiddenField'
import SubmitBtn from './Fields/SubmitBtn'
import Button from './Fields/Button'
import Paypal from './Fields/Paypal'
import RazorPay from './Fields/RazorPay'
import { $styles } from '../GlobalStates'

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

function MapComponents({ atts, fieldKey, formID, onBlurHandler, resetFieldValue, handleReset, fieldData, buttonDisabled, contentID, isBuilder, entryID }) {
  const styles = useRecoilValue($styles)
  // console.log('--style', styles.fields[fieldKey], fieldKey)
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
    case 'select':
      return <DropDown fieldKey={fieldKey} isBuilder={isBuilder} formID={formID} attr={atts} onBlurHandler={onBlurHandler} resetFieldValue={resetFieldValue} />
    // case 'dropdown':
    //   return <NewDropDown isBuilder={isBuilder} formID={formID} attr={atts} onBlurHandler={onBlurHandler} resetFieldValue={resetFieldValue} />
    case 'file-up':
      return <FileUp fieldKey={fieldKey} formID={formID} attr={atts} entryID={entryID} resetFieldValue={resetFieldValue} />
    case 'submit':
      return <SubmitBtn fieldKey={fieldKey} formID={formID} attr={atts} buttonDisabled={buttonDisabled} handleReset={handleReset} />
    case 'hidden':
      return <HiddenField fieldKey={fieldKey} formID={formID} attr={atts} />
    case 'recaptcha':
      return <ReCaptcha fieldKey={fieldKey} formID={formID} attr={atts} />
    case 'decision-box':
      return <DecisionBox fieldKey={fieldKey} formID={formID} attr={atts} fieldData={fieldData} resetFieldValue={resetFieldValue} />
    case 'html':
      return <Html fieldKey={fieldKey} formID={formID} attr={atts} fieldData={fieldData} resetFieldValue={resetFieldValue} />
    case 'button':
      return <Button fieldKey={fieldKey} formID={formID} attr={atts} fieldData={fieldData} buttonDisabled={buttonDisabled} handleReset={handleReset} />
    case 'paypal':
      return <Paypal isBuilder={isBuilder} fieldKey={fieldKey} formID={formID} attr={atts} contentID={contentID} fieldData={fieldData} resetFieldValue={resetFieldValue} />
    case 'razorpay':
      return <RazorPay fieldKey={fieldKey} contentID={contentID} formID={formID} attr={atts} buttonDisabled={buttonDisabled} resetFieldValue={resetFieldValue} />
    case 'blank':
      return <div className="blnk-blk drag" />
    default:
      break
  }
  return <div>Loading</div>
}

export default memo(MapComponents)
