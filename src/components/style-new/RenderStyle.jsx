import { json2CssStr } from './styleHelpers'

export default function RenderStyle({ styleClasses }) {
  if (!styleClasses) return <></>
  const fieldStyleArr = Object.entries(styleClasses)
  const fieldStyleArrLength = fieldStyleArr.length
  let styleString = ''

  for (let i = 0; i < fieldStyleArrLength; i += 1) {
    const [className, styleObj] = fieldStyleArr[i]
    styleString += `${className}`
    styleString += json2CssStr(styleObj)
  }

  return (
    <style>{styleString}</style>
  )
}
