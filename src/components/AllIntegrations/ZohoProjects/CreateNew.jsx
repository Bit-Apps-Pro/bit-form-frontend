import React from 'react'
import ZohoProjectsActions from './ZohoProjectsActions'
import { refreshFields } from './ZohoProjectsCommonFunc'
import ZohoProjectsFieldMap, { addFieldMap } from './ZohoProjectsFieldMap'

export default function CreateNew({ event, projectsConf, setProjectsConf, formID, formFields, isLoading, setisLoading, setSnackbar }) {
  const removeSubEvent = () => {
    const newConf = { ...projectsConf }
    newConf.subEvent.splice(newConf.subEvent.indexOf(event), 1)
    setProjectsConf({ ...newConf })
  }
  return (
    <div id={event}>
      <div className="mt-4">
        <div className="d-flx flx-between">
          <div>
            <b className="wdt-100">
              Create a
              {` ${event.charAt(0).toUpperCase() + event.slice(1)}`}
            </b>
            <button onClick={() => refreshFields(formID, projectsConf, setProjectsConf, setisLoading, setSnackbar, event)} className="icn-btn sh-sm ml-2 mr-2 tooltip" style={{ '--tooltip-txt': '"Refresh Fields"' }} type="button" disabled={isLoading}>&#x21BB;</button>
          </div>
          {projectsConf.event !== event && <button onClick={removeSubEvent} className="icn-btn sh-sm ml-2 mr-2" type="button"><span className="btcd-icn icn-trash-2" /></button>}
        </div>
      </div>
      <div className="btcd-hr mt-1" />
      <div className="flx flx-around mt-2 mb-1">
        <div className="txt-dp"><b>Form Fields</b></div>
        <div className="txt-dp"><b>Zoho Fields</b></div>
      </div>

      {projectsConf.field_map?.[event]?.map((itm, i) => (
        <ZohoProjectsFieldMap
          key={`projects-m-${i + 9}`}
          i={i}
          event={event}
          field={itm}
          projectsConf={projectsConf}
          formFields={formFields}
          setProjectsConf={setProjectsConf}
        />
      ))}
      <div className="txt-center  mt-2" style={{ marginRight: 85 }}><button onClick={() => addFieldMap(projectsConf.field_map[event].length, projectsConf, setProjectsConf, event)} className="icn-btn sh-sm" type="button">+</button></div>
      <br />
      <br />
      <div className="mt-4"><b className="wdt-100">{`${event.charAt(0).toUpperCase() + event.slice(1)}`} Actions</b></div>
      <div className="btcd-hr mt-1" />

      <ZohoProjectsActions
        event={event}
        projectsConf={projectsConf}
        setProjectsConf={setProjectsConf}
        formID={formID}
        formFields={formFields}
        setSnackbar={setSnackbar}
      />
      <br/>
      <br/>
    </div>
  )
}
