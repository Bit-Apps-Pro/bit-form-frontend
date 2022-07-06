import { CSSTransition } from 'react-transition-group'
import RenderHtml from './RenderHtml'

function SnackMsg({ snack, setSnackbar }) {
  const { show, msg } = snack

  return (
    <CSSTransition
      in={show}
      timeout={3000}
      classNames="flx btcd-snack btcd-snack-a"
      onEntered={() => setSnackbar({ show: false, msg })}
      unmountOnExit
    >
      <div>
        <span><RenderHtml html={msg} /></span>
        <button onClick={() => setSnackbar({ show: false, msg })} className="btcd-snack-cls" type="button">&times;</button>
      </div>
    </CSSTransition>
  )
}

export default SnackMsg
