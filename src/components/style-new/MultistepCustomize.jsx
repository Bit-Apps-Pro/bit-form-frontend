/* eslint-disable no-continue */
/* eslint-disable no-extra-label */
/* eslint-disable no-labels */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-loop-func */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-param-reassign */
import { useAtomValue, useSetAtom } from 'jotai'
import { useEffect } from 'react'
import { useFela } from 'react-fela'
import { Link, useParams } from 'react-router-dom'
import { $builderRightPanelScroll, $flags } from '../../GlobalStates/GlobalStates'
import ChevronLeft from '../../Icons/ChevronLeft'
import ut from '../../styles/2.utilities'
import style from '../../styles/FieldSettingTitle.style'
import MultiStepCommonStyle from './MultiStepCommonStyle'

export default function MultiStepCustomize() {
  const { css } = useFela()
  const { formType, formID, element } = useParams()
  const setFlags = useSetAtom($flags)
  const scrollTo = useAtomValue($builderRightPanelScroll)

  useEffect(() => {
    setFlags(oldFlgs => ({ ...oldFlgs, styleMode: true }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const genarateTitle = () => {
    const title = {
      'quick-tweaks': 'Multi Step Quick Tweaks',
      'stp-cntnr': 'Step Container',
      'stp-hdr-wrpr': 'Step Header Wrapper',
      'stp-hdr': 'Step Header',
      'stp-icn-cntn': 'Step Icon',
      'stp-hdr-lbl': 'Step Header Label',
      'stp-hdr-sub-titl': 'Step Header Subtitle',
      'stp-wrpr': 'Step Wrapper',
      'stp-progress-wrpr': 'Step Progress Wrapper',
      'stp-progress-bar': 'Step Progress Bar',
      'stp-cntn': 'Step Content',
      'stp-btn-wrpr': 'Step Button Wrapper',
      'stp-btn': 'Step Button',
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
          <span className={css([cls.breadcumbLink, ut.fontBody, cls.l2])}>Multi Step Customize</span>
        </span>
        <h4 className={css(cls.title)}>
          {genarateTitle()}
          {' '}
          (Global)
        </h4>
      </div>
      <div className={css(cls.wrp)}>
        {element === 'quick-tweaks' && <span>Multi step quick tweaks is not availabe. this feature will comming soon.</span>}
        {element !== 'quick-tweaks' && <MultiStepCommonStyle element={element} isMultistep />}
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
  divider: { bb: '1px solid var(--white-0-83)', mx: 3, my: 10 },
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
}
