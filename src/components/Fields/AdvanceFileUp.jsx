/* eslint-disable func-names */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-props-no-spreading */
import { create, destroy, registerPlugin, setOptions } from 'filepond'
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import FilePondPluginImageCrop from 'filepond-plugin-image-crop'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css'
import FilePondPluginImageResize from 'filepond-plugin-image-resize'
import FilePondPluginImageTransform from 'filepond-plugin-image-transform'
import FilePondPluginImageValidateSize from 'filepond-plugin-image-validate-size'
import FilePondPluginMediaPreview from 'filepond-plugin-media-preview'
import 'filepond/dist/filepond.min.css'
import { memo, useEffect, useRef } from 'react'
import { useRecoilState } from 'recoil'
import { $fields } from '../../GlobalStates/GlobalStates'
import AdvanceFileUpload from '../../resource/js/advance-file-upload'
import { selectInGrid } from '../../Utils/globalHelpers'
// import 'filepond-plugin-media-preview/dist/filepond-plugin-media-preview.min.css'
import InputWrapper from '../InputWrapper'
import RenderStyle from '../style-new/RenderStyle'

function AdvanceFileUp({ attr, formID, fieldKey, styleClasses }) {
  const [fields] = useRecoilState($fields)
  const fieldData = fields[fieldKey]
  const { config } = fieldData

  const advanceFileFieldRef = useRef(null)
  const container = useRef(null)

  useEffect(() => {
    registerPlugin(
      FilePondPluginImagePreview,
      FilePondPluginFileValidateSize,
      FilePondPluginImageValidateSize,
      FilePondPluginFileValidateType,
      FilePondPluginImageResize,
      FilePondPluginImageCrop,
      FilePondPluginMediaPreview,
      FilePondPluginImageTransform,
    )

    const configuration = {
      configSetting: config,
      document,
      formID,
      registerPlugin: [
        { key: 'filepond-plugin-file-validate-size', val: 'FilePondPluginFileValidateSize' },
        { key: 'filepond-plugin-file-validate-type', val: 'FilePondPluginFileValidateType' },
        { key: 'filepond-plugin-image-crop', val: 'FilePondPluginImageCrop' },
        { key: 'filepond-plugin-image-preview', val: 'FilePondPluginImagePreview' },
        { key: 'filepond-plugin-image-resize', val: 'FilePondPluginImageResize' },
        { key: 'filepond-plugin-image-transform', val: 'FilePondPluginImageTransform' },
        { key: 'filepond-plugin-image-validate-size', val: 'FilePondPluginImageValidateSize' },
        { key: 'filepond-plugin-media-preview', val: 'FilePondPluginMediaPreview' },
      ],
      ajaxURL: typeof bits === 'undefined' ? bitFromsFront?.ajaxURL : bits.ajaxURL,
      nonce: typeof bits === 'undefined' ? '' : bits.nonce,
      uploadFileToServer: true,
    }

    if (!container?.current) {
      container.current = selectInGrid(`#filepond-${fieldKey}-container`)
    }
    const fldConstructor = advanceFileFieldRef.current
    const fldElm = container.current
    if (fldConstructor.current?.element) {
      destroy(fldConstructor.current.element)
      if (container.firstChild) container.removeChild(container.firstChild)
    }

    // filePondRef.current = create(fieldData?.config)

    selectInGrid(`.${fieldKey}-fld-wrp .filepond--root`)?.setAttribute('data-dev-pond-root', fieldKey)
    selectInGrid(`.${fieldKey}-fld-wrp .filepond--drop-label`)?.setAttribute('data-dev-pond-drop-lbl', fieldKey)
    selectInGrid(`.${fieldKey}-fld-wrp .filepond--label-action`)?.setAttribute('data-dev-pond-lbl-action', fieldKey)
    selectInGrid(`.${fieldKey}-fld-wrp .filepond--panel-root`)?.setAttribute('data-dev-pond-panel-root', fieldKey)
    selectInGrid(`.${fieldKey}-fld-wrp .filepond--item-panel`)?.setAttribute('data-dev-pond-item-panel', fieldKey)
    selectInGrid(`.${fieldKey}-fld-wrp .filepond--file-action-button`)?.setAttribute('data-dev-pond-action-btn', fieldKey)
    selectInGrid(`.${fieldKey}-fld-wrp .filepond--drip-blob`)?.setAttribute('data-dev-pond-drip-blob', fieldKey)
    selectInGrid(`.${fieldKey}-fld-wrp .filepond--file`)?.setAttribute('data-dev-pond-file', fieldKey)

    container.current = new AdvanceFileUpload(fldElm, configuration)
    advanceFileFieldRef.current.appendChild(container.current.element)
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
