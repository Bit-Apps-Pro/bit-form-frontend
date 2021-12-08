/* eslint-disable func-names */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-props-no-spreading */
import { useEffect, memo } from 'react'
import { create, registerPlugin, setOptions } from 'filepond'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import FilePondPluginImageValidateSize from 'filepond-plugin-image-validate-size'
import FilePondPluginImageResize from 'filepond-plugin-image-resize'
import FilePondPluginImageCrop from 'filepond-plugin-image-crop'
import FilePondPluginMediaPreview from 'filepond-plugin-media-preview'
import FilePondPluginImageTransform from 'filepond-plugin-image-transform'
import { useParams } from 'react-router-dom'

import { useRecoilState } from 'recoil'
import { $fields } from '../../GlobalStates'
import 'filepond/dist/filepond.min.css'

import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css'
// import 'filepond-plugin-media-preview/dist/filepond-plugin-media-preview.min.css'
import InputWrapper from '../InputWrapper'
import { deepCopy } from '../../Utils/Helpers'
import { selectInGrid } from '../../Utils/globalHelpers'

function AdvanceFileUp({ attr, formID, fieldKey }) {
  const { fieldKey: fldKey } = useParams()
  const [fields] = useRecoilState($fields)
  const fieldData = deepCopy(fields[fldKey])
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

    const pond = create(fieldData?.config)
    selectInGrid(`#${fieldKey}`).appendChild(pond.element)
    const uri = new URL(typeof bits === 'undefined' ? bitFromsFront?.ajaxURL : bits.ajaxURL)
    uri.searchParams.append('action', 'bitforms_file_store')
    uri.searchParams.append('_ajax_nonce', typeof bits === 'undefined' ? '' : bits.nonce)

    const removeFile = new URL(typeof bits === 'undefined' ? bitFromsFront?.ajaxURL : bits.ajaxURL)
    removeFile.searchParams.append('action', 'bitforms_file_remove')
    removeFile.searchParams.append('_ajax_nonce', typeof bits === 'undefined' ? '' : bits.nonce)
    removeFile.searchParams.append('form_id', formID)

    setOptions({
      server: {
        process: (fieldName, file, load, error, progress, abort) => {
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
  }, [])

  return (
    <>
      {/* <input type="file" className="filepond" name="filepond" /> */}
      <InputWrapper
        formID={formID}
        fieldKey={attr.name}
        fieldData={attr}
      >
        <input
          hidden
          id="filepond"
          type="file"
          className="filepond"
          name="filepond"
        />
        <div id={`${fieldKey}`} />

      </InputWrapper>
    </>
  )
}
export default memo(AdvanceFileUp)
