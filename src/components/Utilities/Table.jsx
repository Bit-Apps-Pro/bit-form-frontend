/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */

import { memo, useEffect, useState, useRef, forwardRef } from 'react'
import { Scrollbars } from 'react-custom-scrollbars-2'
import { ReactSortable } from 'react-sortablejs'
import { useColumnOrder, useFilters, useFlexLayout, useGlobalFilter, usePagination, useResizeColumns, useRowSelect, useSortBy, useTable } from 'react-table'
import { useSticky } from 'react-table-sticky'
import { useRecoilState, useRecoilValue } from 'recoil'
import { useFela } from 'react-fela'
import { __ } from '../../Utils/i18nwrap'
import ConfirmModal from './ConfirmModal'
import Menu from './Menu'
import TableCheckBox from './TableCheckBox'
import TableLoader2 from '../Loaders/TableLoader2'
import ExportImportMenu from '../ExportImport/ExportImportMenu'
import { $reports, $reportSelector } from '../../GlobalStates/GlobalStates'
import SearchIcon from '../../Icons/SearchIcon'
import ToggleLeftIcn from '../../Icons/ToggleLeftIcn'
import CopyIcn from '../../Icons/CopyIcn'
import TrashIcn from '../../Icons/TrashIcn'
import SortIcn from '../../Icons/SortIcn'
import EyeOffIcon from '../../Icons/EyeOffIcon'

const IndeterminateCheckbox = forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = useRef()
    const resolvedRef = ref || defaultRef
    useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate
    }, [resolvedRef, indeterminate])
    return <TableCheckBox refer={resolvedRef} rest={rest} />
  },
)

function GlobalFilter({ globalFilter, setGlobalFilter, setSearch, exportImportMenu, data, cols, formID }) {
  const [delay, setDelay] = useState(null)
  const reports = useRecoilValue($reports)
  const handleSearch = e => {
    delay && clearTimeout(delay)
    const { value } = e.target

    setGlobalFilter(value || undefined)

    setDelay(setTimeout(() => {
      setSearch(value || undefined)
    }, 1000))
  }

  return (
    <div className="f-search">
      <button type="button" className="icn-btn" aria-label="icon-btn" onClick={() => { setSearch(globalFilter || undefined) }}><SearchIcon size="15" /></button>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label>
        <input
          value={globalFilter || ''}
          onChange={handleSearch}
          placeholder={__('Search', 'bitform')}
        />
      </label>
      {exportImportMenu && <ExportImportMenu data={data} cols={cols} formID={formID} report={reports} />}
    </div>
  )
}

function ColumnHide({ cols, setCols, tableCol, tableAllCols }) {
  return (
    <Menu icn={<EyeOffIcon size="21" />}>
      <Scrollbars autoHide style={{ width: 200 }}>
        <ReactSortable list={cols} setList={l => setCols(l)} handle=".btcd-pane-drg">
          {tableCol.map((column, i) => (
            <div key={tableAllCols[i + 1].id} className={`btcd-pane ${(column.Header === 'Actions' || typeof column.Header === 'object') && 'd-non'}`}>
              <TableCheckBox cls="scl-7" id={tableAllCols[i + 1].id} title={column.Header} rest={tableAllCols[i + 1].getToggleHiddenProps()} />
              <span className="btcd-pane-drg">&#8759;</span>
            </div>
          ))}
        </ReactSortable>
      </Scrollbars>
    </Menu>
  )
}

function Table(props) {
  console.log('%c $render Table', 'background:blue;padding:3px;border-radius:5px;color:white')
  const [confMdl, setconfMdl] = useState({ show: false, btnTxt: '' })
  const { columns, data, fetchData, report } = props
  const [reportData, updateReportData] = useRecoilState($reportSelector(report))
  const { getTableProps,
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
    state: { pageIndex, pageSize, sortBy, filters, globalFilter, hiddenColumns },
    setColumnOrder } = useTable(
      {
        debug: true,
        fetchData,
        columns,
        data,
        manualPagination: typeof props.pageCount !== 'undefined',
        pageCount: props.pageCount,
        initialState: {
          pageIndex: 0,
          hiddenColumns: (reportData && 'details' in reportData && typeof reportData.details === 'object' && 'hiddenColumns' in reportData.details) ? reportData.details.hiddenColumns : [],
          pageSize: (reportData && 'details' in reportData && typeof reportData.details === 'object' && 'pageSize' in reportData.details) ? reportData.details.pageSize : 10,
          sortBy: (reportData && 'details' in reportData && typeof reportData.details === 'object' && 'sortBy' in reportData.details) ? reportData.details.sortBy : [],
          filters: (reportData && 'details' in reportData && typeof reportData.details === 'object' && 'filters' in reportData.details) ? reportData.details.filters : [],
          globalFilter: (reportData && 'details' in reportData && typeof reportData.details === 'object' && 'globalFilter' in reportData.details) ? reportData.details.globalFilter : '',
          columnOrder: (reportData && 'details' in reportData && typeof reportData.details === 'object' && 'order' in reportData.details) ? reportData.details.order : [],
        },
        autoResetPage: false,
        autoResetHiddenColumns: false,
        autoResetSortBy: false,
        autoResetFilters: false,
        autoResetGlobalFilter: false,
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
            Header: ({ getToggleAllRowsSelectedProps }) => <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />,
            Cell: ({ row }) => <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />,
          },
          ...cols,
        ])
      }) : '',
    )
  const [stateSavable, setstateSavable] = useState(false)
  const [search, setSearch] = useState(globalFilter)
  const { css } = useFela()
  useEffect(() => {
    if (fetchData) {
      fetchData({ pageIndex, pageSize, sortBy, filters, globalFilter: search })
    }
  }, [fetchData, pageIndex, pageSize, sortBy, filters, search])

  useEffect(() => {
    if (pageIndex > pageCount) {
      gotoPage(0)
    }
  }, [gotoPage, pageCount, pageIndex])

  useEffect(() => {
    if (!isNaN(report)) {
      let details
      if (reportData && reportData.details && typeof reportData.details === 'object') {
        details = { ...reportData.details, hiddenColumns, pageSize, sortBy, filters, globalFilter }
      } else {
        details = { hiddenColumns, pageSize, sortBy, filters, globalFilter }
      }
      updateReportData({ ...reportData, details, type: 'table' })
      setstateSavable(false)
    } else if (stateSavable) {
      setstateSavable(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageSize, sortBy, filters, globalFilter, hiddenColumns])

  useEffect(() => {
    if (columns.length && allColumns.length >= columns.length) {
      if (reportData && 'details' in reportData) {
        if (stateSavable && reportData.details) {
          const details = { ...reportData.details, order: ['selection', ...columns.map(singleColumn => ('id' in singleColumn ? singleColumn.id : singleColumn.accessor))], type: 'table' }
          if (state.columnOrder.length === 0 && typeof reportData.details === 'object' && 'order' in reportData.details) {
            setColumnOrder(reportData.details.order)
          } else {
            setColumnOrder(details.order)
            updateReportData({ ...reportData, details })
          }
        } else if (!stateSavable && typeof reportData.details === 'object' && reportData.details && 'order' in reportData.details) {
          setColumnOrder(reportData.details.order)
          setstateSavable(true)
        } else if (!stateSavable) {
          setstateSavable(true)
        }
      } else if (typeof props.pageCount !== 'undefined' && report) {
        const details = { hiddenColumns: state.hiddenColumns, order: ['selection', ...columns.map(singleColumn => ('id' in singleColumn ? singleColumn.id : singleColumn.accessor))], pageSize, sortBy: state.sortBy, filters: state.filters, globalFilter: state.globalFilter }
        updateReportData({ details, type: 'table' })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columns])

  const showBulkDupMdl = () => {
    confMdl.action = () => { props.duplicateData(selectedFlatRows, data, { fetchData, data: { pageIndex, pageSize, sortBy, filters, globalFilter: search } }); closeConfMdl() }
    confMdl.btnTxt = __('Duplicate', 'bitform')
    confMdl.btn2Txt = null
    confMdl.btnClass = 'blue'
    confMdl.body = `${__('Do You want Deplicate these', 'bitform')} ${selectedFlatRows.length} ${__('item', 'bitform')} ?`
    confMdl.show = true
    setconfMdl({ ...confMdl })
  }

  const showStModal = () => {
    confMdl.action = (e) => { props.setBulkStatus(e, selectedFlatRows); closeConfMdl() }
    confMdl.btn2Action = (e) => { props.setBulkStatus(e, selectedFlatRows); closeConfMdl() }
    confMdl.btnTxt = __('Disable', 'bitform')
    confMdl.btn2Txt = __('Enable', 'bitform')
    confMdl.body = `${__('Do you want to change these', 'bitform')} ${selectedFlatRows.length} ${__('status', 'bitform')} ?`
    confMdl.show = true
    setconfMdl({ ...confMdl })
  }

  const showDelModal = () => {
    confMdl.action = () => { props.setBulkDelete(selectedFlatRows, { fetchData, data: { pageIndex, pageSize, sortBy, filters, globalFilter: search } }); closeConfMdl() }
    confMdl.btnTxt = __('Delete', 'bitform')
    confMdl.btn2Txt = null
    confMdl.btnClass = ''
    confMdl.body = `${__('Are you sure to delete these', 'bitform')} ${selectedFlatRows.length} ${__('items', 'bitform')} ?`
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

          {props.columnHidable && <ColumnHide cols={props.columns} setCols={props.setTableCols} tableCol={columns} tableAllCols={allColumns} />}

          {props.rowSeletable && selectedFlatRows.length > 0
            && (
              <>
                {'setBulkStatus' in props
                  && (
                    <button onClick={showStModal} className="icn-btn btcd-icn-lg tooltip" style={{ '--tooltip-txt': '"Status"' }} aria-label="icon-btn" type="button">
                      <ToggleLeftIcn stroke="1.5" />
                    </button>
                  )}
                {'duplicateData' in props
                  && (
                    <button onClick={showBulkDupMdl} className="icn-btn btcd-icn-lg tooltip" style={{ '--tooltip-txt': '"Duplicate"' }} aria-label="icon-btn" type="button">
                      <CopyIcn w="15" />
                    </button>
                  )}
                <button onClick={showDelModal} className="icn-btn btcd-icn-lg tooltip" style={{ '--tooltip-txt': '"Delete"' }} aria-label="icon-btn" type="button">
                  <TrashIcn size="21" />
                </button>
                <small className={css(cls.pill)}>
                  {selectedFlatRows.length}
                  {' '}
                  {__('Row Selected', 'bitform')}
                </small>
              </>
            )}
        </div>
      </div>
      <>
        <GlobalFilter
          preGlobalFilteredRows={preGlobalFilteredRows}
          globalFilter={state.globalFilter}
          setGlobalFilter={setGlobalFilter}
          setSearch={setSearch}
          exportImportMenu={props.exportImportMenu}
          data={props.data}
          cols={props.columns}
          formID={props.formID}
          report={report}

        />
        <div className="mt-2">
          <Scrollbars className="btcd-scroll" style={{ height: props.height }}>
            <div {...getTableProps()} className={`${props.className} ${props.rowClickable && 'rowClickable'}`}>
              <div className="thead">
                {headerGroups.map((headerGroup, i) => (
                  <div key={`t-th-${i + 8}`} className="tr" {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                      <div key={column.id} className="th flx" {...column.getHeaderProps()}>
                        <div {...column.id !== 't_action' && column.getSortByToggleProps()} style={{ display: 'flex', alignItems: 'center' }}>
                          {column.render('Header')}
                          {' '}
                          {(column.id !== 't_action' && column.id !== 'selection') && (
                            <span style={{ marginLeft: 5, display: 'flex', flexDirection: 'column' }}>
                              {(column.isSorted || column.isSortedDesc) && <SortIcn />}
                              {(column.isSorted || !column.isSortedDesc) && <SortIcn style={{ transform: 'rotate(180deg)' }} />}
                            </span>
                          )}
                        </div>
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
              {props.loading ? <TableLoader2 /> : (
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
                            {...props.rorowClickable
                            && typeof cell.column.Header === 'string'
                            && {
                              onClick: e => props.onRowClick(e, row.cells, cell.row.index, { fetchData, data: { pageIndex, pageSize, sortBy, filters, globalFilter } }),
                              onKeyPress: e => props.onRowClick(e, row.cells, cell.row.index, { fetchData, data: { pageIndex, pageSize, sortBy, filters, globalFilter } }),
                              role: 'button',
                              tabIndex: 0,
                            }
                            }
                            // onClick={(e) => props.rowClickable && typeof cell.column.Header === 'string' && props.onRowClick(e, row.cells, cell.row.index, { fetchData, data: { pageIndex, pageSize, sortBy, filters, globalFilter } })}
                            // onKeyPress={(e) => props.rowClickable && typeof cell.column.Header === 'string' && props.onRowClick(e, row.cells, cell.row.index, { fetchData, data: { pageIndex, pageSize, sortBy, filters, globalFilter } })}
                            aria-label="cell"
                          >
                            {cell.render('Cell')}
                          </div>
                        ))}
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </Scrollbars>
        </div>
      </>

      <div className="btcd-pagination">
        <small>
          {props.countEntries >= 0 && (
            `${__('Total Response:', 'bitform')}
            ${props.countEntries}`
          )}
        </small>
        <div>
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
            &nbsp;
            {__('Page', 'bitform')}
            {' '}
            <strong>
              {pageIndex + 1}
              {' '}
              {__('of', 'bitform')}
              {' '}
              {pageOptions.length}
              {' '}
              &nbsp;
            </strong>
            {' '}
          </small>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label>
            <select
              className="btcd-paper-inp"
              value={pageSize}
              onChange={e => {
                setPageSize(Number(e.target.value))
                if (props.getPageSize) {
                  props.getPageSize(e.target.value, pageIndex)
                }
              }}
            >
              {[10, 20, 30, 40, 50].map(pageSiz => (
                <option key={pageSiz} value={pageSiz}>
                  {__('Show', 'bitform')}
                  {' '}
                  {pageSiz}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

    </>
  )
}

const cls = {
  pill: {
    bd: 'hsla(var(--blue-h), var(--blue-s), var(--blue-l), 0.8)',
    cr: 'var(--white)',
    py: 5,
    px: 7,
    brs: 5,
  },
}

export default memo(Table)
