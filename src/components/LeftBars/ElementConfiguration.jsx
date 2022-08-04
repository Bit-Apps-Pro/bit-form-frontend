import { useHistory, useParams } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { $fields, $selectedFieldId } from '../../GlobalStates/GlobalStates'
import { $styles } from '../../GlobalStates/StylesState'
import LayerAccordion from '../CompSettings/StyleCustomize/ChildComp/LayerAccordion'
import { isLabelOverrideStyles, styleClasses } from '../style-new/styleHelpers'
import NavBtn from './NavBtn'

export default function ElementConfiguration({ fldKey }) {
  const styles = useRecoilValue($styles)
  const { formType, formID } = useParams()
  const history = useHistory()

  const fields = useRecoilValue($fields)
  const fieldObj = fields[fldKey]

  const selectedFieldKey = useRecoilValue($selectedFieldId)

  const styleHandler = (route) => {
    history.push(`/form/builder/${formType}/${formID}/field-theme-customize/${route}/${fldKey}`)
  }
  // console.log('fieldObj', fieldObj)
  return (

    <>
      {fieldObj.logo && (
        <NavBtn
          cssSelector={`.${fldKey}-${styleClasses.logo[0]}`}
          subRoute={fldKey}
          route="logo"
          label="Logo"
          offset="2.5"
          highlightSelector={`[data-dev-logo="${fldKey}"]`}
          styleOverride={isLabelOverrideStyles(styles, fldKey, 'logo')}
        />
      )}
      {(fieldObj.typ === 'title' && (fieldObj.title || fieldObj.titlePreIcn || fieldObj.titleSufIcn || fieldObj.subtitle || fieldObj.subTitlPreIcn || fieldObj.subTitlSufIcn))
        && (
          <NavBtn
            cssSelector={`.${fldKey}-titl-wrp`}
            subRoute={fldKey}
            route="titl-wrp"
            label="Title Container"
            offset="2.5"
            highlightSelector={`[data-dev-titl-wrp="${fldKey}"]`}
            styleOverride={isLabelOverrideStyles(styles, fldKey, 'titl-wrp')}
          />
        )}
      {(fieldObj.title || fieldObj.titlePreIcn || fieldObj.titleSufIcn)
        && (
          <>
            {!(fieldObj.titlePreIcn || fieldObj.titleSufIcn) && (
              <NavBtn
                cssSelector={`.${fldKey}-${styleClasses.title[0]}`}
                subRoute={fldKey}
                route="title"
                label="Title"
                offset="2.5"
                highlightSelector={`[data-dev-title="${fldKey}"]`}
                styleOverride={isLabelOverrideStyles(styles, fldKey, 'title')}
              />
            )}
            {(fieldObj.titlePreIcn || fieldObj.titleSufIcn) && (
              <LayerAccordion
                childrenAccodin
                onClick={() => styleHandler('title')}
                offset="3.1"
                title="Title"
                fldData={fieldObj}
                key={fldKey}
                open={fldKey === selectedFieldKey && (fieldObj.titlePreIcn || fieldObj.titleSufIcn)}
                highlightSelector={`[data-dev-title="${fldKey}"]`}
                styleOverride={isLabelOverrideStyles(styles, fldKey, 'title')}
              >
                {fieldObj.titlePreIcn && (
                  <NavBtn
                    cssSelector={`.${fldKey}-${styleClasses.titlePreIcn[0]}`}
                    subRoute={fldKey}
                    route="title-pre-i"
                    label="Leading Icon"
                    offset="3.3"
                    highlightSelector={`[data-dev-title-pre-i="${fldKey}"]`}
                    styleOverride={isLabelOverrideStyles(styles, fldKey, 'title-pre-i')}
                  />
                )}
                {fieldObj.titleSufIcn && (
                  <NavBtn
                    cssSelector={`.${fldKey}-${styleClasses.titleSufIcn[0]}`}
                    subRoute={fldKey}
                    route="title-suf-i"
                    label="Trailing Icon"
                    offset="3.3"
                    highlightSelector={`[data-dev-title-suf-i="${fldKey}"]`}
                    styleOverride={isLabelOverrideStyles(styles, fldKey, 'title-suf-i')}
                  />
                )}
              </LayerAccordion>
            )}
          </>
        )}
      {
        (fieldObj.lbl || fieldObj.lblPreIcn || fieldObj.lblSufIcn || fieldObj.subtitle || fieldObj.subTlePreIcn || fieldObj.subTleSufIcn)
      && (
        <NavBtn
          cssSelector={`.${fldKey}-${styleClasses.lbl[0]}`}
          subRoute={fldKey}
          route="lbl-wrp"
          label="Label Container"
          offset="2.5"
          highlightSelector={`[data-dev-lbl-wrp="${fldKey}"]`}
          styleOverride={isLabelOverrideStyles(styles, fldKey, 'lbl-wrp')}
        />
      )
      }

      {(fieldObj.lbl || fieldObj.lblPreIcn || fieldObj.lblSufIcn)
        && !fieldObj.typ.match(/^(decision-box|razorpay|paypal)$/gi)?.[0] && (
        <>
          {!(fieldObj.lblPreIcn || fieldObj.lblSufIcn || (fieldObj.valid.req && fieldObj.valid.reqShow)) && (
            <NavBtn
              cssSelector={`.${fldKey}-${styleClasses.lbl[1]}`}
              subRoute={fldKey}
              route="lbl"
              label="Label"
              offset="2.5"
              highlightSelector={`[data-dev-lbl="${fldKey}"]`}
              styleOverride={isLabelOverrideStyles(styles, fldKey, 'lbl')}
            />
          )}
          {(fieldObj.lblPreIcn || fieldObj.lblSufIcn || (fieldObj.valid.req && fieldObj.valid.reqShow)) && (
            <LayerAccordion
              childrenAccodin
              onClick={() => styleHandler('lbl')}
              offset="3.1"
              title="Label"
              fldData={fieldObj}
              key={fldKey}
              open={fldKey === selectedFieldKey && (fieldObj.lblPreIcn || fieldObj.lblSufIcn)}
              highlightSelector={`[data-dev-lbl="${fldKey}"]`}
              styleOverride={isLabelOverrideStyles(styles, fldKey, 'lbl')}
            >
              {fieldObj.lblPreIcn && (
                <NavBtn
                  cssSelector={`.${fldKey}-${styleClasses.lblPreIcn[0]}`}
                  subRoute={fldKey}
                  route="lbl-pre-i"
                  label="Leading Icon"
                  offset="3.3"
                  highlightSelector={`[data-dev-lbl-pre-i="${fldKey}"]`}
                  styleOverride={isLabelOverrideStyles(styles, fldKey, 'lbl-pre-i')}
                />
              )}
              {fieldObj.lblSufIcn && (
                <NavBtn
                  cssSelector={`.${fldKey}-${styleClasses.lblSufIcn[0]}`}
                  subRoute={fldKey}
                  route="lbl-suf-i"
                  label="Trailing Icon"
                  offset="3.3"
                  highlightSelector={`[data-dev-lbl-suf-i="${fldKey}"]`}
                  styleOverride={isLabelOverrideStyles(styles, fldKey, 'lbl-suf-i')}
                />
              )}
              {(fieldObj.valid.req && fieldObj.valid.reqShow) && (
                <NavBtn
                  cssSelector={`.${fldKey}-${styleClasses.reqSmbl[0]}`}
                  subRoute={fldKey}
                  route="req-smbl"
                  label="Asterisk"
                  offset="3.3"
                  highlightSelector={`[data-dev-req-smbl="${fldKey}"]`}
                  styleOverride={isLabelOverrideStyles(styles, fldKey, 'req-smbl')}
                />
              )}
            </LayerAccordion>
          )}
        </>
      )}
      {(fieldObj.subtitle || fieldObj.subTlePreIcn || fieldObj.subTleSufIcn || fieldObj.subTitlPreIcn || fieldObj.subTitlSufIcn)
        && (
          <>
            {!(fieldObj.subTlePreIcn || fieldObj.subTleSufIcn || fieldObj.subTitlPreIcn || fieldObj.subTitlSufIcn) && (
              <NavBtn
                cssSelector={`.${fldKey}-${styleClasses.subTitl[0]}`}
                subRoute={fldKey}
                route="sub-titl"
                label="Subtitle"
                offset="2.5"
                highlightSelector={`[data-dev-sub-titl="${fldKey}"]`}
                styleOverride={isLabelOverrideStyles(styles, fldKey, 'sub-titl')}
              />
            )}
            {(fieldObj.subTlePreIcn || fieldObj.subTleSufIcn || fieldObj.subTitlPreIcn || fieldObj.subTitlSufIcn) && (
              <LayerAccordion
                childrenAccodin
                onClick={() => styleHandler('sub-titl')}
                offset="3.1"
                title="Subtitle"
                fldData={fieldObj}
                key={fldKey}
                open={fldKey === selectedFieldKey && (fieldObj.subTlePreIcn || fieldObj.subTleSufIcn || fieldObj.subTitlPreIcn || fieldObj.subTitlSufIcn)}
                highlightSelector={`[data-dev-sub-titl="${fldKey}"]`}
                styleOverride={isLabelOverrideStyles(styles, fldKey, 'sub-titl')}
              >
                {(fieldObj.subTlePreIcn || fieldObj.subTitlPreIcn) && (
                  <NavBtn
                    cssSelector={`.${fldKey}-${styleClasses.subTlePreIcn[0]}`}
                    subRoute={fldKey}
                    route="sub-titl-pre-i"
                    label="Leading Icon"
                    offset="3.3"
                    highlightSelector={`[data-dev-sub-titl-pre-i="${fldKey}"]`}
                    styleOverride={isLabelOverrideStyles(styles, fldKey, 'sub-titl-pre-i')}
                  />
                )}
                {(fieldObj.subTleSufIcn || fieldObj.subTitlSufIcn) && (
                  <NavBtn
                    cssSelector={`.${fldKey}-${styleClasses.subTleSufIcn[0]}`}
                    subRoute={fldKey}
                    route="sub-titl-suf-i"
                    label="Trailing Icon"
                    offset="3.3"
                    highlightSelector={`[data-dev-sub-titl-suf-i="${fldKey}"]`}
                    styleOverride={isLabelOverrideStyles(styles, fldKey, 'sub-titl-suf-i')}
                  />
                )}
              </LayerAccordion>
            )}
          </>
        )}
      {fieldObj.divider && (
        <NavBtn
          cssSelector={`.${fldKey}-${styleClasses.divider[0]}`}
          subRoute={fldKey}
          route="divider"
          label="Divider"
          offset="2.5"
          highlightSelector={`data-dev-divider="${fldKey}"`}
          styleOverride={isLabelOverrideStyles(styles, fldKey, 'divider')}
        />
      )}
      {fieldObj.img && (
        <NavBtn
          cssSelector={`.${fldKey}-${styleClasses.image[0]}`}
          subRoute={fldKey}
          route="img"
          label="Image"
          offset="2.5"
          highlightSelector={`[data-dev-img="${fldKey}"]`}
          styleOverride={isLabelOverrideStyles(styles, fldKey, 'image')}
        />
      )}
      {fieldObj.typ.match(/^(text|number|password|username|email|url|date|datetime-local|time|month|week|color|textarea|)$/)
        && (
          <>
            {!(fieldObj.prefixIcn || fieldObj.suffixIcn) && (
              <NavBtn
                cssSelector={`.${fldKey}-${styleClasses.fld[0]}`}
                subRoute={fldKey}
                route="fld"
                label="Input"
                offset="2.5"
                highlightSelector={`[data-dev-fld="${fldKey}"]`}
                styleOverride={isLabelOverrideStyles(styles, fldKey, 'fld')}
              />
            )}
            {(fieldObj.prefixIcn || fieldObj.suffixIcn) && (
              <LayerAccordion
                childrenAccodin
                onClick={() => styleHandler('fld')}
                offset="3.1"
                title="Input"
                fldData={fieldObj}
                key={fldKey}
                open={fldKey === selectedFieldKey && (fieldObj.prefixIcn || fieldObj.suffixIcn)}
                highlightSelector={`[data-dev-fld="${fldKey}"]`}
                styleOverride={isLabelOverrideStyles(styles, fldKey, 'fld')}
              >
                {fieldObj.prefixIcn && (
                  <NavBtn
                    cssSelector={`.${fldKey}-${styleClasses.prefixIcn[0]}`}
                    subRoute={fldKey}
                    route="pre-i"
                    label="Leading Icon"
                    offset="3.3"
                    highlightSelector={`[data-dev-pre-i="${fldKey}"]`}
                    styleOverride={isLabelOverrideStyles(styles, fldKey, 'pre-i')}
                  />
                )}
                {fieldObj.suffixIcn && (
                  <NavBtn
                    cssSelector={`.${fldKey}-${styleClasses.suffixIcn[0]}`}
                    subRoute={fldKey}
                    route="suf-i"
                    label="Trailing Icon"
                    offset="3.3"
                    highlightSelector={`[data-dev-suf-i="${fldKey}"]`}
                    styleOverride={isLabelOverrideStyles(styles, fldKey, 'suf-i')}
                  />
                )}
              </LayerAccordion>
            )}
          </>
        )}
      {fieldObj.typ.match(/^(html-select|)$/)
        && (
          <>
            <NavBtn
              cssSelector={`.${fldKey}-${styleClasses.fld[0]}`}
              subRoute={fldKey}
              route="fld"
              label="Select"
              offset="2.5"
              highlightSelector={`[data-dev-fld="${fldKey}"]`}
              styleOverride={isLabelOverrideStyles(styles, fldKey, 'fld')}
            />
            <NavBtn
              cssSelector={`.${fldKey}-${styleClasses.prefixIcn[0]}`}
              subRoute={fldKey}
              route="slct-optn"
              label="Options"
              offset="2.5"
              highlightSelector={`[data-dev-slct-optn="${fldKey}"]`}
              styleOverride={isLabelOverrideStyles(styles, fldKey, 'slct-optn')}
            />
            <NavBtn
              cssSelector={`.${fldKey}-${styleClasses.prefixIcn[0]}`}
              subRoute={fldKey}
              route="slct-opt-grp"
              label="Options Group"
              offset="2.5"
              highlightSelector={`[data-dev-slct-opt-grp="${fldKey}"]`}
              styleOverride={isLabelOverrideStyles(styles, fldKey, 'slct-opt-grp')}
            />
          </>
        )}
      {
        fieldObj.typ.match(/^(advanced-file-up)/) && (
          <LayerAccordion
            childrenAccodin
            onClick={() => styleHandler('filepond--drop-label')}
            offset="3.5"
            title="File Upload Field"
            fldData={fieldObj}
            key={fldKey}
            open={fldKey === selectedFieldKey && (fieldObj.prefixIcn || fieldObj.suffixIcn)}
            highlightSelector={`[data-dev-filepond--drop-label="${fldKey}"]`}
            styleOverride={isLabelOverrideStyles(styles, fldKey, 'filepond--drop-label')}
          >
            {/* <NavBtn
              cssSelector={`.${fldKey}-${styleClasses.button[0]}`}
              subRoute={fldKey}
              route="filepond--root"
              label="Root"
              offset="3.1"
              highlightSelector={`[data-dev-filepond--root="${fldKey}"]`}
              styleOverride={isLabelOverrideStyles(styles, fldKey, 'filepond--root')}
            /> */}
            <NavBtn
              cssSelector={`.${fldKey}-${styleClasses.button[0]}`}
              subRoute={fldKey}
              route="filepond--drop-label"
              label="Drop Label"
              offset="3.1"
              highlightSelector={`[data-dev-filepond--drop-label="${fldKey}"]`}
              styleOverride={isLabelOverrideStyles(styles, fldKey, 'filepond--drop-label')}
            />

            <NavBtn
              cssSelector={`.${fldKey}-${styleClasses.button[0]}`}
              subRoute={fldKey}
              route="filepond--label-action"
              label="Label Action"
              offset="3.1"
              highlightSelector={`[data-dev-filepond--label-action="${fldKey}"]`}
              styleOverride={isLabelOverrideStyles(styles, fldKey, 'filepond--label-action')}
            />

            {/* <NavBtn
              cssSelector={`.${fldKey}-${styleClasses.button[0]}`}
              subRoute={fldKey}
              route="filepond--panel-root"
              label="Paenl Root"
              offset="3.1"
              highlightSelector={`[data-dev-filepond--panel-root="${fldKey}"]`}
              styleOverride={isLabelOverrideStyles(styles, fldKey, 'filepond--panel-root')}
            /> */}

            <NavBtn
              cssSelector={`.${fldKey}-${styleClasses.button[0]}`}
              subRoute={fldKey}
              route="filepond--item-panel"
              label="Item Panel"
              offset="3.1"
              highlightSelector={`[data-dev-filepond--item-panel="${fldKey}"]`}
              styleOverride={isLabelOverrideStyles(styles, fldKey, 'filepond--item-panel')}
            />

            <NavBtn
              cssSelector={`.${fldKey}-${styleClasses.button[0]}`}
              subRoute={fldKey}
              route="filepond--file-action-button"
              label="File Action Button"
              offset="3.1"
              highlightSelector={`[data-dev-filepond--file-action-button="${fldKey}"]`}
              styleOverride={isLabelOverrideStyles(styles, fldKey, 'filepond--file-action-button')}
            />

            {/* <NavBtn
              cssSelector={`.${fldKey}-${styleClasses.button[0]}`}
              subRoute={fldKey}
              route="filepond--drip-blob"
              label="Drip Blob"
              offset="3.1"
              highlightSelector={`[data-dev-filepond--drip-blob="${fldKey}"]`}
              styleOverride={isLabelOverrideStyles(styles, fldKey, 'filepond--drip-blob')}
            /> */}

            <NavBtn
              cssSelector={`.${fldKey}-${styleClasses.button[0]}`}
              subRoute={fldKey}
              route="filepond--file"
              label="File"
              offset="3.1"
              highlightSelector={`[data-dev-filepond--file="${fldKey}"]`}
              styleOverride={isLabelOverrideStyles(styles, fldKey, 'filepond--file')}
            />

          </LayerAccordion>
        )
      }
      {
        fieldObj.typ.match(/^(file-up)/) && (
          <>
            <NavBtn
              cssSelector={`.${fldKey}-file-up-wrpr`}
              subRoute={fldKey}
              route="file-up-wrpr"
              label="Input Container"
              offset="2.5"
              highlightSelector={`[data-dev-file-up-wrpr="${fldKey}"]`}
              styleOverride={isLabelOverrideStyles(styles, fldKey, 'file-up-wrpr')}
            />
            <LayerAccordion
              childrenAccodin
              onClick={() => styleHandler('inp-btn')}
              offset="3.5"
              title="Button"
              fldData={fieldObj}
              key={`inp-${fldKey}`}
              open={fldKey === selectedFieldKey && (fieldObj.prefixIcn || fieldObj.suffixIcn)}
              highlightSelector={`[data-dev-inp-btn="${fldKey}"]`}
              styleOverride={isLabelOverrideStyles(styles, fldKey, 'inp-btn')}
            >
              {fieldObj.prefixIcn && (
                <NavBtn
                  cssSelector={`.${fldKey}-${styleClasses.prefixIcn[0]}`}
                  subRoute={fldKey}
                  route="pre-i"
                  label="Leading Icon"
                  offset="3.1"
                  highlightSelector={`[data-dev-pre-i="${fldKey}"]`}
                  styleOverride={isLabelOverrideStyles(styles, fldKey, 'pre-i')}
                />
              )}
              {fieldObj.btnTxt && (
                <NavBtn
                  cssSelector={`.${fldKey}-${styleClasses.btnTxt[0]}`}
                  subRoute={fldKey}
                  route="btn-txt"
                  label="Text"
                  offset="3.1"
                  highlightSelector={`[data-dev-btn-txt="${fldKey}"]`}
                  styleOverride={isLabelOverrideStyles(styles, fldKey, 'btn-txt')}
                />
              )}
              {fieldObj.suffixIcn && (
                <NavBtn
                  cssSelector={`.${fldKey}-${styleClasses.suffixIcn[0]}`}
                  subRoute={fldKey}
                  route="suf-i"
                  label="Trailing Icon"
                  offset="3.1"
                  highlightSelector={`[data-dev-suf-i="${fldKey}"]`}
                  styleOverride={isLabelOverrideStyles(styles, fldKey, 'suf-i')}
                />
              )}
            </LayerAccordion>
            {fieldObj.config.showSelectStatus && (
              <NavBtn
                cssSelector={`.${fldKey}-${styleClasses.fileSelectStatus[0]}`}
                subRoute={fldKey}
                route="file-select-status"
                label="File Select Status"
                offset="2.5"
                highlightSelector={`[data-dev-file-select-status="${fldKey}"]`}
                styleOverride={isLabelOverrideStyles(styles, fldKey, 'file-select-status')}
              />
            )}
            {fieldObj.config.showMaxSize && (
              <NavBtn
                cssSelector={`.${fldKey}-${styleClasses.maxSizeLbl[0]}`}
                subRoute={fldKey}
                route="max-size-lbl"
                label="Max Size Label"
                offset="2.5"
                highlightSelector={`[data-dev-max-size-lbl="${fldKey}"]`}
                styleOverride={isLabelOverrideStyles(styles, fldKey, 'max-size-lbl')}
              />
            )}

            {fieldObj.config.showFileList && (
              <LayerAccordion
                childrenAccodin
                onClick={() => styleHandler('files-list')}
                offset="3.5"
                title="Files list"
                fldData={fieldObj}
                key={fldKey}
                open={fldKey === selectedFieldKey}
                highlightSelector={`[data-dev-files-list="${fldKey}"]`}
                styleOverride={isLabelOverrideStyles(styles, fldKey, 'files-list')}
              >
                <NavBtn
                  cssSelector={`.${fldKey}-${styleClasses.fileWpr[0]}`}
                  subRoute={fldKey}
                  route="file-wrpr"
                  label="File Wrapper"
                  offset="3.1"
                  highlightSelector={`[data-dev-file-wrpr="${fldKey}"]`}
                  styleOverride={isLabelOverrideStyles(styles, fldKey, 'file-wrpr')}
                />

                {fieldObj.config.showFilePreview && (
                  <NavBtn
                    cssSelector={`.${fldKey}-${styleClasses.filePreview[0]}`}
                    subRoute={fldKey}
                    route="file-preview"
                    label="File Preview"
                    offset="3.1"
                    highlightSelector={`[data-dev-file-preview="${fldKey}"]`}
                    styleOverride={isLabelOverrideStyles(styles, fldKey, 'file-preview')}
                  />
                )}
                <NavBtn
                  cssSelector={`.${fldKey}-${styleClasses.fileTitl[0]}`}
                  subRoute={fldKey}
                  route="file-title"
                  label="File Title"
                  offset="3.1"
                  highlightSelector={`[data-dev-file-title="${fldKey}"]`}
                  styleOverride={isLabelOverrideStyles(styles, fldKey, 'file-title')}
                />
                {fieldObj.config.showFileSize && (
                  <NavBtn
                    cssSelector={`.${fldKey}-${styleClasses.fileSize[0]}`}
                    subRoute={fldKey}
                    route="file-size"
                    label="File Size"
                    offset="3.1"
                    highlightSelector={`[data-dev-file-size="${fldKey}"]`}
                    styleOverride={isLabelOverrideStyles(styles, fldKey, 'file-size')}
                  />
                )}
                <NavBtn
                  cssSelector={`.${fldKey}-${styleClasses.crossBtn[0]}`}
                  subRoute={fldKey}
                  route="cross-btn"
                  label="Cross Button"
                  offset="3.1"
                  highlightSelector={`[data-dev-cross-btn="${fldKey}"]`}
                  styleOverride={isLabelOverrideStyles(styles, fldKey, 'cross-btn')}
                />
              </LayerAccordion>
            )}
          </>
        )
      }
      {fieldObj.typ.match(/^(button|)$/)
        && (
          <>
            {!(fieldObj.btnPreIcn || fieldObj.btnSufIcn) && (
              <NavBtn
                cssSelector={`.${fldKey}-${styleClasses.button[0]}`}
                subRoute={fldKey}
                route="btn"
                label="Button"
                offset="2.5"
                highlightSelector={`[data-dev-btn="${fldKey}"]`}
                styleOverride={isLabelOverrideStyles(styles, fldKey, 'btn')}
              />
            )}
            {(fieldObj.btnPreIcn || fieldObj.btnSufIcn) && (
              <LayerAccordion
                childrenAccodin
                onClick={() => styleHandler('btn')}
                offset="3.1"
                title="Button"
                fldData={fieldObj}
                key={fldKey}
                open={fldKey === selectedFieldKey && (fieldObj.btnPreIcn || fieldObj.btnSufIcn)}
                highlightSelector={`[data-dev-btn="${fldKey}"]`}
                styleOverride={isLabelOverrideStyles(styles, fldKey, 'btn')}
              >
                {fieldObj.btnPreIcn && (
                  <NavBtn
                    cssSelector={`.${fldKey}-${styleClasses.btnPreIcn[0]}`}
                    subRoute={fldKey}
                    route="btn-pre-i"
                    label="Leading Icon"
                    offset="3.3"
                    highlightSelector={`[data-dev-btn-pre-i="${fldKey}"]`}
                    styleOverride={isLabelOverrideStyles(styles, fldKey, 'btn-pre-i')}
                  />
                )}
                {fieldObj.btnSufIcn && (
                  <NavBtn
                    cssSelector={`.${fldKey}-${styleClasses.btnSufIcn[0]}`}
                    subRoute={fldKey}
                    route="btn-suf-i"
                    label="Trailing Icon"
                    offset="3.3"
                    highlightSelector={`[data-dev-btn-suf-i="${fldKey}"]`}
                    styleOverride={isLabelOverrideStyles(styles, fldKey, 'btn-suf-i')}
                  />
                )}
              </LayerAccordion>
            )}
          </>
        )}

      {(fieldObj.helperTxt || fieldObj.hlpPreIcn || fieldObj.hlpSufIcn)
        && (
          <>
            {!(fieldObj.hlpPreIcn || fieldObj.hlpSufIcn) && (
              <NavBtn
                cssSelector={`.${fldKey}-${styleClasses.hlpTxt[0]}`}
                subRoute={fldKey}
                route="hlp-txt"
                label="Helper Text"
                offset="2.5"
                highlightSelector={`[data-dev-hlp-txt="${fldKey}"]`}
                styleOverride={isLabelOverrideStyles(styles, fldKey, 'hlp-txt')}
              />
            )}
            {(fieldObj.hlpPreIcn || fieldObj.hlpSufIcn) && (
              <LayerAccordion
                childrenAccodin
                onClick={() => styleHandler('hlp-txt')}
                offset="3.1"
                title="Helper Text"
                fldData={fieldObj}
                key={fldKey}
                open={fldKey === selectedFieldKey && (fieldObj.hlpPreIcn || fieldObj.hlpSufIcn)}
                highlightSelector={`[data-dev-hlp-txt="${fldKey}"]`}
                styleOverride={isLabelOverrideStyles(styles, fldKey, 'hlp-txt')}
              >
                {fieldObj.hlpPreIcn && (
                  <NavBtn
                    cssSelector={`.${fldKey}-${styleClasses.hlpPreIcn[0]}`}
                    subRoute={fldKey}
                    route="hlp-txt-pre-i"
                    label="Leading Icon"
                    offset="3.3"
                    highlightSelector={`[data-dev-hlp-txt-pre-i="${fldKey}"]`}
                    styleOverride={isLabelOverrideStyles(styles, fldKey, 'hlp-txt-pre-i')}
                  />
                )}
                {fieldObj.hlpSufIcn && (
                  <NavBtn
                    cssSelector={`.${fldKey}-${styleClasses.hlpSufIcn[0]}`}
                    subRoute={fldKey}
                    route="hlp-txt-suf-i"
                    label="Trailing Icon"
                    offset="3.3"
                    highlightSelector={`[data-dev-hlp-txt-suf-i="${fldKey}"]`}
                    styleOverride={isLabelOverrideStyles(styles, fldKey, 'hlp-txt-suf-i')}
                  />
                )}
              </LayerAccordion>
            )}
          </>
        )}
    </>
  )
}
