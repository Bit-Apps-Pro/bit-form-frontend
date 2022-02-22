/* eslint-disable no-param-reassign */
/* eslint-disable no-mixed-operators */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
import produce from 'immer'
import { memo, useState } from 'react'
import { useFela } from 'react-fela'
import { useParams } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { $fields } from '../../GlobalStates/GlobalStates'
import EditIcn from '../../Icons/EditIcn'
import ut from '../../styles/2.utilities'
import FieldStyle from '../../styles/FieldStyle.style'
import { deepCopy } from '../../Utils/Helpers'
import { __ } from '../../Utils/i18nwrap'
import { fileFormats } from '../../Utils/StaticData/fileformat'
import Cooltip from '../Utilities/Cooltip'
import DropDown from '../Utilities/DropDown'
import SingleToggle from '../Utilities/SingleToggle'
import FileLblPropertyMdl from './advfileupcmpt/FileLblPropertyMdl'
import FileStyle from './advfileupcmpt/FileStyle'
import FileTypeSize from './advfileupcmpt/FileTypeSize'
import ImageValidateoMdl from './advfileupcmpt/ImageValidateoMdl'
import AutoResizeInput from './CompSettingsUtils/AutoResizeInput'
import ErrorMessageSettings from './CompSettingsUtils/ErrorMessageSettings'
import FieldHideSettings from './CompSettingsUtils/FieldHideSettings'
import FieldLabelSettings from './CompSettingsUtils/FieldLabelSettings'
import SimpleAccordion from './StyleCustomize/ChildComp/SimpleAccordion'
import FieldSettingTitle from './StyleCustomize/FieldSettingTitle'

function AdvanceFileUpSettings() {
  const [lblPropertyMdl, setLblPropertyMdl] = useState(false)
  const [imgValdiateMdl, setImgValdiateMdl] = useState(false)
  const { fieldKey: fldKey } = useParams()
  const [fields, setFields] = useRecoilState($fields)
  const fieldData = deepCopy(fields[fldKey])
  const isRequired = fieldData.valid.req || false
  const adminLabel = fieldData.adminLbl || ''
  const { css } = useFela()
  function setRequired(e) {
    if (e.target.checked) {
      const tmp = { ...fieldData.valid }
      tmp.req = true
      fieldData.valid = tmp
      if (!fieldData.err) fieldData.err = {}
      if (!fieldData.err.req) fieldData.err.req = {}
      fieldData.err.req.dflt = '<p>This field is required</p>'
      fieldData.err.req.show = true
    } else {
      delete fieldData.valid.req
    }
    // eslint-disable-next-line no-param-reassign
    setFields(allFields => produce(allFields, draft => { draft[fldKey] = fieldData }))
  }

  function setFieldProperty(e) {
    const { value, name } = e.target
    if (e.target.value === '') {
      delete fieldData[name]
    } else {
      fieldData[name] = value
    }
    // eslint-disable-next-line no-param-reassign
    setFields(allFields => produce(allFields, draft => { draft[fldKey] = fieldData }))
  }

  const hideAdminLabel = (e) => {
    if (e.target.checked) {
      fieldData.adminLbl = fieldData.lbl || fldKey
    } else {
      delete fieldData.adminLbl
    }
    // eslint-disable-next-line no-param-reassign
    setFields(allFields => produce(allFields, draft => { draft[fldKey] = fieldData }))
  }

  const handle = e => {
    if (e.target.checked) {
      fieldData.config[e.target.name] = true
    } else {
      fieldData.config[e.target.name] = false
    }
    setFields(allFields => produce(allFields, draft => { draft[fldKey] = fieldData }))
  }

  const setErrorMsg = e => {
    const { value, name, type } = e.target
    if (value && type === 'number') {
      fieldData.config[name] = Number(value)
    } else if (value && type !== 'number') {
      fieldData.config[name] = value
    } else {
      delete fieldData.config[name]
    }
    setFields(allFields => produce(allFields, draft => { draft[fldKey] = fieldData }))
  }

  function setFileFilter(value, typ) {
    const val = value.map(itm => itm.value)
    if (!Array.isArray(fieldData.config[typ])) {
      fieldData.config[typ] = []
    }
    fieldData.config[typ] = val
    // eslint-disable-next-line no-param-reassign
    setFields(allFields => produce(allFields, draft => { draft[fldKey] = fieldData }))
  }

  const enablePlugin = (e, typ) => {
    const { checked } = e.target
    if (checked) {
      fieldData.config[typ] = true
    } else {
      fieldData.config[typ] = false
    }

    if (checked && typ === 'allowImageCrop' || typ === 'allowImageResize') {
      fieldData.config.allowImageTransform = true
    }

    if (fieldData?.config?.allowImageCrop || fieldData?.config?.allowImageResize) {
      fieldData.config.allowImageTransform = true
    }

    setFields(allFields => produce(allFields, draft => { draft[fldKey] = fieldData }))
  }

  return (
    <div className="">
      <FieldSettingTitle title="Field Settings" subtitle={fieldData.typ} fieldKey={fldKey} />

      <FieldLabelSettings />

      <hr className={css(FieldStyle.divider)} />

      <SimpleAccordion
        title={__('Admin Label', 'bitform')}
        className={css(FieldStyle.fieldSection)}
        switching
        toggleAction={hideAdminLabel}
        toggleChecked={fieldData?.adminLbl !== undefined}
        open={fieldData?.adminLbl !== undefined}
        disable={!fieldData?.adminLbl}
      >
        <div className={css(FieldStyle.placeholder)}>
          <AutoResizeInput
            ariaLabel="Admin label for this Field"
            placeholder="Type Admin label here..."
            value={adminLabel}
            name="adminLabel"
            changeAction={setFieldProperty}
          />
        </div>
      </SimpleAccordion>
      <SimpleAccordion
        title={__('Capture', 'bitform')}
        className={css(FieldStyle.fieldSection)}
        open
        tip="The capture option will only work on mobile devices."
        tipProps={{ width: 200, icnSize: 17 }}
      >
        <select className={css(FieldStyle.input, ut.mt2)} name="captureMethod" onChange={setErrorMsg}>
          <option value="">Select</option>
          <option value="null">Off</option>
          <option value="capture">On</option>
          <option value="user">User Camera</option>
          <option value="environment">Environment Camera</option>
        </select>
      </SimpleAccordion>

      <hr className={css(FieldStyle.divider)} />
      <hr className={css(FieldStyle.divider)} />

      <SimpleAccordion
        title={__('Name', 'bitform')}
        className={css(FieldStyle.fieldSection)}
        open
      >
        <div className={css(FieldStyle.placeholder)}>
          <input aria-label="Name for this Field" name="fieldName" value={fieldData?.fieldName} placeholder="Type field name here..." className={css(FieldStyle.input)} onChange={setFieldProperty} />
        </div>
      </SimpleAccordion>
      <hr className={css(FieldStyle.divider)} />
      <SimpleAccordion
        title="File Style"
        className={css(FieldStyle.fieldSection)}
      >
        <FileStyle action={setErrorMsg} value={fieldData?.config} />
      </SimpleAccordion>
      <hr className={css(FieldStyle.divider)} />
      <SimpleAccordion
        title={__('Basic', 'bitform')}
        className={css(FieldStyle.fieldSection)}
        open
      >
        <div className={css(ut.p2)}>
          <div className={css(ut.flxcb, FieldStyle.labelTip)}>
            <div className={css(ut.flxcb)}>
              <div className={css(ut.fw500)}>{__('Multiple file upload', 'bitform')}</div>
              <Cooltip width={250} icnSize={17} className={css(ut.ml2)}>
                <div className={css(ut.tipBody)}>
                  Enable or disable adding multiple files
                  <br />
                </div>
              </Cooltip>
            </div>
            <SingleToggle isChecked={fieldData?.config?.allowMultiple} name="allowMultiple" action={handle} />
          </div>

          <div className={css(ut.flxcb, ut.mt2, FieldStyle.labelTip)}>
            <div className={css(ut.flxb)}>
              <div className={css(ut.fw500)}>{__('Allow File Browse', 'bitform')}</div>
              <Cooltip width={250} icnSize={17} className={css(ut.ml2)}>
                <div className={css(ut.tipBody)}>
                  Enable or disable file browser
                  <br />
                </div>
              </Cooltip>
            </div>
            <SingleToggle isChecked={fieldData?.config?.allowBrowse} name="allowBrowse" action={handle} />
          </div>
          <div className={css(ut.flxcb, ut.mt2, FieldStyle.labelTip)}>
            <div className={css(ut.flxb)}>
              <div className={css(ut.fw500)}>{__('Drag n Drop', 'bitform')}</div>
              <Cooltip width={250} icnSize={17} className={css(ut.ml2)}>
                <div className={css(ut.tipBody)}>
                  Enable or disable drag n drop
                  <br />
                </div>
              </Cooltip>
            </div>
            <SingleToggle isChecked={fieldData?.config?.allowDrop} name="allowDrop" action={handle} />
          </div>
          <div className={css(ut.flxcb, ut.mt2, FieldStyle.labelTip)}>
            <div className={css(ut.flxb)}>
              <div className={css(ut.fw500)}>{__('Allow copy to Pasting of files', 'bitform')}</div>
              <Cooltip width={250} icnSize={17} className={css(ut.ml2)}>
                <div className={css(ut.tipBody)}>
                  Enable or disable pasting of files
                  <br />
                </div>
              </Cooltip>
            </div>
            <SingleToggle isChecked={fieldData?.config?.allowPaste} name="allowPaste" action={handle} />
          </div>
          {/* {!fieldData?.config?.allowMultiple && (
            <div className={css(ut.flxcb, ut.mt2, FieldStyle.labelTip)}>
              <div className={css(ut.flxb)}>
                <div className={css(ut.fw500)}>{__('File Replace', 'bitform')}</div>
                <Cooltip width={250} icnSize={17} className={css(ut.ml2)}>
                  <div className={css(ut.tipBody)}>
                    Enable or disable File Replace
                    <br />
                  </div>
                </Cooltip>
              </div>
              <SingleToggle isChecked={fieldData?.config?.allowReplace} name="allowReplace" action={handle} />
            </div>
          )} */}
          <div className={css(ut.flxcb, ut.mt2, FieldStyle.labelTip)}>
            <div className={css(ut.flxb)}>
              <div className={css(ut.fw500)}>{__('Allow reorder files', 'bitform')}</div>
              <Cooltip width={250} icnSize={17} className={css(ut.ml2, FieldStyle.hover_tip)}>
                <div className={css(ut.tipBody)}>
                  Allow users to reorder files with drag and drop interaction
                  <br />
                </div>
              </Cooltip>
            </div>
            <SingleToggle isChecked={fieldData?.config?.allowReorder} name="allowReorder" action={handle} />
          </div>
          <div className={css(ut.flxcb, ut.mt2, FieldStyle.labelTip)}>
            <div className={css(ut.flxb)}>
              <div className={css(ut.fw500)}>{__('Upload on select', 'bitform')}</div>
              <Cooltip width={250} icnSize={17} className={css(ut.ml2)}>
                <div className={css(ut.tipBody)}>
                  Immediately upload new files to the server
                  <br />
                </div>
              </Cooltip>
            </div>
            <SingleToggle isChecked={fieldData?.config?.instantUpload} name="instantUpload" action={handle} />
          </div>
          <div className={css(ut.flxcb, ut.mt2, FieldStyle.labelTip)}>
            <div className={css(ut.flxb)}>
              <div className={css(ut.fw500)}>{__('Full page droppable', 'bitform')}</div>
              <Cooltip width={250} icnSize={17} className={css(ut.ml2)}>
                <div className={css(ut.tipBody)}>
                  dropped on the webpage
                  <br />
                </div>
              </Cooltip>
            </div>
            <SingleToggle isChecked={fieldData?.config?.dropOnPage} name="dropOnPage" action={handle} />
          </div>
          <div className={css(ut.flxcb, ut.mt2, FieldStyle.labelTip)}>
            <div className={css(ut.flxb)}>
              <div className={css(ut.fw500)}>{__('Labels Customization', 'bitform')}</div>
              <Cooltip width={250} icnSize={17} className={css(ut.ml2)}>
                <div className={css(ut.tipBody)}>
                  All Label Customization
                  <br />
                </div>
              </Cooltip>
            </div>
            <button
              type="button"
              aria-label="Image Validate Customization "
              className={css(ut.btn)}
              onClick={() => setLblPropertyMdl(true)}
              onKeyPress={() => setLblPropertyMdl(true)}
            >
              <EditIcn size={21} />
            </button>
            <FileLblPropertyMdl
              title="Placholder / Label / Title edit"
              showMdl={lblPropertyMdl}
              setshowMdl={setLblPropertyMdl}
            />

          </div>
        </div>

      </SimpleAccordion>

      <hr className={css(FieldStyle.divider)} />

      <SimpleAccordion
        title={__('File size validation', 'bitform')}
        className={css(FieldStyle.fieldSection)}
        switching
        toggleAction={(e) => enablePlugin(e, 'allowFileSizeValidation')}
        toggleChecked={fieldData?.config?.allowFileSizeValidation}
        open={fieldData?.config?.allowFileSizeValidation}
        disable={!fieldData?.config?.allowFileSizeValidation}
        tip="Note : If you enable this option, the File size validation features will work"
        tipProps={{ width: 200, icnSize: 17 }}
      >
        <FileTypeSize action={setErrorMsg} />
      </SimpleAccordion>

      <hr className={css(FieldStyle.divider)} />
      <SimpleAccordion
        title={__('File type validation', 'bitform')}
        className={css(FieldStyle.fieldSection)}
        switching
        toggleAction={(e) => enablePlugin(e, 'allowFileTypeValidation')}
        toggleChecked={fieldData?.config?.allowFileTypeValidation}
        open={fieldData?.config?.allowFileTypeValidation}
        disable={!fieldData?.config?.allowFileTypeValidation}
        tip="Note : Its features will not work when it is disabled"
        tipProps={{ width: 200, icnSize: 17 }}
      >
        <div className={css(ut.ml2)}>
          <DropDown
            className={css(ut.mt2, ut.w10, ut.fs12, ut.fw500)}
            disableChip={false}
            customValue={false}
            titleClassName={css(ut.mt2, ut.fw500)}
            title={__('Allowed File Type:', 'bitform')}
            isMultiple
            addable
            options={fileFormats}
            placeholder={__('Select File Type', 'bitform')}
            jsonValue
            action={(e) => setFileFilter(e, 'acceptedFileTypes')}
            value={fieldData?.config?.acceptedFileTypes}
          // tip="Select the fill types that will be accepted."
          // tipProps={{ width: 200, icnSize: 17 }}
          />
          <div className={css(FieldStyle.placeholder, ut.mt2, FieldStyle.labelTip)}>
            <div className={css(ut.dyb)}>
              <label className={css(ut.fw500, ut.mr1)}>Invalid File Message Error</label>
              <Cooltip width={250} icnSize={17}>
                <div className={css(ut.tipBody)}>
                  Message shown when an invalid file is added
                </div>
              </Cooltip>
            </div>
            <input
              placeholder="File of Invalid type"
              className={css(FieldStyle.input)}
              type="text"
              name="labelFileTypeNotAllowed"
              value={fieldData?.config?.labelFileTypeNotAllowed}
              on
              Change={setErrorMsg}
            />
          </div>
          <div className={css(FieldStyle.placeholder, ut.mt2, FieldStyle.labelTip)}>
            <div className={css(ut.dyb)}>
              <label className={css(ut.fw500)}>File types Message Error</label>
              <Cooltip width={250} icnSize={17}>
                <div className={css(ut.tipBody)}>
                  Message shown to indicate the allowed file types
                </div>
              </Cooltip>
            </div>
            <input
              placeholder="Expects {allButLastType} or {lastType}"
              className={css(FieldStyle.input)}
              type="text"
              name="fileValidateTypeLabelExpectedTypes"
              value={fieldData?.config?.fileValidateTypeLabelExpectedTypes}
              onChange={setErrorMsg}
            />
          </div>
        </div>

      </SimpleAccordion>

      <hr className={css(FieldStyle.divider)} />
      <SimpleAccordion
        title={__('Image Preview', 'bitform')}
        className={css(FieldStyle.fieldSection)}
        switching
        toggleAction={(e) => enablePlugin(e, 'allowImagePreview')}
        toggleChecked={fieldData?.config?.allowImagePreview}
        open={fieldData?.config?.allowImagePreview}
        disable={!fieldData?.config?.allowImagePreview}
        tip="Note : If you enable this option, the Image Preview features will work"
        tipProps={{ width: 200, icnSize: 17 }}
      >
        <div className={css(FieldStyle.placeholder, ut.mt2, FieldStyle.labelTip)}>
          <div className={css(ut.dyb)}>
            <label className={css(ut.fw500, ut.ml2, ut.w9)}>Image Preview Min Height</label>
            <Cooltip width={250} icnSize={17} className={css(ut.ml2)}>
              <div className={css(ut.tipBody)}>
                Minimum image preview height
              </div>
            </Cooltip>
          </div>
          <input
            placeholder="Preview Min Height"
            className={css(FieldStyle.input)}
            type="number"
            name="imagePreviewMinHeight"
            value={fieldData?.config?.imagePreviewMinHeight}
            min="0"
            onChange={setErrorMsg}
          />
        </div>
        <div className={css(FieldStyle.placeholder, ut.mt2, FieldStyle.labelTip)}>
          <div className={css(ut.dyb)}>
            <label className={css(ut.fw500, ut.ml2, ut.w9)}>Image Preview Max Height</label>
            <Cooltip width={250} icnSize={17} className={css(ut.ml2)}>
              <div className={css(ut.tipBody)}>
                Maximum image preview height
              </div>
            </Cooltip>
          </div>
          <input
            placeholder="Preview Min Height"
            className={css(FieldStyle.input)}
            type="number"
            name="imagePreviewMaxHeight"
            value={fieldData?.config?.imagePreviewMaxHeight}
            min="0"
            onChange={setErrorMsg}
          />
        </div>
        <div className={css(FieldStyle.placeholder, ut.mt2, FieldStyle.labelTip)}>
          <div className={css(ut.dyb)}>
            <label className={css(ut.fw500, ut.ml2, ut.w9)}>Preview Height</label>
            <Cooltip width={250} icnSize={17} className={css(ut.ml2)}>
              <div className={css(ut.tipBody)}>
                Fixed image preview height, overrides min and max preview height
              </div>
            </Cooltip>
          </div>
          <input
            placeholder="Preview Height"
            className={css(FieldStyle.input)}
            type="number"
            name="imagePreviewHeight"
            value={fieldData?.config?.imagePreviewHeight}
            min="0"
            onChange={setErrorMsg}
          />
        </div>
      </SimpleAccordion>

      <hr className={css(FieldStyle.divider)} />

      <div className={css(ut.flxcb, ut.mt2, FieldStyle.labelTip, FieldStyle.fieldSection)}>
        <div className={css(ut.flxb)}>
          <div>{__('Video/Pdf Preview', 'bitform')}</div>
          <Cooltip width={250} icnSize={17} className={css(ut.ml2)}>
            <div className={css(ut.tipBody)}>
              Enable or disable Video or Pdf preview mode
              <br />
            </div>
          </Cooltip>
        </div>
        <SingleToggle className={css(ut.mr30)} isChecked={fieldData?.config?.allowPreview} name="allowPreview" action={(e) => enablePlugin(e, 'allowPreview')} />
      </div>

      <hr className={css(FieldStyle.divider)} />

      <SimpleAccordion
        title={__('Image Crop', 'bitform')}
        className={css(FieldStyle.fieldSection)}
        switching
        toggleAction={(e) => enablePlugin(e, 'allowImageCrop')}
        toggleChecked={fieldData?.config?.allowImageCrop}
        open={fieldData?.config?.allowImageCrop}
        disable={!fieldData?.config?.allowImageCrop}
        tip="Note : If you enable this option, the Image Crop features will work"
        tipProps={{ width: 200, icnSize: 17 }}
      >
        <div className={css(ut.mt2, FieldStyle.labelTip)}>
          <div className={css(ut.dyb)}>
            <label className={css(ut.fw500, ut.ml2)}>Crop Aspect Ratio</label>
            <Cooltip width={250} icnSize={17} className={css(ut.ml2)}>
              <div className={css(ut.tipBody)}>
                The aspect ratio of the crop in human readable format, for example '1:1' or '16:10'
              </div>
            </Cooltip>
          </div>
          <div className={css(FieldStyle.placeholder)}>
            <input
              placeholder="for example '1:1' or '16:10'"
              className={css(FieldStyle.input)}
              type="text"
              name="imageCropAspectRatio"
              value={fieldData?.config?.imageCropAspectRatio}
              onChange={setErrorMsg}
            />
          </div>
        </div>
      </SimpleAccordion>

      <hr className={css(FieldStyle.divider)} />

      <SimpleAccordion
        title={__('Image Resize', 'bitform')}
        className={css(FieldStyle.fieldSection)}
        switching
        toggleAction={(e) => enablePlugin(e, 'allowImageResize')}
        toggleChecked={fieldData?.config?.allowImageResize}
        open={fieldData?.config?.allowImageResize}
        disable={!fieldData?.config?.allowImageResize}
        tip="Note :If you enable this option, the Image Resize features will work"
        tipProps={{ width: 200, icnSize: 17 }}
      >
        <div className={css(FieldStyle.placeholder, ut.mt2, FieldStyle.labelTip)}>
          <div className={css(ut.dyb)}>
            <label className={css(ut.fw500, ut.ml2)}>Image Resize Width</label>
            <Cooltip width={250} icnSize={17} className={css(ut.ml2)}>
              <div className={css(ut.tipBody)}>
                The output width in pixels, if null will use value of imageResizeTargetHeight
              </div>
            </Cooltip>
          </div>
          <input
            placeholder="Image Resize Width"
            className={css(FieldStyle.input)}
            type="number"
            name="imageResizeTargetWidth"
            value={fieldData?.config?.imageResizeTargetWidth}
            min="0"
            onChange={setErrorMsg}
          />
        </div>
        <div className={css(FieldStyle.placeholder, ut.mt2, FieldStyle.labelTip)}>
          <div className={css(ut.dyb)}>
            <label className={css(ut.fw500, ut.ml2)}>Image Resize Height</label>
            <Cooltip width={250} icnSize={17} className={css(ut.ml2)}>
              <div className={css(ut.tipBody)}>
                The output height in pixels, if null will use value of imageResizeTargetWidth
              </div>
            </Cooltip>
          </div>
          <input
            placeholder="Image Resize Height"
            className={css(FieldStyle.input)}
            type="number"
            name="imageResizeTargetHeight"
            value={fieldData?.config?.imageResizeTargetHeight}
            min="0"
            onChange={setErrorMsg}
          />
        </div>
        <div className={css(ut.mt2, FieldStyle.labelTip)}>
          <div className={css(ut.dyb)}>
            <label className={css(ut.fw500)}>Image Resize Mode</label>
            <Cooltip width={250} icnSize={17} className={css(ut.ml2)}>
              <div className={css(ut.tipBody)}>
                The method in which the images are resized.
              </div>
            </Cooltip>
          </div>
          <select className={css(FieldStyle.selectBox, ut.mr2, ut.fw500)} name="imageResizeMode" onChange={setErrorMsg}>
            <option value="">Select</option>
            <option value="cover">Cover</option>
            <option value="force">Force</option>
            <option value="contain">Contain</option>
          </select>
        </div>
      </SimpleAccordion>

      <hr className={css(FieldStyle.divider)} />

      <SimpleAccordion
        title={__('Image Transform', 'bitform')}
        className={css(FieldStyle.fieldSection)}
        switching
        toggleAction={(e) => enablePlugin(e, 'allowImageTransform')}
        toggleChecked={fieldData?.config?.allowImageTransform}
        open={fieldData?.config?.allowImageTransform}
        disable={!fieldData?.config?.allowImageTransform}
        tip="Note : If you enable this option, the Image Transform features will work"
        tipProps={{ width: 200, icnSize: 17 }}
      >
        <div className={css(ut.mt2, ut.ml2)}>
          <div className={css(ut.mt2, FieldStyle.labelTip)}>
            <div className={css(ut.dyb)}>
              <label className={css(ut.fw500)}>Image Output Type</label>
              <Cooltip width={250} icnSize={17} className={css(ut.ml2)}>
                <div className={css(ut.tipBody)}>
                  The file type of the output image. Can be either 'image/jpeg' or 'image/png' as those are the formats.
                </div>
              </Cooltip>
            </div>
            <select className={css(FieldStyle.selectBox, ut.mr2, ut.fw500)} name="imageTransformOutputMimeType" onChange={setErrorMsg}>
              <option value="">Select</option>
              <option value="image/jpeg">Image/jpeg</option>
              <option value="image/png">Image/png</option>
            </select>
          </div>
          <div className={css(FieldStyle.placeholder, ut.mt2, FieldStyle.labelTip)}>
            <div className={css(ut.dyb)}>
              <label className={css(ut.fw500)}>Transform Output Quality</label>
              <Cooltip width={250} icnSize={17} className={css(ut.ml2)}>
                <div className={css(ut.tipBody)}>
                  The quality of the output image supplied as a value between 0 and 100.
                </div>
              </Cooltip>
            </div>
            <input
              placeholder="94"
              className={css(FieldStyle.input)}
              type="number"
              name="imageTransformOutputQuality"
              value={fieldData?.config?.imageTransformOutputQuality}
              min="0"
              onChange={setErrorMsg}
            />
          </div>
          {/* <div className={css(ut.mt2, FieldStyle.labelTip)}>
            <div className={css(ut.flxb)}>
              <label className={css(ut.fw500)}>Transform Output Quality Mode</label>
              <Cooltip width={250} icnSize={17} className={css(ut.ml2)}>
                <div className={css(ut.tipBody)}>
                  Should output quality be enforced, set the 'optional' to only apply when a transform is required due to other requirements (e.g. resize or crop)
                </div>
              </Cooltip>
            </div>
            <select className={css(FieldStyle.input, ut.fw500)} name="imageTransformOutputQualityMode" onChange={setErrorMsg}>
              <option value="">Select</option>
              <option value="resize">Resize</option>
              <option value="crop">Crop</option>
            </select>
          </div> */}
          <div className={css(ut.mt2, FieldStyle.labelTip)}>
            <div className={css(ut.dyb, ut.flxcb)}>
              <label className={css(ut.fw500, ut.ml1, ut.mt1)}>Client Transforms</label>
              <Cooltip width={250} icnSize={17} className={css(ut.ml2)}>
                <div className={css(ut.tipBody)}>
                  Client Transform
                </div>
              </Cooltip>
              <select className={css(FieldStyle.selectBox, ut.mr2, ut.fw500, ut.w3)} name="imageTransformClientTransforms" onChange={setErrorMsg}>
                <option value="">Select</option>
                <option value="resize">Resize</option>
                <option value="crop">Crop</option>
              </select>
            </div>

          </div>
        </div>
      </SimpleAccordion>
      <hr className={css(FieldStyle.divider)} />

      <SimpleAccordion
        title={__('Image validate size', 'bitform')}
        className={css(FieldStyle.fieldSection)}
        switching
        toggleAction={(e) => enablePlugin(e, 'allowImageValidateSize')}
        toggleChecked={fieldData?.config?.allowImageValidateSize}
        open={fieldData?.config?.allowImageValidateSize}
        disable={!fieldData?.config?.allowImageValidateSize}
        tip="Validate images when user upload image, customize configuration to set different validation on images."
        tipProps={{ width: 200, icnSize: 17 }}
      >
        <div className={css(ut.flxc, ut.mt2)}>
          <div className={css(ut.fw500, ut.w8)}>{__('Customized', 'bitform')}</div>

          <button
            type="button"
            aria-label="Image Validate Customization "
            className={css(ut.btn)}
            onClick={() => setImgValdiateMdl(true)}
            onKeyPress={() => setImgValdiateMdl(true)}
          >
            <EditIcn size={21} />
          </button>
          <ImageValidateoMdl
            title="Image Validate Customization "
            showMdl={imgValdiateMdl}
            setshowMdl={setImgValdiateMdl}
          />
        </div>
      </SimpleAccordion>

      <hr className={css(FieldStyle.divider)} />

      <SimpleAccordion
        title={__('Required', 'bitform')}
        // eslint-disable-next-line react/jsx-no-bind
        toggleAction={setRequired}
        toggleChecked={isRequired}
        className={css(FieldStyle.fieldSection, FieldStyle.hover_tip)}
        switching
        tip="By enabling this feature, user will see the error message when input is empty"
        tipProps={{ width: 200, icnSize: 17 }}
        open={isRequired}
        disable={!isRequired}
      >
        <ErrorMessageSettings
          type="req"
          title="Error Message"
          tipTitle="By enabling this feature, user will see the error message when input is empty"
        />
      </SimpleAccordion>
      {/* <SingleToggle title={__('Required', 'bitform')} action={setRequired} isChecked={isRequired} className={css(FieldStyle.fieldSection)} /> */}
      <hr className={css(FieldStyle.divider)} />

      <FieldHideSettings cls={css(FieldStyle.fieldSection, FieldStyle.singleOption)} />

      <hr className={css(FieldStyle.divider)} />

    </div>
  )
}

export default memo(AdvanceFileUpSettings)
