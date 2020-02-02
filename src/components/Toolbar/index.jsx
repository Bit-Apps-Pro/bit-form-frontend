/* eslint-disable object-property-newline */
/* eslint-disable no-undef */

import React from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import Tools from './Tools'
import textField from '../../resource/img/textField.png'
import multilineText from '../../resource/img/multilineText.png'
import numberField from '../../resource/img/numberField.png'
import emailField from '../../resource/img/emailField.png'
import date from '../../resource/img/date.png'
import time from '../../resource/img/time.png'
import dateTime from '../../resource/img/dateTime.png'
import month from '../../resource/img/month.png'
import week from '../../resource/img/week.png'
import pswd from '../../resource/img/pswd.png'
import clr from '../../resource/img/clr.png'
import url from '../../resource/img/url.png'
import blank from '../../resource/img/blank.png'
import check from '../../resource/img/check.png'
import radio from '../../resource/img/radio.png'
import dropdown from '../../resource/img/dropdown.png'

export default function index(props) {
  const tools = [
    {
      name: 'Text Field',
      icn: textField,
      pos: { h: 2, w: 10, i: 'n_blk', maxH: 2, minH: 2 },
      elm: {
        typ: 'text',
        lbl: 'Text Field',
        ph: 'Placeholder Text...',
        valid: {},
      },
    },
    {
      name: 'Multiline Text',
      icn: multilineText,
      pos: { h: 3, w: 10, i: 'block-5' },
      elm: {
        typ: 'textarea',
        lbl: 'Multi-Line Text Field',
        ph: 'Placeholder Text...',
        valid: {},
      },
    },
    {
      name: 'Blank Block',
      icn: blank,
      pos: { h: 2, w: 3, i: 'block-5' },
      elm: {
        typ: 'blank',
      },
    },
    {
      name: 'Check Box',
      icn: check,
      pos: { h: 2, w: 10, i: 'n_blk', minH: 2 },
      elm: {
        typ: 'check',
        lbl: 'Check Boxs',
        opt: [
          { lbl: 'option 1' },
          { lbl: 'option 2' },
          { lbl: 'option 3' },
        ],
        valid: {},
      },
    },
    {
      name: 'Radio Button',
      icn: radio,
      pos: { h: 2, w: 10, i: 'n_blk', minH: 2 },
      elm: {
        typ: 'radio',
        lbl: 'Radio Boxs',
        round: true,
        opt: [
          { lbl: 'option 1' },
          { lbl: 'option 2' },
          { lbl: 'option 3' },
        ],
        valid: {},
      },
    },
    {
      name: 'Number Field',
      icn: numberField,
      pos: { h: 2, w: 10, i: 'n_blk', maxH: 2, minH: 2 },
      elm: {
        typ: 'number',
        lbl: 'Number Field',
        ph: 'Placeholder...',
        valid: {},
      },
    },
    {
      name: 'Drop Down',
      icn: dropdown,
      pos: { h: 2, w: 10, i: 'n_blk', minH: 2 },
      elm: {
        typ: 'select',
        lbl: 'Drop-Down Menu',
        opt: [
          { lbl: 'option 1' },
          { lbl: 'option 2' },
          { lbl: 'option 3' },
        ],
        valid: {},
      },
    },
    {
      name: 'Password:',
      icn: pswd,
      pos: { h: 2, w: 10, i: 'n_blk', maxH: 2, minH: 2 },
      elm: {
        typ: 'password',
        lbl: 'Password Field',
        ph: 'Placeholder...',
        valid: {},
      },
    },
    {
      name: 'Email Field',
      icn: emailField,
      pos: { h: 2, w: 10, i: 'n_blk', maxH: 2, minH: 2 },
      elm: {
        typ: 'email',
        lbl: 'Email Field',
        ph: 'example@mail.com',
        valid: {},
      },
    },
    {
      name: 'URL Field',
      icn: url,
      pos: { h: 2, w: 10, i: 'n_blk', maxH: 2, minH: 2 },
      elm: {
        typ: 'url',
        lbl: 'URL Field',
        ph: 'www.example.com',
        valid: {},
      },
    },
    {
      name: 'File Upload',
      icn: url,
      pos: { h: 2, w: 10, i: 'n_blk', minH: 2, minW: 3 },
      elm: {
        typ: 'file-up',
        lbl: 'File Upload',
        upBtnTxt: 'Attach File',
        valid: {},
      },
    },
    {
      name: 'Date Field',
      icn: date,
      pos: { h: 2, w: 10, i: 'n_blk', maxH: 2, minH: 2 },
      elm: {
        typ: 'date',
        lbl: 'Date Input:',
        valid: {},
      },
    },
    {
      name: 'Time Field',
      icn: time,
      pos: { h: 2, w: 10, i: 'n_blk', maxH: 2, minH: 2 },
      elm: {
        typ: 'time',
        lbl: 'Time Input:',
        valid: {},
      },
    },
    {
      name: 'Date-Time Field',
      icn: dateTime,
      pos: { h: 2, w: 10, i: 'n_blk', maxH: 2, minH: 2 },
      elm: {
        typ: 'datetime-local',
        lbl: 'Date-Time Input:',
        valid: {},
      },
    },
    {
      name: 'Month Field',
      icn: month,
      pos: { h: 2, w: 10, i: 'n_blk', maxH: 2, minH: 2 },
      elm: {
        typ: 'month',
        lbl: 'Month Input:',
        valid: {},
      },
    },
    {
      name: 'Week Field',
      icn: week,
      pos: { h: 2, w: 10, i: 'n_blk', maxH: 2, minH: 2 },
      elm: {
        typ: 'week',
        lbl: 'Week Input:',
        valid: {},
      },
    },
    {
      name: 'Color Picker',
      icn: clr,
      pos: { h: 2, w: 10, i: 'n_blk', maxH: 2, minH: 2 },
      elm: {
        typ: 'color',
        lbl: 'Color Picker:',
        valid: {},
      },
    },
  ]
  return (
    <div className="toolBar-wrp">
      <div className="btcd-toolbar-title">
        {!props.tolbarSiz && 'Tool Bar'}
        <button className="icn-btn btcd-neo-sh-1" onClick={() => { props.setTolbarSiz(!props.tolbarSiz); props.setGridWidth(props.tolbarSiz ? 870 : 975) }} type="button"><span>{props.tolbarSiz ? String.fromCharCode(8250) : String.fromCharCode(8249)}</span></button>
      </div>
      <Scrollbars autoHide style={{ maxWidth: 400 }}>
        <div className="toolBar">
          {tools.map(tool => (
            <Tools key={tool.name} setDrgElm={props.setDrgElm} setNewData={props.setNewData} value={[tool.elm, tool.pos]}>
              <img draggable="false" src={process.env.NODE_ENV === 'production' ? `${bits.assetsURL}/img/${tool.icn}` : `${tool.icn}`} alt={`${tool.name}-field`} className="tool-img" />
              {tool.name}
            </Tools>
          ))}
        </div>
      </Scrollbars>
    </div>
  )
}
