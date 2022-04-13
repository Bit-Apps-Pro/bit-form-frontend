/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-useless-escape */
/* eslint-disable object-property-newline */
/* eslint-disable no-undef */

import { memo, useEffect, useMemo, useRef, useState } from 'react'
import Scrollbars from 'react-custom-scrollbars-2'
import { useFela } from 'react-fela'
import AtoZSortIcn from '../../Icons/AtoZSortIcn'
import BtnIcn from '../../Icons/BtnIcn'
import CheckBoxIcn from '../../Icons/CheckBoxIcn'
import ChevronDownIcn from '../../Icons/ChevronDownIcn'
import CodeSnippetIcn from '../../Icons/CodeSnippetIcn'
import ColorPickerIcn from '../../Icons/ColorPickerIcn'
import CurrencyIcn from '../../Icons/CurrencyIcn'
import DateIcn from '../../Icons/DateIcn'
import DateTimeIcn from '../../Icons/DateTimeIcn'
import DecisionBoxIcn from '../../Icons/DecisionBoxIcn'
import DividerIcn from '../../Icons/DividerIcn'
import DropDownIcn from '../../Icons/DropDownIcn'
import FileUploadIcn from '../../Icons/FileUploadIcn'
import FlagIcn from '../../Icons/FlagIcn'
import ImgFldIcn from '../../Icons/ImgFldIcn'
import MailIcn from '../../Icons/MailIcn'
import MonthIcn from '../../Icons/MonthIcn'
import NumberIcn from '../../Icons/NumberIcn'
import PasswordIcn from '../../Icons/PasswordIcn'
import PaypalIcn from '../../Icons/PaypalIcn'
import PhoneNumberIcn from '../../Icons/PhoneNumberIcn'
import RadioIcn from '../../Icons/RadioIcn'
import RazorPayIcn from '../../Icons/RazorPayIcn'
import ReCaptchaIcn from '../../Icons/ReCaptchaIcn'
import SearchIcon from '../../Icons/SearchIcon'
import TextareaIcn from '../../Icons/TextareaIcn'
import TextIcn from '../../Icons/TextIcn'
import TimeIcn from '../../Icons/TimeIcn'
import TitleIcn from '../../Icons/TitleIcn'
import UrlIcn from '../../Icons/UrlIcn'
import UserIcn from '../../Icons/UserIcn'
import WeekIcn from '../../Icons/WeekIcn'
import ut from '../../styles/2.utilities'
import Toolbars from '../../styles/Toolbars.style'
import { __ } from '../../Utils/i18nwrap'
import countries from '../../Utils/StaticData/countries.json'
import currencyList from '../../Utils/StaticData/currencies.json'
import phoneNumberList from '../../Utils/StaticData/phone-number-code.json'
import { searchKey } from '../style-new/styleHelpers'
import Cooltip from '../Utilities/Cooltip'
import Tools from './Tools'

function Toolbar({ tolbarSiz, setNewData, setTolbar }) {
  const { css } = useFela()
  const [searchData, setSearchData] = useState([])
  const [focusSearch, setfocusSearch] = useState(false)
  const [sortedTools, setSortedTools] = useState([])
  const [isSorted, setIsSorted] = useState(false)
  const [isScroll, setIsScroll] = useState(false)

  const tools = [
    {
      name: __('Text', 'bitform'),
      keywords: 'Text',
      icn: <TextIcn size="23" />,
      pos: { h: 40, w: 60, i: 'shadow_block', maxH: 40, minH: 40 },
      elm: {
        typ: 'text',
        lbl: __('Text Field', 'bitform'),
        ph: __('Placeholder Text...', 'bitform'),
        phHide: true,
        valid: {},
        err: {},
      },
    },
    {
      name: __('Multiline Text', 'bitform'),
      keywords: 'Multline Text',
      icn: <TextareaIcn size="23" />,
      pos: { h: 50, w: 60, i: 'shadow_block', minH: 40 },
      elm: {
        typ: 'textarea',
        lbl: __('Multi-Line Text', 'bitform'),
        ph: __('Placeholder Text...', 'bitform'),
        valid: {},
        err: {},
      },
    },
    {
      name: __('Email', 'bitform'),
      keywords: 'Email',
      icn: <MailIcn size="23" />,
      pos: { h: 40, w: 60, i: 'shadow_block', maxH: 40, minH: 40 },
      elm: {
        typ: 'email',
        lbl: __('Email Field', 'bitform'),
        ph: __('example@mail.com', 'bitform'),
        pattern: '^[^$_bf_$s@]+@[^$_bf_$s@]+$_bf_$.[^$_bf_$s@]+$',
        valid: {},
        err: { invalid: { dflt: 'Email is invalid', show: true } },
      },
    },
    {
      name: __('Number', 'bitform'),
      keywords: 'Number',
      icn: <NumberIcn w="23" />,
      pos: { h: 40, w: 60, i: 'shadow_block', maxH: 40, minH: 40 },
      elm: {
        typ: 'number',
        lbl: __('Number Field', 'bitform'),
        ph: __('Number Input', 'bitform'),
        valid: {},
        err: { invalid: { dflt: 'Number is invalid', show: true } },
      },
    },
    {
      name: __('Select', 'bitform'),
      keywords: 'Select',
      icn: <ChevronDownIcn size="23" />,
      pos: { h: 40, w: 60, i: 'shadow_block', maxH: 40, minH: 40 },
      tip: 'Select',
      elm: {
        typ: 'html-select',
        lbl: __('Select', 'bitform'),
        mul: false,
        opt: [
          { lbl: 'Option 1', val: 'Option 1' },
          { lbl: 'Option 2', val: 'Option 2' },
          { lbl: 'Option 3', val: 'Option 3' },
        ],
        ph: 'Select a option...',
        phHide: false,
        valid: {},
        err: {},
      },
    },
    {
      name: __('Radio Button', 'bitform'),
      keywords: 'Radio button, button',
      icn: <RadioIcn size="23" />,
      pos: { h: 70, w: 60, i: 'shadow_block', minH: 40 },
      elm: {
        typ: 'radio',
        lbl: __('Radio', 'bitform'),
        round: true,
        opt: [
          { lbl: __('Option 1', 'bitform') },
          { lbl: __('Option 2', 'bitform') },
          { lbl: __('Option 3', 'bitform') },
        ],
        valid: {},
        err: {},
        optionCol: 1,
      },
    },
    {
      name: __('Checkbox', 'bitform'),
      keywords: 'Check Box',
      icn: <CheckBoxIcn w="23" />,
      pos: { h: 70, w: 60, i: 'shadow_block', minH: 30 },
      elm: {
        typ: 'check',
        lbl: __('Check Boxs', 'bitform'),
        opt: [
          { lbl: __('Option 1', 'bitform') },
          { lbl: __('Option 2', 'bitform') },
          { lbl: __('Option 3', 'bitform') },
        ],
        valid: {},
        err: {},
        optionCol: 1,
      },
    },
    {
      name: __('Dropdown', 'bitform'),
      keywords: 'Dropdown',
      icn: <DropDownIcn w="23" />,
      pos: { h: 40, w: 60, i: 'shadow_block', maxH: 40, minH: 40 },
      elm: {
        typ: 'select',
        lbl: __('Drop-Down', 'bitform'),
        mul: false,
        options: [
          { lbl: 'Option 1', val: 'Option 1' },
          { lbl: 'Option 2', val: 'Option 2' },
          { lbl: 'Option 3', val: 'Option 3' },
        ],
        optionsList: [
          {
            'List-1': [
              { lbl: 'Option 1 1', val: 'Option 1 1' },
              { lbl: 'Option 1 2', val: 'Option 1 2' },
              { lbl: 'Option 1 3', val: 'Option 1 3' },
            ],
          },
        ],
        config: {
          selectedOptImage: false,
          selectedOptClearable: true,
          searchClearable: true,
          optionIcon: false,
          placeholder: 'Select an option',
          searchPlaceholder: 'Search option',
          maxHeight: 400,
          multipleSelect: true,
          selectedOptImgSrc: 'test.png',
          closeOnSelect: false,
          activeList: 0,
          // dropdownIcn: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'/>",
          // onChange: val => { console.log(val) },
        },
        valid: {},
        err: {},
      },
    },
    {
      name: __('File Upload', 'bitform'),
      keywords: 'File Upload',
      icn: <FileUploadIcn w="23" />,
      pos: { h: 40, w: 60, i: 'shadow_block', minH: 40, minW: 20 },
      elm: {
        typ: 'file-up',
        lbl: __('File Upload', 'bitform'),
        btnTxt: 'Attach File',
        valid: {},
        prefixIcn: `${bits.assetsURL}/../static/file-upload/paperclip.svg`,
        err: {},
        config: {
          multiple: true,
          showMaxSize: true,
          maxSize: 2,
          sizeUnit: 'MB',
          isItTotalMax: false,
          showSelectStatus: true,
          fileSelectStatus: 'No File Selected',
          allowedFileType: '',
          showFileList: true,
          showFilePreview: true,
          showFileSize: true,
          duplicateAllow: false,
          accept: '',
          minFile: 0,
          maxFile: 0,
        },
      },
    },
    {
      name: __('Advanced File Upload', 'bitform'),
      keywords: 'Advanced File Upload',
      icn: <FileUploadIcn w="23" />,
      pos: { h: 40, w: 60, i: 'shadow_block', minH: 40, minW: 20 },
      elm: {
        typ: 'advanced-file-up',
        lbl: __('File Upload', 'bitform'),
        upBtnTxt: 'Attach File',
        valid: {},
        config: {
          credits: false,
          allowDrop: true,
          allowPaste: true,
          allowMultiple: false,
          allowReplace: true,
          allowReorder: false,
          allowBrowse: true,
          allowRevert: true,
          allowRemove: true,
          forceRevert: true,
          instantUpload: false,
          dropOnElement: false,
          allowFileSizeValidation: false,
          allowFileTypeValidation: false,
          allowPreview: false,
          allowImageCrop: false,
          allowImagePreview: false,
          allowImageResize: false,
          allowImageTransform: false,
          allowImageValidateSize: false,
        },
        err: {},
      },
    },
    {
      name: __('Country', 'bitform'),
      keywords: 'Country',
      icn: <FlagIcn size="23" />,
      pos: { h: 40, w: 60, i: 'shadow_block', maxH: 40, minH: 40 },
      elm: {
        typ: 'country',
        lbl: __('Select Country', 'bitform'),
        mul: false,
        phHide: true,
        ph: 'Select a Country',
        config: {
          selectedFlagImage: true,
          selectedCountryClearable: true,
          searchClearable: true,
          optionFlagImage: true,
          detectCountryByIp: false,
          detectCountryByGeo: false,
          defaultValue: '',
          showSearchPh: true,
          searchPlaceholder: 'Search for countries',
        },
        options: countries,
        valid: {},
      },
    },
    {
      name: __('Currency', 'bitform'),
      keywords: 'Currency, Currency Field, Amount',
      icn: <CurrencyIcn size={20} />,
      pos: { h: 40, w: 60, i: 'shadow_block', minH: 40, maxH: 40 },
      elm: {
        typ: 'currency',
        lbl: __('Currency Field', 'bitform'),
        inputFormatOptions: {
          formatter: 'browser',
          showCurrencySymbol: true,
          decimalSeparator: '.',
        },
        valueFormatOptions: {
          formatter: 'browser',
          showCurrencySymbol: true,
          decimalSeparator: '.',
        },
        options: currencyList,
        valid: {},
        err: {},
      },
    },
    {
      name: __('Phone Number', 'bitform'),
      keywords: 'Phone number, Number',
      icn: <PhoneNumberIcn size={20} />,
      pos: { h: 40, w: 60, i: 'shadow_block', minH: 40, maxH: 40 },
      elm: {
        typ: 'phone-number',
        lbl: __('Phone Number', 'bitform'),
        config: {
          inputFormat: '',
          valueFormat: '',
        },
        options: phoneNumberList,
        valid: {},
        err: {},
      },
    },
    {
      name: __('User Name', 'bitform'),
      keywords: 'User Name, text',
      icn: <UserIcn size="22" />,
      pos: { h: 40, w: 60, i: 'shadow_block', maxH: 40, minH: 40 },
      elm: {
        typ: 'username',
        lbl: __('User Name', 'bitform'),
        ph: __('Placeholder Text...', 'bitform'),
        valid: {},
        err: { entryUnique: { dflt: 'That User Name is taken. Try another.', show: true } },
      },
    },
    {
      name: __('Password', 'bitform'),
      keywords: 'Password',
      icn: <PasswordIcn size="23" />,
      pos: { h: 40, w: 60, i: 'shadow_block', maxH: 40, minH: 40 },
      elm: {
        typ: 'password',
        lbl: __('Password Field', 'bitform'),
        ph: __('Placeholder...', 'bitform'),
        valid: {},
        err: {},
      },
    },
    {
      name: __('Date', 'bitform'),
      keywords: 'Date',
      icn: <DateIcn w="23" />,
      pos: { h: 40, w: 60, i: 'shadow_block', maxH: 40, minH: 40 },
      elm: {
        typ: 'date',
        lbl: __('Date Input', 'bitform'),
        valid: {},
        err: {},
      },
    },
    {
      name: __('Time', 'bitform'),
      keywords: 'Time',
      icn: <TimeIcn size="23" />,
      pos: { h: 40, w: 60, i: 'shadow_block', maxH: 40, minH: 40 },
      elm: {
        typ: 'time',
        lbl: __('Time Input', 'bitform'),
        valid: {},
        err: {},
      },
    },
    {
      name: __('Date-Time', 'bitform'),
      keywords: 'Date-Time, Date, Time',
      icn: <DateTimeIcn w="23" />,
      pos: { h: 40, w: 60, i: 'shadow_block', maxH: 40, minH: 40 },
      elm: {
        typ: 'datetime-local',
        lbl: __('Date-Time Input', 'bitform'),
        valid: {},
        err: {},
      },
    },
    {
      name: __('Week', 'bitform'),
      keywords: 'Week, Date',
      icn: <WeekIcn size="23" />,
      pos: { h: 40, w: 60, i: 'shadow_block', maxH: 40, minH: 40 },
      elm: {
        typ: 'week',
        lbl: __('Week Input', 'bitform'),
        valid: {},
        err: {},
      },
    },
    {
      name: __('Month', 'bitform'),
      keywords: 'Month, Date',
      icn: <MonthIcn w="23" />,
      pos: { h: 40, w: 60, i: 'shadow_block', maxH: 40, minH: 40 },
      elm: {
        typ: 'month',
        lbl: __('Month Input', 'bitform'),
        valid: {},
        err: {},
      },
    },
    {
      name: __('URL', 'bitform'),
      keywords: 'URL',
      icn: <UrlIcn w="23" />,
      pos: { h: 40, w: 60, i: 'shadow_block', maxH: 40, minH: 40 },
      elm: {
        typ: 'url',
        attr: {
          title: 'https://www.example.com  or  www.example.com',
          // eslint-disable-next-line max-len
          pattern: '^(?:(?:https?|ftp):$_bf_$/$_bf_$/)?(?:(?!(?:10|127)(?:$_bf_$.$_bf_$d{1,3}){3})(?!(?:169$_bf_$.254|192$_bf_$.168)(?:$_bf_$.$_bf_$d{1,3}){2})(?!172$_bf_$.(?:1[6-9]|2$_bf_$d|3[0-1])(?:$_bf_$.$_bf_$d{1,3}){2})(?:[1-9]$_bf_$d?|1$_bf_$d$_bf_$d|2[01]$_bf_$d|22[0-3])(?:$_bf_$.(?:1?$_bf_$d{1,2}|2[0-4]$_bf_$d|25[0-5])){2}(?:$_bf_$.(?:[1-9]$_bf_$d?|1$_bf_$d$_bf_$d|2[0-4]$_bf_$d|25[0-4]))|(?:(?:[a-z$_bf_$u00a1-$_bf_$uffff0-9]-*)*[a-z$_bf_$u00a1-$_bf_$uffff0-9]+)(?:$_bf_$.(?:[a-z$_bf_$u00a1-$_bf_$uffff0-9]-*)*[a-z$_bf_$u00a1-$_bf_$uffff0-9]+)*(?:$_bf_$.(?:[a-z$_bf_$u00a1-$_bf_$uffff]{2,})))(?::$_bf_$d{2,5})?(?:$_bf_$/$_bf_$S*)?$',
        },
        lbl: __('URL Field', 'bitform'),
        ph: __('https://www.example.com', 'bitform'),
        valid: {},
        err: { invalid: { dflt: 'URL is invalid', show: true } },
      },
    },
    {
      name: __('Color Picker', 'bitform'),
      keywords: 'Color Picker',
      icn: <ColorPickerIcn w="23" />,
      pos: { h: 40, w: 60, i: 'shadow_block', maxH: 40, minH: 40 },
      elm: {
        typ: 'color',
        lbl: __('Color Picker', 'bitform'),
        valid: {},
        err: {},
      },
    },
    {
      name: __('Decision Box', 'bitform'),
      keywords: 'Decision box, GDPR',
      icn: <DecisionBoxIcn size="23" />,
      pos: { h: 40, w: 60, i: 'shadow_block', minH: 20 },
      elm: {
        typ: 'decision-box',
        adminLbl: __('Decision Box', 'bitform'),
        lbl: `<p><span style="font-size: 12pt">${__('Decision Box', 'bitform')}</span></p>`,
        msg: {
          checked: 'Accepted',
          unchecked: 'Not Accepted',
        },
        valid: { req: true },
        err: { req: { dflt: 'This field is required', show: true } },
      },
    },
    {
      name: __('reCaptcha v2', 'bitform'),
      keywords: 'ReCaptcha v2',
      icn: <ReCaptchaIcn size="23" />,
      pos: { h: 40, w: 60, i: 'shadow_block', minH: 40, minW: 20 },
      elm: {
        typ: 'recaptcha',
        theme: 'light',
        valid: {},
        config: {
          theme: 'light',
          size: 'normal',
        },
      },
    },
    {
      name: 'Button',
      keywords: 'Button',
      icn: <BtnIcn size="23" />,
      pos: { h: 40, w: 60, i: 'shadow_block', minH: 40, maxH: 40 },
      elm: {
        typ: 'button',
        btnTyp: 'button',
        btnSiz: 'md',
        txt: __('Button'),
        align: 'start',
        icn: {
          pos: '',
          url: '',
        },
        valid: {},
      },
    },
    {
      name: __('Paypal', 'bitform'),
      keywords: 'Paypal, payment',
      icn: <PaypalIcn w="23" />,
      pos: { h: 100, w: 60, i: 'shadow_block', minH: 60, maxH: 140, minW: 20 },
      elm: {
        typ: 'paypal',
        currency: 'USD',
        lbl: __('PayPal', 'bitform'),
        style: {
          layout: 'vertical',
          color: 'gold',
          shape: 'rect',
          label: 'paypal',
        },
        valid: {},
      },
    },
    {
      name: __('Razorpay', 'bitform'),
      keywords: 'Razorpay, payment',
      icn: <RazorPayIcn w="17" h="23" />,
      pos: { h: 40, w: 60, i: 'shadow_block', minH: 40, maxH: 140, minW: 20 },
      elm: {
        typ: 'razorpay',
        lbl: __('Razorpay', 'bitform'),
        btnSiz: 'md',
        fulW: false,
        subTitl: true,
        align: 'center',
        btnTxt: 'Pay Now',
        btnTheme: 'dark',
        // options: {
        //   currency: 'INR',
        //   theme: {},
        //   modal: {},
        //   prefill: {},
        //   notes: {},
        // },
        options: {
          name: 'Test Razorpay',
          description: 'wowowowowowo',
          amount: 200.00,
          amountType: 'dynamic',
          amountFld: 'bf-2',
          theme: { color: 'RED', backdrop_color: 'BLUE' },
          prefill: { name: 'bf-1' },
          modal: { confirm_close: false },
        },
        valid: {},
      },
    },
    {
      name: __('Title', 'bitform'),
      keywords: 'title',
      icn: <TitleIcn w="23" />,
      pos: { h: 24, w: 60, i: 'shadow_block', minH: 20 },
      elm: {
        typ: 'title',
        titleImg: '',
        logoHide: true,
        title: __('Title', 'bitform'),
        titleHide: false,
        subtitleHide: true,
        titleTag: 'h1',
        subTitleTag: 'h5',
        valid: {},
        err: {},
      },
    },
    {
      name: __('Image', 'bitform'),
      keywords: 'image',
      icn: <ImgFldIcn w="23" />,
      pos: { h: 40, w: 60, i: 'shadow_block', minH: 10 },
      elm: {
        typ: 'image',
        img: {},
        err: {},
      },
    },
    {
      name: __('Divider', 'bitform'),
      keywords: 'divider',
      icn: <DividerIcn w="23" />,
      pos: { h: 20, w: 60, i: 'shadow_block', minH: 8 },
      elm: {
        typ: 'divider',
        divider: {},
        err: {},
      },
    },
    {
      name: 'HTML',
      keywords: 'HTML',
      icn: <CodeSnippetIcn size="23" />,
      pos: { h: 40, w: 60, i: 'shadow_block' },
      elm: {
        typ: 'html',
        content: '<b>Html Field</b><p><span style="font-size: 12pt">Add html content on editor</span></p>',
        valid: {},
      },
    },
    /* {
      name: 'Blank Block',
      icn: blank,
      pos: { h: 40, w: 30, i: 'shadow_block' },
      elm: {
        typ: 'blank',
      },
    }, */
  ]

  // TODO disable this event when a modal opened
  useEffect(() => {
    window.addEventListener('keydown', searchKey)
    return () => {
      window.removeEventListener('keydown', searchKey)
    }
  }, [])

  const searchHandler = (e) => {
    setSortedTools([])
    let searchTool = e.target.value.trim()
    const searchItem = []

    if (searchTool) {
      searchTool = searchTool.toLowerCase()
      const itm = tools.filter(field => (field.keywords.toLowerCase().includes(searchTool)))
      searchItem.push(...itm)
    } else {
      // eslint-disable-next-line no-const-assign
      setSearchData([])
    }

    if (searchItem.length > 0) setSearchData(searchItem)

    if (searchTool === '' && isSorted) sortTools()
  }

  const sortTools = () => {
    tools.sort((a, b) => {
      const fa = a.name.toLowerCase()
      const fb = b.name.toLowerCase()
      return fa < fb ? -1 : 1
    })
    setIsSorted(true)
    setSortedTools(tools)
  }

  const sortingField = () => {
    if (!isSorted) {
      sortTools()
    } else {
      setIsSorted(false)
      setSortedTools(tools)
    }
  }
  const onScrollHandler = (e) => {
    const { scrollTop } = e.target
    if (scrollTop > 50) setIsScroll(true)
    else setIsScroll(false)
  }

  //   box-shadow: 0 2px 8px -2px black;
  //   position: relative;
  //   z-index: 99;
  // }

  const toolsArray = () => {
    if (!searchData.length && !sortedTools.length) return tools
    if (!sortedTools.length && searchData) return searchData
    if (!searchData.length && sortedTools) return sortedTools
    return []
  }

  const searchInput = useRef(null)

  const clearSearch = () => {
    searchInput.current.value = ''
    setSearchData([])
    setfocusSearch(false)
  }

  const blurSearchInp = () => {
    setTimeout(() => {
      setfocusSearch(false)
    }, 100)
  }

  return (
    <div className={css(Toolbars.toolbar_wrp)} style={{ width: tolbarSiz && 200 }}>
      <div className={css(ut.flxc, { my: 5 }, isScroll && Toolbars.searchBar)}>
        <div className={css(Toolbars.fields_search)} style={{ width: focusSearch ? '80%' : '68%', marginTop: '2px' }}>
          <input
            ref={searchInput}
            title="Search Field"
            aria-label="Search Field"
            autoComplete="off"
            // placeholder="Search..."
            id="search-icon"
            type="search"
            name="searchIcn"
            onChange={searchHandler}
            onFocus={() => setfocusSearch(true)}
            onBlur={blurSearchInp}
            className={css(Toolbars.search_field)}
          />
          {!!searchData.length && (
            <span title="clear" className={css(Toolbars.clear_icn)} role="button" tabIndex="-1" onClick={clearSearch} onKeyPress={clearSearch}>&nbsp;</span>
          )}

          <span title="search" className={css(Toolbars.search_icn)}>
            <SearchIcon size="20" />
          </span>

          {!searchData.length && (<div className={`${css(Toolbars.shortcut)} shortcut`} title={'Press "Ctrl+/" to focus search'}>Ctrl+/</div>)}
        </div>
        {!focusSearch
          && (
            <button title="Sort by ascending order" className={`${css(Toolbars.sort_btn)} ${isSorted && 'active'}`} type="button" onClick={sortingField} aria-label="Sort Fields">
              <AtoZSortIcn size="20" />
            </button>
          )}
      </div>

      {useMemo(() => (
        <Scrollbars
          onScroll={onScrollHandler}
          autoHide
          style={{ maxWidth: 400 }}
        >
          <div className={css(Toolbars.tool_bar)}>
            {toolsArray().map(tool => (
              <Tools key={tool.name} setNewData={setNewData} value={{ fieldData: tool.elm, fieldSize: tool.pos }}>
                <div className={`${css(toolStyle.wrp)} ${css(tool.tip ? ut.w9 : ut.w10)}`} title={tool.name}>
                  <span className={`${css(Toolbars.tool_icn, ut.mr1)} tool-icn`}>{tool.icn}</span>
                  {tool.name}
                </div>
                {tool.tip && (
                  <Cooltip className={`${css(ut.w1)} hover-tip`} icnSize={15}>
                    <div className="txt-body">{tool.tip}</div>
                  </Cooltip>
                )}
              </Tools>
            ))}
          </div>
        </Scrollbars>
        // eslint-disable-next-line react-hooks/exhaustive-deps
      ), [tolbarSiz, searchData, isSorted, sortedTools])}
    </div>
  )
}
export default memo(Toolbar)

const toolStyle = {
  wrp: {
    flx: 'align-center',
    ow: 'hidden',
    w: '90%',
  },
}
