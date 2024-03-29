import { useEffect, useState } from 'react'
import { useFela } from 'react-fela'
import { Link, useNavigate } from 'react-router-dom'
import space from '../resource/img/space.svg'
import app from '../styles/app.style'
import { __ } from '../Utils/i18nwrap'

export default function Error404() {
  const { css } = useFela()
  const [sec, setsec] = useState(9)
  const navigate = useNavigate()
  useEffect(() => {
    setTimeout(() => {
      if (sec === 0) {
        navigate('/')
      }
      setsec(sec - 1)
    }, 1000)
  }, [navigate, sec])

  return (
    <div className="error-404">
      <div>
        <div className="four">{__('404')}</div>
        <div className="t">{__('Lost In Space')}</div>
        <br />
        {__('Redirecting Home in')}
        {' '}
        {sec}
        <br />
        <br />
        <Link to="/" className={`${css(app.btn)} dp-blue btcd-btn-lg`}>{__('Go Home')}</Link>
      </div>
      <img src={space} alt="404 not found" />
    </div>
  )
}
