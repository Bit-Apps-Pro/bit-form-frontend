/* eslint-disable class-methods-use-this */
import { observeElement } from './helper'

export default class BitCountryField {
  #countryFieldWrapper = null

  #countryHiddenInputElm = null

  #dropdownWrapperElm = null

  #selectedCountryImgElm = null

  #selectedCountryLblElm = null

  #selectedCountryClearBtnElm = null

  #placeholderImage = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'/>"

  #searchInputElm = null

  #clearSearchBtnElm = null

  #optionWrapperElm = null

  #optionListElm = null

  #selectedCountryCode = ''

  #options = []

  #config = {
    selectedFlagImage: true,
    selectedCountryClearable: true,
    searchClearable: true,
    optionFlagImage: true,
    detectCountryByIp: false,
    detectCountryByGeo: false,
    defaultValue: '',
    placeholder: 'Select a Country',
    searchPlaceholder: 'Search Country',
    noCountryFoundText: 'No Currency Found',
    maxHeight: 370,
    document,
    window: {},
    options: [],
    attributes: {},
    classNames: {},
    assetsURL: '',
    onChange: val => { console.log(val) },
  }

  // TODO - isBuilder diye check kora hobe emn sob variable, ekhane define korte hobe

  #debounceTimeout = null

  #dropdownSearchTerm = ''

  #allEventListeners = []

  constructor(selector, config) {
    Object.assign(this.#config, config)
    if (typeof selector === 'string') {
      // TODO: builder e queryselector kaj korbena. so, jodi builder hoi taile builder theke select korte hobe
      this.#countryFieldWrapper = this.#config.document.querySelector(selector)
    } else {
      this.#countryFieldWrapper = selector
    }

    this.#options = [...this.#config.options]
    this.fieldKey = this.#config.fieldKey

    this.init()
  }

  init() {
    // TODO - isBuilder diye check kora hobe emn sob variable, ekhane define korte hobe

    this.#countryHiddenInputElm = this.#select(`.${this.fieldKey}-country-hidden-input`)
    this.#dropdownWrapperElm = this.#select(`.${this.fieldKey}-dpd-wrp`)
    this.#selectedCountryImgElm = this.#select(`.${this.fieldKey}-selected-country-img`)
    this.#searchInputElm = this.#select(`.${this.fieldKey}-opt-search-input`)
    this.#clearSearchBtnElm = this.#select(`.${this.fieldKey}-search-clear-btn`)
    this.#optionWrapperElm = this.#select(`.${this.fieldKey}-option-wrp`)
    this.#optionListElm = this.#select(`.${this.fieldKey}-option-list`)

    this.#config.detectCountryByIp && this.#detectCountryCodeFromIpAddress()
    this.#config.detectCountryByGeo && this.#detectCountryCodeFromGeoLocation()
    this.#config.defaultValue && this.setSelectedCountryItem(this.#config.defaultValue)
    this.#setCountryNameFromURL()

    this.#addEventListenersToElm()
    this.#generateOptions()

    if (!this.#config.selectedFlagImage) {
      this.#selectedCountryImgElm?.remove()
    }

    if (this.#config.searchClearable) {
      this.#searchInputElm.style.paddingRight = '25px'
      this.#clearSearchBtnElm.style.display = 'none'
    }
    // this.#url = decodeURIComponent((`${this.#config.document.URL}`).replace(/\+/g, '%20'))
  }

  #addEventListenersToElm() {
    this.#addEvent(this.#dropdownWrapperElm, 'click', e => { this.#handleDropdownClick(e) })
    this.#addEvent(this.#dropdownWrapperElm, 'keyup', e => { this.#handleDropdownClick(e) })

    this.#addEvent(this.#countryFieldWrapper, 'keydown', e => { this.#handleKeyboardNavigation(e) })

    if (this.#config.searchClearable) {
      this.#addEvent(this.#clearSearchBtnElm, 'click', () => { this.searchOptions('') })
    }

    this.#addEvent(this.#searchInputElm, 'keyup', e => { this.#handleSearchInput(e) })

    observeElement(this.#countryHiddenInputElm, 'value', (oldVal, newVal) => { this.#handleInputValueChange(oldVal, newVal) })
  }

  #setCountryNameFromURL() {
    const param = this.#countryHiddenInputElm.name
    // TODO document.URL k isBuilder diye check korte hobe
    // const url = decodeURIComponent((`${this.#config.document.URL}`).replace(/\+/g, '%20'))
    const url = decodeURIComponent((`${document.URL}`).replace(/\+/g, '%20'))
    const selectedValue = url.replace(new RegExp(`.*${param}=([^&]*).*|(.*)`), '$1')
    if (selectedValue) {
      this.#handleInputValueChange('', selectedValue)
    }
  }

  #select(selector) { return this.#countryFieldWrapper.querySelector(selector) || console.error('selector not found', selector) }

  #addEvent(selector, eventType, cb) {
    selector.addEventListener(eventType, cb)
    this.#allEventListeners.push({ selector, eventType, cb })
  }

  #detectCountryCodeFromIpAddress() {
    fetch('https://www.cloudflare.com/cdn-cgi/trace')
      .then(resp => resp.text())
      .then(data => {
        const ipinfo = data.trim().split('\n').reduce((obj, pair) => {
          const [key, value] = pair.split('=')
          obj[key] = value
          return obj
        }, {})
        this.setSelectedCountryItem(ipinfo?.loc)
      })
  }

  #detectCountryCodeFromGeoLocation() {
    navigator.geolocation.getCurrentPosition(pos => {
      const { latitude, longitude } = pos.coords
      fetch(`http://api.geonames.org/countryCodeJSON?username=bitcodezoho1&lat=${latitude}&lng=${longitude}`)
        .then(resp => resp.json())
        .then(data => {
          this.setSelectedCountryItem(data.countryCode)
        })
    })
  }

  #handleKeyboardNavigation(e) {
    // TODO: document e activeElement isbuilder e check korte hobe
    const activeEl = this.#config.document.activeElement
    let focussableEl = null
    const isMenuOpen = this.#isMenuOpen()

    if (isMenuOpen) {
      const activeIndex = Number(activeEl.dataset.index || -1)
      if (e.key === 'ArrowDown' || (!e.shiftKey && e.key === 'Tab')) {
        e.preventDefault()
        if (activeEl === this.#searchInputElm) {
          focussableEl = this.#select(`.${this.fieldKey}-option:not(.disabled-opt)`)
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

  #handleInputValueChange(oldVal, newVal) {
    const searchedOption = this.#config.options.find(option => (option.val === newVal))
    if (searchedOption && oldVal !== newVal) {
      this.setSelectedCountryItem(searchedOption.i)
    }
  }

  #clearSelectedCountry(e) {
    e.stopPropagation()
    this.#selectedCountryCode = ''
    if (this.#config.selectedFlagImage) {
      this.#selectedCountryImgElm.src = this.#placeholderImage
    }
    this.#setTextContent(this.#selectedCountryLblElm, this.#config.placeholder)
    if (this.#config.selectedCountryClearable) this.#selectedCountryClearBtnElm.style.display = 'none'
    this.#setAttribute(this.#dropdownWrapperElm, 'aria-label', 'Selected country cleared')
    this.#dropdownWrapperElm.focus()
    this.value = ''
    setTimeout(() => {
      this.#setAttribute(this.#dropdownWrapperElm, 'aria-label', this.#config.placeholder)
    }, 100)
    this.#reRenderVirtualOptions()
  }

  setSelectedCountryItem(countryKey) {
    this.#selectedCountryCode = countryKey
    if (!this.#selectedCountryCode) return
    const selectedItem = this.#getSelectedCountryItem()
    if (!selectedItem) return

    this.#selectedCountryLblElm = this.#select(`.${this.fieldKey}-selected-country-lbl`)
    this.#selectedCountryClearBtnElm = this.#config.selectedCountryClearable ? this.#select(`.${this.fieldKey}-inp-clr-btn`) : {}
    if (this.#config.selectedFlagImage && this.#selectedCountryImgElm) {
      this.#selectedCountryImgElm.src = `${this.#config.assetsURL}${selectedItem.img}`
    }
    this.#setTextContent(this.#selectedCountryLblElm, selectedItem.lbl)
    this.setMenu({ open: false })
    this.value = selectedItem.val
    if (this.#config.selectedCountryClearable) {
      this.#selectedCountryClearBtnElm.style.display = 'grid'
      this.#addEvent(this.#selectedCountryClearBtnElm, 'click', e => { this.#clearSelectedCountry(e) })
    }
    if (this.#config.onChange) this.#config.onChange(selectedItem.val)
    this.#setAttribute(this.#dropdownWrapperElm, 'aria-label', `${selectedItem.lbl} selected`)
    setTimeout(() => {
      this.#setAttribute(this.#dropdownWrapperElm, 'aria-label', selectedItem.lbl)
    }, 100)
  }

  #getSelectedCountryIndex() {
    return this.#options.findIndex(ot => ot.i === this.#selectedCountryCode)
  }

  #getSelectedCountryItem() {
    return this.#config.options.find(opt => opt.i === this.#selectedCountryCode)
  }

  #createElm(elm) {
    return this.#config.document.createElement(elm)
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

  #reRenderVirtualOptions() {
    this.virtualOptionList?.setRowCount(this.#options.length)
    const selectedIndex = this.#getSelectedCountryIndex()
    this.virtualOptionList?.scrollToIndex(selectedIndex === -1 ? 0 : selectedIndex)
  }

  #setCustomAttr(element, obj) {
    const optObjKey = Object.keys(obj)
    const optLen = optObjKey.length
    if (optLen) {
      for (let i = 0; i < optLen; i += 1) {
        this.#setAttribute(element, optObjKey[i], obj[optObjKey[i]])
      }
    }
  }

  #generateOptions() {
    const selectedIndex = this.#getSelectedCountryIndex()
    this.virtualOptionList = new bit_virtualized_list(this.#optionListElm, {
      height: this.#config.maxHeight,
      rowCount: this.#options.length,
      rowHeight: 31, // TODO - calculate this
      initialIndex: selectedIndex === -1 ? 0 : selectedIndex,
      renderRow: index => {
        const opt = this.#options[index]
        const li = this.#createElm('li')
        this.#setAttribute(li, 'data-key', opt.i)
        this.#setAttribute(li, 'data-index', index)
        // TODO - eta only isBuilder e kaj korbe
        if ('option' in this.#config.attributes) {
          const optAttr = this.#config.attributes.option
          this.#setCustomAttr(li, optAttr)
        }
        // this.#setAttribute(li, 'data-dev-option', this.fieldKey)
        if (!opt.i) {
          this.#setTextContent(li, opt.lbl)
          this.#setClassName(li, 'opt-not-found')
          return li
        }
        this.#setClassName(li, `${this.fieldKey}-option`)
        if ('option' in this.#config.classNames) {
          const optCls = this.#config.classNames.option
          if (optCls) this.#setClassName(li, optCls)
        }
        const lblimgbox = this.#createElm('span')
        this.#setClassName(lblimgbox, `${this.fieldKey}-opt-lbl-wrp`)
        if ('opt-lbl-wrp' in this.#config.classNames) {
          const optLblWrpCls = this.#config.classNames['opt-lbl-wrp']
          if (optLblWrpCls) this.#setClassName(lblimgbox, optLblWrpCls)
        }
        // TODO - eta only isBuilder e kaj korbe
        // this.#setAttribute(lblimgbox, 'data-dev-opt-lbl-wrp', this.fieldKey)
        if ('opt-lbl-wrp' in this.#config.attributes) {
          const optLblWrp = this.#config.attributes['opt-lbl-wrp']
          this.#setCustomAttr(lblimgbox, optLblWrp)
        }
        if (this.#config.optionFlagImage) {
          const img = this.#createElm('img')
          // TODO - eta only isBuilder e kaj korbe
          // this.#setAttribute(img, 'data-dev-opt-icn', this.fieldKey)
          if ('opt-icn' in this.#config.attributes) {
            const optIcn = this.#config.attributes['opt-icn']
            if (optIcn) this.#setCustomAttr(lblimgbox, optIcn)
          }
          this.#setClassName(img, `${this.fieldKey}-opt-icn`)
          if ('opt-icn' in this.#config.classNames) {
            const optIcnCls = this.#config.classNames['opt-icn']
            if (optIcnCls) this.#setClassName(img, optIcnCls)
          }
          img.src = `${this.#config.assetsURL}${opt.img}`
          img.alt = `${opt.lbl} flag image`
          img.loading = 'lazy'
          this.#setAttribute(img, 'aria-hidden', true)
          lblimgbox.append(img)
        }
        const lbl = this.#createElm('span')
        // TODO - eta only isBuilder e kaj korbe
        // this.#setAttribute(lbl, 'data-dev-opt-lbl', this.fieldKey)
        if ('opt-lbl' in this.#config.attributes) {
          const optLbl = this.#config.attributes['opt-lbl']
          this.#setCustomAttr(lblimgbox, optLbl)
        }
        this.#setClassName(lbl, `${this.fieldKey}-opt-lbl`)
        if ('opt-lbl' in this.#config.classNames) {
          const optLblCls = this.#config.classNames['opt-lbl']
          if (optLblCls) this.#setClassName(lbl, optLblCls)
        }
        this.#setTextContent(lbl, opt.lbl)
        lblimgbox.append(lbl)
        const prefix = this.#createElm('span')
        this.#setClassName(prefix, 'opt-prefix')
        this.#setTextContent(prefix, opt.code)
        li.tabIndex = this.#isMenuOpen() ? '0' : '-1'
        this.#setAttribute(li, 'role', 'option')
        this.#setAttribute(li, 'aria-posinset', index + 1)
        this.#setAttribute(li, 'aria-setsize', this.#options.length)

        this.#addEvent(li, 'click', e => {
          this.setSelectedCountryItem(e.currentTarget.dataset.key)
        })
        this.#addEvent(li, 'keyup', e => {
          if (e.key === 'Enter') {
            this.setSelectedCountryItem(e.currentTarget.dataset.key)
          }
        })

        if (opt.disabled) {
          this.#setClassName(li, 'disabled-opt')
        }

        li.append(lblimgbox, prefix)

        if (this.#selectedCountryCode === opt.i) {
          this.#setClassName(li, 'selected-opt')
          this.#setAttribute(li, 'aria-selected', true)
        } else {
          this.#setAttribute(li, 'aria-selected', false)
        }

        return li
      },
    })
  }

  #handleSearchInput(e) {
    if (e.key === 'Enter' && this.#options.length) {
      const optKey = this.#options?.[0].i
      if (optKey) {
        this.setSelectedCountryItem(optKey)
        this.searchOptions('')
      }
    } else {
      this.searchOptions(e.target.value)
    }
  }

  searchOptions(value) {
    this.#setSearchValue(value)
    let filteredOptions = []

    if (value) {
      filteredOptions = this.#config.options.filter(opt => opt.lbl.toLowerCase().includes(value.toLowerCase()))
      if (!filteredOptions.length) {
        filteredOptions = [{ i: 0, lbl: this.#config.noCountryFoundText }]
      }
      this.#options = filteredOptions
      if (this.#config.searchClearable) this.#clearSearchBtnElm.style.display = 'grid'
    } else {
      this.#options = this.#config.options
      if (this.#config.searchClearable) this.#clearSearchBtnElm.style.display = 'none'
    }

    this.#reRenderVirtualOptions()
  }

  #setSearchValue(val) {
    this.#searchInputElm.value = val
  }

  #handleOutsideClick(event) {
    if (!this.#countryFieldWrapper.contains(event.target)) {
      this.setMenu({ open: false })
    }
  }

  #isMenuOpen() {
    return this.#countryFieldWrapper.classList.contains(`${this.fieldKey}-menu-open`)
  }

  #openDropdownAsPerWindowSpace() {
    // window select korte hobe isBuilder onujayi
    // const iframeWindow = document.getElementById('bit-grid-layout').contentWindow
    const iframeWindow = window
    const elementRect = this.#dropdownWrapperElm.getBoundingClientRect()

    const spaceAbove = elementRect.top
    const spaceBelow = iframeWindow.innerHeight - elementRect.bottom

    if (spaceBelow < spaceAbove && spaceBelow < this.#config.maxHeight) {
      this.#countryFieldWrapper.style.flexDirection = 'column-reverse'
      this.#countryFieldWrapper.style.bottom = '0%'
    } else {
      this.#countryFieldWrapper.style.flexDirection = 'column'
      this.#countryFieldWrapper.style.removeProperty('bottom')
    }
  }

  setMenu({ open }) {
    this.#optionWrapperElm.style.maxHeight = `${open ? this.#config.maxHeight : 0}px`
    if (open) {
      this.#openDropdownAsPerWindowSpace()
      this.#countryFieldWrapper.classList.add(`${this.fieldKey}-menu-open`)
      // this.#addEvent(document, 'click', e => this.#handleOutsideClick(e))
      this.#addEvent(this.#config.document, 'click', e => this.#handleOutsideClick(e))
      this.#searchInputElm.tabIndex = '0'
      this.#clearSearchBtnElm.tabIndex = '0'
      this.#dropdownWrapperElm.setAttribute('aria-expanded', 'true')
      this.#setAttribute(this.#optionListElm, 'aria-hidden', false)
      this.#setAttribute(this.#searchInputElm, 'aria-hidden', false)
      this.#reRenderVirtualOptions()
    } else {
      this.#countryFieldWrapper.classList.remove(`${this.fieldKey}-menu-open`)
      // document.removeEventListener('click', this.#handleOutsideClick)
      this.#config.document.removeEventListener('click', this.#handleOutsideClick)
      this.searchOptions('')
      this.#searchInputElm.blur()
      this.#searchInputElm.tabIndex = '-1'
      this.#clearSearchBtnElm.tabIndex = '-1'
      this.#dropdownWrapperElm.setAttribute('aria-expanded', 'false')
      this.#setAttribute(this.#optionListElm, 'aria-hidden', true)
      this.#setAttribute(this.#searchInputElm, 'aria-hidden', true)
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

  set disabled(status) {
    if (String(status).toLowerCase() === 'true') {
      this.#countryFieldWrapper.classList.add('disabled')
      this.#countryHiddenInputElm.disabled = true
      this.#dropdownWrapperElm.tabIndex = '-1'
      this.#selectedCountryClearBtnElm.tabIndex = '-1'
      this.#setAttribute(this.#dropdownWrapperElm, 'aria-label', 'Country Field disabled')
      this.setMenu({ open: false })
    } else if (String(status).toLowerCase() === 'false') {
      this.#countryFieldWrapper.classList.remove('disabled')
      this.#countryHiddenInputElm.removeAttribute('disabled')
      this.#dropdownWrapperElm.tabIndex = '0'
      this.#selectedCountryClearBtnElm.tabIndex = '0'
      this.#setAttribute(this.#dropdownWrapperElm, 'aria-label', this.#config.placeholder)
    }
  }

  get disabled() {
    return this.#countryHiddenInputElm.disabled
  }

  set readonly(status) {
    if (String(status).toLowerCase() === 'true') {
      this.#countryFieldWrapper.classList.add('disabled')
      this.#countryHiddenInputElm.readOnly = true
      this.#dropdownWrapperElm.tabIndex = '-1'
      this.#selectedCountryClearBtnElm.tabIndex = '-1'
      this.setMenu({ open: false })
    } else if (String(status).toLowerCase() === 'false') {
      this.#countryFieldWrapper.classList.remove('disabled')
      this.#countryHiddenInputElm.removeAttribute('readonly')
      this.#dropdownWrapperElm.tabIndex = '0'
      this.#selectedCountryClearBtnElm.tabIndex = '0'
    }
  }

  get readonly() {
    return this.#countryHiddenInputElm.readOnly
  }

  set value(val) {
    this.#countryHiddenInputElm.value = val
  }

  get value() {
    return this.#getSelectedCountryItem()?.val
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
