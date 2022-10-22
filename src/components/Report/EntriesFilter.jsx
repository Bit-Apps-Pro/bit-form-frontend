import Tippy from '@tippyjs/react'
import { useState } from 'react'
import { DateRange } from 'react-date-range'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { useFela } from 'react-fela'
import { useRecoilValue } from 'recoil'
import { $reportSelector } from '../../GlobalStates/GlobalStates'
import CalendarIcn from '../../Icons/CalendarIcn'
import CloseIcn from '../../Icons/CloseIcn'
import ut from '../../styles/2.utilities'
import tableStyle from '../../styles/table.style'
import { dateTimeFormatter } from '../../Utils/Helpers'
import { __ } from '../../Utils/i18nwrap'
import Btn from '../Utilities/Btn'

export default function EntriesFilter({ fetchData }) {
  const currentReport = useRecoilValue($reportSelector)
  const [data, setData] = useState([
    {
      startDate: '',
      endDate: '',
      key: 'date',
    },
  ])
  const { css } = useFela()

  const searchByDateBetween = () => {
    const { startDate, endDate } = data[0]
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

  return (
    <div className="flx mr-2">
      <Tippy
        animation="shift-away-extreme"
        arrow
        theme="light-border"
        trigger="click"
        interactive="true"
        placement="bottom"
        appendTo="parent"
        className="tippy-box tippy-box-datepicker"
        content={(
          <div style={{ minHeight: '200px !important' }}>
            <DateRange
              onChange={item => setData([item.date])}
              moveRangeOnFirstSelection={false}
              editableDateInputs
              ranges={data}
              maxDate={new Date()}
              showSelectionPreview={false}
              showDateDisplay
              startDatePlaceholder="Start Date"
              endDatePlaceholder="End Date"
            />
            {/* <div className="flx flx-between ml-1"> */}
            <div className={css({ flx: 'center-between', pt: 8, pb: 6 })}>
              <Btn size="sm" onClick={searchByDateBetween}>{__('Search')}</Btn>
              <Btn size="sm" onClick={() => { setData([{ startDate: '', endDate: '', key: 'date' }]) }}>{__('Clear')}</Btn>
            </div>
          </div>
        )}
      >
        {(data[0].startDate === '' || data[0].endDate === '') ? (
          <button
            aria-label="Fitler"
            // className="btn btn-date-range mb3 tooltip"
            className={css(tableStyle.tableActionBtn, ut.ml2)}
            style={{ '--tooltip-txt': `'${__('Filter')}'` }}
            type="button"
          >
            <CalendarIcn size="16" />
          </button>
        ) : (
          <div className="btcd-custom-date-range white  mt-2">
            <span className="m-a">
              &nbsp;
              {`${dateTimeFormatter(data[0].startDate, 'Y-m-d')} - ${dateTimeFormatter(data[0].endDate, 'Y-m-d')}`}
            </span>
            <button
              aria-label="Close"
              type="button"
              className="icn-btn"
              onClick={() => { setData([{ startDate: '', endDate: '', key: 'date' }]) }}
            >
              <CloseIcn size="12" />
            </button>
          </div>
        )}
      </Tippy>
    </div>
  )
}
