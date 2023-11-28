import paymentFields from "./paymentFields"

// This array is used to filter out field types that are not allowed to be used in logic blocks
const filterFieldTypesForLogicBlock = ['file-up', 'recaptcha', 'turnstile']

// This array is used to filter out field types that are not allowed to be used in TinyMCE
export const filterFieldTypesForTinyMce = ['file-up', 'recaptcha', 'turnstile', 'repeater', 'section', 'divider', 'image', 'advanced-file-up']

// This array is used to filter out field types that are not allowed to be used in section field
export const filterFieldTypesForSectionField = ['repeater', 'section']

// This array is used to filter out field types that are not allowed to be used in repeater field
export const filterFieldTypesForRepeater = ['repeater', 'section', 'button', 'recaptcha', 'turnstile', 'advanced-file-up', 'decision-box', ...paymentFields]

export default filterFieldTypesForLogicBlock
