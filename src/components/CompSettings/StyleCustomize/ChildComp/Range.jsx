import { useState } from 'react';

Range.defaultProps = {
  unit: '',
  master: true,
  minRange: 0,
}

export default function Range({ className, value, onChange, maxRange, minRange, info, unit, master }) {
  // eslint-disable-next-line no-param-reassign
  value = value.replace(/px|em|rem|!important|%/g, '').split(' ')
  const [masterRangeVal, setmasterRangeVal] = useState(value.reduce((total, num) => num - total) === 0 ? value[0] : '')

  const handleVal = (v, ind) => {
    // eslint-disable-next-line no-param-reassign
    value[ind] = v
    onChange(value.join(`${unit} `) + unit)
    setmasterRangeVal('')
  }

  const handleMaster = e => {
    value.fill(e.target.value)
    onChange(value.join(`${unit} `) + unit)
    setmasterRangeVal(e.target.value)
  }

  return (
    <div className={className}>
      {value && master && <RSlider icn={info[info.length - 1].icn} lbl={info[info.length - 1].lbl} action={handleMaster} rVal={parseInt(masterRangeVal, 10)} unit={unit} max={maxRange} min={minRange} />}
      {value && value.length > 0 && value.map((itm, i) => (
        <RSlider key={info[i].lbl} icn={info[i].icn} lbl={info[i].lbl} action={e => handleVal(e.target.value, i)} rVal={parseInt(itm, 10)} unit={unit} max={maxRange} min={minRange} />
      ))}
    </div>
  )
}

const RSlider = ({ icn, lbl, action, rVal, unit, max, min }) => (
  <div className="flx flx-between mt-1 inp-grp">
    <span className="icn tooltip pos-rel br-50 flx mr-1" style={{ '--tooltip-txt': `"${lbl}"`, '--tt-left': '100%' }}>{icn}</span>
    <input title={`${lbl} ${rVal} ${unit}`} onChange={action} className="btc-range mr-1" type="range" min={min} max={max} value={rVal} />
    <input onChange={action} className="ml-1" type="number" placeholder="auto" value={parseInt(rVal, 10)} min="0" />
  </div>
)
