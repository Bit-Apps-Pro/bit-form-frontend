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

  #selectedRating = false

  #ratingWrp = null

  #isCheck = {}

  #ratingImg = null

  #ratingLbl = null

  #ratingInput = null

  #ratingMsg = null

  #ratingHover = null

  #ratingScale = null

  #ratingSelected = null

  #selectedRatingInput = null

  #allEventListeners = []

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
    this.#selectedRating = config?.selectedRating || false

    this.init()
  }

  #selectorVariable() {
    this.#ratingImg = `.${this.#fieldKey}-rating-img`
    this.#ratingLbl = `.${this.#fieldKey}-rating-lbl`
    this.#ratingInput = `.${this.#fieldKey}-rating-input`
    this.#ratingMsg = `.${this.#fieldKey}-rating-msg`

    // for add and remove class name so not using dot
    this.#ratingHover = `${this.#fieldKey}-rating-hover`
    this.#ratingScale = `${this.#fieldKey}-rating-scale`
    this.#ratingSelected = `${this.#fieldKey}-rating-selected`
  }

  #checkDefaultRatingSelected() {
    this.#ratingOptions.forEach((item, index) => {
      if (item?.check) {
        this.#isCheck = { status: true, indx: index }
        // const ele = this.#labels[index].querySelector(this.#ratingInput)
        // console.log(ele)
        // ele.checked = true
        // console.log('get selecred', ele.checked)
      }
    })
  }

  #addEvent(selector, eventType, cb) {
    selector.addEventListener(eventType, cb)
    this.#allEventListeners.push({ selector, eventType, cb })
  }

  init() {
    this.#selectorVariable()

    this.#labels = this.#ratingWrp.querySelectorAll(this.#ratingLbl)
    this.#msg = this.#select(this.#ratingMsg)
    this.#checkDefaultRatingSelected()

    this.#labels.forEach((item, index) => {
      if (this.#isCheck.status && index <= this.#isCheck.indx) {
        const imageElement = item.querySelector(this.#ratingImg)
        this.#addClass(imageElement, this.#ratingSelected)
        if (this.#ratingOptions[index].check) {
          const selectedInput = item.querySelector(this.#ratingInput)
          selectedInput.checked = true
        }
      }

      this.#addEvent(item, 'mouseover', () => {
        const indx = parseInt(item.dataset.indx)
        this.#hoverAction(indx)
      })

      this.#addEvent(item, 'mouseout', () => {
        const { indx } = item.dataset
        this.#onEnd(indx)
      })

      this.#addEvent(item, 'click', (e) => {
        const { indx } = item.dataset
        e.preventDefault()
        this.#onClick(indx, index)
      })

      // item.addEventListener('touchstart', (e) => {
      //   e.preventDefault()
      //   const { indx } = item.dataset
      //   this.#onClick(indx, index)
      // })

      this.#addEvent(item, 'touchstart', (e) => {
        e.preventDefault()
        const { indx } = item.dataset
        this.#onClick(indx, index)
      })

      // item.addEventListener('touchend', () => {
      //   const { indx } = item.dataset
      //   this.#onEnd(indx)
      // })

      this.#addEvent(item, 'touchend', () => {
        const { indx } = item.dataset
        this.#onEnd(indx)
      })
    })
  }

  #select(selector) { return this.#ratingWrp.querySelector(selector) }

  #hoverAction(indx) {
    if (this.#showMsgOnHover) {
      this.#addMessage(indx)
    }

    // for styling
    if (this.#isCheck.indx) {
      if (this.#labels?.[this.#isCheck.indx]) {
        const len = this.#labels.length - 1
        this.#labels.forEach((itm) => {
          const ele = itm.querySelector(this.#ratingImg)
          this.#removeClass(ele, this.#ratingSelected)
        })

        for (let i = 0; i <= this.#isCheck.indx; i += 1) {
          const stats = this.#labels[i].querySelector(this.#ratingImg)
          this.#removeClass(stats, this.#ratingSelected)
        }

        if (this.#isCheck.indx === len) {
          for (let i = 0; i <= this.#isCheck.indx; i += 1) {
            const stats = this.#labels[i].querySelector(this.#ratingImg)
            this.#removeClass(stats, this.#ratingSelected)
          }
        }
      }
    }

    for (let i = 0; i <= indx; i += 1) {
      if (i <= indx && this.#labels?.[i]) {
        const stats = this.#labels[i].querySelector(this.#ratingImg)
        this.#addClass(stats, this.#ratingHover)
        if (i === indx) {
          this.#addClass(stats, this.#ratingScale)
        }
      }
    }
  }

  #onEnd(indx) {
    if (this.#showMsgOnHover) {
      if (this.#isCheck.status && this.#isCheck.indx === indx) {
        this.#addMessage(indx)
      } else if (this.#isCheck.status) {
        this.#addMessage(this.#isCheck.indx)
      } else if (this.#msg) { this.#msg.innerHTML = '' }
    }

    // for styling
    for (let i = 0; i <= indx; i += 1) {
      if (this.#labels?.[i]) {
        const stats = this.#labels[i].querySelector(this.#ratingImg)
        this.#removeClass(stats, this.#ratingHover)
        this.#removeClass(stats, this.#ratingScale)
      }
    }

    if (this.#isCheck.status) {
      if (this.#labels?.[this.#isCheck.indx]) {
        for (let i = 0; i <= this.#isCheck.indx; i += 1) {
          const stats = this.#labels[i].querySelector(this.#ratingImg)
          this.#addClass(stats, this.#ratingSelected)
        }
      }
    }
  }

  #onClick(indx, index) {
    if (this.#labels?.[this.#isCheck.indx]) {
      const rmvSltCls = this.#labels[this.#isCheck.indx].querySelector(this.#ratingImg)
      this.#removeClass(rmvSltCls, this.#ratingSelected)
    }

    if (this.#showMsgOnSelect) {
      this.#addMessage(indx)
    }

    const input = this.#labels?.[index].querySelector(this.#ratingInput)

    if (this.#selectedRatingInput) {
      if (input?.checked) {
        input.checked = false
        this.#isCheck = { status: false, indx: null }
      } else {
        input.checked = true
        this.#isCheck = { status: true, indx }
      }
    } else {
      input.checked = true
      this.#isCheck = { status: true, indx }
      this.#selectedRatingInput = input
    }

    for (let i = 0; i <= index; i += 1) {
      if (this.#labels?.[i]) {
        const isStar = this.#labels[i].querySelector(this.#ratingImg)
        if (i <= index && this.#isCheck.status) {
          this.#addClass(isStar, this.#ratingSelected)
        } else {
          this.#removeClass(isStar, this.#ratingSelected)
        }
      }
    }

    // remove hover color when click star
    this.#labels?.forEach((itm) => {
      const rmvHorCls = itm.querySelector(this.#ratingImg)
      this.#removeClass(rmvHorCls, this.#ratingHover)
    })

    if (this.#showMsgOnSelect && this.#isCheck.status) {
      this.#addMessage(indx)
    } else {
      this.#msg && (this.#msg.innerHTML = '')
    }
  }

  #findRating(indx) {
    return this.#ratingOptions[indx]
  }

  #addMessage(indx) {
    const findRating = this.#findRating(indx)
    if (this.#msg) {
      this.#msg.innerText = findRating.lbl
    }
  }

  #addClass(el, className) {
    el.classList.add(className)
  }

  #removeClass(el, className) {
    el.classList.remove(className)
  }

  #removeAllSelectedRating() {
    this.#labels.forEach((item) => {
      const ele = item.querySelector(this.#ratingImg)
      this.#removeClass(ele, this.#ratingSelected)
    })
  }

  #detachAllEvents() {
    this.#allEventListeners.forEach(({ selector, eventType, cb }) => {
      selector.removeEventListener(eventType, cb)
    })
  }

  destroy() {
    this.#removeAllSelectedRating()
    this.#labels = null
    this.#msg = null
  }

  reset() {
    this.#removeAllSelectedRating()
    this.#detachAllEvents()
    this.#isCheck = { status: false, indx: null }
    this.#selectedRatingInput.checked = false
    this.#selectedRatingInput = null
    this.init()
  }
}
