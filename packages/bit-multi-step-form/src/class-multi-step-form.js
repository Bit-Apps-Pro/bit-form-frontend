export default class BitMultiStepForm {
  #multiStepContainer = null

  #nextBtns = []

  #prevBtns = []

  #allEventListeners = []

  #currentStep = 1

  #defaultStep = 1

  #validateOnStepChange = true

  #maintainStepHistory = true

  #contentId = ''

  #history = []

  constructor(selector, config) {
    if (typeof selector === 'string') this.#multiStepContainer = document.querySelector(selector)
    else this.#multiStepContainer = selector

    this.#setConfigsToVars(config)

    this.init()
  }

  init() {
    this.#nextBtns = this.#selectAll('.next-step-btn')
    this.#prevBtns = this.#selectAll('.prev-step-btn')

    this.#disableInitialSwitchBtns()
    this.#addNextBtnEvent()
    this.#addPrevBtnEvent()
  }

  #disableInitialSwitchBtns() {
    const firstStep = this.#getCurrentStepWrapper(1)
    const prevBtn = this.#select('.prev-step-btn', firstStep)
    if (prevBtn) prevBtn.disabled = true

    const lastStep = this.#getCurrentStepWrapper(this.#selectAll('[data-step]').length)
    const nextBtn = this.#select('.next-step-btn', lastStep)
    if (nextBtn) nextBtn.disabled = true
  }

  #setConfigsToVars(config) {
    if ('defaultStep' in config) this.#defaultStep = config.defaultStep
    if ('validateOnStepChange' in config) this.#validateOnStepChange = config.validateOnStepChange
    if ('maintainStepHistory' in config) this.#maintainStepHistory = config.maintainStepHistory
    this.#contentId = config.contentId
  }

  #select(selector, elm) {
    return (elm || this.#multiStepContainer).querySelector(selector)
  }

  #selectAll(selector, elm) {
    return (elm || this.#multiStepContainer).querySelectorAll(selector)
  }

  #addEvent(elm, event, handler) {
    elm.addEventListener(event, handler)
    this.#allEventListeners.push({ elm, event, handler })
  }

  #getCurrentStepWrapper(step = this.#currentStep) {
    return this.#select(`[data-step="${step}"]`)
  }

  #canGoNext() {
    const stepWrapper = this.#getCurrentStepWrapper(this.#currentStep + 1)
    if (!stepWrapper) return false
  }

  #canGoPrev() {
    const stepWrapper = this.#getCurrentStepWrapper(this.#currentStep - 1)
    if (!stepWrapper) return false
  }

  #showStep(step) {
    const stepWrapper = this.#select(`[data-step="${step}"]`)
    if (!stepWrapper) return
    stepWrapper.classList.remove('d-none')
    const otherSteps = this.#selectAll(`[data-step]:not([data-step="${step}"])`)
    otherSteps.forEach((stepElm) => {
      stepElm.classList.add('d-none')
    })
  }

  #addNextBtnEvent() {
    if (!this.#nextBtns.length) return
    this.#nextBtns.forEach((btn) => {
      this.#addEvent(btn, 'click', () => {
        if (this.#validateOnStepChange && typeof validateForm !== 'undefined') {
          const isValidated = validateForm({ form: this.#contentId }, { step: this.#currentStep })
          if (!isValidated) return
        }
        if (this.#maintainStepHistory) {
          this.#history.push(this.#currentStep)
        }
        this.#currentStep += 1
        this.#showStep(this.#currentStep)
      })
    })
  }

  get step() {
    return this.#currentStep
  }

  set step(step) {
    const newStepWrapper = this.#getCurrentStepWrapper(step)
    if (!newStepWrapper) return
    if (this.#maintainStepHistory) {
      this.#history.push(this.#currentStep)
    }
    this.#currentStep = step
    this.#showStep(this.#currentStep)
  }

  #addPrevBtnEvent() {
    if (!this.#prevBtns.length) return
    this.#prevBtns.forEach((btn) => {
      this.#addEvent(btn, 'click', () => {
        if (this.#maintainStepHistory) {
          this.#currentStep = this.#history.pop()
        } else if (this.#currentStep > 0) {
          this.#currentStep -= 1
        }
        this.#showStep(this.#currentStep)
      })
    })
  }

  destroy() {
  }

  reset() {
    console.log('reset')
    this.step = this.#defaultStep || 1
    this.init()
  }
}
