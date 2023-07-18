import { __ } from '../i18nwrap'

/* eslint-disable max-len */
const tippyHelperMsg = {
  name: __('Name is the unique identifier for the field. It is used to reference the field in the form submission data.'),
  lbl: __('Label is the title of the field that appears above or beside the field. You can show or hide the field label by toggling this option.'),
  autoComplete: __("Autocomplete allows you to specify what type of automated assistance the browser should provide for filling out the field, <a target='_blank' href='https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete'>Learn more</a>"),
  adminLbl: __('Admin Label is the title of the field that will be used as an alternative reference throughout the dashboard. You can toggle this option to use or disable the admin label.'),
  subtitle: __('Subtitle is an optional description that appears under the Field Label. You can show or hide the field subtitle by toggling this option.'),
  helpText: __('Helper Text is an optional text that appears beneath the field to provide additional information to the user. You can show or hide the helper text by toggling this option.'),
  defaultValue: __('Default Value is the initial value that will appear in the field. You can show or hide the default value by toggling this option.'),
  suggestion: __('Suggestions allows you to add a custom suggestion list that will display suggestions as the user types in the input field.'),
  placeholder: __('Placeholder is the text that appears inside the field before your user enters their own content. You can show or hide the field placeholder by toggling this option.'),
  inputMode: __("This allows browser to display an appropriate virtual keyboard if needed. <a target='_blank' href='https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inputmode'>Learn more</a>"),
  pattern: __('Set a regular expression pattern that the input value should match for the field.'),
  required: __('This allows to make the field mandatory for users to fill out before submitting the form. You can toggle this option to use or disable the required.'),
  fieldHidden: __('The hide field feature allows you to hide the field from the user on the form. You can toggle this option to show or hide the field.'),
  readonly: __('Readonly feature allows you to set a field as read-only, meaning that users will not be able to edit the content of that field. You can toggle this option to enable or disable the setting.'),
  disabled: __('Disabling a field prevents users from interacting with it or entering data. You can toggle this option to enable or disable the field as needed.'),
  uniqueEntry: __('Enabling this option will check from the submitted entries whether its value is duplicate.'),
  userUnique: __('Enabling this option will check from your WordPress user database whether its value is duplicate.'),
  stripeTheme: __('Stripe provide a variety of themes for the payment form. You can choose the theme that best suits theme your payment form. <a target="_blank" href="https://stripe.com/docs/elements/appearance-api">Learn more</a>'),
  amountType: __("Stripe provide minimum or maximum amount for different payment method type and currency. <a target='_blank' href='https://stripe.com/docs/currencies#minimum-and-maximum-charge-amounts'>learn more</a>"),
  undoBtn: __('You can add or remove Undo button form Signature Field. You can toggle this option to add or remove the Undo button.'),
  clrBtn: __('You can add or remove Clear button form Signature Field. You can toggle this option to add or remove the Clear button.'),
}
export default tippyHelperMsg
