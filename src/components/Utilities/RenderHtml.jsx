import htmr from 'htmr'

export default function RenderHtml({ html }) {
  try {
    return (
      <>
        {htmr(html)}
      </>
    )
  } catch (_) {
    return html
  }
}
