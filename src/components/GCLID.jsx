export default function GCLID() {
  const handleAuthorize = () => {

  }


  return (
    <div className="btcd-captcha w-5">
      <h2>GCLID</h2>
      <br />
      <div className="btcd-hr" />

      <div className="mt-2">
        <label htmlFor="captcha-secret">
          Redirect URL
          <input id="captcha-secret" name="secretKey" className="btcd-paper-inp mt-1" placeholder="Redirect URL" type="text" />
        </label>
      </div>
      <div className="mt-2">
        <label htmlFor="captcha-key">
          Client ID
          <input id="captcha-key" name="siteKey" className="btcd-paper-inp mt-1" placeholder="Client ID" type="text" />
        </label>
      </div>
      <div className="mt-2">
        <label htmlFor="captcha-secret">
          Client Secret
          <input id="captcha-secret" name="secretKey" className="btcd-paper-inp mt-1" placeholder="Client Secret" type="text" />
        </label>
      </div>

      <button className="btn btcd-btn-lg green sh-sm flx" type="button" onClick={handleAuthorize}>
        Authorize
        {/* {isLoading && <LoaderSm size="20" clr="#022217" className="ml-2" />} */}
      </button>
      <br />
      <button className="btn f-right btcd-btn-lg blue sh-sm flx" type="button">
        Save
      </button>
    </div>
  )
}
