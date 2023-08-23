import { useFela } from 'react-fela'

export default function TableChart({ dataList }) {
  const { css } = useFela()
  const totalValue = dataList.reduce((acc, val) => acc + val.value, 0)
  const data = dataList.map((val) => ({
    ...val,
    percentage: `${((val.value / totalValue) * 100).toFixed(1)}%`,
  }))

  return (
    <div className={css(style.mainWrap)}>
      <table className={css(style.table)}>
        <tr>
          <th>Option Label</th>
          <th>Count/Value</th>
          <th>%</th>
        </tr>
        {data.map((val, key) => (
          <tr key={val.label}>
            <td>{val.label}</td>
            <td>{val.value}</td>
            <td>{val.percentage}</td>
          </tr>
        ))}
      </table>
    </div>
  )
}

const style = {
  mainWrap: {
    w: '100%',
    h: '100%',
    dy: 'flex',
    fd: 'column',
    jc: 'space-between',
  },
  table: {
    b: '1px solid #ddd',
    borderCollapse: 'collapse',
    '& th': {
      bb: '1px solid #ddd',
    },
    '& td': {
      ta: 'center',
      b: '1px solid #e4e4e4',
      bxs: 'border-box',
      p: 3,
    },
    '& tr': {
      b: '1px solid #e4e4e4',
    },
    '& tr:nth-child(odd)>td': { bd: '#f1f1f1' },
  },

}
