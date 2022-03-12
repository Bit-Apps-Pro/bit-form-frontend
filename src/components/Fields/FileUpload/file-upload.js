/* eslint-disable no-restricted-syntax */

import { selectAllInGrid, selectInGrid } from '../../../Utils/globalHelpers'

/* eslint-disable class-methods-use-this */
export default class FileUploadField {
  #fileUploadWrap = null

  #fieldLabel = null

  #inpBtn = null

  #fileSelectStatus = null

  #maxSizeLabel = null

  #fileUploadInput = null

  #filesList = null

  #errorWrap = null

  #files = {}

  #allEventListeners = []

  // default config
  #config = {
    id: 'upload',
    name: 'upload',
    required: true,
    multiple: false,
    maxSize: 0,
    sizeUnit: 'KB',
    isItTotalMax: false,
    showMaxSize: true,
    showSelectStatus: true,
    fileSelectStatus: 'No Choosen File',
    allowedFileType: '',
    showFileList: true,
    showFilePreview: true,
    showFileSize: true,
    accept: '.pdf,.exe,.msi',
    duplicateAllow: false,
    capture: '',
    minFile: 0,
    maxFile: 0,
    onchange: () => {
      console.log('Hellow World')
    },
    oninput: () => {

    },
  }

  constructor(selector, config) {
    Object.assign(this.#config, config)

    if (typeof selector === 'string') {
      this.#fileUploadWrap = document.querySelector(selector)
    } else {
      this.#fileUploadWrap = selector
    }
    this.fieldKey = this.#config.fieldKey

    this.init()
  }

  init() {
    this.#fieldLabel = this.#select(`.${this.fieldKey}-label`)
    this.#inpBtn = this.#select(`.${this.fieldKey}-inp-btn`)
    this.#fileSelectStatus = this.#select(`.${this.fieldKey}-file-select-status`)
    this.#maxSizeLabel = this.#select(`.${this.fieldKey}-max-size-lbl`)
    this.#fileUploadInput = this.#select(`.${this.fieldKey}-file-upload-input`)
    this.#filesList = this.#select(`.${this.fieldKey}-files-list`)
    this.#errorWrap = this.#select(`.${this.fieldKey}-err-wrp`)
    const { multiple, allowedFileType, accept, required, showMaxSize, maxSize, sizeUnit, showSelectStatus, fileSelectStatus } = this.#config

    this.#fileUploadInput.multiple = multiple
    // this.#fileUploadInput.onchange = onchange
    this.#fileUploadInput.accept = allowedFileType ? `${allowedFileType}, ${accept}` : accept

    if (showMaxSize && maxSize) {
      this.#maxSizeLabel.innerText = `(Max ${maxSize}${sizeUnit.toUpperCase()})`
    } else { this.#maxSizeLabel.remove() }

    if (showSelectStatus) this.#fileSelectStatus.innerText = fileSelectStatus
    else this.#fileSelectStatus.remove()

    if (!this.#config.showFileList) this.#filesList?.remove()

    this.#addEvent(this.#fileUploadInput, 'change', e => this.#fileUploadAction(e))
  }

  #fileUploadAction(e) {
    const { files } = this.#fileUploadInput

    const { sizeUnit, maxSize, isItTotalMax, multiple, showFileList, showFilePreview, showFileSize, showSelectStatus, fileSelectStatus, minFile, maxFile } = this.#config

    const maxFileSize = this.#maxFileSize(sizeUnit, maxSize)

    let totalFileSize = 0
    const error = []
    this.#removeClass(this.#errorWrap, 'active')

    if (isItTotalMax) {
      Object.values(this.#files).forEach(file => {
        totalFileSize += file.size
      })
    }
    if (!multiple && files.length > 0) {
      this.#files = {}
      this.#filesList.innerHTML = ''
    }

    for (const file of files) {
      const fileName = file.name.replaceAll(/( |\.)/g, '')
      if (!this.#files[fileName]) {
        if (!maxSize || (file.size + totalFileSize) <= maxFileSize) {
          if (!(maxFile > 0) || (Object.keys(this.#files).length < maxFile)) {
            this.#files[fileName] = file
            if (showFileList) {
              this.#filesList.innerHTML += `<div id="file-wrp-${fileName}" data-dev-file-wrpr='${this.fieldKey}' class="${this.fieldKey}-file-wrpr">
                ${ showFilePreview ? `<img src="${this.#getPreviewUrl(file)}" alt="Uploaded Image"  data-dev-file-preview='${this.fieldKey}' class="${this.fieldKey}-file-preview" />` : ''}
                  <div class="${this.fieldKey}-file-details">
                    <span data-dev-file-title='${this.fieldKey}' class="${this.fieldKey}-file-title">${file.name}</span>
                    ${showFileSize ? `<span data-dev-file-size='${this.fieldKey}' class="${this.fieldKey}-file-size">${this.#returnFileSize(file.size)}</span>` : ''}
                  </div>
                  <button data-file-id="${fileName}" data-dev-cross-btn='${this.fieldKey}' class="${this.fieldKey}-cross-btn">×</button>
              </div>`
            }
            if (isItTotalMax) totalFileSize += file.size
          } else {
            this.#errorWrap.innerText = 'Maximum File Limit Exceeded'
            this.#addClass(this.#errorWrap, 'active')
          }
        } else {
          error.push('Max Upload Size Exceeded')
        }
      } else {
        error.push('File Allready Exist')
      }
    }
    selectAllInGrid(`.${this.fieldKey}-cross-btn`).forEach(element => {
      this.#addEvent(element, 'click', ev => this.#removeAction(ev))
    })

    const fileLength = Object.keys(this.#files).length

    if (fileLength && showSelectStatus) {
      this.#fileSelectStatus.innerText = `${fileLength} file${fileLength > 1 ? 's' : ''} selected`
    } else if (showSelectStatus) {
      this.#fileSelectStatus.innerText = fileSelectStatus
    }

    if (minFile > 0 && fileLength < minFile) {
      this.#errorWrap.innerText = `You should add minmum ${minFile} File`
      this.#addClass(this.#errorWrap, 'active')
    }
    error.map((err, errId) => {
      this.#filesList.insertAdjacentHTML('afterbegin', `
      <div id='err-${errId}' class="err-wrp">
          <span>${err}</span>
      </div>`)
      const errorElemnt = this.#select(`#err-${errId}`)
      errorElemnt.classList.add('active')

      setTimeout(() => {
        errorElemnt.classList.remove('active')
      }, 3000)
      setTimeout(() => {
        errorElemnt.remove()
      }, 5000)
    })
  }

  #removeAction = e => {
    const id = e.target.getAttribute('data-file-id')
    selectInGrid(`#file-wrp-${id}`).remove()

    delete this.#files[id]
    const fileLength = Object.keys(this.#files).length
    if (fileLength) { this.#fileSelectStatus.innerText = `${fileLength} file${fileLength > 1 ? 's' : ''} selected` } else { this.#fileSelectStatus.innerText = this.#config.fileSelectStatus }
  }

  #select(selector) { return this.#fileUploadWrap.querySelector(selector) }

  #remove(selector) { document.querySelector(selector).remove() }

  #getPreviewUrl(file) {
    const extention = file.name.substring(file.name.lastIndexOf('.') + 1)
    switch (extention) {
      case 'xbm':
      case 'tif':
      case 'pjp':
      case 'pjpeg':
      case 'svgz':
      case 'jpg':
      case 'jpeg':
      case 'ico':
      case 'tiff':
      case 'gif':
      case 'svg':
      case 'bmp':
      case 'png':
      case 'jfif':
      case 'webp':
        return URL.createObjectURL(file)
      case '7z':
      case 'arj':
      case 'deb':
      case 'pkg':
      case 'rar':
      case '.rpm':
      case '.gz':
      case 'z':
      case 'zip':
        return `${bits.assetsURL}/../static/file-upload/zip-compressed.svg`
      case 'key':
      case 'odp':
      case 'pps':
      case 'ppt':
      case 'pptx':
        return `${bits.assetsURL}/../static/file-upload/presentation.svg`
      case '_RF_':
      case 'doc':
      case 'docx':
      case 'odt':
      case 'pdf':
      case 'rtf':
      case 'tex':
      case 'txt':
      case 'wks':
      case 'wps':
      case 'wpd':
        return `${bits.assetsURL}/../static/file-upload/document.svg`
      case 'csv':
      case 'dat':
      case 'db':
      case 'dbf':
      case 'log':
      case 'mdb':
      case 'sav':
      case 'sql':
      case 'tar':
      case 'sqlite':
      case 'xml':
        return `${bits.assetsURL}/../static/file-upload/database.svg`
      case 'opus':
      case 'flac':
      case 'webm':
      case 'weba':
      case 'wav':
      case 'ogg':
      case 'm4a':
      case 'mp3':
      case 'oga':
      case 'mid':
      case 'amr':
      case 'aiff':
      case 'wma':
      case 'au':
      case 'acc':
      case 'wpl':
        return `${bits.assetsURL}/../static/file-upload/file-audio.svg`
      case 'ogm':
      case 'wmv':
      case 'mpg':
      case 'ogv':
      case 'mov':
      case 'asx':
      case 'mpeg':
      case 'mp4':
      case 'm4v':
      case 'avi':
      case '3gp':
      case 'flv':
      case 'mkv':
      case 'swf':
        return `${bits.assetsURL}/../static/file-upload/file-audio.svg`
      default:
        return `${bits.assetsURL}/../static/file-upload/paperclip.svg`
    }
  }

  #addEvent(element, eventType, eventAction) {
    element.addEventListener(eventType, eventAction)
    this.#allEventListeners.push({ element, eventType, eventAction })
  }

  #addClass(element, className) {
    element.classList.add(className)
  }

  #removeClass(element, className) {
    element.classList.remove(className)
  }

  #returnFileSize(number) {
    if (number < 1024) {
      return `${number}Bytes`
    } if (number >= 1024 && number < 1048576) {
      return `${(number / 1024).toFixed(1)}KB`
    } if (number >= 1048576 && number < 1073741824) {
      return `${(number / 1048576).toFixed(1)}MB`
    } if (number >= 1073741824) {
      return `${(number / 1073741824).toFixed(1)}GB`
    }
  }

  #maxFileSize(sizeUnit, maxSize) {
    switch (sizeUnit) {
      case 'Bytes': return maxSize
      case 'KB': return maxSize * 1024
      case 'MB': return maxSize * 1048576
      case 'GB': return maxSize * 1073741824
      default: return 0
    }
  }

  #detachAllEvents() {
    this.#allEventListeners.forEach(({ element, eventType, eventAction }) => {
      element.removeEventListener(eventType, eventAction)
    })
  }

  destroy() {
    this.#filesList.innerHTML = ''
    this.#detachAllEvents()
  }
}

// const field = new FileUploadField('.container', {
//   // fieldLbl: 'File Upload Here',
//   // btnTxt: 'Upload Button',
//   // required: true,
//   multiple: true,
//   maxSize: 5,
//   sizeUnit: 'MB',
//   isItTotalMax: true,
//   fileSelectStatus: 'Empty Selected',
//   // showMaxSize: true,
//   allowedFileType: 'image/*, .zip',
//   showFileList: true,
//   showFileSize: true,
//   duplicateAllow: false,
//   onchange: () => {
//   },
//   accept: '.jpg, .png, .jpeg',
//   minFile: 2,
//   maxFile: 3,
// })
