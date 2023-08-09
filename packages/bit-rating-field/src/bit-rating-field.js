/* eslint-disable radix */
export default class BitRatingField {
  #labels = null

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
    this.#fieldKey = config?.fieldKey
    this.#isCheck = { status: false, indx: null }
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
    this.#labels = this.#ratingWrp.querySelectorAll(`.${this.#fieldKey}-rating-lbl`)
    this.#msg = this.#select(`.${this.#fieldKey}-rating-msg`)

    this.#labels.forEach((item, index) => {
      item.addEventListener('mouseover', () => {
        const indx = parseInt(item.dataset.indx)
        this.#hoverAction(indx)
      })

      item.addEventListener('mouseout', () => {
        const { indx } = item.dataset
        this.#onEnd(indx)
      })

      item.addEventListener('click', () => {
        // at first remove selected style
        const { indx } = item.dataset
        this.#onClick(indx, index)
      })

      item.addEventListener('touchstart', () => {
        const { indx } = item.dataset
        this.#onClick(indx, index)
      })

      item.addEventListener('touchend', () => {
        const { indx } = item.dataset
        this.#onEnd(indx)
      })
    })
  }

  #select(selector) { return this.#ratingWrp.querySelector(selector) }

  #hoverAction(indx) {
    if (this.#showMsgOnHover) {
      const findRating = this.#findRating(indx)
      if (this.#msg) {
        this.#msg.innerText = findRating.lbl
      }
    }

    // for styling
    if (this.#isCheck.indx) {
      if (this.#labels?.[this.#isCheck.indx]) {
        this.#labels.forEach((itm) => {
          const ele = itm.querySelector(`.${this.#fieldKey}-rating-img`)
          this.#removeClass(ele, `${this.#fieldKey}-rating-is-selected`)
          this.#removeClass(ele, `${this.#fieldKey}-rating-selected`)
        })
        for (let i = 0; i <= this.#isCheck.indx; i += 1) {
          const stats = this.#labels[i].querySelector(`.${this.#fieldKey}-rating-img`)
          this.#addClass(stats, `${this.#fieldKey}-rating-selected`)
        }
      }
    }

    for (let i = 0; i <= indx; i += 1) {
      if (i <= indx) {
        if (this.#labels?.[i]) {
          const stats = this.#labels[i].querySelector(`.${this.#fieldKey}-rating-img`)
          this.#addClass(stats, `${this.#fieldKey}-rating-hover`)
        }
      }
    }
  }

  #onEnd(indx) {
    if (this.#showMsgOnHover) {
      if (this.#isCheck.status && this.#isCheck.indx === indx) {
        const findRating = this.#findRating(indx)
        this.#msg.innerText = findRating.lbl
      } else if (this.#isCheck.status) {
        const rating = this.#findRating(this.#isCheck.indx)
        this.#msg.innerText = rating.lbl
      } else if (this.#msg) { this.#msg.innerHTML = '' }
    }

    // for styling
    for (let i = 0; i <= indx; i += 1) {
      if (this.#labels?.[i]) {
        const stats = this.#labels[i].querySelector(`.${this.#fieldKey}-rating-img`)
        this.#removeClass(stats, `${this.#fieldKey}-rating-hover`)
      }
    }

    if (this.#isCheck.indx) {
      if (this.#labels?.[this.#isCheck.indx]) {
        const selectedEle = this.#labels[this.#isCheck.indx].querySelector(`.${this.#fieldKey}-rating-img`)
        this.#removeClass(selectedEle, `${this.#fieldKey}-rating-is-selected`)
        for (let i = 0; i <= this.#isCheck.indx; i += 1) {
          const stats = this.#labels[i].querySelector(`.${this.#fieldKey}-rating-img`)
          this.#addClass(stats, `${this.#fieldKey}-rating-selected`)
        }
      }
    }
  }

  #onClick(indx, index) {
    if (this.#labels?.[this.#isCheck.indx]) {
      const rmvSltCls = this.#labels[this.#isCheck.indx].querySelector(`.${this.#fieldKey}-rating-img`)
      this.#removeClass(rmvSltCls, `${this.#fieldKey}-rating-selected`)
    }

    this.#isCheck = { status: true, indx }

    if (this.#showMsgOnHover) {
      const rating = this.#findRating(indx)
      this.#msg.innerHTML = rating.lbl
    }
    item.querySelector(`.${this.#fieldKey}-rating-input`).checked = true

    for (let i = 0; i <= index; i += 1) {
      if (this.#labels?.[i]) {
        const isStar = this.#labels[i].querySelector(`.${this.#fieldKey}-rating-img`)
        if (i <= index) {
          this.#addClass(isStar, `${this.#fieldKey}-rating-selected`)
        } else {
          this.#removeClass(isStar, `${this.#fieldKey}-rating-selected`)
        }
      }
    }
    // remove hover color when click star
    this.#labels?.forEach((itm) => {
      const rmvHorCls = itm.querySelector(`.${this.#fieldKey}-rating-img`)
      this.#removeClass(rmvHorCls, `${this.#fieldKey}-rating-hover`)
    })
  }

  #findRating(indx) {
    return this.#ratingOptions[indx]
  }

  #addClass(el, className) {
    el.classList.add(className)
  }

  #removeClass(el, className) {
    el.classList.remove(className)
  }

  destroy() {
    this.#labels = null
    this.#msg = null
  }

  reset() {
    this.#labels = null
    this.#msg = null
  }
}

/**
 * hover color bright
 * selected color bright
 * on hover selected color dark and hover color bright
 */
