import { useState } from 'react'
import { __ } from '../../../Utils/i18nwrap'
import Modal from '../../Utilities/Modal'
import ut from '../../../styles/2.utilities'
import { useFela } from 'react-fela'
import FileLblProperty from './FileLblProperty'
import Scrollbars from 'react-custom-scrollbars-2'
export default function FileLblPropertyMdl({ showMdl, setshowMdl, title }) {
  const { css } = useFela()
  const [isScroll, setIsScroll] = useState(false)
  const cancelModal = () => {
    setshowMdl(false)
  }

  const onScrollHandler = (e) => {
    const { scrollTop } = e.target
    if (scrollTop > 50) setIsScroll(true)
    else setIsScroll(false)
  }

  return (
    <>
      <Modal md show={showMdl} setModal={setshowMdl} title={title}>
        <Scrollbars
          onScroll={onScrollHandler}
          autoHide
          style={{ height: 'calc(100% - 42px)' }}
        >
          <div className={css(ut.p2)}>
            <FileLblProperty
              title="Placeholder"
              placeholder="Drag & Drop your files or Browse"
              type="labelIdle"
              coolTip="Default label shown to indicate this is a drop area"
            />
            <FileLblProperty
              title="File Loading"
              placeholder="Loading"
              type="labelFileLoading"
              coolTip="Label used while loading a file"
            />
            <FileLblProperty
              title="Invalid Field"
              placeholder="Field contains invalid files"
              type="labelInvalidField"
              coolTip="Label shown when the field contains invalid files and is validated by the parent form"
            />
            <FileLblProperty
              title="File Waiting For Size"
              placeholder="Waiting for size"
              type="labelFileWaitingForSize"
              coolTip="Label used while waiting for file size information"
            />
            <FileLblProperty
              title="FileSize Not Available"
              placeholder="Size not available"
              type="labelFileSizeNotAvailable"
              coolTip="Label used when no file size information was received"
            />
            <FileLblProperty
              title="File Load Error"
              placeholder="Error during load"
              type="labelFileLoadError"
              coolTip="Label used when file load failed"
            />
            <FileLblProperty
              title="File Processing"
              placeholder="Uploading"
              type="labelFileProcessing"
              coolTip="Label used when uploading a file"
            />
            <FileLblProperty
              title="File Processing Complete"
              placeholder="Upload complete"
              type="labelFileProcessingComplete"
              coolTip="Label used when file upload has completed"
            />
            <FileLblProperty
              title="File Processing Aborted"
              placeholder="Upload cancelled"
              type="labelFileProcessingAborted"
              coolTip="Label used when upload was cancelled"
            />
            <FileLblProperty
              title="File Processing Error"
              placeholder="Error during upload"
              type="labelFileProcessingError"
              coolTip="Label used when something went wrong during file upload"
            />
            <FileLblProperty
              title="File Processing Revert Error"
              placeholder="Error during revert"
              type="labelFileProcessingRevertError"
              coolTip="Label used when something went wrong during reverting the file upload"
            />
            <FileLblProperty
              title="File Remove Error"
              placeholder="Error during remove"
              type="labelFileRemoveError"
              coolTip="Label used to indicate something went wrong when removing the file"
            />
            <FileLblProperty
              title="Tap To Cancel"
              placeholder="tap to cancel"
              type="labelTapToCancel"
              coolTip="Label used to indicate to the user that an action can be cancelled."
            />
            <FileLblProperty
              title="Tap To Retry"
              placeholder="tap to retry"
              type="labelTapToRetry"
              coolTip="Label used to indicate to the user that an action can be retried."
            />
            <FileLblProperty
              title="Tap To Undo"
              placeholder="tap to undo"
              type="labelTapToUndo"
              coolTip="Label used to indicate to the user that an action can be undone."
            />
            <FileLblProperty
              title="Button Remove Item"
              placeholder="Remove"
              type="labelButtonRemoveItem"
              coolTip="Label used for remove button"
            />
            <FileLblProperty
              title="Button Abort Item Load"
              placeholder="Abort"
              type="labelButtonAbortItemLoad"
              coolTip="Label used for abort load button"
            />
            <FileLblProperty
              title="Button Retry Item Load"
              placeholder="Retry"
              type="labelButtonRetryItemLoad"
              coolTip="Label used for retry load button"
            />
            <FileLblProperty
              title="Button Abort Item Processing"
              placeholder="Cancel"
              type="labelButtonAbortItemProcessing"
              coolTip="Label used for abort upload button"
            />
            <FileLblProperty
              title="Button Undo Item Processing"
              placeholder="Undo"
              type="labelButtonUndoItemProcessing"
              coolTip="Label used for undo upload button"
            />
            <FileLblProperty
              title="Button Retry Item Processing"
              placeholder="Retry"
              type="labelButtonRetryItemProcessing"
              coolTip="Label used for retry upload button"
            />
            <FileLblProperty
              title="Button Process Item"
              placeholder="Upload"
              type="labelButtonProcessItem"
              coolTip="Label used for upload button"
            />
          </div>

          <div className="">
            <button type="button" className={css(ut.mr2, ut.btn_primary)} onClick={cancelModal}>Cancel</button>
            <button type="button" className={css(ut.mr2, ut.btn_primary)} onClick={() => setshowMdl(false)}>Save</button>
          </div>
        </Scrollbars>
      </Modal>
    </>
  )
}
