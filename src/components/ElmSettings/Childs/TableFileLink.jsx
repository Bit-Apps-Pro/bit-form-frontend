import React from 'react'

function TableFileLink(props) {
  return (
    <div className="btcd-t-link flx mr-2">
      <div className="tooltip" style={{ '--tooltip-txt': `"${props.fname.substr(11)}"` }}>
        <a
          href={`${props.link}`}
          rel="noopener noreferrer"
          target="_blank"
        >
          <span className="btcd-icn icn-file" />
          {' '}
          {props.fname.substr(11)}
        </a>
      </div>
      <a target="_blank" href={`${props.link}&download`} download rel="noopener noreferrer" aria-label="Download" className="icn-btn icn-btn-sm"><span className="btcd-icn icn-file_download" /></a>
    </div>
  )
}

export default TableFileLink
