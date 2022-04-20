/* eslint-disable no-unused-expressions */
import { observeElement } from '../../../Utils/globalHelpers'
import VirtualizedList from '../CurrencyField/virtualized-list.min'

class PhoneNumberField {
  #placeholderImage = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'/>"

  #countryByIpApiURL = 'https://www.cloudflare.com/cdn-cgi/trace'

  #countryByGeoApiURL = 'http://api.geonames.org/countryCodeJSON?username=bitcodezoho1'

  #phoneNumberFieldWrapper = null

  #phoneHiddenInputElm = null

  #clearPhoneInputElm = null

  #dropdownWrapperElm = null

  #optionWrapperElm = null

  #selectedCountryImgElm = null

  #selectedCountryCode = null

  #searchInputElm = null

  #phoneInputElm = null

  #clearSearchBtnElm = null

  #optionListElm = null

  #options = []

  #callingCodes = []

  #countrySelectedFromList = false

  #allEventListeners = []

  #config = {
    maxHeight: 370,
    detectCountryByIp: false,
    detectCountryByGeo: false,
    searchCountryPlaceholder: 'Search Country',
    noCountryFoundText: 'No Country Found',
    searchClearable: true,
  }

  #debounceTimeout = null

  #dropdownSearchTerm = ''

  constructor(selector, config) {
    Object.assign(this.#config, config)
    if (typeof selector === 'string') {
      this.#phoneNumberFieldWrapper = document.querySelector(selector)
    } else {
      this.#phoneNumberFieldWrapper = selector
    }

    this.#options = [...this.#config.options]

    this.#callingCodes = this.#generateCountryCodesFromOptions()
    this.fieldKey = this.#config.fieldKey

    this.init()
  }

  init() {
    this.#phoneInputElm = this.#select(`.${this.fieldKey}-phone-number-input`)
    this.#phoneHiddenInputElm = this.#select(`.${this.fieldKey}-phone-hidden-input`)
    this.#clearPhoneInputElm = this.#select(`.${this.fieldKey}-input-clear-btn`)
    this.#selectedCountryImgElm = this.#select(`.${this.fieldKey}-selected-country-img`)
    this.#searchInputElm = this.#select(`.${this.fieldKey}-opt-search-input`)
    this.#dropdownWrapperElm = this.#select(`.${this.fieldKey}-dpd-wrp`)
    this.#optionWrapperElm = this.#select(`.${this.fieldKey}-option-wrp`)
    this.#clearSearchBtnElm = this.#select(`.${this.fieldKey}-search-clear-btn`)
    this.#optionListElm = this.#select(`.${this.fieldKey}-option-list`)

    this.#addEvent(this.#phoneNumberFieldWrapper, 'keydown', e => { this.#handleKeyboardNavigation(e) })

    this.#addEvent(this.#dropdownWrapperElm, 'click', e => { this.#handleDropdownClick(e) })
    this.#addEvent(this.#dropdownWrapperElm, 'keyup', e => { this.#handleDropdownClick(e) })

    this.#addEvent(this.#phoneInputElm, 'input', e => { this.#handlePhoneInput(e) })
    observeElement(this.#phoneHiddenInputElm, 'value', (oldVal, newVal) => { this.#handleHiddenInputValueChange(oldVal, newVal) })
    this.#addEvent(this.#clearPhoneInputElm, 'click', e => { this.#handleClearPhoneInput(e) })
    this.#addEvent(this.#phoneInputElm, 'focusout', e => { this.#handlePhoneValidation(e) })

    this.#handleDefaultPhoneInputValue()
    this.#config.detectCountryByIp && this.#detectCountryCodeFromIpAddress()
    this.#config.detectCountryByGeo && this.#detectCountryCodeFromGeoLocation()

    this.#generateOptions()

    if (this.#config.searchClearable) {
      this.#searchInputElm.style.paddingRight = '25px'
      this.#clearSearchBtnElm.style.display = 'block'
      this.#addEvent(this.#clearSearchBtnElm, 'click', () => { this.searchOptions('') })
    }
    this.#searchInputElm.value = ''
    this.#addEvent(this.#searchInputElm, 'keyup', e => { this.#handleSearchInput(e) })
    console.log(this.#allEventListeners)
  }

  #select(selector) { return this.#phoneNumberFieldWrapper.querySelector(selector) }

  #addEvent(selector, eventType, cb) {
    selector.addEventListener(eventType, cb)
    this.#allEventListeners.push({ selector, eventType, cb })
  }

  #handleDefaultPhoneInputValue() {
    if (this.#phoneInputElm.value) {
      this.#triggerEvent(this.#phoneInputElm, 'input')
    }
  }

  #detectCountryCodeFromIpAddress() {
    fetch(this.#countryByIpApiURL)
      .then(resp => resp.text())
      .then(data => {
        const ipinfo = data.trim().split('\n').reduce((obj, pair) => {
          pair = pair.split('=')
          return obj[pair[0]] = pair[1], obj
        }, {})
        this.setSelectedCountryItem(ipinfo.loc)
      })
  }

  #detectCountryCodeFromGeoLocation() {
    navigator.geolocation.getCurrentPosition(pos => {
      const { latitude, longitude } = pos.coords
      fetch(`${this.#countryByGeoApiURL}&lat=${latitude}&lng=${longitude}`)
        .then(resp => resp.json())
        .then(data => {
          this.setSelectedCountryItem(data.countryCode)
        })
    })
  }

  #handleKeyboardNavigation(e) {
    const activeEl = document.activeElement
    let focussableEl = null
    const isMenuOpen = this.#isMenuOpen()
    if (e.target === this.#phoneInputElm) return

    if (isMenuOpen) {
      const activeIndex = Number(activeEl.dataset.index || -1)
      if (e.key === 'ArrowDown' || (!e.shiftKey && e.key === 'Tab')) {
        e.preventDefault()
        if (activeEl === this.#searchInputElm) {
          focussableEl = this.#select(`.${this.fieldKey}-option:not(.${this.fieldKey}-disabled-opt)`)
        } else if (activeEl.classList.contains(`${this.fieldKey}-option`)) {
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
        } else if (activeEl.classList.contains(`${this.fieldKey}-option`)) {
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
        this.setSelectedCountryItem(searchedOption.i)
      }
    } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      const selectedCountryIndex = this.#getSelectedCountryIndex()
      const direction = (e.key === 'ArrowDown') ? 'next' : 'previous'
      const optIndex = this.#findNotDisabledOptIndex(selectedCountryIndex, direction)
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

  #handleClearPhoneInput() {
    this.#phoneInputElm.value = ''
    this.setSelectedCountryItem(this.#config.defaultCountryKey)
    this.#triggerEvent(this.#phoneInputElm, 'input')
  }

  #selectOptElmByIndex(index) {
    return this.#select(`.${this.fieldKey}-option-list .${this.fieldKey}-option[data-index="${index}"]`)
  }

  #findNotDisabledOptIndex(activeIndex = -1, direction) {
    if (direction === 'next') {
      const optsLength = this.#config.options.length
      for (let i = activeIndex + 1; i < optsLength; i += 1) {
        const opt = this.#config.options[i]
        if (!opt.disabled) return i
      }
    } else if (direction === 'previous') {
      for (let i = activeIndex - 1; i >= 0; i -= 1) {
        const opt = this.#config.options[i]
        if (!opt.disabled) return i
      }
    }
  }

  #handleOutsideClick(event) {
    if (event.target.contains(this.#phoneNumberFieldWrapper)) {
      this.setMenu({ open: false })
    }
  }

  #generateCountryCodesFromOptions() {
    return this.#config.options.reduce((acc, item) => {
      if (!acc[item.code]) {
        let { code } = item
        if (code[0] === '+') code = code.substring(1)
        acc[code] = item.i
      }
      return acc
    }, {})
  }

  #searchCountryCodeFromValue(value) {
    if (this.#countrySelectedFromList) return ''
    let inputValue = value
    if (inputValue[0] === '+') inputValue = inputValue.substring(1, 4)
    let currentSearchCode = ''
    for (let i = 3; i > 0; i -= 1) {
      currentSearchCode = inputValue.substring(0, i)
      if (currentSearchCode in this.#callingCodes) {
        return currentSearchCode
      }
    }

    return ''
  }

  #detectCountryCodeByInputValue(value) {
    const searchedCountryCode = this.#searchCountryCodeFromValue(value)
    if (searchedCountryCode) {
      this.setSelectedCountryItem(this.#callingCodes[searchedCountryCode])
      return searchedCountryCode
    }
  }

  #unformatPhoneNumber(value) {
    return value.replace(/[^+0-9]/g, '')
  }

  #handleHiddenInputValueChange(oldVal, newVal) {
    const searchedCountryCode = this.#detectCountryCodeByInputValue(newVal)
    if (searchedCountryCode && oldVal !== newVal) {
      this.#handlePhoneValue(this.#unformatPhoneNumber(newVal))
      // this.#triggerEvent(this.#phoneInputElm, 'input')
    }
  }

  #handlePhoneInput(e) {
    const { value } = e.target
    if (value) {
      this.#clearPhoneInputElm.style.display = 'grid'
    } else {
      this.#clearPhoneInputElm.style.display = 'none'
      this.#countrySelectedFromList = false
    }

    if (!this.#countrySelectedFromList && (value.length < 4 || e.inputType === 'deleteContentBackward' || e.inputType === 'deleteContentForward')) return

    this.#handlePhoneValue(value)
  }

  #handlePhoneValue(value) {
    const selectedCountryItem = this.#getSelectedCountryItem()
    let code = ''
    if (this.#countrySelectedFromList) {
      code = selectedCountryItem.code
    } else {
      code = this.#detectCountryCodeByInputValue(value)
    }

    if (code && selectedCountryItem) {
      let inputFormat = selectedCountryItem.frmt
      const valueFormat = (this.#config.valueFormat || '')

      if (!inputFormat) {
        inputFormat = (this.#config.inputFormat || '')
      }

      const formattedInputValue = this.#formatPhoneNumber(code, value, inputFormat)

      if (valueFormat) {
        const unformattedPhoneNumber = this.#unformatPhoneNumber(value)
        this.value = this.#formatPhoneNumber(code, unformattedPhoneNumber, valueFormat)
      } else {
        this.value = formattedInputValue
      }

      this.#phoneInputElm.value = formattedInputValue
    }
  }

  #isNumber = (char) => /[0-9]/.test(char)

  #formatPhoneNumber(code, number, format = '') {
    let formattedNumber = ''
    let phoneIndex = 0
    const phoneNumber = number[0] === '+' ? number.substring(1) : number
    for (let i = 0; i < format.length; i += 1) {
      if (phoneIndex >= phoneNumber.length) break
      const frmtChar = format[i]
      if (frmtChar === 'c') {
        const cnCode = code[0] === '+' ? code.substring(1) : code
        formattedNumber += cnCode
        phoneIndex += cnCode.length
      } else if (frmtChar === '#') {
        if (!this.#isNumber(phoneNumber[phoneIndex])) break
        formattedNumber += phoneNumber[phoneIndex]
        phoneIndex += 1
      } else if (phoneNumber[phoneIndex] === frmtChar) {
        formattedNumber += frmtChar
        phoneIndex += 1
      } else {
        formattedNumber += frmtChar
      }
    }

    if (phoneIndex < phoneNumber.length) {
      formattedNumber += phoneNumber.substring(phoneIndex)
    }

    return formattedNumber
  }

  #handlePhoneValidation(e) {
    const value = this.#unformatPhoneNumber(e.target.value)
    const selectedCountry = this.#getSelectedCountryItem()
    if (selectedCountry) {
      const phoneNumberWithoutCode = value.substring(selectedCountry.code.length)
      if (selectedCountry.ptrn) {
        const regex = new RegExp(selectedCountry.ptrn)
        return console.log('pattern test', regex.test(phoneNumberWithoutCode))
      }
      return console.log(true, 'pattern not given')
    }

    return console.log(false, 'country not selected')
  }

  #getSelectedCountryIndex() {
    const index = this.#options.findIndex(ot => ot.i === this.#selectedCountryCode)
    return index === -1 ? 0 : index
  }

  #getSelectedCountryItem() {
    return this.#config.options.find(opt => opt.i === this.#selectedCountryCode)
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
    const selectedIndex = this.#getSelectedCountryIndex()
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
        this.#setAttribute(li, 'data-dev-option', this.fieldKey)
        if (!opt.i) {
          this.#setTextContent(li, opt.lbl)
          this.#setClassName(li, `${this.fieldKey}-opt-not-found`)
          return li
        }
        this.#setClassName(li, `${this.fieldKey}-option`)
        const lblimgbox = this.#createElm('span')
        this.#setClassName(lblimgbox, `${this.fieldKey}-opt-lbl-wrp`)
        this.#setAttribute(lblimgbox, 'data-dev-opt-lbl-wrp', this.fieldKey)
        const img = this.#createElm('img')
        this.#setClassName(img, `${this.fieldKey}-opt-icn`)
        this.#setAttribute(img, 'data-dev-opt-icn', this.fieldKey)
        img.src = `${bits.assetsURL}/${opt.img}`
        img.alt = `${opt.lbl} flag image`
        img.loading = 'lazy'
        this.#setAttribute(img, 'aria-hidden', true)
        const lbl = this.#createElm('span')
        this.#setClassName(lbl, `${this.fieldKey}-opt-lbl`)
        this.#setAttribute(lbl, 'data-dev-opt-lbl', this.fieldKey)
        this.#setTextContent(lbl, opt.lbl)
        lblimgbox.append(img, lbl)
        const prefix = this.#createElm('span')
        this.#setClassName(prefix, `${this.fieldKey}-opt-prefix`)
        this.#setTextContent(prefix, opt.code)
        this.#setAttribute(prefix, 'data-dev-opt-prefix', this.fieldKey)
        this.#setAttribute(li, 'tabindex', this.#isMenuOpen() ? '0' : '-1')
        this.#setAttribute(li, 'role', 'option')
        this.#setAttribute(li, 'aria-posinset', index + 1)
        this.#setAttribute(li, 'aria-setsize', this.#options.length)

        this.#addEvent(li, 'click', e => {
          this.#countrySelectedFromList = true
          this.setSelectedCountryItem(e.currentTarget.dataset.key)
        })
        this.#addEvent(li, 'keyup', e => {
          if (e.key === 'Enter') {
            this.#countrySelectedFromList = true
            this.setSelectedCountryItem(e.currentTarget.dataset.key)
          }
        })

        if (opt.disabled) {
          this.#setClassName(li, `${this.fieldKey}-disabled-opt`)
        }

        li.append(lblimgbox, prefix)

        if (this.#selectedCountryCode === opt.i) {
          this.#setClassName(li, `${this.fieldKey}-selected-opt`)
          this.#setAttribute(li, 'aria-selected', true)
        } else {
          this.#setAttribute(li, 'aria-selected', false)
        }

        return li
      },

    })
  }

  #setNewCountryCodeWithInputValue(selectedCode) {
    const value = this.#unformatPhoneNumber(this.#phoneInputElm.value)

    const code = this.#searchCountryCodeFromValue(value)

    if (code) {
      let inputFormat = this.#getSelectedCountryItem().frmt
      if (!inputFormat) {
        inputFormat = (this.#config.inputFormat || '')
      }
      this.#phoneInputElm.value = this.#formatPhoneNumber(selectedCode, value, inputFormat)
    } else {
      this.#phoneInputElm.value = selectedCode
    }
  }

  #clearSelectedCountry() {
    this.#selectedCountryCode = ''
    if (this.#config.selectedFlagImage) {
      this.#selectedCountryImgElm.src = this.#placeholderImage
    }
    this.value = ''
    this.#reRenderVirtualOptions()
  }

  setSelectedCountryItem(countryKey) {
    this.#selectedCountryCode = countryKey
    if (!this.#selectedCountryCode) {
      this.#clearSelectedCountry()
      return
    }
    const selectedItem = this.#getSelectedCountryItem()
    if (!selectedItem) return
    // this.#selectedCountryImgElm.src = selectedItem.img
    this.#selectedCountryImgElm.src = `${bits.assetsURL}/${selectedItem.img}`
    this.#setNewCountryCodeWithInputValue(selectedItem.code)
    this.setMenu({ open: false })
    this.#phoneInputElm.focus()
  }

  #reRenderVirtualOptions() {
    this.virtualOptionList?.setRowCount(this.#options.length)
    this.virtualOptionList?.scrollToIndex(this.#getSelectedCountryIndex())
  }

  #setSearchValue(val) {
    this.#searchInputElm.value = val
  }

  #handleSearchInput(e) {
    if (e.key === 'Enter' && this.#options.length) {
      const optKey = this.#select(`.${this.fieldKey}-option`)?.dataset.key
      this.setSelectedCountryItem(optKey)
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
        const code = opt.code || ''
        if (lbl.includes(searchText)) return true
        if (val.includes(searchText)) return true
        if (code.includes(searchText)) return true
      })
      if (!filteredOptions.length) {
        filteredOptions = [{ i: 0, lbl: 'No Country Found' }]
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
    return this.#phoneNumberFieldWrapper.classList.contains(`${this.fieldKey}-menu-open`)
  }

  setMenu({ open }) {
    this.#optionWrapperElm.style.maxHeight = `${open ? this.#config.maxHeight : 0}px`
    if (open) {
      this.#setClassName(this.#phoneNumberFieldWrapper, `${this.fieldKey}-menu-open`)
      this.#addEvent(document, 'click', e => this.#handleOutsideClick(e))
      this.#setAttribute(this.#searchInputElm, 'tabindex', 0)
      this.#setAttribute(this.#clearSearchBtnElm, 'tabindex', 0)
      this.#setAttribute(this.#dropdownWrapperElm, 'aria-expanded', true)
      this.#reRenderVirtualOptions()
    } else {
      this.#phoneNumberFieldWrapper.classList.remove(`${this.fieldKey}-menu-open`)
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
    this.#phoneHiddenInputElm.value = val
  }

  get value() {
    return this.#phoneHiddenInputElm.value
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
export default PhoneNumberField

// const list = new PhoneNumberField('.phone-fld-wrp', {
//   searchClearable: true,
//   maxHeight: 400,
//   placeholder: 'asdf',
//   selectedFlagImage: true,
//   inputFormat: '+c ## ###',
//   valueFormat: 'c_###_###',
//   // defaultCountryKey: 'BD',
//   options: countryListWithPhoneCode
// })

// TODO set menu size - done
// TODO hide browser default search cross button - done
// TODO hide search cross button when search value empty - done
// TODO style scrollbar - done
// TODO option tabindex prblm - done
// TODO set variables for redundent this.#select - done
// TODO catchable classname - done

// placeholderImage
// searchCountryPlaceholder
// noCountryFoundText
// placeholder
// selectedFlagImage
// detectCountryByGeo
// detectCountryByIp
// inputFormat
// valueFormat

// c - country code
// # - number (0 - 9)

// +c #### ### ###
// +880 1826 696 318

// +8801826696318

// valueFormat: #### ### ###