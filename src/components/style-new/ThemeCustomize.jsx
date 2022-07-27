/* eslint-disable no-continue */
/* eslint-disable no-extra-label */
/* eslint-disable no-labels */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-loop-func */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-param-reassign */
import { useEffect } from 'react'
import { useFela } from 'react-fela'
import { Link, useParams } from 'react-router-dom'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { getRecoil } from 'recoil-nexus'
import { $builderRightPanelScroll, $colorScheme, $flags } from '../../GlobalStates/GlobalStates'
import ChevronLeft from '../../Icons/ChevronLeft'
import DarkIcn from '../../Icons/DarkIcn'
import LightIcn from '../../Icons/LightIcn'
import ut from '../../styles/2.utilities'
import style from '../../styles/FieldSettingTitle.style'
import { addToBuilderHistory, generateHistoryData } from '../../Utils/FormBuilderHelper'
import AsteriskCustomizer from './AsteriskCustomizer'
import ButtonCustomizer from './ButtonCustomizer'
import ErrorMessagesCustomizer from './ErrorMessagesCustomizer'
import FieldContainerCustomizer from './FieldContainerCustomizer'
import FormContainerCustomizer from './FormContainerCustomizer'
import FormWrapperCustomizer from './FormWrapperCustomizer'
import HelperTextCustomizer from './HelperTextCustomizer'
import IcnCustomizer from './IcnCustomizer'
import LabelContainerCustomizer from './LabelContainerCustomizer'
import LabelCustomizer from './LabelCustomizer'
import SubTitleCustomizer from './SubTitleCustomizer'
import ThemeQuickTweaksCustomizer from './ThemeQuickTweaksCustomizer'

export default function ThemeCustomize() {
  const { css } = useFela()
  const { formType, formID, element, fieldKey } = useParams()
  const [colorScheme, setColorScheme] = useRecoilState($colorScheme)

  const setFlags = useSetRecoilState($flags)

  const scrollTo = useRecoilValue($builderRightPanelScroll)

  useEffect(() => {
    setFlags(oldFlgs => ({ ...oldFlgs, styleMode: true }))
  }, [])

  const genarateTitle = () => {
    switch (element) {
      case 'quick-tweaks': return 'Theme Quick Tweaks'
      case '_frm-bg': return 'Form Wrapper'
      case '_frm': return 'Form Container'
      case 'field-containers': return 'Field Container(s)'
      case 'label-containers': return 'Label & Subtitle Container(s)'
      case 'lbl': return 'Label(s)'
      case 'lbl-pre-i': return 'Label Leading Icon(s)'
      case 'lbl-suf-i': return 'Label Trailing Icon(s)'
      case 'sub-titl': return 'Sub Title(s)'
      case 'sub-titl-pre-i': return 'Subtitle Leading Icon(s)'
      case 'sub-titl-suf-i': return 'Subtitle Trailing Icon(s)'
      case 'pre-i': return 'Input Leading Icon(s)'
      case 'suf-i': return 'Input Trailing Icons'
      case 'hlp-txt': return 'Helper Text(s)'
      case 'hlp-txt-pre-i': return 'Helper Text Leading Icon(s)'
      case 'hlp-txt-suf-i': return 'Helper Text Trailing Icon(s)'
      case 'err-msg': return 'Error Message(s)'
      case 'err-txt-pre-i': return 'Error Text Leading Icon(s)'
      case 'err-txt-suf-i': return 'Error Text Trailing Icon(s)'
      case 'btn': return 'Button(s)'
      case 'btn-pre-i': return 'Button Leading Icon(s)'
      case 'btn-suf-i': return 'Button Trailing Icon(s)'
      case 'req-smbl': return 'Asterisk Symbol'
      default: return 'Theme Customization'
    }
  }

  const handlecolorScheme = (colorSchemeName) => {
    setColorScheme(colorSchemeName)
    addToBuilderHistory(generateHistoryData(element, fieldKey, 'Color Scheme', colorSchemeName, { colorScheme: getRecoil($colorScheme) }))
  }

  return (
    <div className={css(cls.mainWrapper)}>
      <div className={css(ut.pb1, style.flxColumn, style.fixed, scrollTo && style.shw)}>
        <span className={css({ flxi: 'center', mt: 10 })}>
          <Link
            to={`/form/builder/${formType}/${formID}/themes`}
            className={css([cls.breadcumbLink, ut.fontBody, cls.l1])}
          >
            <ChevronLeft size="14" />
            {' '}
            Themes /
            {' '}
          </Link>
          <span className={css([cls.breadcumbLink, ut.fontBody, cls.l2])}>Theme Customize</span>
        </span>
        <h4 className={css(cls.title)}>
          {genarateTitle()}
          {' '}
          (Global)
        </h4>
      </div>
      <div className={css(cls.divider)} />
      <div className={css(cls.wrp)}>

        <div className={css(ut.flxc, { ws: 'nowrap', cg: 10 })}>
          <h4 className={css(cls.subTitle)}>Color Scheme</h4>
          <div className={css(ut.flxc, ut.w9, ut.mt1)}>
            <button
              onClick={() => handlecolorScheme('light')}
              data-active={colorScheme === 'light'}
              className={css(cls.thmBtn, colorScheme === 'light' && cls.clrActive)}
              type="button"
              data-testid="light-btn"
            >
              <LightIcn size="17" />
              Light
            </button>
            <button
              onClick={() => handlecolorScheme('dark')}
              data-active={colorScheme === 'dark'}
              className={css(cls.thmBtn, colorScheme === 'dark' && cls.clrActive)}
              type="button"
              data-testid="dark-btn"
            >
              <DarkIcn size="17" />
              Dark
            </button>
          </div>
        </div>

        <div className={css(cls.divider)} />

        {element === 'quick-tweaks' && <ThemeQuickTweaksCustomizer />}
        {element === '_frm-bg' && <FormWrapperCustomizer element={element} />}
        {element === '_frm' && <FormContainerCustomizer element={element} />}
        {element === 'field-containers' && <FieldContainerCustomizer />}
        {element === 'label-containers' && <LabelContainerCustomizer />}
        {element === 'lbl' && <LabelCustomizer />}
        {element === 'sub-titl' && <SubTitleCustomizer />}
        {element === 'hlp-txt' && <HelperTextCustomizer />}
        {element === 'err-msg' && <ErrorMessagesCustomizer />}
        {element === 'btn' && <ButtonCustomizer />}
        {element.match(/(pre-i|suf-i)/gi)?.[0] && <IcnCustomizer elementKey={element} />}
        {element === 'req-smbl' && <AsteriskCustomizer />}

        {/* {[...Array(5).keys()].map((i) => <br key={`${i}-asd`} />)} */}
      </div>
    </div>
  )
}

const cls = {
  title: { mt: 5, mb: 2, fs: 18 },
  breadcumbLink: { fs: 11, flxi: 'center', mr: 3, ':focus': { bs: 'none' } },
  l1: { cr: 'var(--white-0-61)', ':hover': { textDecoration: 'underline !important' } },
  l2: { cr: 'var(--white-0-21)' },
  wrp: { ml: 5, mr: 8, mt: 10, fs: 12 },
  mainWrapper: { bd: 'var(--white-100)', w: '97%' },
  subTitle: { mt: 10, mb: 5, fs: 15, cr: 'var(--white-0-31)' },
  // subTitle2: { fs: 14, fw: 500, mt: 10 },
  divider: { bb: '1px solid var(--white-0-83)', mx: 3, my: 10 },
  // container: { ml: 12, mr: 10 },
  // btn: {
  //   b: 'none',
  //   oe: 'none',
  //   brs: 8,
  //   bc: 'var(--white-0-95)',
  //   cur: 'pointer',
  // },
  // pnt: { cur: 'not-allowed' },
  thmBtn: {
    flxi: 'center',
    cg: 4,
    h: 30,
    ws: 'nowrap',
    fs: 12,
    fw: 500,
    b: 'none',
    bd: 'transparent',
    curp: 1,
    py: 8,
    px: 15,
    brs: 20,
    pn: 'relative',
    ':hover:not([data-active="true"])': { bd: 'var(--b-79-96)' },
  },
  clrActive: {
    bd: 'var(--b-50)',
    cr: 'var(--white-100)',
  },
  // accordion: {
  //   py: 10,
  //   bb: '0.5px solid var(--white-0-83)',
  //   w: '95%',
  //   '& .title, .toggle-icn': { curp: 1 },
  // },
}
