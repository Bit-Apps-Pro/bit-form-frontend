import SignaturePad from 'signature_pad'

export default class BitSignatureField {
  #canvas = null

  #signatureImgType = null

  #clearButton = null

  #undoButton = null

  #signaturePad = null

  #options = {}

  #document = null

  #fieldKey = null

  constructor(canvas, config) {
    this.#canvas = canvas

    this.#options = {
      maxWidth: config.maxWidth || 2.5,
      penColor: config.penColor || 'rgb(0, 0, 0)',
      backgroundColor: config.backgroundColor || 'rgb(255, 255, 255)',
    }

    this.#document = config.document || document

    this.#fieldKey = config.fieldKey

    this.#signatureImgType = config.signatureImgType || 'image/png'

    this.init()
  }

  init() {
    this.#clearButton = this.#document.querySelector(`.${this.#fieldKey}-clr-btn`)
    this.#undoButton = this.#document.querySelector(`.${this.#fieldKey}-undo-btn`)
    this.#signaturePad = new SignaturePad(this.#canvas, this.#options)

    window.onresize = this.resizeCanvas

    this.resizeCanvas()
    this.#clearCanvas()
    this.#undoCanvas()
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
    })
  }

  #undoCanvas() {
    if (!this.#undoButton) return
    this.#undoButton.addEventListener('click', () => {
      const data = this.#signaturePad.toData()

      if (data) {
        data.pop() // remove the last dot or line
        this.#signaturePad.fromData(data)
      }
    })
  }

  destroy() {
    this.#document = null
    this.#canvas = null
  }
}
