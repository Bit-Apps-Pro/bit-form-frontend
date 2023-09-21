export default function getFldKeyAndRowIndx(inp) {
  const regex = /([^\[]+)(?:\[(\d+)\])?/
  const match = inp.match(regex)

  if (match) {
    const fldKey = match[1] // Extracted field key
    const rowIndex = match[2] || '' // Extracted row index (default to an empty string if not present)
    return [fldKey, rowIndex]
  }

  return [inp]
}
