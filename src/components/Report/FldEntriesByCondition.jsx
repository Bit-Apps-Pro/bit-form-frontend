/* eslint-disable react/jsx-props-no-multi-spaces */
/* eslint-disable jsx-a11y/label-has-associated-control */
import Tippy from '@tippyjs/react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil'
import { roundArrow } from 'tippy.js'
import 'tippy.js/animations/scale.css'
import 'tippy.js/animations/shift-away-extreme.css'
import 'tippy.js/dist/svg-arrow.css'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/themes/light-border.css'

import Scrollbars from 'react-custom-scrollbars-2'
import { useFela } from 'react-fela'
import { $bits, $fieldsArr, $reportId, $reports, $reportSelector } from '../../GlobalStates/GlobalStates'
import EditIcn from '../../Icons/EditIcn'
import MoreVerticalIcn from '../../Icons/MoreVerticalIcn'
import PlusIcn from '../../Icons/PlusIcn'
import RefreshIcn from '../../Icons/RefreshIcn'
import SearchIcn from '../../Icons/SearchIcn'
import TrashIcn from '../../Icons/TrashIcn'
import ut from '../../styles/2.utilities'
import tableStyle from '../../styles/table.style'
import bitsFetch from '../../Utils/bitsFetch'
import { deepCopy } from '../../Utils/Helpers'
import { __ } from '../../Utils/i18nwrap'
import LoaderSm from '../Loaders/LoaderSm'
import Btn from '../Utilities/Btn'
import ConfirmModal from '../Utilities/ConfirmModal'
import Modal from '../Utilities/Modal'
import SnackMsg from '../Utilities/SnackMsg'
import Tip from '../Utilities/Tip'
import ConditionalLogic from './ConditionalLogic'
import SearchIcon from '../../Icons/SearchIcon'
import FilterIcn from '../../Icons/FilterIcn'

export default function FldEntriesByCondition({ fetchData, setRefreshResp }) {
  const currentReport = useRecoilValue($reportSelector)
  const [reportId, setReportId] = useRecoilState($reportId)
  const [reports, setReports] = useRecoilState($reports)
  const rprtIndx = reports.findIndex(r => r?.id && r.id.toString() === reportId?.id?.toString())

  const formFields = useRecoilValue($fieldsArr)
  const [showMdl, setshowMdl] = useState(false)
  const [reportIndex, setReportIndex] = useState(rprtIndx || 0)
  const { formID } = useParams()
  const [confMdl, setconfMdl] = useState({ show: false })
  const [availableReports, setAvailableReports] = useState([])
  const [reportUpdate, setReportUpdate] = useState(false)
  const [proModal, setProModal] = useState({ show: false, msg: '' })
  const bits = useRecoilValue($bits)
  const { isPro } = bits
  const [isLoading, setisLoading] = useState(false)
  const [snack, setSnackbar] = useState({ show: false })
  const { css } = useFela()

  useEffect(() => {
    setReportIndex(rprtIndx)
  }, [reportId])

  useEffect(() => {
    setAvailableReport()
  }, [reports])

  useEffect(() => {
    if (reports[reportIndex] && reports[reportIndex]?.details) {
      if (!reports[reportIndex]?.details?.conditions) {
        const tmpConf = deepCopy([...reports])
        if (tmpConf[reportIndex]) {
          tmpConf[reportIndex].details.conditions = [
            { field: '', logic: '', val: '' },
            'or',
            { field: '', logic: '', val: '' }]
          setReports(tmpConf)
        }
      }
    }
  }, [])

  const reportFetchById = (rprtId) => {
    const rprt = reports.find(r => r?.id?.toString() === rprtId.toString())
    // const { pageIndex, pageSize, sortBy, filters, globalFilter, conditions } = rprt.details
    // fetchData({ pageIndex, pageSize, sortBy, filters, conditions })
    setReportId({ id: rprtId, isDefault: rprt?.isDefault === '1' })
  }

  const setAvailableReport = () => {
    const tmpReports = []
    reports.forEach(r => r.id && tmpReports.push({ label: r?.details?.report_name || '', value: r.id.toString(), isDefault: r.isDefault }))
    setAvailableReports([...tmpReports])
    return tmpReports
  }

  const saveReport = () => {
    let { id } = reports[reportIndex]

    if (!reportUpdate) {
      id = 0
    }
    if (reports[reportIndex]?.details?.report_name === '') {
      setSnackbar({ show: true, msg: __('report name cann\'t be empty') })
      return
    }
    setisLoading(true)
    const reportSaveProm = bitsFetch({ report: reports[reportIndex].details, formId: formID, reportId: id }, 'bitforms_save_report')
      .then(response => {
        if (response?.success) {
          const { data } = response
          if (reportUpdate && reportId.id === id) {
            reportFetchById(data.report_id)
          }
          const tmpReport = deepCopy(reports)
          tmpReport[reportIndex].id = data?.report_id?.toString()
          setReports(tmpReport)
        } else if (!response?.success) {
          return 'Error occured'
        }
        setisLoading(false)
        setshowMdl(false)
        return response
      })

    toast.promise(reportSaveProm, {
      loading: __('Saving...', 'biform'),
      success: (res) => res?.data?.message || res?.data,
      error: __('Error occurred, Please try again.'),
    })
  }

  const reportHandler = (e) => {
    const { value, name } = e.target
    const tmpConf = deepCopy([...reports])
    tmpConf[reportIndex].details[name] = value
    setReports(tmpConf)
  }

  const handleInput = (val) => {
    reportFetchById(val)
  }

  const editCurrentReport = (val) => {
    if (!isPro) {
      setProModal({ show: true, msg: 'Edit option available in the pro version!' })
      return
    }
    setReportUpdate(true)
    const rprtIndex = availableReports.findIndex(r => r.value === val)
    setTimeout(() => {
      setReportIndex(rprtIndex)
      setshowMdl(true)
    }, 1)
  }

  const onCloseMdl = () => {
    setshowMdl(false)
    const tmpConf = deepCopy([...reports])
    if (!tmpConf[reportIndex]?.id) {
      tmpConf.splice(reportIndex, 1)
      setReports(tmpConf)
    }
  }

  const createNewReport = () => {
    if (!isPro) {
      setProModal({ show: true, msg: 'Only the default report is available in the free version!' })
      return
    }
    setReportUpdate(false)
    const tmpConf = deepCopy([...reports])

    const arrLen = tmpConf.push({
      // id: tmpIndex,
      isDefault: '0',
      type: 'table',
      details: {
        report_name: 'new report ',
        hiddenColumns: [],
        pageSize: 10,
        sortBy: [],
        filters: [],
        globalFilter: '',
        order: [],
        conditions: [
          { field: '', logic: '', val: '' },
          'or',
          { field: '', logic: '', val: '' }],
      },
    })
    const tmpIndex = arrLen - 1
    setReports(tmpConf)
    setTimeout(() => {
      setReportIndex(tmpIndex)
      setshowMdl(true)
    }, 1)
  }

  const searchReport = (e) => {
    const { value } = e.target
    const filtedReports = setAvailableReport().filter(r => r.label?.toLowerCase().includes(value.toLowerCase()))
    setAvailableReports(filtedReports)
  }

  const deleteReportAlert = (val) => {
    confMdl.btnTxt = __('Delete')
    confMdl.body = __('Are you sure to delete this report')
    confMdl.btnClass = ''
    confMdl.action = () => { delItem(val); closeConfMdl() }
    confMdl.show = true
    setconfMdl({ ...confMdl })
  }

  const delItem = (id) => {
    const deletedReportProm = bitsFetch({ report_id: id }, 'bitforms_delete_report')
      .then(response => {
        if (response?.success) {
          const rpDeletedId = reports.findIndex(r => r.id === id)
          const tmpReport = deepCopy([...reports])
          tmpReport.splice(rpDeletedId, 1)

          setReports(tmpReport)
        } else if (!response?.success) {
          return 'Error occured'
        }
        return response
      })

    toast.promise(deletedReportProm, {
      loading: __('Deleting ...'),
      success: (res) => res?.data?.message || res?.data,
      error: __('Error occurred, Please try again.'),
    })
  }

  const closeConfMdl = () => {
    confMdl.show = false
    setconfMdl({ ...confMdl })
  }

  return (
    <>
      <SnackMsg snack={snack} setSnackbar={setSnackbar} />

      <div className="flx ml-2">
        <div className="flx btcd-custom-report-dpdw mr-2 b-none" style={{ height: 28 }}>
          <span
            className="flx sm b-none pos-rel mr-1"
          >
            <FilterIcn size="16" stroke="2" />
          </span>
          <div className="w-9">
            {currentReport?.details?.report_name?.length > 11 ? (
              `${currentReport.details.report_name?.slice(0, 11)}...`
            ) : (
              currentReport?.details?.report_name
            )}
          </div>
          <button
            className={`flx sm b-none tooltip pos-rel ${css(reportSearch.refreshBtn, { pr: 0, cur: 'pointer' })}`}
            onClick={() => setRefreshResp(1)}
            type="button"
            style={{ '--tooltip-txt': `'${__('Refresh')}'` }}
          >
            <RefreshIcn size="20" />
          </button>
        </div>
        <div className="mr-2">
          <ConfirmModal
            show={confMdl.show}
            close={closeConfMdl}
            btnTxt={confMdl.btnTxt}
            btnClass={confMdl.btnClass}
            body={confMdl.body}
            action={confMdl.action}
          />

          <Tippy
            animation="shift-away-extreme"
            theme="light-border"
            trigger="click"
            arrow={roundArrow}
            interactive="true"
            placement="bottom"
            appendTo="parent"
            className={css(reportSearch.reportTippyBox)}
            content={(
              <div style={{ height: 250, padding: 3 }}>
                <div className="mb-2" style={{ color: 'rgb(63, 63, 63)', fontWeight: 700 }}>Filters</div>
                <div className={css(reportSearch.reportBox, ut.mb2)}>
                  <span><SearchIcon size="16" /></span>
                  <input
                    aria-label="Search reports"
                    type="text"
                    placeholder="Search filters"
                    onChange={searchReport}
                    className={css(reportSearch.dpdwInputBox)}
                  />
                </div>
                {availableReports.length === 0 && (
                  <div style={{ color: '#000' }}>No matching report found</div>
                )}
                <Scrollbars style={{ height: '70%' }} autoHide>
                  <div>
                    {availableReports?.map((report, indx) => (
                      <div
                        key={`fld-condition-${indx * 5}`}
                        className={`report-content-item flx ${report.value === currentReport?.id ? 'report-dpdw-active' : ''}`}
                      >
                        <button
                          type="button"
                          className="report-content-btn-item"
                          disabled={report.value === currentReport?.id}
                          title={report?.label}
                          onClick={() => handleInput(report.value)}
                        >
                          {report?.label?.length > 14 ? (
                            `${report?.label?.slice(0, 14)}...`
                          ) : (report?.label)}
                        </button>
                        {(report.isDefault.toString() === '0') && (
                          <div className="show_tippy_action">
                            <button
                              className={`icn-btn sm ${css(reportSearch.refreshBtn)}`}
                              title="Edit"
                              onClick={() => editCurrentReport(report.value)}
                              type="button"
                            >
                              <EditIcn size="17" />
                            </button>
                            {report.value !== currentReport?.id && (
                              <button
                                // className="icn-btn sm"
                                className={`icn-btn sm ${css(reportSearch.refreshBtn)}`}
                                title="Delete"
                                onClick={() => deleteReportAlert(report.value)}
                                type="button"
                              >
                                <TrashIcn size="15" />
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </Scrollbars>
              </div>
            )}
          >
            <button className={css(tableStyle.tableActionBtn)} type="button">
              <MoreVerticalIcn size="14" />
            </button>
          </Tippy>

          <Modal
            md
            show={showMdl}
            setModal={setshowMdl}
            title="Report"
            style={{ overflow: 'auto' }}
            onCloseMdl={onCloseMdl}
          >
            <>
              <div className="flx mt-4">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  aria-label="Report name"
                  type="text"
                  name="report_name"
                  value={reports[reportIndex]?.details?.report_name || ''}
                  onChange={reportHandler}
                  placeholder="Please enter report name"
                  className="ml-2 btcd-paper-inp w-6"
                />
              </div>
              <div className="mt-4">
                <ConditionalLogic
                  formFields={formFields}
                  dataConf={reports}
                  setDataConf={setReports}
                  reportInd={reportIndex || 0}
                />
                {/* </div>
              <div className="mt-2 f-left"> */}
                <Btn
                  className={css(ut.ftRight, ut.mb3)}
                  onClick={saveReport}
                >
                  {__('Save')}
                  {isLoading && <LoaderSm size={20} clr="#fff" className="ml-2" />}
                </Btn>
              </div>
            </>
          </Modal>
        </div>

        <Tip msg="Add new filter">
          <button
            className={css(tableStyle.tableActionBtn)}
            onClick={createNewReport}
            type="button"
          >
            <PlusIcn size={16} />
          </button>
        </Tip>

        <div>
          <Modal
            sm
            show={proModal.show}
            setModal={() => setProModal({ show: false })}
            title={__('Premium Feature')}
            className="pro-modal"
          >
            <h4 className="txt-center mt-5">
              {proModal.msg}
            </h4>
            <div className="txt-center">
              <a
                href="https://www.bitapps.pro/bit-form"
                target="_blank"
                rel="noreferrer"
              >
                <button className="btn btn-lg blue" type="button">{__('Buy Premium')}</button>
              </a>
            </div>
          </Modal>
        </div>
      </div>
    </>
  )
}
const reportSearch = {
  reportTippyBox: {
    bm: '7px',
    bds: '8px !important',
    mnw: '241px !important',
  },
  reportBox: {
    pn: 'relative',
    '& span': {
      clr: 'hsla(0, 0%, 50%, 100%)',
      pn: 'absolute !important',
      tp: 7,
      lt: 6,
      // ':foucs': { bcr: 'var(--b-92-62) !important' },
    },
  },
  dpdwInputBox: {
    bxs: 'border-box',
    b: '1px solid #E6E6E6!important',
    brs: '8px!important',
    p: '3px 0 3px 24px!important',
    ff: '"Outfit", sans-serif !important',
    fts: 'normal',
    fw: 500,
    fs: 12,
    lh: 15,
    w: '100%',
    mnh: 'auto!important',
    oe: 'none!important',
    tn: '0.1s all ease',
    ':focus': {
      '& ~ span': { cr: 'var(--b-50)' },
      focusShadow: 1,
    },
  },
  refreshBtn: {
    cr: 'hsl(0deg 1% 29%)',
    '&:hover': { cr: 'var(--blue)', bd: 'var(--b-79-96)' },
  },
}
