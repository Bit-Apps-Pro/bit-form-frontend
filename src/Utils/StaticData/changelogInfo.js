const changelogInfo = {
  '2.1.0': {
    date: '2020-01-01',
    changes: {
      added: {
        label: 'Added',
        list: [
          {
            label: 'WP Auth',
            tag: 'new',
            list: [
              {
                label: 'Registration',
                list: [
                  'Auto Login after registration',
                  {
                    label: 'Approval System',
                    tag: 'New Feature',
                    list: [
                      'Auto',
                      'Admin Review',
                      'Email Activation',
                    ],
                  },
                  'WordPress Email Notification (Admin & User)',
                  'User Meta Field Mapping',
                ],
              },
              'login',
              'logout',
              'password reset',
              'forgot password',
            ],
          },
          {
            label: 'Form Settings',
            list: [
              'Required user to be logged in for submit form',
              'Empty form submission disallow',
              'Disable entry storing in Database & Bit Form',
            ],
          },
          {
            label: 'Fields',
            list: [
              '(New) Username - unique WordPress user name validation',
              'Email - unique WordPress user email validation',
              'Password - encrypted by default on WP user management',
              'Unique entry - Text, username, multi text, checkbox, radio, number, dropdown, country, email, url, date, color picker',
            ],
          },
          "Field required asterisk class name 'fld-req-symbol' added.",
        ],
      },
      imporovement: {
        label: 'Improvement',
        list: [
          'Form Builder UI',
          'Form Builder UX',
          'Form Builder Performance',
          'Form Builder Accessibility',
        ],
      },
      fixed: {
        label: 'Fixed',
        list: [
          'Form Builder UI',
          'Form Builder UX',
          'Form Builder Performance',
        ],
      },
    },
  },
}

export default changelogInfo
