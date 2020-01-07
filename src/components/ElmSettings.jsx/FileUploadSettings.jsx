/* eslint-disable no-param-reassign */
import React from 'react'
import Label from './Childs/Label'
import SingleInput from './Childs/SingleInput'
import SingleToggle from './Childs/SingleToggle'
import DropDown from './Childs/DropDown'

export default function FileUploadSettings(props) {
  const label = props.elm.data.child[0].child
  const isRequired = props.elm.data.child[1].child[0].child[3].attr.required
  const isMultiple = props.elm.data.child[1].child[0].child[3].attr.multiple
  let exts = props.elm.data.child[1].child[0].child[3].attr.accept
  if (typeof exts !== 'undefined' && exts !== null) { console.log('yes'); exts = exts.split(',._RF_,') }
  const uploadBtnTxt = props.elm.data.child[1].child[0].child[0].child[1].child
  let maxSize = props.elm.data.child[1].child[0].child[2].child.replace(/\D/g, '')
  maxSize = maxSize !== '' && Number(maxSize)

  const options = [
    { name: 'Images', value: '.xbm,.tif,.pjp,.pjpeg,.svgz,.jpg,.jpeg,.ico,.tiff,.gif,.svg,.bmp,.png,.jfif,.webp,.tif' },
    { name: 'Audios', value: '.opus,.flac,.webm,.weba,.wav,.ogg,.m4a,.mp3,.oga,.mid,.amr,.aiff,.wma,.au,.acc,.wpl' },
    { name: 'Videos', value: '.ogm,.wmv,.mpg,.webm,.ogv,.mov,.asx,.mpeg,.mp4,.m4v,.avi,.3g2,.3gp,.flv,.mkv,.swf' },
    { name: 'Documents', value: '.doc,.docx,.odt,.pdf,.rtf,.tex,.txt,.wks,.wps,.wpd' },
    { name: 'Zip', value: '.7z,.arj,.deb,.pkg,.rar,.rpm,.gz,.z,.zip' },
    { name: 'Presentation', value: '.key,.odp,.pps,.ppt,.pptx' },
    { name: 'Spreadsheet', value: '.ods,.xlr,.xls,.xlsx' },
    { name: 'Databases', value: '.csv,.dat,.db,.dbf,.log,.mdb,.sav,.sql,.tar,.sql,.sqlite,.xml' },
  ]

  function setRequired(e) {
    props.elm.data.child[1].child[0].child[3].attr.required = e.target.checked
    props.updateData(props.elm)
  }

  function setMultiple(e) {
    props.elm.data.child[1].child[0].child[3].attr.multiple = e.target.checked
    props.updateData(props.elm)
  }

  function setuploadBtnTxt(e) {
    props.elm.data.child[1].child[0].child[0].child[1].child = e.target.value
    props.updateData(props.elm)
  }

  function setMaxUpload(e) {
    if (e.target.value === '') {
      props.elm.data.child[1].child[0].child[2].child = ''
    } else {
      props.elm.data.child[1].child[0].child[2].child = ` (Max ${e.target.value} MB)`
    }
    props.updateData(props.elm)
  }

  function setFileFilter(e) {
    const val = []
    for (let i = 0; i < e.target.selectedOptions.length; i += 1) {
      val.push(e.target.selectedOptions[i].value)
    }
    if (val.join(',') === '') {
      delete props.elm.data.child[1].child[0].child[3].attr.accept
    } else {
      props.elm.data.child[1].child[0].child[3].attr.accept = val.join(',._RF_,')
    }
    console.log(val.join(',._RF_,'))
    console.log(val.join(',._RF_,').split(',._RF_,'))
    props.updateData(props.elm)
  }
  // console.log(props.elm.data.child[1].child[0].child[3].attr)

  // NEED TO SET DEFAULT VALUE

  return (
    <div>
      <h4>File Upload Settings</h4>
      <SingleToggle title="Required: " isChecked={isRequired} action={setRequired} />
      <Label label={label} elm={props.elm} updateData={props.updateData} />
      <SingleInput title="Upload Button Text:" value={uploadBtnTxt} action={setuploadBtnTxt} />
      <SingleInput title="Max Upload Size:" inpType="number" value={maxSize} action={setMaxUpload} placeholder="Any Size" />
      <SingleToggle title="Allow Multiple: " isChecked={isMultiple} action={setMultiple} className="mt-3" />
      {isMultiple && <DropDown title="Allowed File Type:" isMultiple addable options={options} placeholder="Any File Type" searchPH="Search or Add ext (e.g: .jpg,.png)" action={setFileFilter} value={exts} />}
    </div>
  )
}