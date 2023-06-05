export default class BitRepeaterField {
  #repeaterFieldWrapper

  #repeatableWrapper

  #hiddenFieldsInput

  #hiddenIndexInput

  #window

  #document

  #allEventListeners = []

  #fieldKey

  #defaultRow

  #minimumRow

  #maximumRow

  #showAddButton

  #addButton

  #removeButton

  #showAddToEndButton

  #addToEndBtnWrapper

  #addToEndButton

  #cloneElement

  constructor(selector, config) {
    this.#setConfigPropertiesToVariables(config)
    if (typeof selector === 'string') {
      this.#repeaterFieldWrapper = this.#document.querySelector(selector)
    } else {
      this.#repeaterFieldWrapper = selector
    }

    this.init()
  }

  #setConfigPropertiesToVariables(config) {
    this.#window = config.window || window
    this.#document = config.document || document
    this.#fieldKey = config.fieldKey
    this.#contentId = config.contentId
    this.#defaultRow = config.defaultRow
    this.#minimumRow = config.minimumRow
    this.#maximumRow = config.maximumRow
    this.#showAddButton = config.showAddBtn
    this.#showAddToEndButton = config.showAddToEndBtn
  }

  init() {
    this.#repeatableWrapper = this.#select(`.${this.#fieldKey}-rpt-wrp`)

    this.#detectRepeatableFields()

    const cloneElement = this.#elementClone(this.#repeatableWrapper)

    const replacedElement = this.#replaceClassAndId(cloneElement, rowNumber = 1)

    this.#repeatableWrapper.remove()

    cloneElement.classList.add('rpt-index-1')
    cloneElement.querySelector(`.${this.#fieldKey}-rpt-add-btn`).dataset.index = 1
    cloneElement.querySelector(`.${this.#fieldKey}-rpt-rmv-btn`).dataset.index = 1

    if (this.#showAddButton) {
      // this.#addButton = this.#select(`.${this.#fieldKey}-rpt-add-btn`)
      this.#addButton = cloneElement.querySelector(`.${this.#fieldKey}-rpt-add-btn`)
      this.#addEvent(this.#addButton, 'click', e => this.#handleAdd(e))
    }
    // this.#removeButton = this.#select(`.${this.#fieldKey}-rpt-rmv-btn`)
    this.#removeButton = cloneElement.querySelector(`.${this.#fieldKey}-rpt-rmv-btn`)
    this.#addEvent(this.#removeButton, 'click', e => this.#handleRemove(e))

    if (this.#showAddToEndButton) {
      this.#addToEndBtnWrapper = this.#select(`.${this.#fieldKey}-add-to-end-btn-wrp`)
      this.#addToEndButton = this.#select(`.${this.#fieldKey}-add-to-end-btn`)
      this.#addEvent(this.#addToEndButton, 'click', e => this.#handleAddToEnd(e))
    }

    this.#repeaterFieldWrapper.prepend(cloneElement)
  }

  #detectRepeatableFields() {
    this.#selectAll('input[name]', this.#repeatableWrapper).forEach((input) => {
      const { name } = input
      const { value } = input
      const hiddenInput = this.#document.createElement('input')
      hiddenInput.type = 'hidden'
      hiddenInput.name = name
      hiddenInput.value = value
      this.#repeatableWrapper.append(hiddenInput)
    })
  }

  #replaceClassAndId(element, rowNumber) {
    const replacedElement = element
  }

  #handleAdd(e) {
    const { target } = e
    const parent = target.closest(`.${this.#fieldKey}-rpt-wrp`)
    this.#cloneElement = this.#elementClone(this.#repeatableWrapper)
    parent.after(this.#cloneElement)
  }

  #handleRemove(e) {
    const { target } = e
    const parent = target.closest(`.${this.#fieldKey}-rpt-wrp`)
    parent.remove()
  }

  #handleAddToEnd() {
    this.#cloneElement = this.#elementClone(this.#repeatableWrapper)
    this.#addToEndBtnWrapper.before(this.#cloneElement)
  }

  #select(selector, element) {
    if (element) return element.querySelector(selector)
    return this.#repeaterFieldWrapper.querySelector(selector)
  }

  #selectAll(selector, element) {
    if (element) return element.querySelectorAll(selector)
    return this.#repeaterFieldWrapper.querySelectorAll(selector)
  }

  #elementClone(element) { return element.cloneNode(true) }

  #addEvent(selector, eventType, cb) {
    selector.addEventListener(eventType, cb)
    this.#allEventListeners.push({ selector, eventType, cb })
  }
}
