import { Link } from 'react-router-dom'

export default function MenuBtn(props) {

  const handleMenuClose = (e) => {
    const el = e.target
    setTimeout(() => {
      el.parentNode.children[1].classList.remove('btcd-m-a')
      el.parentNode.parentNode.parentNode.style.zIndex = 'auto'
    }, 100)
  }

  const hadleClick = (e) => {
    if (e.target.parentNode.children[1].classList.contains('btcd-m-a')) {
      e.target.parentNode.children[1].classList.remove('btcd-m-a')
      e.target.parentNode.parentNode.parentNode.style.zIndex = 'auto'
      e.target.blur()
    } else {
      e.target.parentNode.parentNode.parentNode.style.zIndex = 10
      e.target.parentNode.children[1].classList.add('btcd-m-a')
    }
  }

  return (
    <div className="btcd-menu">
      <button className="btcd-menu-btn btcd-mnu sh-sm" onClick={hadleClick} onBlur={handleMenuClose} aria-label="toggle menu" type="button" />
      <div className="btcd-menu-list">
        <Link to={`/form/builder/edit/${props.formID}/fs`} type="button" aria-label="actions">
          <span className="btcd-icn icn-edit" />
          {'  '}
          Edit
        </Link>
        <button type="button" aria-label="actions" onClick={props.dup}>
          <span className="btcd-icn icn-copy" />
          {'  '}
          Duplicate
        </button>
        <button type="button" aria-label="actions" onClick={props.del}>
          <span className="btcd-icn icn-trash-2" />
          {'  '}
          Delete
        </button>
      </div>
    </div>
  )
}
