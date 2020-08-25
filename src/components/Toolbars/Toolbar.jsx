/* eslint-disable object-property-newline */
/* eslint-disable no-undef */

import React, { useMemo } from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import Tools from './Tools'

function Toolbar({ tolbarSiz, setDrgElm, setNewData, setTolbar, setisToolDragging }) {
  console.log('%c $render Toolbar indec', 'background:pink;padding:3px;border-radius:5px;')

  const tools = [
    {
      name: 'Text',
      icn: 'text',
      pos: { h: 2, w: 6, i: 'n_blk', maxH: 2, minH: 2 },
      elm: {
        typ: 'text',
        lbl: 'Text Field',
        ph: 'Placeholder Text...',
        valid: {},
      },
    },
    {
      name: 'Multiline Text',
      icn: 'textarea',
      pos: { h: 3, w: 6, i: 'block-5', minH: 3 },
      elm: {
        typ: 'textarea',
        lbl: 'Multi-Line Text',
        ph: 'Placeholder Text...',
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
      name: 'Check Box',
      icn: 'check',
      pos: { h: 2, w: 6, i: 'n_blk', minH: 2 },
      elm: {
        typ: 'check',
        lbl: 'Check Boxs',
        opt: [
          { lbl: 'Option 1' },
          { lbl: 'Option 2' },
          { lbl: 'Option 3' },
        ],
        valid: {},
      },
    },
    {
      name: 'Radio',
      icn: 'radio',
      pos: { h: 2, w: 6, i: 'n_blk', minH: 2 },
      elm: {
        typ: 'radio',
        lbl: 'Radio',
        round: true,
        opt: [
          { lbl: 'Option 1' },
          { lbl: 'Option 2' },
          { lbl: 'Option 3' },
        ],
        valid: {},
      },
    },
    {
      name: 'Number',
      icn: 'number',
      pos: { h: 2, w: 6, i: 'n_blk', maxH: 2, minH: 2 },
      elm: {
        typ: 'number',
        lbl: 'Number Field',
        ph: 'Placeholder...',
        valid: {},
      },
    },
    {
      name: 'Drop Down',
      icn: 'select',
      pos: { h: 2, w: 6, i: 'n_blk', minH: 2 },
      elm: {
        typ: 'select',
        lbl: 'Drop-Down',
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
      name: 'Password',
      icn: 'password',
      pos: { h: 2, w: 6, i: 'n_blk', maxH: 2, minH: 2 },
      elm: {
        typ: 'password',
        lbl: 'Password Field',
        ph: 'Placeholder...',
        valid: {},
      },
    },
    {
      name: 'Email',
      icn: 'email',
      pos: { h: 2, w: 6, i: 'n_blk', maxH: 2, minH: 2 },
      elm: {
        typ: 'email',
        lbl: 'Email Field',
        ph: 'example@mail.com',
        valid: {},
      },
    },
    {
      name: 'URL',
      icn: 'url',
      pos: { h: 2, w: 6, i: 'n_blk', maxH: 2, minH: 2 },
      elm: {
        typ: 'text',
        attr: {
          title: 'https://www.example.com  or  www.example.com',
          pattern: '(https:\/\/www.*.*)|(http:\/\/www.*.*)|(http:\/\/*.*)|(https:\/\/*.*|www.*.*)',
        },
        lbl: 'URL Field',
        ph: 'https://www.example.com',
        valid: {},
      },
    },
    {
      name: 'File Upload',
      icn: 'file-up',
      pos: { h: 2, w: 6, i: 'n_blk', minH: 2, minW: 2 },
      elm: {
        typ: 'file-up',
        lbl: 'File Upload',
        upBtnTxt: 'Attach File',
        valid: {},
      },
    },
    {
      name: 'Date',
      icn: 'date',
      pos: { h: 2, w: 6, i: 'n_blk', maxH: 2, minH: 2 },
      elm: {
        typ: 'date',
        lbl: 'Date Input:',
        valid: {},
      },
    },
    {
      name: 'Time',
      icn: 'time',
      pos: { h: 2, w: 6, i: 'n_blk', maxH: 2, minH: 2 },
      elm: {
        typ: 'time',
        lbl: 'Time Input:',
        valid: {},
      },
    },
    {
      name: 'Date-Time',
      icn: 'datetime-local',
      pos: { h: 2, w: 6, i: 'n_blk', maxH: 2, minH: 2 },
      elm: {
        typ: 'datetime-local',
        lbl: 'Date-Time Input:',
        valid: {},
      },
    },
    {
      name: 'Month',
      icn: 'month',
      pos: { h: 2, w: 6, i: 'n_blk', maxH: 2, minH: 2 },
      elm: {
        typ: 'month',
        lbl: 'Month Input:',
        valid: {},
      },
    },
    {
      name: 'Week',
      icn: 'week',
      pos: { h: 2, w: 6, i: 'n_blk', maxH: 2, minH: 2 },
      elm: {
        typ: 'week',
        lbl: 'Week Input:',
        valid: {},
      },
    },
    {
      name: 'Color Picker',
      icn: 'color',
      pos: { h: 2, w: 6, i: 'n_blk', maxH: 2, minH: 2 },
      elm: {
        typ: 'color',
        lbl: 'Color Picker',
        valid: {},
      },
    },
    {
      name: 'reCaptcha v2',
      icn: 'recaptcha',
      pos: { h: 2, w: 6, i: 'n_blk', maxH: 2, minH: 2, minW: 2 },
      elm: {
        typ: 'recaptcha',
        theme: 'light',
        lbl: '',
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
      ), [tolbarSiz])}
    </div>
  )
}
export default (Toolbar)
