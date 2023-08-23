import { useFela } from 'react-fela'
import { useState } from 'react'
import FieldChart from './FieldChart'
import PieChartIcn from '../../Icons/PieChartIcn'
import BarChartIcn from '../../Icons/BarChartIcn'
import ut from '../../styles/2.utilities'
import PieChart from './PieChart'
import BarChart from './BarChart'
import LineChartIcn from '../../Icons/LineChartIcn'
import TableChart from './TableChart'

export default function FieldReport({ key, title, data }) {
  const { css } = useFela()
  const [viewType, setViewType] = useState('hBar') // ['pie', 'hBar', 'vBar']
  const label = data.title || title
  const dataList = data.dataList || []

  return (
    <div className={css(style.mainWrap)}>
      <div className={css(style.headerWrap)}>
        <h4>{label}</h4>
        <div className={css(style.viewTypeWrp)}>
          <button
            type="button"
            aria-label="chart-button"
            className={`${css(ut.icnBtn, ut.icn_hover, style.icnBtn)} ${viewType === 'pie' && 'active'}`}
            onClick={() => setViewType('pie')}
          >
            <PieChartIcn />
          </button>
          <button
            type="button"
            aria-label="horizonal-bar-button"
            className={`${css(ut.icnBtn, ut.icn_hover, style.icnBtn)} ${viewType === 'hBar' && 'active'}`}
            onClick={() => setViewType('hBar')}
          >
            <BarChartIcn />
          </button>
          <button
            type="button"
            aria-label="vertical-bar-button"
            className={`${css(ut.icnBtn, ut.icn_hover, style.icnBtn)} ${viewType === 'vBar' && 'active'}`}
            onClick={() => setViewType('vBar')}
          >
            <BarChartIcn className={css({ tm: 'rotate(90deg)' })} />
          </button>
          <button
            type="button"
            aria-label="line-chart-button"
            className={`${css(ut.icnBtn, ut.icn_hover, style.icnBtn)} ${viewType === 'line' && 'active'}`}
            onClick={() => setViewType('line')}
          >
            <LineChartIcn />
          </button>
        </div>
      </div>
      <div className={css(style.reportBody)}>
        <div className={css(style.chartBody)}>
          {viewType === 'pie' && <PieChart dataList={dataList} title={label} />}
          {viewType !== 'pie' && <BarChart viewType={viewType} dataList={dataList} title={label} />}
        </div>
        <div className={css(style.tableBody)}>
          <TableChart dataList={dataList} />
        </div>
      </div>
    </div>
  )
}

const style = {
  mainWrap: {
    p: '20px',
    b: '1px solid #ccc',
    brs: '8px',
    mb: '20px',
    bd: '#fff',
  },
  icnBtn: {
    w: '30px',
    h: '30px',
    ow: 'hidden',
    brs: '8px',
  },
  headerWrap: {
    dy: 'flex',
    jc: 'space-between',
  },
  viewTypeWrp: {
    dy: 'flex',
    ai: 'center',
    jc: 'space-between',
    w: '130px',
  },
  reportBody: {
    dy: 'flex',
    w: '100%',
    jc: 'space-between',
  },
  chartBody: {
    w: '60%',
  },
  tableBody: {
    w: '40%',
  },
}
