export default function RenderStyle({ styleClasses }) {
  if (!styleClasses) return <></>
  const fieldStyleArr = Object.entries(styleClasses)
  const fieldStyleArrLength = fieldStyleArr.length
  let styleString = ''

  for (let i = 0; i < fieldStyleArrLength; i += 1) {
    const [className, styleObj] = fieldStyleArr[i]
    styleString += `.${className}{`

    for (const prop in styleObj) {
      if (Object.hasOwnProperty.call(styleObj, prop)) {
        styleString += `${prop}:${styleObj[prop]};`
      }
    }

    styleString += '}'
  }

  return (
    <style>{styleString}</style>
  )
}
