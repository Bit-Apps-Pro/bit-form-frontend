import { useParams } from 'react-router-dom'

export default function RouteByParams(props) {
  const urlParameters = useParams()
  const paramsKey = Object.keys(props)
  let matchedAllParams = true
  paramsKey.forEach((key) => {
    if (props[key] !== '?') {
      if (key !== 'render' && urlParameters[key] !== props[key]) {
        if (props[key] === true && urlParameters[key] === undefined) {
          matchedAllParams = false
        } else if (props[key] !== true) {
          matchedAllParams = false
        }
      }
    }
  })

  return matchedAllParams && props.render
}
