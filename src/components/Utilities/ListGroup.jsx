import { useFela } from "react-fela"
import SearchIcon from "../../Icons/SearchIcon"
import Toolbars from "../../styles/Toolbars.style"
import LayerAccordion from "../CompSettings/StyleCustomize/ChildComp/LayerAccordion"

export default function ListGroup({ options, action, className }) {
  const { css } = useFela()

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

  const groupOptions = groupAllOptions(options)

  const focusSearch = true

  return (
    <div className={css(style.main)}>
      <div className={css(Toolbars.fields_search)}>
        <input
          // ref={searchInput}
          title="Search Field"
          aria-label="Search Field"
          autoComplete="off"
          data-testid="tlbr-srch-inp"
          // placeholder="Search..."
          id="search-icon"
          type="search"
          name="searchIcn"
          // onChange={searchHandler}
          // onFocus={() => setfocusSearch(true)}
          // onBlur={blurSearchInp}
          className={css(Toolbars.search_field)}
        />
        {/* {!!searchData.length && (
          <span title="clear" className={css(Toolbars.clear_icn)} role="button" tabIndex="-1" onClick={clearSearch} onKeyPress={clearSearch}>&nbsp;</span>
          )} */}
        <span title="clear" className={css(Toolbars.clear_icn)} role="button" tabIndex="-1">&nbsp;</span>

        <span title="search" className={css(Toolbars.search_icn)}>
          <SearchIcon size="20" />
        </span>

        {/* {!searchData.length && (<div className={`${css(Toolbars.shortcut)} shortcut`} title={'Press "Ctrl+/" to focus search'}>Ctrl+/</div>)} */}
      </div>

      {groupOptions.map(group => (
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
              {group.type.match(/group-opts|group-title/) && (<h4 style={{ margin: 0 }}>{group.name}</h4>)}
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
  )
}

const style = {
  main: {
    h: 300,
    owx: 'hidden',
    owy: 'scroll',
  },
  title: {
    mt: 10,
    mb: 5,
  },
  ul: { mt: 10, mb: 0 },
  li: {
    mb: 0,
    mt: 5,
    ml: 5,
  },
  button: {
    fw: 'normal',
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
      brs: 8,
    },
    fs: 11,
  },
}