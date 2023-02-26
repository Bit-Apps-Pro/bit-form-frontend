import { useEffect, useState } from 'react'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import { useRecoilValue } from 'recoil'
import { $bits } from '../../GlobalStates/GlobalStates'
import bitsFetch from '../../Utils/bitsFetch'
import { __ } from '../../Utils/i18nwrap'
import ProOverlay from '../CompSettings/StyleCustomize/ChildComp/ProOverlay'
import CptTypeAdd from './CptTypeAdd'
import EditCpt from './EditCpt'

export default function Cpt() {
  const [posts, setPosts] = useState([])
  const [types, setTypes] = useState([])
  const bits = useRecoilValue($bits)
  const { isPro } = bits

  useEffect(() => {
    bitsFetch({}, 'bitforms_getAll_post_type').then((res) => {
      if (res?.success) {
        setPosts(res.data.all_cpt)
        setTypes(res.data.types)
      }
    })
  }, [])

  return (
    <div className="p-2 w-6">
      <div className="pos-rel">
        {!isPro && (
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
