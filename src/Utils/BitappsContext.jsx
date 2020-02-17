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
          form.formName = action.data.formName
        }
      })
      return [...allForms]
    }
    case 'set': {
      allForms = typeof action.data === 'undefined' ? [] : action.data
      console.log(allForms)
      return [...allForms]
    }
    default:
      break
  }
}

const BitappsContext = createContext()

const BitappsContextProvider = (props) => {
  let allFormsInitialState = [
    { formID: 333, status: 0, formName: 'member', shortcode: 'test', entries: 23, views: 79, conversion: 96, created_at: '2 Dec' },
    { formID: 111, status: 1, formName: 'lace', shortcode: 'guitar', entries: 5, views: 38, conversion: 57, created_at: '2 Dec' },
    { formID: 222, status: 1, formName: 'toys', shortcode: 'camp', entries: 12, views: 75, conversion: 28, created_at: '2 Dec' },
    { formID: 123, status: 0, formName: 'girlfriend', shortcode: 'yard', entries: 0, views: 89, conversion: 89, created_at: '2 Dec' },
    { formID: 123, status: 0, formName: 'environment', shortcode: 'love', entries: 20, views: 65, conversion: 67, created_at: '2 Dec' },
    { formID: 123, status: 0, formName: 'bread', shortcode: 'bait', entries: 21, views: 26, conversion: 47, created_at: '2 Dec' },
    { formID: 123, status: 0, formName: 'farm', shortcode: 'bone', entries: 8, views: 85, conversion: 80, created_at: '2 Dec' },
    { formID: 123, status: 0, formName: 'location', shortcode: 'string', entries: 19, views: 3, conversion: 14, created_at: '2 Dec' },
    { formID: 123, status: 0, formName: 'conclusion', shortcode: 'story', entries: 16, views: 84, conversion: 18, created_at: '2 Dec' },
    { formID: 123, status: 0, formName: 'shirt', shortcode: 'rain', entries: 20, views: 66, conversion: 3, created_at: '2 Dec' },
    { formID: 123, status: 0, formName: 'singer', shortcode: 'leader', entries: 10, views: 75, conversion: 82, created_at: '2 Dec' },
    { formID: 123, status: 0, formName: 'year', shortcode: 'recording', entries: 26, views: 81, conversion: 82, created_at: '2 Dec' },
    { formID: 123, status: 0, formName: 'point', shortcode: 'ear', entries: 5, views: 35, conversion: 88, created_at: '2 Dec' },
    { formID: 123, status: 0, formName: 'attack', shortcode: 'rail', entries: 25, views: 46, conversion: 85, created_at: '2 Dec' },
    { formID: 123, status: 0, formName: 'development', shortcode: 'carriage', entries: 6, views: 45, conversion: 83, created_at: '2 Dec' },
    { formID: 123, status: 0, formName: 'fog', shortcode: 'letter', entries: 6, views: 43, conversion: 59, created_at: '2 Dec' },
    { formID: 123, status: 0, formName: 'boot', shortcode: 'yam', entries: 16, views: 20, conversion: 9, created_at: '2 Dec' },
    { formID: 123, status: 0, formName: 'governor', shortcode: 'difficulty', entries: 1, views: 51, conversion: 5, created_at: '2 Dec' },
    { formID: 123, status: 0, formName: 'worker', shortcode: 'wilderness', entries: 4, views: 92, conversion: 11, created_at: '2 Dec' },
    { formID: 123, status: 0, formName: 'emphasis', shortcode: 'stream', entries: 7, views: 5, conversion: 51, created_at: '2 Dec' },
    { formID: 123, status: 0, formName: 'currency', shortcode: 'pain', entries: 15, views: 7, conversion: 85, created_at: '2 Dec' },
  ]
  // eslint-disable-next-line no-undef
  if (process.env.NODE_ENV === 'production' && bits.allForms !== null) {
    allFormsInitialState = bits.allForms.map(form => ({ formID: form.id, status: form.status !== '0', formName: form.form_name, shortcode: `bitapps id='${form.id}'`, entries: form.entries, views: form.views, conversion: ((form.entries / (form.views === '0' ? 1 : form.views)) * 100).toPrecision(3), created_at: form.created_at }))
  }
  const [allForms, allFormsDispatchHandler] = useReducer(AllFormsDispatchHandler, allFormsInitialState)
  return (
    <BitappsContext.Provider
      value={{
        allFormsData: { allForms, allFormsDispatchHandler },
      }}
    >
      {props.children}
    </BitappsContext.Provider>
  )
}

export { BitappsContext, BitappsContextProvider }
