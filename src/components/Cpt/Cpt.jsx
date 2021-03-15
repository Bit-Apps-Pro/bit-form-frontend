import { Panel, Tab, Tabs } from '@bumaga/tabs'
import { useState, useEffect } from 'react';
import { Scrollbars } from 'react-custom-scrollbars'
import { __ } from '../../Utils/i18nwrap'
import CptTypeAdd from './CptTypeAdd'
import EditCpt from './EditCpt'
import bitsFetch from '../../Utils/bitsFetch'

export default function Cpt() {
  const [tab, settab] = useState('add_type')
  const [posts, setPosts] = useState([])
  const [types, setTypes] = useState([])
  const isPro = typeof bits !== 'undefined' && bits.isPro

  useEffect(() => {
    bitsFetch({}, 'bitforms_getAll_post_type').then((res) => {
      if (res?.success) {
        setPosts(res.data.all_cpt)
        setTypes(res.data.types)
      }
    })
  }, [])

  return (
    <Scrollbars style={{ width: '100%', height: 525 }}>
      <div className="p-2 w-6">
        <div className="pos-rel">
          {!isPro && (
            <div className="pro-blur flx" style={{ height: '110%', left: -15, width: '104%', marginTop: 15 }}>
              <div className="pro">
                {__('Available On', 'bitform')}
                <a href="https://bitpress.pro/" target="_blank" rel="noreferrer">
                  <span className="txt-pro">
                    &nbsp;
                    {__('Premium', 'bitform')}
                  </span>
                </a>
              </div>
            </div>
          )}
          <Tabs>
            <Tab>
              <button className={`btcd-s-tab-link ${tab === 'add_type' && 's-t-l-active'}`} style={{ padding: 9 }} type="button">
                {__('Add New Post Type', 'bitform')}
              </button>
            </Tab>
            <Tab>
              <button className={`btcd-s-tab-link ${tab === 'all_post' && 's-t-l-active'}`} style={{ padding: 9 }} type="button">
                {__('Edit Post Types', 'bitform')}
              </button>
            </Tab>
            <Panel>
              <CptTypeAdd
                settab={settab}
                types={types}
              />
            </Panel>
            <Panel>
              <EditCpt
                settab={settab}
                posts={posts}
                types={types}
              />
            </Panel>
          </Tabs>
        </div>
      </div>
    </Scrollbars>
  )
}
