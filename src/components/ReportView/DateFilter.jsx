import { useState, useRef } from 'react'
import { DateRange } from 'react-date-range'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { useFela } from 'react-fela'
import { useAtomValue } from 'jotai'
import { hideAll } from 'tippy.js'
import { $reportSelector } from '../../GlobalStates/GlobalStates'
import CalendarIcn from '../../Icons/CalendarIcn'
import CloseIcn from '../../Icons/CloseIcn'
import ut from '../../styles/2.utilities'
import tableStyle from '../../styles/table.style'
import { dateTimeFormatter, getLastNthDate } from '../../Utils/Helpers'
import { __ } from '../../Utils/i18nwrap'
import Btn from '../Utilities/Btn'
import Downmenu from '../Utilities/Downmenu'
import Tip from '../Utilities/Tip'

export default function DateFilter({ fetchData, className }) {
  console.log('DateFilter Rendered')
  const currentReport = useAtomValue($reportSelector)
  const initialRange = {
    startDate: getLastNthDate(30),
    endDate: new Date(),
    key: 'date',
  }
  const [data, setData] = useState(initialRange)
  const { css } = useFela()

  const searchByDateBetween = dates => {
    const { startDate, endDate } = dates
    const startDateFormate = startDate ? dateTimeFormatter(startDate, 'Y-m-d') : ''
    const endDateFormate = endDate ? dateTimeFormatter(endDate, 'Y-m-d') : ''
    const entriesFilterByDate = {
      start_date: startDateFormate,
      end_date: endDateFormate,
    }

    const { pageIndex, pageSize, sortBy, filters, globalFilter, conditions } = currentReport.details
    fetchData({
      pageIndex, pageSize, sortBy, filters, globalFilter, conditions, entriesFilterByDate,
    })
  }

  const handleClearRange = () => {
    setData(initialRange)
    searchByDateBetween(initialRange)
    hideAll()
  }
  const dateChangeAction = (item) => {
    setData(item)
    searchByDateBetween(item)
  }

  // eslint-disable-next-line no-restricted-globals
  const isFiniteDate = date => date && isFinite(date)
  const setPredefinedDate = (days) => {
    const startDate = getLastNthDate(days)
    const endDate = new Date()
    const item = {
      startDate,
      endDate,
      key: 'date',
    }
    setData(item)
    searchByDateBetween(item)
  }

  return (
    <div className={className}>
      <Downmenu>
        <div className="flx">
          {(isFiniteDate(data.startDate) && isFiniteDate(data.endDate)) && (
            <div className="btcd-custom-date-range white ml-2">
              <span className="m-a">
                &nbsp;
                {`${dateTimeFormatter(data.startDate, 'Y-m-d')}  to  ${dateTimeFormatter(data.endDate, 'Y-m-d')}`}
              </span>
              {/* <button
                aria-label="Close"
                type="button"
                className="icn-btn"
                onClick={handleClearRange}
              >
                <CloseIcn size="12" />
              </button> */}
            </div>
          )}
          <Tip msg={__('Filter Entries between Dates')}>
            <button
              aria-label="Fitler"
              // className="btn btn-date-range mb3 tooltip"
              className={css(tableStyle.tableActionBtn, ut.ml2)}
              style={{ '--tooltip-txt': `'${__('Filter')}'` }}
              type="button"
            >
              <CalendarIcn size="16" />
            </button>
          </Tip>
        </div>
        <div style={{ minHeight: '200px !important' }} className={css(tableStyle.dataRange, style.calenderWrap)}>
          <div className={css(style.preDefDateWrap)}>
            <span className={css(style.preDefDate)} onClick={() => setPredefinedDate(7)}>Last 1 Week</span>
            <span className={css(style.preDefDate)} onClick={() => setPredefinedDate(14)}>Last 2 Week</span>
            <span className={css(style.preDefDate)} onClick={() => setPredefinedDate(30)}>Last 1 Month</span>
            <span className={css(style.preDefDate)} onClick={() => setPredefinedDate(60)}>Last 2 Month</span>
            <span className={css(style.preDefDate)} onClick={() => setPredefinedDate(91)}>Last 3 Month</span>
            <span className={css(style.preDefDate)} onClick={() => setPredefinedDate(182)}>Last 6 Month</span>
          </div>
          <DateRange
            onChange={item => dateChangeAction(item.date)}
            moveRangeOnFirstSelection={false}
            retainEndDateOnFirstSelection
            editableDateInputs
            ranges={[data]}
            maxDate={new Date()}
            showSelectionPreview={false}
            showDateDisplay
            startDatePlaceholder="Start Date"
            endDatePlaceholder="End Date"
            direction="horizontal"
          />
          {/* <div className="flx flx-between ml-1"> */}
          {/* <div className={css({ flx: '', jc: 'end', pt: 8, pb: 6 })}>
            <Btn className={css(ut.mr1)} size="sm" onClick={handleSearch}>{__('Search')}</Btn>
            <Btn variant="primary-outline" size="sm" onClick={handleClearRange}>{__('Clear')}</Btn>
          </div> */}
        </div>
      </Downmenu>
    </div>
  )
}

const style = {
  calenderWrap: {
    dy: 'flex',
  },
  preDefDateWrap: {
    dy: 'flex',
    fd: 'column',
    br: '1px solid #c3c4c7',
    p: '5px 5px',
    mr: 5,
  },
  preDefDate: {
    p: 5,
    bd: '#f0f0f1',
    brs: 5,
    mb: 5,
    cur: 'pointer',
    '&:hover': {
      bd: '#c3c4c7',
    },
  },
}
