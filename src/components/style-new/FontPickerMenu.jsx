/* eslint-disable no-unused-expressions */
/* eslint-disable no-param-reassign */
import produce from 'immer'
import { useEffect, useState } from 'react'
import { useFela } from 'react-fela'
import toast from 'react-hot-toast'
import VirtualList from 'react-tiny-virtual-list'
import { useRecoilState, useRecoilValue } from 'recoil'
import useSWR from 'swr'
import { $styles, $tempStyles } from '../../GlobalStates/StylesState'
import { $themeVars } from '../../GlobalStates/ThemeVarsState'
import AtoZSortIcn from '../../Icons/AtoZSortIcn'
import CheckMarkIcn from '../../Icons/CheckMarkIcn'
import SearchIcon from '../../Icons/SearchIcon'
import ut from '../../styles/2.utilities'
import { sortByField } from '../../Utils/Helpers'
import SingleToggle from '../Utilities/SingleToggle'
import StyleSegmentControl from '../Utilities/StyleSegmentControl'
import { findExistingFontStyleAndWeidth, generateFontUrl } from './styleHelpers'

export default function FontPickerMenu() {
  const { css } = useFela()
  const [fonts, setFonts] = useState([])
  const [isSorted, setSorted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [focusSearch, setfocusSearch] = useState(false)
  const [controller, setController] = useState({ parent: 'Custom', child: '' })
  const [themeVars, setThemeVars] = useRecoilState($themeVars)
  const tempStyle = useRecoilValue($tempStyles)
  // const setStyles = useSetRecoilState($styles)
  const [styles, setStyles] = useRecoilState($styles)

  const inheritFont = themeVars['--g-font-family'] === 'inherit' || tempStyle.themeVars['--g-font-family'] === 'inherit'
  const checkGoogleFontExist = (styles.font.fontType === 'google')

  const apiKey = 'AIzaSyB9lRmRi8phfBLNMT3CpTF2DsWNLGfoFWY'
  const uri = `https://www.googleapis.com/webfonts/v1/webfonts?key=${apiKey}&sort=popularity`
  const { data: allFonts } = useSWR(uri, (url) => fetch(url, {})
    .then(res => res.json()))

  useEffect(() => {
    allFonts && setFonts(allFonts.items)
    allFonts && localStorage.setItem('bf-fonts', JSON.stringify(allFonts.items))
    if (!allFonts) {
      setLoading(true)
    } else {
      setLoading(false)
    }
  }, [allFonts])

  const onTabChangeHandler = (lbl, type) => {
    if (type === 'parent') setController({ parent: lbl })
    else if (type === 'child') setController(old => ({ ...old, child: lbl }))
  }

  const findSelectedFontIndx = () => styles.font.fontType === 'google' && allFonts.items.findIndex(itm => itm.family === themeVars['--g-font-family'])

  const searchHandler = (e) => {
    const { value } = e.target
    const oldFonts = JSON.parse(localStorage.getItem('bf-fonts'))
    const filtered = oldFonts.filter(font => font.family.toLowerCase().includes(value.toLowerCase()))
    setFonts(filtered)
  }

  const getGoogleFontWeightStyle = (array) => {
    const weight = []
    const style = ['normal']
    const param = []
    let string = ''

    for (let i = 0; i < array.length; i += 1) {
      const dig = array[i].match(/\d+/gi)?.[0]
      if (dig) {
        if (!weight.includes(Number(dig))) {
          weight.push(Number(dig))
          param.push(`0,${dig};`)
        }
      }
      if (array[i].match(/\d+\D+/gi)) {
        if (dig) {
          param.push(`1,${dig};`)
        }
        const str = array[i].match(/\D+/gi)?.[0]
        if (!style.includes(str)) {
          style.push(str)
        }
      }
    }
    if (weight.length !== 0) {
      const str = param.sort().toString().replaceAll(/;,/gi, ';')
      string = str.substring(0, str.length - 1)
      string = `wght@${string}`
    }
    return [weight, style, string]
  }

  const checkedExistingGoogleFontVariantStyle = () => {
    const weightVariants = styles.font.fontWeightVariants
    const styleVariants = styles.font.fontStyle

    const [fontWeight, fontStyle] = findExistingFontStyleAndWeidth(styles)

    const getNotExistVariant = fontWeight.filter(w => !weightVariants.includes(Number(w)))
    const getNotExiststyle = fontStyle.filter(w => !styleVariants.includes(Number(w)))

    if (getNotExistVariant.length > 0) {
      toast.error(`Not available font weight ${getNotExistVariant.toString()}!`)
    }
    if (getNotExiststyle.length > 0) {
      toast.error(`Not available font style ${getNotExiststyle.toString()}!`)
    }
  }

  const setCheck = (fontFamily, variants) => {
    const [weight, style, string] = getGoogleFontWeightStyle(variants)
    const url = generateFontUrl(fontFamily, string)
    setStyles(prvStyles => produce(prvStyles, drft => {
      drft.font.fontType = 'google'
      drft.font.fontWeightVariants = weight
      drft.font.fontStyle = style
      drft.font.fontURL = url
    }))
    setThemeVars(prvState => produce(prvState, drft => {
      drft['--g-font-family'] = fontFamily
    }))
    styles.font.fontType === 'google' && checkedExistingGoogleFontVariantStyle()
  }

  const fontSorted = (orderBy) => {
    const sorted = sortByField(fonts, 'family', orderBy)
    setSorted(orderBy === 'ASC')
    setFonts(sorted)
  }
  const setThemeFont = ({ target: { checked } }) => {
    const font = checked ? 'inherit' : ''
    setThemeVars(prvState => produce(prvState, drft => {
      drft['--g-font-family'] = font
    }))
    setStyles(prvStyle => produce(prvStyle, drft => {
      drft.font.fontType = font
      drft.font.fontURL = ''
      drft.font.fontStyle = []
      drft.font.fontWeightVariants = []
    }))
  }

  const customFontHandler = ({ target: { name, value } }) => {
    if (name === 'fontURL') {
      setStyles(prvStyle => produce(prvStyle, drft => {
        drft.font.fontType = 'custom'
        drft.font.fontURL = value
        drft.font.fontStyle = []
        drft.font.fontWeightVariants = []
      }))
    } else {
      setStyles(prvStyle => produce(prvStyle, drft => {
        drft.font.fontType = 'custom'
        drft.font.fontStyle = []
        drft.font.fontWeightVariants = []
      }))
      setThemeVars(prvState => produce(prvState, drft => {
        drft['--g-font-family'] = value
      }))
    }
  }

  return (
    <div className={css(fontStyle.container)}>
      <StyleSegmentControl
        options={[{ label: 'Custom' }, { label: 'Google' }]}
        onChange={lbl => onTabChangeHandler(lbl, 'parent')}
        activeValue={controller.parent}
        wideTab
        className={css(inheritFont && fontStyle.disabled)}
      />
      {loading && (
        <div title="Loading...">
          <div className={css(ut.mt2)} />
          {Array(6).fill(1).map((itm, i) => (
            <div
              key={`loderfnt-${i * 2}`}
              title="Loading..."
              className={`${css({ w: '95%', h: 28, brs: 5, lh: 2, my: 3, mx: 5 })} loader`}
            />
          ))}
        </div>
      )}
      {controller.parent === 'Google' && (
        <>
          <div className={css(ut.flxc, fontStyle.searchBar, ut.mt2, ut.mb2)}>
            <div className={css(fontStyle.fields_search)} style={{ width: focusSearch ? '90%' : '78%' }}>
              <input
                title="Search fonts"
                aria-label="Search fonts"
                placeholder="Search fonts..."
                id="search-icon"
                type="search"
                name="searchIcn"
                onChange={searchHandler}
                onFocus={() => setfocusSearch(true)}
                onBlur={() => setfocusSearch(false)}
                className={css(fontStyle.search_field)}
              />
              <span title="search" className={css(fontStyle.search_icn)}>
                <SearchIcon size="20" />
              </span>
            </div>
            {!focusSearch
              && (
                <button
                  title="Sort by ascending order"
                  className={`${css(fontStyle.sort_btn)} ${isSorted && 'active'}`}
                  type="button"
                  onClick={() => fontSorted(isSorted ? 'DESC' : 'ASC')}
                  aria-label="Sort Fonts Family"
                >
                  <AtoZSortIcn size="20" />
                </button>
              )}
          </div>
          <VirtualList
            width="100%"
            height={200}
            itemCount={fonts.length || 1}
            itemSize={fonts.length ? 30 : 0}
            scrollToIndex={fonts.length ? findSelectedFontIndx() : 0}
            scrollToAlignment="auto"
            renderItem={({ index, style }) => (
              <div key={index} style={style}>
                <button
                  className={css(fontStyle.btn)}
                  type="button"
                  onClick={() => setCheck(fonts[index]?.family, fonts[index]?.variants)}
                >
                  <span className={css(fontStyle.title)}>{fonts[index].family}</span>
                  {
                    ((checkGoogleFontExist && (themeVars['--g-font-family'] === fonts[index].family || tempStyle.themeVars['--g-font-family'] === fonts[index].family)))
                    && <CheckMarkIcn className={css(fontStyle.btnColor)} size="19" />
                  }
                </button>
              </div>
            )}
          />
        </>
      )}

      {controller.parent === 'Custom' && (
        <>
          <div className={css(ut.flxcb, ut.mt2)}>
            <span className={css(fontStyle.title)}>Inherit from theme</span>
            <SingleToggle
              name="themeInherit"
              isChecked={inheritFont}
              action={setThemeFont}
            />
          </div>
          {!inheritFont && (
            <>
              <div className={css(ut.flxcb, ut.mt2)}>
                <span className={css(fontStyle.title)}>Link</span>
                <input
                  className={css(fontStyle.url)}
                  onChange={customFontHandler}
                  name="fontURL"
                  aria-label="Custom font url"
                  type="url"
                  placeholder="http://fonts.gstatic.com/s/roboto/v29/KFOkCnqEu92Fr1MmgWxPKTM1K9nz.ttf"
                />
              </div>
              <div className={css(ut.flxcb, ut.mt2)}>
                <span className={css(fontStyle.title)}>Font Family</span>
                <input
                  value={(styles.font.fontType === 'custom' && themeVars['--g-font-family']) || ''}
                  className={css(fontStyle.url)}
                  onChange={customFontHandler}
                  name="font-family"
                  aria-label="Custom font family"
                  type="url"
                  placeholder="Lato"
                />
              </div>
            </>
          )}
        </>
      )}
    </div>
  )
}

const fontStyle = {
  container: { scrollBehavior: 'auto !important', '& *': { scrollBehavior: 'auto !important' } },
  url: {
    w: '60%',
    brs: 8,
    b: 0,
    oe: 0,
    bc: 'var(--white-0-95)',
    p: 5,
  },
  btn: {
    b: 0,
    p: 5,
    h: 30,
    // pr: 36,
    w: '100%',
    brs: 8,
    fw: 500,
    // flx: 'align-center',
    flx: 'center-between',
    pn: 'relative',
    bc: 'var(--white-100)',
    curp: 1,
    '&:hover': {
      bc: 'var(--white-0-93)',
      '& svg': { fr: 'drop-shadow(1px 1px 0.5px #b3b3b3)' },
    },
    '&:focus-visible': {
      oe: 'none',
      bs: '0 0 0 2px var(--b-50) inset',
    },
    '& svg': {
      'flex-shrink': 0,
      w: 20,
      h: 20,
      // mr: 10,
      stroke: 'var(--black-0)',
      '&:nth-of-type(2)': {
        mr: 0,
        pn: 'absolute',
        rt: 8,
      },
    },
  },
  title: { fs: 12 },
  search_field: {
    w: '100%',
    oe: 'none',
    b: '1px solid var(--white-0-75) !important',
    brs: '9px !important',
    pl: '27px !important',
    pr: '5px !important',
    ':focus': {
      bs: '0px 0px 0px 1.5px var(--b-50) !important',
      bcr: 'var(--b-92-62) !important',
      pr: '0px !important',
      '& ~ .shortcut': { dy: 'none' },
      '& ~ span svg': { cr: 'var(--b-50)' },
    },
    '::placeholder': { fs: 12 },
    '::-webkit-search-cancel-button': {
      appearance: 'none',
      w: 14,
      h: 14,
      mr: 10,
      bd: 'var(--white-0-83)',
      curp: 1,
      backgroundPosition: '54% 50% !important',
      // eslint-disable-next-line quotes
      bi: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 24 24' fill='none' stroke='Black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cline x1='18' y1='6' x2='6' y2='18'%3E%3C/line%3E%3Cline x1='6' y1='6' x2='18' y2='18'%3E%3C/line%3E%3C/svg%3E")`,
      brs: 20,
    },

  },
  search_icn: {
    pn: 'absolute',
    tp: '50%',
    mx: 6,
    lt: 0,
    tm: 'translateY(-50%)',
    cr: 'var(--white-0-75)',
    curp: 1,
    '& svg': { dy: 'block' },
  },
  searchBar: {
    pn: 'relative',
    zx: 99,
  },
  fields_search: {
    pn: 'relative',
    ml: 7,
    mr: 5,
    tn: 'width .2s',
  },
  btnColor: { cr: 'var(--b-50)' },
  sort_btn: {
    w: 25,
    h: 30,
    cr: 'var(--white-0-50)',
    p: 0,
    b: 'none',
    bd: 'transparent',
    brs: 8,
    flxc: 1,
    curp: 1,
    flx: 'center',
    ':hover:not(.active)': { bd: 'var(--white-0-81-32)', cr: 'var(--b-53-8)' },
    '&.active': {
      bd: 'var(--b-79-96)',
      cr: 'var(--b-50)',
    },
  },
  disabled: {
    oy: '0.5',
    cur: 'not-allowed',
    pe: 'none',
  },

}
