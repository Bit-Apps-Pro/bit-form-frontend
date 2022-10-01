import { useState } from 'react'
import { useFela } from 'react-fela'
import CloseIcn from '../../../Icons/CloseIcn'
import ut from '../../../styles/2.utilities'
import bitsFetch from '../../../Utils/bitsFetch'
import { deepCopy } from '../../../Utils/Helpers'
import { __ } from '../../../Utils/i18nwrap'
import tutorialLinks from '../../../Utils/StaticData/tutorialLinks'
import LoaderSm from '../../Loaders/LoaderSm'
import Btn from '../../Utilities/Btn'
import TutorialLink from '../../Utilities/TutorialLink'
import NextBtn from '../NextBtn'

export default function WooCommerceAuthorization({ wcConf, setWcConf, step, setStep, setSnackbar }) {
  const [isAuthorized, setisAuthorized] = useState(false)
  const [isLoading, setisLoading] = useState(false)
  const [showAuthMsg, setShowAuthMsg] = useState(false)
  const { css } = useFela()

  const authorizeHandler = () => {
    setisLoading('auth')
    bitsFetch({}, 'bitforms_wc_authorize')
      .then(result => {
        if (result?.success) {
          setisAuthorized(true)
          setSnackbar({ show: true, msg: __('Connected with WooCommerce Successfully') })
        }
        setisLoading(false)
        setShowAuthMsg(true)
      })
  }

  const handleInput = e => {
    const newConf = deepCopy(wcConf)
    newConf[e.target.name] = e.target.value
    setWcConf(newConf)
  }

  return (
    <>
      <TutorialLink
        title={tutorialLinks.wooCommerce.title}
        youTubeLink={tutorialLinks.wooCommerce.link}
      />
      <div
        className="btcd-stp-page"
        style={{
          width: step === 1 && 900,
          height: step === 1 && `${100}%`,
        }}
      >
        <div className="mt-3">
          <b>{__('Integration Name:')}</b>
        </div>
        <input
          className="btcd-paper-inp w-6 mt-1"
          onChange={handleInput}
          name="name"
          value={wcConf.name}
          type="text"
          placeholder={__('Integration Name...')}
        />

        {isLoading === 'auth' && (
          <div className="flx mt-5">
            <LoaderSm size={25} clr="#022217" className="mr-2" />
            Checking if WooCommerce is active!!!
          </div>
        )}

        {(showAuthMsg && !isAuthorized && !isLoading) && (
          <div className="flx mt-5" style={{ color: 'red' }}>
            <span className="mr-2" style={{ fontSize: 30, marginTop: -5 }}>
              <CloseIcn size="15" />
            </span>
            WooCommerce plugin must be activated to integrate with Bit Form.
          </div>
        )}

        {!isAuthorized && (
          <Btn
            variant="success"
            onClick={authorizeHandler}
            className={css(ut.mt3, ut.mb3, { ml: 3 })}
          >
            {__('Connect')}
          </Btn>
        )}

        {isAuthorized && (
          <NextBtn
            nextPageHanlder={() => setStep(2)}
            disabled={!isAuthorized}
          />
        )}
      </div>
    </>
  )
}
