import { useState } from 'react'
import { useFela } from 'react-fela'
import ExportIcn from '../../Icons/ExportIcn'
import tableStyle from '../../styles/table.style'
import { __ } from '../../Utils/i18nwrap'
import Tip from '../Utilities/Tip'
import Export from './Export'

export default function ExportImportMenu({ formID, cols, report }) {
  const [showExportMdl, setshowExportMdl] = useState(false)
  const { css } = useFela()

  const exportShow = () => {
    setshowExportMdl(true)
  }

  return (
    <div>
      <Export
        showExportMdl={showExportMdl}
        close={setshowExportMdl}
        formID={formID}
        cols={cols}
        report={report}
      />

      <Tip msg={__('Export Form Data')}>
        <button
          onClick={exportShow}
          className={css(tableStyle.tableActionBtn)}
          type="button"
        >
          <ExportIcn size="16" />
        </button>
      </Tip>
    </div>

  )
}
