import { registerPlugin, setOptions, create } from 'filepond'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css'
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import FilePondPluginImageCrop from 'filepond-plugin-image-crop'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import FilePondPluginImageResize from 'filepond-plugin-image-resize'
import FilePondPluginImageTransform from 'filepond-plugin-image-transform'
import FilePondPluginImageValidateSize from 'filepond-plugin-image-validate-size'
import FilePondPluginMediaPreview from 'filepond-plugin-media-preview'

export default class AdvanceFileUpload {
  #fieldUploadWrapper = null

  #filePondRef = null

  #doument = null

  #registerPlugin = []

  #configSetting = {}

  #formID = null

  #ajaxURL = null

  #nonce = null

  #uploadFileToServer = null

  #config = {
    document: {},
    formID: null,
    registerPlugin: [],
    configSetting: {},
    ajaxURL: null,
    nonce: null,
    uploadFileToServer: null,
  }

  constructor(selector, config) {
    Object.assign(this.#config, config)
    if (typeof selector === 'string') {
      this.#fieldUploadWrapper = this.#config.document.querySelector(selector)
    } else {
      this.#fieldUploadWrapper = selector
    }
    this.#doument = this.#config.document
    this.#formID = this.#config.formID
    this.#registerPlugin = this.#config.registerPlugin
    this.#configSetting = this.#config.configSetting
    this.#ajaxURL = this.#config.ajaxURL
    this.#nonce = this.#config.nonce
    this.#uploadFileToServer = this.#config.uploadFileToServer

    this.init()
  }

  init() {
    registerPlugin(
      // this.#registerPlugin.map(imp => {
      //   // [imp.val] = import(imp.key)
      // }),
      FilePondPluginFileValidateSize,
    )
    this.#filePondRef = create(this.#configSetting)
    console.log(this.#filePondRef)

    // TODO - config e uploadFileToServer jodi true ashe, tahole upload hobe, nahole hobena
    if (this.#uploadFileToServer) {
      const uri = new URL(this.#ajaxURL)
      uri.searchParams.append('action', 'bitforms_file_store')
      uri.searchParams.append('_ajax_nonce', this.#nonce)

      // TODO - config e uploadFileToServer jodi true ashe, tahole upload hobe, nahole hobena
      const removeFile = new URL(this.#ajaxURL)
      removeFile.searchParams.append('action', 'bitforms_file_remove')
      removeFile.searchParams.append('_ajax_nonce', this.#nonce)
      removeFile.searchParams.append('form_id', this.#formID)

      setOptions({
        // TODO - config e uploadFileToServer jodi true ashe, tahole upload hobe, nahole hobena
        server: {
          process: (fieldName, file, metadata, load, error, progress, abort) => {
            const formData = new FormData()
            formData.append(`${fieldName}`, file, file.name)
            formData.append('form_id', this.#formID)
            const request = new XMLHttpRequest()
            request.open('POST', uri.href)
            request.upload.onprogress = (e) => {
              progress(e.lengthComputable, e.loaded, e.total)
            }
            request.onload = () => {
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
    }
  }

  #select(selector) { return this.#fieldUploadWrapper.querySelector(selector) }
}
