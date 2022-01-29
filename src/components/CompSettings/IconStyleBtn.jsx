import { useFela } from 'react-fela'
import { useHistory, useParams } from 'react-router-dom'
import BrushIcn from '../../Icons/BrushIcn'
import ut from '../../styles/2.utilities'

export default function IconStyleBtn({ route }) {
  const { fieldKey: fldKey, formID, formType } = useParams()
  const history = useHistory()
  const { css } = useFela()

  const styleHandler = () => {
    history.push(`/form/builder/${formType}/${formID}/field-theme-customize/${route}/${fldKey}`)
  }
  return (
    <button type="button" onClick={styleHandler} className={css(ut.icnBtn)}>
      <BrushIcn height="30" />
    </button>
  )
}
