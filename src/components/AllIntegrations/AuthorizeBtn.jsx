import { useFela } from 'react-fela'
import ut from '../../styles/2.utilities'
import { __ } from '../../Utils/i18nwrap'
import LoaderSm from '../Loaders/LoaderSm'
import Btn from '../Utilities/Btn'

export default function AuthorizeBtn({ isAuthorized, isLoading, handleAuthorize }) {
  const { css } = useFela()
  return (
    <Btn
      variant={isAuthorized ? 'disabled' : 'success'}
      onClick={handleAuthorize}
      disabled={isAuthorized || isLoading}
      className={css(ut.mt3, { ml: 3 })}
    >
      {isAuthorized ? __('Authorized ✔') : __('Authorize')}
      {isLoading && <LoaderSm size={20} clr="#022217" className="ml-2" />}
    </Btn>
  )
}
