/* eslint-disable no-undef */
import React, { useState } from 'react'
import ConfMsg from './ConfMsg'
import RedirUrl from './RedirUrl'
import WebHooks from './WebHooks'

export default function ConfType(props) {
  console.log('%c $render FormSettings', 'background:lightgreen;padding:3px;border-radius:5px;')

  const { formSettings, setFormSettings, formFields } = props

  const [pos, setPos] = useState(0)
  const [formFields, setformFields] = useState(null)

  useEffect(() => {
    let mount = false
    mount = true
    bitsFetch({ id: props.formID }, 'bitapps_get_form_entry_count')
      .then(res => {
        if (res !== undefined && res.success) {
          if (mount) {
            setformFields(res.data.Labels)
          }
        }
      })
    return function cleanup() { mount = false }
  }, [])
  const removeIntegration = (id, type = null) => {
    let action = 'bitapps_delete_form_integration'
    if (type && type === 'msg') {
      action = 'bitapps_delete_success_messsage'
    }
    const status = bitsFetch({ formID: props.formID, id }, action)
      .then(res => {
        if (res !== undefined && res.success) {
          return true
        }
        return false
      })

    return status

  }
  return (
    <div className="btcd-f-c-t">
      <div><b>Confirmation Type:</b></div>
      <div>
        <button
          onClick={() => setPos(0)}
          className={`btcd-f-c-t-o ${pos === 0 && 'btcd-f-c-t-o-a'}`}
          type="button"
        >
          Messages
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
