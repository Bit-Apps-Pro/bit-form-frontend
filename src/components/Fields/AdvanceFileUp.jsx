/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-props-no-spreading */
import { useState, useEffect, createRef, memo } from 'react'
import { create, registerPlugin, setOptions } from 'filepond'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import FilePondPluginImageValidateSize from 'filepond-plugin-image-validate-size'
import FilePondPluginImageResize from 'filepond-plugin-image-resize'
import FilePondPluginImageCrop from 'filepond-plugin-image-crop'
import FilePondPluginMediaPreview from 'filepond-plugin-media-preview'
import FilePondPluginImageTransform from 'filepond-plugin-image-transform';

import { useRecoilState, useRecoilValue } from 'recoil'
import { $fields, $selectedFieldId } from '../../GlobalStates'
import 'filepond/dist/filepond.min.css'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css'
// import 'filepond-plugin-media-preview/dist/filepond-plugin-media-preview.min.css'
import InputWrapper from '../InputWrapper'
import { deepCopy } from '../../Utils/Helpers'

function AdvanceFileUp({ attr, formID }) {
  const fldKey = useRecoilValue($selectedFieldId)
  const [fields, setFields] = useRecoilState($fields)
  const fieldData = deepCopy(fields[fldKey])

  useEffect(() => {
    const inputElement = document.querySelector('input[type="file"]')
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
    create(inputElement, fieldData?.config)
    const uri = new URL(typeof bits === 'undefined' ? bitFromsFront?.ajaxURL : bits.ajaxURL)
    uri.searchParams.append('action', 'bitforms_file_store')
    uri.searchParams.append('_ajax_nonce', typeof bits === 'undefined' ? '' : bits.nonce)

    const removeFile = new URL(typeof bits === 'undefined' ? bitFromsFront?.ajaxURL : bits.ajaxURL)
    removeFile.searchParams.append('action', 'bitforms_file_remove')
    removeFile.searchParams.append('_ajax_nonce', typeof bits === 'undefined' ? '' : bits.nonce)
    removeFile.searchParams.append('form_id', formID)

    setOptions({
      server: {
        process: (fieldName, file, metadata, load, error, progress, abort, transfer, options) => {

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
              console.log(load(response))
              load(response.data)
            } else {
              error('oh no')
            }
          };

          request.send(formData)

          // Should expose an abort method so the request can be cancelled
          return {
            abort: () => {
              console.log('cancel..')
              // This function is entered if the user has tapped the cancel button
              request.abort()

              // Let FilePond know the request has been cancelled
              abort()
            },
          };
        },
        revert: removeFile.href,
      },
    })

  }, [])

  const delBtnRef = createRef()
  const [filelist, setfilelist] = useState(attr.val !== undefined && JSON.parse(attr.val))

  const onFileChange = e => {
    handleFile(e)
    // set del action
    if (e.target.files.length) {
      for (let i = 0; i < delBtnRef.current.children.length; i += 1) {
        delBtnRef.current.children[i].children[2].addEventListener('click', ev => {
          delItem(ev.target)
        })
      }
    }
  }

  const rmvFile = (idx) => {
    const tmp = [...filelist]
    tmp.splice(idx, 1)
    setfilelist(tmp)
  }

  return (
    <>
      {/* <input type="file" className="filepond" name="filepond" /> */}
      <InputWrapper
        formID={formID}
        fieldKey={attr.name}
        fieldData={attr}
      >
        <input
          type="file"
          className="filepond"

          onChange={onFileChange}
        />
      </InputWrapper>
    </>
  )
}
export default memo(AdvanceFileUp)