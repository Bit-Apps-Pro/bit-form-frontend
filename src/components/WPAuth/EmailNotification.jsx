import produce from 'immer'
import { __ } from '../../Utils/i18nwrap'
import Modal from '../Utilities/Modal'
import TinyMCE from '../Utilities/TinyMCE'

export default function EmailNotification({ dataConf, setDataConf, type, showMdl, setshowMdl, tamplate = '', title }) {
  const temBody = dataConf[type]?.body ? dataConf[type]?.body : tamplate
  const handleBody = value => {
    setDataConf(tmpConf => produce(tmpConf, draft => {
      // eslint-disable-next-line no-param-reassign
      draft[type].body = value
    }))
  }

  const cancelModal = () => {
    setTimeout(() => {
      setDataConf(tmpConf => produce(tmpConf, draft => {
        // eslint-disable-next-line no-param-reassign
        draft[type].body = temBody
        // eslint-disable-next-line no-param-reassign
        draft[type].sub = 'Email Subject'
      }))
      setshowMdl(false)
    })
  }

  const handleInput = e => {
    setDataConf(tmpConf => produce(tmpConf, draft => {
      const { name, value } = e.target
      // eslint-disable-next-line no-param-reassign
      draft[type][name] = value
    }))
  }

  return (
    <Modal md show={showMdl} setModal={setshowMdl} title={title} style={{ overflow: 'auto' }}>
      <>
        <div className="mt-3 flx">
          <b style={{ width: 100 }}>Subject:</b>
          <input onChange={handleInput} name="sub" type="text" className="btcd-paper-inp w-9" placeholder="Email Subject Here" value={dataConf[type]?.sub} />
        </div>
        <div className="mt-3">
          <b>{__('Body:', 'bitform')}</b>
          <label htmlFor={`mail-tem-${dataConf[type]?.formID}`} className="mt-2 w-10">
            <TinyMCE
              id={`mail-tem-${dataConf[type]?.formID}`}
              value={temBody}
              onChangeHandler={handleBody}
              width="100%"
            />
          </label>
        </div>
        <div className="mt-2 f-right">
          <button type="button" className="btn mr-2" onClick={cancelModal}>Cancel</button>
          <button type="button" className="btn blue" onClick={() => setshowMdl(false)}>Save</button>
        </div>
      </>
    </Modal>
  )
}
