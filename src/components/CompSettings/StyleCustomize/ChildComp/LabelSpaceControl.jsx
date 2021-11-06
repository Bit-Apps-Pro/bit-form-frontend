import { useEffect, useState } from 'react'
import { useFela } from 'react-fela'
import BorderRadiusCornersIcn from '../../../../Icons/BorderRadiusCornersIcn'
import BorderRadiusIcn from '../../../../Icons/BorderRadiusIcn'
import ut from '../../../../styles/2.utilities'
import StyleSegmentControl from '../../../Utilities/StyleSegmentControl'
import SizeControl from './SizeControl'

export default function LabelSpaceControl({ value, unitOption, title, onChange = () => { } }) {
  const { css } = useFela()
  const values = (value || '0px 0px 0px 0px').trim().split(' ')
  const [controller, setController] = useState(values.length === 1 ? 'All' : 'Individual')
  const [sizeValue, setSizeValue] = useState([...values])


  const getValue = (stringVal) => stringVal?.match(/[-]?([0-9]*[.])?[0-9]+/gi)[0]
  const getUnit = (stringVal) => stringVal && stringVal.match(/([A-z]|%)+/gi)[0]

  const options = [
    { label: 'All', icn: <BorderRadiusIcn size={16} />, show: ['icn'], tip: 'Radius allside' },
    { label: 'Individual', icn: <BorderRadiusCornersIcn size={16} />, show: ['icn'], tip: 'Radius per corner' },
  ]

  /*
    varable [size].lenght 4
    size[0] = top,
    size[1] = right
    size[2] = bottom
    size[3] = left
  */
  let size = []
  // useEffect(() => {
  //   const sizeArr = []
  //   if (controller === 'All') {
  //     sizeArr.push(values[0])
  //   } else {
  //     for (let i = 0; i < 4; i += 1) {
  //       sizeArr.push(values[0])
  //     }
  //   }
  //   setSizeValue(...sizeArr)
  // }, [controller])

  if (values.length === 1 && controller === 'All') {
    size.push(values[0])
  }

  if (values.length === 1 && controller === 'Individual') {
    for (let i = 0; i < 4; i += 1) {
      size.push(values[0])
    }
  }

  if (values.length === 2) {
    size = [values[0], values[1], values[0], values[1]]
  }

  if (values.length === 3) {
    size = [values[0], values[1], values[2], values[1]]
  }

  if (values.length === 4) {
    size = values
  }

  const unitConverter = (unit, val, id) => {
    const preUnit = getUnit(size[id])
    if (preUnit === unit) return val
    if (preUnit === 'px' && unit === 'em') return (val * 0.0714285714285714).toFixed(2)
    if (preUnit === 'px' && unit === 'rem') return val * 0.0625
    if (preUnit === 'em' && unit === 'px') return val * 14
    if (preUnit === 'em' && unit === 'rem') return val / 16
    if (preUnit === 'rem' && unit === 'em') return val / 14
    if (preUnit === 'rem' && unit === 'px') return val * 16
  }

  const handleValues = ({ value: val, unit, id }) => {
    const convertvalue = unitConverter(unit, val, id)
    size[id] = convertvalue + unit
    let v
    if (controller === 'All') {
      v = `${size[0]}`
    } else {
      v = `${size[0]} ${size[1]} ${size[2]} ${size[3]}`
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
          size={60}
          component="button"
          onChange={lbl => changeHandler(lbl)}
          show={['icn']}
          variant="lightgray"
          activeValue={controller}
        />
      </div>
      <div className={css(s.segmentcontainer)}>
        {controller === 'All' && (
          <SizeControl min="0" inputHandler={handleValues} sizeHandler={({ unitKey, unitValue, id }) => handleValues({ value: unitValue, unit: unitKey, id })} id="0" label={<BorderRadiusIcn size={19} />} value={size[0] && getValue(size[0])} unit={size[0] && getUnit(size[0])} options={unitOption} width="100px" />
        )}
        {controller === 'Individual' && (
          <>
            <SizeControl min="0" inputHandler={handleValues} sizeHandler={({ unitKey, unitValue, id }) => handleValues({ value: unitValue, unit: unitKey, id })} id="0" label="T" width="100px" value={size[0] && getValue(size[0]) || 0} unit={size[0] && getUnit(size[0]) || 'px'} options={unitOption} />
            <SizeControl min="0" inputHandler={handleValues} sizeHandler={({ unitKey, unitValue, id }) => handleValues({ value: unitValue, unit: unitKey, id })} id="1" label="R" width="100px" value={size[1] && getValue(size[1]) || 0} unit={size[1] && getUnit(size[1]) || 'px'} options={unitOption} />
            <SizeControl min="0" inputHandler={handleValues} sizeHandler={({ unitKey, unitValue, id }) => handleValues({ value: unitValue, unit: unitKey, id })} id="2" label="B" width="100px" value={size[2] && getValue(size[2]) || 0} unit={size[2] && getUnit(size[2]) || 'px'} options={unitOption} />
            <SizeControl min="0" inputHandler={handleValues} sizeHandler={({ unitKey, unitValue, id }) => handleValues({ value: unitValue, unit: unitKey, id })} id="3" label="L" width="100px" value={size[3] && getValue(size[3]) || 0} unit={size[3] && getUnit(size[3]) || 'px'} options={unitOption} />
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
