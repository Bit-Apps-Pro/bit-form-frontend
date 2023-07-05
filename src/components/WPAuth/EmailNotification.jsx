/* eslint-disable jsx-a11y/label-has-associated-control */
import { useAtomValue, useSetAtom } from 'jotai'
import { create } from 'mutative'
import { useFela } from 'react-fela'
import { $fieldsArr, $updateBtn } from '../../GlobalStates/GlobalStates'
import { __ } from '../../Utils/i18nwrap'
import Btn from '../Utilities/Btn'
import Modal from '../Utilities/Modal'
import TinyMCE from '../Utilities/TinyMCE'

export default function EmailNotification({
  dataConf, setDataConf, type, showMdl, setshowMdl, tamplate = '', title,
}) {
  const setUpdateBtn = useSetAtom($updateBtn)
  const formFields = useAtomValue($fieldsArr)
  const { css } = useFela()
  const data = type ? dataConf[type] : dataConf
  const temBody = data?.body ? data?.body : tamplate

  const handleBody = value => {
    setDataConf(tmpConf => create(tmpConf, draft => {
      // eslint-disable-next-line no-param-reassign
      const tmp = type ? draft[type] : draft
      tmp.body = value
    }))
  }
  const cancelModal = () => {
    setTimeout(() => {
      setDataConf(tmpConf => create(tmpConf, draft => {
        // eslint-disable-next-line no-param-reassign
        const tmp = type ? draft[type] : draft
        tmp.body = tamplate
        // eslint-disable-next-line no-param-reassign
        tmp.sub = 'Email Subject'
      }))
      setshowMdl(false)
    })
  }

  const handleInput = e => {
    setDataConf(tmpConf => create(tmpConf, draft => {
      const { name, value } = e.target
      const tmp = type ? draft[type] : draft
      // eslint-disable-next-line no-param-reassign
      tmp[name] = value
    }))
  }

  return (
    <Modal md show={showMdl} setModal={setshowMdl} title={title} style={{ overflow: 'auto' }}>
      <>
        <div className="mt-3 flx">
          <b style={{ width: 100 }}>Subject:</b>
          <input
            onChange={handleInput}
            name="sub"
            type="text"
            className="btcd-paper-inp w-9"
            placeholder="Email Subject Here"
            value={data?.sub}
          />
        </div>
        <div className="mt-3">
          <b>{__('Body:')}</b>
          <label
            htmlFor={`mail-tem-${data?.formID}`}
            className="mt-2 w-10"
          >
            <TinyMCE
              id={`mail-tem-${data?.formID}`}
              formFields={formFields}
              value={temBody}
              onChangeHandler={handleBody}
              width="100%"
            />
          </label>
        </div>
        <div className="mt-2 f-right flx mb-3">
          <Btn variant="danger-outline" className={css({ mr: 5 })} onClick={cancelModal}>{__('Cancel')}</Btn>
          <Btn onClick={() => setshowMdl(false)}>
            {__('Save')}
            &nbsp;
          </Btn>
        </div>
      </>
    </Modal>
  )
}
