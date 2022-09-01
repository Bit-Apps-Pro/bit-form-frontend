import { __ } from '../i18nwrap'

// structure of the conditional logic list
// value: { label, fields: [field types of array to show], notFields: [field types of array to not show] }
// if fields & notFields are not given or empty array, it means show for all fields

const conditionalLogicsList = {
  equal: {
    label: __('Equal'),
    notFields: ['button'],
  },
  not_equal: {
    label: __('Not Equal'),
    notFields: ['button', 'user'],
  },
  null: {
    label: __('Is Null'),
    notFields: ['button','user'],
  },
  not_null: {
    label: __('Is Not Null'),
    notFields: ['button', 'user'],
  },
  contain: {
    label: __('Contain'),
    notFields: ['button', 'date', 'time', 'datetime-local', 'month', 'week', 'user'],
  },
  contain_all: {
    label: __('Contain All'),
    fields: ['select'],
  },
  not_contain: {
    label: __('Not Contain'),
    notFields: ['button', 'date', 'time', 'datetime-local', 'month', 'week', 'user'],
  },
  greater: {
    label: __('Greater Than'),
    fields: ['number', 'date', 'time', 'datetime-local'],
  },
  less: {
    label: __('Less Than'),
    fields: ['number', 'date', 'time', 'datetime-local'],
  },
  greater_or_equal: {
    label: __('Greater Than or Equal'),
    fields: ['number', 'date', 'time', 'datetime-local'],
  },
  less_or_equal: {
    label: __('Less Than or Equal'),
    fields: ['number', 'date', 'time', 'datetime-local'],
  },
  start_with: {
    label: __('Start With'),
    notFields: ['button', 'color', 'url', 'password', 'email', 'date', 'time', 'datetime-local', 'month', 'week','user'],
  },
  end_with: {
    label: __('End With'),
    notFields: ['button', 'color', 'url', 'password', 'email', 'date', 'time', 'datetime-local', 'month', 'week','user'],
  },
  between: {
    label: __('Between'),
    fields: ['number', 'date', 'time', 'datetime-local'],
  },
  on_click: {
    label: __('On Click'),
    fields: ['button.btnTyp:button'],
  },
}

export default conditionalLogicsList
