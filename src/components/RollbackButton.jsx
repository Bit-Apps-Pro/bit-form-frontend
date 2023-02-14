import { useRef, useState } from 'react'
import { useFela } from 'react-fela'
import CheckMarkIcn from '../Icons/CheckMarkIcn'
import ut from '../styles/2.utilities'
import bitsFetch from '../Utils/bitsFetch'
import ConfirmModal from './Utilities/ConfirmModal'

const RollbackButton = () => {
  const { css } = useFela()
  const [showModal, setShowModal] = useState(false)
  const [showErr, setShowErr] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const confirmTxtBox = useRef(null)

  const handleConfirmTxt = e => {
    let { value } = e.target
    value = value.replace(/[^a-zA-Z]/g, '')
    value = value.toUpperCase()
    e.target.value = value
  }

  const handleMigrate = () => {
    const confirmTxt = confirmTxtBox.current.value
    if (confirmTxt !== 'CONFIRM') {
      setShowErr(true)
      return
    }
    window.onbeforeunload = () => true
    setIsLoading(true)
    setShowErr(false)
    sessionStorage.removeItem('btcd-fs')
    sessionStorage.removeItem('btcd-lc')
    sessionStorage.removeItem('btcd-rh')
    bitsFetch({}, 'bitforms_migrate_back_to_v1')
      .then(() => {
        window.onbeforeunload = null
        window.location.reload()
      })
  }

  return (
    <div className="migrate-wrp">
      <button type="button" className="migrate-btn red red-sh" onClick={() => setShowModal(true)}>Rollback to V1</button>
      <ConfirmModal
        show={showModal}
        close={!isLoading ? () => setShowModal(false) : null}
        title="Rollback?"
        btnTxt="Rollback Now"
        btnClass="blue"
        action={handleMigrate}
        isLoading={isLoading}
      >
        <div className="migrate-modal">
          <h3>Please Read First!</h3>
          <p>
            <CheckMarkIcn size={14} cls={css(ut.mr1)} />
            <span>The rollback process will restore everything to its state prior to the migration to Bit Form v2.</span>
          </p>
          <p>
            <CheckMarkIcn size={14} cls={css(ut.mr1)} />
            <span>Do not close the browser tab during the process.</span>
          </p>
          <p>
            <CheckMarkIcn size={14} cls={css(ut.mr1)} />
            <span>The process may take several minutes and will refresh the page after completion.</span>
          </p>
          <p>
            <CheckMarkIcn size={14} cls={css(ut.mr1)} />
            <span>After the rollback, you can choose to migrate to Bit Form v2 again.</span>
          </p>
          <small>Type &quot;CONFIRM&quot; in the input box below to proceed:</small>
          <input ref={confirmTxtBox} type="text" placeholder="Type CONFIRM" onChange={handleConfirmTxt} />
          {showErr && <p className="migrate-err">Check if you typed &quot;CONFIRM&quot; correctly.</p>}
        </div>
      </ConfirmModal>
    </div>
  )
}

export default RollbackButton
