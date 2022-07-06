/* eslint-disable no-param-reassign */

import { memo, useState } from 'react'
import { useFela } from 'react-fela'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { $confirmations, $updateBtn } from '../../GlobalStates/GlobalStates'
import CloseIcn from '../../Icons/CloseIcn'
import StackIcn from '../../Icons/StackIcn'
import TrashIcn from '../../Icons/TrashIcn'
import ut from '../../styles/2.utilities'
import { deepCopy } from '../../Utils/Helpers'
import { __ } from '../../Utils/i18nwrap'
import Accordions from '../Utilities/Accordions'
import Button from '../Utilities/Button'
import ConfirmModal from '../Utilities/ConfirmModal'
import Message from './Message'

function ConfMsg({ removeIntegration }) {
  const [confMdl, setConfMdl] = useState({ show: false, action: null })
  const [allConf, setAllConf] = useRecoilState($confirmations)
  const setUpdateBtn = useSetRecoilState($updateBtn)

  const { css } = useFela()

  const handleMsgTitle = (e, idx) => {
    const confirmation = deepCopy(allConf)
    confirmation.type.successMsg[idx].title = e.target.value
    setAllConf(confirmation)
    setUpdateBtn({ unsaved: true })
  }

  const addMoreMsg = () => {
    const confirmation = deepCopy(allConf)
    if (!confirmation?.type?.successMsg) {
      confirmation.type = { successMsg: [], ...confirmation.type }
    }
    confirmation.type.successMsg.push({
      title: `Untitled Message ${confirmation.type.successMsg.length + 1}`,
      msg: __('<p>Successfully Submitted.</p>'),
      config: {
        msgType: 'snackbar',
        position: 'top-center',
        animation: 'fade',
        autoHide: false,
        duration: 1,
        styles: {
          width: '300px',
          padding: '5px 35px 5px 20px',
          background: '#fafafa',
          color: '#000000',
          borderWidth: '1px',
          borderType: 'solid',
          borderColor: 'gray',
          borderRadius: '10px',
          boxShadow: [{ x: '0px', y: '27px', blur: '30px', spread: '', color: 'rgb(0 0 0 / 18%)', inset: '' },
            { x: '0px', y: '5.2px', blur: '9.4px', spread: '5px', color: 'rgb(0 0 0 / 6%)', inset: '' },
            { x: '0px', y: '11.1px', blur: '14px', spread: '', color: 'rgb(0 0 0 / 14%)', inset: '' }],
          closeBackground: '#48484829',
          closeHover: '#dfdfdf',
          closeIconColor: '#5a5a5a',
          closeIconHover: '#000',
        },
      },
    })
    setAllConf(confirmation)
    setUpdateBtn({ unsaved: true })
  }

  const closeMdl = () => {
    confMdl.show = false
    setConfMdl({ ...confMdl })
  }

  const showDelConf = (i) => {
    confMdl.show = true
    confMdl.action = () => rmvMsg(i)
    setConfMdl({ ...confMdl })
  }

  const rmvMsg = async i => {
    const confirmation = deepCopy(allConf)
    const tmpData = confirmation.type.successMsg[i]
    confirmation.type.successMsg.splice(i, 1)
    setAllConf(confirmation)
    confMdl.show = false
    setConfMdl({ ...confMdl })
    if (tmpData.id !== undefined) {
      const status = await removeIntegration(tmpData.id, 'msg')
      if (!status) {
        confirmation.type.successMsg.splice(i, 0, tmpData)
        setAllConf(confirmation)
      }
    }
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
