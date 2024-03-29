import { useState } from 'react'
import { useFela } from 'react-fela'
import BorderFullIcn from '../../../../Icons/BorderFullIcn'
import BorderLeftTopIcn from '../../../../Icons/BorderLeftTopIcn'
import BoxFullIcon from '../../../../Icons/BoxFullIcon'
import BoxIcon from '../../../../Icons/BoxIcon'
import ut from '../../../../styles/2.utilities'
import ResetStyle from '../../../style-new/ResetStyle'
import { getNumFromStr, getStrFromStr, unitConverter } from '../../../style-new/styleHelpers'
import StyleSegmentControl from '../../../Utilities/StyleSegmentControl'
import Grow from './Grow'
import SizeControl from './SizeControl'

export default function SpaceControl({
  value,
  unitOption,
  title,
  onChange = () => { },
  className,
  stateObjName,
  propertyPath,
  width,
  dataTestId,
  radius,
}) {
  const { css } = useFela()

  let values = (value?.replace(/!important/gi, '') || '0px 0px 0px 0px').trim().split(' ')
  if (values.length === 4) {
    const distinct = values.filter((val, index, self) => self.indexOf(val) === index)
    if (distinct.length === 1) values = distinct
  }

  const [controller, setController] = useState(values.length === 1 ? 'All' : 'Individual')

  const sizeValues = (v) => (v && getNumFromStr(v)) || 0
  const sizeUnits = (v) => (v && getStrFromStr(v)) || 'px'

  const options = [
    { label: 'All', icn: <BoxFullIcon stroke="1.7" size={14} />, show: ['icn'], tip: 'All Side' },
    { label: 'Individual', icn: radius ? <BorderFullIcn size={20} /> : <BoxIcon stroke="1.7" size="15" />, show: ['icn'], tip: 'Individual Side' },
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

  const handleValues = ({ value: val, unit, id }) => {
    const unt = unit === 'var' ? 'px' : unit
    const preUnit = getStrFromStr(values[id])
    const convertvalue = unitConverter(unt, val, preUnit)

    values[id] = convertvalue + unt
    let v
    if (controller === 'All') {
      v = `${values[0]}`
    } else {
      v = `${values[0]} ${values[1]} ${values[2]} ${values[3]}`
    }
    onChange(v)
  }

  const changeHandler = (val) => {
    if (val === 'All') values = [values[0]]
    else values = Array(4).fill(values[0])
    setController(val)
  }

  return (
    <div className={className}>
      <div className={css(s.titlecontainer)}>
        <span className={css(s.title)}>{title}</span>
        <span className={css(ut.flxc)}>
          <ResetStyle stateObjName={stateObjName} propertyPath={propertyPath} />
          <StyleSegmentControl
            square
            defaultActive={controller}
            options={options}
            values={60}
            component="button"
            onChange={lbl => changeHandler(lbl)}
            show={['icn']}
            variant="lightgray"
            noShadow
          />
        </span>
      </div>
      <div className={css(s.segmentcontainer)}>
        <Grow open={controller === 'All'}>
          <div className={css({ p: 2 })}>
            <SizeControl
              min="0"
              inputHandler={handleValues}
              sizeHandler={({ unitKey, unitValue, id }) => handleValues({ value: unitValue, unit: unitKey, id })}
              id="0"
              label={<BoxFullIcon size={14} />}
              value={values[0] && getNumFromStr(values[0])}
              unit={values[0] && getStrFromStr(values[0])}
              options={unitOption}
              width={width || '110px'}
              dataTestId={`${dataTestId}-all`}
            />
          </div>
        </Grow>
        <Grow open={controller === 'Individual'}>
          <div className={css(ut.flxc, { flxp: 'wrap', jc: 'end', p: 2 })}>
            <SizeControl
              min="0"
              inputHandler={handleValues}
              sizeHandler={({ unitKey, unitValue, id }) => handleValues({ value: unitValue, unit: unitKey, id })}
              id="0"
              label={radius ? <BorderLeftTopIcn size={12} className={css({ tm: 'rotate(90deg)' })} /> : <BoxIcon size="14" variant="top" className={css(s.blueTxt)} />}
              width="100px"
              value={sizeValues(values[0])}
              unit={sizeUnits(values[0])}
              options={unitOption}
              className={css(ut.mr1, ut.mb1)}
              dataTestId={`${dataTestId}-top`}
            />
            <SizeControl
              min="0"
              inputHandler={handleValues}
              sizeHandler={({ unitKey, unitValue, id }) => handleValues({ value: unitValue, unit: unitKey, id })}
              id="1"
              label={radius ? <BorderLeftTopIcn size={12} className={css({ tm: 'rotate(180deg)' })} /> : <BoxIcon size="14" variant="right" className={css(s.blueTxt)} />}
              width="100px"
              value={sizeValues(values[1])}
              unit={sizeUnits(values[1])}
              options={unitOption}
              className={css(ut.mb1)}
              dataTestId={`${dataTestId}-right`}
            />
            <SizeControl
              min="0"
              inputHandler={handleValues}
              sizeHandler={({ unitKey, unitValue, id }) => handleValues({ value: unitValue, unit: unitKey, id })}
              id="3"
              // label={radius ? <BorderLeftTopIcn size={12} className={css({ tm: 'rotate(0deg)' })} /> : <BoxIcon size="14" variant="bottom" className={css(s.blueTxt)} />}
              label={radius ? <BorderLeftTopIcn size={12} className={css({ tm: 'rotate(0deg)' })} /> : <BoxIcon size="14" variant="left" className={css(s.blueTxt)} />}
              width="100px"
              value={sizeValues(values[3])}
              unit={sizeUnits(values[3])}
              options={unitOption}
              className={css(ut.mr1)}
              dataTestId={`${dataTestId}-bottom`}
            />
            <SizeControl
              min="0"
              inputHandler={handleValues}
              sizeHandler={({ unitKey, unitValue, id }) => handleValues({ value: unitValue, unit: unitKey, id })}
              id="2"
              label={radius ? <BorderLeftTopIcn size={12} className={css({ tm: 'rotate(270deg)' })} /> : <BoxIcon size="14" variant="bottom" className={css(s.blueTxt)} />}
              // label={radius ? <BorderLeftTopIcn size={12} className={css({ tm: 'rotate(270deg)' })} /> : <BoxIcon size="14" variant="left" className={css(s.blueTxt)} />}
              width="100px"
              value={sizeValues(values[2])}
              unit={sizeUnits(values[2])}
              options={unitOption}
              dataTestId={`${dataTestId}-left`}
            />
          </div>
        </Grow>
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
    my: 10,
    w: 220,
  },
  titlecontainer: { flx: 'center-between' },
  title: { fs: 12, fw: 500 },
  blueTxt: { cr: 'var(--b-50)' },
}
