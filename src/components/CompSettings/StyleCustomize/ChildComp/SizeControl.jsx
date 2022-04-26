import { useFela } from 'react-fela'
import ChevronDownIcn from '../../../../Icons/ChevronDownIcn'
import ut from '../../../../styles/2.utilities'
import sizeControlStyle from '../../../../styles/sizeControl.style'
import CustomInputControl from './CustomInputControl'

export default function SizeControl({ label, className, width, options = [], sizeHandler, unit, inputHandler, actualValue, preDefinedValues, definedValueHandler, value, name, min = 1, max = 100, id, step = 1, dataTestId }) {
  const { css } = useFela()
  const isPreDefined = preDefinedValues?.includes(actualValue)
  // const step = 1
  return (
    <div className={`${css(sizeControlStyle.container)} ${className}`} style={{ width }}>

      {preDefinedValues && (
        <div className={css(sizeControlStyle.listContainer)}>
          <ChevronDownIcn className="down-icon" size="18" rotate={false} />
          <ul className={`${css(sizeControlStyle.valueList)} value-list`}>
            {preDefinedValues?.map(opt => (
              <li
                role="option"
                aria-selected={opt}
                onClick={() => definedValueHandler(opt)}
                onKeyUp={() => definedValueHandler(opt)}
                className={css(sizeControlStyle.listItem)}
              >
                {opt}
              </li>
            ))}
          </ul>
        </div>
      )}

      <CustomInputControl
        className={css(sizeControlStyle.input)}
        label={label}
        value={isPreDefined ? '' : value}
        min={min}
        max={max}
        step={step}
        width={`${width - 20}px`}
        onChange={v => inputHandler({ value: v, unit, id })}
        placeholder={actualValue}
        hasTextMode={isPreDefined}
        dataTestId={dataTestId}
      />
      {!isPreDefined && (
        <select
          value={unit}
          className={css(sizeControlStyle.selectt, ut.fontBody)}
          name={name}
          onChange={({ target: { value: valu } }) => sizeHandler({ unitKey: valu, unitValue: value, id })}
          data-testid={`${dataTestId}-unit-select`}
        >
          {options.length === 0 && (
            <>
              <option value="px">px</option>
              <option value="%">%</option>
              <option value="em">em</option>
              <option value="rem">rem</option>
            </>
          )}

          {options && options?.map((item, i) => (
            <option key={`scopt-${i * 2}`} value={item}>{item}</option>
          ))}
        </select>
      )}

    </div>
  )
}
