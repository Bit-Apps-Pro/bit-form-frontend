// import ReactEcharts from 'echarts-for-react'
import ReactEChartsCore from 'echarts-for-react/lib/core'
import { BarChart as BarEChart } from 'echarts/charts'
import { GridComponent, TitleComponent, TooltipComponent } from 'echarts/components'
import * as echarts from 'echarts/core'
import {
  CanvasRenderer,
} from 'echarts/renderers'

echarts.use(
  [TitleComponent, TooltipComponent, GridComponent, BarEChart, CanvasRenderer],
)

export default function Barchart({ dataList, field, title, viewType }) {
  const data = dataList.map((item) => item.value)
  const labels = dataList.map((item) => item.label)
  const xAxis = {
    type: 'category',
    data: labels,
    axisTick: {
      alignWithLabel: true,
    },
  }
  const yAxis = {
    type: 'value',
  }
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
        name: 'Total',
        type: 'bar',
        barWidth: '60%',
        data,
      },
    ],
  }

  return (
    <ReactEChartsCore
      echarts={echarts}
      option={option}
      notMerge
      lazyUpdate
    />
  )
}
