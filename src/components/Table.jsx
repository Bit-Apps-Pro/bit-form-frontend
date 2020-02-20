/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { useTable, useFilters, usePagination, useGlobalFilter, useSortBy, useRowSelect, useResizeColumns, useBlockLayout, useFlexLayout } from 'react-table'
import { Scrollbars } from 'react-custom-scrollbars'
import { ReactSortable } from 'react-sortablejs'
import TableCheckBox from './ElmSettings/Childs/TableCheckBox'
import Menu from './ElmSettings/Childs/Menu'
import { BitappsContext } from '../Utils/BitappsContext'

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef()
    const resolvedRef = ref || defaultRef
    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate
    }, [resolvedRef, indeterminate])
    return (
      <>
        <TableCheckBox refer={resolvedRef} rest={rest} />
      </>
    )
  },
)

function GlobalFilter({ globalFilter, setGlobalFilter }) {
  return (
    <div className="f-search">
      <button type="button" className="icn-btn" aria-label="icon-btn"><span className="btcd-icn icn-search" /></button>
      <input
        value={globalFilter || ''}
        onChange={e => {
          setGlobalFilter(e.target.value || undefined)
        }}
        placeholder="Search"
      />
    </div>
  )
}

export default function Table(props) {
  const { confirmModal } = React.useContext(BitappsContext)
  const { confModal, setConfModal, hideConfModal } = confirmModal

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state,
    preGlobalFilteredRows,
    selectedFlatRows, // row select
    allColumns, // col hide
    setGlobalFilter,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      ...props,
      manualPagination: typeof props.pageCount !== 'undefined',
      initialState: { pageIndex: 0 },
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
    useFlexLayout,
    props.resizable ? useResizeColumns : '', // resize
    props.rowSeletable ? useRowSelect : '', // row select
    props.rowSeletable ? (hooks => {
      hooks.allColumns.push(columns => [
        {
          id: 'selection',
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ])
    }) : '',
  )

  const handleGotoPageZero = () => {
    if (props.getPageIndex) {
      props.getPageIndex(0)
    }
    gotoPage(0)
  }

  const handleGotoLastPage = () => {
    if (props.getPageIndex) {
      props.getPageIndex(pageCount - 1)
    }
    gotoPage(pageCount - 1)
  }

  const handleNextPage = () => {
    if (props.getPageIndex) {
      props.getPageIndex(pageIndex + 1)
    }
    nextPage()
  }

  const handlePreviousPage = () => {
    if (props.getPageIndex) {
      props.getPageIndex(pageIndex - 1)
    }
    previousPage()
  }

  const showBulkDupMdl = () => {
    const bdup = { ...confModal }
    bdup.title = 'Duplicate All ?'
    bdup.subTitle = 'Duplicate all selected entries.'
    bdup.yesAction = () => { props.duplicateData(selectedFlatRows); hideConfModal() }
    bdup.show = true
    setConfModal(bdup)
  }

  const showStModal = () => {
    const bst = { ...confModal }
    bst.title = 'Change Status'
    bst.subTitle = 'Change status of all selected form'
    bst.yesBtn = 'Enable'
    bst.noBtn = 'Disable'
    bst.yesAction = () => { props.setBulkStatus(selectedFlatRows); hideConfModal() }
    bst.noAction = () => { props.setBulkStatus(selectedFlatRows); hideConfModal() }
    bst.show = true
    setConfModal(bst)
  }

  const showDelModal = () => {
    const bdel = { ...confModal }
    bdel.title = 'Delete ?'
    bdel.subTitle = 'Delete all selected form'
    bdel.yesAction = () => { props.setBulkDelete(selectedFlatRows); hideConfModal() }
    bdel.show = true
    setConfModal(bdel)
  }

  return (
    <>
      <div className="btcd-t-actions">
        <div className="flx">
          {props.columnHidable
            && (
              <Menu icn="icn-remove_red_eye">
                <Scrollbars autoHide style={{ width: 200 }}>
                  <ReactSortable list={props.columns} setList={props.setTableCols} handle=".btcd-pane-drg">
                    {props.columns.map((column, i) => (
                      <div key={allColumns[i + 1].id} className="btcd-pane">
                        <TableCheckBox cls="scl-7" id={allColumns[i + 1].id} title={column.Header} rest={allColumns[i + 1].getToggleHiddenProps()} />
                        <span className="btcd-pane-drg">&#8759;</span>
                      </div>
                    ))}
                  </ReactSortable>
                </Scrollbars>
              </Menu>
            )}
          {selectedFlatRows.length > 0
            && (
              <>
                {'setBulkStatus' in props
                  && (
                    <button onClick={showStModal} className="icn-btn btcd-icn-lg tooltip" style={{ '--tooltip-txt': '"Status"' }} aria-label="icon-btn" type="button">
                      <span className="btcd-icn icn-toggle_off" />
                    </button>
                  )}
                {'duplicateData' in props
                  && (
                    <button onClick={showBulkDupMdl} className="icn-btn btcd-icn-lg tooltip" style={{ '--tooltip-txt': '"Duplicate"' }} aria-label="icon-btn" type="button">
                      <span className="btcd-icn icn-file_copy" style={{ fontSize: 16 }} />
                    </button>
                  )}
                <button onClick={showDelModal} className="icn-btn btcd-icn-lg tooltip" style={{ '--tooltip-txt': '"Delete"' }} aria-label="icon-btn" type="button">
                  <span className="btcd-icn icn-trash-fill" style={{ fontSize: 16 }} />
                </button>
                <small className="btcd-pill">
                  {selectedFlatRows.length}
                  {' '}
                  Row Selected
                </small>
              </>
            )}
        </div>
      </div>

      <GlobalFilter
        preGlobalFilteredRows={preGlobalFilteredRows}
        globalFilter={state.globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
      <div>

        <div className="btcd-f-t-wrp">
          <table {...getTableProps()} className={`f-table ${props.className}`}>
            <thead>
              {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => (
                    <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                      {column.render('Header')}
                      {' '}
                      <span>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? String.fromCharCode(9662)
                            : String.fromCharCode(9652)
                          : <span className="btcd-icn icn-sort" style={{ fontSize: 10, marginLeft: 5 }} />}
                      </span>
                      {props.resizable
                        && (
                          <div
                            {...column.getResizerProps()}
                            className={`btcd-t-resizer ${column.isResizing ? 'isResizing' : ''}`}
                          />
                        )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              <Scrollbars className="btcd-all-f-scrl" style={{ height: props.height }}>
                {page.map((row) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()} className={`tr ${row.isSelected ? 'btcd-row-selected' : ''}`}>
                      {row.cells.map(cell => (
                        <td className="td btcd-sl" {...cell.getCellProps()}>{cell.render('Cell')}</td>
                      ))}
                    </tr>
                  )
                })}
              </Scrollbars>
            </tbody>
          </table>
        </div>
        <table className="btcd-action-tab">
          <thead><tr><th>Actions</th></tr></thead>
          <tbody>
            <tr>
              <td>asd</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="btcd-pagination">
        <button className="icn-btn" type="button" onClick={handleGotoPageZero} disabled={!canPreviousPage}>
          &laquo;
        </button>
        {' '}
        <button className="icn-btn" type="button" onClick={handlePreviousPage} disabled={!canPreviousPage}>
          &lsaquo;
        </button>
        {' '}
        <button className="icn-btn" type="button" onClick={handleNextPage} disabled={!canNextPage}>
          &rsaquo;
        </button>
        {' '}
        <button className="icn-btn" type="button" onClick={handleGotoLastPage} disabled={!canNextPage}>
          &raquo;
        </button>
        {' '}
        <small>
          &nbsp;Page
          {' '}
          <strong>
            {pageIndex + 1}
            {' '}
            of
            {' '}
            {pageOptions.length}
            {' '}
            &nbsp;
          </strong>
          {' '}
        </small>
        <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value));
            if (props.getPageSize) {
              props.getPageSize(e.target.value, pageIndex)
            }
          }}
        >
          {[10, 20, 30, 40, 50, 100].map(pageSiz => (
            <option key={pageSiz} value={pageSiz}>
              Show
              {' '}
              {pageSiz}
            </option>
          ))}
        </select>
      </div>

    </>
  );
}
