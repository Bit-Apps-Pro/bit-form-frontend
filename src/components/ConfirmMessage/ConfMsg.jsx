/* eslint-disable no-param-reassign */

import { create } from 'mutative'
import { memo, useState } from 'react'
import { useFela } from 'react-fela'
import { useAtom, useSetAtom } from 'recoil'
import { $confirmations, $updateBtn } from '../../GlobalStates/GlobalStates'
import { $styles } from '../../GlobalStates/StylesState'
import CloseIcn from '../../Icons/CloseIcn'
import StackIcn from '../../Icons/StackIcn'
import TrashIcn from '../../Icons/TrashIcn'
import ut from '../../styles/2.utilities'
import { deepCopy } from '../../Utils/Helpers'
import { __ } from '../../Utils/i18nwrap'
import { msgDefaultConfig } from '../../Utils/StaticData/form-templates/defaultConfirmation'
import Accordions from '../Utilities/Accordions'
import Button from '../Utilities/Button'
import ConfirmModal from '../Utilities/ConfirmModal'
import confirmMsgCssStyles from './confirmMsgCssStyles'
import Message from './Message'

function ConfMsg({ removeIntegration }) {
  const [confMdl, setConfMdl] = useState({ show: false, action: null })
  const [allConf, setAllConf] = useAtom($confirmations)
  const setUpdateBtn = useSetAtom($updateBtn)
  const setStyles = useSetAtom($styles)
  const allConfirmations = deepCopy(allConf)
  const { css } = useFela()

  const handleMsgTitle = (e, idx) => {
    allConfirmations.type.successMsg[idx].title = e.target.value
    setAllConf(allConfirmations)
    setUpdateBtn(prevState => ({ ...prevState, unsaved: true }))
  }

  const addMoreMsg = () => {
    if (!allConfirmations?.type?.successMsg) {
      allConfirmations.type = { successMsg: [], ...allConfirmations.type }
    }
    const newMsgId = allConfirmations.type.successMsg.length
    const TEMP_CONF_ID = `_tmp_${newMsgId}_conf_id`
    const newSuccessMsg = {
      title: `Untitled Message ${newMsgId + 1}`,
      msg: __('<p style="margin:0">Successfully Submitted.</p>'),
      config: msgDefaultConfig,
    }
    const { msgType, position, animation, styles: defaultStyle } = msgDefaultConfig || {}
    setStyles(prvStyle => create(prvStyle, drft => {
      drft.confirmations.push({
        confMsgId: TEMP_CONF_ID,
        style: confirmMsgCssStyles('formId', TEMP_CONF_ID, msgType, position, animation, defaultStyle),
      })
    }))
    allConfirmations.type.successMsg.push(newSuccessMsg)
    setAllConf(allConfirmations)
    setUpdateBtn(prevState => ({ ...prevState, unsaved: true }))
  }

  const closeMdl = () => {
    setConfMdl({ show: false })
  }

  const showDelConf = (i) => {
    setConfMdl({ show: true, action: () => rmvMsg(i) })
  }

  const rmvMsg = async i => {
    const tmpData = allConfirmations.type.successMsg.splice(i, 1)[0]
    setConfMdl({ show: false })
    setStyles(prvStyle => create(prvStyle, drft => {
      const tempId = tmpData.id || `_tmp_${i}_conf_id`
      drft.confirmations = drft.confirmations.filter(confObj => confObj.confMsgId !== tempId)
    }))
    if (tmpData.id !== undefined) {
      const status = await removeIntegration(tmpData.id, 'msg')
      if (!status) {
        allConfirmations.type.successMsg.splice(i, 0, tmpData)
      }
    }
    setAllConf(allConfirmations)
  }

  return (
    <div>
      <ConfirmModal
        action={confMdl.action}
        show={confMdl.show}
        body={__('Are you sure to delete this message ?')}
        btnTxt={__('Delete')}
        close={closeMdl}
      />

      {allConf?.type?.successMsg ? allConf.type.successMsg?.map((item, i) => (
        <div key={`f-m-${i + 1}`} className="flx">
          <Accordions
            title={item.title}
            titleEditable
            cls="mt-2 mr-2 w-9"
            onTitleChange={e => handleMsgTitle(e, i)}
          >
            <Message key={`msg-${i + 1}`} id={i} msgItem={item} />
          </Accordions>
          <Button onClick={() => showDelConf(i)} icn className="sh-sm white mt-2"><TrashIcn size={16} /></Button>
        </div>
      )) : (
        <div className={css(ut.btcdEmpty, ut.txCenter)}>
          <StackIcn size="50" />
          {__('Empty')}
        </div>
      )}
      <div className="txt-center"><Button onClick={addMoreMsg} icn className="sh-sm blue tooltip mt-2" style={{ '--tooltip-txt': `'${__('Add More Alternative Success Message')}'` }}><CloseIcn size="14" stroke="3" className="icn-rotate-45" /></Button></div>
    </div>
  )
}

export default memo(ConfMsg)
