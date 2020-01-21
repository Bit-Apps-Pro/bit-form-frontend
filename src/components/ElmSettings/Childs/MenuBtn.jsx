import React from 'react'
import { Link } from 'react-router-dom'
import bitsFetch from '../../../Utils/bitsFetch'

export default function MenuBtn(props) {
  const handleMenuClose = (e) => {
    const el = e.target
    setTimeout(() => {
      el.parentNode.children[1].classList.remove('btcd-m-a')
    }, 500)
  }

  const hadleClick = (e) => {
    if (e.target.parentNode.children[1].classList.contains('btcd-m-a')) {
      e.target.parentNode.children[1].classList.remove('btcd-m-a')
      e.target.blur()

    } else {
      e.target.parentNode.children[1].classList.add('btcd-m-a')
    }
  }
 const handleDelete = () => {
    console.log(props.formID)
    bitsFetch({id: props.formID},'bitapps_delete_aform').then(response=>{
      console.log("Response", response)
    })
  }
  
  return (
    <div className="btcd-menu">
      <button className="btcd-menu-btn sh-sm" onClick={hadleClick} onBlur={handleMenuClose} aria-label="toggle menu" type="button" />
      <div className="btcd-menu-list">
        <Link to={`/builder/edit/${props.formID}`} type="button" aria-label="actions">
          <span className="btcd-icn icn-edit" />
          {'  '}
          Edit
        </Link>
        <button type="button" aria-label="actions">
          <span className="btcd-icn icn-copy" />
          {'  '}
          Duplicate
        </button>
        <button type="button" aria-label="actions" onClick={handleDelete}>
          <span className="btcd-icn icn-trash-2" />
          {'  '}
          Delete
        </button>

      </div>
    </div>
  )
}
