import { useEffect } from 'react'
import { Scrollbars } from 'react-custom-scrollbars-2'
import { useFela } from 'react-fela'
import { Outlet, Link, Route, Routes, useLocation, useParams } from 'react-router-dom'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { $builderRightPanelScroll, $unsplashMdl } from '../../GlobalStates/GlobalStates'
import BackIcn from '../../Icons/BackIcn'
import BtnIcn from '../../Icons/BtnIcn'
import DropDownIcn from '../../Icons/DropDownIcn'
import FieldIcn from '../../Icons/FieldIcn'
import FormIcn from '../../Icons/FormIcn'
import ImageIcn from '../../Icons/ImageIcn'
import ItemBlockIcn from '../../Icons/ItemBlockIcn'
import PaypalIcn from '../../Icons/PaypalIcn'
import { select } from '../../Utils/globalHelpers'
import { __ } from '../../Utils/i18nwrap'
import ErrorBoundary from '../ErrorBoundary'
import FieldStyleCustomizeHOC from '../style-new/FieldStyleCustomize'
import ThemeCustomize from '../style-new/ThemeCustomize'
import ThemeGallary from '../style-new/ThemeGallary'
import Modal from '../Utilities/Modal'
import FieldLinkBtn from './FieldLinkButton'
import FieldSettings from './FieldSettings'
import FieldsList from './FieldsList'
import DropdownStyleEditors from './StyleCustomize/DropdownStyleEditors'
import PaypalStyleEditor from './StyleCustomize/PaypalStyleEditor'
import StyleEditor from './StyleCustomize/StyleEditor'
import styleEditorConfig from './StyleCustomize/StyleEditorConfig'
import UnsplashImageViewer from './StyleCustomize/UnsplashImageViewer'

function BuilderRightPanel({ style, styleDispatch, brkPoint, setResponsiveView }) {
  // TODO change useRouteMatch
  // const { path } = useRouteMatch()
  const { pathname } = useLocation()
  const { formType, formID, fieldKey, rightBar, element } = useParams()
  const { css } = useFela()
  const setScrollTop = useSetRecoilState($builderRightPanelScroll)
  const [unsplashMdl, setUnsplashMdl] = useRecoilState($unsplashMdl)
  const params = useParams()
  console.log('BuilderRightpanel', params)

  useEffect(() => {
    const settingsScroll = select('.settings')?.firstChild?.firstChild
    if (settingsScroll && settingsScroll.scrollTop > 0) settingsScroll.scrollTop = 0
  }, [fieldKey, rightBar, element])

  const onSettingScroll = ({ target: { scrollTop } }) => (scrollTop > 20 ? setScrollTop(true) : setScrollTop(false))

  return (
    <>
      <div className={css(c.elmSettings)}>
        {/* <div className="elm-settings-title pos-rel flx" style={{ ...scrollTopShadow && { boxShadow: '0 0px 16px 2px #b0b7d8' } }}>
        <TabLink title={__('Field')} sub={__('Settings')} icn="settings" link="fs" />
        <TabLink title={__('Style')} sub={__('Customize')} icn={<i className="mr-2"><BrushIcn height="22" width="22" /></i>} link="style" />
      </div> */}
        {/* <div className="btcd-hr" /> */}
        <div className="settings">
          <Scrollbars onScroll={onSettingScroll} autoHide>
            {/* <TransitionGroup> */}
            {/* <CSSTransition key={location.key} classNames="slide" timeout={5000}> */}
            <ErrorBoundary>

              <Routes>
                <Route path="fields-list" element={<FieldsList />} />
                <Route path="field-settings/:fieldKey" element={<FieldSettings />} />
                <Route path={`themes`} element={<ThemeGallary />} />
                <Route path={`theme-customize/:element`} element={<ThemeCustomize />} />
                <Route path={`field-theme-customize/:element/:fieldKey`} element={<FieldStyleCustomizeHOC />} />

                {/* <Route exact path={`${pathname}/style`}>
                <Link to={`/form/builder/${formType}/${formID}/style/bg`}>
                  <FieldLinkBtn icn={<ImageIcn w="20" />} title={__('Background Customize')} />
                </Link>
                <Link to={`/form/builder/${formType}/${formID}/style/f`}>
                  <FieldLinkBtn icn={<FormIcn w="20" />} title={__('Form Customize')} />
                </Link>
                <Link to={`/form/builder/${formType}/${formID}/style/fb`}>
                  <FieldLinkBtn icn={<ItemBlockIcn w="20" />} title={__('Field Block Customize')} />
                </Link>
                <Link to={`/form/builder/${formType}/${formID}/style/fl`}>
                  <FieldLinkBtn icn={<FieldIcn w="20" />} title={__('Field Customize')} />
                </Link>
              </Route> */}
                <Route
                  path={`${pathname}/style/bg`}
                  element={<StyleEditor editorLabel={__('Form Background')} compStyle={style} cls={`._frm-bg-${formID}`} styleDispatch={styleDispatch} brkPoint={brkPoint} setResponsiveView={setResponsiveView} styleConfig={styleEditorConfig.formbg} formID={formID} />}
                />
                <Route
                  path={`${pathname}/style/f`}
                  element={<StyleEditor editorLabel={__('Form style')} compStyle={style} cls={`._frm-${formID}`} styleDispatch={styleDispatch} brkPoint={brkPoint} setResponsiveView={setResponsiveView} styleConfig={styleEditorConfig.form} formID={formID} />}
                />
                <Route
                  path={`${pathname}/style/fb`}
                  element={<StyleEditor editorLabel={__('Field Block')} compStyle={style} cls={`.fld-wrp-${formID}`} styleDispatch={styleDispatch} brkPoint={brkPoint} setResponsiveView={setResponsiveView} styleConfig={styleEditorConfig.field_block} formID={formID} />}
                />

                {/* <Route
                  path={`${pathname}/style/fl`}
                  element={
                    (
                      <>
                        <Link to={`/form/builder/${formType}/${formID}/style`}>
                          <h4 className="w-9 mt-2 m-a flx txt-dp">
                            <button className="icn-btn" type="button" aria-label="back btn">
                              <BackIcn />
                            </button>
                            <div className="flx w-10">
                              <span>{__('Back')}</span>
                              <div className="txt-center w-10 f-5">{__('Field Customize')}</div>
                            </div>
                          </h4>
                        </Link>
                        <Link to={`/form/builder/${formType}/${formID}/style/fl/fld`}>
                          <FieldLinkBtn icn={<FieldIcn w="20" />} title={__('Field Style')} />
                        </Link>
                        <Link to={`/form/builder/${formType}/${formID}/style/fl/dpd`}>
                          <FieldLinkBtn icn={<DropDownIcn w="20" />} title="Dropdown Style" />
                        </Link>
                        <Link to={`/form/builder/${formType}/${formID}/style/fl/ppl`}>
                          <FieldLinkBtn icn={<PaypalIcn w="20" />} title={__('Paypal Style')} />
                        </Link>
                        <Link to={`/form/builder/${formType}/${formID}/style/fl/btn`}>
                          <FieldLinkBtn icn={<BtnIcn size="24" />} title="Button Style" />
                        </Link>
                        <Outlet />
                      </>
                    )
                  }
                /> */}
                <Route
                  path={`${pathname}/style/fl/fld`}
                  element={
                    (
                      <>
                        <StyleEditor editorLabel={__('Field Style')} title={__('Label Style')} compStyle={style} cls={`.fld-lbl-${formID}`} styleDispatch={styleDispatch} brkPoint={brkPoint} setResponsiveView={setResponsiveView} styleConfig={styleEditorConfig.field_label} formID={formID} />
                        <StyleEditor title={__('Field Style')} noBack compStyle={style} cls={`input.fld-${formID},textarea.fld-${formID}`} styleDispatch={styleDispatch} brkPoint={brkPoint} setResponsiveView={setResponsiveView} styleConfig={styleEditorConfig.field} formID={formID} />
                      </>
                    )
                  }
                />

                <Route path={`${pathname}/style/fl/ppl`} element={<PaypalStyleEditor />} />

                <Route
                  path={`${pathname}/style/fl/dpd`}
                  element={(
                    <DropdownStyleEditors
                      editorLabel="Dropdown Style"
                      {...{ style, styleDispatch, brkPoint, setResponsiveView, styleEditorConfig, formID }}
                    />
                  )}
                />

                <Route
                  path={`${pathname}/style/fl/btn`}
                  element={(
                    <StyleEditor
                      title={`${__('Button Style')}`}
                      noBack
                      compStyle={style}
                      cls=".btcd-sub-btn"
                      styleDispatch={styleDispatch}
                      brkPoint={brkPoint}
                      setResponsiveView={setResponsiveView}
                      styleConfig={styleEditorConfig.button}
                      formID={formID}
                    />
                  )}
                />
              </Routes>
            </ErrorBoundary>
            {/* </CSSTransition> */}
            {/* </TransitionGroup> */}
            <div className="mb-50" />
          </Scrollbars>
        </div>
      </div>
      <Modal
        md
        autoHeight
        show={unsplashMdl}
        setModal={setUnsplashMdl}
        className="o-v"
        title={__('Unsplash Images')}
      >
        <div className="pos-rel" />
        <UnsplashImageViewer setModal={setUnsplashMdl} />
      </Modal>
    </>
  )
}
export default BuilderRightPanel

const c = {
  elmSettings: {
    bd: 'var(--white-100)',
    h: '100%',
    mxw: 400,
    pl: 5,
    mnw: 270,
    mr: 0,
    ml: 'auto',
    fs: 18,
  },
}
