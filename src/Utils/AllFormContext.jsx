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

const AllFormContext = createContext()

const AllFormContextProvider = (props) => {
  let allFormsInitialState = []
  // eslint-disable-next-line no-undef
  if (process.env.NODE_ENV === 'production' && bits.allForms !== null) {
    allFormsInitialState = bits.allForms.map(form => ({ formID: form.id, status: form.status !== '0', formName: form.form_name, shortcode: `bitapps id='${form.id}'`, entries: form.entries, views: form.views, conversion: ((form.entries / (form.views === '0' ? 1 : form.views)) * 100).toPrecision(3), created_at: form.created_at }))
  }
  const [allForms, allFormsDispatchHandler] = useReducer(AllFormsDispatchHandler, allFormsInitialState)

  return (
    <AllFormContext.Provider
      value={{
        allFormsData: { allForms, allFormsDispatchHandler },
      }}
    >
      {props.children}
    </AllFormContext.Provider>
  )
}

export { AllFormContext, AllFormContextProvider }
