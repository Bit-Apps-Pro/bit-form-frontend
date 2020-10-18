/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */
import React, { createContext, useReducer } from 'react'

const AllFormsDispatchHandler = (allForms, action) => {
  switch (action.type) {
    case 'add':
      return [...allForms, action.data]
    case 'remove': {
      allForms.splice(action.data, 1)
      return [...allForms];
    }
    case 'update': {
      allForms.map(form => {
        if (form.formID === action.data.formID) {
          Object.entries(action.data).forEach(([field, fieldV]) => {
            form[field] = action.data[field]
          })
        }
        return null
      })
      return [...allForms]
    }
    case 'set': {
      allForms = typeof action.data === 'undefined' ? [] : action.data
      return [...allForms]
    }
    default:
      break
  }
  return null
}
const reportsReducer = (reports, action) => {
  switch (action.type) {
    case 'add':
      return [...reports, action.report]
    case 'remove': {
      reports.splice(action.rport, 1)
      return [...reports];
    }
    case 'update': {
      const oldReports = [...reports]
      oldReports[action.reportID] = action.report
      return [...oldReports]
    }
    case 'set': {
      reports = typeof action.reports === 'undefined' ? [] : action.reports
      return [...reports]
    }
    default:
      break
  }
  return null
}

const AllFormContext = createContext()

const AllFormContextProvider = (props) => {
  let allFormsInitialState = []
  // eslint-disable-next-line no-undef
  if (!Object.prototype.hasOwnProperty.call(process.env, 'PUBLIC_URL')
    && typeof bits !== 'undefined'
    && bits.allForms !== null) {
    allFormsInitialState = bits.allForms.map(form => ({ formID: form.id, status: form.status !== '0', formName: form.form_name, shortcode: `bitform id='${form.id}'`, entries: form.entries, views: form.views, conversion: form.entries === 0 ? 0.00 : ((form.entries / (form.views === '0' ? 1 : form.views)) * 100).toPrecision(3), created_at: form.created_at }))
  }
  const [allForms, allFormsDispatchHandler] = useReducer(AllFormsDispatchHandler, allFormsInitialState)
  const [reports, reportsDispatch] = useReducer(reportsReducer, [])

  return (
    <AllFormContext.Provider
      value={{
        allFormsData: { allForms, allFormsDispatchHandler },
        reportsData: { reports, reportsDispatch },
      }}
    >
      {props.children}
    </AllFormContext.Provider>
  )
}

export { AllFormContext, AllFormContextProvider }
