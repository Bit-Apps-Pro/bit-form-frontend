import { useState } from 'react'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import { IS_PRO } from '../../Utils/Helpers'
import { __ } from '../../Utils/i18nwrap'
import useSWROnce from '../../hooks/useSWROnce'
import ProOverlay from '../CompSettings/StyleCustomize/ChildComp/ProOverlay'
import CptTypeAdd from './CptTypeAdd'
import EditCpt from './EditCpt'

export default function Cpt() {
  const [posts, setPosts] = useState([])
  const [types, setTypes] = useState([])

  useSWROnce('bitforms_getAll_post_type', {}, {
    fetchCondition: IS_PRO,
    onSuccess: data => {
      setPosts(data.all_cpt)
      setTypes(data.types)
    },
  })

  return (
    <div className="p-2 w-6">
      <div className="pos-rel">
        {!IS_PRO && (
          <ProOverlay />
        )}
        <Tabs
          selectedTabClassName="s-t-l-active"
        >
          <TabList className="flx mt-0">
            <Tab className="btcd-s-tab-link pb-2">
              <b>{__('Add New Post Type')}</b>
            </Tab>
            <Tab className="btcd-s-tab-link pb-2">
              <b>{__('Edit Post Types')}</b>
            </Tab>
          </TabList>
          <TabPanel>
            <CptTypeAdd
              types={types}
            />
          </TabPanel>
          <TabPanel>
            <EditCpt
              posts={posts}
              types={types}
            />
          </TabPanel>
        </Tabs>
      </div>
    </div>
  )
}
