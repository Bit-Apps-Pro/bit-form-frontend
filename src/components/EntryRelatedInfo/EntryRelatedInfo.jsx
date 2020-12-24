import { Panel, Tab, Tabs } from '@bumaga/tabs'
import { __ } from '@wordpress/i18n'
import { useState } from 'react'
import FormEntryNotes from './FormEntryNotes'
import FormEntryPayments from './FormEntryPayments'
import FormEntryTimeline from './FormEntryTimeline'
import Modal from '../Modal'

export default function EntryRelatedInfo({ formID, entryID, allLabels, rowDtl, setSnackbar, integrations, close }) {
  const [tab, settab] = useState('')
  const payPattern = /paypal/
  const paymentFields = allLabels.filter(label => label.type.match(payPattern))
  console.log('paymentFields', paymentFields)
  console.log('allLabels', allLabels)
  return (
    <Modal lg show setModal={close} title="Related Info">
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
      </Tabs>

    </Modal >
  )
}
