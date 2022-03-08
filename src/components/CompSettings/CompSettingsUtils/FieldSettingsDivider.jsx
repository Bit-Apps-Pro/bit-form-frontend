import { useFela } from 'react-fela'
import FieldStyle from '../../../styles/FieldStyle.style'

export default function FieldSettingsDivider() {
  const { css } = useFela()
  return (
    <hr className={css(FieldStyle.divider)} />
  )
}
