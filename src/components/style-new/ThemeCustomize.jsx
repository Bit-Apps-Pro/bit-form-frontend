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
import { useRecoilState, useSetRecoilState } from 'recoil'
import { $colorScheme, $flags } from '../../GlobalStates'
import ChevronLeft from '../../Icons/ChevronLeft'
import DarkIcn from '../../Icons/DarkIcn'
import LightIcn from '../../Icons/LightIcn'
import ut from '../../styles/2.utilities'

import FormContainerCustomizer from './FormContainerCustomizer'
import FormWrapperCustomizer from './FormWrapperCustomizer'

import ErrorMessagesCustomizer from './ErrorMessagesCustomizer'
import FieldContainerCustomizer from './FieldContainerCustomizer'
import HelperTextCustomizer from './HelperTextCustomizer'
import LabelContainerCustomizer from './LabelContainerCustomizer'
import LabelCustomizer from './LabelCustomizer'
import SubTitleCustomizer from './SubTitleCustomizer'
import ThemeQuickTweaksCustomizer from './ThemeQuickTweaksCustomizer'

export default function ThemeCustomize() {
  const { css } = useFela()
  const { formType, formID, element } = useParams()
  const [colorScheme, setColorScheme] = useRecoilState($colorScheme)

  const setFlags = useSetRecoilState($flags)

  useEffect(() => {
    setFlags(oldFlgs => ({ ...oldFlgs, styleMode: true }))
    return () => { setFlags(oldFlgs => ({ ...oldFlgs, styleMode: false })) }
  }, [])

  const genarateTitle = () => {
    switch (element) {
      case 'quick-tweaks': return 'Theme Quick Tweaks'
      case 'field-container': return 'Field Blocks'
      case 'label-container': return 'Label Containers'
      case 'label': return 'Labels'
      case 'subtitle': return 'Sub Labels'
      case 'helper-text': return 'Helper Texts'
      case 'error-messages': return 'Error Messages'
      default: return 'Theme Customization'
    }
  }

  const handlecolorScheme = (colorSchemeName) => setColorScheme(colorSchemeName)

  return (
    <div className={css(cls.mainWrapper)}>
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
            >
              <LightIcn size="17" />
              Light
            </button>
            <button
              onClick={() => handlecolorScheme('dark')}
              data-active={colorScheme === 'dark'}
              className={css(cls.thmBtn, colorScheme === 'dark' && cls.clrActive)}
              type="button"
            >
              <DarkIcn size="17" />
              Dark
            </button>
          </div>
        </div>

        <div className={css(cls.divider)} />

        {element === 'quick-tweaks' && <ThemeQuickTweaksCustomizer />}
        {element === 'form-wrapper' && <FormWrapperCustomizer />}
        {element === 'form-container' && <FormContainerCustomizer />}
        {element === 'field-container' && <FieldContainerCustomizer />}
        {element === 'label-container' && <LabelContainerCustomizer />}
        {element === 'label' && <LabelCustomizer />}
        {element === 'subtitle' && <SubTitleCustomizer />}
        {element === 'helper-text' && <HelperTextCustomizer />}
        {element === 'error-messages' && <ErrorMessagesCustomizer />}

        {[...Array(5).keys()].map((i) => <br key={`${i}-asd`} />)}
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
