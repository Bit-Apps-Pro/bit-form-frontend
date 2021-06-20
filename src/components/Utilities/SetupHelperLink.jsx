export default function SetupHelperLink({ title, subtitle, youTubeLink, docLink, style }) {

  return (
    <>
      <div className="p-2" style={style}>
        <h5 className="m-0">
          How to setup {title}:
          &nbsp;

          {youTubeLink && (
            <a href={youTubeLink} target="_blank" rel="noreferrer" style={{ color: 'red' }}>
              YouTube
            </a>
          )}

          &nbsp;

          {docLink && (
            <a href={docLink} target="_blank" rel="noreferrer" style={{ color: '#0575f1' }}>
              Documentation
            </a>
          )}

        </h5>
        {subtitle && (
          <p className="mt-1">{subtitle}</p>
        )}
      </div>
    </>
  )
}