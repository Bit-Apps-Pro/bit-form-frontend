import React from 'react'

export default function MenuBtn(props) {
  const handleMenuClose = (e) => {
    e.target.parentNode.children[1].classList.remove('btcd-m-a')
  }

  const hadleClick = (e) => {
    if (e.target.parentNode.children[1].classList.contains('btcd-m-a')) {
      e.target.parentNode.children[1].classList.remove('btcd-m-a')
      e.target.blur()
    } else {
      e.target.parentNode.children[1].classList.add('btcd-m-a')
    }
  }

  return (
    <div className="btcd-menu">
      <button className="btcd-menu-btn sh-sm" onClick={hadleClick} onBlur={handleMenuClose} aria-label="toggle menu" type="button" />
      <div className="btcd-menu-list">
        <button type="button" aria-label="actions">
          <span className="btcd-icn icn-edit" />
          {'  '}
          Edit
        </button>
        <button type="button" aria-label="actions">
          <span className="btcd-icn icn-trash-2" />
          {'  '}
          Delete
        </button>
      </div>
    </div>
  )
}
