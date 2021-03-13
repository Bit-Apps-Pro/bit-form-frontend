// eslint-disable-next-line import/no-extraneous-dependencies
import { __ } from '@wordpress/i18n'
import { useState } from 'react'
import bitsFetch from '../../../Utils/bitsFetch'
import ConfirmModal from '../../ConfirmModal'
import DropDown from '../../ElmSettings/Childs/DropDown'
import TableCheckBox from '../../ElmSettings/Childs/TableCheckBox'
import Modal from '../../Modal'

export default function WooCommerceProductActions({ wcConf, setWcConf, formFields }) {
  const [actionMdl, setActionMdl] = useState({ show: false })

  const handleActionInput = (type, value) => {
    const newConf = { ...wcConf }
    if (!newConf.actions.product) newConf.actions.product = {}
    if (value) {
      newConf.actions.product[type] = value
    } else {
      delete newConf.actions.product[type]
    }
    setWcConf(newConf)
  }

  return (
    <div className="pos-rel">
      <div className="d-flx flx-wrp">
        <TableCheckBox
          className="wdt-200 mt-4 mr-2"
          value="price"
          title={__('Downloadable', 'bitofrm')}
          subTitle={__('Downloadable products give access to a file upon purchase.', 'bitform')}
          checked={wcConf.actions?.product?.downloadable || false}
          onChange={() => setActionMdl({ show: 'downloadable' })}
        />
      </div>

      <ConfirmModal
        className="custom-conf-mdl"
        mainMdlCls="o-v"
        btnClass="blue"
        btnTxt={__('Ok', 'bitform')}
        show={actionMdl.show === 'downloadable'}
        close={() => setActionMdl({ show: false })}
        action={() => setActionMdl({ show: false })}
        title={__('Downloadable Product', 'bitform')}
      >
        <DropDown
          action={val => handleActionInput('downloadable', val)}
          value={wcConf.actions?.product?.downloadable}
          title={<span className="f-m">{__('Select File Upload Fields', 'bitform')}</span>}
          titleClassName="w-10 mt-2"
          placeholder={__('Select Fields', 'bitform')}
          className="w-a"
          options={formFields.filter(fld => fld.type === 'file-up').map(fl => ({ label: fl.name, value: fl.key }))}
          isMultiple
        />
      </ConfirmModal>
    </div>
  )
}