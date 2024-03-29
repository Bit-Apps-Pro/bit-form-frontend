/* eslint-disable no-param-reassign */

import { useState } from 'react'
import MultiSelect from 'react-multiple-select-dropdown-lite'
import 'react-multiple-select-dropdown-lite/dist/index.css'
import { __ } from '../../../Utils/i18nwrap'
import Loader from '../../Loaders/Loader'
import ConfirmModal from '../../Utilities/ConfirmModal'
import TableCheckBox from '../../Utilities/TableCheckBox'
import { getAllTags } from './GetgistCommonFunc'

export default function GetgistActions({ getgistConf, setGetgistConf }) {
  const [isLoading, setIsLoading] = useState(false)
  const [actionMdl, setActionMdl] = useState({ show: false, action: () => { } })
  const actionHandler = (e, type) => {
    const newConf = { ...getgistConf }
    if (e.target.checked) {
      if (type === 'tags') {
        getAllTags(getgistConf, setGetgistConf, setIsLoading)
      }
      newConf.actions[type] = true
      setActionMdl({ show: type })
    } else {
      setActionMdl({ show: false })
      delete newConf.actions[type]
    }
    setGetgistConf({ ...newConf })
  }
  const clsActionMdl = () => {
    setActionMdl({ show: false })
  }
  const setChanges = (val, type) => {
    const newConf = { ...getgistConf }
    newConf[type] = val
    setGetgistConf({ ...newConf })
  }

  return (
    <div className="pos-rel d-flx w-8">
      <TableCheckBox
        checked={getgistConf?.actions?.tags || false}
        onChange={(e) => actionHandler(e, 'tags')}
        className="wdt-200 mt-4 mr-2"
        value="tags"
        title={__('Tags')}
        subTitle={__('Add tags to contact')}
      />

      <ConfirmModal
        className="custom-conf-mdl"
        mainMdlCls="o-v"
        btnClass="blue"
        btnTxt={__('Ok')}
        show={actionMdl.show === 'tags'}
        close={clsActionMdl}
        action={clsActionMdl}
        title={__('Tags')}
      >
        <div className="btcd-hr mt-2 mb-2" />
        {isLoading
          ? (
            <Loader style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: 45,
              transform: 'scale(0.5)',
            }}
            />
          )
          : (
            <div className="flx flx-between mt-2">
              <MultiSelect
                className="msl-wrp-options"
                defaultValue={getgistConf?.tags}
                options={getgistConf.default?.tags?.map(list => ({ label: list.tagName, value: list.tagName.toString() }))}
                onChange={val => setChanges(val, 'tags')}
              />
              <button
                onClick={() => getAllTags(getgistConf, setGetgistConf, setIsLoading)}
                className="icn-btn sh-sm ml-2 mr-2 tooltip"
                style={{ '--tooltip-txt': `${__('Refresh Tags')}'` }}
                type="button"
                disabled={isLoading}
              >
                &#x21BB;
              </button>
            </div>
          )}
      </ConfirmModal>
    </div>
  )
}
