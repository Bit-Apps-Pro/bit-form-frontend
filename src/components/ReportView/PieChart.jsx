// import ReactEcharts from 'echarts-for-react'
import ReactEChartsCore from 'echarts-for-react/lib/core'
import { PieChart } from 'echarts/charts'
import * as echarts from 'echarts/core'
import { GridComponent, TooltipComponent, TitleComponent, LegendComponent } from 'echarts/components'
import {
  CanvasRenderer,
} from 'echarts/renderers'

echarts.use(
  [TitleComponent, TooltipComponent, GridComponent, LegendComponent, PieChart, CanvasRenderer],
)
export default function Piechart({ dataList, field, title, viewType }) {
  const data = dataList.map((item) => ({ name: item.label, value: item.value }))
  const options = {
    tooltip: {
      trigger: 'item',
    },
    legend: {
      orient: 'horizontal',
      left: 'left',
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '80%',
        data,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  }
  // return <ReactEcharts option={options} />
  return (
    <ReactEChartsCore
      echarts={echarts}
      option={options}
      notMerge
      lazyUpdate
    />
  )
}
