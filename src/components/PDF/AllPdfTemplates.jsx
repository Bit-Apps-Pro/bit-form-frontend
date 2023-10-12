/* eslint-disable react/no-unstable-nested-components */
import { useAtom } from 'jotai'
import { create } from 'mutative'
import { useState } from 'react'
import { useFela } from 'react-fela'
import toast from 'react-hot-toast'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { $pdfTemplates } from '../../GlobalStates/GlobalStates'
import CopyIcn from '../../Icons/CopyIcn'
import EditIcn from '../../Icons/EditIcn'
import LayoutIcn from '../../Icons/LayoutIcn'
import StackIcn from '../../Icons/StackIcn'
import TrashIcn from '../../Icons/TrashIcn'
import { deepCopy } from '../../Utils/Helpers'
import tutorialLinks from '../../Utils/StaticData/tutorialLinks'
import bitsFetch from '../../Utils/bitsFetch'
import { __ } from '../../Utils/i18nwrap'
import ut from '../../styles/2.utilities'
import app from '../../styles/app.style'
import Button from '../Utilities/Button'
import ConfirmModal from '../Utilities/ConfirmModal'
import Table from '../Utilities/Table'

export default function AllPdfTemplates({ formID }) {
  const [pdfTem, setPdfTem] = useAtom($pdfTemplates)
  const [confMdl, setconfMdl] = useState({ show: false })
  const { css } = useFela()

  const { pathname: url } = useLocation()

  const duplicateTem = i => {
    const newPdfTemObj = create(pdfTem, draft => {
      const { title, body, setting } = draft[i]
      const newTitle = `${title} - Copy`
      draft.splice(i + 1, 0, { title: newTitle, body, setting })
      draft.push({ updateTem: 1 })
    })
    setPdfTem(newPdfTemObj)
  }

  const delTem = (i, templateData) => {
    if (templateData.original.id) {
      const deletePromise = bitsFetch({ formID, id: templateData.original.id }, 'bitforms_delete_pdf_template')
        .then(res => {
          if (res !== undefined && res.success) {
            const pdfTemp = deepCopy(pdfTem)
            pdfTemp.splice(i, 1)
            setPdfTem(pdfTemp)
          }
        })
      toast.promise(deletePromise, {
        loading: 'Deleting',
        success: 'Successfully Deleted',
        error: 'Error Occurred',
      })
    } else {
      const pdfTemp = deepCopy(pdfTem)
      pdfTemp.splice(i, 1)
      setPdfTem(pdfTemp)
    }
  }

  const closeConfMdl = () => {
    confMdl.show = false
    setconfMdl({ ...confMdl })
  }
  const temDelConf = (i, templateData) => {
    confMdl.btnTxt = __('Delete')
    confMdl.body = __('Are you sure to delete this template')
    confMdl.btnClass = ''
    confMdl.action = () => { delTem(i, templateData); closeConfMdl() }
    confMdl.show = true
    setconfMdl({ ...confMdl })
  }

  const temDupConf = i => {
    confMdl.btnTxt = __('Duplicate')
    confMdl.body = __('Are you sure to duplicate this template?')
    confMdl.btnClass = 'blue'
    confMdl.action = () => { duplicateTem(i); closeConfMdl() }
    confMdl.show = true
    setconfMdl({ ...confMdl })
  }
  const col = [
    {
      Header: __('Template Name'),
      accessor: 'title',
      Cell: row => (
        <NavLink to={`${url}/${row.row.index}`}>
          <b>{row.cell.value}</b>
        </NavLink>
      ),
    },
    {
      Header: __('Action'),
      accessor: 'action',
      Cell: row => (
        <>
          <Button
            onClick={() => temDupConf(row.row.index)}
            className="icn-btn mr-2 tooltip pos-rel"
            style={{ '--tooltip-txt': `'${__('Duplicate')}'` }}
          >
            <CopyIcn size="22" />
          </Button>
          <NavLink
            to={`${url}/${row.row.index}`}
            className="icn-btn mr-2 flx flx-center tooltip pos-rel"
            style={{ '--tooltip-txt': `'${__('Edit')}'` }}
          >
            <EditIcn size="22" />
          </NavLink>
          <Button
            onClick={() => temDelConf(row.row.index, row.row)}
            className="icn-btn tooltip pos-rel"
            style={{ '--tooltip-txt': `'${__('Delete')}'` }}
          >
            <TrashIcn size="21" />
          </Button>
        </>
      ),
    },
  ]

  return (
    <div className="w-7">
      <ConfirmModal
        show={confMdl.show}
        close={closeConfMdl}
        btnTxt={confMdl.btnTxt}
        btnClass={confMdl.btnClass}
        body={confMdl.body}
        action={confMdl.action}
      />
      <h2>{__('PDF Templates')}</h2>
      <h5 className="mt-3">
        How to setup PDF Templates:
        <a href={tutorialLinks.pdfTemplate.link} target="_blank" rel="noreferrer" className="yt-txt ml-1 mr-1">
          YouTube
        </a>
        <a href={tutorialLinks.pdfTemplateDoc.link} target="_blank" rel="noreferrer" className="doc-txt">
          Documentation
        </a>
      </h5>
      <div className="">
        <Link
          to={`${url}/new`}
          className={`${css(app.btn)} blue`}
        >
          <LayoutIcn size="20" />
          &nbsp;
          {__('Add New Template')}
        </Link>
        {pdfTem.length > 0 ? (
          <Table
            height="60vh"
            className="btcd-neu-table mr-1"
            columns={col}
            data={pdfTem}
          />
        )
          : (
            <div className={css(ut.btcdEmpty, ut.txCenter)}>
              <StackIcn size="50" />
              {__('Empty')}
            </div>
          )}
      </div>
    </div>
  )
}
