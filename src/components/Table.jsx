/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react'
import { useTable, useFilters, usePagination, useGlobalFilter, useSortBy, useRowSelect, useResizeColumns, useBlockLayout, useFlexLayout, useColumnOrder } from 'react-table'
import { useSticky } from 'react-table-sticky'
import { Scrollbars } from 'react-custom-scrollbars'
import { ReactSortable } from 'react-sortablejs'
import TableCheckBox from './ElmSettings/Childs/TableCheckBox'
import Menu from './ElmSettings/Childs/Menu'
import { BitappsContext } from '../Utils/BitappsContext'
import TableAction from './ElmSettings/Childs/TableAction'


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
  const { columns, data } = props
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
            <div title="Select All Rows">
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          Cell: ({ row }) => (
            <div title="Select This Row">
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...cols,
      ])
    }) : '',
    props.hasAction ? (hooks => {
      hooks.allColumns.push(cols => [
        ...cols,
        {
          id: 't_action',
          width: 85,
          sticky: 'right',
          Header: 'Actions',
          accessor: 'table_ac',
          Cell: val => <TableAction edit={props.edit} del={props.del} dup={props.duplicateData} id={val.row} />,
        },
      ])
    }) : '',
  )

  useEffect(() => {
    if (props.fetchData) {
      props.fetchData({ pageIndex, pageSize })
    }
  }, [props.fetchData, pageIndex, pageSize])

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
      <button onClick={() => console.log(props.edit())}>data</button>
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
      <div className="btcd-f-t-wrp">
        <Scrollbars style={{ height: props.height }}>
          <div {...getTableProps()} className={`f-table ${props.className}`}>
            <div className="thead">
              {headerGroups.map(headerGroup => (
                <div className="tr" {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => (
                    <div className="th flx" {...column.getHeaderProps(column.id !== 't_action' && column.getSortByToggleProps())}>
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
              {/* <Scrollbars className="btcd-all-f-scrl" style={{ height: props.height }}> */}
              {page.map(row => {
                prepareRow(row)
                return (
                  <div {...row.getRowProps()} className={`tr ${row.isSelected ? 'btcd-row-selected' : ''}`}>
                    {row.cells.map(cell => (
                      <div className="td flx" {...cell.getCellProps()}>{cell.render('Cell')}</div>
                    ))}
                  </div>
                )
              })}
              {/* </Scrollbars> */}
            </div>
          </div>
        </Scrollbars>
      </div>

      <div className="btcd-pagination">
        <button className="icn-btn" type="button" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          &laquo;
        </button>
        {' '}
        <button className="icn-btn" type="button" onClick={() => previousPage()} disabled={!canPreviousPage}>
          &lsaquo;
        </button>
        {' '}
        <button className="icn-btn" type="button" onClick={() => nextPage()} disabled={!canNextPage}>
          &rsaquo;
        </button>
        {' '}
        <button className="icn-btn" type="button" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
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