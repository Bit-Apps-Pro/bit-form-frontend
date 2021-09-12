import { useState } from 'react'
import { __ } from '../../Utils/i18nwrap'
import TinyMCE from '../Utilities/TinyMCE'
import Modal from '../Utilities/Modal'

export default function EmailNotification({ dataConf, setDataConf, type, showMdl, setshowMdl, tamplate = '', title }) {
  const [tem, setTem] = useState({ body: dataConf[type].body ? dataConf[type].body : tamplate })

  const handleBody = value => {
    const tmpConf = { ...dataConf }
    setTem(prev => ({ ...prev, body: value }))
    tmpConf[type].body = value
    setDataConf(tmpConf)
  }

  const cancelModal = () => {
    const tmpConf = { ...dataConf }
    tmpConf[type].body = tamplate
    tmpConf[type].sub = 'Email Subject'
    setTimeout(() => {
      setDataConf(tmpConf)
      setshowMdl(false)
    })
  }

  const handleInput = e => {
    const newConf = { ...dataConf }
    newConf[type][e.target.name] = e.target.value
    setDataConf(newConf)
  }

  return (
    <>
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
                value={tem.body}
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
    </>
  )
}
