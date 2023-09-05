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

    this.#disableInitialStepBtns()
    this.#addNextBtnEvent()
    this.#addPrevBtnEvent()
    this.#addStepHeaderEvents()
  }

  #disableInitialStepBtns() {
    const firstStep = this.#getCurrentStepWrapper(1)
    const prevBtn = this.#select('.prev-step-btn', firstStep)
    if (prevBtn) {
      prevBtn.disabled = true
      this.#prevBtns = this.#prevBtns.filter((btn) => btn.isEqualNode(prevBtn) === false)
    }
    const formId = this.#getFormId()
    const totalSteps = this.#selectAll(`._frm-b${formId}-stp-cntnt[data-step]`).length
    const lastStep = this.#getCurrentStepWrapper(totalSteps)
    const nextBtn = this.#select('.next-step-btn', lastStep)
    if (nextBtn) {
      nextBtn.disabled = true
      this.#nextBtns = this.#nextBtns.filter((btn) => btn.isEqualNode(nextBtn) === false)
    }
  }

  #handleStepHeaderEvent(e) {
    e.preventDefault()
    const formId = this.#getFormId()
    const stepHdrWrp = e.target.closest(`._frm-b${formId}-stp-hdr`)
    const isDisabled = stepHdrWrp.classList.contains('disabled')
    if (isDisabled) return
    const stepNum = Number(stepHdrWrp.getAttribute('data-step'))
    if (this.#currentStep === stepNum) return
    this.#currentStep = stepNum
    this.#showStep(stepNum)
  }

  #addStepHeaderEvents() {
    const formId = this.#getFormId()
    const allStepHeaders = this.#selectAll(`._frm-b${formId}-stp-hdr`)
    if (!allStepHeaders) return
    allStepHeaders.forEach(stepHdr => {
      const iconWrp = this.#select(`._frm-b${formId}-stp-icn-cntn`, stepHdr)
      if (iconWrp) this.#addEvent(iconWrp, 'click', e => this.#handleStepHeaderEvent(e))
      const lblWrp = this.#select(`._frm-b${formId}-stp-hdr-lbl`, stepHdr)
      if (lblWrp) this.#addEvent(lblWrp, 'click', e => this.#handleStepHeaderEvent(e))
    })
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
    const formId = this.#getFormId()
    return this.#select(`._frm-b${formId}-stp-cntnt[data-step="${step}"]`)
  }

  #canGoNext() {
    const stepWrapper = this.#getCurrentStepWrapper(this.#currentStep + 1)
    if (!stepWrapper) return false
  }

  #canGoPrev() {
    const stepWrapper = this.#getCurrentStepWrapper(this.#currentStep - 1)
    if (!stepWrapper) return false
  }

  #getFormId() {
    return Number(this.#contentId.split('_')[1])
  }

  #showStep(step) {
    const formId = this.#getFormId()
    const stepWrapper = this.#select(`._frm-b${formId}-stp-cntnt[data-step="${step}"]`)
    if (!stepWrapper) return
    stepWrapper.classList.remove('d-none')
    const otherSteps = this.#selectAll(`._frm-b${formId}-stp-cntnt:not([data-step="${step}"])`)
    otherSteps.forEach((stepElm) => {
      stepElm.classList.add('d-none')
    })
    // step headers
    const allStepHeaders = this.#selectAll(`._frm-b${formId}-stp-hdr`)
    allStepHeaders.forEach(stepHdr => {
      const classes = ['completed', 'active']
      stepHdr.classList.remove(...classes)
      const stepNum = Number(stepHdr.getAttribute('data-step'))
      if (stepNum < step) stepHdr.classList.add('completed')
      else if (stepNum === step) stepHdr.classList.add('active')
    })
    // progress bar
    const progressFillElm = this.#select(`._frm-b${formId}-progress-fill`)
    const totalSteps = otherSteps.length + 1
    const progress = Math.round(((step - 1) / totalSteps) * 100)
    progressFillElm.textContent = `${progress}%`
    progressFillElm.style.width = `${progress}%`
  }

  #setIsLoading(status) {
    const currentStep = this.#getCurrentStepWrapper()
    if (!currentStep) return
    const nextBtn = this.#select('.next-step-btn', currentStep)
    if (!nextBtn) return
    const spinner = this.#select('.bf-spinner', nextBtn)
    if (status) {
      nextBtn.disabled = true
      spinner.classList.remove('d-none')
    } else {
      nextBtn.removeAttribute('disabled')
      spinner.classList.add('d-none')
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
    if (this.#saveProgress && typeof saveFormProgress !== 'undefined') saveFormProgress(this.#contentId)
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
        // remove step header disabled class
        const formId = this.#getFormId()
        const stepHdr = this.#select(`._frm-b${formId}-stp-hdr[data-step="${this.#currentStep}"]`)
        if (stepHdr) stepHdr.classList.remove('disabled')
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
