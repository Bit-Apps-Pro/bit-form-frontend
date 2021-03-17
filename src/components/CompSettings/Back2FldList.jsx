import { __ } from '../../Utils/i18nwrap';

export default function Back2FldList({ setElementSetting }) {
  return (
    <div className="flx cp" onClick={() => setElementSetting({ id: null, data: { typ: '' } })} type="button" role="button" tabIndex="0" onKeyPress={() => setElementSetting({ id: null, data: { typ: '' } })}>
      <button className="icn-btn" type="button" aria-label="back to field list">
        <span className="btcd-icn icn-arrow_back" />
      </button>
      <h4>{__('All Field List', 'bitform')}</h4>
    </div>
  )
}
