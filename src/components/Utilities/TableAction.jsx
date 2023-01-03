import BdrDottedIcn from '../../Icons/BdrDottedIcn'
import CopyIcn from '../../Icons/CopyIcn'
import DocIcn from '../../Icons/DocIcn'
import TrashIcn from '../../Icons/TrashIcn'
import Tip from './Tip'

function TableAction(props) {
  return (
    <div className="btcd-t-action-wrp flx">
      <div className="btcd-t-action">
        {'dup' in props && (
          <Tip msg="Duplicate">
            <button onClick={props.dup} className="icn-btn btcd-hid-icn" aria-label="action btn" type="button">
              <CopyIcn size="15" />
            </button>
          </Tip>
        )}
        {'del' in props && (
          <Tip msg="Delete">
            <button onClick={props.del} className="icn-btn btcd-hid-icn" aria-label="action btn" type="button">
              <TrashIcn size="15" stroke="3" />
            </button>
          </Tip>
        )}
        {'edit' in props && (
          <Tip msg="Edit">
            <button onClick={props.edit} className="icn-btn btcd-hid-icn" aria-label="action btn" type="button">
              <DocIcn size="15" />
            </button>
          </Tip>
        )}

        <button className="icn-btn btcd-ph-btn" aria-label="action btn" type="button">
          <BdrDottedIcn size="15" />
        </button>
      </div>
    </div>
  )
}
export default TableAction
