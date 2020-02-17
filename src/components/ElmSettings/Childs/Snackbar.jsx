import React, { useState, useEffect } from 'react'

export default function Snackbar(props) {
  const [show, setShow] = useState(props.show)

  useEffect(() => {
    setShow(props.show)
  }, [props.show])

  return (
    <div className="btcd-snack flx" style={{ right: show ? 20 : -200 }}>
      {props.msg}
      <button onClick={() => setShow(false)} className="btcd-snack-cls" type="button">&times;</button>
    </div>
  )
}
