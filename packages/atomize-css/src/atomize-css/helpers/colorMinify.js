import { colord, extend } from 'colord'
import minifyPlugin from 'colord/plugins/minify'
import namesPlugin from 'colord/plugins/names'

export default function colorMinify(color) {
  extend([minifyPlugin, namesPlugin])
  const options = {
    transparent: true,
    name: true,
    alphaHex: true,
  }
  return colord(color).minify(options)
}
