export default class BitMultiStepForm {
  #multiStepContainer = null

  #nextBtns = []

  #prevBtns = []

  #allEventListeners = []

  #currentStep = 1

  #defaultStep = 1

  #validateOnStepChange = true

  #maintainStepHistory = true

  #saveProgress = true

  #contentId = ''

  #history = []

  constructor(selector, config) {
    if (typeof selector === 'string') this.#multiStepContainer = document.querySelector(selector)
    else this.#multiStepContainer = selector

    this.#setConfigsToVars(config)

    this.init()
  }

  init() {
    this.#nextBtns = Array.from(this.#selectAll('.next-step-btn'))
    this.#prevBtns = Array.from(this.#selectAll('.prev-step-btn'))

    this.#disableInitialSwitchBtns()
    this.#addNextBtnEvent()
    this.#addPrevBtnEvent()
  }

  #disableInitialSwitchBtns() {
    const firstStep = this.#getCurrentStepWrapper(1)
    const prevBtn = this.#select('.prev-step-btn', firstStep)
    if (prevBtn) {
      prevBtn.disabled = true
      this.#prevBtns = this.#prevBtns.filter((btn) => btn.isEqualNode(prevBtn) === false)
    }

    const lastStep = this.#getCurrentStepWrapper(this.#selectAll('[data-step]').length)
    const nextBtn = this.#select('.next-step-btn', lastStep)
    if (nextBtn) {
      nextBtn.disabled = true
      this.#nextBtns = this.#nextBtns.filter((btn) => btn.isEqualNode(nextBtn) === false)
    }
  }

  #setConfigsToVars(config) {
    if ('defaultStep' in config) this.#defaultStep = config.defaultStep
    if ('validateOnStepChange' in config) this.#validateOnStepChange = config.validateOnStepChange
    if ('maintainStepHistory' in config) this.#maintainStepHistory = config.maintainStepHistory
    if ('saveProgress' in config) this.#saveProgress = config.saveProgress
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

  #setIsLoading(status) {
    const currentStep = this.#getCurrentStepWrapper()
    if (!currentStep) return
    const nextBtn = this.#select('.next-step-btn', currentStep)
    if (!nextBtn) return
    if (status) {
      nextBtn.disabled = true
      nextBtn.classList.add('bf-spinner')
    } else {
      nextBtn.removeAttribute('disabled')
      nextBtn.classList.remove('bf-spinner')
    }
  }

  async #beforeStepChange() {
    this.#setIsLoading(true)
    try {
      if (typeof isFormValidatedWithoutError !== 'undefined') { await isFormValidatedWithoutError(this.#contentId, { step: this.#currentStep }) }
    } catch (_) {
      return Promise.resolve(false)
    } finally {
      this.#setIsLoading(false)
    }
    return Promise.resolve(true)
  }

  #onStepChange() {
    if (this.#saveProgress) saveFormProgress(this.#contentId)
  }

  #addNextBtnEvent() {
    if (!this.#nextBtns.length) return
    this.#nextBtns.forEach((btn) => {
      this.#addEvent(btn, 'click', async () => {
        if (this.#validateOnStepChange) {
          const isValidated = await this.#beforeStepChange()
          if (!isValidated) return
        }
        if (this.#maintainStepHistory) {
          this.#history.push(this.#currentStep)
        }
        this.#currentStep += 1
        this.#showStep(this.#currentStep)
        this.#onStepChange()
      })
    })
  }

  get step() {
    return this.#currentStep
  }

  set step(step) {
    const changedStep = Number(step)
    const newStepWrapper = this.#getCurrentStepWrapper(changedStep)
    if (!newStepWrapper) return
    if (this.#maintainStepHistory && this.#currentStep < changedStep) {
      this.#history.push(this.#currentStep)
    }
    this.#currentStep = changedStep
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

  #removeAllEventListeners() {
    this.#allEventListeners.forEach(({ elm, event, handler }) => {
      elm.removeEventListener(event, handler)
    })
  }

  reset() {
    console.log('reset')
    this.step = this.#defaultStep || 1
    this.#removeAllEventListeners()
    this.init()
  }
}
