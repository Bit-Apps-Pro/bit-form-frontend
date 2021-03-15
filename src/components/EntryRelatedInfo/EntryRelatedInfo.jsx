import { Panel, Tab, Tabs } from '@bumaga/tabs'
// eslint-disable-next-line import/no-extraneous-dependencies
import { __ } from '@wordpress/i18n'
import { useState } from 'react'
import FormEntryNotes from './FormEntryNotes'
import FormEntryPayments from './FormEntryPayments'
import FormEntryTimeline from './FormEntryTimeline'
import Modal from '../Modal'
import GoogleAdInfo from './GoogleAdInfo'

export default function EntryRelatedInfo({ formID, entryID, allLabels, rowDtl, setSnackbar, integrations, close }) {
  const [tab, settab] = useState('')
  const payPattern = /paypal|razorpay/
  const paymentFields = allLabels.filter(label => label.type.match(payPattern))
  return (
    <Modal lg show setModal={close} title={__('Related Info', 'bitform')}>
      <Tabs>
        {paymentFields?.length ? (
          <Tab>
            <button className={`btcd-s-tab-link ${tab === 'payment' && 's-t-l-active'}`} type="button">
              {__('Payment', 'bitform')}
            </button>
          </Tab>
        ) : ''}
        <Tab>
          <button className={`btcd-s-tab-link ${tab === 'timeline' && 's-t-l-active'}`} type="button">
            {__('Timeline', 'bitform')}
          </button>
        </Tab>
        <Tab>
          <button className={`btcd-s-tab-link ${tab === 'note' && 's-t-l-active'}`} type="button">
            {__('Notes', 'bitform')}
          </button>
        </Tab>
        {rowDtl?.GCLID ? (
          <Tab>
            <button className={`btcd-s-tab-link ${tab === 'google_ad' && 's-t-l-active'}`} type="button">
              {__('Google Ads Information', 'bitform')}
            </button>
          </Tab>
        ) : ''}

        {paymentFields?.length ? (
          <Panel>
            <FormEntryPayments
              formID={formID}
              allLabels={allLabels}
              rowDtl={rowDtl}
              settab={settab}
            />
          </Panel>
        ) : ''}
        {/* Timeline Panel */}
        <Panel>
          <FormEntryTimeline
            formID={formID}
            entryID={entryID}
            allLabels={allLabels}
            settab={settab}
            integrations={integrations}
          />
        </Panel>
        {/* Notes Panel */}
        <Panel>
          <FormEntryNotes
            formID={formID}
            entryID={entryID}
            allLabels={allLabels}
            setSnackbar={setSnackbar}
            rowDtl={rowDtl}
            settab={settab}
          />
        </Panel>
        {rowDtl?.GCLID ? (
          <Panel>
            <GoogleAdInfo
              rowDtl={rowDtl}
              settab={settab}
            />
          </Panel>
        ) : ''}
      </Tabs>

    </Modal>
  )
}
