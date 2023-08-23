import ReactEcharts from 'echarts-for-react'

export default function PieChart({ dataList, field, title, viewType }) {
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
  return <ReactEcharts option={options} />
}
