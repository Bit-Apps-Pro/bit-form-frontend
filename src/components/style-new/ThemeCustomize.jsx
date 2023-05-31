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
import { useAtomValue, useSetRecoilState } from 'recoil'
import { $builderRightPanelScroll, $flags } from '../../GlobalStates/GlobalStates'
import ChevronLeft from '../../Icons/ChevronLeft'
import ut from '../../styles/2.utilities'
import style from '../../styles/FieldSettingTitle.style'
import AsteriskCustomizer from './AsteriskCustomizer'
import ButtonCustomizer from './ButtonCustomizer'
import ErrorMessagesCustomizer from './ErrorMessagesCustomizer'
import FieldContainerCustomizer from './FieldContainerCustomizer'
import FormContainerCustomizer from './FormContainerCustomizer'
import FormWrapperCustomizer from './FormWrapperCustomizer'
import HelperTextCustomizer from './HelperTextCustomizer'
import IcnCustomizer from './IcnCustomizer'
import InputCustomizer from './InputCustomizer'
import LabelContainerCustomizer from './LabelContainerCustomizer'
import LabelCustomizer from './LabelCustomizer'
import SubTitleCustomizer from './SubTitleCustomizer'
import ThemeQuickTweaksCustomizer from './ThemeQuickTweaksCustomizer'

export default function ThemeCustomize() {
  const { css } = useFela()
  const { formType, formID, element } = useParams()
  const setFlags = useSetRecoilState($flags)
  const scrollTo = useAtomValue($builderRightPanelScroll)

  useEffect(() => {
    setFlags(oldFlgs => ({ ...oldFlgs, styleMode: true }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const genarateTitle = () => {
    const title = {
      'quick-tweaks': 'Theme Quick Tweaks',
      '_frm-bg': 'Form Wrapper',
      _frm: 'Form Container',
      'field-containers': 'Field Container(s)',
      'label-containers': 'Label & Subtitle Container(s)',
      lbl: 'Label(s)',
      'lbl-pre-i': 'Label Leading Icon(s)',
      'lbl-suf-i': 'Label Trailing Icon(s)',
      'sub-titl': 'Subtitle(s)',
      'sub-titl-pre-i': 'Subtitle Leading Icon(s)',
      'sub-titl-suf-i': 'Subtitle Trailing Icon(s)',
      fld: 'Input(s)',
      'pre-i': 'Input Leading Icon(s)',
      'suf-i': 'Input Trailing Icons',
      'hlp-txt': 'Helper Text(s)',
      'hlp-txt-pre-i': 'Helper Text Leading Icon(s)',
      'hlp-txt-suf-i': 'Helper Text Trailing Icon(s)',
      'err-msg': 'Error Message(s)',
      'err-txt-pre-i': 'Error Text Leading Icon(s)',
      'err-txt-suf-i': 'Error Text Trailing Icon(s)',
      btn: 'Button(s)',
      'btn-pre-i': 'Button Leading Icon(s)',
      'btn-suf-i': 'Button Trailing Icon(s)',
      'req-smbl': 'Asterisk Symbol',
    }
    return title[element] || 'Theme Customization'
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
        {/* <div className={css(cls.divider)} /> */}
      </div>
      <div className={css(cls.wrp)}>
        {element === 'quick-tweaks' && <ThemeQuickTweaksCustomizer />}
        {element === '_frm-bg' && <FormWrapperCustomizer element={element} />}
        {element === '_frm' && <FormContainerCustomizer element={element} />}
        {element === 'field-containers' && <FieldContainerCustomizer />}
        {element === 'label-containers' && <LabelContainerCustomizer />}
        {element === 'lbl' && <LabelCustomizer />}
        {element === 'sub-titl' && <SubTitleCustomizer />}
        {element === 'fld' && <InputCustomizer />}
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
