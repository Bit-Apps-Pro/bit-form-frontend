import { getRecoil } from 'recoil-nexus';
import { $fields } from '../../GlobalStates/GlobalStates';
import { SmartTagField } from './SmartTagField';

const fields = getRecoil($fields)
const generateFldName = fld => (fld.lbl || fld.adminLbl || fld.txt || fldKey)
const generateFieldsOpts = () => Object.entries(fields).map(([fldKey, fldData]) => ({ lbl: generateFldName(fldData), val: `${fldKey}` }))
const generateSmartTagOpts = () => SmartTagField.map(({ name, label }) => ({ lbl: label, val: `window.bf_globals['${name}']` }))
// first character capital
const firstCharCap = str => str.charAt(0).toUpperCase() + str.slice(1)
const generateEventCodeForFld = eventTyp => `// On Field ${firstCharCap(eventTyp)}
document.querySelector(fieldKey).addEventListener('${eventTyp}', event => {
  // Write your code here
})`
const generateEventChild = eventTyp => ({ lbl: `On ${firstCharCap(eventTyp)}`, val: generateEventCodeForFld(eventTyp) })

export const jsPredefinedCodeList = [
  {
    type: 'group-opts',
    name: 'Global Variables',
    childs: [
      {
        lbl: 'Form ID',
        val: `window.bf_globals['formId']`
      },
      ...generateSmartTagOpts()
    ]
  },
  {
    type: 'group-opts',
    name: 'Field Keys',
    childs: [
      ...generateFieldsOpts()
    ]
  },
  {
    type: 'group-opts',
    name: 'Form Events',
    childs: [
      {
        lbl: 'On Form Submit Success',
        val: `// On Form Submit Success
document.querySelector(window.bf_globals['formId']).addEventListener('bf-form-submit-success', ({formId, entryId, formData}) => {
\t// Write your code here...
})`
      },
      {
        lbl: 'On Form Submit Error',
        val: `// On Form Submit Error
document.querySelector(window.bf_globals['formId']).addEventListener('bf-form-submit-error', ({formId, errors}) => {
\t// Write your code here...
})`
      },
      {
        lbl: 'On Form Reset',
        val: `// On Form Reset
document.querySelector(window.bf_globals['formId']).addEventListener('bf-form-reset', ({formId}) => {
\t// Write your code here...
})`
      },
      {
        lbl: 'On Form Validation Error',
        val: `// On Form Validation Error
document.querySelector(window.bf_globals['formId']).addEventListener('bf-form-validation-error', ({formId, fieldId, error}) => {
\t// Write your code here...
})`
      },
    ]
  },
  {
    type: 'group-title',
    name: 'Field Events'
  },
  {
    type: 'group-accordion',
    name: 'Text Field',
    childs: [
      generateEventChild('change'),
      generateEventChild('input'),
      generateEventChild('blur'),
      generateEventChild('focus'),
    ]
  },
  {
    type: 'group-accordion',
    name: 'Textarea Field',
    childs: [
      generateEventChild('change'),
      generateEventChild('input'),
      generateEventChild('blur'),
      generateEventChild('focus'),
    ]
  },
  {
    type: 'group-accordion',
    name: 'Email Field',
    childs: [
      generateEventChild('change'),
      generateEventChild('input'),
      generateEventChild('blur'),
      generateEventChild('focus'),
    ]
  },
  {
    type: 'group-accordion',
    name: 'Checkbox',
    childs: [
      generateEventChild('change'),
    ]
  },
  {
    type: 'group-accordion',
    name: 'Select',
    childs: [
      generateEventChild('change'),
    ]
  },
  {
    type: 'group-accordion',
    name: 'Button',
    childs: [
      generateEventChild('click'),
    ]
  }
]

export const cssPredefinedCodeList = [
  {
    type: 'group-opts',
    name: 'Field Keys',
    childs: [
      ...generateFieldsOpts()
    ]
  }
]