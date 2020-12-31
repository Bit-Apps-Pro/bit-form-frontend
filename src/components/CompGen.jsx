import ReCaptcha from './Fields/Recaptcha'
import TextField from './Fields/TextField'
import TextArea from './Fields/TextArea'
import CheckBox from './Fields/CheckBox'
import RadioBox from './Fields/RadioBox'
import DropDown from './Fields/DropDown'
import FileUp from './Fields/FileUp'
import HiddenField from './Fields/HiddenField'
import SubmitBtn from './Fields/SubmitBtn'
import Paypal from './Fields/Paypal'
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

function CompGen(props) {
  switch (props.atts.typ) {
    case 'text':
    case 'number':
    case 'password':
    case 'email':
    case 'url':
    case 'date':
    case 'datetime-local':
    case 'time':
    case 'month':
    case 'week':
    case 'color':

      return <TextField formID={props.formID} attr={props.atts} onBlurHandler={props.onBlurHandler} resetFieldValue={props.resetFieldValue} />
    case 'textarea':
      return <TextArea formID={props.formID} attr={props.atts} onBlurHandler={props.onBlurHandler} resetFieldValue={props.resetFieldValue} />
    case 'check':
      return <CheckBox formID={props.formID} attr={props.atts} onBlurHandler={props.onBlurHandler} resetFieldValue={props.resetFieldValue} />
    case 'radio':
      return <RadioBox formID={props.formID} attr={props.atts} onBlurHandler={props.onBlurHandler} resetFieldValue={props.resetFieldValue} />
    case 'select':
      return <DropDown dev formID={props.formID} attr={props.atts} onBlurHandler={props.onBlurHandler} resetFieldValue={props.resetFieldValue} />
    case 'file-up':
      return <FileUp formID={props.formID} attr={props.atts} entryID={props.entryID} resetFieldValue={props.resetFieldValue} />
    case 'submit':
      return <SubmitBtn formID={props.formID} attr={props.atts} buttonDisabled={props.buttonDisabled} handleReset={props.handleReset} />
    case 'hidden':
      return <HiddenField formID={props.formID} attr={props.atts} />
    case 'recaptcha':
      return <ReCaptcha formID={props.formID} attr={props.atts} />
    case 'paypal':
      return <Paypal formID={props.formID} attr={props.atts} />
    case 'blank':
      return <div className="blnk-blk drag" />
    default:
      break
  }

  return <div>None</div>
}

export default CompGen
