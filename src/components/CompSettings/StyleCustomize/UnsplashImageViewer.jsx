/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */
import { useEffect, useRef, useState } from 'react'
import Scrollbars from 'react-custom-scrollbars-2'
import { useFela } from 'react-fela'
import { useParams } from 'react-router-dom'
import { useAsyncDebounce } from 'react-table'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { $fields, $selectedFieldId, $unsplashImgUrl } from '../../../GlobalStates/GlobalStates'
import { $styles } from '../../../GlobalStates/StylesState'
import CPTIcn from '../../../Icons/CPTIcn'
import SearchIcon from '../../../Icons/SearchIcon'
import ut from '../../../styles/2.utilities'
import { deepCopy } from '../../../Utils/Helpers'
import LoaderSm from '../../Loaders/LoaderSm'

function UnsplashImageViewer({ addPaddingOnSelect = true, setModal, selected = '', uploadLbl = '' }) {
  const { fieldKey: fldKey } = useParams()
  const [fields, setFields] = useRecoilState($fields)
  const setUnsplashImgUrl = useSetRecoilState($unsplashImgUrl)
  const fieldData = deepCopy(fields[fldKey])
  const [controller, setController] = useState({ parent: selected || 'Icons' })
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(false)
  const [dnLoading, setDnLoading] = useState(false)
  const [selectUrl, setSelectUrl] = useState('')
  const [images, setImages] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [searchLoading, setSearchLoading] = useState(false)
  const [scrollLoading, setScrollLoading] = useState(false)
  const selectedFieldId = useRecoilValue($selectedFieldId)
  const setStyles = useSetRecoilState($styles)
  const [pageNo, setPageNo] = useState(1)
  const [collectionPageNo, setCollectionPageNo] = useState(1)
  const [total, setTotal] = useState(10001)
  const { css } = useFela()
  const url = 'https://raw.githack.com'
  const ref = useRef()

  const iconPacks = [
    { label: 'Font Awesome', value: 't=2_id_fontawesome', id: 'font-awesome', status: false },
    { label: 'Bootstrap', value: 't=2_id_bootstrapicons', id: 'bootstrap-icons', status: false },
    { label: 'Material Design', value: 't=2_id_materialdesign-icons', id: 'material-design-icons', status: false },
    { label: 'Ion', value: 't=2_id_ionicons', id: 'ionicons', status: false },
    { label: 'Octicons', value: 't=2_id_octicons', id: 'octicons', status: false },
    { label: 'CSS.GG', value: 't=2_id_css.gg', id: 'css.gg', status: false },
    { label: 'Feather', value: 't=2_id_feather', id: 'feather', status: false },
    { label: 'Carbon', value: 't=2_id_carbonicons', id: 'carbon-icons', status: false },
    { label: 'Typicons', value: 't=2_id_typicons', id: 'typicons', status: false },
    { label: 'Vscode', value: 't=2_id_vscodecodicons', id: 'vscode-codicons', status: false },
    { label: 'Simple', value: 't=2_id_simpleicons', id: 'simple-icons', status: false },
  ]
  const [collections, setCollections] = useState([])

  const existFilter = () => {
    if (searchTerm) return 'nofilter=true'
    const exit = collections.find(item => item.status === true)
    let filterByIconPack = ''
    if (exit) {
      filterByIconPack = collections.map((elem) => elem.value).join('&')
    }
    return filterByIconPack
  }

  const onFetchData = (val) => {
    setSearchLoading(true)
    const searchValue = searchTerm !== '' ? `&t=1_tag_${val}` : ''
    fetch(`https://icons.bitapps.pro/search?c=0&${existFilter()}${searchValue}`)
      .then(response => response.json())
      .then(data => {
        if (data) {
          let icns = data.results
          if (collections.find(term => term.status)) {
            icns = icns?.filter(icn => collections.find(f => f.id === icn.id)?.status)
          }
          // setImages(icns)
          setTotal(data.length)
        }
        ref?.current?.scrollToTop(0)
        setSearchLoading(false)
      })
  }
  const debouncedSearchTerm = useAsyncDebounce(onFetchData, 500)

  const onSearchChange = ({ target: { value } }) => {
    setSearchTerm(value)
    debouncedSearchTerm(value)
  }

  useEffect(() => {
    setSelectUrl('')
    setFiles([])
    setImages([])
    setLoading(true)
    fetch(`https://api.unsplash.com/photos/?client_id=n3pcVfA-CTg4OlOQsM3m6lEWLISyoSbtDqP2CfoukyU&per_page=30&page=${pageNo}`)
      .then(response => response.json())
      .then(data => {
        if (data) {
          setTotal(data.length)
          setImages(data)
        }
        setLoading(false)
      })

    fetch(`https://api.unsplash.com/collections/?client_id=n3pcVfA-CTg4OlOQsM3m6lEWLISyoSbtDqP2CfoukyU&page=${collectionPageNo}`)
      .then(response => response.json())
      .then(data => {
        if (data) {
          setCollections(data)
        }
        setLoading(false)
      })
  }, [])

  const saveImage = () => {
    // setDnLoading(true)
    setUnsplashImgUrl(selectUrl)
    setModal(false)
  }

  const errHandle = (e) => {
    e.target.parentNode.style.display = 'none'
  }

  const onScrollFetch = (e) => {
    const bottom = (e.target.scrollHeight - e.target.scrollTop) - e.target.clientHeight - 100
    const searchValue = searchTerm !== '' ? `&t=1_tag_${searchTerm}` : ''
    if (bottom <= 0 && images.length <= total) {
      setScrollLoading(true)
      fetch(`https://api.unsplash.com/photos/?client_id=n3pcVfA-CTg4OlOQsM3m6lEWLISyoSbtDqP2CfoukyU&per_page=30&page=${pageNo + 1}`)
        .then(response => response.json())
        .then(data => {
          if (data) {
            setImages(images.concat(data))
            setPageNo(prev => prev + 1)
            setTotal(total + data.length)
          }
          setScrollLoading(false)
        })
    }
  }

  const searchByCollections = (index, id, status) => {
    const tmp = [...collections]
    if (status === false) {
      tmp[index].status = true
    } else {
      tmp[index].status = false
    }
    setCollections(tmp)
    if (collections !== []) {
      fetch(`https://api.unsplash.com/collections/${id}/photos?client_id=n3pcVfA-CTg4OlOQsM3m6lEWLISyoSbtDqP2CfoukyU&per_page=30`)
        .then(response => response.json())
        .then(data => {
          if (data) {
            setImages(data)
            setTotal(data.length)
          }
        })
    }
  }

  const handlePrefixIcon = (imgUrl) => {
    setSelectUrl(imgUrl)
  }

  return (
    <div>
      <div className={css(ut.mt2, ut.flxc, { flxp: 1, jc: 'center' })}>
        {collections.map((collection, i) => (
          <button
            data-testid="icn-pck-btn"
            key={collection.title}
            title={collection.title}
            onClick={() => searchByCollections(i, collection.id, collection.status)}
            type="button"
            className={`${css(s.chip, ut.mr2)} ${collection.status && css(s.active)}`}
          >
            {collection.title}
          </button>
        ))}
      </div>
      <div className={css(ut.flxc, s.searchBar, ut.mt2, ut.mb2)}>

        <div className={css(s.fields_search)}>
          <input
            data-testid="icns-mdl-srch-inp"
            title="Search Images"
            aria-label="Search Images"
            placeholder="Search Unsplash Image etc..."
            id="search-icon"
            type="search"
            name="searchIcn"
            value={searchTerm}
            onChange={onSearchChange}
            className={css(s.search_field)}

          />
          <span title="search" className={css(s.search_icn)}>
            <SearchIcon size="20" />
          </span>
        </div>

        <div>
          {searchLoading && <LoaderSm size={20} clr="#13132b" />}
        </div>

      </div>
      <Scrollbars ref={ref} style={{ minHeight: 350 }} onScroll={onScrollFetch}>
        {loading && (
          <div title="Loading...">
            <div className={css(ut.mt2)} />
            {Array(26).fill(1).map((itm, i) => (
              <div key={`loderfnt-${i * 2}`} title="Loading..." className={`${css(s.loadingPlaceholder)} loader`} />
            ))}
          </div>
        )}
        <div className={css(ut.flxc, ut.mt2, s.icon)}>
          {images.map((item) => (
            <button
              type="button"
              key={`(${item.id})`}
              title={`(${item.id})`}
              className={`${css(s.imageBtn)} ${item.urls.regular === selectUrl && css(s.active)}`}
              onClick={() => handlePrefixIcon(item.urls.regular)}
            >
              <img src={`${item.urls.thumb}`} onError={errHandle} alt={item.id} className={css(s.img)} />
            </button>
          ))}
        </div>
        {scrollLoading && (
          <div title="Loading...">
            <div className={css(ut.mt2)} />
            {Array(26).fill(1).map((itm, i) => (
              <div key={`loderfnt--${i * 2}`} title="Loading..." className={`${css(s.loadingPlaceholder)} loader`} />
            ))}
          </div>
        )}
      </Scrollbars>
      <button data-testid="icn-dwnld-n-sav" type="button" disabled={!selectUrl} className={css(s.saveBtn, s.btnPosition)} onClick={saveImage}>
        <span className={css(ut.mr1, { dy: 'flex' })}><CPTIcn size="20" /></span>
        save
        {dnLoading && <LoaderSm size={20} clr="#fff" className={ut.ml2} />}
      </button>
    </div>
  )
}

const s = {
  scrollBar: { scrollBehavior: 'auto !important', '& *': { scrollBehavior: 'auto !important' } },
  loadingPlaceholder: { w: 40, h: 40, brs: 8, lh: 2, my: 3, mx: 5, dy: 'inline-block' },
  downloadedBtnWrapper: {
    pn: 'relative',
    dy: 'inline-block',
    '&:hover > .trash':
      { flx: 'align-center' },
  },
  delBtn: {
    pn: 'absolute',
    bd: '#ffa1a1',
    b: 'none',
    brs: 20,
    h: 20,
    dy: 'none',
    w: 20,
    curp: 1,
    rt: -3,
    tp: -3,
    ':hover': { bd: '#ff7d7d' },
  },
  icon: { dy: 'inline-block' },
  chip: {
    bd: 'var(--b-100-48-1)',
    b: 'none',
    brs: 50,
    p: '6px 16px',
    cr: 'var(--b-37-18)',
    m: '0px 7px 6px 0px',
    curp: 1,
    tn: 'background .3s',
    ':hover': { bd: 'var(--b-90)' },
  },
  active: {
    b: '3px solid var(--b-50)',
    cr: 'var(--white-100) !important',
  },
  imageBtn: {
    p: '4px',
    mnw: 90,
    h: 125,
    dy: 'inline-grid',
    placeContent: 'center',
    bd: 'transparent',
    b: 'none',
    brs: 8,
    curp: 1,
    ':hover': { bd: 'var(--white-0-95)' },
  },
  img: { h: 110 },
  searchBar: {
    pn: 'relative',
    zx: 99,
  },
  btnColor: { cr: 'var(--b-50)' },
  fields_search: {
    pn: 'relative',
    ml: 7,
    mr: 5,
    tn: 'width .2s',
    w: '100%',
  },
  upBtn: {
    b: '1px solid var(--b-38-89)',
    w: '80%',
    bd: 'var(--b-36-96)',
    fs: 20,
    mx: 'auto',
    h: 100,
    flx: 'center',
    fd: 'column',
    brs: 20,
    mt: 10,
    cr: 'var(--b-54-31)',
    curp: 1,
    ':hover': { bd: 'var(--b-50-95)' },
    ':focus-visible': { focusShadow: 1 },
  },
  search_icn: {
    pn: 'absolute',
    tp: '50%',
    mx: 9,
    lt: 0,
    tm: 'translateY(-50%)',
    cr: 'var(--white-0-75)',
    curp: 1,
    '& svg': { dy: 'block' },
  },
  search_field: {
    w: '100%',
    fw: 500,
    fs: '14px !important',
    oe: 'none',
    b: '1px solid var(--white-0-75) !important',
    brs: '20px !important',
    pl: '30px !important',
    pr: '5px !important',
    pb: '5px !important',
    pt: '5px !important',
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
  saveBtn: {
    b: 'none',
    bd: 'var(--b-50)',
    brs: 8,
    fw: 500,
    p: '5px 10px',
    cr: 'var(--white-100)',
    flxc: 1,
    flx: 'center',
    mt: 5,
    ml: 'auto',
    mr: 5,
    curp: 1,
    tn: 'background .3s',
    ':hover:not(:disabled)': { bd: 'var(--b-36)' },
    ':disabled': { bd: 'var(--b-13-88)', cr: 'var(--b-16-35)', cur: 'not-allowed' },
  },
}
export default UnsplashImageViewer
