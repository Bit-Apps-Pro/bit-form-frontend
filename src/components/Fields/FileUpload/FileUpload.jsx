/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect, useRef } from 'react'
import { useRecoilValue } from 'recoil'
import { $fields } from '../../../GlobalStates/GlobalStates'
import { selectInGrid } from '../../../Utils/globalHelpers'
import InputWrapper from '../../InputWrapper'
import RenderStyle from '../../style-new/RenderStyle'
import FileUploadField from './file-upload-script'

export default function FileUpload({ fieldKey, formID, styleClasses }) {
  const fileUploadWrapElmRef = useRef(null)
  const fileUploadFieldRef = useRef(null)
  const fields = useRecoilValue($fields)
  const fieldData = fields[fieldKey]
  const assetsUrl = bits.assetsURL

  useEffect(() => {
    if (!fileUploadWrapElmRef?.current) {
      fileUploadWrapElmRef.current = selectInGrid(`.${fieldKey}-file-up-wrpr`)
    }
    const fldConstructor = fileUploadFieldRef.current
    const fldElm = fileUploadWrapElmRef.current
    if (fldConstructor && fldElm && 'destroy' in fldConstructor) {
      fldConstructor.destroy()
    }

    const { multiple, showMaxSize, maxSize, sizeUnit, isItTotalMax, showSelectStatus, fileSelectStatus, allowedFileType, showFileList, showFilePreview, showFileSize, duplicateAllow, accept, minFile, maxFile } = fieldData.config

    const configOptions = {
      fieldKey,
      multiple,
      showMaxSize,
      maxSize,
      sizeUnit,
      isItTotalMax,
      showSelectStatus,
      fileSelectStatus,
      allowedFileType,
      showFileList,
      showFilePreview,
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
          <div data-dev-file-up-wrpr={fieldKey} className={`${fieldKey}-file-up-wrpr`} ref={fileUploadWrapElmRef}>
            <div data-dev-file-input-wrpr={fieldKey} className={`${fieldKey}-file-input-wrpr`}>
              <div data-dev-btn-wrpr={fieldKey} className={`${fieldKey}-btn-wrpr`}>
                <button data-dev-inp-btn={fieldKey} type="button" className={`${fieldKey}-inp-btn`}>
                  { fieldData.prefixIcn && <img data-dev-pre-i={fieldKey} className={`${fieldKey}-pre-i`} src={`${fieldData.prefixIcn}`} alt="Upload icon" srcSet="" />}
                  <span data-dev-btn-txt={fieldKey} className={`${fieldKey}-btn-txt`}>{fieldData.btnTxt}</span>
                  { fieldData.suffixIcn && <img data-dev-suf-i={fieldKey} className={`${fieldKey}-suf-i`} src={`${fieldData.suffixIcn}`} alt="Upload icon" srcSet="" />}
                </button>
                { fieldData.config.showSelectStatus && <div data-dev-file-select-status={fieldKey} className={`${fieldKey}-file-select-status`}>No Choosen File</div>}
                { fieldData.config.showMaxSize && fieldData.config.maxSize !== 0 && (<small data-dev-max-size-lbl={fieldKey} className={`${fieldKey}-max-size-lbl`}>{`(Max ${fieldData.config.maxSize}${fieldData.config.sizeUnit})`}</small>)}
                <input
                  type="file"
                  className={`${fieldKey}-file-upload-input`}
                  id={fieldKey}
                  name="file-upload"
                  fieldData
                  {...'disabled' in fieldData && { disabled: fieldData.disabled }}
                />
              </div>
              <div data-dev-files-list={fieldKey} className={`${fieldKey}-files-list`} />
            </div>
            <div className={`${fieldKey}-err-wrp`} />
          </div>
        </div>
      </InputWrapper>
    </>

  )
}
