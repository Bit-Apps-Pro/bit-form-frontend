/* eslint-disable object-property-newline */
/* eslint-disable no-undef */

import React, { memo } from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import Tools from './Tools'

function Toolbar(props) {
  console.log('%c $render Toolbar indec', 'background:pink;padding:3px;border-radius:5px;')

  const tools = [
    {
      name: 'Text',
      icn: 'text',
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
      icn: 'textarea',
      pos: { h: 3, w: 10, i: 'block-5' },
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
      icn: 'radio',
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
      name: 'Number',
      icn: 'num',
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
      icn: 'dropdown',
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
      icn: 'pass',
      pos: { h: 2, w: 10, i: 'n_blk', maxH: 2, minH: 2 },
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
      pos: { h: 2, w: 10, i: 'n_blk', maxH: 2, minH: 2 },
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
      icn: 'fileup',
      pos: { h: 2, w: 10, i: 'n_blk', minH: 2, minW: 3 },
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
      pos: { h: 2, w: 10, i: 'n_blk', maxH: 2, minH: 2 },
      elm: {
        typ: 'date',
        lbl: 'Date Input:',
        valid: {},
      },
    },
    {
      name: 'Time',
      icn: 'time',
      pos: { h: 2, w: 10, i: 'n_blk', maxH: 2, minH: 2 },
      elm: {
        typ: 'time',
        lbl: 'Time Input:',
        valid: {},
      },
    },
    {
      name: 'Date-Time',
      icn: 'datetime',
      pos: { h: 2, w: 10, i: 'n_blk', maxH: 2, minH: 2 },
      elm: {
        typ: 'datetime-local',
        lbl: 'Date-Time Input:',
        valid: {},
      },
    },
    {
      name: 'Month',
      icn: 'month',
      pos: { h: 2, w: 10, i: 'n_blk', maxH: 2, minH: 2 },
      elm: {
        typ: 'month',
        lbl: 'Month Input:',
        valid: {},
      },
    },
    {
      name: 'Week',
      icn: 'week',
      pos: { h: 2, w: 10, i: 'n_blk', maxH: 2, minH: 2 },
      elm: {
        typ: 'week',
        lbl: 'Week Input:',
        valid: {},
      },
    },
    {
      name: 'Color Picker',
      icn: 'color',
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
        <button className="icn-btn" onClick={() => { props.setTolbarSiz(!props.tolbarSiz) }} type="button" aria-label="Toggle Toolbar"><span className={`btcd-icn icn-${props.tolbarSiz ? 'chevron-right' : 'chevron-left'}`} /></button>
      </div>
      <Scrollbars autoHide style={{ maxWidth: 400 }}>
        <div className="toolBar">
          {tools.map(tool => (
            <Tools key={tool.name} setDrgElm={props.setDrgElm} setNewData={props.setNewData} value={[tool.elm, tool.pos]}>
              <span className={`btcd-icn  icn-${tool.icn}`} />
              {/* <img draggable="false" src={tool.icn} alt={`${tool.name}-field`} className="tool-img" /> */}
              {!props.tolbarSiz && tool.name}
            </Tools>
          ))}
        </div>
      </Scrollbars>
    </div>
  )
}
export default memo(Toolbar)
