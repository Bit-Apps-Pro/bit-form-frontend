/* eslint-disable no-undef */

import toast from 'react-hot-toast'
import { NavLink, Route, Routes } from 'react-router-dom'
import bitsFetch from '../Utils/bitsFetch'
import { __ } from '../Utils/i18nwrap'
import ConfMsg from './ConfirmMessage/ConfMsg'
import RedirUrl from './RedirUrl'
import WebHooks from './WebHooks'

export default function ConfType({ formID, formType }) {
  // const { path } = useMatch()
  const path = `/form/settings/${formType}/${formID}/confirmations`
  const removeIntegration = async (id, type = null) => {
    let action = 'bitforms_delete_integration'
    if (type && type === 'msg') {
      action = 'bitforms_delete_success_messsage'
    }
    let status = await bitsFetch({ formID, id }, action)
    if (status !== undefined) {
      status = status.success
      toast.success('Deleted Successfully')
    } else if (status.data && status.data.data) {
      // if internet connection error than status will undefined and set null
      status = status.data.data
      toast.error(`Delete failed. Cause: ${status.data.data}`)
    } else {
      // if internet connection error than status will undefined and set null
      status = null
    }
    return status
  }
  const activeClasses = (isActive) => (isActive ? 'btcd-f-c-t-o mr-4 sh-sm btcd-f-c-t-o-a' : 'btcd-f-c-t-o mr-4 sh-sm')

  return (
    <div className="mt-4" style={{ width: 900 }}>
      <h2>{__('Confirmations')}</h2>
      <div>
        <NavLink to={path} className={({ isActive }) => activeClasses(isActive)}>
          {__('Success/Error Messages')}
        </NavLink>
        <NavLink to={`${path}/redirect-url`} className={({ isActive }) => activeClasses(isActive)}>
          {__('Redirect Page')}
        </NavLink>
        <NavLink to={`${path}/webhooks`} className={({ isActive }) => activeClasses(isActive)}>
          {__('Web Hooks')}
        </NavLink>
      </div>
      <br />
      <br />
      <Routes>
        <Route index element={<ConfMsg removeIntegration={removeIntegration} />} />
        <Route path="redirect-url" element={<RedirUrl removeIntegration={removeIntegration} />} />
        <Route path="webhooks" element={<WebHooks removeIntegration={removeIntegration} />} />
      </Routes>
    </div>
  )
}
