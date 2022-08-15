export default class BitAdvanceFileUpload {
  #fieldUploadWrapper = null

  #filePondRef = null

  #doument = null

  #configSetting = {}

  #formID = null

  #ajaxURL = null

  #nonce = null

  #uploadFileToServer = null

  #config = {
    document: {},
    formID: null,
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
    this.#configSetting = this.#config.configSetting
    this.#ajaxURL = this.#config.ajaxURL
    this.#nonce = this.#config.nonce
    this.#uploadFileToServer = this.#config.uploadFileToServer
    this.files = []
    this.uploaded_files = []
    this.on_select_upload = false

    this.init()
  }

  init() {
    const plugins = []
    if (this.#configSetting.allowFileSizeValidation) {
      plugins.push(bit_filepond_plugin_file_validate_size)
    }
    if (this.#configSetting.allowFileTypeValidation) {
      plugins.push(bit_filepond_plugin_file_validate_type)
    }
    if (this.#configSetting.allowImageCrop) {
      plugins.push(bit_filepond_plugin_image_crop)
    }
    if (this.#configSetting.allowImagePreview) {
      plugins.push(bit_filepond_plugin_image_preview)
    }
    if (this.#configSetting.allowImageResize) {
      plugins.push(bit_filepond_plugin_image_resize)
    }
    if (this.#configSetting.allowImageTransform) {
      plugins.push(bit_filepond_plugin_image_transform)
    }
    if (this.#configSetting.allowImageValidateSize) {
      plugins.push(bit_filepond_plugin_image_validate_size)
    }
    if (this.#configSetting.allowPreview) {
      plugins.push(bit_filepond_plugin_media_preview)
    }

    registerPlugin(...plugins)

    this.#filePondRef = create(this.#configSetting)
    this.#fieldUploadWrapper.appendChild(this.#filePondRef.element)
    if (this.#config.onFileUpdate) {
      this.#filePondRef.on('updatefiles', this.#config.onFileUpdate)
    }

    // TODO - config e uploadFileToServer jodi true ashe, tahole upload hobe, nahole hobena
    if (this.#uploadFileToServer) {
      const uri = new URL(this.#ajaxURL)
      this.on_select_upload = this.#configSetting.instantUpload
      uri.searchParams.append('_ajax_nonce', this.#nonce)

      this.#filePondRef.setOptions({
        // TODO - config e uploadFileToServer jodi true ashe, tahole upload hobe, nahole hobena
        server: {
          process: (
            fieldName,
            file,
            metadata,
            load,
            error,
            progress,
            abort,
          ) => {
            const formData = new FormData()

            if (uri.searchParams.has('action')) {
              uri.searchParams.delete('action')
            }
            uri.searchParams.append('action', 'bitforms_file_upload')

            formData.append(`${fieldName}`, file, file.name)
            const request = new XMLHttpRequest()
            request.open('POST', uri.href)
            request.upload.onprogress = (e) => {
              progress(e.lengthComputable, e.loaded, e.total)
            }
            request.onload = () => {
              if (request.status >= 200 && request.status < 300) {
                const response = JSON.parse(request.responseText)
                this.uploaded_files.push(response?.data?.file_name)
                load(response?.data?.file_name)
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
          revert: (uniqueFileId, load, error) => {
            const existFileId = this.uploaded_files.find(
              (file) => file === uniqueFileId,
            )
            if (existFileId) {
              const fileIndex = this.uploaded_files.indexOf(uniqueFileId)
              this.uploaded_files.splice(fileIndex, 1)
              if (uri.searchParams.has('action')) {
                uri.searchParams.delete('action')
              }
              uri.searchParams.append('action', 'bitforms_file_delete')
              uri.searchParams.append('file_name', uniqueFileId)

              const xhr = new XMLHttpRequest()
              xhr.open('DELETE', uri.href)
              xhr.onload = () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                  load()
                } else {
                  error()
                }
              }
              xhr.send()
              return {
                abort: () => {
                  xhr.abort()
                },
              }
            }
          },
        },
      })

      this.#filePondRef.on('updatefiles', () => {
        this.files = []
        this.files = this.#filePondRef.getFiles()
      })
    }

    // this.#filePondRef.destroy(this.#filePondRef.element)
  }

  reset() {
    this.init()
    this.#filePondRef.destroy(this.#filePondRef.element)
  }
}
