/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, memo, useState } from 'react'
import { useTable, useFilters, usePagination, useGlobalFilter, useSortBy, useRowSelect, useResizeColumns, /* useBlockLayout */ useFlexLayout, useColumnOrder } from 'react-table'
import { useSticky } from 'react-table-sticky'
import { Scrollbars } from 'react-custom-scrollbars'
import { ReactSortable } from 'react-sortablejs'
import TableCheckBox from './ElmSettings/Childs/TableCheckBox'
import Menu from './ElmSettings/Childs/Menu'
import ConfirmModal from './ConfirmModal'
import TableLoader from './Loaders/TableLoader'


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
      <label>
        <input
          value={globalFilter || ''}
          onChange={e => {
            setGlobalFilter(e.target.value || undefined)
          }}
          placeholder="Search"
        />
      </label>
    </div>
  )
}

function Table(props) {
  console.log('%c $render Table', 'background:blue;padding:3px;border-radius:5px;color:white')
  const [confMdl, setconfMdl] = useState({ show: false, btnTxt: '' })
  const { columns, data, fetchData } = props
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
      debug: true,
      fetchData,
      columns,
      data,
      manualPagination: typeof props.pageCount !== 'undefined',
      pageCount: props.pageCount,
      initialState: { pageIndex: 0 },
      autoResetPage: false,
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
    useSticky,
    useColumnOrder,
    // useBlockLayout,
    useFlexLayout,
    props.resizable ? useResizeColumns : '', // resize
    props.rowSeletable ? useRowSelect : '', // row select
    props.rowSeletable ? (hooks => {
      hooks.allColumns.push(cols => [
        {
          id: 'selection',
          width: 50,
          maxWidth: 50,
          minWidth: 67,
          sticky: 'left',
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div title="Select All Rows" className="flx">
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          Cell: ({ row }) => (
            <div title="Select This Row" className="flx">
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...cols,
      ])
    }) : '',
  )

  useEffect(() => {
    if (fetchData) {
      fetchData({ pageIndex, pageSize })
    }
  }, [fetchData, pageIndex, pageSize])

  const showBulkDupMdl = () => {
    confMdl.action = () => { props.duplicateData(selectedFlatRows); closeConfMdl() }
    confMdl.btnTxt = 'Duplicate'
    confMdl.btn2Txt = null
    confMdl.btnClass = 'blue'
    confMdl.body = `Do You want Deplicate these ${selectedFlatRows.length} item ?`
    confMdl.show = true
    setconfMdl({ ...confMdl })
  }

  const showStModal = () => {
    confMdl.action = (e) => { props.setBulkStatus(e, selectedFlatRows); closeConfMdl() }
    confMdl.btn2Action = (e) => { props.setBulkStatus(e, selectedFlatRows); closeConfMdl() }
    confMdl.btnTxt = 'Disable'
    confMdl.btn2Txt = 'Enable'
    confMdl.body = `Do you want to change these ${selectedFlatRows.length} status ?`
    confMdl.show = true
    setconfMdl({ ...confMdl })
  }

  const showDelModal = () => {
    confMdl.action = () => { props.setBulkDelete(selectedFlatRows); closeConfMdl() }
    confMdl.btnTxt = 'Delete'
    confMdl.btn2Txt = null
    confMdl.btnClass = ''
    confMdl.body = `Are you sure to delete these ${selectedFlatRows.length} items ?`
    confMdl.show = true
    setconfMdl({ ...confMdl })
  }

  const closeConfMdl = () => {
    confMdl.show = false
    setconfMdl({ ...confMdl })
  }

  return (
    <>
      <ConfirmModal
        show={confMdl.show}
        body={confMdl.body}
        action={confMdl.action}
        close={closeConfMdl}
        btnTxt={confMdl.btnTxt}
        btn2Txt={confMdl.btn2Txt}
        btn2Action={confMdl.btn2Action}
        btnClass={confMdl.btnClass}
      />
      <div className="btcd-t-actions">
        <div className="flx">
          {props.columnHidable
            && (
              <Menu icn="icn-remove_red_eye">
                <Scrollbars autoHide style={{ width: 200 }}>
                  <ReactSortable list={props.columns} setList={props.setTableCols} handle=".btcd-pane-drg">
                    {columns.map((column, i) => (
                      <div key={allColumns[i + 1].id} className="btcd-pane">
                        <TableCheckBox cls="scl-7" id={allColumns[i + 1].id} title={column.Header} rest={allColumns[i + 1].getToggleHiddenProps()} />
                        <span className="btcd-pane-drg">&#8759;</span>
                      </div>
                    ))}
                  </ReactSortable>
                </Scrollbars>
              </Menu>
            )}
          {props.rowSeletable && selectedFlatRows.length > 0
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
      {props.loading ? <TableLoader /> : (
        <>
          <GlobalFilter
            preGlobalFilteredRows={preGlobalFilteredRows}
            globalFilter={state.globalFilter}
            setGlobalFilter={setGlobalFilter}
          />
          <div className="mt-2">
            <Scrollbars style={{ height: props.height }}>
              <div {...getTableProps()} className={`${props.className} ${props.rowClickable && 'rowClickable'}`}>
                <div className="thead">
                  {headerGroups.map((headerGroup, i) => (
                    <div key={`t-th-${i + 8}`} className="tr" {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map(column => (
                        <div key={column.id} className="th flx" {...column.getHeaderProps(column.id !== 't_action' && column.getSortByToggleProps())}>
                          {column.render('Header')}
                          {' '}
                          {(column.id !== 't_action' && column.id !== 'selection') && (
                            <span>
                              {column.isSorted
                                ? column.isSortedDesc
                                  ? String.fromCharCode(9662)
                                  : String.fromCharCode(9652)
                                : <span className="btcd-icn icn-sort" style={{ fontSize: 10, marginLeft: 5 }} />}
                            </span>
                          )}
                          {props.resizable
                            && (
                              <div
                                {...column.getResizerProps()}
                                className={`btcd-t-resizer ${column.isResizing ? 'isResizing' : ''}`}
                              />
                            )}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
                <div className="tbody" {...getTableBodyProps()}>
                  {page.map(row => {
                    prepareRow(row)
                    return (
                      <div
                        key={`t-r-${row.index}`}
                        className={`tr ${row.isSelected ? 'btcd-row-selected' : ''}`}
                        {...row.getRowProps()}
                      >
                        {row.cells.map(cell => (
                          <div
                            key={`t-d-${cell.row.index}`}
                            className="td flx"
                            {...cell.getCellProps()}
                            onClick={() => props.rowClickable && typeof cell.column.Header === 'string' && props.onRowClick(row.cells, cell.row.index)}
                            onKeyPress={() => props.rowClickable && typeof cell.column.Header === 'string' && props.onRowClick(row.cells, cell.row.index)}
                            role="button"
                            tabIndex={0}
                            aria-label="cell"
                          >
                            {cell.render('Cell')}
                          </div>
                        ))}
                      </div>
                    )
                  })}
                </div>
              </div>
            </Scrollbars>
          </div>
        </>
      )}

      <div className="btcd-pagination">
        <button aria-label="Go first" className="icn-btn" type="button" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          &laquo;
        </button>
        {' '}
        <button aria-label="Back" className="icn-btn" type="button" onClick={() => previousPage()} disabled={!canPreviousPage}>
          &lsaquo;
        </button>
        {' '}
        <button aria-label="Next" className="icn-btn" type="button" onClick={() => nextPage()} disabled={!canNextPage}>
          &rsaquo;
        </button>
        {' '}
        <button aria-label="Last" className="icn-btn" type="button" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
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
        <label>
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
        </label>
      </div>

    </>
  );
}

export default memo(Table)
