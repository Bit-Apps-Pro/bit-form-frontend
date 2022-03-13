import { observeElement } from '../../../Utils/globalHelpers'
import VirtualizedList from './virtualized-list.min'

class CurrencyField {
  #placeholderImage = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'/>"

  #currencyNumberFieldWrapper = null

  #currencyHiddenInputElm = null

  #clearCurrencyInputElm = null

  #dropdownWrapperElm = null

  #optionWrapperElm = null

  #selectedCurrencyImgElm = null

  #selectedCurrencyCode = null

  #searchInputElm = null

  #currencyInputElm = null

  #clearSearchBtnElm = null

  #optionListElm = null

  #options = []

  #config = {
    maxHeight: 370,
    searchCurrencyPlaceholder: 'Search Currency',
    noCurrencyFoundText: 'No Currency Found',
    searchClearable: true,
    selectedFlagImage: true,
    defaultCurrencyKey: '',
    inputFormatOptions: {
      formatter: 'browser',
      showCurrencySymbol: true,
    },
    valueFormatOptions: {
      formatter: 'browser',
      showCurrencySymbol: true,
    },
  }

  #debounceTimeout = null

  #dropdownSearchTerm = ''

  #allEventListeners = []

  constructor(selector, config) {
    Object.assign(this.#config, config)
    if (typeof selector === 'string') {
      this.#currencyNumberFieldWrapper = document.querySelector(selector)
    } else {
      this.#currencyNumberFieldWrapper = selector
    }

    this.#options = [...this.#config.options]
    this.fieldKey = this.#config.fieldKey

    this.init()
  }

  init() {
    this.#currencyInputElm = this.#select(`.${this.fieldKey}-currency-amount-input`)
    this.#currencyHiddenInputElm = this.#select(`.${this.fieldKey}-currency-hidden-input`)
    this.#clearCurrencyInputElm = this.#select(`.${this.fieldKey}-input-clear-btn`)
    this.#selectedCurrencyImgElm = this.#select(`.${this.fieldKey}-selected-currency-img`)
    this.#searchInputElm = this.#select(`.${this.fieldKey}-opt-search-input`)
    this.#dropdownWrapperElm = this.#select(`.${this.fieldKey}-dpd-wrp`)
    this.#optionWrapperElm = this.#select(`.${this.fieldKey}-option-wrp`)
    this.#clearSearchBtnElm = this.#select(`.${this.fieldKey}-search-clear-btn`)
    this.#optionListElm = this.#select(`.${this.fieldKey}-option-list`)

    this.#addEvent(this.#currencyNumberFieldWrapper, 'keydown', e => { this.#handleKeyboardNavigation(e) })

    this.#addEvent(this.#dropdownWrapperElm, 'click', e => { this.#handleDropdownClick(e) })
    this.#addEvent(this.#dropdownWrapperElm, 'keyup', e => { this.#handleDropdownClick(e) })

    this.#addEvent(this.#currencyInputElm, 'focus', e => { this.#handleCurrencyInputFocus() })
    this.#addEvent(this.#currencyInputElm, 'blur', e => { this.#handleCurrencyInputBlur() })
    this.#addEvent(this.#currencyInputElm, 'input', e => { this.#handleCurrencyInput(e) })

    observeElement(this.#currencyHiddenInputElm, 'value', (oldVal, newVal) => { this.#handleHiddenInputValueChange(oldVal, newVal) })

    this.#addEvent(this.#clearCurrencyInputElm, 'click', e => { this.#handleClearCurrencyInput(e) })

    this.#handleDefaultCurrencyInputValue()

    this.#generateOptions()

    if (this.#config.defaultCurrencyKey) this.setSelectedCurrencyItem(this.#config.defaultCurrencyKey)

    if (this.#config.searchClearable) {
      this.#searchInputElm.style.paddingRight = '25px'
      this.#clearSearchBtnElm.style.display = 'block'
      this.#addEvent(this.#clearSearchBtnElm, 'click', () => { this.searchOptions('') })
    }
    this.#searchInputElm.value = ''
    this.#addEvent(this.#searchInputElm, 'keyup', e => { this.#handleSearchInput(e) })
  }

  #handleCurrencyInputFocus() {
    this.#setAttribute(this.#currencyInputElm, 'type', 'number')
    this.#currencyInputElm.value = this.#currencyInputElm.dataset.numValue
  }

  #roundNumbers(value, precision = 0) {
    const multiplier = 10 ** (precision || 0)
    return Math.round(value * multiplier) / multiplier
  }

  #handleCurrencyInputBlur() {
    this.#setAttribute(this.#currencyInputElm, 'type', 'text')
    const numValue = Number(this.#currencyInputElm.dataset.numValue)
    console.log('numvalue', numValue)

    if (!numValue || Number.isNaN(numValue)) {
      this.#currencyInputElm.value = ''
      return
    }

    const { inputFormatOptions, valueFormatOptions } = this.#config

    const formattedValue = this.#handleCurrencyFormat(numValue, inputFormatOptions)

    this.#currencyInputElm.value = formattedValue

    this.value = this.#handleCurrencyFormat(numValue, valueFormatOptions)
  }

  #handleCurrencyFormat(numValue, formatOptions) {
    const selected = this.#getSelectedCurrencyItem()
    const { defaultCurrencyKey } = this.#config
    const { formatter, roundToClosestInteger, showCurrencySymbol, currencyPosition, symbolPosition } = formatOptions
    const currency = selected?.i || defaultCurrencyKey

    if (roundToClosestInteger) {
      numValue = this.#roundNumbers(numValue)
    }

    let formattedValue = ''

    if (formatter === 'browser') {
      formattedValue = this.#browserFormatter(numValue, currency, formatOptions)
    } else if (formatter === 'custom' || !formatter) {
      formattedValue = this.#customFormatter(numValue, formatOptions)
    } else if (formatter === 'none') {
      formattedValue = numValue
    }

    if (symbolPosition === 'left-number') {
      formattedValue = `${selected?.symbol || ''}${formattedValue}`
    } else if (symbolPosition === 'right-number') {
      formattedValue = `${formattedValue}${selected?.symbol || ''}`
    }

    if (showCurrencySymbol) {
      if (currencyPosition === 'left') {
        formattedValue = `${showCurrencySymbol ? `${currency} ` : ''}${formattedValue}`
      } else if (currencyPosition === 'right') {
        formattedValue = `${formattedValue}${showCurrencySymbol ? ` ${currency}` : ''}`
      }
    }

    if (symbolPosition === 'left-currency') {
      formattedValue = `${selected?.symbol || ''}${formattedValue}`
    } else if (symbolPosition === 'right-currency') {
      formattedValue = `${formattedValue}${selected?.symbol || ''}`
    }

    return formattedValue
  }

  #browserFormatter(value, currency, formatOptions) {
    const { showCurrencySymbol, roundToClosestInteger } = formatOptions
    const numberFormatConstruct = new Intl.NumberFormat(navigator.language, { style: 'currency', currency })
    const output = numberFormatConstruct.formatToParts(value).map(p => {
      if (!showCurrencySymbol && p.type === 'currency') return ''

      if (roundToClosestInteger) {
        if (p.type === 'decimal' || p.type === 'fraction') {
          return ''
        }
      }

      // if (p.type === 'decimal') {
      //   // formatOptions.decimalSeparator = p.value
      //   formatOptions = produce(formatOptions, draft => {
      //     draft.decimalSeparator = p.value
      //   })
      // }

      return p.value
    }).join('')

    return output
  }

  #customFormatter(value, formatOptions) {
    const { decimalSeparator, roundToClosestFractionDigits, minimumFractionDigits, maximumFractionDigits, numberFormat } = formatOptions
    const [numberPattern] = numberFormat.split(decimalSeparator)

    const [numberVal, decimalVal = ''] = value.toString().split('.') // type number field will only separate by decimal separator '.'

    const numberFormatted = this.#formatNumberBasedOnPattern(numberVal, numberPattern)
    let decimalFormatted = decimalVal
    const decimalLength = decimalFormatted.length

    if (decimalLength > 0) {
      const max = maximumFractionDigits > 0
      const min = minimumFractionDigits > 0
      if (roundToClosestFractionDigits && decimalFormatted) {
        let precision
        if (max && decimalLength > maximumFractionDigits) {
          precision = maximumFractionDigits
        } else if (min && decimalLength < minimumFractionDigits) {
          precision = minimumFractionDigits
        } else {
          precision = decimalLength
        }
        decimalFormatted = this.#roundNumbers(Number(`0.${decimalFormatted}`), precision).toString().replace('0.', '')
      }
      if (max && decimalFormatted) {
        decimalFormatted = decimalFormatted.slice(0, maximumFractionDigits)
      }
    }

    if (decimalFormatted.length < minimumFractionDigits) {
      decimalFormatted = decimalFormatted.padEnd(minimumFractionDigits, '0')
    }

    let output = ''
    if (decimalFormatted) {
      output = `${numberFormatted}${decimalSeparator}${decimalFormatted}`
    } else {
      output = numberFormatted
    }

    return output
  }

  #formatNumberBasedOnPattern(value = '', pattern = '') {
    let formatted = ''
    let numberIndx = value.length - 1
    for (let i = pattern.length - 1; i >= 0; i--) {
      const ptrn = pattern[i]
      const num = value[numberIndx]
      if (!num) break
      if (ptrn === '#') {
        formatted = num + formatted
        numberIndx--
      } else {
        formatted = ptrn + formatted
      }
    }

    if (numberIndx >= 0) {
      formatted = value.substring(0, numberIndx + 1) + formatted
    }

    return formatted
  }

  #unformatCurrencyValue(value = '') {
    const { decimalSeparator } = this.#config.valueFormatOptions
    const regexp = new RegExp(`[^0-9${decimalSeparator}]`, 'g')
    return value.replace(regexp, '')
  }

  #select(selector) { return this.#currencyNumberFieldWrapper.querySelector(selector) }

  #addEvent(selector, eventType, cb) {
    selector.addEventListener(eventType, cb)
    this.#allEventListeners.push({ selector, eventType, cb })
  }

  #handleDefaultCurrencyInputValue() {
    if (this.#currencyInputElm.value) {
      this.#triggerEvent(this.#currencyInputElm, 'input')
    }
  }

  #handleKeyboardNavigation(e) {
    const activeEl = document.activeElement
    let focussableEl = null
    const isMenuOpen = this.#isMenuOpen()
    if (e.target === this.#currencyInputElm) return

    if (isMenuOpen) {
      const activeIndex = Number(activeEl.dataset.index || -1)
      if (e.key === 'ArrowDown' || (!e.shiftKey && e.key === 'Tab')) {
        e.preventDefault()
        if (activeEl === this.#searchInputElm) {
          focussableEl = this.#select(`.${this.fieldKey}-option:not(.${this.fieldKey}-disabled-opt)`)
        } else if (activeEl.classList.contains('option')) {
          const nextIndex = this.#findNotDisabledOptIndex(activeIndex, 'next')
          const nextElm = this.#selectOptElmByIndex(nextIndex)
          if (nextElm) {
            focussableEl = nextElm
          } else if ((nextIndex + 1) < this.#options.length) {
            this.virtualOptionList?.scrollToIndex(nextIndex, 'center')
            setTimeout(() => {
              const nextElm2 = this.#selectOptElmByIndex(nextIndex)
              if (nextElm2) nextElm2.focus()
            }, 0)
          }
        }
      } else if (e.key === 'ArrowUp' || (e.shiftKey && e.key === 'Tab')) {
        e.preventDefault()
        if (activeEl === this.#searchInputElm) {
          focussableEl = this.#dropdownWrapperElm
          if (this.#isMenuOpen()) {
            this.setMenu({ open: false })
          }
        } else if (activeEl.classList.contains('option')) {
          const prevIndex = this.#findNotDisabledOptIndex(activeIndex, 'previous')
          const prevElm = this.#selectOptElmByIndex(prevIndex)
          if (prevElm) {
            focussableEl = prevElm
          } else if (prevIndex > 0) {
            this.virtualOptionList?.scrollToIndex(prevIndex, 'center')
            setTimeout(() => {
              const prevElm2 = this.#selectOptElmByIndex(prevIndex)
              if (prevElm2) prevElm2.focus()
            }, 0)
          } else if (!prevElm) {
            focussableEl = this.#searchInputElm
          }
        }
      } else if (e.key === 'Escape') {
        this.setMenu({ open: false })
      }
    } else if (e.key >= 'a' && e.key <= 'z') {
      clearTimeout(this.#debounceTimeout)
      this.#dropdownSearchTerm += e.key
      this.#debounceTimeout = setTimeout(() => {
        this.#dropdownSearchTerm = ''
      }, 300)
      const searchedOption = this.#config.options.find(option => !option.disabled && option.lbl.toLowerCase().startsWith(this.#dropdownSearchTerm))
      if (searchedOption) {
        this.setSelectedCurrencyItem(searchedOption.i)
      }
    } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      const selectedCurrencyIndex = this.#getSelectedCurrencyIndex()
      const direction = (e.key === 'ArrowDown') ? 'next' : 'previous'
      const optIndex = this.#findNotDisabledOptIndex(selectedCurrencyIndex, direction)
      if (optIndex > -1 && (optIndex < this.#config.options.length)) {
        this.value = this.#config.options[optIndex].val
      }
    }

    if (focussableEl) focussableEl.focus()
  }

  #triggerEvent(elm, eventType) {
    const event = new Event(eventType)
    elm.dispatchEvent(event)
  }

  #handleClearCurrencyInput() {
    this.#currencyInputElm.value = ''
    this.#setAttribute(this.#currencyInputElm, 'data-num-value', '')
    this.setSelectedCurrencyItem(this.#config.defaultCurrencyKey)
    this.#triggerEvent(this.#currencyInputElm, 'input')
  }

  #selectOptElmByIndex(index) {
    return this.#select(`.${this.fieldKey}-option-list .${this.fieldKey}-option[data-index="${index}"]`)
  }

  #findNotDisabledOptIndex(activeIndex = -1, direction) {
    if (direction === 'next') {
      const optsLength = this.#config.options.length
      for (let i = activeIndex + 1; i < optsLength; i++) {
        const opt = this.#config.options[i]
        if (!opt.disabled) return i
      }
    } else if (direction === 'previous') {
      for (let i = activeIndex - 1; i >= 0; i--) {
        const opt = this.#config.options[i]
        if (!opt.disabled) return i
      }
    }
  }

  #handleOutsideClick(event) {
    if (event.target.contains(this.#currencyNumberFieldWrapper)) {
      this.setMenu({ open: false })
    }
  }

  #detectCurrencyCodeByInputValue(value) {
    return value.match(/[a-zA-Z]+/)?.[0] || ''
  }

  #handleHiddenInputValueChange(oldVal, newVal) {
    const searchedCurrencyCode = this.#detectCurrencyCodeByInputValue(newVal)
    const validCurrencyCode = this.#config.options.find(item => item.i === searchedCurrencyCode)
    if (((searchedCurrencyCode && validCurrencyCode) || !searchedCurrencyCode) && oldVal !== newVal) {
      this.setSelectedCurrencyItem(searchedCurrencyCode || this.#config.defaultCurrencyKey)
      const { decimalSeparator } = this.#config.valueFormatOptions
      const [numberPart, decimalPart] = newVal.split(decimalSeparator)
      const unformattedNumber = this.#unformatCurrencyValue(numberPart)
      const unformattedDecimal = this.#unformatCurrencyValue(decimalPart)
      const newUnformattedValue = (unformattedDecimal) ? `${unformattedNumber}.${unformattedDecimal}` : unformattedNumber
      this.#setAttribute(this.#currencyInputElm, 'data-num-value', newUnformattedValue)
      this.#handleCurrencyInputBlur()
    }
  }

  #handleCurrencyInput(e) {
    const numValue = Number(e.target.value)
    const { minValue, maxValue } = this.#config
    if ((numValue < minValue) || (numValue > maxValue)) {
      return false
    }
    this.#setAttribute(this.#currencyInputElm, 'data-num-value', numValue)
    if (numValue) {
      this.#clearCurrencyInputElm.style.display = 'grid'
    } else {
      this.#clearCurrencyInputElm.style.display = 'none'
    }
  }

  #getSelectedCurrencyIndex() {
    const index = this.#options.findIndex(ot => ot.i === this.#selectedCurrencyCode)
    return index === -1 ? 0 : index
  }

  #getSelectedCurrencyItem() {
    return this.#config.options.find(opt => opt.i === this.#selectedCurrencyCode)
  }

  #createElm(elm) {
    return document.createElement(elm)
  }

  #setClassName(elm, cn) {
    elm.classList.add(cn)
  }

  #setTextContent(elm, txt) {
    elm.textContent = txt
  }

  #setAttribute(elm, name, value) {
    elm?.setAttribute?.(name, value)
  }

  #generateOptions() {
    const selectedIndex = this.#getSelectedCurrencyIndex()
    this.virtualOptionList = new VirtualizedList(this.#optionListElm, {
      height: this.#config.maxHeight,
      rowCount: this.#options.length,
      rowHeight: 31,
      initialIndex: selectedIndex === -1 ? 0 : selectedIndex,
      renderRow: index => {
        const opt = this.#options[index]
        const li = this.#createElm('li')
        this.#setAttribute(li, 'data-key', opt.i)
        this.#setAttribute(li, 'data-index', index)
        if (!opt.i) {
          this.#setTextContent(li, opt.lbl)
          this.#setClassName(li, `${this.fieldKey}-opt-not-found`)
          return li
        }
        this.#setClassName(li, `${this.fieldKey}-option`)
        const lblimgbox = this.#createElm('span')
        this.#setClassName(lblimgbox, `${this.fieldKey}-opt-lbl-wrp`)
        const img = this.#createElm('img')
        this.#setClassName(img, `${this.fieldKey}-opt-icn`)
        img.src = `${bits.assetsURL}${opt.img}`
        img.alt = `${opt.lbl} flag image`
        img.loading = 'lazy'
        this.#setAttribute(img, 'aria-hidden', true)
        const lbl = this.#createElm('span')
        this.#setClassName(lbl, `${this.fieldKey}-opt-lbl`)
        this.#setTextContent(lbl, opt.lbl)
        lblimgbox.append(img, lbl)
        const prefix = this.#createElm('span')
        this.#setClassName(prefix, `${this.fieldKey}-opt-suffix`)
        this.#setTextContent(prefix, opt.i)
        this.#setAttribute(li, 'tabindex', this.#isMenuOpen() ? '0' : '-1')
        this.#setAttribute(li, 'role', 'option')
        this.#setAttribute(li, 'aria-posinset', index + 1)
        this.#setAttribute(li, 'aria-setsize', this.#options.length)

        this.#addEvent(li, 'click', e => {
          this.setSelectedCurrencyItem(e.currentTarget.dataset.key)
        })
        this.#addEvent(li, 'keyup', e => {
          if (e.key === 'Enter') {
            this.setSelectedCurrencyItem(e.currentTarget.dataset.key)
          }
        })

        if (opt.disabled) {
          this.#setClassName(li, `${this.fieldKey}-disabled-opt`)
        }

        li.append(lblimgbox, prefix)

        if (this.#selectedCurrencyCode === opt.i) {
          this.#setClassName(li, `${this.fieldKey}-selected-opt`)
          this.#setAttribute(li, 'aria-selected', true)
        } else {
          this.#setAttribute(li, 'aria-selected', false)
        }

        return li
      },

    })
  }

  #clearSelectedCurrency() {
    this.#selectedCurrencyCode = ''
    if (this.#config.selectedFlagImage) {
      this.#selectedCurrencyImgElm.src = this.#placeholderImage
    }
    this.value = ''
    this.#reRenderVirtualOptions()
  }

  setSelectedCurrencyItem(currencyKey) {
    this.#selectedCurrencyCode = currencyKey
    if (!this.#selectedCurrencyCode) {
      this.#clearSelectedCurrency()
      return
    }
    const selectedItem = this.#getSelectedCurrencyItem()
    if (!selectedItem) return
    this.#selectedCurrencyImgElm.src = `${bits.assetsURL}${selectedItem.img}`
    this.setMenu({ open: false })
    this.#handleCurrencyInputBlur()
  }

  #reRenderVirtualOptions() {
    this.virtualOptionList?.setRowCount(this.#options.length)
    this.virtualOptionList?.scrollToIndex(this.#getSelectedCurrencyIndex())
  }

  #setSearchValue(val) {
    this.#searchInputElm.value = val
  }

  #handleSearchInput(e) {
    if (e.key === 'Enter' && this.#options.length) {
      const optKey = this.#select(`.${this.fieldKey}option`)?.dataset.key
      this.setSelectedCurrencyItem(optKey)
      this.searchOptions('')
    } else {
      this.searchOptions(e.target.value)
    }
  }

  searchOptions(value) {
    this.#setSearchValue(value)
    let filteredOptions = []

    if (value) {
      filteredOptions = this.#config.options.filter(opt => {
        const searchText = value.toLowerCase()
        const lbl = (opt.lbl || '').toLowerCase()
        const val = (opt.val || '').toLowerCase()
        const code = (opt.i || '').toLowerCase()
        if (lbl.includes(searchText)) return true
        if (val.includes(searchText)) return true
        if (code.includes(searchText)) return true
      })
      if (!filteredOptions.length) {
        filteredOptions = [{ i: 0, lbl: 'No Currency Found' }]
      }
      this.#options = filteredOptions
      this.#clearSearchBtnElm.style.display = 'grid'
    } else {
      this.#options = this.#config.options
      this.#clearSearchBtnElm.style.display = 'none'
    }

    this.#reRenderVirtualOptions()
  }

  #isMenuOpen() {
    return this.#currencyNumberFieldWrapper.classList.contains(`${this.fieldKey}-menu-open`)
  }

  setMenu({ open }) {
    this.#optionWrapperElm.style.height = `${open ? this.#config.maxHeight : 0}px`
    if (open) {
      this.#setClassName(this.#currencyNumberFieldWrapper, `${this.fieldKey}-menu-open`)
      this.#addEvent(document, 'click', e => this.#handleOutsideClick(e))
      this.#setAttribute(this.#searchInputElm, 'tabindex', 0)
      this.#setAttribute(this.#clearSearchBtnElm, 'tabindex', 0)
      this.#setAttribute(this.#dropdownWrapperElm, 'aria-expanded', true)
      this.#reRenderVirtualOptions()
    } else {
      this.#currencyNumberFieldWrapper.classList.remove(`${this.fieldKey}-menu-open`)
      document.removeEventListener('click', this.#handleOutsideClick)
      this.searchOptions('')
      this.#setAttribute(this.#searchInputElm, 'tabindex', -1)
      this.#setAttribute(this.#clearSearchBtnElm, 'tabindex', -1)
      this.#setAttribute(this.#dropdownWrapperElm, 'aria-expanded', false)
    }
  }

  #handleDropdownClick(e) {
    if (e.code === 'Space') {
      this.#searchInputElm.focus()
      this.setMenu({ open: true })
    }
    if (e.type === 'click') {
      if (this.#isMenuOpen()) {
        this.setMenu({ open: false })
      } else {
        this.#searchInputElm.focus()
        this.setMenu({ open: true })
      }
    }
  }

  set value(val) {
    this.#currencyHiddenInputElm.value = val
  }

  get value() {
    return this.#currencyHiddenInputElm.value
  }

  #detachAllEvents() {
    this.#allEventListeners.forEach(({ selector, eventType, cb }) => {
      selector.removeEventListener(eventType, cb)
    })
  }

  destroy() {
    this.#optionListElm.innerHTML = ''
    this.value = ''
    this.#detachAllEvents()
  }
}

export default CurrencyField

// const list = new CurrencyField('.currency-fld-wrp', {
//   searchClearable: true,
//   maxHeight: 400,
//   placeholder: 'asdf',
//   selectedFlagImage: false,
//   inputFormatOptions: {
//     formatter: 'browser', // browser, custom, none
//     showCurrencySymbol: true, // all
//     roundToClosestInteger: false, // all
//     roundToClosestFractionDigits: true, // custom [based on minimum & maximum fraction digits]
//     minimumFractionDigits: 0,// custom
//     maximumFractionDigits: 2,// custom [0 means unlimited]
//     numberFormat: '###,###,###', // custom
//     decimalSeparator: '.', // custom
//     currencyPosition: 'right', // custom & none
//     symbolPosition: 'left-number', // custom & none
//     // minValue: 0, // all
//     // maxValue: 0, // all
//   },
//   valueFormatOptions: {
//     showCurrencySymbol: true, // all
//     roundToClosestInteger: false, // all
//     roundToClosestFractionDigits: false, // custom [based on minimum & maximum fraction digits]
//     minimumFractionDigits: 0,// custom
//     maximumFractionDigits: 2,// custom [0 means unlimited]
//     numberFormat: '###.###.###', // custom
//     decimalSeparator: ',', // custom
//     currencyPosition: 'right', // custom & none
//     symbolPosition: 'left-number', // left-currency, right-currency, left-number, right-number
//   },
//   defaultCurrencyKey: 'INR',
//   options: currencyList
// })