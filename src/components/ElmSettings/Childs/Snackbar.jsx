import React, { useEffect, useContext } from 'react'
import { BitappsContext } from '../../../Utils/BitappsContext'

export default function Snackbar() {
  const { snackBar } = useContext(BitappsContext)
  const { message, view } = snackBar
  const { setsnackView, snackView } = view
  const { snackMessage } = message
  useEffect(() => {
    const timer = setTimeout(() => {
      /* if (props.show) {
        props.setSnack(false)
      } */
      if (snackView) {
        setsnackView(false)
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="btcd-snack flx" style={{ right: snackView ? 20 : -200 }}>
      {snackMessage}
      <button onClick={() => setsnackView(false)} className="btcd-snack-cls" type="button">&times;</button>
    </div>
  )
}
