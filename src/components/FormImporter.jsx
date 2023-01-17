/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react'
import { useFela } from 'react-fela'
import { useSetRecoilState } from 'recoil'
import { $forms } from '../GlobalStates/GlobalStates'
import ut from '../styles/2.utilities'
import app from '../styles/app.style'
import bitsFetch from '../Utils/bitsFetch'
import { JCOF } from '../Utils/globalHelpers'
import { deepCopy } from '../Utils/Helpers'
import { formsReducer } from '../Utils/Reducers'
import LoaderSm from './Loaders/LoaderSm'
import CustomFileUpload from './Utilities/CustomFileUpload'
import TableCheckBox from './Utilities/TableCheckBox'

export default function FormImporter({ setModal, setTempModal, newFormId, setSnackbar }) {
  const setForms = useSetRecoilState($forms)
  const [importProp, setImportProp] = useState({ prop: ['all', 'additional', 'confirmation', 'workFlows', 'mailTem', 'integrations', 'reports'] })
  const [error, setError] = useState({ formDetail: '', prop: '' })
  const { css } = useFela()
  const [isLoading, setLoading] = useState(false)
  const handleChange = (ev) => {
    if (error[ev.target.name]) {
      setError({ ...error, [ev.target.name]: '' })
    }
    if (ev.target.type === 'checkbox') {
      const tempProp = importProp.prop
      if (ev.target.checked && tempProp.indexOf(ev.target.value) < 0) {
        if (ev.target.value === 'all') {
          setImportProp({ ...importProp, prop: ['all', 'additional', 'confirmation', 'workFlows', 'mailTem', 'integrations', 'reports'] })
          return
        }
        tempProp.push(ev.target.value)
      }
      if (!ev.target.checked && tempProp.indexOf(ev.target.value) > -1) {
        // eslint-disable-next-line no-unused-expressions
        delete tempProp[tempProp.indexOf(ev.target.value)]
      }

      if (
        tempProp.indexOf('additional') < 0
        || tempProp.indexOf('confirmation') < 0
        || tempProp.indexOf('workFlows') < 0
        || tempProp.indexOf('mailTem') < 0
        || tempProp.indexOf('integrations') < 0
        || tempProp.indexOf('reports') < 0
      ) {
        delete tempProp[tempProp.indexOf('all')]
      }
      setImportProp({ ...importProp, prop: tempProp })
    } else {
      const file = ev.target.files[0]
      if (!file || file.type !== 'application/json') {
        setError({ ...error, formDetail: 'Please select an exported json file' })
        ev.target.value = ''
      } else {
        const reader = new FileReader()
        reader.readAsText(ev.target.files[0])
        reader.onload = () => {
          checkFile(reader.result, ev.target)
        }
      }
    }
  }
  const checkFile = (data, file) => {
    let formDetail = {}
    try {
      formDetail = JSON.parse(data)
    } catch (err) {
      setError({ ...error, formDetail: 'Please select an exported json file' })
      file.value = ''
    }
    if (formDetail && formDetail.layout && formDetail.fields) {
      setImportProp({ ...importProp, formDetail })
    } else {
      setError({ ...error, formDetail: 'Please select an exported json file' })
      file.value = ''
    }
  }
  const replaceFormId = (data) => {
    const convertString = JSON.stringify(data)
    const replaceData = convertString.replace(/b([0-9]+)/g, `b${newFormId}`)
    return JSON.parse(replaceData)
  }
  const handleImport = () => {
    if (!importProp.formDetail?.layout || !importProp.formDetail?.fields) {
      setError({ ...error, formDetail: 'Please select an exported json file' })
      return
    }
    const formDetail = deepCopy(importProp.formDetail)
    const importOptions = ['additional', 'workFlows', 'reports']
    importOptions.map(p => {
      if (importProp.prop.indexOf(p) === -1) {
        delete formDetail[p]
      }
    })

    if (formDetail.formSettings) {
      const importFeatures = ['confirmation', 'mailTem', 'integrations']
      importFeatures.map(p => {
        if (importProp.prop.indexOf(p) === -1) {
          delete formDetail.formSettings[p]
        }
      })
    }
    setLoading(true)
    formDetail.style = JCOF.stringify(replaceFormId(formDetail.style))
    formDetail.fields = replaceFormId(formDetail.fields)
    formDetail.themeVars = JCOF.stringify(formDetail.themeVars)
    formDetail.themeColors = JCOF.stringify(formDetail.themeColors)
    formDetail.layout = replaceFormId(formDetail.layout)

    bitsFetch({ formDetail, newFormId }, 'bitforms_import_aform').then(response => {
      if (response.success) {
        const { data } = response
        setForms(allforms => formsReducer(allforms, {
          type: 'add',
          data: {
            formID: data.id, status: true, formName: data.form_name, shortcode: `bitform id='${data.id}'`, entries: 0, views: 0, conversion: 0.00, created_at: data.created_at,
          },
        }))
        setSnackbar({ show: true, msg: data.message })
        setTempModal(false)
        setModal(false)
      } else if (response?.data) {
        setSnackbar({ show: true, msg: response.data })
      }
      setLoading(false)
    })
  }

  return (
    <div className={css({ flx: 'between', fd: 'column', h: '91%' })}>

      <div className={css({ flx: 'center', fd: 'column', mt: 15 })}>
        <CustomFileUpload accept=".json" name="formDetail" onChange={handleChange} iconShow />
        {error.formDetail && <span className={css(cls.error)}>{error.formDetail}</span>}
        <br />
        <br />
        <div className="fld-wrp">
          <div className={`${css(ut.mb1)} fld-lbl`}>Please select property you want to import with form</div>
          <TableCheckBox title=" All" value="all" checked={importProp.prop.indexOf('all') >= 0} name="prop" onChange={handleChange} />
          <div className={css(cls.inputWraper)}>

            <TableCheckBox title=" Additional" value="additional" checked={importProp.prop.indexOf('additional') >= 0} name="prop" onChange={handleChange} />

            <TableCheckBox title=" Confirmations" value="confirmation" checked={importProp.prop.indexOf('confirmation') >= 0} name="prop" onChange={handleChange} />

            <TableCheckBox title=" Conditional Logics" value="workFlows" checked={importProp.prop.indexOf('workFlows') >= 0} name="prop" onChange={handleChange} />

            <TableCheckBox title=" Email Templates" value="mailTem" checked={importProp.prop.indexOf('mailTem') >= 0} name="prop" onChange={handleChange} />

            <TableCheckBox title=" Integrations" value="integrations" checked={importProp.prop.indexOf('integrations') >= 0} name="prop" onChange={handleChange} />
          </div>
        </div>
      </div>
      <div className={css(cls.btnContainer)}>
        <button onClick={() => setModal(false)} className={`${css(app.btn)}`} type="button"> Cancel </button>
        <button onClick={handleImport} className={`${css(app.btn, app.blueGrd)}`} type="button">
          Import
          {isLoading && <LoaderSm size={20} clr="#fff" className="ml-2" />}
        </button>
      </div>
    </div>
  )
}

const cls = {
  btnContainer: {
    flx: 'center',
    jc: 'end',
    cg: 10,
    w: '100%',
    h: 40,
  },
  inputWraper: { my: 10, rg: 5, flx: 'align-center', flxp: '' },
  error: {
    cr: 'var(--red-83-54)',
    tn: 'background 0.2s !important',
    mt: 5,
    ':hover': { cr: 'var(--red-100-49)' },
  },
}
