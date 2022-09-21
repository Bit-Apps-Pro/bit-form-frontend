import { checkLogic } from './checkLogic'
import { setActions } from './setActions'

const getFieldKeyByFldName = (fldName, fields) => Object.keys(fields).find(key => fields[key].fieldName === fldName)

const generateFieldName = fldName => (fldName.slice(-2) === '[]' ? fldName.slice(0, fldName.length - 2) : fldName)

const getAllFieldsValueFromForm = (form, props) => {
  const formData = new FormData(form)
  const { fields } = props
  const formEntries = {}
  const entries = Array.from(formData.entries())
  entries.forEach(([key, value]) => {
    const fldKey = getFieldKeyByFldName(generateFieldName(key), fields)
    if (!(fldKey in fields)) return
    if (formEntries[fldKey]) {
      if (!Array.isArray(formEntries[fldKey])) formEntries[fldKey] = [formEntries[fldKey]]
      formEntries[fldKey].push(value)
    } else formEntries[fldKey] = value
  })

  return Object.entries(formEntries).reduce((acc, [key, value]) => ({ ...acc, [key]: { value, type: fields[key].typ, multiple: Array.isArray(value) } }), {})
}

export default function onBlurHandler(event) {
  if (!event?.target?.form) return

  const element = event.target
  const { form } = event.target
  const contentId = form.id.replace('form-', '')
  const props = window.bf_globals?.[contentId]

  if (!props) return

  const targetFieldName = generateFieldName(element.name)

  const fldKey = getFieldKeyByFldName(targetFieldName, props.fields)

  if (!fldKey) return

  const fieldValues = getAllFieldsValueFromForm(form, props)

  // Logics Part
  const condsStatus = []

  const { onfieldCondition } = props

  if (!onfieldCondition) return

  const oninputConds = onfieldCondition.filter(cond => cond.event_type === 'on_input')

  const oninputCondsForTargetField = oninputConds.filter(cond => cond.conditions.some(c => c?.logics?.some(lgc => lgc.field === fldKey)))

  if (!oninputCondsForTargetField.length) return

  oninputCondsForTargetField.forEach((workflow, workflowIndx) => {
    const { conditions } = workflow
    for (let condIndx = 0; condIndx < conditions.length; condIndx += 1) {
      const condition = conditions[condIndx]
      let logicStatus = false
      if (['if', 'else-if'].includes(condition.cond_type)) {
        const { logics } = condition
        logicStatus = checkLogic(logics, fieldValues, props)
        if (logicStatus) {
          condsStatus.push({ workflowIndx, condIndx, logicStatus: logicStatus ? 1 : 0 })
          break
        }
      }
      condsStatus.push({ workflowIndx, condIndx, logicStatus: logicStatus ? 1 : 0 })
    }
  })

  // Actions Part
  const alreadySetActions = {}

  condsStatus.reverse()

  condsStatus.forEach(({ workflowIndx, condIndx, logicStatus }) => {
    const { conditions } = oninputCondsForTargetField[workflowIndx]
    const elseActions = conditions.find(cond => cond.cond_type === 'else') || {}
    const condActions = logicStatus ? conditions[condIndx].actions : elseActions.actions
    condActions?.fields?.forEach(actionDetail => {
      if (!alreadySetActions[actionDetail.field]) {
        alreadySetActions[actionDetail.field] = []
      }
      if (!alreadySetActions[actionDetail.field].includes(actionDetail.action)) {
        alreadySetActions[actionDetail.field].push(actionDetail.action)
        const smartFields = Object.entries(props.smartTags).reduce((acc, [key, value]) => ({ ...acc, [`\${${key}}`]: { value, type: 'text', multiple: false } }), {})
        setActions(actionDetail, fldKey, props, { ...fieldValues, ...smartFields })
      }
    })
  })
}
