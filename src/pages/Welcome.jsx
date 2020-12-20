import { __ } from '@wordpress/i18n'
import greeting from '../resource/img/home.svg'

export default function Welcome({ setModal }) {
  return (
    <div className="btcd-greeting">
      <img src={greeting} alt="" />
      <h2>{__('Welcome to Bit Form', 'bitform')}</h2>
      <div className="sub">
        {__('Thank you for installing Bit Form.', 'bitform')}
      </div>
      <div>
        {__('Modern Form builder and database management  system', 'bitform')}
        <br />
        {__('for Wordpress', 'bitform')}
      </div>
      <button onClick={() => setModal(true)} type="button" className="btn round btcd-btn-lg dp-blue">Create First From</button>
    </div>
  )
}
