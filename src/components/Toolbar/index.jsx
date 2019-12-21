/* eslint-disable no-undef */

import React from 'react'
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

export default function index(props) {
  const tools = [
    {
      name: 'Text Field',
      icn: textField,
      pos: { h: 2, w: 5, i: 'n_blk', maxH: 2, minH: 2 },
      elm: [
        {
          tag: 'div',
          attr: { className: 'text-wrp drag', 'btcd-fld': 'text-fld' },
          child: [
            { tag: 'label', attr: {}, child: 'Label' },
            { tag: 'input', attr: { className: 'txt-fld no-drg', type: 'text', placeholder: 'Placeholder text' }, child: null },
          ],
        },
      ],
    },
    {
      name: 'Multiline Text',
      icn: multilineText,
      pos: { h: 3, w: 5, i: 'block-5' },
      elm: [
        {
          tag: 'div',
          attr: { className: 'text-wrp drag', 'btcd-fld': 'textarea' },
          child: [
            { tag: 'label', attr: {}, child: 'Label' },
            { tag: 'textarea', attr: { className: 'txt-a', placeholder: 'Placeholder text' }, child: null },
          ],
        },
      ],
    },
    {
      name: 'Number Field',
      icn: numberField,
      pos: { h: 2, w: 5, i: 'n_blk', maxH: 2, minH: 2 },
      elm: [
        {
          tag: 'div',
          attr: { className: 'text-wrp drag', 'btcd-fld': 'text-fld' },
          child: [
            { tag: 'label', attr: {}, child: 'Number' },
            { tag: 'input', attr: { className: 'txt-fld no-drg', placeholder: 'Placeholder Number', type: 'number' }, child: null },
          ],
        },
      ],
    },
    {
      name: 'Password:',
      icn: pswd,
      pos: { h: 2, w: 5, i: 'n_blk', maxH: 2, minH: 2 },
      elm: [
        {
          tag: 'div',
          attr: { className: 'text-wrp drag', 'btcd-fld': 'text-fld' },
          child: [
            { tag: 'label', attr: {}, child: 'Password:' },
            { tag: 'input', attr: { className: 'txt-fld no-drg', placeholder: 'Password Here', type: 'password' }, child: null },
          ],
        },
      ],
    },
    {
      name: 'Email Field',
      icn: emailField,
      pos: { h: 2, w: 5, i: 'n_blk', maxH: 2, minH: 2 },
      elm: [
        {
          tag: 'div',
          attr: { className: 'text-wrp drag', 'btcd-fld': 'text-fld' },
          child: [
            { tag: 'label', attr: {}, child: 'Email:' },
            { tag: 'input', attr: { className: 'txt-fld no-drg', placeholder: 'example@email.com', type: 'email' }, child: null },
          ],
        },
      ],
    },
    {
      name: 'URL Field',
      icn: url,
      pos: { h: 2, w: 5, i: 'n_blk', maxH: 2, minH: 2 },
      elm: [
        {
          tag: 'div',
          attr: { className: 'text-wrp drag', 'btcd-fld': 'text-fld' },
          child: [
            { tag: 'label', attr: {}, child: 'URL:' },
            { tag: 'input', attr: { className: 'txt-fld no-drg', placeholder: 'www.example.com', type: 'url' }, child: null },
          ],
        },
      ],
    },
    {
      name: 'Date Field',
      icn: date,
      pos: { h: 2, w: 2, i: 'n_blk', maxH: 2, minH: 2 },
      elm: [
        {
          tag: 'div',
          attr: { className: 'text-wrp drag', 'btcd-fld': 'date' },
          child: [
            { tag: 'label', attr: {}, child: 'Date:' },
            { tag: 'input', attr: { className: 'no-drg', type: 'date' }, child: null },
          ],
        },
      ],
    },
    {
      name: 'Time Field',
      icn: time,
      pos: { h: 2, w: 2, i: 'n_blk', maxH: 2, minH: 2 },
      elm: [
        {
          tag: 'div',
          attr: { className: 'text-wrp drag', 'btcd-fld': 'date' },
          child: [
            { tag: 'label', attr: {}, child: 'Time:' },
            { tag: 'input', attr: { className: 'no-drg', type: 'time' }, child: null },
          ],
        },
      ],
    },
    {
      name: 'Date-Time Field',
      icn: dateTime,
      pos: { h: 2, w: 2, i: 'n_blk', maxH: 2, minH: 2 },
      elm: [
        {
          tag: 'div',
          attr: { className: 'text-wrp drag', 'btcd-fld': 'date' },
          child: [
            { tag: 'label', attr: {}, child: 'Date-Time:' },
            { tag: 'input', attr: { className: 'no-drg', type: 'datetime-local' }, child: null },
          ],
        },
      ],
    },
    {
      name: 'Month Field',
      icn: month,
      pos: { h: 2, w: 2, i: 'n_blk', maxH: 2, minH: 2 },
      elm: [
        {
          tag: 'div',
          attr: { className: 'text-wrp drag', 'btcd-fld': 'date' },
          child: [
            { tag: 'label', attr: {}, child: 'Month:' },
            { tag: 'input', attr: { className: 'no-drg', type: 'month' }, child: null },
          ],
        },
      ],
    },
    {
      name: 'Week Field',
      icn: week,
      pos: { h: 2, w: 2, i: 'n_blk', maxH: 2, minH: 2 },
      elm: [
        {
          tag: 'div',
          attr: { className: 'text-wrp drag', 'btcd-fld': 'date' },
          child: [
            { tag: 'label', attr: {}, child: 'Week:' },
            { tag: 'input', attr: { className: 'no-drg', type: 'week' }, child: null },
          ],
        },
      ],
    },
    {
      name: 'Color Picker',
      icn: clr,
      pos: { h: 2, w: 2, i: 'n_blk', maxH: 2, minH: 2 },
      elm: [
        {
          tag: 'div',
          attr: { className: 'text-wrp drag', 'btcd-fld': 'date' },
          child: [
            { tag: 'label', attr: {}, child: 'Pick a Color:' },
            { tag: 'input', attr: { className: 'no-drg', type: 'color' }, child: null },
          ],
        },
      ],
    },
  ]
  return (
    <div className="toolBar-wrp">
      <h4>ToolBar</h4>
      <div className="toolBar">
        {tools.map(tool => (
          <Tools key={tool.name} setDrgElm={props.setDrgElm} value={[tool.elm, tool.pos]}>
            <img draggable="false" src={process.env.NODE_ENV === 'production' ? `${bits.assetsURL}/img/${tool.icn}.png` : `${tool.icn}`} alt={`${tool.name}-field`} className="tool-img" />
            {tool.name}
          </Tools>
        ))}
      </div>
    </div>
  )
}
