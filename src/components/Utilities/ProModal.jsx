import { useFela } from 'react-fela'
import { useAtom } from 'recoil'
import { $proModal } from '../../GlobalStates/GlobalStates'
import ProBadgeIcn from '../../Icons/ProBadgeIcn'
import { __ } from '../../Utils/i18nwrap'
import Btn from './Btn'
import Modal from './Modal'

export default function ProModal({
  close, show, title, className, children, warning,
}) {
  const { css } = useFela()
  const [proModal, setProModal] = useAtom($proModal)
  return (
    <Modal
      sm
      show={proModal.show}
      setModal={() => setProModal({ show: false })}
      className={css({ w: '500px !important' })}
      title={proModal.title || 'Upgrade to Pro'}
      warning={warning || false}
    >
      <div className={`txt-center atn-btns flx flx-center ${className || 'flx-col'}`}>
        <div className={`content p-4 ${!className && 'confirm-content'}`}>
          <ProBadgeIcn size="30" />
          <h3>{`${proModal.heading || 'This feature'} is available in Pro`}</h3>
          <p>
            {__('Thank you for using our product! We\'re sorry, ')}
            {proModal.featureText || 'this feature'}
            {__(' is not available in your plan.')}
            {__('Please upgrade to the PRO plan to unlock all these awesome features.')}
          </p>
          {children}
          <div className={`d-flx flx-center ${warning && 'mt-3'}`}>
            <a href="https://www.bitapps.pro/bit-form#pricing" target="_blank" className={css()} rel="noreferrer">
              <Btn size="md" width="150px" variant="primary" rounded>
                {__('Upgrade to Pro')}
              </Btn>

            </a>
          </div>
          <p>
            {__('Check out our')}
            <a href="https://form.bitapps.pro/demo/wp-login.php" className={css({ fw: 700 })} target="_blank" rel="noreferrer">
              {__(' Demo ')}
            </a>
            {__('to see what can you do with Pro version.')}
          </p>
        </div>
      </div>
    </Modal>

  )
}
