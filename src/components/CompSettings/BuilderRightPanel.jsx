import { Scrollbars } from 'react-custom-scrollbars-2'
import { useFela } from 'react-fela'
import { Link, Route, Switch, useParams, useRouteMatch } from 'react-router-dom'
import BackIcn from '../../Icons/BackIcn'
import BtnIcn from '../../Icons/BtnIcn'
import DropDownIcn from '../../Icons/DropDownIcn'
import FieldIcn from '../../Icons/FieldIcn'
import FormIcn from '../../Icons/FormIcn'
import ImageIcn from '../../Icons/ImageIcn'
import ItemBlockIcn from '../../Icons/ItemBlockIcn'
import PaypalIcn from '../../Icons/PaypalIcn'
import { __ } from '../../Utils/i18nwrap'
import FieldStyleCustomizeHOC from '../style-new/FieldStyleCustomize'
import ThemeCustomize from '../style-new/ThemeCustomize'
import ThemeGallary from '../style-new/ThemeGallary'
import FieldLinkBtn from './FieldLinkButton'
import FieldSettings from './FieldSettings'
import FieldsList from './FieldsList'
import DropdownStyleEditors from './StyleCustomize/DropdownStyleEditors'
import PaypalStyleEditor from './StyleCustomize/PaypalStyleEditor'
import StyleEditor from './StyleCustomize/StyleEditor'
import styleEditorConfig from './StyleCustomize/StyleEditorConfig'

function BuilderRightPanel({ style, styleDispatch, brkPoint, setResponsiveView }) {
  const { path } = useRouteMatch()
  const { formType, formID } = useParams()
  const { css } = useFela()

  // const [scrollTopShadow, setScrollTopShadow] = useState(false)

  // const onSettingScroll = ({ target: { scrollTop } }) => {
  //   scrollTop > 20 ? setScrollTopShadow(true) : setScrollTopShadow(false)
  // }
  return (
    <div className={css(c.elmSettings)}>
      {/* <div className="elm-settings-title pos-rel flx" style={{ ...scrollTopShadow && { boxShadow: '0 0px 16px 2px #b0b7d8' } }}>
        <TabLink title={__('Field', 'bitform')} sub={__('Settings', 'bitform')} icn="settings" link="fs" />
        <TabLink title={__('Style', 'bitform')} sub={__('Customize', 'bitform')} icn={<i className="mr-2"><BrushIcn height="22" width="22" /></i>} link="style" />
      </div> */}
      {/* <div className="btcd-hr" /> */}
      <div className="settings">
        <Scrollbars
          // onScroll={onSettingScroll}
          autoHide
        >
          {/* <TransitionGroup> */}
          {/* <CSSTransition key={location.key} classNames="slide" timeout={5000}> */}

          <Switch>
            <Route path={`${path}/fields-list`} component={FieldsList} />
            <Route path={`${path}/field-settings/:fieldKey`} component={FieldSettings} />
            <Route path={`${path}/themes`}><ThemeGallary /></Route>
            <Route path={`${path}/theme-customize/:element`}><ThemeCustomize /></Route>
            <Route path={`${path}/field-theme-customize/:element/:fieldKey`}><FieldStyleCustomizeHOC /></Route>

            <Route exact path={`${path}/style`}>
              <Link to={`/form/builder/${formType}/${formID}/style/bg`}>
                <FieldLinkBtn icn={<ImageIcn w="20" />} title={__('Background Customize', 'bitform')} />
              </Link>
              <Link to={`/form/builder/${formType}/${formID}/style/f`}>
                <FieldLinkBtn icn={<FormIcn w="20" />} title={__('Form Customize', 'bitform')} />
              </Link>
              <Link to={`/form/builder/${formType}/${formID}/style/fb`}>
                <FieldLinkBtn icn={<ItemBlockIcn w="20" />} title={__('Field Block Customize', 'bitform')} />
              </Link>
              <Link to={`/form/builder/${formType}/${formID}/style/fl`}>
                <FieldLinkBtn icn={<FieldIcn w="20" />} title={__('Field Customize', 'bitform')} />
              </Link>
            </Route>
            <Route path={`${path}/style/bg`}>
              <StyleEditor editorLabel={__('Form Background', 'bitform')} compStyle={style} cls={`._frm-bg-${formID}`} styleDispatch={styleDispatch} brkPoint={brkPoint} setResponsiveView={setResponsiveView} styleConfig={styleEditorConfig.formbg} formID={formID} />
            </Route>
            <Route path={`${path}/style/f`}>
              <StyleEditor editorLabel={__('Form style', 'bitform')} compStyle={style} cls={`._frm-${formID}`} styleDispatch={styleDispatch} brkPoint={brkPoint} setResponsiveView={setResponsiveView} styleConfig={styleEditorConfig.form} formID={formID} />
            </Route>
            <Route path={`${path}/style/fb`}>
              <StyleEditor editorLabel={__('Field Block', 'bitform')} compStyle={style} cls={`.fld-wrp-${formID}`} styleDispatch={styleDispatch} brkPoint={brkPoint} setResponsiveView={setResponsiveView} styleConfig={styleEditorConfig.field_block} formID={formID} />
            </Route>
            <Route exact path={`${path}/style/fl`}>
              <Link to={`/form/builder/${formType}/${formID}/style`}>
                <h4 className="w-9 mt-2 m-a flx txt-dp">
                  <button className="icn-btn" type="button" aria-label="back btn">
                    <BackIcn />
                  </button>
                  <div className="flx w-10">
                    <span>{__('Back', 'bitform')}</span>
                    <div className="txt-center w-10 f-5">{__('Field Customize', 'bitform')}</div>
                  </div>
                </h4>
              </Link>
              <Link to={`/form/builder/${formType}/${formID}/style/fl/fld`}>
                <FieldLinkBtn icn={<FieldIcn w="20" />} title={__('Field Style', 'bitform')} />
              </Link>
              <Link to={`/form/builder/${formType}/${formID}/style/fl/dpd`}>
                <FieldLinkBtn icn={<DropDownIcn w="20" />} title="Dropdown Style" />
              </Link>
              <Link to={`/form/builder/${formType}/${formID}/style/fl/ppl`}>
                <FieldLinkBtn icn={<PaypalIcn w="20" />} title={__('Paypal Style', 'bitform')} />
              </Link>
              <Link to={`/form/builder/${formType}/${formID}/style/fl/btn`}>
                <FieldLinkBtn icn={<BtnIcn size="24" />} title="Button Style" />
              </Link>
            </Route>
            <Route path={`${path}/style/fl/fld`}>
              <StyleEditor editorLabel={__('Field Style', 'bitform')} title={__('Label Style', 'bitform')} compStyle={style} cls={`.fld-lbl-${formID}`} styleDispatch={styleDispatch} brkPoint={brkPoint} setResponsiveView={setResponsiveView} styleConfig={styleEditorConfig.field_label} formID={formID} />
              <StyleEditor title={__('Field Style', 'bitform')} noBack compStyle={style} cls={`input.fld-${formID},textarea.fld-${formID}`} styleDispatch={styleDispatch} brkPoint={brkPoint} setResponsiveView={setResponsiveView} styleConfig={styleEditorConfig.field} formID={formID} />
            </Route>
            <Route path={`${path}/style/fl/ppl`}>
              <PaypalStyleEditor />
            </Route>
            <Route path={`${path}/style/fl/dpd`}>
              <DropdownStyleEditors
                editorLabel="Dropdown Style"
                {...{ style, styleDispatch, brkPoint, setResponsiveView, styleEditorConfig, formID }}
              />
            </Route>
            <Route path={`${path}/style/fl/btn`}>
              <StyleEditor
                title={`${__('Button Style', 'bitform')}`}
                noBack
                compStyle={style}
                cls=".btcd-sub-btn"
                styleDispatch={styleDispatch}
                brkPoint={brkPoint}
                setResponsiveView={setResponsiveView}
                styleConfig={styleEditorConfig.button}
                formID={formID}
              />
            </Route>
          </Switch>
          {/* </CSSTransition> */}
          {/* </TransitionGroup> */}
          <div className="mb-50" />
        </Scrollbars>
      </div>
    </div>
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
