import { __ } from '../../../Utils/i18nwrap'
import Cooltip from '../Cooltip'

export default function LearnmoreTip({ title, link }) {
  return (
    <Cooltip>
      {__(title)}
      <a className="btcd-link" href={link} target="_blank" rel="noopener noreferrer">
        &nbsp;
        {__('Learn More')}
      </a>
    </Cooltip>
  )
}
