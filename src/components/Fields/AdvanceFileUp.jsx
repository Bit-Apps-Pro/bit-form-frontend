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
import { selectInGrid } from '../../Utils/globalHelpers'
// import 'filepond-plugin-media-preview/dist/filepond-plugin-media-preview.min.css'
import InputWrapper from '../InputWrapper'
import RenderStyle from '../style-new/RenderStyle'

function AdvanceFileUp({ attr, formID, fieldKey, styleClasses }) {
  const [fields] = useRecoilState($fields)
  const fieldData = fields[fieldKey]

  const filePondRef = useRef(null)

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

    const container = selectInGrid(`#filepond-${fieldKey}-container`)

    if (filePondRef.current?.element) {
      destroy(filePondRef.current.element)
      if (container.firstChild) container.removeChild(container.firstChild)
    }

    filePondRef.current = create(fieldData?.config)

    container.appendChild(filePondRef.current.element)

    selectInGrid(`.${fieldKey}-fld-wrp .filepond--root`)?.setAttribute('data-dev-pond-root', fieldKey)
    selectInGrid(`.${fieldKey}-fld-wrp .filepond--drop-label`)?.setAttribute('data-dev-pond-drop-lbl', fieldKey)
    selectInGrid(`.${fieldKey}-fld-wrp .filepond--label-action`)?.setAttribute('data-dev-pond-lbl-action', fieldKey)
    selectInGrid(`.${fieldKey}-fld-wrp .filepond--panel-root`)?.setAttribute('data-dev-pond-panel-root', fieldKey)
    selectInGrid(`.${fieldKey}-fld-wrp .filepond--item-panel`)?.setAttribute('data-dev-pond-item-panel', fieldKey)
    selectInGrid(`.${fieldKey}-fld-wrp .filepond--file-action-button`)?.setAttribute('data-dev-pond-action-btn', fieldKey)
    selectInGrid(`.${fieldKey}-fld-wrp .filepond--drip-blob`)?.setAttribute('data-dev-pond-drip-blob', fieldKey)
    selectInGrid(`.${fieldKey}-fld-wrp .filepond--file`)?.setAttribute('data-dev-pond-file', fieldKey)

    const uri = new URL(typeof bits === 'undefined' ? bitFromsFront?.ajaxURL : bits.ajaxURL)
    uri.searchParams.append('action', 'bitforms_file_store')
    uri.searchParams.append('_ajax_nonce', typeof bits === 'undefined' ? '' : bits.nonce)

    const removeFile = new URL(typeof bits === 'undefined' ? bitFromsFront?.ajaxURL : bits.ajaxURL)
    removeFile.searchParams.append('action', 'bitforms_file_remove')
    removeFile.searchParams.append('_ajax_nonce', typeof bits === 'undefined' ? '' : bits.nonce)
    removeFile.searchParams.append('form_id', formID)

    setOptions({
      server: {
        process: (fieldName, file, metadata, load, error, progress, abort) => {
          const formData = new FormData()
          formData.append(`${fieldName}`, file, file.name)
          formData.append('form_id', formID)
          const request = new XMLHttpRequest()
          request.open('POST', uri.href)
          request.upload.onprogress = (e) => {
            progress(e.lengthComputable, e.loaded, e.total)
          }
          request.onload = function () {
            if (request.status >= 200 && request.status < 300) {
              const response = JSON.parse(request.responseText)
              load(response.data)
            } else {
              error('oh no')
            }
          }

          request.send(formData)

          // Should expose an abort method so the request can be cancelled
          return {
            abort: () => {
              request.abort()

              abort()
            },
          }
        },
        revert: removeFile.href,
      },
    })
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
          {...'disabled' in fieldData && { disabled: fieldData.disabled }}
          {...'readonly' in fieldData && { readOnly: fieldData.readonly }}
        />
        <div id={`filepond-${fieldKey}-container`} className={`filepond-${fieldKey}-container ${fieldData.disabled ? 'disabled' : ''} ${fieldData.readonly ? 'readonly' : ''}`} />

      </InputWrapper>
    </>
  )
}
export default memo(AdvanceFileUp)
