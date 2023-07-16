import parse from 'html-react-parser';

export default function RenderHtml({ html }) {
  try {
    return (
      <>
        {parse(html)}
      </>
    )
  } catch (_) {
    return html
  }
}
