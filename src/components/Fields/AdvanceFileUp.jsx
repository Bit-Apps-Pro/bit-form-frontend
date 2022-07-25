/* eslint-disable import/no-duplicates */
/* eslint-disable func-names */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-props-no-spreading */
import { create, destroy, registerPlugin, setOptions } from 'filepond'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css'

import bitFilepondPluginFileValidateSize from 'bit-filepond-plugin-file-validate-size'
import bitFilepondPluginFileValidateTypeMin from 'bit-filepond-plugin-file-validate-type'
import bitFilepondPluginImageCropMin from 'bit-filepond-plugin-image-crop'
import bitFilepondPluginImagePreviewMin from 'bit-filepond-plugin-image-preview'
import bitFilepondPluginImageResizeMin from 'bit-filepond-plugin-image-resize'
import bitFilepondPluginImageTransformMin from 'bit-filepond-plugin-image-transform'
import bitFilepondPluginImageValidateSizeMin from 'bit-filepond-plugin-image-validate-size'
import bitFilepondPluginMediaPreviewMin from 'bit-filepond-plugin-media-preview'
import 'filepond/dist/filepond.min.css'
import { memo, useEffect, useRef } from 'react'
import { useRecoilState } from 'recoil'
import bitAdvanceFileUploadField from 'bit-advance-file-upload-field'
import { $fields } from '../../GlobalStates/GlobalStates'
import { selectInGrid } from '../../Utils/globalHelpers'
import InputWrapper from '../InputWrapper'
import RenderStyle from '../style-new/RenderStyle'

function AdvanceFileUp({ attr, formID, fieldKey, styleClasses }) {
  const [fields] = useRecoilState($fields)
  const fieldData = fields[fieldKey]
  const { config } = fieldData

  const advanceFileFieldRef = useRef(null)
  const container = useRef(null)

  useEffect(() => {
    if (!window.create) window.create = create
    if (!window.registerPlugin) window.registerPlugin = registerPlugin
    if (!window.setOptions) window.setOptions = setOptions

    if (!window.FilePondPluginImagePreview) {
      window.FilePondPluginImagePreview = bitFilepondPluginImagePreviewMin
    }
    if (!window.FilePondPluginFileValidateSize) {
      window.FilePondPluginFileValidateSize = bitFilepondPluginFileValidateSize
    }
    if (!window.FilePondPluginFileValidateType) {
      window.FilePondPluginFileValidateType = bitFilepondPluginFileValidateTypeMin
    }
    if (!window.FilePondPluginImageCrop) {
      window.FilePondPluginImageCrop = bitFilepondPluginImageCropMin
    }
    if (!window.FilePondPluginImageResize) {
      window.FilePondPluginImageResize = bitFilepondPluginImageResizeMin
    }
    if (!window.FilePondPluginImageTransform) {
      window.FilePondPluginImageTransform = bitFilepondPluginImageTransformMin
    }
    if (!window.FilePondPluginImageValidateSize) {
      window.FilePondPluginImageValidateSize = bitFilepondPluginImageValidateSizeMin
    }
    if (!window.FilePondPluginMediaPreview) {
      window.FilePondPluginMediaPreview = bitFilepondPluginMediaPreviewMin
    }

    const configuration = {
      configSetting: config,
      document,
      formID,
      ajaxURL: typeof bits === 'undefined' ? bitFromsFront?.ajaxURL : bits.ajaxURL,
      nonce: typeof bits === 'undefined' ? '' : bits.nonce,
      uploadFileToServer: true,
    }

    if (!container?.current) {
      container.current = selectInGrid(`#filepond-${fieldKey}-container`)
    }
    const fldConstructor = advanceFileFieldRef.current
    const fldElm = container.current
    if (fldConstructor?.element) {
      destroy(fldConstructor.element)
      if (container.firstChild) container.removeChild(container.firstChild)
    }

    selectInGrid(`.${fieldKey}-fld-wrp .filepond--root`)?.setAttribute('data-dev-pond-root', fieldKey)
    selectInGrid(`.${fieldKey}-fld-wrp .filepond--drop-label`)?.setAttribute('data-dev-pond-drop-lbl', fieldKey)
    selectInGrid(`.${fieldKey}-fld-wrp .filepond--label-action`)?.setAttribute('data-dev-pond-lbl-action', fieldKey)
    selectInGrid(`.${fieldKey}-fld-wrp .filepond--panel-root`)?.setAttribute('data-dev-pond-panel-root', fieldKey)
    selectInGrid(`.${fieldKey}-fld-wrp .filepond--item-panel`)?.setAttribute('data-dev-pond-item-panel', fieldKey)
    selectInGrid(`.${fieldKey}-fld-wrp .filepond--file-action-button`)?.setAttribute('data-dev-pond-action-btn', fieldKey)
    selectInGrid(`.${fieldKey}-fld-wrp .filepond--drip-blob`)?.setAttribute('data-dev-pond-drip-blob', fieldKey)
    selectInGrid(`.${fieldKey}-fld-wrp .filepond--file`)?.setAttribute('data-dev-pond-file', fieldKey)

    // TODO set the filepond packages to window global
    container.current = new bitAdvanceFileUploadField(fldElm, configuration)
  }, [fieldData?.config])

  return (
    <>
      <RenderStyle styleClasses={styleClasses} />
      <InputWrapper
        formID={formID}
        fieldKey={fieldKey}
        fieldData={attr}
      >
        <input
          hidden
          id={fieldKey}
          type="file"
          className="filepond"
          name="filepond"
          {...'disabled' in fieldData.valid && { disabled: fieldData.valid.disabled }}
          {...'readonly' in fieldData.valid && { readOnly: fieldData.valid.readonly }}
        />
        <div useRef={container} id={`filepond-${fieldKey}-container`} className={`filepond-${fieldKey}-container ${fieldData.disabled ? 'disabled' : ''} ${fieldData.readonly ? 'readonly' : ''}`} />
      </InputWrapper>
    </>
  )
}
export default memo(AdvanceFileUp)
