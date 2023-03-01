import { useState } from 'react'
import { useFela } from 'react-fela'
import { Link, useParams } from 'react-router-dom'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { $fields, $formId } from '../../GlobalStates/GlobalStates'
import { $allStyles, $styles } from '../../GlobalStates/StylesState'
import { $allThemeColors } from '../../GlobalStates/ThemeColorsState'
import { $allThemeVars } from '../../GlobalStates/ThemeVarsState'
import CheckMarkIcn from '../../Icons/CheckMarkIcn'
import EditIcn from '../../Icons/EditIcn'
import EyeIcon from '../../Icons/EyeIcon'
import SliderModal from '../Utilities/SliderModal'
import Tip from '../Utilities/Tip'
import themeProvider from './themes/themeProvider'
import themes from './themes/themeList'
import { addToBuilderHistory, generateHistoryData, reCalculateFldHeights } from '../../Utils/FormBuilderHelper'
import Btn from '../Utilities/Btn'

export default function ThemeGallary() {
  const { css } = useFela()

  const setAllThemeColors = useSetRecoilState($allThemeColors)
  const setAllThemeVars = useSetRecoilState($allThemeVars)
  const setAllStyles = useSetRecoilState($allStyles)

  const currentStyles = useRecoilValue($styles)
  const formId = useRecoilValue($formId)
  const fields = useRecoilValue($fields)
  const fieldsArray = Object.entries(fields)
  const activeTheme = themes.find(theme => theme.slug === currentStyles.theme)
  const [modal, setModal] = useState({ show: false })

  const handleThemeApply = (themeSlug) => {
    const { themeColors, themeVars, styles } = themeProvider(themeSlug, fieldsArray, formId)
    if (currentStyles.confirmations && styles.lgLightStyles) styles.lgLightStyles.confirmations = [...currentStyles.confirmations]
    setAllThemeColors(themeColors)
    setAllThemeVars(themeVars)
    setAllStyles(styles)
    addToBuilderHistory(generateHistoryData('', '', 'Theme', themeSlug, { allThemeColors: themeColors, allThemeVars: themeVars, allStyles: styles }))
    reCalculateFldHeights()
  }

  const handleSliderModal = (index, _themes) => {
    setModal(prev => ({ ...prev, title: _themes[index].name, slug: _themes[index].slug }))
  }

  const openPreviewModal = (i) => {
    setModal(prev => ({
      ...prev,
      show: true,
      title: themes[i].name,
      slug: themes[i].slug,
      activeSlideIndex: i,
    }))
  }

  const onModalThemeActive = () => {
    handleThemeApply(modal.slug)
    setModal(prev => ({ ...prev, show: false }))
  }

  return (
    <div className={css(themeGalStyle.wrp)}>
      <SliderModal
        title={(
          <div className={css({ flx: 'center-between', w: '100%' })}>
            <h4 className={css(themeGalStyle.title)}>{modal.title}</h4>
            <Btn
              size="sm"
              onClick={onModalThemeActive}
              disabled={activeTheme?.slug === modal?.slug}
              gap={5}
              className={css({ mr: 10, my: 5 })}
            >
              Activate
              <CheckMarkIcn size="12" />
            </Btn>
          </div>
        )}
        show={modal.show}
        defaultActiveSlideIndex={modal.activeSlideIndex}
        setModal={setModal}
        onChange={(i) => handleSliderModal(i, themes)}
      >
        {themes.map(theme => (
          <div key={theme.name} className={css(themeGalStyle.previewWrapper)}>
            <img className={css(themeGalStyle.previewImg)} src={theme.img} alt="theme-thumbnail" />
          </div>
        ))}
      </SliderModal>

      <h4 className={css(themeGalStyle.title)}>Themes</h4>
      <div className={css(themeGalStyle.thm_container)}>
        {themes.map((theme, i) => (
          <ThemePreviewCard
            key={theme.name}
            onPreviewClick={() => openPreviewModal(i)}
            applyThemeAction={() => handleThemeApply(theme.slug)}
            name={theme.name}
            img={theme.img}
            isActive={activeTheme.slug === theme.slug}
          />
        ))}
      </div>
    </div>
  )
}

const ThemePreviewCard = ({
  name,
  img,
  isActive,
  applyThemeAction,
  onPreviewClick,
}) => {
  const { formType, formID } = useParams()
  const { css } = useFela()

  return (
    <div className={css(themeGalStyle.thm_wrp)}>
      <div className={css(themeGalStyle.thm_btn, isActive && themeGalStyle.activeStyle)}>
        <div data-thm-ctrl-wrp className={css(themeGalStyle.thm_control_wrp)}>
          <Tip msg="Preview">
            <button
              onClick={onPreviewClick}
              type="button"
              className={css(themeGalStyle.thm_ctrl_btn)}
              aria-label="Theme Preview"
            >
              <EyeIcon size="20" />
            </button>
          </Tip>
          {isActive ? (
            <Tip msg="Customize theme">
              <Link
                to={`/form/builder/${formType}/${formID}/theme-customize/quick-tweaks`}
                type="button"
                className={css(themeGalStyle.thm_ctrl_btn)}
                aria-label="Theme Customize"
              >
                <EditIcn size="20" stroke="2.2" />
              </Link>
            </Tip>
          ) : (
            <Tip msg="Apply Theme">
              <button
                type="button"
                onClick={applyThemeAction}
                className={css(themeGalStyle.thm_ctrl_btn)}
                aria-label="Theme Preview"
              >
                <CheckMarkIcn size="20px" />
              </button>
            </Tip>
          )}
        </div>
        <img
          className={css(themeGalStyle.thmImg)}
          width="120"
          height="147.64"
          alt="Theme thumbnail"
          src={img}
        />
      </div>
      <span className={css(themeGalStyle.thm_name)}>{name}</span>
    </div>
  )
}

const themeGalStyle = {
  wrp: { bd: 'var(--white-100)' },
  title: {
    mt: 10,
    mb: 5,
  },
  thmImg: { dy: 'block' },
  thm_container: {
    flx: 1,
    flxp: 'jc',
  },
  thm_wrp: {
    w: 124,
    h: 170,
    flxi: 1,
    fd: 'column',
    mx: 5,
    mt: 10,
  },
  thm_btn: {
    pn: 'relative',
    curp: 1,
    b: '2px solid var(--white-0-83)',
    brs: 8,
    p: 0,
    bd: 'var(--white-100)',
    ow: 'hidden',
    ':hover': {
      bcr: 'var(--white-0-50)',
      '& div[data-thm-ctrl-wrp]': { oy: '1 !important', visibility: 'visible' },
    },
  },
  thm_name: {
    fs: 13,
    mt: 4,
  },
  thm_control_wrp: {
    pn: 'absolute',
    w: '100%',
    h: '100%',
    bd: '#1a1b318c',
    backdropFilter: 'blur(2px)',
    flx: 'center',
    oy: 0,
    visibility: 'hidden',
    tn: 'opacity .3s',
  },
  thm_ctrl_btn: {
    p: 0,
    brs: '50%',
    w: 30,
    h: 30,
    b: '1px solid gray',
    flx: 'center',
    mx: 2,
    curp: 1,
    cr: 'var(--b-54-12)',
    bd: 'var(--white-0-95)',
    ':hover': {
      cr: 'var(--b-50)',
      bd: 'var(--white-100)',
    },
  },
  activeStyle: {
    bcr: 'var(--b-50)',
    bs: '0 0 0 2px var(--b-50)',
  },
  previewWrapper: {
    w: '100%',
    h: '100%',
    p: '10px 60px',
    bd: '#d4d9e6',
    flx: 'center',
  },
  previewImg: {
    w: '90%',
    b: '2px solid #bbbfd3',
    brs: '10px',
  },
}
