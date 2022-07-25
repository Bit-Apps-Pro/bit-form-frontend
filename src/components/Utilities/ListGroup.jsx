import { useFela } from 'react-fela'
import Scrollbars from 'react-custom-scrollbars-2'
import { useEffect, useRef, useState } from 'react'
import SearchIcon from '../../Icons/SearchIcon'
import LayerAccordion from '../CompSettings/StyleCustomize/ChildComp/LayerAccordion'
import { deepCopy } from '../../Utils/Helpers'

const groupAllOptions = options => {
  // split all groups into separate arrays and if the options are not in a group then add them to a new group until the next group
  let groupStat = 0
  return options.reduce((acc, curr) => {
    if (curr.type) {
      acc.push(curr)
      groupStat = 0
    } else {
      if (!groupStat) {
        acc.push({ type: 'no-group', childs: [] })
        groupStat = 1
      }
      acc[acc.length - 1].childs.push(curr)
    }
    return acc
  }, [])
}

export default function ListGroup({ options, action, className }) {
  const { css } = useFela()
  const optionGroups = groupAllOptions(options)
  const [searchData, setSearchData] = useState(optionGroups)

  useEffect(() => { setSearchData(optionGroups) }, [options])

  const searchHandler = e => {
    const searchVal = e.target.value.toLowerCase().trim()
    if (!searchVal) return setSearchData(optionGroups)
    // search options accross all optionGroups
    const tmpOptionGroups = deepCopy(optionGroups)
    const searched = tmpOptionGroups.reduce((acc, curr) => {
      if (curr.type !== 'group-title') {
        acc.push(curr)
        if (curr.childs) {
          acc[acc.length - 1].childs = curr.childs.filter(child => child.lbl.toLowerCase().includes(searchVal))
          if (acc[acc.length - 1].childs.length === 0) {
            acc.pop()
          }
        }
      }
      return acc
    }, [])
    setSearchData(searched)
  }

  const clearSearch = () => {
    searchInput.current.value = ''
    setSearchData(optionGroups)
  }

  const searchInput = useRef(null)

  return (
    <div className={css(style.main)}>
      <div className={css(style.fields_search)}>
        <input
          ref={searchInput}
          title="Search Field"
          aria-label="Search Field"
          autoComplete="off"
          data-testid="tlbr-srch-inp"
          placeholder="Search..."
          id="search-icon"
          type="search"
          name="searchIcn"
          onChange={searchHandler}
          className={css(style.search_field)}
        />
        {searchInput?.current?.value
          && (
            <span
              title="clear"
              className={css(style.clear_icn)}
              role="button"
              tabIndex="-1"
              onClick={clearSearch}
              onKeyPress={clearSearch}
            >
              &nbsp;
            </span>
          )}

        <span title="search" className={css(style.search_icn)}>
          <SearchIcon size="20" />
        </span>
      </div>
      <Scrollbars style={{ height: '92%' }} autoHide>
        <div className={css(style.groupList)}>
          {searchData.map(group => (
            <>
              {group.type === 'group-accordion' && (
                <LayerAccordion title={group.name}>
                  <ul className={css(style.ul)}>
                    {'childs' in group && group.childs.map(option => (
                      <li className={css(style.li)}>
                        <button
                          type="button"
                          className={`${css(style.button)} btnHover`}
                          title={option.lbl}
                          onClick={() => action(option.val)}
                        >
                          {option.lbl}
                        </button>
                      </li>
                    ))}
                  </ul>
                </LayerAccordion>
              )}
              {group.type === 'group-opts' && (
                <ul className={css(style.ul)}>
                  {group.type.match(/group-opts|group-title/) && (<h4 className={css(style.title)}>{group.name}</h4>)}
                  {'childs' in group && group.childs.map(option => (
                    <li className={css(style.li)}>
                      <button
                        type="button"
                        className={`${css(style.button)} btnHover`}
                        title={option.lbl}
                        onClick={() => action(option.val)}
                      >
                        {option.lbl}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              {group.type === 'group-title' && (
                <h4 className={css(style.title)}>{group.name}</h4>
              )}
            </>
          ))}
        </div>
      </Scrollbars>
    </div>
  )
}

const style = {
  main: {
    h: 300,
    w: 200,
    py: 3,
    ow: 'hidden',
  },
  title: {
    m: 0,
    pt: 7,
    pb: 5,
    pn: 'sticky',
    tp: 0,
    bd: '#fff',
    zx: 9,
  },
  fields_search: {
    pn: 'relative',
    tn: 'width .2s',
  },
  search_field: {
    mx: 2,
    w: '98%',
    oe: 'none',
    b: 'none !important',
    brs: '9px !important',
    pl: '27px !important',
    pr: '5px !important',
    bd: 'var(--white-0-97) !important',
    ':focus': {
      oe: 'none',
      bs: '0px 0px 0px 1.5px var(--b-50) !important',
      // bcr: 'var(--b-92-62) !important',
      pr: '0px !important',
      '& ~ .shortcut': { dy: 'none' },
      '& ~ span svg': { cr: 'var(--b-50)' },
    },
    '::placeholder': { fs: 12 },
    '::-webkit-search-cancel-button': { appearance: 'none' },
  },
  search_icn: {
    pn: 'absolute',
    tp: '50%',
    mx: 6,
    lt: 0,
    tm: 'translateY(-50%)',
    cr: 'var(--white-0-50)',
    curp: 1,
    '& svg': { dy: 'block' },
  },
  clear_icn: {
    pn: 'absolute',
    tp: '50%',
    mx: 6,
    rt: 0,
    tm: 'translateY(-50%)',
    cr: 'var(--white-0-50)',
    curp: 1,
    w: 14,
    h: 14,
    bd: 'var(--white-0-83)',
    brs: 20,
    backgroundPosition: '54% 50% !important',
    // eslint-disable-next-line quotes
    bi: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 24 24' fill='none' stroke='Black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cline x1='18' y1='6' x2='6' y2='18'%3E%3C/line%3E%3Cline x1='6' y1='6' x2='18' y2='18'%3E%3C/line%3E%3C/svg%3E")`,
  },
  groupList: { mt: 10 },
  ul: { mt: 0, mb: 10 },
  li: {
    mb: 0,
    mt: 5,
    ml: 5,
  },
  button: {
    fw: 'normal',
    brs: 5,
    dy: 'block',
    w: '100%',
    ta: 'left',
    b: 0,
    bd: 'none',
    p: 3,
    curp: 1,
    '&:hover':
    {
      bd: 'var(--white-0-95)',
      cr: 'var(--black-0)',
    },
    fs: 11,
  },
}
