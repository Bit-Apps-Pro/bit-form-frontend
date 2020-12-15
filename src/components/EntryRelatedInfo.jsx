import { Panel, Tab, Tabs } from '@bumaga/tabs'
import { useState } from 'react'
import FormEntryNotes from './FormEntryNotes'
import FormEntryTimeline from './FormEntryTimeline'
import Modal from './Modal'

export default function EntryRelatedInfo({ formID, entryID, allLabels, allResp, setSnackbar, integrations, close }) {
  const [tab, settab] = useState('')

  return (
    <Modal lg show setModal={close} title="Related Info">
      <Tabs>
        <Tab>
          <button className={`btcd-s-tab-link ${tab === 'timeline' && 's-t-l-active'}`} type="button">
            Timeline
          </button>
        </Tab>
        <Tab>
          <button className={`btcd-s-tab-link ${tab === 'note' && 's-t-l-active'}`} type="button">
            Notes
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
