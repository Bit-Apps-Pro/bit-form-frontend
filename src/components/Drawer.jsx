import React from 'react'

function Drawer(props) {
  console.log('%c $render Drawer', 'background:tomato;padding:3px;border-radius:5px')

  return (
    <div className="btcd-drawer" style={{ right: props.show ? 0 : -420 }}>
      <button onClick={() => props.close(false)} className="icn-btn btcd-mdl-close" aria-label="modal-close" type="button"><span>&#10799;</span></button>
      <h3 className="btcd-mdl-title">{props.title}</h3>
      <small className="btcd-mdl-subtitle">{props.subTitle}</small>
      <div className="btcd-mdl-div" />

      {props.children}
    </div>
  )
}

export default Drawer
