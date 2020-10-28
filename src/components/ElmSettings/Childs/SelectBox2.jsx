export default function SelectBox(props) {
  return (
    <div className="mt-3 setting-inp">
      <span>{props.title}</span>
      <select className="btcd-paper-inp mt-1" value={props.value} onChange={props.action}>
        {props.options.map(itm => <option key={`btcd-k-${itm.name}`} value={itm.value}>{itm.name}</option>)}
      </select>
    </div>
  )
}
