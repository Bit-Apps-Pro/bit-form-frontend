import { create } from 'mutative'
import { useFela } from 'react-fela'
import { useParams } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { $fields } from '../../../GlobalStates/GlobalStates'
import { $styles } from '../../../GlobalStates/StylesState'
import sc from '../../../styles/commonStyleEditorStyle'
import { addToBuilderHistory, generateHistoryData, getLatestState } from '../../../Utils/FormBuilderHelper'
import { deepCopy } from '../../../Utils/Helpers'
import { assignNestedObj } from '../styleHelpers'
import ThemeStylePropertyBlock from '../ThemeStylePropertyBlock'

export default function RazorpayFieldQuickTweaks() {
  const { css } = useFela()
  const { element, fieldKey } = useParams()
  const [styles, setStyles] = useRecoilState($styles)
  const [fields, setFields] = useRecoilState($fields)
  const fieldData = deepCopy(fields[fieldKey])
  const propertyPath = (elemnKey, property) => `fields->${fieldKey}->classes->.${fieldKey}-${elemnKey}->${property}`

  const razorpayBtnThemeHandler = (e) => {
    const themeValue = e.target.value
    fieldData.btnTheme = themeValue
    // eslint-disable-next-line no-param-reassign
    setFields(allFields => create(allFields, draft => { draft[fieldKey] = fieldData }))
    setStyles(prvStyle => create(prvStyle, drft => {
      let btnBg
      let border
      let color
      let btnBeforeBg
      switch (themeValue) {
        case 'dark':
          btnBg = 'hsla(216, 85%, 18%, 100%)'
          border = 'solid hsla(216, 85%, 18%, 100%)'
          color = 'hsla(0, 0%, 100%, 100%)'
          btnBeforeBg = 'hsla(224, 68%, 37%, 100%)'
          break

        case 'light':
          btnBg = 'hsla(0, 0%, 100%, 100%)'
          border = 'solid hsla(0, 0%, 100%, 100%)'
          color = 'hsla(224, 68%, 37%, 100%)'
          btnBeforeBg = 'hsla(224, 68%, 37%, 100%)'
          break

        case 'outline':
          btnBg = 'hsla(216, 91%, 96%, 100%)'
          border = 'solid hsla(216, 85%, 18%, 100%)'
          color = 'hsla(216, 85%, 18%, 100%)'
          btnBeforeBg = 'hsla(224, 68%, 37%, 100%)'
          break

        case 'brand':
          btnBg = 'hsla(241, 100%, 50%, 100%)'
          border = 'solid hsla(241, 100%, 50%, 100%)'
          color = 'hsla(0, 0%, 100%, 100%)'
          btnBeforeBg = 'hsla(241, 100%, 50%, 100%)'
          break

        default:
          break
      }
      assignNestedObj(drft, propertyPath('razorpay-btn', 'background-color'), btnBg)
      assignNestedObj(drft, propertyPath('razorpay-btn', 'border'), border)
      assignNestedObj(drft, propertyPath('razorpay-btn-text', 'color'), color)
      assignNestedObj(drft, propertyPath('razorpay-btn::before', 'background-color'), btnBeforeBg)
    }))
    addToBuilderHistory(generateHistoryData(element, fieldKey, 'Razorpay Theme', themeValue, { fields: getLatestState('fields'), styles: getLatestState('styles') }))
  }
  return (
    <ThemeStylePropertyBlock label="Width">
      <select
        data-testid="razorpay-btn-theme"
        onChange={razorpayBtnThemeHandler}
        className={css(sc.select)}
        value={fieldData.btnTheme}
      >
        <option value="dark">Razorpay Dark</option>
        <option value="light">Razorpay Light</option>
        <option value="outline">Razorpay Outline</option>
        <option value="brand">Brand Color</option>
      </select>
    </ThemeStylePropertyBlock>
  )
}
