/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */
import { useEffect, useRef, useState } from 'react'
import { useFela } from 'react-fela'
import { useRecoilState, useRecoilValue } from 'recoil'
import produce from 'immer'
import Scrollbars from 'react-custom-scrollbars-2'
import { useAsyncDebounce } from 'react-table'
import ut from '../../styles/2.utilities'
import StyleSegmentControl from '../Utilities/StyleSegmentControl'
import bitsFetch from '../../Utils/bitsFetch'
import TrashIcn from '../../Icons/TrashIcn'
import app from '../../styles/app.style'
import SearchIcon from '../../Icons/SearchIcon'
import DownloadIcon from '../../Icons/DownloadIcon'
import LoaderSm from '../Loaders/LoaderSm'
import { $fields, $selectedFieldId } from '../../GlobalStates'
import { deepCopy } from '../../Utils/Helpers'

function Icons({ iconType, setModal }) {
  const fldKey = useRecoilValue($selectedFieldId)
  const [fields, setFields] = useRecoilState($fields)
  const fieldData = deepCopy(fields[fldKey])
  const [controller, setController] = useState({ parent: 'Icons', child: '' })
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(false)
  const [dnLoading, setDnLoading] = useState(false)
  const [prefix, setPrefix] = useState('')
  const [icons, setIcons] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [searchLoading, setSearchLoading] = useState(false)
  const [scrollLoading, setScrollLoading] = useState(false)
  const [total, setTotal] = useState(10001)
  const { css } = useFela()
  const url = 'https://raw.githack.com'
  const ref = useRef()

  const iconPacks = [
    { label: 'Font Awesome', value: 't=2_id_fontawesome', status: false },
    { label: 'Bootstrap Icon', value: 't=2_id_bootstrapicons', status: false },
    { label: 'Material Design Icon', value: 't=2_id_materialdesign-icons', status: false },
    { label: 'Ion Icons', value: 't=2_id_ionicons', status: false },
    { label: 'Octions', value: 't=2_id_octions', status: false },
    { label: 'CSS.GG', value: 't=2_id_css.gg', status: false },
    { label: 'Feather', value: 't=2_id_feather', status: false },
    { label: 'Carbon Icons', value: 't=2_id_carbonicons', status: false },
    { label: 'Typicons', value: 't=2_id_typicons', status: false },
    { label: 'Vscode Icons', value: 't=2_id_vscodecodicons', status: false },
    { label: 'Simple Icons', value: 't=2_id_simpleicons', status: false },
  ]
  const [filter, setFilter] = useState(iconPacks || [])

  const existFilter = () => {
    const exit = filter.find(item => item.status === true)
    let filterByIconPack = ''
    if (exit) {
      filterByIconPack = filter.map((elem) => elem.value).join('&')
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
          setIcons(data.results)
          setTotal(data.total)
        }
        ref.current.scrollToTop(0)
        setSearchLoading(false)
      })
  }
  const debouncedSearchTerm = useAsyncDebounce(onFetchData, 500)

  const onSearchChange = ({ target: { value } }) => {
    setSearchTerm(value)
    debouncedSearchTerm(value)
  }

  const onTabChangeHandler = (lbl, type) => {
    if (type === 'parent') setController({ parent: lbl })
    else if (type === 'child') setController(old => ({ ...old, child: lbl }))
  }

  const setWpMedia = () => {
    if (typeof wp !== 'undefined' && wp.media) {
      const wpMediaMdl = wp.media({
        title: 'Media',
        button: { text: 'Select picture' },
        library: { type: 'image' },
        multiple: false,
      })

      wpMediaMdl.on('select', () => {
        const attachment = wpMediaMdl.state().get('selection').first().toJSON()
        fieldData[iconType] = attachment.url
        setFields(allFields => produce(allFields, draft => { draft[fldKey] = fieldData }))
        setModal(false)
      })

      wpMediaMdl.open()
    }
  }

  useEffect(() => {
    setPrefix('')
    setFiles([])
    setIcons([])
    if (controller.parent === 'Icons') {
      setLoading(true)
      fetch('https://icons.bitapps.pro/search?c=0&')
        .then(response => response.json())
        .then(data => {
          if (data) {
            setTotal(data.total)
            setIcons(data.results)
          }
          setLoading(false)
        })
    }
    if (controller.parent === 'Downloaded icons') {
      setLoading(true)
      bitsFetch({}, 'bitforms_get_download_icn').then((res) => {
        if (res !== undefined && res.success) {
          setFiles(res?.data)
        }
        setLoading(false)
      })
    }
  }, [controller])

  const saveIcn = () => {
    setDnLoading(true)
    bitsFetch({ src: prefix }, 'bitforms_icn_save_setting')
      .then(res => {
        if (res !== undefined && res.success) {
          fieldData[iconType] = res.data
          setFields(allFields => produce(allFields, draft => { draft[fldKey] = fieldData }))
        }
        setDnLoading(false)
        setModal(false)
      })
  }

  const delIcon = (file) => {
    bitsFetch({ file }, 'bitforms_icon_remove')
      .then(res => {
        if (res !== undefined && res.success) {
          setFiles(res.data)
        }
      })
  }

  const errHandle = (e) => {
    e.target.parentNode.style.display = 'none'
  }

  const onScrollFetch = (e) => {
    const bottom = (e.target.scrollHeight - e.target.scrollTop) - e.target.clientHeight - 100
    const searchValue = searchTerm !== '' ? `&t=1_tag_${searchTerm}` : ''
    if (bottom <= 0 && icons.length < total) {
      setScrollLoading(true)
      fetch(`https://icons.bitapps.pro/search?c=${icons.length}&${existFilter()}${searchValue}`)
        .then(response => response.json())
        .then(data => {
          if (data) {
            setIcons(icons.concat(data.results))
          }
          setScrollLoading(false)
        })
    }
  }

  const searchByIconPack = (index, value, status) => {
    const tmp = [...filter]
    if (status === false) {
      tmp[index].value = `t=1_id_${value.replace('t=2_id_', '')}`
      tmp[index].status = true
    } else {
      tmp[index].value = `t=2_id_${value.replace('t=1_id_', '')}`
      tmp[index].status = false
    }
    setFilter(tmp)
    const searchValue = searchTerm !== '' ? `&t=1_tag_${searchTerm}` : ''
    if (filter !== []) {
      fetch(`https://icons.bitapps.pro/search?c=0&${existFilter()}${searchValue}`)
        .then(response => response.json())
        .then(data => {
          if (data) {
            setIcons(data.results)
            setTotal(data.total)
          }
        })
    }
  }

  const selectedSaveIcon = () => {
    fieldData[iconType] = prefix
    setFields(allFields => produce(allFields, draft => { draft[fldKey] = fieldData }))
    setModal(false)
  }

  return (
    <div>
      <StyleSegmentControl
        options={[{ label: 'Icons' }, { label: 'Upload icon' }, { label: 'Downloaded icons' }]}
        onChange={lbl => onTabChangeHandler(lbl, 'parent')}
        // defaultActive={controller.parent}
        defaultActive="Icons"
        wideTab
      />
      {controller.parent === 'Icons' && (
        <>

          <div className={css(ut.mt2)}>
            {filter.map((iconPack, i) => (
              <button title={iconPack.label} onClick={() => searchByIconPack(i, iconPack.value, iconPack.status)} type="button" className={`${css(app.btn, ut.mr2)} ${iconPack.status === true && css(preFixStyle.active)}`}>
                {iconPack.label}
              </button>

            ))}
          </div>
          <div className={css(ut.flxc, preFixStyle.searchBar, ut.mt2, ut.mb2)}>
            <div className={css(preFixStyle.fields_search)}>
              <input
                title="Search Icons"
                aria-label="Search Icons"
                placeholder="Search Icons..."
                id="search-icon"
                type="search"
                name="searchIcn"
                value={searchTerm}
                onChange={onSearchChange}
                className={css(preFixStyle.search_field)}

              />
              <span title="search" className={css(preFixStyle.search_icn)}>
                <SearchIcon size="20" />
              </span>
            </div>

            <div>
              {searchLoading && <LoaderSm size={20} clr="#000" />}
            </div>

          </div>
          <Scrollbars ref={ref} style={{ minHeight: '300px' }} onScroll={onScrollFetch}>
            {loading && (
              <div title="Loading...">
                <div className={css(ut.mt2)} />
                {Array(12).fill(1).map((itm, i) => (
                  <div key={`loderfnt-${i * 2}`} title="Loading..." className={`${css({ w: 40, h: 40, brs: 8, lh: 2, my: 3, mx: 5, dy: 'inline-block' })} loader`} />
                ))}
              </div>
            )}
            <div className={css(ut.flxc, ut.mt2, preFixStyle.icon)}>
              {icons.map((item) => (
                <button type="button" title={`${item.name} (${item.id}) `} className={`${css(ut.btn, preFixStyle.icnBtn)} ${url + item.url === prefix && css(preFixStyle.active)}`} onClick={(e) => setPrefix(e.target.src)}>
                  <img src={`${url}${item.url}`} onError={errHandle} alt={item.name} className={css(preFixStyle.img)} />
                </button>
              ))}
            </div>
            {scrollLoading && (
              <div title="Loading...">
                <div className={css(ut.mt2)} />
                {Array(12).fill(1).map((itm, i) => (
                  <div key={`loderfnt-${i * 2}`} title="Loading..." className={`${css({ w: 40, h: 40, brs: 8, lh: 2, my: 3, mx: 5, dy: 'inline-block' })} loader`} />
                ))}
              </div>
            )}
          </Scrollbars>
          <button type="button" className={css(app.btn, preFixStyle.btnPosition)} onClick={saveIcn}>
            <DownloadIcon size="19" />
            Download & save
            {dnLoading && <LoaderSm size={20} clr="#000" className={ut.ml2} />}
          </button>

        </>
      )}

      {controller.parent === 'Upload icon' && (
        <>
          <button type="button" className={css(app.btn)} onClick={setWpMedia}>
            Browse
          </button>
        </>
      )}
      {controller.parent === 'Downloaded icons' && (
        <>
          {loading && (
            <div title="Loading...">
              <div className={css(ut.mt2)} />
              {Array(13).fill(1).map((itm, i) => (
                <div key={`loderfnt-${i * 2}`} title="Loading..." className={`${css({ w: 40, h: 40, brs: 8, lh: 2, my: 3, mx: 5, dy: 'inline-block' })} loader`} />
              ))}
            </div>
          )}
          <Scrollbars ref={ref} style={{ minHeight: '300px' }}>
            <div className={css(ut.flxc, ut.mt4, preFixStyle.icon)}>
              {files.length > 0 && files.map((file) => (
                <div className={`${css(ut.flxc, ut.mt2, preFixStyle.div)}`}>
                  <button type="button" className={`${css(ut.btn, preFixStyle.action)} trash`} onClick={() => delIcon(file)}>
                    <TrashIcn size={14} />
                  </button>
                  <button onClick={(e) => setPrefix(e.target.src)} type="button" title={file.name} className={`${css(ut.btn)} `}>
                    <img src={`${bits.iconURL}/${file}`} alt="aa" width="40" height="30" className={`${`${bits.iconURL}/${file}` === prefix && css(preFixStyle.active)}`} />
                  </button>
                </div>
              ))}
            </div>
          </Scrollbars>
          <button type="button" className={css(app.btn, preFixStyle.btnPosition)} onClick={selectedSaveIcon}>
            Save
          </button>
        </>
      )}

    </div>
  )
}

const preFixStyle = {
  scrollBar: { scrollBehavior: 'auto !important', '& *': { scrollBehavior: 'auto !important' } },
  div: {
    pn: 'relative',
    dy: 'inline-grid',
    '&:hover > .trash':
      { flx: 'align-center' },
  },
  icon: { dy: 'inline-block' },
  action: {
    dy: 'none',
    pn: 'absolute',
    rt: -6,
    tp: -15,
  },
  btnPosition: {
    dy: 'flex',
    ml: 'auto',
  },
  active: { bd: 'red' },
  icnBtn: {
    p: '4px',
    w: 45,
    h: 45,
    dy: 'inline-grid',
    placeContent: 'center',

  },
  img: { h: 25 },
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
  search_field: {
    w: '100%',
    oe: 'none',
    b: '1px solid var(--white-0-75) !important',
    brs: '9px !important',
    pl: '27px !important',
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
  },

}
export default Icons
