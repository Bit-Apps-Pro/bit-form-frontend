// import ReactEcharts from 'echarts-for-react'
import ReactEChartsCore from 'echarts-for-react/lib/core'
import { BarChart } from 'echarts/charts'
import * as echarts from 'echarts/core'
import { GridComponent, TooltipComponent, TitleComponent, DatasetComponent } from 'echarts/components'
import {
  CanvasRenderer,
} from 'echarts/renderers'

echarts.use(
  [TitleComponent, TooltipComponent, GridComponent, BarChart, CanvasRenderer],
)
export default function Barchart({ dataList, field, title, viewType }) {
  const data = dataList.map((item) => item.value)
  const labels = dataList.map((item) => item.label)
  const xAxis = {
    type: 'category',
    data: labels,
  }
  const yAxis = {
    type: 'value',
  }
  const type = viewType === 'line' ? 'line' : 'bar'
  if (viewType === 'vBar') {
    xAxis.type = 'value'
    delete xAxis.data
    yAxis.type = 'category'
    yAxis.data = labels
  }
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis,
    yAxis,
    series: [
      {
        name: 'Value Count',
        type,
        barWidth: '60%',
        data,
      },
    ],
  }
  // return <ReactEcharts option={option} />
  return (
    <ReactEChartsCore
      echarts={echarts}
      option={option}
      notMerge
      lazyUpdate
    />
  )
}
