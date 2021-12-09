/* eslint-disable jsx-a11y/no-redundant-roles */
import { useParams, useHistory } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import { $selectedFieldId } from '../../GlobalStates'
import ChevronLeft from '../../Icons/ChevronLeft'
import { __ } from '../../Utils/i18nwrap'

/* eslint-disable react/button-has-type */
export default function Back2FldBtn({ className, size }) {
  const setSelectedFieldId = useSetRecoilState($selectedFieldId)
  const { formType, formID } = useParams()
  const history = useHistory()

  const navigate2fldList = () => {
    history.push(`/form/builder/${formType}/${formID}/fields-list`)
    setSelectedFieldId(null)
  }
  return (
    <button
      type="button"
      role="button"
      tabIndex="0"
      className={className}
      onClick={navigate2fldList}
    >
      <ChevronLeft size={size} />
      <span>{__('Back to fields list', 'bitform')}</span>
    </button>
  )
}
