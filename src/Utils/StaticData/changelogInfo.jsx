const changelogInfo = {
  '2.2.0': {
    date: '15-July-2023',
    changes: {
      added: {
        label: 'Added',
        list: [
          {
            label: 'New Field',
            tag: 'new',
            list: [
              'Repeater Field - to create repeated forms with complex conditional logics calculation',
            ],
          },
          {
            label: 'Features',
            list: [
              {
                label: 'Form Abandonment or Partial Form Submission',
                tag: 'new',
              },
              {
                label: 'Pdf Attachment of Form Entry in Email Notifications',
                tag: 'new',
              },
            ],
          },
        ],
      },
      fixed: {
        label: 'Fixed',
        list: [
          'Form entry edit route 404 issue',
          "Forms not initializing on Elementor page builder's modal",
          'Telegram Integration issue regarding multiple uploaded files',
          'MailerLite Integration timeline log issue',
          'Zoho workdrive integration next button disabled issue',
          'Country field default value issue from Conditional Logics',
          'bitform_dequeue_styles hook issue with form ids',
          'Deprycated notice from shortcode function if form content is empty',
          'alt attribute not updating from custom attribute settings',
        ],
      },
    },
  },
  '2.6.0': {
    date: '23 October, 2023',
    changes: {
      added: {
        label: 'Added',
        list: [
          {
            label: (<b>Landing Page</b>),
            tag: 'new',
            list: [
              'Share the form with a distraction free page link, commonly named as: Standalone Form / Form Pages / Direct Share.',
            ],
          },
          {
            label: (<b>Form Preview</b>),
            tag: 'new',
            list: [
              'Preview your form changes from the builder without any short code or embedding into page.',
            ],
          },
        ],
      },
      fixed: {
        label: 'Fixed',
        list: [
          'Currency field options hide not working issue.',
          'ACF integration not working in Bit Form FREE version.',
          'Number field validation error if the value is 0.',
        ],
      },
    },
  },
}

export default changelogInfo
