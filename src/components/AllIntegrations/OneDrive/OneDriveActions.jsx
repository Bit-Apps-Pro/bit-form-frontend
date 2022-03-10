/* eslint-disable max-len */
/* eslint-disable no-param-reassign */

import { useEffect, useState } from 'react'
import MultiSelect from 'react-multiple-select-dropdown-lite'
import { __ } from '../../../Utils/i18nwrap'
import TableCheckBox from '../../Utilities/TableCheckBox'
import Loader from '../../Loaders/Loader'
import Modal from '../../Utilities/Modal'

export default function OneDriveActions({ oneDriveConf, setOneDriveConf, formFields, formID, setSnackbar }) {
  const folder = oneDriveConf.folderMap ? oneDriveConf.folderMap[0] : oneDriveConf.folder
  const [isLoading, setisLoading] = useState(false)
  const [actionMdl, setActionMdl] = useState({ show: false })

  const actionHandler = (val, typ, share) => {
    const newConf = { ...oneDriveConf }
    if (typ === 'create_folder') {
      if (val.target.checked) {
        newConf.actions.create_folder = { name: '', suffix: false }
      } else {
        delete newConf.actions.create_folder
        delete newConf.actions.share.folder
      }
    } else if (typ === 'attachments') {
      if (val !== '') {
        newConf.actions.attachments = val
        clsActionMdl()
      } else {
        delete newConf.actions.attachments
        delete newConf.actions.share.file
      }
    }

    setOneDriveConf({ ...newConf })
  }

  const clsActionMdl = () => {
    setActionMdl({ show: false })
  }

  const openUploadFileMdl = () => {
    if (!oneDriveConf.actions?.share) oneDriveConf.actions.share = {}

    if (!oneDriveConf.actions?.share?.file) {
      oneDriveConf.actions.share.file = {
        permissions: [
          { email: '', access: '34', accessLabel: 'View' },
          { email: '', access: '5', accessLabel: 'Edit' },
          { email: '', access: '4', accessLabel: 'Share' },
          { email: '', access: '6', accessLabel: 'View and Comment' },
        ],
        mail: 'false',
      }
    }

    setActionMdl({ show: 'attachments' })
  }

  const getFileUpFields = () => formFields.filter(itm => (itm.type === 'file-up')).map(itm => ({ label: itm.lbl, value: itm.key }))

  return (
    <div className="pos-rel">
      <div className="pos-rel d-flx flx-col w-8">
        <TableCheckBox onChange={openUploadFileMdl} checked={'attachments' in oneDriveConf.actions} className="wdt-200 mt-4 mr-2" value="Attachment" title={__('Upload Files', 'bit-integration-pro')} subTitle={__('Add attachments from Bit-integration-pro to OneDrive folder.', 'bit-integration-pro')} />
        <small style={{ marginLeft: 30, marginTop: 10, color: 'red', fontWeight: 'bold' }}>{__('This Required', 'bit-integrations')}</small>
      </div>

      <Modal
        md
        show={actionMdl.show === 'attachments'}
        setModal={clsActionMdl}
        title={__('Select Attachment', 'bit-integration-pro')}
      >
        <div className="o-a" style={{ height: '95%' }}>
          <div className="mt-2">{__('Select file upload fields', 'bit-integration-pro')}</div>
          <MultiSelect
            defaultValue={oneDriveConf.actions.attachments}
            className="mt-2 w-5"
            options={getFileUpFields()}
            onChange={(val) => actionHandler(val, 'attachments')}
          />

        </div>
      </Modal>

    </div>
  )
}
