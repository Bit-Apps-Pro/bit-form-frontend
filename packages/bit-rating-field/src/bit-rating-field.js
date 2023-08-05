/* eslint-disable radix */
export default class BitRatingField {
  #start = null

  #msg = null

  #ratingOptions = []

  #document = null

  #fieldKey = null

  #contentId = null

  #showMsgOnHover = false

  #showMsgOnSelect = false

  #ratingWrp = null

  #isCheck = {}

  constructor(selector, config) {
    this.#document = config?.document || document
    this.#fieldKey = config.fieldKey
    this.#isCheck = { status: false, val: null }

    if (typeof selector === 'string') {
      this.#ratingWrp = this.#document.querySelector(selector)
    } else {
      this.#ratingWrp = selector
    }

    this.#contentId = config?.contentId
    this.#ratingOptions = config?.options || []

    this.#showMsgOnHover = config?.showReviewLblOnHover || false
    this.#showMsgOnSelect = config?.showReviewLblOnSelect || false

    this.init()
  }

  init() {
    this.#start = this.#ratingWrp.querySelectorAll(`.${this.#fieldKey}-rating-lbl`)
    this.#msg = this.#select(`.${this.#fieldKey}-rating-msg`)

    this.#start.forEach((item, i) => {
      if (this.#showMsgOnHover) {
        item.addEventListener('mouseover', () => {
          // eslint-disable-next-line radix
          const val = parseInt(item.dataset.val)
          const findRating = this.#findRating(val)
          this.#msg.innerHTML = findRating.lbl
        })
        item.addEventListener('mouseout', () => {
          const val = parseInt(item.dataset.val)
          if (this.#isCheck.status && this.#isCheck.val === val) {
            const findRating = this.#findRating(val)
            this.#msg.innerHTML = findRating.lbl
            return
          }

          if (this.#isCheck.status) {
            const rating = this.#findRating(this.#isCheck.val)
            this.#msg.innerHTML = rating.lbl
            return
          }

          if (this.#msg) { this.#msg.innerHTML = '' }
        })
      }

      if (this.#showMsgOnSelect) {
        item.addEventListener('click', () => {
          const val = parseInt(item.dataset.val)
          this.#isCheck = { status: true, val }
          const rating = this.#findRating(val)
          this.#msg.innerHTML = rating.lbl
        })
      }
    })
  }

  #select(selector) { return this.#ratingWrp.querySelector(selector) }

  #findRating(val) { return this.#ratingOptions.find(itm => itm.val === val) }

  destroy() {
    this.#start = null
    this.#msg = null
  }

  reset() {
    this.#start = null
    this.#msg = null
  }
}
