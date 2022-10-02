import confirmMsgCssStyles from '../../../components/ConfirmMessage/confirmMsgCssStyles'
import { msgDefaultConfig } from '../../../components/style-new/styleHelpers'
import themeProvider from '../../../components/style-new/themes/0_themeProvider'

import { mergeNestedObj } from '../../globalHelpers'
import blankTemplate from './blankTemplate'

export default function templateProvider(templateSlug, formId) {
  let templateData = {}

  if (templateSlug.replace(/\s+/g, '_').toLowerCase() === 'contact_form') {
    // contact form template
  } else {
    templateData = blankTemplate
  }

  const { name, fields, layouts, conditions, confirmations, theme: themeSlug } = templateData

  // merge default layouts
  layouts.md = mergeNestedObj(layouts.lg, layouts.md)
  layouts.sm = mergeNestedObj(layouts.lg, layouts.md, layouts.sm)

  const fldKeys = Object.keys(fields)
  const fieldsWithKey = {}
  const layoutsWithKey = { lg: [], md: [], sm: [] }
  const confirmationsWithId = mergeNestedObj(defaultConfirmations(formId), confirmations || {})
  const defaultConditionsVal = [...defaultConditions(), ...(conditions || [])]

  fldKeys.forEach((fldKey, i) => {
    const newKey = `b${formId}-${i + 1}`
    const fldData = fields[fldKey]
    fieldsWithKey[newKey] = fldData
    const lgLayoutData = layouts.lg.find(lay => lay.i === fldKey)
    const mdLayoutData = layouts.md.find(lay => lay.i === fldKey)
    const smLayoutData = layouts.sm.find(lay => lay.i === fldKey)

    layoutsWithKey.lg.push({ ...lgLayoutData, i: newKey })
    layoutsWithKey.md.push({ ...mdLayoutData, i: newKey })
    layoutsWithKey.sm.push({ ...smLayoutData, i: newKey })
  })

  const fieldsAtrr = Object.entries(fieldsWithKey)
  const { themeColors, themeVars, styles } = themeProvider(themeSlug, fieldsAtrr, formId)

  return {
    name,
    fields: fieldsWithKey,
    layouts: layoutsWithKey,
    confirmations: confirmationsWithId,
    conditions: defaultConditionsVal,
    allThemeColors: themeColors,
    allThemeVars: themeVars,
    allStyles: styles,
  }
}

function defaultConfirmations(formID) {
  const { msgType, position, animation, autoHide, duration, styles } = msgDefaultConfig

  return {
    type: {
      successMsg: [{
        title: 'Untitled Message 1',
        msg: '<p>Successfully Submitted.</p>',
        config: {
          msgType,
          position,
          animation,
          autoHide,
          duration,
          styles,
          stylesObj: confirmMsgCssStyles(formID, 0, msgType, position, animation, styles),
        },
      }],
      redirectPage: [{ title: 'Untitled Redirect Url 1', url: '' }],
      webHooks: [{ title: 'Untitled Webhook 1', url: '', method: 'GET' }],
    },
  }
}

export const defaultConds = {
  cond_type: 'if',
  logics: [
    {
      field: '',
      logic: '',
      val: '',
    },
    'or',
    {
      field: '',
      logic: '',
      val: '',
    },
  ],
  actions: {
    fields: [
      {
        field: '',
        action: 'value',
      },
    ],
    success: [
      {
        type: 'successMsg',
        details: { id: '{"index":0}' },
      },
    ],
  },
}

function defaultConditions() {
  return ([
    {
      title: 'Show Success Message',
      action_type: 'onsubmit',
      action_run: 'create_edit',
      action_behaviour: 'always',
      conditions: [defaultConds],
    },
  ])
}
