import confirmMsgCssStyles from '../../../components/ConfirmMessage/confirmMsgCssStyles'
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
  const msgType = 'snackbar'
  const position = 'bottom-right'
  const animation = 'fade'
  const autoHide = true
  const duration = 5
  const styles = {
    width: '300px',
    padding: '5px 35px 5px 20px',
    color: '#000000',
    background: '#fafafa',
    borderWidth: '1px',
    borderType: 'solid',
    borderColor: 'gray',
    borderRadius: '10px',
    boxShadow: [{ x: '0px', y: '27px', blur: '30px', spread: '', color: 'rgb(0 0 0 / 18%)', inset: '' },
      { x: '0px', y: '5.2px', blur: '9.4px', spread: '5px', color: 'rgb(0 0 0 / 6%)', inset: '' },
      { x: '0px', y: '11.1px', blur: '14px', spread: '', color: 'rgb(0 0 0 / 14%)', inset: '' }],
    closeBackground: '#48484829',
    closeHover: '#dfdfdf',
    closeIconColor: '#5a5a5a',
    closeIconHover: '#000',
  }
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

function defaultConditions() {
  return ([
    {
      title: 'Show Success Message',
      action_type: 'onsubmit',
      action_run: 'create_edit',
      action_behaviour: 'always',
      conditions: [
        {
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
        },
      ],
    },
  ])
}
