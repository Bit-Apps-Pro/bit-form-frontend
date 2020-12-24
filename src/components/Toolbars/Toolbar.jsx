/* eslint-disable no-useless-escape */
/* eslint-disable object-property-newline */
/* eslint-disable no-undef */

// eslint-disable-next-line import/no-extraneous-dependencies
import { __ } from '@wordpress/i18n';
import { useMemo } from 'react';
import { Scrollbars } from 'react-custom-scrollbars'
import Tools from './Tools'

function Toolbar({ tolbarSiz, setDrgElm, setNewData, setTolbar, setisToolDragging }) {
  console.log('%c $render Toolbar indec', 'background:pink;padding:3px;border-radius:5px;')

  const tools = [
    {
      name: __('Text', 'bitform'),
      icn: 'text',
      pos: { h: 2, w: 6, i: 'n_blk', maxH: 2, minH: 2 },
      elm: {
        typ: 'text',
        lbl: __('Text Field', 'bitform'),
        ph: __('Placeholder Text...', 'bitform'),
        valid: {},
      },
    },
    {
      name: __('Multiline Text', 'bitform'),
      icn: 'textarea',
      pos: { h: 3, w: 6, i: 'block-5', minH: 3 },
      elm: {
        typ: 'textarea',
        lbl: __('Multi-Line Text', 'bitform'),
        ph: __('Placeholder Text...', 'bitform'),
        valid: {},
      },
    },
    /* {
      name: 'Blank Block',
      icn: blank,
      pos: { h: 2, w: 3, i: 'block-5' },
      elm: {
        typ: 'blank',
      },
    }, */
    {
      name: __('Check Box', 'bitform'),
      icn: 'check',
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
      },
    },
    {
      name: __('Radio', 'bitform'),
      icn: 'radio',
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
      },
    },
    {
      name: __('Number', 'bitform'),
      icn: 'number',
      pos: { h: 2, w: 6, i: 'n_blk', maxH: 2, minH: 2 },
      elm: {
        typ: 'number',
        lbl: __('Number Field', 'bitform'),
        ph: __('Placeholder...', 'bitform'),
        valid: {},
      },
    },
    {
      name: __('Drop Down', 'bitform'),
      icn: 'select',
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
      },
    },
    {
      name: __('Password', 'bitform'),
      icn: 'password',
      pos: { h: 2, w: 6, i: 'n_blk', maxH: 2, minH: 2 },
      elm: {
        typ: 'password',
        lbl: __('Password Field', 'bitform'),
        ph: __('Placeholder...', 'bitform'),
        valid: {},
      },
    },
    {
      name: __('Email', 'bitform'),
      icn: 'email',
      pos: { h: 2, w: 6, i: 'n_blk', maxH: 2, minH: 2 },
      elm: {
        typ: 'email',
        lbl: __('Email Field', 'bitform'),
        ph: __('example@mail.com', 'bitform'),
        valid: {},
      },
    },
    {
      name: __('URL', 'bitform'),
      icn: 'url',
      pos: { h: 2, w: 6, i: 'n_blk', maxH: 2, minH: 2 },
      elm: {
        typ: 'text',
        attr: {
          title: 'https://www.example.com  or  www.example.com',
          pattern: '(https:\/\/www.*.*)|(http:\/\/www.*.*)|(http:\/\/*.*)|(https:\/\/*.*|www.*.*)',
        },
        lbl: __('URL Field', 'bitform'),
        ph: __('https://www.example.com', 'bitform'),
        valid: {},
      },
    },
    {
      name: __('File Upload', 'bitform'),
      icn: 'file-up',
      pos: { h: 2, w: 6, i: 'n_blk', minH: 2, minW: 2 },
      elm: {
        typ: 'file-up',
        lbl: __('File Upload', 'bitform'),
        upBtnTxt: 'Attach File',
        valid: {},
      },
    },
    {
      name: __('Date', 'bitform'),
      icn: 'date',
      pos: { h: 2, w: 6, i: 'n_blk', maxH: 2, minH: 2 },
      elm: {
        typ: 'date',
        lbl: __('Date Input', 'bitform'),
        valid: {},
      },
    },
    {
      name: __('Time', 'bitform'),
      icn: 'time',
      pos: { h: 2, w: 6, i: 'n_blk', maxH: 2, minH: 2 },
      elm: {
        typ: 'time',
        lbl: __('Time Input', 'bitform'),
        valid: {},
      },
    },
    {
      name: __('Date-Time', 'bitform'),
      icn: 'datetime-local',
      pos: { h: 2, w: 6, i: 'n_blk', maxH: 2, minH: 2 },
      elm: {
        typ: 'datetime-local',
        lbl: __('Date-Time Input', 'bitform'),
        valid: {},
      },
    },
    {
      name: __('Month', 'bitform'),
      icn: 'month',
      pos: { h: 2, w: 6, i: 'n_blk', maxH: 2, minH: 2 },
      elm: {
        typ: 'month',
        lbl: __('Month Input', 'bitform'),
        valid: {},
      },
    },
    {
      name: __('Week', 'bitform'),
      icn: 'week',
      pos: { h: 2, w: 6, i: 'n_blk', maxH: 2, minH: 2 },
      elm: {
        typ: 'week',
        lbl: __('Week Input', 'bitform'),
        valid: {},
      },
    },
    {
      name: __('Color Picker', 'bitform'),
      icn: 'color',
      pos: { h: 2, w: 6, i: 'n_blk', maxH: 2, minH: 2 },
      elm: {
        typ: 'color',
        lbl: __('Color Picker', 'bitform'),
        valid: {},
      },
    },
    {
      name: __('reCaptcha v2', 'bitform'),
      icn: 'recaptcha',
      pos: { h: 2, w: 6, i: 'n_blk', maxH: 2, minH: 2, minW: 2 },
      elm: {
        typ: 'recaptcha',
        theme: 'light',
        lbl: '',
        valid: {},
      },
    },
    {
      name: __('Paypal', 'bitform'),
      icn: 'recaptcha',
      pos: { h: 5, w: 6, i: 'n_blk', minH: 3, maxH: 7, minW: 2 },
      elm: {
        typ: 'paypal',
        currency: 'USD',
        lbl: '',
        style: {
          layout: 'vertical',
          color: 'gold',
          shape: 'rect',
          label: 'paypal',
        },
        valid: {},
      },
    },
  ]

  return (
    <div className="toolBar-wrp" style={{ width: tolbarSiz && 58 }}>
      <div className="btcd-toolbar-title">
        {!tolbarSiz && 'Tool Bar'}
        <button className="icn-btn" onClick={setTolbar} type="button" aria-label="Toggle Toolbar"><span className={`btcd-icn icn-${tolbarSiz ? 'chevron-right' : 'chevron-left'}`} /></button>
      </div>
      {useMemo(() => (
        <Scrollbars autoHide style={{ maxWidth: 400 }}>
          <div className="toolBar">
            {tools.map(tool => (
              <Tools key={tool.name} setisToolDragging={setisToolDragging} setDrgElm={setDrgElm} setNewData={setNewData} value={[tool.elm, tool.pos]}>
                <span className={`btcd-icn  icn-${tool.icn}`} />
                {!tolbarSiz && tool.name}
              </Tools>
            ))}
          </div>
        </Scrollbars>
        // eslint-disable-next-line react-hooks/exhaustive-deps
      ), [tolbarSiz])}
    </div>
  )
}
export default (Toolbar)
