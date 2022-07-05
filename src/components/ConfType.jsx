/* eslint-disable no-undef */

import toast from 'react-hot-toast'
import { NavLink, Route, Switch, useRouteMatch } from 'react-router-dom'
import bitsFetch from '../Utils/bitsFetch'
import { __ } from '../Utils/i18nwrap'
import ConfMsg from './ConfirmMessage/ConfMsg'
import RedirUrl from './RedirUrl'
import WebHooks from './WebHooks'

export default function ConfType({ formID }) {
  const { path } = useRouteMatch()
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

  return (
    <div className="mt-4" style={{ width: 900 }}>
      <h2>{__('Confirmations')}</h2>
      <div>
        <NavLink exact to={`/form/settings/edit/${formID}/confirmations`} className="btcd-f-c-t-o mr-4 sh-sm" activeClassName="btcd-f-c-t-o-a">
          {__('Success/Error Messages')}
        </NavLink>
        <NavLink to={`/form/settings/edit/${formID}/confirmations/redirect-url`} className="btcd-f-c-t-o mr-4 sh-sm" activeClassName="btcd-f-c-t-o-a">
          {__('Redirect Page')}
        </NavLink>
        <NavLink to={`/form/settings/edit/${formID}/confirmations/webhooks`} className="btcd-f-c-t-o mr-4 sh-sm" activeClassName="btcd-f-c-t-o-a">
          {__('Web Hooks')}
        </NavLink>
      </div>
      <br />
      <br />
      <Switch>
        <Route exact path={path}>
          <ConfMsg removeIntegration={removeIntegration} />
        </Route>
        <Route path={`${path}/:redirect-url`}>
          <RedirUrl removeIntegration={removeIntegration} />
        </Route>
        <Route path={`${path}/:webhooks`}>
          <WebHooks removeIntegration={removeIntegration} />
        </Route>
      </Switch>
    </div>
  )
}
