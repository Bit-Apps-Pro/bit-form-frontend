import CPTIcn from '../../Icons/CPTIcn'
import DownloadIcon from '../../Icons/DownloadIcon'

function TableFileLink(props) {
  return (
    <div className="btcd-t-link flx mr-2 prevent-drawer">
      <div className="tooltip" style={{ '--tooltip-txt': `"${props.fname}"`, width: `${props.width ? props.width : '80'}px` }}>
        <a
          href={`${props.link}`}
          rel="noopener noreferrer"
          target="_blank"
          className="prevent-drawer"
        >
          <CPTIcn size="30" />
          {' '}
          {props.fname}
        </a>
      </div>
      <a title="Download" target="_blank" href={`${props.link}&download`} download rel="noopener noreferrer" aria-label="Download" className="icn-btn icn-btn-sm flx prevent-drawer"><DownloadIcon size="15" /></a>
    </div>
  )
}

export default TableFileLink
