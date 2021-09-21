/* eslint-disable camelcase */
/* eslint-disable react/jsx-pascal-case */
import { memo } from 'react'
import ReCaptcha_old from './FieldsOld/Recaptcha_old'
import TextField_old from './FieldsOld/TextField_old'
import TextArea_old from './FieldsOld/TextArea_old'
import CheckBox_old from './FieldsOld/CheckBox_old'
import DecisionBox_old from './FieldsOld/DecisionBox_old'
import Html_old from './FieldsOld/Html_old'
import RadioBox_old from './FieldsOld/RadioBox_old'
import DropDown_old from './FieldsOld/DropDown_old'
import FileUp_old from './FieldsOld/FileUp_old'
import HiddenField_old from './FieldsOld/HiddenField_old'
import SubmitBtn_old from './FieldsOld/SubmitBtn_old'
import Button_old from './FieldsOld/Button_old'
import Paypal_old from './FieldsOld/Paypal_old'
import RazorPay_old from './FieldsOld/RazorPay_old'
import '../resource/sass/components_old.scss'

// import NewDropDown from './FieldsOld/NewDropDown'
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

function MapComponents_old({ atts, fieldKey, formID, onBlurHandler, resetFieldValue, handleReset, fieldData, buttonDisabled, contentID, isBuilder, entryID }) {
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
      return <TextField_old fieldKey={fieldKey} formID={formID} attr={atts} onBlurHandler={onBlurHandler} resetFieldValue={resetFieldValue} />
    case 'textarea':
      return <TextArea_old fieldKey={fieldKey} formID={formID} attr={atts} onBlurHandler={onBlurHandler} resetFieldValue={resetFieldValue} />
    case 'check':
      return <CheckBox_old fieldKey={fieldKey} formID={formID} attr={atts} onBlurHandler={onBlurHandler} resetFieldValue={resetFieldValue} />
    case 'radio':
      return <RadioBox_old fieldKey={fieldKey} formID={formID} attr={atts} onBlurHandler={onBlurHandler} resetFieldValue={resetFieldValue} />
    case 'select':
      return <DropDown_old fieldKey={fieldKey} isBuilder={isBuilder} formID={formID} attr={atts} onBlurHandler={onBlurHandler} resetFieldValue={resetFieldValue} />
    // case 'dropdown':
    //   return <NewDropDown isBuilder={isBuilder} formID={formID} attr={atts} onBlurHandler={onBlurHandler} resetFieldValue={resetFieldValue} />
    case 'file-up':
      return <FileUp_old fieldKey={fieldKey} formID={formID} attr={atts} entryID={entryID} resetFieldValue={resetFieldValue} />
    case 'submit':
      return <SubmitBtn_old fieldKey={fieldKey} formID={formID} attr={atts} buttonDisabled={buttonDisabled} handleReset={handleReset} />
    case 'hidden':
      return <HiddenField_old fieldKey={fieldKey} formID={formID} attr={atts} />
    case 'recaptcha':
      return <ReCaptcha_old fieldKey={fieldKey} formID={formID} attr={atts} />
    case 'decision-box':
      return <DecisionBox_old fieldKey={fieldKey} formID={formID} attr={atts} fieldData={fieldData} resetFieldValue={resetFieldValue} />
    case 'html':
      return <Html_old fieldKey={fieldKey} formID={formID} attr={atts} fieldData={fieldData} resetFieldValue={resetFieldValue} />
    case 'button':
      return <Button_old fieldKey={fieldKey} formID={formID} attr={atts} fieldData={fieldData} buttonDisabled={buttonDisabled} handleReset={handleReset} />
    case 'paypal':
      return <Paypal_old isBuilder={isBuilder} fieldKey={fieldKey} formID={formID} attr={atts} contentID={contentID} fieldData={fieldData} resetFieldValue={resetFieldValue} />
    case 'razorpay':
      return <RazorPay_old fieldKey={fieldKey} contentID={contentID} formID={formID} attr={atts} buttonDisabled={buttonDisabled} resetFieldValue={resetFieldValue} />
    case 'blank':
      return <div className="blnk-blk drag" />
    default:
      break
  }
  return <div>Loading</div>
}

export default memo(MapComponents_old)
