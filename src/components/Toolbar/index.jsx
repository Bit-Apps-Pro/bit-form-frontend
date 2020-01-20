/* eslint-disable object-property-newline */
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
import blank from '../../resource/img/blank.png'
import check from '../../resource/img/check.png'
import radio from '../../resource/img/radio.png'
import dropdown from '../../resource/img/dropdown.png'
import { setPrevData, handleFile } from '../../resource/js/file-upload'
import { Scrollbars } from 'react-custom-scrollbars';

export default function index(props) {
  const tools = [
    {
      name: 'Text Field',
      icn: textField,
      pos: { h: 2, w: 10, i: 'n_blk', maxH: 2, minH: 2 },
      elm: [
        {
          tag: 'div',
          attr: { className: 'text-wrp drag', 'btcd-fld': 'text-fld' },
          child: [
            { tag: 'label', attr: {}, child: 'Text Here:' },
            { tag: 'input', attr: { className: 'txt-fld no-drg', type: 'text', placeholder: 'Placeholder text' }, child: null },
          ],
        },
      ],
    },
    {
      name: 'Multiline Text',
      icn: multilineText,
      pos: { h: 3, w: 10, i: 'block-5' },
      elm: [
        {
          tag: 'div',
          attr: { className: 'text-wrp drag', 'btcd-fld': 'textarea' },
          child: [
            { tag: 'label', attr: {}, child: 'Text Here:' },
            { tag: 'textarea', attr: { className: 'txt-a no-drg', placeholder: 'Placeholder text' }, child: null },
          ],
        },
      ],
    },
    {
      name: 'Blank Block',
      icn: blank,
      pos: { h: 2, w: 3, i: 'block-5' },
      elm: [
        {
          tag: 'div',
          attr: { className: 'blnk-blk drag' },
          child: null,
        },
      ],
    },
    {
      name: 'Check Box',
      icn: check,
      pos: { h: 2, w: 10, i: 'n_blk', minH: 2 },
      elm: [
        {
          tag: 'div',
          attr: { className: 'text-wrp drag', 'btcd-fld': 'ck' },
          child: [
            { tag: 'label', attr: {}, child: 'Select Multiple Choises:' },
            {
              tag: 'div', attr: { className: 'no-drg btcd-ck-con' },
              child: [
                {
                  tag: 'label', attr: { className: 'btcd-ck-wrp' }, child: [
                    { tag: 'span', attr: null, child: 'Option 1' },
                    { tag: 'input', attr: { type: 'checkbox' }, child: null },
                    { tag: 'span', attr: { className: 'btcd-mrk ck' }, child: null },
                  ],
                },
                {
                  tag: 'label', attr: { className: 'btcd-ck-wrp' }, child: [
                    { tag: 'span', attr: null, child: 'Option 2' },
                    { tag: 'input', attr: { type: 'checkbox' }, child: null },
                    { tag: 'span', attr: { className: 'btcd-mrk ck' }, child: null },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'Radio Button',
      icn: radio,
      pos: { h: 2, w: 10, i: 'n_blk', minH: 2 },
      elm: [
        {
          tag: 'div',
          attr: { className: 'text-wrp drag', 'btcd-fld': 'rdo' },
          child: [
            { tag: 'label', attr: {}, child: 'Choose One Option:' },
            {
              tag: 'div', attr: { className: 'no-drg btcd-ck-con round' },
              child: [
                {
                  tag: 'label', attr: { className: 'btcd-ck-wrp' }, child: [
                    { tag: 'span', attr: null, child: 'Option 1' },
                    { tag: 'input', attr: { type: 'radio' }, child: null },
                    { tag: 'span', attr: { className: 'btcd-mrk rdo' }, child: null },
                  ],
                },
                {
                  tag: 'label', attr: { className: 'btcd-ck-wrp round' }, child: [
                    { tag: 'span', attr: null, child: 'Option 2' },
                    { tag: 'input', attr: { type: 'radio' }, child: null },
                    { tag: 'span', attr: { className: 'btcd-mrk rdo' }, child: null },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'Number Field',
      icn: numberField,
      pos: { h: 2, w: 10, i: 'n_blk', maxH: 2, minH: 2 },
      elm: [
        {
          tag: 'div',
          attr: { className: 'text-wrp drag', 'btcd-fld': 'text-fld' },
          child: [
            { tag: 'label', attr: {}, child: 'Number:' },
            { tag: 'input', attr: { className: 'txt-fld no-drg', placeholder: 'Placeholder Number', type: 'number' }, child: null },
          ],
        },
      ],
    },
    {
      name: 'Drop Down',
      icn: dropdown,
      pos: { h: 2, w: 10, i: 'n_blk', minH: 2 },
      elm: [
        {
          tag: 'div',
          attr: { className: 'text-wrp drag', 'btcd-fld': 'select' },
          child: [
            { tag: 'label', attr: {}, child: 'Drop Down Select:' },
            {
              tag: 'select', attr: { className: 'txt-fld slim no-drg', placeholder: 'Select One' }, child: [
                { tag: 'option', attr: { value: 'Option 1' }, child: 'option 1' },
                { tag: 'option', attr: { value: 'Option 2' }, child: 'option 2' },
                { tag: 'option', attr: { value: 'Option 3' }, child: 'option 3' },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'Password:',
      icn: pswd,
      pos: { h: 2, w: 10, i: 'n_blk', maxH: 2, minH: 2 },
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
      pos: { h: 2, w: 10, i: 'n_blk', maxH: 2, minH: 2 },
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
      pos: { h: 2, w: 10, i: 'n_blk', maxH: 2, minH: 2 },
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
      name: 'File Upload',
      icn: url,
      pos: { h: 2, w: 10, i: 'n_blk', minH: 2, minW: 3 },
      elm: [
        {
          tag: 'div',
          attr: { className: 'file-wrp drag', 'btcd-fld': 'file-up' },
          child: [
            { tag: 'label', attr: {}, child: 'Upload File Here:' },
            {
              tag: 'div',
              attr: { className: 'btcd-f-input' },
              child: [
                {
                  tag: 'div',
                  attr: { className: 'btcd-f-wrp' },
                  child: [
                    {
                      tag: 'button', attr: { className: 'btcd-inpBtn', type: 'button' }, child: [
                        { tag: 'img', attr: { src: '', alt: '' }, child: null },
                        { tag: 'span', attr: {}, child: ' Attach File' },
                      ],
                    },
                    { tag: 'span', attr: { className: 'btcd-f-title' }, child: 'No File Chosen' },
                    { tag: 'small', attr: { className: 'f-max' }, child: ' (Max 5 MB)' },
                    { tag: 'input', attr: { type: 'file', onClick: e => setPrevData(e), onChange: e => handleFile(e) }, child: null },
                  ],
                },
                { tag: 'div', attr: { className: 'btcd-files' }, child: null },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'Date Field',
      icn: date,
      pos: { h: 2, w: 10, i: 'n_blk', maxH: 2, minH: 2 },
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
      pos: { h: 2, w: 10, i: 'n_blk', maxH: 2, minH: 2 },
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
      pos: { h: 2, w: 10, i: 'n_blk', maxH: 2, minH: 2 },
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
      pos: { h: 2, w: 10, i: 'n_blk', maxH: 2, minH: 2 },
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
      pos: { h: 2, w: 10, i: 'n_blk', maxH: 2, minH: 2 },
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
      pos: { h: 2, w: 10, i: 'n_blk', maxH: 2, minH: 2 },
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
      <div className="btcd-toolbar-title">
        {!props.tolbarSiz && 'ToolBar'}
        <button className="icn-btn" onClick={() => { props.setTolbarSiz(!props.tolbarSiz); props.setGridWidth(props.tolbarSiz ? 870 : 975) }} type="button"><span>{props.tolbarSiz ? String.fromCharCode(8250) : String.fromCharCode(8249)}</span></button>
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
