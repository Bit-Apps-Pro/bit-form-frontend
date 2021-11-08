import { useState } from 'react'
import { useFela } from 'react-fela'
import BorderRadiusCornersIcn from '../../../../Icons/BorderRadiusCornersIcn'
import BorderRadiusIcn from '../../../../Icons/BorderRadiusIcn'
import ut from '../../../../styles/2.utilities'
import StyleSegmentControl from '../../../Utilities/StyleSegmentControl'
import SizeControl from './SizeControl'

export default function SpaceControl({ value, unitOption, title, onChange = () => { } }) {
  const { css } = useFela()
  let values = (value || '0px 0px 0px 0px').trim().split(' ')
  const [controller, setController] = useState(values.length === 1 ? 'All' : 'Individual')
  const [sizeValue, setSizeValue] = useState([...values])

  const getValue = (stringVal) => stringVal?.match(/[-]?([0-9]*[.])?[0-9]+/gi)[0]
  const getUnit = (stringVal) => stringVal && stringVal.match(/([A-z]|%)+/gi)[0]
  const sizeValues = (v) => (v && getValue(v)) || 0
  const sizeUnits = (v) => (v && getUnit(v)) || 'px'

  const options = [
    { label: 'All', icn: <BorderRadiusIcn values={16} />, show: ['icn'], tip: 'Radius allside' },
    { label: 'Individual', icn: <BorderRadiusCornersIcn values={16} />, show: ['icn'], tip: 'Radius per corner' },
  ]

  /*
    varable [values].lenght 4
    values[0] = top,
    values[1] = right
    values[2] = bottom
    values[3] = left
  */

  if (values.length === 1 && controller === 'All') {
    values = [values[0]]
  }

  if (values.length === 1 && controller === 'Individual') {
    values = Array(4).fill(values[0])
  }

  if (values.length === 2) {
    values = [values[0], values[1], values[0], values[1]]
  }

  if (values.length === 3) {
    values = [values[0], values[1], values[2], values[1]]
  }

  const unitConverter = (unit, val, id) => {
    const preUnit = getUnit(values[id])
    if (preUnit === unit) return val
    if (preUnit === 'px' && unit === 'em') return (val * 0.0714285714285714).toFixed(3)
    if (preUnit === 'px' && unit === 'rem') return val * 0.0625
    if (preUnit === 'em' && unit === 'px') return val * 14
    if (preUnit === 'em' && unit === 'rem') return val / 16
    if (preUnit === 'rem' && unit === 'em') return val / 14
    if (preUnit === 'rem' && unit === 'px') return val * 16
  }

  const handleValues = ({ value: val, unit, id }) => {
    const convertvalue = unitConverter(unit, val, id)
    values[id] = convertvalue + unit
    let v
    if (controller === 'All') {
      v = `${values[0]}`
    } else {
      v = `${values[0]} ${values[1]} ${values[2]} ${values[3]}`
    }
    onChange(v)
  }

  const changeHandler = (val) => {
    const s = []
    if (val === 'All') {
      s.push(values[0])
    } else {
      for (let i = 0; i < 4; i += 1) {
        s.push(values[0])
      }
    }
    setSizeValue(...s)
    setController(val)
  }
  console.log(sizeValue, 'controller', controller)

  return (
    <div className={css(ut.mt2)}>
      <div className={css(s.titlecontainer)}>
        <span className={css(s.title)}>{title}</span>
        <StyleSegmentControl
          square
          defaultActive="All"
          options={options}
          values={60}
          component="button"
          onChange={lbl => changeHandler(lbl)}
          show={['icn']}
          variant="lightgray"
          activeValue={controller}
        />
      </div>
      <div className={css(s.segmentcontainer)}>
        {controller === 'All' && (
          <SizeControl min="0" inputHandler={handleValues} sizeHandler={({ unitKey, unitValue, id }) => handleValues({ value: unitValue, unit: unitKey, id })} id="0" label={<BorderRadiusIcn values={19} />} value={values[0] && getValue(values[0])} unit={values[0] && getUnit(values[0])} options={unitOption} width="100px" />
        )}
        {controller === 'Individual' && (
          <>
            <SizeControl min="0" inputHandler={handleValues} sizeHandler={({ unitKey, unitValue, id }) => handleValues({ value: unitValue, unit: unitKey, id })} id="0" label="T" width="100px" value={sizeValues(values[0])} unit={sizeUnits(values[0])} options={unitOption} />
            <SizeControl min="0" inputHandler={handleValues} sizeHandler={({ unitKey, unitValue, id }) => handleValues({ value: unitValue, unit: unitKey, id })} id="1" label="R" width="100px" value={sizeValues(values[1])} unit={sizeUnits(values[1])} options={unitOption} />
            <SizeControl min="0" inputHandler={handleValues} sizeHandler={({ unitKey, unitValue, id }) => handleValues({ value: unitValue, unit: unitKey, id })} id="2" label="B" width="100px" value={sizeValues(values[2])} unit={sizeUnits(values[2])} options={unitOption} />
            <SizeControl min="0" inputHandler={handleValues} sizeHandler={({ unitKey, unitValue, id }) => handleValues({ value: unitValue, unit: unitKey, id })} id="3" label="L" width="100px" value={sizeValues(values[3])} unit={sizeUnits(values[3])} options={unitOption} />
          </>
        )}
      </div>
    </div>
  )
}

const s = {
  container: { flx: 'center-between' },
  segmentcontainer: {
    flx: 'align-center',
    jc: 'flex-end',
    flxp: 'wrap',
    gap: '5px',
    mt: 10,
  },
  titlecontainer: { flx: 'center-between' },
  title: { fs: 12 },
}
