/* eslint-disable no-plusplus */
import SignaturePad from 'signature_pad'

export default class BitSignatureField {
  #canvas = null

  #signatureImgType = null

  #clearButton = null

  #undoButton = null

  // #redoButton = null

  #signaturePad = null

  #options = {}

  #document = null

  #fieldKey = null

  #signatureFld = null

  #contentId = null

  #assetsURL = null

  #isBuilder = null

  constructor(selector, config) {
    if (typeof selector === 'string') {
      this.#canvas = document.querySelector(selector)
    } else {
      this.#canvas = selector
    }

    this.#options = {
      maxWidth: config.maxWidth || 2.5,
      penColor: config.penColor || 'rgb(0, 0, 0)',
      backgroundColor: config.backgroundColor || 'rgb(255, 255, 255)',
    }

    this.#document = config.document || document

    this.#fieldKey = config.fieldKey

    this.#signatureImgType = config.imgTyp || 'image/png'

    this.#isBuilder = config?.isBuilder || false

    this.#contentId = config?.contentId
    this.#assetsURL = config?.assetsURL

    this.init()
  }

  init() {
    this.#clearButton = this.#document.querySelector(`.${this.#fieldKey}-clr-btn`)
    this.#undoButton = this.#document.querySelector(`.${this.#fieldKey}-undo-btn`)
    // this.#redoButton = this.#document.querySelector(`.${this.#fieldKey}-redo-btn`)
    this.#signatureFld = this.#document?.querySelector(`.${this.#fieldKey}-signature-fld`)
    this.#canvas.style.cursor = `url(${this.#assetsURL}pen.ico), crosshair`

    this.#signaturePad = new SignaturePad(this.#canvas, this.#options)

    window.onresize = this.resizeCanvas

    this.resizeCanvas()
    this.#clearCanvas()
    this.#undoCanvas()
    // this.#redoCanvas()

    this.#signaturePad.addEventListener('endStroke', () => {
      this.putSignature()
    })

    // add keyboard shortcut for undo ctrl + z and redo ctrl + y
    // window.addEventListener('keydown', (e) => {
    //   if (this.#isBuilder) return
    //   if (e.ctrlKey && e.key === 'y') {
    //     e.preventDefault()
    //     this.#redoButton.click()
    //   }
    //   if (e.ctrlKey && e.key === 'z') {
    //     e.preventDefault()
    //     this.#undoButton.click()
    //   }
    // })
  }

  resizeCanvas() {
    const ratio = Math.max(window.devicePixelRatio || 1, 1)

    this.#canvas.width = this.#canvas.offsetWidth * ratio
    this.#canvas.height = this.#canvas.offsetHeight * ratio
    this.#canvas.getContext('2d').scale(ratio, ratio)

    this.#signaturePad.fromData(this.#signaturePad.toData())
  }

  #clearCanvas() {
    if (!this.#clearButton) return
    this.#clearButton.addEventListener('click', () => {
      this.#signaturePad.clear()
      this.#signatureFld.value = ''
    })
  }

  #undoCanvas() {
    if (!this.#undoButton) return
    this.#undoButton.addEventListener('click', () => {
      const data = this.#signaturePad.toData()

      if (data) {
        data.pop() // remove the last dot or line
        this.#signaturePad.fromData(data)
        this.putSignature()
        if (data.length === 0) {
          this.#signatureFld.value = ''
        }
      }
    })
  }

  // #redoCanvas() {
  //   if (!this.#redoButton) return
  //   this.#redoButton.addEventListener('click', () => {
  //     const data = this.#signaturePad.toData()
  //     console.log(data)
  //     if (data) {
  //       data.push() // remove the last dot or line
  //       this.#signaturePad.fromData(data)
  //       this.putSignature()
  //       if (data.length === 0) {
  //         this.#signatureFld.value = ''
  //       }
  //     }
  //   })
  // }

  putSignature() {
    if (this.#isBuilder) return
    if (this.#signaturePad.isEmpty()) return
    const data = this.#signaturePad.toDataURL(this.#signatureImgType)
    this.#signatureFld.value = data
  }

  destroy() {
    this.#document = null
    this.#canvas = null
  }

  reset() {
    this.#signaturePad.clear()
    this.#signatureFld.value = ''
  }
}
