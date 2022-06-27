import { __ } from "../i18nwrap"

// structure of the conditional logic list
// value: { label, fields: [field types of array to show], notFields: [field types of array to not show] }
// if fields & notFields are not given or empty array, it means show for all fields

const conditionalLogicsList = {
  equal: {
    label: __('Equal'),
    notFields: ['button']
  },
  not_equal: {
    label: __('Not Equal'),
    notFields: ['button']
  },
  null: {
    label: __('Is Null'),
    notFields: ['button']
  },
  not_null: {
    label: __('Is Not Null'),
    notFields: ['button']
  },
  contain: {
    label: __('Contain'),
    notFields: ['button', 'date', 'time', 'datetime', 'month', 'week']
  },
  contain_all: {
    label: __('Contain All'),
    fields: ['select']
  },
  not_contain: {
    label: __('Not Contain'),
    notFields: ['button', 'date', 'time', 'datetime', 'month', 'week']
  },
  greater: {
    label: __('Greater Than'),
    fields: ['number']
  },
  less: {
    label: __('Less Than'),
    fields: ['number']
  },
  greater_or_equal: {
    label: __('Greater Than or Equal'),
    fields: ['number']
  },
  less_or_equal: {
    label: __('Less Than or Equal'),
    fields: ['number']
  },
  start_with: {
    label: __('Start With'),
    notFields: ['button', 'color', 'url', 'password', 'email', 'date', 'time', 'datetime', 'month', 'week']
  },
  end_with: {
    label: __('End With'),
    notFields: ['button', 'color', 'url', 'password', 'email', 'date', 'time', 'datetime', 'month', 'week']
  },
  on_click: {
    label: __('On Click'),
    fields: ['button']
  }
}

export default conditionalLogicsList