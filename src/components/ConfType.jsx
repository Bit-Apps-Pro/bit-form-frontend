/* eslint-disable no-undef */
import { useState } from 'react';

import { __ } from '../Utils/i18nwrap';
import ConfMsg from './ConfMsg'
import RedirUrl from './RedirUrl'
import WebHooks from './WebHooks'
import bitsFetch from '../Utils/bitsFetch'

export default function ConfType(props) {
  const { formSettings, setFormSettings, formFields } = props
  const [pos, setPos] = useState(0)

  const removeIntegration = async (id, type = null) => {
    let action = 'bitforms_delete_integration'
    if (type && type === 'msg') {
      action = 'bitforms_delete_success_messsage'
    }
    let status = await bitsFetch({ formID: props.formID, id }, action)
    if (status !== undefined) {
      status = status.success
    } else if (status.data && status.data.data) {
      // if internet connection error than status will undefined and set null
      status = status.data.data
    } else {
      // if internet connection error than status will undefined and set null
      status = null
    }
    return status
  }

  return (
    <div className="mt-4" style={{ width: 900 }}>
      <h2>{__('Confirmations', 'bitform')}</h2>
      <div>
        <button
          onClick={() => setPos(0)}
          className={`btcd-f-c-t-o mr-4 sh-sm ${pos === 0 && 'btcd-f-c-t-o-a'}`}
          type="button"
        >
          {__('Success/Error Messages', 'bitform')}
        </button>
        <button
          onClick={() => setPos(1)}
          className={`btcd-f-c-t-o mr-4 sh-sm ${pos === 1 && 'btcd-f-c-t-o-a'}`}
          type="button"
        >
          {__('Redirect Page', 'bitform')}
        </button>
        <button
          onClick={() => setPos(2)}
          className={`btcd-f-c-t-o mr-4 sh-sm ${pos === 2 && 'btcd-f-c-t-o-a'}`}
          type="button"
        >
          {__('Web Hooks', 'bitform')}
        </button>
      </div>
      <br />
      <br />
      {pos === 0 && <ConfMsg formFields={formFields} formSettings={formSettings} setFormSettings={setFormSettings} removeIntegration={removeIntegration} />}
      {pos === 1 && <RedirUrl formFields={formFields} formSettings={formSettings} setFormSettings={setFormSettings} removeIntegration={removeIntegration} />}
      {pos === 2 && <WebHooks formFields={formFields} formSettings={formSettings} setFormSettings={setFormSettings} removeIntegration={removeIntegration} />}
    </div>
  );
}
