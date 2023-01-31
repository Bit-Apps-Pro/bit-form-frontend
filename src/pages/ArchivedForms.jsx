import { useEffect, useState } from 'react'
import { useFela } from 'react-fela'
import { Link } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import CopyText from '../components/Utilities/CopyText'
import Table from '../components/Utilities/Table'
import { $bits } from '../GlobalStates/GlobalStates'
import app from '../styles/app.style'
import { dateTimeFormatter, getFormsFromPhpVariable } from '../Utils/Helpers'
import { __ } from '../Utils/i18nwrap'

const ArchivedForms = () => {
  const bits = useRecoilValue($bits)
  const { css } = useFela()
  const archivedForms = getFormsFromPhpVariable('2')
  const showDateTime = date => (
    <div style={{ lineHeight: 0.7, fontWeight: 500 }}>
      {dateTimeFormatter(date, bits.dateFormat)}
      <br />
      <br />
      <small>{dateTimeFormatter(date, bits.timeFormat)}</small>
    </div>
  )

  const [cols, setCols] = useState([
    { width: 250, minWidth: 80, Header: __('Form Name'), accessor: 'formName', Cell: v => <Link to={`/form/responses/edit/${v.row.original.formID}/`} className="btcd-tabl-lnk">{v.row.values.formName}</Link> },
    { width: 220, minWidth: 200, Header: __('Short Code'), accessor: 'shortcode', Cell: val => <CopyText value={`[${val.row.values.shortcode}]`} className="cpyTxt" /> },
    { width: 100, minWidth: 60, Header: __('Responses'), accessor: 'entries', Cell: value => <Link to={`form/responses/edit/${value.row.original.formID}`} className="btcd-tabl-lnk">{value.row.values.entries}</Link> },
    { width: 160, minWidth: 60, Header: __('Created'), accessor: 'created_at', Cell: row => showDateTime(row.row.original.created_at) },
  ])

  useEffect(() => {
    // add the action column
    if (cols.length > 4) return
    const actionCol = { width: 160, minWidth: 60, Header: __('Action'), accessor: 'action', Cell: value => <button onClick={() => convertToV2Form(value.row.original.formID)}>Migrate</button> }
    setCols([...cols, actionCol])
  }, [])

  const convertToV2Form = (formID) => {
    console.log({ formID })
  }

  return (
    <div>
      {archivedForms.length && (
        <>
          <div className={css(app.af_header)}>
            <h2>{__('Archived Forms')}</h2>
            <button
              type="button"
              data-testid="create-form-btn"
              className={` round btcd-btn-lg blue blue-sh ${css(app.btn)}`}
            >
              {__('Create Form')}
            </button>
          </div>
          <div>
            <Table
              className="f-table btcd-all-frm"
              height={525}
              columns={cols}
              data={archivedForms}
              rowSeletable
              resizable
              columnHidable
              setTableCols={setCols}
            />
          </div>
        </>
      )}
    </div>
  )
}

export default ArchivedForms
