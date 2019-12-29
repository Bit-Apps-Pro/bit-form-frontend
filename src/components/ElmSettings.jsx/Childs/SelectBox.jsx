import React from 'react'

export default function SelectBox(props) {
  return (
    <div className="flx flx-between">
      <input className="input" type="text" onChange={(e) => props.updateOption(e, props.idx)} value={props.itm.child} />
      <div className="flx">
        <label className="btcd-ck-wrp">
          <input type="checkbox" checked={props.itm.attr.selected} onChange={(e) => props.setSelected(e, props.idx)} />
          <span className="btcd-mrk ck br-50" />
        </label>
        <button className="btn cls-btn" type="button" onClick={() => props.removeOpt(props.idx)}>&times;</button>
      </div>

    </div>
  )
}
