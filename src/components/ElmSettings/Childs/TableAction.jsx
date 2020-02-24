import React from 'react'
import { BitappsContext } from '../../../Utils/BitappsContext'

export default function TableAction(props) {
  const { confirmModal } = React.useContext(BitappsContext)
  const { confModal, setConfModal, hideConfModal } = confirmModal

  const showEditMdl = () => {
    props.edit(props.id)
  }

  const showDelMdl = () => {
    const del = { ...confModal }
    del.title = 'Delete'
    del.subTitle = 'Confirm Delete this Entry ?'
    console.log('props', props)
    del.yesAction = () => { props.del(props.id); hideConfModal() }
    del.show = true
    setConfModal(del)
  }

  const showDupMdl = () => {
    const dup = { ...confModal }
    dup.title = 'Duplicate'
    dup.subTitle = 'Duplicate this Entry ?'
    dup.yesAction = () => { props.dup(props.id); hideConfModal() }
    dup.show = true
    setConfModal(dup)
  }
  return (
    <div className="btcd-t-action-wrp flx">
      <div className="btcd-t-action">
        {'dup' in props && (
          <button onClick={showDupMdl} className="icn-btn btcd-hid-icn tooltip" style={{ '--tooltip-txt': '"Duplicate"' }} aria-label="action btn" type="button">
            <span className="btcd-icn btcd-icn-sm icn-file_copy" />
          </button>
        )}
        {'del' in props && (
          <button onClick={showDelMdl} className="icn-btn btcd-hid-icn tooltip" style={{ '--tooltip-txt': '"Delete"' }} aria-label="action btn" type="button">
            <span className="btcd-icn btcd-icn-sm icn-trash-fill" />
          </button>
        )}
        {'edit' in props && (
          <button onClick={showEditMdl} className="icn-btn btcd-hid-icn tooltip" style={{ '--tooltip-txt': '"Edit"' }} aria-label="action btn" type="button">
            <span className="btcd-icn btcd-icn-sm icn-document-edit" />
          </button>
        )}

        <button className="icn-btn btcd-ph-btn" aria-label="action btn" type="button">
          <span className="btcd-icn btcd-icn-sm icn-blue"><span><b>&#8230;</b></span></span>
        </button>
      </div>
    </div>
  )
}
