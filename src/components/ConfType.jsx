/* eslint-disable no-undef */
import React, { useState } from 'react'
import ConfMsg from './ConfMsg'
import RedirUrl from './RedirUrl'
import WebHooks from './WebHooks'
import bitsFetch from '../Utils/bitsFetch'

export default function ConfType(props) {
  console.log('%c $render ConfType', 'background:lightgreen;padding:3px;border-radius:5px;')

  const { formSettings, setFormSettings, formFields } = props
  const [pos, setPos] = useState(0)

  const removeIntegration = async (id, type = null) => {
    let action = 'bitforms_delete_form_integration'
    if (type && type === 'msg') {
      action = 'bitforms_delete_success_messsage'
    }
    let status = await bitsFetch({ formID: props.formID, id }, action)
    if (status !== undefined) {
      status = status.success
    } else {
      // if internet connection error than status will undefined and set null
      status = null
    }
    return status
  }

  return (
    <div className="mt-4 w-7">
      <h2>Confirmations</h2>
      <div>
        <button
          onClick={() => setPos(0)}
          className={`btcd-f-c-t-o ${pos === 0 && 'btcd-f-c-t-o-a'}`}
          type="button"
        >
          Success/Error Messages
        </button>
        <button
          onClick={() => setPos(1)}
          className={`btcd-f-c-t-o ${pos === 1 && 'btcd-f-c-t-o-a'}`}
          type="button"
        >
          Redirect Page
        </button>
        <button
          onClick={() => setPos(2)}
          className={`btcd-f-c-t-o ${pos === 2 && 'btcd-f-c-t-o-a'}`}
          type="button"
        >
          Web Hooks
        </button>
      </div>

      <div className="btcd-f-c-t-d">
        {pos === 0 && <ConfMsg formFields={formFields} formSettings={formSettings} setFormSettings={setFormSettings} removeIntegration={removeIntegration} />}
        {pos === 1 && <RedirUrl formFields={formFields} formSettings={formSettings} setFormSettings={setFormSettings} removeIntegration={removeIntegration} />}
        {pos === 2 && <WebHooks formSettings={formSettings} setFormSettings={setFormSettings} removeIntegration={removeIntegration} />}
      </div>
    </div>
  );
}
