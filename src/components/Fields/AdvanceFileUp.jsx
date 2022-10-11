/* eslint-disable import/no-duplicates */
/* eslint-disable func-names */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-props-no-spreading */
import bitAdvanceFileUploadField from 'bit-advance-file-upload-field'
import { create, destroy, registerPlugin, setOptions } from 'bit-file-pond'
import bitFilepondPluginFileValidateSize from 'bit-filepond-plugin-file-validate-size'
import bitFilepondPluginFileValidateTypeMin from 'bit-filepond-plugin-file-validate-type'
import bitFilepondPluginImageCropMin from 'bit-filepond-plugin-image-crop'
import bitFilepondPluginImagePreviewMin from 'bit-filepond-plugin-image-preview'
import bitFilepondPluginImageResizeMin from 'bit-filepond-plugin-image-resize'
import bitFilepondPluginImageTransformMin from 'bit-filepond-plugin-image-transform'
import bitFilepondPluginImageValidateSizeMin from 'bit-filepond-plugin-image-validate-size'
import bitFilepondPluginMediaPreviewMin from 'bit-filepond-plugin-media-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css'
import 'filepond/dist/filepond.min.css'
import { memo, useEffect, useRef, useState } from 'react'
import { useRecoilState } from 'recoil'
import { $fields } from '../../GlobalStates/GlobalStates'
import { selectAllInGrid, selectInGrid } from '../../Utils/globalHelpers'
import InputWrapper from '../InputWrapper'
import RenderStyle from '../style-new/RenderStyle'

function AdvanceFileUp({ attr, formID, fieldKey, styleClasses }) {
  const [fields] = useRecoilState($fields)
  const fieldData = fields[fieldKey]
  const { config } = fieldData
  const [fileChange, setFileChange] = useState(0)

  const advanceFileFieldRef = useRef(null)
  const container = useRef(null)

  useEffect(() => {
    const iFrameWindow = document.getElementById('bit-grid-layout').contentWindow
    if (!iFrameWindow.create) iFrameWindow.create = create
    if (!iFrameWindow.destroy) iFrameWindow.destroy = destroy
    if (!iFrameWindow.registerPlugin) iFrameWindow.registerPlugin = registerPlugin
    if (!iFrameWindow.setOptions) iFrameWindow.setOptions = setOptions

    if (!iFrameWindow.bit_filepond_plugin_image_preview) {
      iFrameWindow.bit_filepond_plugin_image_preview = bitFilepondPluginImagePreviewMin
    }
    if (!iFrameWindow.bit_filepond_plugin_file_validate_size) {
      iFrameWindow.bit_filepond_plugin_file_validate_size = bitFilepondPluginFileValidateSize
    }
    if (!iFrameWindow.bit_filepond_plugin_file_validate_type) {
      iFrameWindow.bit_filepond_plugin_file_validate_type = bitFilepondPluginFileValidateTypeMin
    }
    if (!iFrameWindow.bit_filepond_plugin_image_crop) {
      iFrameWindow.bit_filepond_plugin_image_crop = bitFilepondPluginImageCropMin
    }
    if (!iFrameWindow.bit_filepond_plugin_image_resize) {
      iFrameWindow.bit_filepond_plugin_image_resize = bitFilepondPluginImageResizeMin
    }
    if (!iFrameWindow.bit_filepond_plugin_image_transform) {
      iFrameWindow.bit_filepond_plugin_image_transform = bitFilepondPluginImageTransformMin
    }
    if (!iFrameWindow.bit_filepond_plugin_image_validate_size) {
      iFrameWindow.bit_filepond_plugin_image_validate_size = bitFilepondPluginImageValidateSizeMin
    }
    if (!iFrameWindow.bit_filepond_plugin_media_preview) {
      iFrameWindow.bit_filepond_plugin_media_preview = bitFilepondPluginMediaPreviewMin
    }

    const configuration = {
      configSetting: config,
      window: document.getElementById('bit-grid-layout').contentWindow,
      document: document.getElementById('bit-grid-layout').contentDocument,
      formID,
      ajaxURL: typeof bits === 'undefined' ? bitFromsFront?.ajaxURL : bits.ajaxURL,
      nonce: typeof bits === 'undefined' ? '' : bits.nonce,
      uploadFileToServer: true,
      onFileUpdate: () => setFileChange(pre => pre + 1),
    }

    if (!container?.current) {
      container.current = selectInGrid(`#filepond-${fieldKey}-container`)
    }
    const fldConstructor = advanceFileFieldRef.current
    const fldElm = container.current
    if (fldConstructor) {
      destroy(container.current)
      if (fldElm.firstChild) fldElm.removeChild(fldElm.firstChild)
    }
    advanceFileFieldRef.current = new bitAdvanceFileUploadField(fldElm, configuration)
    setFileChange(prv => prv + 1)
  }, [fieldData?.config])

  const addAttrAndClass = (selector, isMultiple = false) => {
    selectInGrid(`.${fieldKey}-inp-wrp .${selector}`)?.setAttribute(`data-dev-${selector}`, fieldKey)
    if (isMultiple) {
      const btnList = selectAllInGrid(`.${fieldKey}-inp-wrp .${selector}`)
      btnList.length > 0 && [...btnList].map(btn => {
        btn.setAttribute(`data-dev-${selector}`, fieldKey)
      })
    }
  }

  useEffect(() => {
    addAttrAndClass('filepond--root')
    addAttrAndClass('filepond--drop-label')
    addAttrAndClass('filepond--label-action')
    addAttrAndClass('filepond--panel-root')
    addAttrAndClass('filepond--item-panel', true)
    addAttrAndClass('filepond--file-action-button', true)
    addAttrAndClass('filepond--drip-blob')
    addAttrAndClass('filepond--file')
  }, [fileChange])

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
        <div ref={container} id={`filepond-${fieldKey}-container`} className={`filepond-${fieldKey}-container ${fieldData.valid.disabled ? 'disabled' : ''} ${fieldData.valid.readonly ? 'readonly' : ''}`} />
      </InputWrapper>
    </>
  )
}
export default memo(AdvanceFileUp)
