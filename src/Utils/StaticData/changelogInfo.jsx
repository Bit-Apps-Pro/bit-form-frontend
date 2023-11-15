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
  '2.7.0': {
    date: '07 November, 2023',
    changes: {
      added: {
        label: 'Added',
        list: [
          {
            label: (<b>Image Select Field</b>),
            tag: 'new',
            list: [
              'Visually apealing radio / checkbox style image select field.',
            ],
          },
        ],
      },
      fixed: {
        label: 'Fixed',
        list: [
          'Active Campaign integrations issue for over 20 tags.',
          'Multi Step Form not submits if progress bar is hidden.',
        ],
      },
    },
  },
}

export default changelogInfo
