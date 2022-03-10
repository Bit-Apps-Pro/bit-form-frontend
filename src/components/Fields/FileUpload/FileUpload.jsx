/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect, useRef, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { $fields } from '../../../GlobalStates/GlobalStates'
import { selectInGrid } from '../../../Utils/globalHelpers'
import InputWrapper from '../../InputWrapper'
import RenderStyle from '../../style-new/RenderStyle'
import FileUploadField from './file-upload'

export default function FileUpload({ fieldKey, formID, attr, entryID, resetFieldValue, styleClasses }) {
  const fileUploadWrapElmRef = useRef(null)
  const fileUploadFieldRef = useRef(null)
  const fields = useRecoilValue($fields)
  const fieldData = fields[fieldKey]
  const assetsUrl = bits.assetsURL

  console.log('re render', fieldData)

  useEffect(() => {
    if (!fileUploadWrapElmRef?.current) {
      fileUploadWrapElmRef.current = selectInGrid(`.${fieldKey}-file-up-wrpr`)
    }
    const fldConstructor = fileUploadFieldRef.current
    const fldElm = fileUploadWrapElmRef.current
    if (fldConstructor && fldElm && 'destroy' in fldConstructor) {
      fldConstructor.destroy()
    }

    const { multiple, maxSize, sizeUnit, isItTotalMax, fileSelectStatus, allowedFileType, showFileList, showFileSize, duplicateAllow, accept, minFile, maxFile } = fieldData.config

    const configOptions = {
      fieldKey,
      multiple,
      maxSize,
      sizeUnit,
      isItTotalMax,
      fileSelectStatus,
      allowedFileType,
      showFileList,
      showFileSize,
      duplicateAllow,
      accept,
      minFile,
      maxFile,
    }

    fileUploadFieldRef.current = new FileUploadField(fldElm, configOptions)
  }, [fieldData])

  return (
    <>
      <RenderStyle styleClasses={styleClasses} />
      <InputWrapper
        formID={formID}
        fieldKey={fieldKey}
        fieldData={fieldData}
      >
        <div className={`${fieldKey}-file-up-container`}>
          {/* <label className={`${fieldKey}-lbl`}>
            File Upload
            <span className={`${fieldKey}-file-require-symbol`}>*</span>
          </label> */}
          <div className={`${fieldKey}-file-up-wrpr`} ref={fileUploadWrapElmRef}>
            <div className={`${fieldKey}-file-input-wrpr`}>
              <div className={`${fieldKey}-btn-wrpr`}>
                <button type="button" className={`${fieldKey}-inp-btn`}>
                  <img className={`${fieldKey}-btn-icn`} src={`${fieldData.btnIcn}`} alt="Upload icon" srcSet="" />
                  <span className={`${fieldKey}-btn-lbl`}>{fieldData.btnTxt}</span>
                </button>
                <div className={`${fieldKey}-file-select-status`}>No Choosen File</div>
                <small className={`${fieldKey}-max-size-lbl`}>Max 2MB</small>
              </div>
              <input type="file" className={`${fieldKey}-file-upload-input`} id="file-upload" name="file-upload" />
              <div className={`${fieldKey}-files-list`} />
            </div>
            <div className={`${fieldKey}-err-wrp`} />
          </div>
        </div>
      </InputWrapper>
      {/* <div className="btcd-f-input">
          <div className="btcd-f-wrp">
            <div className="btn-wrp">
              <button className="btcd-inpBtn" type="button">
                <svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" width="15" height="15"><path d="M13.5 7.5l-5.757 5.757a4.243 4.243 0 01-6-6l5.929-5.929a2.828 2.828 0 014 4l-5.758 5.758a1.414 1.414 0 01-2-2L9.5 3.5" stroke="currentColor" /></svg>
                <span>{` ${attr.upBtnTxt}`}</span>
              </button>
              <div className="btcd-f-title">No File Chosen</div>
              <small className="f-max">{'mxUp' in attr && ` (Max ${attr.mxUp} ${attr.unit || 'MB'})`}</small>
            </div>
            <input
              {...'req' in attr.valid && { required: attr.valid.req }}
              {...'disabled' in attr.valid && { disabled: attr.valid.disabled }}
              {...'mul' in attr && { multiple: true }}
              {...'exts' in attr && { accept: attr.exts }}
              {...'name' in attr && { name: 'mul' in attr ? `${attr.name}[]` : attr.name }}
              type="file"
              onClick={setPrevData}
              onChange={e => onFileChange(e)}
            />
            {attr.val !== undefined && (
              <div className="btcd-old-file">
                <input type="hidden" name={`${attr.name}_old`} value={filelist.toString()} />
                {filelist !== false && filelist.length !== 0 && (
                  <div className="mt-2">
                    <small>
                      {filelist.length}
                      {' '}
                      Old File
                    </small>
                  </div>
                )}
                {filelist.map((itm, i) => (
                  <div key={`ol-f-${i + 3}`} className="flx ">
                    <a href={typeof bits !== 'undefined' ? `${bits.baseDLURL}formID=${formID}&entryID=${entryID}&fileID=${itm}` : ''} target="_blank" rel="noopener noreferrer">
                      <span className="btcd-icn icn-file" />
                      {' '}
                      {itm}
                    </a>
                    <button onClick={() => rmvFile(i)} type="button" className="icn-btn">&times;</button>
                  </div>
                ))}
              </div>
            )}
            <div ref={delBtnRef} className="btcd-files" />
          </div>
        </div> */}
    </>

  )
}
