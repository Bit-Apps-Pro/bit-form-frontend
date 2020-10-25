/* eslint-disable no-param-reassign */
import React, { useState } from 'react'
import MultiSelect from 'react-multiple-select-dropdown-lite'
import ConfirmModal from '../../ConfirmModal'
import TableCheckBox from '../../ElmSettings/Childs/TableCheckBox'
import Loader from '../../Loaders/Loader'
import { refreshOwners, refreshProducts } from './ZohoCreatorCommonFunc'

export default function ZohoCreatorActions({ creatorConf, setCreatorConf, formID, formFields, setSnackbar }) {
  const [isLoading, setisLoading] = useState(false)
  const [actionMdl, setActionMdl] = useState({ show: false })

  const actionHandler = (val, typ) => {
    const newConf = { ...creatorConf }
    if (typ === 'ticket_owner') {
      if (val !== '') {
        newConf.actions.ticket_owner = val
      } else {
        delete newConf.actions.ticket_owner
      }
    } else if (typ === 'product') {
      if (val !== '') {
        newConf.actions.product = val
      } else {
        delete newConf.actions.product
      }
    } else if (typ === 'attachments') {
      if (val !== '') {
        newConf.actions.attachments = val
      } else {
        delete newConf.actions.attachments
      }
    }

    setCreatorConf({ ...newConf })
  }

  console.log('creatorConf', creatorConf)

  const openRecOwnerModal = () => {
    if (!creatorConf.default?.owners?.[creatorConf.orgId]) {
      refreshOwners(formID, creatorConf, setCreatorConf, setisLoading, setSnackbar)
    }
    setActionMdl({ show: 'ticket_owner' })
  }

  const openProductModal = () => {
    if (!creatorConf.default?.products?.[creatorConf.department]) {
      refreshProducts(formID, creatorConf, setCreatorConf, setisLoading, setSnackbar)
    }
    setActionMdl({ show: 'product' })
  }

  const clsActionMdl = () => {
    setActionMdl({ show: false })
  }

  return (
    <div className="pos-rel">
      <div className="d-flx flx-wrp">
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <TableCheckBox onChange={openRecOwnerModal} checked={'ticket_owner' in creatorConf.actions} className="wdt-200 mt-4 mr-2" value="Ticket_Owner" title="Ticket Owner" subTitle="Add a owner to ticket pushed to Zoho Creator." />
          {!creatorConf.actions.ticket_owner && <small style={{ marginLeft: 30, marginTop: 10, color: 'red' }}>ticket owner is required</small>}
        </div>
        <TableCheckBox onChange={openProductModal} checked={'product' in creatorConf.actions} className="wdt-200 mt-4 mr-2" value="Product_Name" title="Product Name" subTitle="Add a product to ticket pushed to Zoho Creator." />
        <TableCheckBox onChange={() => setActionMdl({ show: 'attachments' })} checked={'attachments' in creatorConf.actions} className="wdt-200 mt-4 mr-2" value="Attachment" title="Attachments" subTitle="Add attachments from BitForm to ticket pushed to Zoho Creator." />
      </div>

      <ConfirmModal
        className="custom-conf-mdl"
        mainMdlCls="o-v"
        btnClass="blue"
        btnTxt="Ok"
        show={actionMdl.show === 'ticket_owner'}
        close={clsActionMdl}
        action={clsActionMdl}
        title="Ticket Owner"
      >
        <div className="btcd-hr mt-2" />
        {isLoading ? (
          <Loader style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 45,
            transform: 'scale(0.5)',
          }}
          />
        )
          : (
            <div className="flx flx-between mt-2">
              <select
                value={creatorConf.actions.ticket_owner}
                className="btcd-paper-inp"
                onChange={e => actionHandler(e.target.value, 'ticket_owner')}
              >
                <option value="">Select Owner</option>
                {creatorConf.default?.owners?.[creatorConf.orgId]?.map(owner => <option key={owner.ownerId} value={owner.ownerId}>{owner.ownerName}</option>)}
              </select>
              <button onClick={() => refreshOwners(formID, creatorConf, setCreatorConf, setisLoading, setSnackbar)} className="icn-btn sh-sm ml-2 mr-2 tooltip" style={{ '--tooltip-txt': '"Refresh Ticket Owners"' }} type="button" disabled={isLoading}>&#x21BB;</button>
            </div>
          )}
      </ConfirmModal>

      <ConfirmModal
        className="custom-conf-mdl"
        mainMdlCls="o-v"
        btnClass="blue"
        btnTxt="Ok"
        show={actionMdl.show === 'product'}
        close={clsActionMdl}
        action={clsActionMdl}
        title="Product Name"
      >
        <div className="btcd-hr mt-2" />
        {isLoading ? (
          <Loader style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 45,
            transform: 'scale(0.5)',
          }}
          />
        ) : (
            <div className="flx flx-between mt-2">
              <select
                value={creatorConf.actions.product}
                className="btcd-paper-inp"
                onChange={e => actionHandler(e.target.value, 'product')}
              >
                <option value="">Select Product</option>
                {creatorConf.default?.products?.[creatorConf.department]?.map(product => <option key={product.productId} value={product.productId}>{product.productName}</option>)}
              </select>
              <button onClick={() => refreshProducts(formID, creatorConf, setCreatorConf, setisLoading, setSnackbar)} className="icn-btn sh-sm ml-2 mr-2 tooltip" style={{ '--tooltip-txt': '"Refresh Products"' }} type="button" disabled={isLoading}>&#x21BB;</button>
            </div>
          )}
      </ConfirmModal>

      <ConfirmModal
        className="custom-conf-mdl"
        mainMdlCls="o-v"
        btnClass="blue"
        btnTxt="Ok"
        show={actionMdl.show === 'attachments'}
        close={clsActionMdl}
        action={clsActionMdl}
        title="Select Attachment"
      >
        <div className="btcd-hr mt-2" />
        <div className="mt-2">Select file upload fields</div>
        <MultiSelect
          defaultValue={creatorConf.actions.attachments}
          className="mt-2 w-9"
          onChange={(val) => actionHandler(val, 'attachments')}
          options={formFields.filter(itm => (itm.type === 'file-up')).map(itm => ({ label: itm.name, value: itm.key }))}
        />
      </ConfirmModal>
    </div>
  )
}
