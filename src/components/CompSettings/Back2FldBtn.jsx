/* eslint-disable jsx-a11y/no-redundant-roles */
import { useSetRecoilState } from 'recoil'
import { $selectedFieldId } from '../../GlobalStates'
import ChevronLeft from '../../Icons/ChevronLeft'
import { __ } from '../../Utils/i18nwrap'

/* eslint-disable react/button-has-type */
function Back2FldBtn({ className, size }) {
  const setSelectedFieldId = useSetRecoilState($selectedFieldId)
  return (
    <button
      type="button"
      role="button"
      tabIndex="0"
      className={className}
      onClick={() => setSelectedFieldId(null)}
      onKeyPress={() => setSelectedFieldId(null)}
    >
      <ChevronLeft size={size} />
      <span>{__('Back to fields list', 'bitform')}</span>
    </button>
  )
}

export default Back2FldBtn
