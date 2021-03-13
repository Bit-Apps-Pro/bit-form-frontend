import { useState, useEffect } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { __ } from '@wordpress/i18n';
import { Link } from 'react-router-dom'
import Modal from './Modal';
import FormImporter from './FormImporter'
// import bitsFetch from '../Utils/bitsFetch'

export default function FormTemplates({ setTempModal }) {
  console.log('%c $render FormTemplates', 'background:purple;padding:3px;border-radius:5px;color:white')

  const [modal, setModal] = useState(false)
  // const [, setTemplates] = useState(null)
  const staticTem = [{ lbl: 'Blank', img: '' }, { lbl: 'Contact Form', img: '' }]

  /* useEffect(() => {
    let mount = true
    bitsFetch(null, 'bitforms_templates')
      .then(res => {
        if (typeof res !== 'undefined' && res.success && mount) {
          setTemplates(JSON.parse(res.data))
        }
      })
    return function cleanup() { mount = false }
  }, []) */

  return (
    <div className="btcd-tem-lay flx">
      <div className="btcd-tem flx">
        <span className="btcd-icn icn-clear icn-rotate-45 mr-1" style={{ fontSize: 60 }} />
        <div className="btcd-hid-btn">
          <button onClick={() => setModal(true)} className="btn btn-white sh-sm" type="button">{__('Import', 'bitform')}</button>
        </div>
      </div>
      {staticTem.map(tem => (
        <div key={tem.lbl} className="btcd-tem flx">
          <span className="btcd-icn icn-file" style={{ fontSize: 90 }} />
          <div>{tem.lbl}</div>
          <div className="btcd-hid-btn">
            <Link to={`/form/builder/new/${tem.lbl}/fs`} className="btn btn-white sh-sm" type="button">{__('Create', 'bitform')}</Link>
          </div>
        </div>
      ))}
      <Modal
        show={modal}
        setModal={setModal}
        title={__('Import Form', 'bitform')}
        subTitle=""
      >
        <FormImporter setModal={setModal} setTempModal={setTempModal} />
      </Modal>
    </div>
  )
}
