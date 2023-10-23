import { useFela } from 'react-fela'
import ut from '../../../styles/2.utilities'
import sizeControlStyle from '../../../styles/sizeControl.style'
import CustomInputControl from '../../CompSettings/StyleCustomize/ChildComp/CustomInputControl'
import { getNumFromStr, getStrFromStr, unitConverter } from '../styleHelpers'

export default function SizeControlUtil({
  label,
  className,
  width,
  customStyle,
  options = [],
  onChangeHandler,
  value,
  name,
  min = 1,
  max = 100,
  step,
  dataTestId,
  sliderWidth = 200,
}: SizeControlProps) {

  const { css } = useFela()

  const val = typeof value === 'number' ? value.toString() : value
  const [vlu, unt] = [getNumFromStr(val), getStrFromStr(val)]

  const inputHandler = ({ v, u }: onChangeType) => {
    const convertvalue = unitConverter(u, v, unt)
    const val = `${convertvalue}${u}`
    onChangeHandler(val)
  }

  return (
    <div
      className={`${css(sizeControlStyle.container)} ${className}`}
      style={{ width, ...customStyle }}
    >
      <CustomInputControl
        className={css(sizeControlStyle.input)}
        label={label}
        value={vlu}
        min={min}
        max={max}
        step={step ? step : unt === 'px' ? 0.1 : 1}
        width={`${width - 20}px`}
        onChange={(v: number) => inputHandler({ v, u: unt })}
        dataTestId={dataTestId}
        sliderWidth={sliderWidth}
      />

      <select
        value={unt}
        className={css(sizeControlStyle.selectt, ut.fontBody, { fs: '12px !important' })}
        name={name}
        onChange={({ target: { value: unit } }) => inputHandler({ v: vlu, u: unit })}
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
    </div>
  )
}

type SizeControlProps = {
  label: string,
  className?: string,
  width?: number | string,
  customStyle?: object,
  options?: string[],
  onChangeHandler: (val: string) => void,
  value: number | string,
  name: string,
  min?: number,
  max?: number,
  step?: number,
  dataTestId?: string,
  sliderWidth?: number,
}

type onChangeType = {
  v: number,
  u: string
}