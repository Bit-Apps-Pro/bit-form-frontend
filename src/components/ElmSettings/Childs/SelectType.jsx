// eslint-disable-next-line import/no-extraneous-dependencies
import { __ } from '@wordpress/i18n';

export default function SelectType(props) {
  return (
    <div className="mt-3 setting-inp">
      <span>Type:</span>
      <select value={props.multipleSelct ? '1' : '0'} onChange={props.updateType}>
        <option value="0">{__('Single Select', 'bitform')}</option>
        <option value="1">{__('Multiple Select', 'bitform')}</option>
      </select>

      {props.multipleSelct && (
        <div className="flx flx-between mt-2">
          <span>Max Select:</span>
          <input onChange={props.setLimit} value={props.limit} style={{ width: '50%' }} className="input" type="number" />
        </div>
      )}
    </div>
  )
}
