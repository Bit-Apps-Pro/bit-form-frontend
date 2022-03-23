import observeElement from './helpers'

class DropdownField {
  #dropdownFieldWrapper = null

  #dropdownHiddenInputElm = null

  #searchInputElm = null

  #optionWrapperElm = null

  #dropdownWrapperElm = null

  #selectedOptImgElm = null

  #selectedOptLblElm = null

  #selectedOptClearBtnElm = null

  #clearSearchBtnElm = null

  #optionListElm = null

  #placeholderImage = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'/>"

  #selectedOptValue = ''

  #options = []

  #config = {
    separator: '\n',
    selectedOptImage: true,
    dropdownIcn: '',
    selectedOptClearable: true,
    searchClearable: true,
    optionIcon: true,
    defaultValue: '',
    placeholder: 'Select an option',
    searchPlaceholder: 'Search option',
    maxHeight: 370,
    closeOnSelect: true,
    options: [],
    onChange: val => { console.log(val) },
  }

  #debounceTimeout = null

  #dropdownSearchTerm = ''

  #allEventListeners = []

  constructor(selector, config) {
    Object.assign(this.#config, config)
    if (typeof selector === 'string') {
      this.#dropdownFieldWrapper = document.querySelector(selector)
    } else {
      this.#dropdownFieldWrapper = selector
    }

    this.fieldKey = this.#config.fieldKey

    this.init()
  }

  init() {
    this.#dropdownHiddenInputElm = this.#select(`.${this.fieldKey}-dpd-hidden-input`)
    this.#searchInputElm = this.#select(`.${this.fieldKey}-opt-search-input`)
    this.#optionWrapperElm = this.#select(`.${this.fieldKey}-option-wrp`)
    this.#dropdownWrapperElm = this.#select(`.${this.fieldKey}-dpd-wrp`)
    this.#selectedOptImgElm = this.#select(`.${this.fieldKey}-selected-opt-img`)
    this.#clearSearchBtnElm = this.#select(`.${this.fieldKey}-search-clear-btn`)

    this.#addEvent(this.#dropdownWrapperElm, 'click', e => { this.#handleDropdownClick(e) })
    this.#addEvent(this.#dropdownWrapperElm, 'keyup', e => { this.#handleDropdownClick(e) })

    this.#addEvent(this.#dropdownFieldWrapper, 'keydown', e => { this.#handleKeyboardNavigation(e) })

    // this.#config.defaultValue && this.setSelectedOption(this.#config.defaultValue)

    this.#initOptionsList()

    if (this.#config.dropdownIcn) {
      this.#selectedOptImgElm.src = this.#config.dropdownIcn
    }

    if (this.#config.searchClearable) {
      this.#searchInputElm.style.paddingRight = '25px'
      this.#clearSearchBtnElm.style.display = 'none'
      this.#addEvent(this.#clearSearchBtnElm, 'click', () => { this.searchOptions('') })
    }

    this.#searchInputElm.placeholder = this.#config.searchPlaceholder
    this.#searchInputElm.value = ''
    this.#addEvent(this.#searchInputElm, 'keyup', e => { this.#handleSearchInput(e) })

    observeElement(this.#dropdownHiddenInputElm, 'value', (oldVal, newVal) => { this.#handleInputValueChange(oldVal, newVal) })
  }

  #initOptionsList() {
    this.#optionListElm = this.#select(`.${this.fieldKey}-option-list.active-list`)

    this.#addOnClickOptionsEvent()

    this.#config.options = this.#generateOptionsObjFromHtml()
    this.#options = [...this.#config.options]
  }

  #select(selector) { return this.#dropdownFieldWrapper.querySelector(selector) }

  #selectAll(selector) { return this.#dropdownFieldWrapper.querySelectorAll(selector) }

  #addEvent(selector, eventType, cb) {
    selector.addEventListener(eventType, cb)
    this.#allEventListeners.push({ selector, eventType, cb })
  }

  #handleInputValueChange(oldVal, newVal) {
    if (oldVal !== newVal) {
      this.setSelectedOption(newVal)
    }
  }

  #findNotDisabledOptIndex(activeIndex = -1, direction) {
    if (direction === 'next') {
      const optsLength = this.#options.length
      for (let i = activeIndex + 1; i < optsLength; i++) {
        const opt = this.#options[i]
        if (opt.type !== 'group' && !opt.disabled) return i
      }
    } else if (direction === 'previous') {
      for (let i = activeIndex - 1; i >= 0; i--) {
        const opt = this.#options[i]
        if (opt.type !== 'group' && !opt.disabled) return i
      }
    }
  }

  #selectOptElmByIndex(index) {
    return this.#select(`${this.#activeOptionList()} .${this.fieldKey}-option[data-index="${index}"]`)
  }

  #handleKeyboardNavigation(e) {
    const activeEl = document.activeElement
    let focussableEl = null
    const isMenuOpen = this.#isMenuOpen()

    if (isMenuOpen) {
      const activeIndex = Number(activeEl.dataset.index || -1)
      if (e.key === 'ArrowDown' || (!e.shiftKey && e.key === 'Tab')) {
        e.preventDefault()
        let nextIndex = 0
        let nextElm = null
        if (activeEl === this.#searchInputElm) {
          nextIndex = this.#findNotDisabledOptIndex(-1, 'next')
          nextElm = this.#selectOptElmByIndex(nextIndex)
        } else if (activeEl.classList.contains(`${this.fieldKey}-option`)) {
          nextIndex = this.#findNotDisabledOptIndex(activeIndex, 'next')
          nextElm = this.#selectOptElmByIndex(nextIndex)
        }
        if (nextElm) {
          focussableEl = nextElm
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
      const searchedOption = this.#config.options.find(option => option.type !== 'group' && !option.disabled && option.lbl.toLowerCase().startsWith(this.#dropdownSearchTerm))
      if (searchedOption) {
        this.setSelectedOption(searchedOption.val)
      }
    } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      const selectedCountryIndex = this.#getSelectedOptionIndex()
      const direction = (e.key === 'ArrowDown') ? 'next' : 'previous'
      const optIndex = this.#findNotDisabledOptIndex(selectedCountryIndex, direction)
      if (optIndex > -1 && (optIndex < this.#config.options.length)) {
        this.value = this.#config.options[optIndex].val
      }
    }

    if (focussableEl) focussableEl.focus()
  }

  #activeOptionList() {
    const activeList = this.#optionListElm?.dataset.list
    if (activeList) {
      return `.${this.fieldKey}-option-list[data-list="${activeList}"]`
    }
    return `.${this.fieldKey}-option-list`
  }

  #generateOptionsObjFromHtml() {
    const allOptionsElms = Array.from(this.#selectAll(`${this.#activeOptionList()} .${this.fieldKey}-option`))

    const generateOptObjFromElm = opt => {
      const obj = {}
      const lblElm = opt.querySelector('.opt-lbl')
      const { value } = opt.dataset
      obj.lbl = lblElm.textContent
      if (value) obj.val = value
      if (this.#containsClass(opt, 'disabled-opt')) obj.disabled = true
      const imgElm = opt.querySelector(`.${this.fieldKey}-opt-icn`)
      if (this.#config.dropdownIcn && imgElm?.src) {
        obj.img = imgElm.src
      }
      return obj
    }

    const arr = []
    const { length } = allOptionsElms
    for (let optIndex = 0; optIndex < length; optIndex++) {
      const opt = allOptionsElms[optIndex]
      let obj = {}
      let groupIndex = null
      if (opt.classList.contains(`${this.fieldKey}-opt-group-title`)) {
        obj = generateOptObjFromElm(opt)
        obj.type = 'group'
        arr.push(obj)
        groupIndex = optIndex
        for (let childIndex = optIndex + 1; childIndex < length; childIndex++) {
          const child = allOptionsElms[childIndex]
          if (child.classList.contains(`${this.fieldKey}-opt-group-child`)) {
            const childObj = generateOptObjFromElm(child)
            childObj.groupIndex = groupIndex
            optIndex = childIndex
            arr.push(childObj)
          } else {
            optIndex = childIndex - 1
            break
          }
        }
      } else {
        obj = generateOptObjFromElm(opt)
        arr.push(obj)
      }
    }
    return arr
  }

  #clearSelectedOption(e) {
    e?.stopPropagation()
    this.#selectedOptValue = ''
    if (this.#config.selectedOptImage) {
      this.#selectedOptImgElm.src = this.#placeholderImage
    }
    this.#setTextContent(this.#selectedOptLblElm, this.#config.placeholder)
    this.#selectedOptClearBtnElm.style.display = 'none'
    this.#reRenderVirtualOptions()
  }

  #searchOptionObjByVal(val) {
    return this.#config.options.find(opt => opt.val === val)
  }

  setSelectedOption(values) {
    let selectedItem = null
    const valueArr = values.split(this.#config.separator)
    if (this.#config.multipleSelect) {
      if (valueArr.length === 1) {
        selectedItem = this.#searchOptionObjByVal(valueArr[0])
      } else {
        selectedItem = { lbl: `${valueArr.length} options selected` }
      }
    } else {
      selectedItem = this.#searchOptionObjByVal(values)
    }
    this.#selectedOptValue = values
    if (!this.#selectedOptValue) {
      this.#clearSelectedOption()
    }
    this.#reRenderVirtualOptions()
    if (!selectedItem) return

    this.#selectedOptLblElm = this.#select(`.${this.fieldKey}-selected-opt-lbl`)
    this.#selectedOptClearBtnElm = this.#select(`.${this.fieldKey}-selected-opt-clear-btn`)
    if (this.#config.selectedOptImage) {
      if (this.#config.multipleSelect) {
        if (valueArr.length > 1) {
          this.#selectedOptImgElm.src = this.#config.selectedOptImgSrc
        } else if (valueArr.length === 1) {
          this.#selectedOptImgElm.src = selectedItem.img
        } else {
          this.#selectedOptImgElm.src = this.#placeholderImage
        }
      } else {
        this.#selectedOptImgElm.src = selectedItem.img
      }
    }

    this.#setTextContent(this.#selectedOptLblElm, selectedItem.lbl)
    if (this.#config.closeOnSelect) this.setMenu({ open: false })
    this.value = values
    if (this.#config.selectedOptClearable) {
      this.#selectedOptClearBtnElm.style.display = 'grid'
      this.#addEvent(this.#selectedOptClearBtnElm, 'click', e => { this.#clearSelectedOption(e) })
    }
    if (this.#config.onChange) this.#config.onChange(values)
  }

  #getSelectedOptionIndex() {
    return this.#options.findIndex(ot => ot.val === this.#selectedOptValue)
  }

  #createElm(elm) {
    return document.createElement(elm)
  }

  #setTabIndex(elm, ind) {
    elm.tabIndex = ind
  }

  #setClassName(elm, cn) {
    elm.classList.add(cn)
  }

  #containsClass(elm, className) {
    return elm.classList.contains(className)
  }

  #setTextContent(elm, txt) {
    elm.textContent = txt
  }

  #splitStringByDelimiter(str) {
    return (str && str.split(this.#config.separator)) || []
  }

  #generateStringFromArr(arr) {
    return arr.join(this.#config.separator)
  }

  #handleOptionValue(e) {
    const optElm = e.currentTarget
    const val = optElm.dataset.value
    if (this.#config.multipleSelect) {
      const valueArr = this.#splitStringByDelimiter(this.#selectedOptValue)
      const alreadyExists = valueArr.includes(val)
      if (alreadyExists) {
        const valIndx = valueArr.indexOf(val)
        valueArr.splice(valIndx, 1)
        optElm.classList.remove('selected-opt')
      } else {
        valueArr.push(val)
        optElm.classList.add('selected-opt')
      }

      this.#selectedOptValue = this.#generateStringFromArr(valueArr)
    } else {
      this.#selectedOptValue = val
    }

    this.#reRenderVirtualOptions()
    this.setSelectedOption(this.#selectedOptValue)
    setTimeout(() => {
      const selectedOpt = this.#select(`${this.#activeOptionList()} .${this.fieldKey}-option[data-value="${val}"]`)
      selectedOpt.focus()
    }, 0)
  }

  #reRenderVirtualOptions() {
    this.#generateOptions()
  }

  #getCurrentActiveOptions() {
    return this.#selectAll(`${this.#activeOptionList()} .${this.fieldKey}-option:not(.${this.fieldKey}-opt-group-title)`)
  }

  #addOnClickOptionsEvent() {
    const allOptionElms = this.#getCurrentActiveOptions()

    for (const optionElm of allOptionElms) {
      this.#addEvent(optionElm, 'click', e => { this.#handleOptionValue(e) })
      this.#addEvent(optionElm, 'keyup', e => { e.key === 'Enter' && this.#handleOptionValue(e) })
    }
  }

  #toggleTabIndexOfOptions() {
    const allOptionElms = this.#getCurrentActiveOptions()
    const isMenuOpen = this.#isMenuOpen()

    for (const optionElm of allOptionElms) {
      if (isMenuOpen) {
        this.#setTabIndex(optionElm, 0)
      } else {
        this.#setTabIndex(optionElm, -1)
      }
    }
  }

  #setAttribute(elm, name, value) {
    elm?.setAttribute?.(name, value)
  }

  #generateOptions() {
    this.#optionListElm.innerHTML = ''

    const selectedValues = this.#selectedOptValue.split(this.#config.separator)

    const optLength = this.#options.length
    for (let i = 0; i < optLength; i++) {
      const opt = this.#options[i]
      const li = this.#createElm('li')

      if (opt.i === 'not-found') {
        this.#setTextContent(li, opt.lbl)
        this.#setClassName(li, 'opt-not-found')
        this.#optionListElm.appendChild(li)
        return
      }
      this.#setClassName(li, `${this.fieldKey}-option`)
      const lblimgbox = this.#createElm('span')
      this.#setClassName(lblimgbox, `${this.fieldKey}-opt-lbl-wrp`)
      if (this.#config.optionIcon) {
        const img = this.#createElm('img')
        this.#setClassName(img, `${this.fieldKey}-opt-icn`)
        img.src = opt.img
        img.alt = opt.lbl
        img.loading = 'lazy'
        lblimgbox.append(img)
      }
      const lbl = this.#createElm('span')
      this.#setClassName(lbl, 'opt-lbl')
      this.#setTextContent(lbl, opt.lbl)
      lblimgbox.append(lbl)
      const prefix = this.#createElm('span')
      this.#setClassName(prefix, 'opt-prefix')
      this.#setTextContent(prefix, opt.code)

      li.append(lblimgbox, prefix)

      if (selectedValues.includes(opt.val)) {
        this.#setClassName(li, 'selected-opt')

        this.#setAttribute(li, 'aria-selected', true)
      } else {
        this.#setAttribute(li, 'aria-selected', false)
      }

      this.#optionListElm.appendChild(li)

      if (opt.type === 'group') {
        this.#setClassName(li, `${this.fieldKey}-opt-group-title`)
      } else {
        if ('groupIndex' in opt) this.#setClassName(li, `${this.fieldKey}-opt-group-child`)
        this.#setAttribute(li, 'data-index', i)
        this.#setAttribute(li, 'data-value', opt.val)
        this.#setAttribute(li, 'role', 'option')
        this.#setAttribute(li, 'aria-posinset', i + 1)
        this.#setAttribute(li, 'aria-setsize', this.#options.length)
        this.#setTabIndex(li, this.#isMenuOpen() ? '0' : '-1')
        if (opt.disabled) {
          this.#setClassName(li, 'disabled-opt')
        } else {
          this.#addEvent(li, 'click', e => { this.#handleOptionValue(e) })
          this.#addEvent(li, 'keyup', e => { e.key === 'Enter' && this.#handleOptionValue(e) })
        }
      }
    }
  }

  #handleSearchInput(e) {
    if (e.key === 'Enter' && this.#options.length) {
      const optKey = this.#options?.[0].i
      if (optKey) {
        this.setSelectedOption(optKey)
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
      const optLengths = this.#config.options.length
      const alreadyPushedGroups = []
      const searchText = value.toLowerCase()
      for (let i = 0; i < optLengths; i++) {
        const opt = this.#config.options[i]
        if ('type' in opt) continue
        const lbl = opt.lbl.toLowerCase()
        if (lbl.includes(searchText)) {
          if ('groupIndex' in opt && !alreadyPushedGroups.includes(opt.groupIndex)) {
            const groupInd = opt.groupIndex
            alreadyPushedGroups.push(groupInd)
            filteredOptions.push(this.#config.options[groupInd])
          }
          filteredOptions.push(opt)
        }
      }
      if (!filteredOptions.length) {
        filteredOptions = [{ i: 'not-found', lbl: 'No Option Found' }]
      }
      this.#options = filteredOptions
      this.#clearSearchBtnElm.style.display = 'grid'
    } else {
      this.#options = this.#config.options
      this.#clearSearchBtnElm.style.display = 'none'
    }

    this.#reRenderVirtualOptions()
  }

  #setSearchValue(val) {
    this.#searchInputElm.value = val
  }

  #handleOutsideClick(event) {
    if (event.target.contains(this.#dropdownFieldWrapper)) {
      this.setMenu({ open: false })
    }
  }

  #isMenuOpen() {
    return this.#containsClass(this.#dropdownFieldWrapper, 'menu-open')
  }

  #openDropdownAsPerWindowSpace() {
    const elementRect = this.#dropdownFieldWrapper.getBoundingClientRect()

    const spaceAbove = elementRect.top
    const spaceBelow = window.innerHeight - elementRect.bottom

    if (spaceBelow < spaceAbove && spaceBelow < 250) {
      this.#dropdownFieldWrapper.style.flexDirection = 'column-reverse'
      this.#dropdownFieldWrapper.style.bottom = '0%'
    } else {
      this.#dropdownFieldWrapper.style.flexDirection = 'column'
      this.#dropdownFieldWrapper.style.removeProperty('bottom')
    }
  }

  setMenu({ open }) {
    this.#optionWrapperElm.style.height = `${open ? this.#config.maxHeight : 0}px`
    if (open) {
      this.#openDropdownAsPerWindowSpace()
      this.#dropdownFieldWrapper.classList.add('menu-open')
      this.#addEvent(document, 'click', e => this.#handleOutsideClick(e))
      this.#setTabIndex(this.#searchInputElm, 0)
      this.#setTabIndex(this.#clearSearchBtnElm, 0)
      this.#dropdownWrapperElm.setAttribute('aria-expanded', 'true')
      this.#setAttribute(this.#optionListElm, 'aria-hidden', false)
      this.#setAttribute(this.#searchInputElm, 'aria-hidden', false)
      this.#reRenderVirtualOptions()
    } else {
      this.#dropdownFieldWrapper.classList.remove('menu-open')
      document.removeEventListener('click', this.#handleOutsideClick)
      this.searchOptions('')
      this.#setTabIndex(this.#searchInputElm, -1)
      this.#setTabIndex(this.#clearSearchBtnElm, -1)
      this.#dropdownWrapperElm.setAttribute('aria-expanded', 'false')
      this.#setAttribute(this.#optionListElm, 'aria-hidden', true)
      this.#setAttribute(this.#searchInputElm, 'aria-hidden', true)
    }
    this.#toggleTabIndexOfOptions()
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

  set activelist(name) {
    const listElm = this.#select(`.${this.fieldKey}-option-list[data-list=${name}]`)
    if (listElm) {
      const notActiveListElms = this.#selectAll(`.${this.fieldKey}-option-list:not([data-list=${name}])`)
      notActiveListElms.forEach(elm => elm.classList.remove('active-list'))
      this.#setClassName(listElm, 'active-list')
      this.setSelectedOption('')
      this.#initOptionsList()
    }
  }

  set disabled(status) {
    if (String(status).toLowerCase() === 'true') {
      this.#dropdownFieldWrapper.classList.add('disabled')
      this.#dropdownHiddenInputElm.disabled = true
      this.#setTabIndex(this.#dropdownWrapperElm, -1)
      this.#setTabIndex(this.#selectedOptClearBtnElm, -1)
      this.#setAttribute(this.#dropdownWrapperElm, 'aria-label', 'Dropdown disabled')
      this.setMenu({ open: false })
    } else if (String(status).toLowerCase() === 'false') {
      this.#dropdownFieldWrapper.classList.remove('disabled')
      this.#dropdownHiddenInputElm.removeAttribute('disabled')
      this.#setTabIndex(this.#dropdownWrapperElm, 0)
      this.#setTabIndex(this.#selectedOptClearBtnElm, 0)
      this.#setAttribute(this.#dropdownWrapperElm, 'aria-label', this.#config.placeholder)
    }
  }

  get disabled() {
    return this.#dropdownHiddenInputElm.disabled
  }

  set readonly(status) {
    if (String(status).toLowerCase() === 'true') {
      this.#dropdownFieldWrapper.classList.add('disabled')
      this.#dropdownHiddenInputElm.readOnly = true
      this.#setTabIndex(this.#dropdownWrapperElm, -1)
      this.#setTabIndex(this.#selectedOptClearBtnElm, -1)
      this.setMenu({ open: false })
    } else if (String(status).toLowerCase() === 'false') {
      this.#dropdownFieldWrapper.classList.remove('disabled')
      this.#dropdownHiddenInputElm.removeAttribute('readonly')
      this.#setTabIndex(this.#dropdownWrapperElm, 0)
      this.#setTabIndex(this.#selectedOptClearBtnElm, 0)
    }
  }

  get readonly() {
    return this.#dropdownHiddenInputElm.readOnly
  }

  set value(val) {
    this.#dropdownHiddenInputElm.value = val
  }

  get value() {
    return this.#dropdownHiddenInputElm.value
  }

  #detachAllEvents() {
    this.#allEventListeners.forEach(({ selector, eventType, cb }) => {
      selector.removeEventListener(eventType, cb)
    })
  }

  destroy() {
    // this.#optionListElm.innerHTML = ''
    this.value = ''
    this.#detachAllEvents()
  }
}

export default DropdownField

// const list = new DropdownField('.dpd-fld-wrp', {
//   selectedOptImage: false,
//   selectedOptClearable: true,
//   searchClearable: true,
//   optionIcon: true,
//   placeholder: 'Select an option',
//   searchPlaceholder: 'Search option',
//   maxHeight: 400,
//   multipleSelect: true,
//   selectedOptImgSrc: 'test.png',
//   closeOnSelect: false,
//   activeList: 'dp1',
//   dropdownIcn: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'/>",
//   onChange: val => { console.log(val) },
// })

// list.activelist = 'dp2'
// list.readonly = true
// list.disabled = true

// list.value = 'Option 1\nOption 2'
// console.log(list.value)

// const listBtn = document.querySelector('#list-btn')
// listBtn.addEventListener('click', e => {
//   e.preventDefault()

//   const activeList = document.querySelector('.option-list.active-list').dataset.list
//   if (activeList === 'dp1') {
//     list.activelist = 'dp2'
//     list.value = 'Option 4'
//   } else if (activeList === 'dp2') {
//     list.activelist = 'dp1'
//     list.value = 'Option 1\nOption 6'
//   }
// })

// TODO set menu size - done
// TODO hide browser default search cross button - done
// TODO hide search cross button when search value empty - done
// TODO style scrollbar - done
// TODO option tabindex prblm - done
// TODO set variables for redundent this.#select - done
// TODO place selected country image placeholder when empty - done
// TODO catchable classname - done

// TODO virtual list remove - done
// TODO render options from php-html - done
// TODO search field will be configurable
// TODO there will be multiple option-list by ul, config will have propery name activeList, it can also be empty - done
// TODO setconfig property

// TODO native select

// multiple select = select on close default vabe false hoi jabe. r single er khetre default vabe true thakbe
// active list set korte parbe, tobe seta jekono ekta.
