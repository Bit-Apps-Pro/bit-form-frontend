import ReactEChartsCore from 'echarts-for-react/lib/core'
import { BarChart } from 'echarts/charts'
import { GridComponent, TitleComponent, TooltipComponent } from 'echarts/components'
import * as echarts from 'echarts/core'
import {
  CanvasRenderer,
} from 'echarts/renderers'
import { useFela } from 'react-fela'
import { getAllDateLabel } from '../../Utils/Helpers'
import ut from '../../styles/2.utilities'

echarts.use(
  [TitleComponent, TooltipComponent, GridComponent, BarChart, CanvasRenderer],
)

const SubmissionsDataTable = ({ data, filterOption }) => {
  console.log('SubmissionsDataTable Rendered', data, filterOption)
  const { css } = useFela()
  const { fromDate, toDate } = filterOption
  const labels = getAllDateLabel(fromDate, toDate)
  const values = labels.map((date) => {
    const dateValue = data.find((item) => item.date === date)
    return dateValue?.value || 0
  })
  const interval = Math.ceil(labels.length / 30)
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    xAxis: {
      type: 'category',
      data: labels,
      axisLabel: {
        interval,
        rotate: 30,
      },
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: 'Submissions',
        data: values,
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)',
        },
        barWidth: '60%',
      },
    ],
  }

  return (
    <div className={css(style.submissionStatsWrap)}>
      <span className={css(ut.title)}>Submission Stats</span>
      <hr />
      <div className={css(style.tableWrap)}>
        <ReactEChartsCore echarts={echarts} option={option} />
      </div>
    </div>
  )
}

const style = {
  submissionStatsWrap: {
    b: '1px solid #ccc',
    p: '1rem',
    brs: '8px',
    bd: '#fff',
  },
  tableWrap: {
    w: '100%',
  },
}

export default SubmissionsDataTable
