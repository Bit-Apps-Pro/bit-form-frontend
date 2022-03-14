export default class RecaptchaField {
  #recaptchaWrap = null

  #recaptcha = null

  #config = {
    theme: 'light',
    size: 'normal',
  }

  constructor(selector, config) {
    Object.assign(this.#config, config)

    if (typeof selector === 'string') {
      this.#recaptchaWrap = document.querySelector(selector)
    } else {
      this.#recaptchaWrap = selector
    }
    this.fieldKey = this.#config.fieldKey

    this.init()
  }

  init() {
    this.#recaptcha = this.#select('.g-recaptcha')
    this.#recaptcha.setAttribute('data-theme', this.#config.theme)
    this.#recaptcha.setAttribute('data-size', this.#config.size)
  }

  #select(selector) { return this.#recaptchaWrap.querySelector(selector) }
}

// const recaptchaField = new RecaptchaField('.container', {
//   theme: 'dark'
// })
