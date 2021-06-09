import { useState } from 'react'
import Export from './Export'

export default function ExportImportMenu({ formID, cols, report }) {
  // const [showImportMdl, setshowImportMdl] = useState(false)
  const [showExportMdl, setshowExportMdl] = useState(false)
  // const importShow = () => {
  //   setshowImportMdl(true)
  // }
  const exportShow = () => {
    setshowExportMdl(true)
  }
  return (
    <div>
      {/*  <Import
        showImportMdl={showImportMdl}
        close={setshowImportMdl}
        formID={formID}
        cols={cols}
      /> */}
      <Export
        showExportMdl={showExportMdl}
        close={setshowExportMdl}
        formID={formID}
        cols={cols}
        report={report}
      />
      <div className="btcd-menu">
        {/* <button onClick={() => importShow()} className="" type="button">Import Data</button>
        {' '} */}
        <button onClick={() => exportShow()} className="btn btcd-btn-o-blue ml-2 mt-0 mb-0" type="button">Export Data</button>
        {/* <button onClick={() => exportData('pdf')} className="" type="button">pdf</button>
        <button onClick={() => exportData('csv')} className="" type="button">csv</button>
        <button onClick={() => exportData('xlsx')} className="" type="button">xls</button>
        <button onClick={() => exportData('ods')} className="" type="button">ods</button>
        <button onClick={() => exportData('fods')} className="" type="button">fods</button>
        <button onClick={() => exportData('prn')} className="" type="button">prn</button> */}
      </div>
    </div>

  )
}
