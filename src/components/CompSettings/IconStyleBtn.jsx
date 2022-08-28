import { useFela } from 'react-fela'
import { useNavigate, useParams } from 'react-router-dom'
import BrushIcn from '../../Icons/BrushIcn'
import ut from '../../styles/2.utilities'

export default function IconStyleBtn({ route }) {
  const { fieldKey: fldKey, formID, formType } = useParams()
  const navigate = useNavigate()
  const { css } = useFela()

  const styleHandler = () => {
    navigate.push(`/form/builder/${formType}/${formID}/field-theme-customize/${route}/${fldKey}`)
  }
  return (
    <button data-testid={`${route}-styl-btn`} type="button" onClick={styleHandler} className={css(ut.icnBtn)}>
      <BrushIcn height="30" />
    </button>
  )
}
