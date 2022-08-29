/* eslint-disable jsx-a11y/no-redundant-roles */
import { useParams, useNavigate } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import { $selectedFieldId } from '../../GlobalStates/GlobalStates'
import ChevronLeft from '../../Icons/ChevronLeft'
import { __ } from '../../Utils/i18nwrap'

/* eslint-disable react/button-has-type */
export default function Back2FldBtn({ className, size }) {
  const setSelectedFieldId = useSetRecoilState($selectedFieldId)
  const { formType, formID } = useParams()
  const navigate = useNavigate()

  const navigate2fldList = () => {
    navigate.push(`/form/builder/${formType}/${formID}/fields-list`)
    setSelectedFieldId(null)
  }
  return (
    <button
      type="button"
      role="button"
      tabIndex="0"
      data-testid="back2-fld-lst-btn"
      className={className}
      onClick={navigate2fldList}
    >
      <ChevronLeft size={size} />
      <span>{__('Back to fields list')}</span>
    </button>
  )
}
