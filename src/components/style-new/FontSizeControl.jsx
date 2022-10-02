/* eslint-disable no-param-reassign */
import produce from 'immer'
import { useFela } from 'react-fela'
import { useParams } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { $styles } from '../../GlobalStates/StylesState'
import { $themeVars } from '../../GlobalStates/ThemeVarsState'
import ut from '../../styles/2.utilities'
import { addToBuilderHistory, generateHistoryData, getLatestState } from '../../Utils/FormBuilderHelper'
import SizeControl from '../CompSettings/StyleCustomize/ChildComp/SizeControl'
import ResetStyle from './ResetStyle'
import { assignNestedObj, getNumFromStr, getStrFromStr, getValueByObjPath, unitConverter } from './styleHelpers'

export default function FontSizeControl({ stateObjName, propertyPath, id }) {
  const [themeVars, setThemeVars] = useRecoilState($themeVars)
  const [styles, setStyle] = useRecoilState($styles)
  const { fieldKey, element } = useParams()
  const { css } = useFela()

  const getFontValAndUnit = () => {
    let fs
    if (stateObjName === 'themeVars') {
      fs = themeVars[propertyPath]
    } else {
      fs = getValueByObjPath(styles, propertyPath)
    }
    const val = getNumFromStr(fs)
    const unt = getStrFromStr(fs)
    return [val, unt]
  }
  const [fldFSValue, fldFSUnit] = getFontValAndUnit()

  const updateHandler = (value, unit, globalVarUnit) => {
    const convertvalue = unitConverter(unit, value, globalVarUnit)
    const v = `${convertvalue}${unit || globalVarUnit}`
    switch (stateObjName) {
      case 'themeVars':
        setThemeVars(prvStyle => produce(prvStyle, drft => {
          drft[propertyPath] = v
        }))
        addToBuilderHistory(generateHistoryData(element, fieldKey, propertyPath, v, { themeVars: getLatestState('themeVars') }))
        break
      case 'styles':
        setStyle(prvStyle => produce(prvStyle, drft => {
          assignNestedObj(drft, propertyPath, v)
        }))
        addToBuilderHistory(generateHistoryData(element, fieldKey, propertyPath, v, { styles: getLatestState('styles') }))
        break
      default:
        break
    }
  }
  const fldFsSizeHandler = ({ value, unit }) => updateHandler(value, unit, fldFSUnit)

  return (
    <div className={css(ut.flxcb, ut.mt2)}>
      <span className={css(ut.fw500)}>Font Size</span>
      <div className={css(ut.flxc)}>
        <ResetStyle id={id} propertyPath={propertyPath} stateObjName={stateObjName} />
        <SizeControl
          inputHandler={fldFsSizeHandler}
          sizeHandler={({ unitKey, unitValue }) => fldFsSizeHandler({ unit: unitKey, value: unitValue })}
          value={fldFSValue}
          unit={fldFSUnit}
          width="128px"
          options={['px', 'em', 'rem']}
          dataTestId={id}
        />
      </div>
    </div>
  )
}
