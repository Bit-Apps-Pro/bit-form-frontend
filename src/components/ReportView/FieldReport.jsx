import loadable from '@loadable/component'
import { useState } from 'react'
import { useFela } from 'react-fela'
import BarChartIcn from '../../Icons/BarChartIcn'
import LineChartIcn from '../../Icons/LineChartIcn'
import PieChartIcn from '../../Icons/PieChartIcn'
import ut from '../../styles/2.utilities'
import Loader from '../Loaders/Loader'
import Tip from '../Utilities/Tip'

const TableChart = loadable(() => import('./TableChart'), { fallback: <Loader className="g-c" style={{ height: 300, width: 500 }} /> })
const PieChart = loadable(() => import('./PieChart'), { fallback: <Loader className="g-c" style={{ height: 300, width: 500 }} /> })
const BarChart = loadable(() => import('./BarChart'), { fallback: <Loader className="g-c" style={{ height: 300, width: 500 }} /> })
const LineChart = loadable(() => import('./LineChart'), { fallback: <Loader className="g-c" style={{ height: 300, width: 500 }} /> })

export default function FieldReport({ title, data }) {
  const { css } = useFela()
  const [viewType, setViewType] = useState('hBar') // ['pie', 'hBar', 'vBar']
  const label = data.title || title
  const dataList = data.dataList || []

  return (
    <div className={css(style.mainWrap)}>
      <div className={css(style.headerWrap)}>
        <h4>{label}</h4>
        <div className={css(style.viewTypeWrp)}>
          <Tip msg="Pie Chart">
            <button
              type="button"
              aria-label="chart-button"
              className={`${css(ut.icnBtn, ut.icn_hover, style.icnBtn)} ${viewType === 'pie' && 'active'}`}
              onClick={() => setViewType('pie')}
            >
              <PieChartIcn />
            </button>
          </Tip>
          <Tip msg="Horizontal Bar Chart">
            <button
              type="button"
              aria-label="horizonal-bar-button"
              className={`${css(ut.icnBtn, ut.icn_hover, style.icnBtn)} ${viewType === 'hBar' && 'active'}`}
              onClick={() => setViewType('hBar')}
            >
              <BarChartIcn />
            </button>
          </Tip>
          <Tip msg="Vertical Bar Chart">
            <button
              type="button"
              aria-label="vertical-bar-button"
              className={`${css(ut.icnBtn, ut.icn_hover, style.icnBtn)} ${viewType === 'vBar' && 'active'}`}
              onClick={() => setViewType('vBar')}
            >
              <BarChartIcn className={css({ tm: 'rotate(90deg)' })} />
            </button>
          </Tip>
          <Tip msg="Line Chart">
            <button
              type="button"
              aria-label="line-chart-button"
              className={`${css(ut.icnBtn, ut.icn_hover, style.icnBtn)} ${viewType === 'line' && 'active'}`}
              onClick={() => setViewType('line')}
            >
              <LineChartIcn />
            </button>
          </Tip>
        </div>
      </div>
      <div className={css(style.reportBody)}>
        <div className={css(style.chartBody)}>
          {viewType === 'pie' && <PieChart dataList={dataList} title={label} />}
          {viewType === 'line' && <LineChart dataList={dataList} title={label} />}
          {(viewType === 'vBar' || viewType === 'hBar') && <BarChart viewType={viewType} dataList={dataList} title={label} />}
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
