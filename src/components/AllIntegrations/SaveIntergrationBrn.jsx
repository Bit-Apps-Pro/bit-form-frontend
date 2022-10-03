import { __ } from '../../Utils/i18nwrap'
import Btn from '../Utilities/Btn'

export default function SaveIntergrationBrn({ onClick }) {
  return (
    <Btn
      variant="success"
      onClick={onClick}
    >
      {__('Save')}
    </Btn>
  )
}
