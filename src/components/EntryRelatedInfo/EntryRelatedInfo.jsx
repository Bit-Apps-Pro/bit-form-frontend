import { memo, useState } from 'react'
import { useAtomValue } from 'jotai'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import { __ } from '../../Utils/i18nwrap'
import FormEntryNotes from './FormEntryNotes'
import FormEntryPayments from './FormEntryPayments'
import FormEntryTimeline from './FormEntryTimeline'
import Modal from '../Utilities/Modal'
import GoogleAdInfo from './GoogleAdInfo'
import { $fieldLabels, $formId, $integrations } from '../../GlobalStates/GlobalStates'
import paymentFields from '../../Utils/StaticData/paymentFields'

function EntryRelatedInfo({ entryID, rowDtl, setSnackbar, close }) {
  const formID = useAtomValue($formId)
  const allLabels = useAtomValue($fieldLabels)
  const integrations = useAtomValue($integrations)
  const payFields = allLabels.filter(label => paymentFields.includes(label.type))
  return (
    <Modal lg show setModal={close} title={__('Related Info')}>
      <Tabs
        selectedTabClassName="s-t-l-active"
      >
        <TabList className="flx m-0">
          {!!(payFields?.length) && (
            <Tab className="btcd-s-tab-link">
              {__('Payment')}
            </Tab>
          )}
          <Tab className="btcd-s-tab-link">
            {__('Timeline')}
          </Tab>
          <Tab className="btcd-s-tab-link">
            {__('Notes')}
          </Tab>
          {!!(rowDtl?.GCLID) && (
            <Tab className="btcd-s-tab-link">
              {__('Google Ads Information')}
            </Tab>
          )}
        </TabList>

        {!!(payFields?.length) && (
          <TabPanel>
            <FormEntryPayments
              formID={formID}
              rowDtl={rowDtl}
            />
          </TabPanel>
        )}
        <TabPanel>
          <FormEntryTimeline
            formID={formID}
            entryID={entryID}
            integrations={integrations}
          />
        </TabPanel>
        <TabPanel>
          <FormEntryNotes
            formID={formID}
            entryID={entryID}
            allLabels={allLabels}
            setSnackbar={setSnackbar}
            rowDtl={rowDtl}
          />
        </TabPanel>
        {!!(rowDtl?.GCLID) && (
          <TabPanel>
            <GoogleAdInfo
              rowDtl={rowDtl}
            />
          </TabPanel>
        )}
      </Tabs>

    </Modal>
  )
}
export default memo(EntryRelatedInfo)
