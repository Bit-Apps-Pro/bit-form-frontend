import ReactEcharts from 'echarts-for-react'

export default function BarChart({ dataList, field, title, viewType }) {
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
  return <ReactEcharts option={option} />
}
