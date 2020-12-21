import { Panel, Tab, Tabs } from '@bumaga/tabs'
import { __ } from '@wordpress/i18n'
import { useState } from 'react'
import FormEntryNotes from './FormEntryNotes'
import FormEntryTimeline from './FormEntryTimeline'
import Modal from './Modal'

export default function EntryRelatedInfo({ formID, entryID, allLabels, allResp, setSnackbar, integrations, close }) {
  const [tab, settab] = useState('')

  return (
    <Modal lg show setModal={close}title={__('Related Info', 'bitform')}>
      <Tabs>
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
            allResp={allResp}
            settab={settab}
          />
        </Panel>
      </Tabs>

    </Modal>
  )
}
