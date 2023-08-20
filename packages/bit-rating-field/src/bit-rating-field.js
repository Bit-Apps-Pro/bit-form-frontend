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

  #defaultValue = null

  constructor(selector, config) {
    this.#document = config?.document || document
    this.#fieldKey = config?.fieldKey
    this.#isCheck = { status: false, indx: null }

    console.log('config', config)

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
    this.#defaultValue = config?.defaultValue || null

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
      if (this.#defaultValue === item.val || item?.check) {
        this.#isCheck = { status: true, indx: index }
        if (this.#showMsgOnSelect) {
          this.#addMessage(index)
        } else {
          this.#removeMessage()
        }
      }
    })
  }

  #addEvent(selector, eventType, cb) {
    selector.addEventListener(eventType, cb)
    this.#allEventListeners.push({ selector, eventType, cb })
  }

  // for add class keyboard event
  #addNavigateHoverStyle(index) {
    for (let i = 0; i <= index; i += 1) {
      const stats = this.#labels[i].querySelector(this.#ratingImg)
      this.#addClass(stats, this.#ratingHover)
      this.#removeClass(stats, this.#ratingScale)
    }
    // add message
    if (this.#showMsgOnHover) {
      this.#addMessage(index)
    }
    // add scale this index
    const star = this.#labels[index].querySelector(this.#ratingImg)
    this.#addClass(star, this.#ratingScale)
  }

  #removeNavigateHoverStyle(index) {
    const star = this.#labels[index].querySelector(this.#ratingImg)
    this.#removeClass(star, this.#ratingHover)
    // remove scale
    // previous item message show
    if (this.#showMsgOnHover) {
      this.#addMessage(index - 1)
    }
    // add scale back
    const preIndex = index - 1
    if (preIndex >= 0) {
      const preStar = this.#labels[preIndex].querySelector(this.#ratingImg)
      this.#addClass(preStar, this.#ratingScale)
    }
    // this.#removeClass(star, this.#ratingScale)
  }

  #handleKeyboardNavigation() {
    let activeIndex = -1
    const selectIndex = this.#ratingOptions.findIndex((item) => item.check)
    if (selectIndex) {
      activeIndex = selectIndex
    }

    this.#addEvent(this.#ratingWrp, 'keydown', (e) => {
      // this.#ratingWrp.addEventListener('keydown', (e) => {
      const totalChildrenLen = e.target.children.length - 1
      if (e.key === 'ArrowRight') {
        if (activeIndex === totalChildrenLen) {
          activeIndex = totalChildrenLen
        } else {
          activeIndex += 1
        }

        const childrenElement = e.target.children[activeIndex]
        const val = parseInt(childrenElement.dataset.indx)
        this.#addNavigateHoverStyle(val)
      } else if (e.key === 'ArrowLeft') {
        this.#removeNavigateHoverStyle(activeIndex)
        if (activeIndex === 0) {
          activeIndex = 0
        } else {
          activeIndex -= 1
        }
      }
      if (e.key === 'Enter') {
        e.preventDefault()
        this.#onClick(activeIndex)
      }
    })
  }

  init() {
    this.#selectorVariable()

    this.#labels = this.#ratingWrp.querySelectorAll(this.#ratingLbl)
    this.#msg = this.#select(this.#ratingMsg)

    this.#checkDefaultRatingSelected()

    this.#handleKeyboardNavigation()

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
        this.#onClick(indx)
      })

      this.#addEvent(item, 'touchstart', (e) => {
        e.preventDefault()
        const { indx } = item.dataset
        this.#onClick(indx)
      })

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
      } else if (this.#msg) {
        this.#removeMessage()
      }
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

    if (this.#showMsgOnSelect) {
      this.#addMessage(this.#isCheck.indx)
    } else {
      this.#removeMessage()
    }
  }

  #onClick(indx) {
    if (this.#labels?.[this.#isCheck.indx]) {
      const rmvSltCls = this.#labels[this.#isCheck.indx].querySelector(this.#ratingImg)
      this.#removeClass(rmvSltCls, this.#ratingSelected)
    }

    // if (this.#showMsgOnSelect) {
    //   this.#addMessage(indx)
    // } else {
    //   // this.#removeMessage()
    // }

    const input = this.#labels?.[indx].querySelector(this.#ratingInput)

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

    input.dispatchEvent(new Event('input'))

    for (let i = 0; i <= indx; i += 1) {
      if (this.#labels?.[i]) {
        const isStar = this.#labels[i].querySelector(this.#ratingImg)
        if (i <= indx && this.#isCheck.status) {
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
      this.#removeMessage()
    }
  }

  #findRating(indx) {
    return this.#ratingOptions[indx]
  }

  #addMessage(indx) {
    const findRating = this.#findRating(indx)
    if (this.#msg && findRating) {
      this.#msg.innerText = findRating.lbl
    }
  }

  #removeMessage() {
    this.#msg && (this.#msg.innerHTML = '')
  }

  #addClass(el, className) {
    el.classList.add(className)
  }

  #removeClass(el, className) {
    el.classList.remove(className)
  }

  set value(val) {
    // find index of rating
    console.log({ val })
    const findRating = this.#ratingOptions.findIndex((itm) => itm.val === val)
    if (findRating !== -1) {
      this.#onClick(findRating)
    }
  }

  get value() {
    console.log(this.#ratingOptions, this.#isCheck.indx)
    const selectedItem = this.#ratingOptions[this.#isCheck.indx]
    return selectedItem.val || selectedItem.lbl
  }

  #removeAllSelectedRating() {
    this.#labels.forEach((item) => {
      const ele = item.querySelector(this.#ratingImg)
      this.#removeClass(ele, this.#ratingSelected)
    })
  }

  #dispatchAllEvent() {
    this.#allEventListeners.forEach(({ selector, eventType, cb }) => {
      selector.removeEventListener(eventType, cb)
    })
  }

  destroy() {
    this.#removeAllSelectedRating()
    this.#dispatchAllEvent()
    this.#labels = null
    this.#msg = null
  }

  reset() {
    this.#removeAllSelectedRating()
    this.#dispatchAllEvent()
    this.#isCheck = { status: false, indx: null }
    // this.#selectedRatingInput.checked = false
    this.#selectedRatingInput = null
    this.init()
  }
}
