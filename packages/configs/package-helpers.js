/* eslint-disable max-len */
export const packagesFileLists = {
  // package-name: [file-names]
  'bit-advanced-file-up-field': ['bit-advanced-file-up-field'],
  'bit-conditionals': ['bit-conditionals'],
  'bit-country-field': ['bit-country-field'],
  'bit-currency-field': ['bit-currency-field'],
  'bit-file-up-field': ['bit-file-up-field'],
  'bit-filepond': ['bit-filepond'],
  'bit-filepond-plugin-file-validate-size': ['bit-filepond-plugin-file-validate-size'],
  'bit-filepond-plugin-file-validate-type': ['bit-filepond-plugin-file-validate-type'],
  'bit-filepond-plugin-image-crop': ['bit-filepond-plugin-image-crop'],
  'bit-filepond-plugin-image-preview': ['bit-filepond-plugin-image-preview'],
  'bit-filepond-plugin-image-resize': ['bit-filepond-plugin-image-resize'],
  'bit-filepond-plugin-image-transform': ['bit-filepond-plugin-image-transform'],
  'bit-filepond-plugin-image-validate-size': ['bit-filepond-plugin-image-validate-size'],
  'bit-filepond-plugin-media-preview': ['bit-filepond-plugin-media-preview'],
  'bit-form-abandonment': ['bit-form-abandonment', 'saveFormProgress', 'setFieldValues', 'autoSavePartial'],
  'bit-frontend': ['hidden-token-field', 'bitsFetchFront', 'submit-form', 'customFieldsReset', 'advancedFileHandle', 'decisionFldHandle', 'validate-focus', 'bitform-init', 'bitform-elementor'],
  'bit-helpers': ['observeElm', 'bfSelect', 'bfReset', 'setBFMsg', 'bfValidationErrMsg', 'setHiddenFld', 'paymentSubmitResponse', 'isFormValidatedWithoutError', 'setStyleProperty', 'scrollToFld'],
  'bit-page-lifecycle': ['bit-page-lifecycle'],
  'bit-paypal-field': ['bit-paypal-field'],
  'bit-phone-number-field': ['bit-phone-number-field'],
  'bit-razorpay-field': ['bit-razorpay-field'],
  'bit-recaptcha-field': ['bit-recaptcha-field'],
  'bit-repeater-field': ['bit-repeater-field', 'checkRepeatedField', 'getRepeatedIndexes', 'getIndexesBaseOnConditions'],
  'bit-select-field': ['bit-select-field'],
  'bit-stripe-field': ['bit-stripe-field'],
  'bit-validation': ['checkFldValidation', 'checkMinMaxOptions', 'customOptionValidation', 'dcsnbxFldValidation', 'emailFldValidation', 'fileupFldValidation', 'advanceFileUpFldValidation', 'generateBackslashPattern', 'nmbrFldValidation', 'requiredFldValidation', 'urlFldValidation', 'validateForm', 'regexPatternValidation', 'phoneNumberFldValidation'],
  'bit-virtualized-list': ['bit-virtualized-list'],
  'bit-signature-field': ['bit-signature-field'],
}

export const getPackageFileList = (packageName) => packagesFileLists[packageName] || []