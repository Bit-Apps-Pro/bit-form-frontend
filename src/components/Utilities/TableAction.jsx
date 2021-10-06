import BdrDottedIcn from '../../Icons/BdrDottedIcn'
import CopyIcn from '../../Icons/CopyIcn'
import DocIcn from '../../Icons/DocIcn'
import TrashIcn from '../../Icons/TrashIcn'

function TableAction(props) {
  console.log('%c $render TableAction', 'background:orange;padding:3px;border-radius:5px')

  return (
    <div className="btcd-t-action-wrp flx">
      <div className="btcd-t-action">
        {'dup' in props && (
          <button onClick={props.dup} className="icn-btn btcd-hid-icn tooltip" style={{ '--tooltip-txt': '"Duplicate"' }} aria-label="action btn" type="button">
            <CopyIcn size="15" />
          </button>
        )}
        {'del' in props && (
          <button onClick={props.del} className="icn-btn btcd-hid-icn tooltip" style={{ '--tooltip-txt': '"Delete"' }} aria-label="action btn" type="button">
            <TrashIcn size="15" stroke="3" />
          </button>
        )}
        {'edit' in props && (
          <button onClick={props.edit} className="icn-btn btcd-hid-icn tooltip" style={{ '--tooltip-txt': '"Edit"' }} aria-label="action btn" type="button">
            <DocIcn size="15" />
          </button>
        )}

        <button className="icn-btn btcd-ph-btn" aria-label="action btn" type="button">
          <BdrDottedIcn size="15" />
        </button>
      </div>
    </div>
  )
}
export default TableAction
