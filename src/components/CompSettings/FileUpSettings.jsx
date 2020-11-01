/* eslint-disable no-param-reassign */
import SingleInput from '../ElmSettings/Childs/SingleInput';
import SingleToggle from '../ElmSettings/Childs/SingleToggle'
import DropDown from '../ElmSettings/Childs/DropDown'
import CopyText from '../ElmSettings/Childs/CopyText'
import Back2FldList from './Back2FldList'

export default function FileUpSettings(props) {
  console.log('%c $render FileUpSettings', 'background:gray;padding:3px;border-radius:5px;color:white')

  const isRequired = props.elm.data.valid.req !== undefined
  const isMultiple = props.elm.data.mul !== undefined
  const label = props.elm.data.lbl === undefined ? '' : props.elm.data.lbl
  const { upBtnTxt } = props.elm.data
  const mxUp = props.elm.data.mxUp === undefined ? '' : props.elm.data.mxUp
  const exts = props.elm.data.exts === undefined ? [] : props.elm.data.exts.split(',._RF_,')
  const fldKey = props.elm.id
  const options = [
    { label: 'Images', value: '.xbm,.tif,.pjp,.pjpeg,.svgz,.jpg,.jpeg,.ico,.tiff,.gif,.svg,.bmp,.png,.jfif,.webp,.tif' },
    { label: 'Audios', value: '.opus,.flac,.webm,.weba,.wav,.ogg,.m4a,.mp3,.oga,.mid,.amr,.aiff,.wma,.au,.acc,.wpl' },
    { label: 'Videos', value: '.ogm,.wmv,.mpg,.webm,.ogv,.mov,.asx,.mpeg,.mp4,.m4v,.avi,.3g2,.3gp,.flv,.mkv,.swf' },
    { label: 'Documents', value: '.doc,.docx,.odt,.pdf,.rtf,.tex,.txt,.wks,.wps,.wpd' },
    { label: 'Zip', value: '.7z,.arj,.deb,.pkg,.rar,.rpm,.gz,.z,.zip' },
    { label: 'Presentation', value: '.key,.odp,.pps,.ppt,.pptx' },
    { label: 'Spreadsheet', value: '.ods,.xlr,.xls,.xlsx' },
    { label: 'Databases', value: '.csv,.dat,.db,.dbf,.log,.mdb,.sav,.sql,.tar,.sql,.sqlite,.xml' },
  ]

  function setRequired(e) {
    if (e.target.checked) {
      props.elm.data.valid.req = true
    } else {
      delete props.elm.data.valid.req
    }
    props.updateData(props.elm)
  }

  function setMultiple(e) {
    if (e.target.checked) {
      props.elm.data.mul = true
    } else {
      delete props.elm.data.mul
    }
    props.updateData(props.elm)
  }

  function setLabel(e) {
    if (e.target.value === '') {
      delete props.elm.data.lbl
    } else {
      props.elm.data.lbl = e.target.value
    }
    props.updateData(props.elm)
  }

  function setUpBtnTxt(e) {
    props.elm.data.upBtnTxt = e.target.value
    props.updateData(props.elm)
  }

  function setMxUp(e) {
    if (e.target.value === '') {
      delete props.elm.data.mxUp
    } else {
      props.elm.data.mxUp = e.target.value
    }
    props.updateData(props.elm)
  }

  function setFileFilter(value) {
    const val = value.map(itm => itm.value)
    if (val.join(',') === '') {
      delete props.elm.data.exts
    } else {
      props.elm.data.exts = val.join(',._RF_,')
    }
    props.updateData(props.elm)
  }

  return (
    <div className="ml-2 mr-4">
      <Back2FldList setElementSetting={props.setElementSetting} />
      <div className="mb-2">
        <span className="font-w-m">Field Type : </span>
        {' '}
        File Upload
      </div>
      <div className="mt-1">
        <span className="font-w-m">Field Key</span>
        <CopyText value={fldKey} setSnackbar={() => { }} className="field-key-cpy" />
      </div>
      <SingleToggle title="Required:" action={setRequired} isChecked={isRequired} className="mt-2" />
      <SingleInput inpType="text" title="Label:" value={label} action={setLabel} />
      <SingleInput inpType="text" title="Upload Button Text:" value={upBtnTxt} action={setUpBtnTxt} />
      <SingleInput inpType="number" title="Max Upload Size:" value={mxUp} action={setMxUp} placeholder="Any Size" />
      <SingleToggle title="Allow Multiple:" action={setMultiple} isChecked={isMultiple} className="mt-5" />
      <DropDown className="mt-2" titleClassName="mt-3 setting-inp" title="Allowed File Type:" isMultiple addable options={options} placeholder="Select File Type" jsonValue action={setFileFilter} value={exts} />
    </div>
  )
}
