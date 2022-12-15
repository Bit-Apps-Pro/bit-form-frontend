import htmr from 'htmr'

export default function RenderHtml({ html }) {
  const truncate = html.substring(0, 120)
  try {
    return (
      <>
        {htmr(truncate)}
      </>
    )
  } catch (_) {
    return html
  }
}
