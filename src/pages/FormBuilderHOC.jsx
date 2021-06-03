import { useParams } from 'react-router-dom'
import FormBuilder from './FormBuilder'

export default function FormBuilderHOC({ formSettings, isLoading }) {
  const { formType, formID } = useParams()
  return <FormBuilder {...{ formType, formID, formSettings, isLoading }} />
}
