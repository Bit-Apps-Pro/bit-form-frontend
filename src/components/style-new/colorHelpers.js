/* eslint-disable no-multi-assign */
/**
* @func hsl2hsv
* @desc Return an HSV color from an HSL color
* @param {Number} h - Hue Angle (0 - 360)
* @param {Number} s - Saturation (0 - 100)
* @param {Number} l - Lightness (0 - 100)
* @return {ArrayHSV}
* @example
* hsla2hsva(0, 100, 50)
* @link https://gist.github.com/defims/0ca2ef8832833186ed396a2f8a204117
*/

export function hsla2hsva(hslH, hslS, hslL, alpha = 100) {
  const hsv1 = hslS * (hslL < 50 ? hslL : 100 - hslL) / 100
  const hsvS = hsv1 === 0 ? 0 : 2 * hsv1 / (hslL + hsv1) * 100
  const hsvV = hslL + hsv1
  return [hslH, hsvS, hsvV, alpha]
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

  return [h, s, l, alpha, `hsla(${h}, ${s}%, ${l}%, ${alpha}%)`]
}

/**
 * Converts an HSLA color value to RGBA. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 * @link https://gist.github.com/mjackson/5311256
 *
 * @param   String  hslaStr link hsla(0, 100%, 50%, 100%)
 * @return  String  rgba(255, 0, 0, 100%)
 */
export function hsla2Rgba(hslaStr) {
  const [h, s, l, a] = hslaStr.match(/[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)/gi)
  let r
  let g
  let b

  const alpha = a % 1 === 0 ? a : `${a * 100}%`

  if (s === 0) {
    r = g = b = l // achromatic
  } else {
    const hue2rgb = (p, q, k) => {
      let t = k
      if (t < 0) t += 1
      if (t > 1) t -= 1
      if (t < 1 / 6) return p + (q - p) * 6 * t
      if (t < 1 / 2) return q
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
      return p
    }

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q
    r = hue2rgb(p, q, h + 1 / 3)
    g = hue2rgb(p, q, h)
    b = hue2rgb(p, q, h - 1 / 3)
  }

  r = Math.max(0, Math.min(Math.round(r * 255), 255))
  g = Math.max(0, Math.min(Math.round(g * 255), 255))
  b = Math.max(0, Math.min(Math.round(b * 255), 255))

  return `rgba(${r}, ${g}, ${b}, ${alpha}%)`
}

export function hslToHex(h, s, L) {
  const l = L / 100
  const a = s * (Math.min(l, 1 - l) / 100)
  const f = n => {
    const k = (n + h / 30) % 12
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
    return Math.round(255 * color).toString(16).padStart(2, '0') // convert to Hex and prefix "0" if needed
  }
  return `#${f(0)}${f(8)}${f(4)}`
}
