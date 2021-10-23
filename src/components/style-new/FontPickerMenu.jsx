import { useEffect, useState } from 'react'
import { useFela } from 'react-fela'
import VirtualList from 'react-tiny-virtual-list'
import useSWR from 'swr'
import ut from '../../styles/2.utilities'
import StyleSegmentControl from '../Utilities/StyleSegmentControl'
import SearchIcon from '../../Icons/SearchIcon'
import CheckMarkIcn from '../../Icons/CheckMarkIcn'
import AtoZSortIcn from '../../Icons/AtoZSortIcn'
import { sortByField } from '../../Utils/Helpers'

export default function FontPickerMenu() {
  const { css } = useFela()
  const [fonts, setFonts] = useState([])
  const [isSorted, setSorted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [focusSearch, setfocusSearch] = useState(false)
  const [data, setData] = useState('Palanquin')
  const [scrolIndex, setScrolIndex] = useState(0)
  const [controller, setController] = useState({ parent: 'Google', child: '' })

  const apiKey = 'AIzaSyB9lRmRi8phfBLNMT3CpTF2DsWNLGfoFWY'
  const uri = `https://www.googleapis.com/webfonts/v1/webfonts?key=${apiKey}&sort=popularity`
  const { data: allFonts } = useSWR(uri, (url) => fetch(url, {})
    .then(res => res.json()))

  useEffect(() => {
    allFonts && setFonts(allFonts.items)

    if (!allFonts) {
      setLoading(true)
    } else {
      setLoading(false)
    }
    const index = allFonts?.items?.findIndex(item => item.family === data)
    setScrolIndex(index)
  }, [allFonts])

  const onTabChangeHandler = (lbl, type) => {
    if (type === 'parent') setController({ parent: lbl })
    else if (type === 'child') setController(old => ({ ...old, child: lbl }))
  }

  const searchHandler = (e) => {
    const { value } = e.target
    const oldFonts = JSON.parse(localStorage.getItem('bf-fonts'))
    const filtered = oldFonts.filter(font => font.family.toLowerCase().includes(value.toLowerCase()))
    setFonts(filtered)
  }

  const setCheck = (i) => {
    setData(i)
  }

  const fontSorted = (orderBy) => {
    const sorted = sortByField(fonts, 'family', orderBy)
    setSorted(orderBy === 'ASC')
    setFonts(sorted)
  }

  return (
    <div className={css(fontStyle.container)}>
      <StyleSegmentControl options={[{ label: 'Google' }, { label: 'Custom' }]} onChange={lbl => onTabChangeHandler(lbl, 'parent')} activeValue={controller.parent} wideTab />
      {loading && (
        <div title="Loading...">
          {Array(5).fill(1).map((itm, i) => (
            <div key={`loderfnt-${i * 2}`} title="Loading..." className={`${css({ w: '80%', h: 20, brs: 5, lh: 2 })} loader`} />
          ))}
        </div>
      )}
      <br />
      {controller.parent === 'Google' && (
        <>
          <div className={css(ut.flxc, fontStyle.searchBar)}>
            <div className={css(fontStyle.fields_search)} style={{ width: focusSearch ? '90%' : '78%' }}>
              <input
                title="Search Field"
                aria-label="Search Field"
                placeholder="Search..."
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
                <button title="Sort by ascending order" className={`${css(fontStyle.sort_btn)} ${isSorted && 'active'}`} type="button" onClick={() => fontSorted(isSorted ? 'DESC' : 'ASC')} aria-label="Sort Fonts Family">
                  <AtoZSortIcn size="20" />
                </button>
              )}
          </div>
          <br />
          <VirtualList
            width="100%"
            height={200}
            itemCount={fonts.length || 1}
            itemSize={fonts.length ? 30 : 0}
            scrollToIndex={fonts.length ? scrolIndex : 0}
            renderItem={({ index, style }) => (
              <div key={index} style={style}>
                <div className={css(fontStyle.item)}>
                  <button className={css(fontStyle.btn)} type="button" onClick={() => setCheck(fonts[index]?.family)}>
                    <span className={css(fontStyle.title)}>{fonts[index].family}</span>
                    {data === fonts[index].family && <CheckMarkIcn className={css(fontStyle.btnColor)} size="19" />}
                  </button>
                </div>
              </div>
            )}
          />
        </>
      )}

      {controller.parent === 'Custom' && (
        <div className={css(ut.flxcb)}>
          <span className={css(fontStyle.title)}>Link</span>
          <input className={css(fontStyle.url)} type="url" placeholder="http://fonts.gstatic.com/s/roboto/v29/KFOkCnqEu92Fr1MmgWxPKTM1K9nz.ttf" />
        </div>
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

}
