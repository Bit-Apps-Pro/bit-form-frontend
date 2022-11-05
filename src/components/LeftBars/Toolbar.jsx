/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-useless-escape */
/* eslint-disable object-property-newline */
/* eslint-disable no-undef */

import { memo, useEffect, useMemo, useRef, useState } from 'react'
import Scrollbars from 'react-custom-scrollbars-2'
import { useFela } from 'react-fela'
import AdvanceFileUpIcn from '../../Icons/AdvanceFileUpIcn'
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

function Toolbar({ setNewData }) {
  const { css } = useFela()
  const [searchData, setSearchData] = useState([])
  const [focusSearch, setfocusSearch] = useState(false)
  const [sortedTools, setSortedTools] = useState([])
  const [isSorted, setIsSorted] = useState(false)
  const [isScroll, setIsScroll] = useState(false)
  const searchInput = useRef(null)

  const tools = [
    {
      name: __('Text'),
      keywords: 'Text',
      icn: <TextIcn size="23" />,
      pos: { h: 80, w: 60, i: 'shadow_block' },
      elm: {
        typ: 'text',
        lbl: __('Text Field'),
        ph: __('Placeholder...'),
        phHide: true,
        valid: {},
        err: {},
        customClasses: {}, // { key(elementkey): 'class1 class2 class3'}
        customAttributes: {}, // { key(elementKey) : [{attrKey: attrValue}, {attrKey: attrValue}]}
      },
    },
    {
      name: __('Multiline Text'),
      keywords: 'Multline Text, Textarea, Text Area',
      icn: <TextareaIcn size="23" />,
      pos: { h: 100, w: 60, minW: 9, i: 'shadow_block' },
      elm: {
        typ: 'textarea',
        lbl: __('Multi-Line Text'),
        ph: __('Placeholder...'),
        phHide: true,
        valid: {},
        err: {},
        customClasses: {},
        customAttributes: {},
      },
    },
    {
      name: __('Email'),
      keywords: 'Email, Email Address',
      icn: <MailIcn size="23" />,
      pos: { h: 80, w: 60, i: 'shadow_block' },
      elm: {
        typ: 'email',
        lbl: __('Email Field'),
        ph: __('example@mail.com'),
        phHide: true,
        pattern: '^[^$_bf_$s@]+@[^$_bf_$s@]+$_bf_$.[^$_bf_$s@]+$',
        valid: {},
        err: { invalid: { dflt: '<p>Email is invalid</p>', show: true } },
        customClasses: {},
        customAttributes: {},
      },
    },
    {
      name: __('Number'),
      keywords: 'Number, Numeric, Numeric Field',
      icn: <NumberIcn w="23" />,
      pos: { h: 80, w: 60, i: 'shadow_block' },
      elm: {
        typ: 'number',
        lbl: __('Number'),
        ph: __('e.g. 123'),
        phHide: true,
        valid: {},
        err: { invalid: { dflt: '<p>Number is invalid</p>', show: true } },
        customClasses: {},
        customAttributes: {},
      },
    },
    {
      name: __('Select'),
      keywords: 'Select, Dropdown, Drop Down',
      icn: <ChevronDownIcn size="23" />,
      pos: { h: 80, w: 60, i: 'shadow_block' },
      tip: 'Select',
      elm: {
        typ: 'html-select',
        lbl: __('Select'),
        mul: false,
        opt: [
          { lbl: 'Option 1' },
          { lbl: 'Option 2' },
          { lbl: 'Option 3' },
        ],
        ph: 'Select a option...',
        phHide: false,
        valid: {},
        err: {},
        customClasses: {},
        customAttributes: {},
      },
    },
    {
      name: __('Radio Button'),
      keywords: 'Radio button, Choice, Single Choice, Radio Group',
      icn: <RadioIcn size="23" />,
      pos: { h: 140, w: 60, i: 'shadow_block' },
      elm: {
        typ: 'radio',
        lbl: __('Radio'),
        round: true,
        opt: [
          { lbl: __('Option 1') },
          { lbl: __('Option 2') },
          { lbl: __('Option 3') },
        ],
        valid: {},
        err: {},
        optionCol: 1,
        customClasses: {},
        customAttributes: {},
      },
    },
    {
      name: __('Checkbox'),
      keywords: 'Check Box, Mark, Tick, Option, Select, Choice, Multiple, Multiple Choice, Multiple Select, Multiple Option',
      icn: <CheckBoxIcn w="23" />,
      pos: { h: 140, w: 60, i: 'shadow_block' },
      elm: {
        typ: 'check',
        lbl: __('Check Boxs'),
        opt: [
          { lbl: __('Option 1') },
          { lbl: __('Option 2') },
          { lbl: __('Option 3') },
        ],
        valid: {},
        err: {},
        optionCol: 1,
        customClasses: {},
        customAttributes: {},
      },
    },
    {
      name: __('Dropdown'),
      keywords: 'Dropdown, Select, Drop Down, Multiple Select, Multiple Choice, Multiple Option',
      icn: <DropDownIcn w="23" />,
      pos: { h: 80, w: 60, i: 'shadow_block' },
      elm: {
        typ: 'select',
        lbl: __('Dropdown'),
        mul: false,
        phHide: true,
        ph: 'Select a Option',
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
          showSearchPh: true,
          searchPlaceholder: 'Search options..',
          maxHeight: 400,
          multipleSelect: true,
          selectedOptImgSrc: 'test.png',
          closeOnSelect: false,
          activeList: 0,
          allowCustomOption: false,
          // dropdownIcn: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'/>",
          // onChange: val => { console.log(val) },
        },
        valid: {},
        err: {},
        customClasses: {},
        customAttributes: {},
      },
    },
    {
      name: __('File Upload'),
      keywords: 'File Upload, Attachment',
      icn: <FileUploadIcn w="23" />,
      pos: { h: 80, w: 60, i: 'shadow_block', minW: 20 },
      elm: {
        typ: 'file-up',
        lbl: __('File Upload'),
        btnTxt: 'Attach File',
        valid: {},
        prefixIcn: `${bits.assetsURL}/../static/file-upload/paperclip.svg`,
        err: {
          maxSize: {
            dflt: '<p>File Size is Exceeded</p>',
            show: true,
          },
          minFile: {
            dflt: '<p>Minimum 0 file required</p>',
            show: true,
          },
          maxFile: {
            dflt: '<p>Maximum 0 file can uploaded</p>',
            show: true,
          },
        },
        customClasses: {},
        customAttributes: {},
        config: {
          multiple: true,
          allowMaxSize: true,
          showMaxSize: true,
          maxSize: 2,
          sizeUnit: 'MB',
          isItTotalMax: false,
          showSelectStatus: true,
          fileSelectStatus: 'No File Selected',
          allowedFileType: '',
          showFileList: true,
          fileExistMsg: 'A file allready exist',
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
      name: __('Advance File Upload'),
      keywords: 'Advanced File Upload, Attachment, photo, image, video, audio, file, document, doc, pdf, excel, ppt',
      icn: <AdvanceFileUpIcn w="23" />,
      pos: { h: 80, w: 60, i: 'shadow_block', minW: 20 },
      elm: {
        typ: 'advanced-file-up',
        lbl: __('Advanced File Upload'),
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
        customClasses: {},
        customAttributes: {},
      },
    },
    {
      name: __('Country'),
      keywords: 'Country, Country List, Country Dropdown, Country Select',
      icn: <FlagIcn size="23" />,
      pos: { h: 80, w: 60, i: 'shadow_block' },
      elm: {
        typ: 'country',
        lbl: __('Country'),
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
          noCountryFoundText: 'No Country Found',
        },
        options: countries,
        valid: {},
        err: {},
        customClasses: {},
        customAttributes: {},
      },
    },
    {
      name: __('Currency'),
      keywords: 'Currency, Currency Field, Amount',
      icn: <CurrencyIcn size={20} />,
      pos: { h: 80, w: 60, i: 'shadow_block' },
      elm: {
        typ: 'currency',
        lbl: __('Currency'),
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
        config: {
          selectedFlagImage: true,
          selectedCurrencyClearable: true,
          searchClearable: true,
          optionFlagImage: true,
          defaultCurrencyKey: '',
          showSearchPh: true,
          searchPlaceholder: 'Search for countries',
          noCurrencyFoundText: 'No Currency Found',
        },
        options: currencyList,
        valid: {},
        err: {},
        customClasses: {},
        customAttributes: {},
      },
    },
    {
      name: __('Phone Number'),
      keywords: 'Phone number, Number',
      icn: <PhoneNumberIcn size={20} />,
      pos: { h: 80, w: 60, i: 'shadow_block' },
      elm: {
        typ: 'phone-number',
        lbl: __('Phone Number'),
        config: {
          selectedFlagImage: true,
          selectedCountryClearable: true,
          searchClearable: true,
          optionFlagImage: true,
          defaultCountryKey: '',
          showSearchPh: true,
          searchPlaceholder: 'Search for countries',
          noCountryFoundText: 'No Country Found',
          inputFormat: '+c #### ### ###',
          valueFormat: '+c #### ### ###',
        },
        options: phoneNumberList,
        valid: {},
        err: {},
        customClasses: {},
        customAttributes: {},
      },
    },
    {
      name: __('Username'),
      keywords: 'User Name, text',
      icn: <UserIcn size="22" />,
      pos: { h: 80, w: 60, i: 'shadow_block' },
      elm: {
        typ: 'username',
        lbl: __('Username'),
        ph: __('e.g. John Doe'),
        phHide: true,
        valid: {},
        err: { entryUnique: { dflt: 'That User Name is taken. Try another.', show: true } },
        customClasses: {},
        customAttributes: {},
      },
    },
    {
      name: __('Password'),
      keywords: 'Password',
      icn: <PasswordIcn size="23" />,
      pos: { h: 80, w: 60, i: 'shadow_block' },
      elm: {
        typ: 'password',
        lbl: __('Password Field'),
        ph: __('Placeholder...'),
        phHide: true,
        valid: {},
        err: {},
        customClasses: {},
        customAttributes: {},
      },
    },
    {
      name: __('Date'),
      keywords: 'Date, Date Field, month',
      icn: <DateIcn w="23" />,
      pos: { h: 80, w: 60, i: 'shadow_block' },
      elm: {
        typ: 'date',
        lbl: __('Pick A Date'),
        valid: {},
        err: {},
        customClasses: {},
        customAttributes: {},
      },
    },
    {
      name: __('Time'),
      keywords: 'Time, Time Picker, Time Select, minutes, hours',
      icn: <TimeIcn size="23" />,
      pos: { h: 80, w: 60, i: 'shadow_block' },
      elm: {
        typ: 'time',
        lbl: __('Select Time'),
        valid: {},
        err: {},
        customClasses: {},
        customAttributes: {},
      },
    },
    {
      name: __('Date-Time'),
      keywords: 'Date-Time, Date, Time, day, month, year',
      icn: <DateTimeIcn w="23" />,
      pos: { h: 80, w: 60, i: 'shadow_block' },
      elm: {
        typ: 'datetime-local',
        lbl: __('Select Date-Time'),
        valid: {},
        err: {},
        customClasses: {},
        customAttributes: {},
      },
    },
    {
      name: __('Week'),
      keywords: 'Week, Date, day',
      icn: <WeekIcn size="23" />,
      pos: { h: 80, w: 60, i: 'shadow_block' },
      elm: {
        typ: 'week',
        lbl: __('Select Week'),
        valid: {},
        err: {},
        customClasses: {},
        customAttributes: {},
      },
    },
    {
      name: __('Month'),
      keywords: 'Month, Date',
      icn: <MonthIcn w="23" />,
      pos: { h: 80, w: 60, i: 'shadow_block' },
      elm: {
        typ: 'month',
        lbl: __('Month Input'),
        valid: {},
        err: {},
        customClasses: {},
        customAttributes: {},
      },
    },
    {
      name: __('URL'),
      keywords: 'URL, Link, Website, Web Address, Web URL, Web Link, Web Site',
      icn: <UrlIcn w="23" />,
      pos: { h: 80, w: 60, i: 'shadow_block' },
      elm: {
        typ: 'url',
        attr: {
          title: 'https://www.example.com  or  www.example.com',
          // eslint-disable-next-line max-len
          pattern: '^(?:(?:https?|ftp):$_bf_$/$_bf_$/)?(?:(?!(?:10|127)(?:$_bf_$.$_bf_$d{1,3}){3})(?!(?:169$_bf_$.254|192$_bf_$.168)(?:$_bf_$.$_bf_$d{1,3}){2})(?!172$_bf_$.(?:1[6-9]|2$_bf_$d|3[0-1])(?:$_bf_$.$_bf_$d{1,3}){2})(?:[1-9]$_bf_$d?|1$_bf_$d$_bf_$d|2[01]$_bf_$d|22[0-3])(?:$_bf_$.(?:1?$_bf_$d{1,2}|2[0-4]$_bf_$d|25[0-5])){2}(?:$_bf_$.(?:[1-9]$_bf_$d?|1$_bf_$d$_bf_$d|2[0-4]$_bf_$d|25[0-4]))|(?:(?:[a-z$_bf_$u00a1-$_bf_$uffff0-9]-*)*[a-z$_bf_$u00a1-$_bf_$uffff0-9]+)(?:$_bf_$.(?:[a-z$_bf_$u00a1-$_bf_$uffff0-9]-*)*[a-z$_bf_$u00a1-$_bf_$uffff0-9]+)*(?:$_bf_$.(?:[a-z$_bf_$u00a1-$_bf_$uffff]{2,})))(?::$_bf_$d{2,5})?(?:$_bf_$/$_bf_$S*)?$',
        },
        lbl: __('URL'),
        ph: __('https://www.example.com'),
        phHide: true,
        valid: {},
        err: { invalid: { dflt: '<p>URL is invalid</p>', show: true } },
        customClasses: {},
        customAttributes: {},
      },
    },
    {
      name: __('Color Picker'),
      keywords: 'Color Picker, Color Select, Color Picker Field, Color Select Field',
      icn: <ColorPickerIcn w="23" />,
      pos: { h: 80, w: 60, i: 'shadow_block' },
      elm: {
        typ: 'color',
        lbl: __('Color Picker'),
        valid: {},
        err: {},
        customClasses: {},
        customAttributes: {},
      },
    },
    {
      name: __('Decision Box'),
      keywords: 'Decision box, GDPR, Yes/No, Agree/Disagree',
      icn: <DecisionBoxIcn size="23" />,
      pos: { h: 40, w: 60, i: 'shadow_block' },
      elm: {
        typ: 'decision-box',
        adminLbl: __('Decision Box'),
        lbl: `<p><span style="font-size: 12pt">${__('Decision Box')}</span></p>`,
        msg: {
          checked: 'Accepted',
          unchecked: 'Not Accepted',
        },
        valid: { req: true },
        err: { req: { dflt: '<p>This field is required</p>', show: true } },
        customClasses: {},
        customAttributes: {},
      },
    },
    {
      name: __('reCaptcha v2'),
      keywords: 'ReCaptcha v2, Google ReCaptcha v2, spam protection, bot protection',
      icn: <ReCaptchaIcn size="23" />,
      pos: { h: 80, w: 60, i: 'shadow_block', minW: 20 },
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
      keywords: 'Button, Submit, Submit Button, Submit Form, click, click button',
      icn: <BtnIcn size="23" />,
      pos: { h: 60, w: 60, i: 'shadow_block' },
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
        customClasses: {},
        customAttributes: {},
      },
    },
    {
      name: __('Paypal'),
      keywords: 'Paypal, payment, credit card, credit card payment',
      icn: <PaypalIcn w="23" />,
      pos: { h: 200, w: 60, i: 'shadow_block', minW: 20 },
      elm: {
        typ: 'paypal',
        currency: 'USD',
        style: {
          layout: 'vertical',
          color: 'gold',
          shape: 'rect',
          label: 'paypal',
          height: '55',
        },
        valid: {},
      },
    },
    {
      name: __('Razorpay'),
      keywords: 'Razorpay, payment, credit card, credit card payment',
      icn: <RazorPayIcn w="17" h="23" />,
      pos: { h: 80, w: 60, i: 'shadow_block', minW: 20 },
      elm: {
        typ: 'razorpay',
        lbl: __('Razorpay'),
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
          name: 'Razorpay',
          description: '',
          currency: 'INR',
          amount: 0,
          amountType: 'fixed',
          theme: {},
          prefill: {},
          modal: { confirm_close: false },
        },
        valid: {},
        customClasses: {},
        customAttributes: {},
      },
    },
    {
      name: __('Title'),
      keywords: 'title, heading, heading 1, heading 2, heading 3, heading 4, heading 5, heading 6',
      icn: <TitleIcn w="23" />,
      pos: { h: 48, w: 60, i: 'shadow_block' },
      elm: {
        typ: 'title',
        titleImg: '',
        logoHide: true,
        title: 'Your Title Here',
        titleHide: false,
        subtitleHide: true,
        titleTag: 'h1',
        subTitleTag: 'h5',
        valid: {},
        err: {},
        customClasses: {},
        customAttributes: {},
      },
    },
    {
      name: __('Image'),
      keywords: 'image, picture, photo, logo, icon, avatar, profile picture, profile photo',
      icn: <ImgFldIcn w="23" />,
      pos: { h: 80, w: 60, i: 'shadow_block' },
      elm: {
        typ: 'image',
        valid: {},
        img: {},
        err: {},
        customClasses: {},
        customAttributes: {},
      },
    },
    {
      name: __('Divider'),
      keywords: 'divider, line, horizontal line, horizontal divider',
      icn: <DividerIcn w="23" />,
      pos: { h: 40, w: 60, i: 'shadow_block' },
      elm: {
        typ: 'divider',
        valid: {},
        divider: {},
        err: {},
        customClasses: {},
        customAttributes: {},
      },
    },
    {
      name: 'HTML',
      keywords: 'HTML, HTML Code, HTML Block, HTML Element, HTML Field, HTML Editor',
      icn: <CodeSnippetIcn size="23" />,
      pos: { h: 80, w: 60, i: 'shadow_block' },
      elm: {
        typ: 'html',
        content: '<b>Html Field</b><p><span style="font-size: 12pt">Add html content on editor</span></p>',
        valid: {},
        customClasses: {},
        customAttributes: {},
      },
    },
    /* {
      name: 'Blank Block',
      icn: blank,
      pos: { h: 80, w: 30, i: 'shadow_block' },
      elm: {
        typ: 'blank',
      },
    }, */
  ]

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

  const toolsArray = () => {
    if (!searchData.length && !sortedTools.length) return tools
    if (!sortedTools.length && searchData) return searchData
    if (!searchData.length && sortedTools) return sortedTools
    return []
  }

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
    <div className={css(Toolbars.toolbar_wrp)}>
      <div className={css(ut.flxc, { mb: 5 }, isScroll && Toolbars.searchBar)}>
        <div className={css(Toolbars.fields_search)} style={{ width: focusSearch ? '80%' : '68%', marginTop: '2px' }}>
          <input
            ref={searchInput}
            title="Search Field"
            aria-label="Search Field"
            autoComplete="off"
            data-testid="tlbr-srch-inp"
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
            <span
              title="clear"
              className={css(Toolbars.clear_icn)}
              role="button"
              tabIndex="-1"
              onClick={clearSearch}
              onKeyPress={clearSearch}
            >
              &nbsp;
            </span>
          )}

          <span title="search" className={css(Toolbars.search_icn)}>
            <SearchIcon size="20" />
          </span>

          {!searchData.length && (
            <div
              className={`${css(Toolbars.shortcut)} shortcut`}
              title={'Press "Ctrl+/" to focus search'}
            >
              Ctrl+/
            </div>
          )}
        </div>
        {!focusSearch
          && (
            <button
              title="Sort by ascending order"
              data-testid="tlbr-sort-btn"
              className={`${css(Toolbars.sort_btn)} ${isSorted && 'active'}`}
              type="button"
              onClick={sortingField}
              aria-label="Sort Fields"
            >
              <AtoZSortIcn size="20" />
            </button>
          )}
      </div>

      {useMemo(() => (
        <Scrollbars
          onScroll={onScrollHandler}
          autoHide
          style={{ maxWidth: 800 }}
        >
          <div className={css(Toolbars.tool_bar)}>
            {toolsArray().map(tool => (
              <Tools
                key={tool.name}
                setNewData={setNewData}
                value={{ fieldData: tool.elm, fieldSize: tool.pos }}
                title={tool.name}
              >
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
      ), [searchData, isSorted, sortedTools])}
    </div>
  )
}
export default memo(Toolbar)

const toolStyle = {
  wrp: {
    flx: 'align-center',
    ow: 'hidden',
    w: '90%',
    cg: 5,
  },
}
