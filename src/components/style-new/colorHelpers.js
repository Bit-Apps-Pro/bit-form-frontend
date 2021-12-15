/**
* @func hsl2hsv
* @desc Return an HSV color from an HSL color
* @param {Number} h - Hue Angle (0 - 360)
* @param {Number} s - Saturation (0 - 100)
* @param {Number} l - Lightness (0 - 100)
* @return {ArrayHSV}
* @example
* hsl2hsv(0, 100, 50)
* @link https://gist.github.com/defims/0ca2ef8832833186ed396a2f8a204117
*/

export function hsl2hsv(hslH, hslS, hslL) {
  const hsv1 = hslS * (hslL < 50 ? hslL : 100 - hslL) / 100
  const hsvS = hsv1 === 0 ? 0 : 2 * hsv1 / (hslL + hsv1) * 100
  const hsvV = hslL + hsv1
  return [hslH, hsvS, hsvV]
}
/**
* @func hsv2hsl
* @desc Return an HSL color from an HSV color
* @param {Number} h - Hue Angle (0 - 360)
* @param {Number} s - Saturation (0 - 100)
* @param {Number} v - Value (0 - 100)
* @return {ArrayHSL}
* @example
* hsv2hsl(0, 0, 0) // => [0, 100, 50]
* @link https://gist.github.com/defims/0ca2ef8832833186ed396a2f8a204117
*/
export function hsva2hsla(hsvH, hsvS, hsvV, alpha = 100) {
  const hslL = (200 - hsvS) * hsvV / 100
  const [hslS, hslV] = [
    hslL === 0 || hslL === 200 ? 0 : hsvS * hsvV / 100 / (hslL <= 100 ? hslL : 200 - hslL) * 100,
    hslL * 5 / 10,
  ]

  const h = Math.round(hsvH)
  const s = Math.round(hslS)
  const l = Math.round(hslV)

  return [h, s, l, alpha, `hsla(${h}, ${s}%, ${l}%, ${alpha})`]
}
