export default class BitAdvanceFileUpload {
  #fieldUploadWrapper = null

  #filePondRef = null

  #document = null

  #window = null

  #configSetting = {}

  #fieldKey = null

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
    this.#fieldKey = config.fieldKey
    if (typeof selector === 'string') {
      this.#fieldUploadWrapper = this.#config.document.querySelector(selector)
    } else {
      this.#fieldUploadWrapper = selector
    }
    this.#window = config.window ? config.window : window
    this.#document = config.document ? config.document : document
    this.#formID = this.#config.formID
    this.#configSetting = this.#config.configSetting
    this.#ajaxURL = this.#config.ajaxURL
    this.#nonce = this.#config.nonce
    this.#uploadFileToServer = this.#config.uploadFileToServer
    this.uploaded_files = []
    this.on_select_upload = false

    this.init()
  }

  init() {
    this.files = []
    const plugins = []
    if (this.#configSetting.allowFileSizeValidation) {
      plugins.push(this.#window.bit_filepond_plugin_file_validate_size)
    }
    if (this.#configSetting.allowFileTypeValidation) {
      plugins.push(this.#window.bit_filepond_plugin_file_validate_type)
    }
    if (this.#configSetting.allowImageCrop) {
      plugins.push(this.#window.bit_filepond_plugin_image_crop)
    }
    if (this.#configSetting.allowImagePreview) {
      plugins.push(this.#window.bit_filepond_plugin_image_preview)
    }
    if (this.#configSetting.allowImageResize) {
      plugins.push(this.#window.bit_filepond_plugin_image_resize)
    }
    if (this.#configSetting.allowImageTransform) {
      plugins.push(this.#window.bit_filepond_plugin_image_transform)
    }
    if (this.#configSetting.allowImageValidateSize) {
      plugins.push(this.#window.bit_filepond_plugin_image_validate_size)
    }
    if (this.#configSetting.allowPreview) {
      plugins.push(this.#window.bit_filepond_plugin_media_preview)
    }

    const { create, registerPlugin } = this.#window.bit_filepond

    registerPlugin(...plugins)

    this.#filePondRef = create(this.#configSetting)
    this.#fieldUploadWrapper.appendChild(this.#filePondRef.element)
    setTimeout(() => {
      this.#document.querySelector(`.${this.#fieldKey}-lbl`).setAttribute('for', this.#select('input[name="filepond"]').id)
    }, 100)
    if (this.#config.onFileUpdate) {
      this.#filePondRef.on('updatefiles', this.#config.onFileUpdate)
    }

    if (this.#uploadFileToServer) {
      const uri = new URL(this.#ajaxURL)
      this.on_select_upload = this.#configSetting.instantUpload
      uri.searchParams.append('_ajax_nonce', this.#nonce)

      let serverResponse = null

      this.#filePondRef.setOptions({
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

            formData.append(this.#fieldKey, file, file.name)
            formData.append('fieldKey', this.#fieldKey)
            formData.append('formID', this.#formID)
            const request = new XMLHttpRequest()
            request.open('POST', uri.href)
            request.upload.onprogress = (e) => {
              progress(e.lengthComputable, e.loaded, e.total)
            }
            request.onload = () => {
              serverResponse = JSON.parse(request.responseText)
              if (request.status >= 200 && request.status < 300) {
                this.uploaded_files.push(serverResponse?.data?.file_name)
                load(serverResponse?.data?.file_name)
              } else {
                error()
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
        labelFileProcessingError: () => serverResponse?.data,
      })

      this.#filePondRef.on('updatefiles', () => {
        this.files = []
        this.files = this.#filePondRef.getFiles()
      })
    }

    // this.#filePondRef.destroy(this.#filePondRef.element)
  }

  #select(selector) { return this.#fieldUploadWrapper.querySelector(selector) || console.error('selector not found', selector) }

  reset() {
    this.#filePondRef.destroy(this.#filePondRef.element)
    this.#fieldUploadWrapper.innerHTML = ''
    this.init()
  }
}
