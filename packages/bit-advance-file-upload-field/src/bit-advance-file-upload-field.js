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

    this.init()
  }

  init() {
    const plugins = []
    if (this.#config.allowFileSizeValidation) plugins.push(FilePondPluginFileValidateSize)
    if (this.#config.allowFileTypeValidation) plugins.push(FilePondPluginFileValidateType)
    if (this.#config.allowImageCrop) plugins.push(FilePondPluginImageCrop)
    if (this.#config.allowImagePreview) plugins.push(FilePondPluginImagePreview)
    if (this.#config.allowImageResize) plugins.push(FilePondPluginImageResize)
    if (this.#config.allowImageTransform) plugins.push(FilePondPluginImageTransform)
    if (this.#config.allowImageValidateSize) plugins.push(FilePondPluginImageValidateSize)
    if (this.#config.allowPreview) plugins.push(FilePondPluginMediaPreview)

    registerPlugin(...plugins)

    this.#filePondRef = create(this.#configSetting)
    this.#fieldUploadWrapper.appendChild(this.#filePondRef.element)

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
}
