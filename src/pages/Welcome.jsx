import greeting from '../resource/img/home.svg'

export default function Welcome({ setModal }) {
  return (
    <div className="btcd-greeting">
      <img src={greeting} alt="" />
      <h2>Welcome to Bit Form</h2>
      <div className="sub">
        Thank you for installing Bit Form.
      </div>
      <div>
        Modern Form builder and database management  system
        <br />
        for Wordpress
      </div>
      <button onClick={() => setModal(true)} type="button" className="btn round btcd-btn-lg dp-blue">Create First From</button>
    </div>
  )
}
