/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-useless-escape */
/* eslint-disable object-property-newline */
/* eslint-disable no-undef */

import { memo, useState } from 'react'
import Scrollbars from 'react-custom-scrollbars-2'
import { useFela } from 'react-fela'
import BtnIcn from '../../Icons/BtnIcn'
import CheckBoxIcn from '../../Icons/CheckBoxIcn'
import CodeSnippetIcn from '../../Icons/CodeSnippetIcn'
import ColorPickerIcn from '../../Icons/ColorPickerIcn'
import DateIcn from '../../Icons/DateIcn'
import DateTimeIcn from '../../Icons/DateTimeIcn'
import DecisionBoxIcn from '../../Icons/DecisionBoxIcn'
import DropDownIcn from '../../Icons/DropDownIcn'
import FileUploadIcn from '../../Icons/FileUploadIcn'
import FlagIcn from '../../Icons/FlagIcn'
import MailIcn from '../../Icons/MailIcn'
import MonthIcn from '../../Icons/MonthIcn'
import NumberIcn from '../../Icons/NumberIcn'
import PasswordIcn from '../../Icons/PasswordIcn'
import PaypalIcn from '../../Icons/PaypalIcn'
import RadioIcn from '../../Icons/RadioIcn'
import RazorPayIcn from '../../Icons/RazorPayIcn'
import ReCaptchaIcn from '../../Icons/ReCaptchaIcn'
import SearchIcon from '../../Icons/SearchIcon'
import TextareaIcn from '../../Icons/TextareaIcn'
import TextIcn from '../../Icons/TextIcn'
import TimeIcn from '../../Icons/TimeIcn'
import UrlIcn from '../../Icons/UrlIcn'
import UserIcn from '../../Icons/UserIcn'
import WeekIcn from '../../Icons/WeekIcn'
import Toolbars from '../../styles/Toolbars.style'
import { __ } from '../../Utils/i18nwrap'
import countries from '../../Utils/StaticData/countries.json'
import StyleAccordion from '../CompSettings/StyleCustomize/ChildComp/StyleAccordion'
import Tools from './Tools'

function Toolbar({ tolbarSiz, setNewData, setTolbar }) {
  const { css } = useFela()
  const [searchData, setSearchData] = useState([])

  const tools = [
    {
      groupTitle: 'Basic Fields',
      fields: [
        {
          name: __('Text', 'bitform'),
          keywords: 'Text, text',
          icn: <TextIcn size="23" />,
          pos: { h: 2, w: 6, i: 'n_blk', maxH: 2, minH: 2 },
          elm: {
            typ: 'text',
            lbl: __('Text Field', 'bitform'),
            ph: __('Placeholder Text...', 'bitform'),
            valid: {},
            err: { entryUnique: { dflt: 'That Field is taken. Try another.', show: true } },
          },
        },
        {
          name: __('User Name', 'bitform'),
          keywords: 'User Name, Username, User name, username, user name, text',
          icn: <UserIcn size="22" />,
          pos: { h: 2, w: 6, i: 'n_blk', maxH: 2, minH: 2 },
          elm: {
            typ: 'username',
            lbl: __('User Name', 'bitform'),
            ph: __('Placeholder Text...', 'bitform'),
            valid: {},
            err: { entryUnique: { dflt: 'That User Name is taken. Try another.', show: true } },
          },
        },
        {
          name: __('Multiline Text', 'bitform'),
          keywords: 'Multline Text, multiline text',
          icn: <TextareaIcn size="23" />,
          pos: { h: 3, w: 6, i: 'block-5', minH: 3 },
          elm: {
            typ: 'textarea',
            lbl: __('Multi-Line Text', 'bitform'),
            ph: __('Placeholder Text...', 'bitform'),
            valid: {},
            err: { entryUnique: { dflt: 'That field is taken. Try another.', show: true } },
          },
        },
        {
          name: __('Check Box', 'bitform'),
          keywords: 'Check Box, check box',
          icn: <CheckBoxIcn w="23" />,
          pos: { h: 2, w: 6, i: 'n_blk', minH: 2 },
          elm: {
            typ: 'check',
            lbl: __('Check Boxs', 'bitform'),
            opt: [
              { lbl: __('Option 1', 'bitform') },
              { lbl: __('Option 2', 'bitform') },
              { lbl: __('Option 3', 'bitform') },
            ],
            valid: {},
            err: { entryUnique: { dflt: 'That field is taken. Try another.', show: true } },
          },
        },
        {
          name: __('Radio Button', 'bitform'),
          keywords: 'Radio button, radio button, button',
          icn: <RadioIcn size="23" />,
          pos: { h: 2, w: 6, i: 'n_blk', minH: 2 },
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
            err: { entryUnique: { dflt: 'That field is taken. Try another.', show: true } },
          },
        },
        {
          name: __('Number', 'bitform'),
          keywords: 'Number, number',
          icn: <NumberIcn w="23" />,
          pos: { h: 2, w: 6, i: 'n_blk', maxH: 2, minH: 2 },
          elm: {
            typ: 'number',
            lbl: __('Number Field', 'bitform'),
            ph: __('Number Input', 'bitform'),
            valid: {},
            err: { invalid: { dflt: 'Number is invalid', show: true }, entryUnique: { dflt: 'That Number field is taken. Try another.', show: true } },
          },
        },
        {
          name: __('Password', 'bitform'),
          keywords: 'Password, password',
          icn: <PasswordIcn size="23" />,
          pos: { h: 2, w: 6, i: 'n_blk', maxH: 2, minH: 2 },
          elm: {
            typ: 'password',
            lbl: __('Password Field', 'bitform'),
            ph: __('Placeholder...', 'bitform'),
            valid: {},
            err: {},
          },
        },
        {
          name: __('Email', 'bitform'),
          keywords: 'Email, email',
          icn: <MailIcn size="23" />,
          pos: { h: 2, w: 6, i: 'n_blk', maxH: 2, minH: 2 },
          elm: {
            typ: 'email',
            lbl: __('Email Field', 'bitform'),
            ph: __('example@mail.com', 'bitform'),
            pattern: '^$_bf_$w+([.-]?$_bf_$w+)*@$_bf_$w+([.-]?$_bf_$w+)*($_bf_$.$_bf_$w{1,24})+$',
            valid: {},
            err: { invalid: { dflt: 'Email is invalid', show: true }, entryUnique: { dflt: 'That email is taken. Try another.', show: true } },
          },
        },

      ],
    },
    {
      groupTitle: 'Custom Fields',
      fields: [
        {
          name: __('Dropdown', 'bitform'),
          keywords: 'Dropdown, dropdown, Menu, menu',
          icn: <DropDownIcn w="23" />,
          pos: { h: 2, w: 6, i: 'n_blk', minH: 2 },
          elm: {
            typ: 'select',
            lbl: __('Drop-Down', 'bitform'),
            mul: false,
            opt: [
              { label: 'Option 1', value: 'Option 1' },
              { label: 'Option 2', value: 'Option 2' },
              { label: 'Option 3', value: 'Option 3' },
            ],
            valid: {},
            err: { entryUnique: { dflt: 'That field is taken. Try another.', show: true } },
          },
        },
        {
          name: __('Date', 'bitform'),
          keywords: 'Date, date',
          icn: <DateIcn w="23" />,
          pos: { h: 2, w: 6, i: 'n_blk', maxH: 2, minH: 2 },
          elm: {
            typ: 'date',
            lbl: __('Date Input', 'bitform'),
            valid: {},
            err: {},
          },
        },
        {
          name: __('Time', 'bitform'),
          keywords: 'Time, time',
          icn: <TimeIcn size="23" />,
          pos: { h: 2, w: 6, i: 'n_blk', maxH: 2, minH: 2 },
          elm: {
            typ: 'time',
            lbl: __('Time Input', 'bitform'),
            valid: {},
            err: {},
          },
        },
        {
          name: __('Date-Time', 'bitform'),
          keywords: 'Date-Time, Date-time, Date, Time',
          icn: <DateTimeIcn w="23" />,
          pos: { h: 2, w: 6, i: 'n_blk', maxH: 2, minH: 2 },
          elm: {
            typ: 'datetime-local',
            lbl: __('Date-Time Input', 'bitform'),
            valid: {},
            err: {},
          },
        },
        {
          name: __('Month', 'bitform'),
          keywords: 'Month, month, Date',
          icn: <MonthIcn w="23" />,
          pos: { h: 2, w: 6, i: 'n_blk', maxH: 2, minH: 2 },
          elm: {
            typ: 'month',
            lbl: __('Month Input', 'bitform'),
            valid: {},
            err: {},
          },
        },
        {
          name: __('Week', 'bitform'),
          keywords: 'Week, week, Date',
          icn: <WeekIcn size="23" />,
          pos: { h: 2, w: 6, i: 'n_blk', maxH: 2, minH: 2 },
          elm: {
            typ: 'week',
            lbl: __('Week Input', 'bitform'),
            valid: {},
            err: {},
          },
        },

      ],
    },
    {
      groupTitle: 'Advance Fields',
      fields: [
        {
          name: __('Country', 'bitform'),
          keywords: 'Country, country',
          icn: <FlagIcn size="23" />,
          pos: { h: 2, w: 6, i: 'n_blk', minH: 2 },
          elm: {
            typ: 'select',
            lbl: __('Select Country', 'bitform'),
            mul: false,
            opt: countries,
            valid: {},
          },
        },
        {
          name: __('File Upload', 'bitform'),
          keywords: 'File Upload, file upload',
          icn: <FileUploadIcn w="23" />,
          pos: { h: 2, w: 6, i: 'n_blk', minH: 2, minW: 2 },
          elm: {
            typ: 'file-up',
            lbl: __('File Upload', 'bitform'),
            upBtnTxt: 'Attach File',
            valid: {},
            err: {},
          },
        },
        {
          name: __('URL', 'bitform'),
          keywords: 'URL, url',
          icn: <UrlIcn w="23" />,
          pos: { h: 2, w: 6, i: 'n_blk', maxH: 2, minH: 2 },
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
            err: { invalid: { dflt: 'URL is invalid', show: true }, entryUnique: { dflt: 'That URL is taken. Try another.', show: true } },
          },
        },
        {
          name: __('Color Picker', 'bitform'),
          keywords: 'Color Picker, color picker',
          icn: <ColorPickerIcn w="23" />,
          pos: { h: 2, w: 6, i: 'n_blk', maxH: 2, minH: 2 },
          elm: {
            typ: 'color',
            lbl: __('Color Picker', 'bitform'),
            valid: {},
            err: {},
          },
        },
        {
          name: __('reCaptcha v2', 'bitform'),
          keywords: 'ReCaptcha, reCaptcha, recaptcha, recaptcha v2',
          icn: <ReCaptchaIcn size="23" />,
          pos: { h: 2, w: 6, i: 'n_blk', maxH: 2, minH: 2, minW: 2 },
          elm: {
            typ: 'recaptcha',
            theme: 'light',
            lbl: __('ReCaptcha', 'bitform'),
            valid: {},
          },
        },
        {
          name: __('Decision Box', 'bitform'),
          keywords: 'Decision box, GDPR, gdpr',
          icn: <DecisionBoxIcn size="23" />,
          pos: { h: 2, w: 6, i: 'n_blk', minH: 1 },
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
          name: 'HTML',
          keywords: 'HTML, Html, html',
          icn: <CodeSnippetIcn size="23" />,
          pos: { h: 2, w: 6, i: 'n_blk' },
          elm: {
            typ: 'html',
            lbl: 'HTML Content',
            content: '<b>Html Field</b><p><span style="font-size: 12pt">Add html content on editor</span></p>',
            valid: {},
          },
        },
        {
          name: 'Button',
          keywords: 'Button, button',
          icn: <BtnIcn size="23" />,
          pos: { h: 2, w: 6, i: 'n_blk', minH: 2, maxH: 2 },
          elm: {
            typ: 'button',
            btnTyp: 'button',
            btnSiz: 'md',
            txt: __('Button'),
            icn: {
              pos: '',
              url: '',
            },
            valid: {},
          },
        },

      ],
    },
    {
      groupTitle: 'Payment Fields',
      fields: [
        {
          name: __('Paypal', 'bitform'),
          keywords: 'Paypal, Payment, payment, paypal',
          icn: <PaypalIcn w="23" />,
          pos: { h: 5, w: 6, i: 'n_blk', minH: 3, maxH: 7, minW: 2 },
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
          keywords: 'Razorpay, razorpay, Payment, payment',
          icn: <RazorPayIcn w="17" h="23" />,
          pos: { h: 2, w: 6, i: 'n_blk', minH: 2, maxH: 7, minW: 2 },
          elm: {
            typ: 'razorpay',
            lbl: __('Razorpay', 'bitform'),
            btnSiz: 'md',
            fulW: false,
            align: 'left',
            btnTxt: 'Pay with Razorpay',
            options: {
              currency: 'INR',
              theme: {},
              modal: {},
              prefill: {},
              notes: {},
            },
            valid: {},
          },
        },
      ],
    },
    /* {
      name: 'Blank Block',
      icn: blank,
      pos: { h: 2, w: 3, i: 'block-5' },
      elm: {
        typ: 'blank',
      },
    }, */
  ]

  const searchHandler = (e) => {
    const searchTool = e.target.value.trim()
    const searchItem = []

    if (searchTool !== '') {
      tools.map(item => {
        const itm = item.fields.filter(field => (field.keywords.includes(searchTool)))
        searchItem.push(...itm)
      })
    } else {
      // eslint-disable-next-line no-const-assign
      setSearchData([])
    }
    console.log(searchItem.length)
    if (searchItem.length > 0) {
      setSearchData(searchItem)
    }
  }
  console.log(searchData.length)
  return (
    <div className={css(Toolbars.toolbar_wrp)} style={{ width: tolbarSiz && 200 }}>
      {/* <div className="btcd-toolbar-title">
        {!tolbarSiz && 'Tool Bar'}
        <button className="icn-btn toolbar-btn" onClick={setTolbar} type="button" aria-label="Toggle Toolbar"><span className={`btcd-icn icn-${tolbarSiz ? 'chevron-right' : 'chevron-left'}`} /></button>
      </div> */}
      <div className={css(Toolbars.fields_search)}>
        <label htmlFor="search-icon">
          <span className={css(Toolbars.search_icn)}>
            <SearchIcon size="20" />
          </span>
        </label>
        <input id="search-icon" type="text" name="searchIcn" onChange={searchHandler} className={css(Toolbars.search_field)} />
      </div>
      <Scrollbars autoHide style={{ maxWidth: 400 }}>
        {searchData && (
          <div className={css(Toolbars.tool_bar)}>
            {searchData.map((fl, i) => (
              <div tabIndex="0" key={`tool-index-${i + 9}`} type="button" role="button" className={css(Toolbars.tool)} draggable="true" unselectable="on">
                <span className={css(Toolbars.tool_icn)}>
                  {fl.icn}
                </span>
                {fl.name}
              </div>
            ))}
          </div>
        )}
        {searchData.length === 0 && tools.map(grp => (
          <StyleAccordion className={css(Toolbars.sec_acc)} title={grp.groupTitle} open>
            <div className={css(Toolbars.tool_bar)}>
              {grp.fields.map((fld, i) => (
                <Tools key={fld.name} setNewData={setNewData} value={{ fieldData: fld.elm, fieldSize: fld.pos }}>
                  <span className="mr-1 tool-icn">{fld.icn}</span>
                  {!tolbarSiz && fld.name}
                </Tools>
              ))}
            </div>
          </StyleAccordion>
        ))}
      </Scrollbars>

      {/* {useMemo(() => (
        <Scrollbars autoHide style={{ maxWidth: 400 }}>
          <div className="toolBar">
            {tools.map(tool => (
              <Tools key={tool.name} setNewData={setNewData} value={{ fieldData: tool.elm, fieldSize: tool.pos }}>
                <span className="mr-1 tool-icn">{tool.icn}</span>
                {!tolbarSiz && tool.name}
              </Tools>
            ))}
          </div>
        </Scrollbars>
        // eslint-disable-next-line react-hooks/exhaustive-deps
      ), [tolbarSiz])} */}
    </div>
  )
}
export default memo(Toolbar)
