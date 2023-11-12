import loadable from '@loadable/component'
import { useAtomValue } from 'jotai'
import { useCallback, useEffect, useState } from 'react'
import { useFela } from 'react-fela'
import { useNavigate, useParams } from 'react-router-dom'
import { $fields, $reportSelector } from '../GlobalStates/GlobalStates'
import { dateTimeFormatter, generateReportData, getLastNthDate } from '../Utils/Helpers'
import bitsFetch from '../Utils/bitsFetch'
import { __ } from '../Utils/i18nwrap'
import Loader from '../components/Loaders/Loader'
import FldEntriesByCondition from '../components/Report/FldEntriesByCondition'
import DateFilter from '../components/ReportView/DateFilter'
import SubmissionsDataTable from '../components/ReportView/SubmissionsDataTable'
import Btn from '../components/Utilities/Btn'
import DropDown from '../components/Utilities/DropDown'
import TableCheckBox from '../components/Utilities/TableCheckBox'
import ut from '../styles/2.utilities'

const FieldReport = loadable(() => import('../components/ReportView/FieldReport'), { fallback: <Loader className="g-c" style={{ height: 300, width: 500 }} /> })

export default function ReportView() {
  console.log('ReportView Rendered')
  const { formType, formID } = useParams()
  const [isloading, setisloading] = useState(true)
  const [fromDate, setFromDate] = useState()
  const [toDate, setToDate] = useState()
  const [refreshResp, setRefreshResp] = useState(0)
  const [checkedStatus, setCheckedStatus] = useState(['0', '1', '2', '3', '9'])
  const fields = useAtomValue($fields)
  const [reportedFields, setReportedFields] = useState(() => filterDefaultReportedFields(fields))
  const [allResp, setAllResp] = useState([])
  const { css } = useFela()
  const navigate = useNavigate()
  const currentReport = useAtomValue($reportSelector)

  console.log({ currentReport })

  const fetchData = useCallback(({
    pageSize, pageIndex, sortBy, filters, globalFilter, conditions, entriesFilterByDate,
  }) => {
    // const fetchId = ++fetchIdRef.current
    if (allResp.length < 1) {
      setisloading(true)
    }

    console.log('fetching data')
    bitsFetch(
      {
        id: formID,
        sortBy,
        filters,
        globalFilter,
        conditions,
        entriesFilterByDate,
      },
      'bitforms_get_entries_for_report',
    ).then((res) => {
      if (res?.success) {
        setAllResp(res.data.entries)
      }
      setisloading(false)
    })
    setFromDate(entriesFilterByDate?.start_date)
    setToDate(entriesFilterByDate?.end_date)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formID, refreshResp])

  const reportData = generateReportData(allResp, fields, { reportedFields, checkedStatus, fromDate, toDate })

  const totalSubmission = reportData?.submissionStatsData?.reduce((acc, cur) => acc + cur.value, 0) || 0

  useEffect(() => {
    const startDateFormate = dateTimeFormatter(getLastNthDate(30), 'Y-m-d')
    const endDateFormate = dateTimeFormatter(new Date(), 'Y-m-d')
    const entriesFilterByDate = {
      start_date: startDateFormate,
      end_date: endDateFormate,
    }
    fetchData({
      entriesFilterByDate,
    })
  }, [fetchData])

  const statusCheckedAction = (checked, status) => {
    if (checked) {
      setCheckedStatus(prevState => [...prevState, status])
    } else {
      setCheckedStatus(prevState => prevState.filter(item => item !== status))
    }
  }

  const fieldOption = Object.entries(fields).map(([key, value]) => ({ label: value.adminLbl || value.lbl, value: key })) || []

  const printView = () => {
    // print report-view div content
    const printContents = document.querySelector('.report-view').innerHTML
    const originalContents = document.body.innerHTML
    document.body.innerHTML = printContents
    window.print()
    document.body.innerHTML = originalContents
  }

  const setAllowedReportedFields = (val) => {
    const allowedFields = val.map(item => item.value)
    setReportedFields(allowedFields)
  }

  const checkStatusInArr = status => checkedStatus.includes(status)

  return (
    <div className={css(style.mainWrapper)}>
      <div className={css(style.headerWrapper)}>
        <div className={css(ut.flxc)}>
          <span className={css(style.title)}>Analytics Report: </span>
          <FldEntriesByCondition
            fetchData={fetchData}
            setRefreshResp={setRefreshResp}
          />
        </div>
        <Btn className={css(ut.mr1)} size="sm" onClick={() => navigate(`/form/responses/${formType}/${formID}`)}>
          {__('View Entries')}
        </Btn>
      </div>
      <div className={css(ut.divider)} />
      <div className={css(style.centerWrapper)}>
        <div className={`${css(style.reportWrapper)} report-view`}>
          <SubmissionsDataTable data={reportData?.submissionStatsData} filterOption={{ fromDate, toDate }} />
          <div className={css(style.fieldReportWrap)}>
            <span className={css(ut.title)}>Advance Field Wise Report</span>
            <hr />
            {
              Object.entries(reportData?.fieldData).map(([key, value]) => (
                <FieldReport
                  key={key}
                  title={fields[key]?.adminLbl || fields[key]?.lbl}
                  data={value}
                />
              ))
            }
          </div>
        </div>
        <div className={css(style.reportOptionWrapper)}>
          <div className="filter-option">
            <span className={css(ut.title)}>Filter Options</span>
            <hr />
            {/* <FldEntriesByCondition
              fetchData={fetchData}
              setRefreshResp={setRefreshResp}
            /> */}
            <DateFilter fetchData={fetchData} className={css({ mt: 10 })} />
            <div className={css(style.checkWrp)}>
              <span className={css(ut.sectionTitle)}>Entry Status</span>
              {
                statusList.map((status) => (
                  <TableCheckBox
                    key={status.value}
                    id={status.value}
                    onChange={e => statusCheckedAction(e.target.checked, status.value)}
                    title={status.label}
                    checked={checkStatusInArr(status.value)}
                    className={css(ut.flxc, style.check)}
                  />
                ))
              }
            </div>
            <DropDown
              className={`w-10 ${css(style.msl)}`}
              titleClassName={css(ut.sectionTitle)}
              title={__('Reported Field:')}
              isMultiple
              addable
              options={fieldOption}
              placeholder={__('Select Filed ')}
              jsonValue
              action={setAllowedReportedFields}
              value={reportedFields}
            />
          </div>
          <div className="other-option">
            <h4>Other Info</h4>
            <span>
              Total Entry:
              {' '}
              {totalSubmission}
            </span>
          </div>
          <div className={css(style.printWarp)}>
            <Btn className={css(ut.mr1)} size="sm" onClick={() => printView()}>
              {__('Print Report')}
            </Btn>
          </div>
        </div>
      </div>
    </div>
  )
}

const statusList = [
  { value: '0', label: 'Read' },
  { value: '1', label: 'Unread' },
  { value: '2', label: 'Unconfirmed' },
  { value: '3', label: 'Confirmed' },
  { value: '9', label: 'Draft' },
]

const filterDefaultReportedFields = (fields) => {
  const defaultReportFieldType = ['check', 'radio', 'select', 'html-select', 'country', 'decision-box']
  const defaultReportedFields = Object.entries(fields).filter(([key, value]) => defaultReportFieldType.includes(value.typ)).map(([key, value]) => (key))
  return defaultReportedFields
}

const style = {
  mainWrapper: {
    p: '5px 1rem',
  },
  headerWrapper: {
    mb: 5,
    dy: 'flex',
    jc: 'space-between',
  },
  checkWrp: {
    m: '1rem 0',
  },
  check: {
    m: '5px 0',
    dy: 'table',
  },
  fieldReportWrap: {
    m: '1rem 0',
  },
  centerWrapper: {
    dy: 'flex',
  },
  reportWrapper: {
    p: '1rem',
    w: '70%',
    h: 'calc(100vh - 85px)',
    brs: 10,
    owy: 'scroll',
    bd: '#f1f1f1',
  },
  reportOptionWrapper: {
    w: '30%',
    p: '1rem',
  },
  printWarp: {
    flx: 'center',
    mt: 10,
  },
}
