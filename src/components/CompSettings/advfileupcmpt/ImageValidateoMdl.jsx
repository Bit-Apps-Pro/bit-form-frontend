import { useFela } from 'react-fela'
import Scrollbars from 'react-custom-scrollbars-2'
import FileLblProperty from './FileLblProperty'
import Modal from '../../Utilities/Modal'
import ut from '../../../styles/2.utilities'

export default function ImageValidateoMdl({ showMdl, setshowMdl, title }) {
  const { css } = useFela()

  return (
    <Modal md show={showMdl} setModal={setshowMdl} title={title}>
      <Scrollbars
        autoHide
        style={{ height: 'calc(100% - 42px)' }}
      >
        <div className={css(ut.p2)}>
          <FileLblProperty coolTip="The minimum image width" inputType="number" title="Min Width" placeholder="1" type="imageValidateSizeMinWidth" />
          <FileLblProperty coolTip="The maximum image width" inputType="number" title="Max Width" max="65535" min="1" placeholder="65535" type="imageValidateSizeMaxWidth" />
          <FileLblProperty coolTip="The minimum image height" inputType="number" title="Min Height" placeholder="1" type="imageValidateSizeMinHeight" />
          <FileLblProperty coolTip="The maximum image height" inputType="number" title="Max Height" max="65535" min="1" placeholder="65535" type="imageValidateSizeMaxHeight" />
          <FileLblProperty coolTip="The message shown when the image is not supported by the browser." title="Label Format Error Message" placeholder="Image type not supported" type="imageValidateSizeLabelFormatError" />
          <FileLblProperty coolTip="The message shown when the image is too small" title="Too Small Error Message" placeholder="Image is too small" type="imageValidateSizeLabelImageSizeTooSmall" />
          <FileLblProperty coolTip="The message shown when the image is too big" title="Too Big Error Message" placeholder="Image is too big" type="imageValidateSizeLabelImageSizeTooBig" />
          <FileLblProperty coolTip="Message shown to indicate the minimum image size" title="Min Size Error Message" placeholder="Minimum size is {minWidth} × {minHeight}" type="imageValidateSizeLabelExpectedMinSize" />
          <FileLblProperty coolTip="Message shown to indicate the maximum image size" title="Max Size Error Message" placeholder="Maximum size is {maxWidth} × {maxHeight}" type="imageValidateSizeLabelExpectedMaxSize" />
          <FileLblProperty coolTip="The minimum image resolution" title="Min Size Resolution" placeholder="null" type="imageValidateSizeMinResolution" />
          <FileLblProperty coolTip="The maximum image resolution" title="Max Size Resolution" placeholder="null" type="imageValidateSizeMaxResolution" />
          <FileLblProperty coolTip="The message shown when the image resolution is too low" title="Resolution too low Error Message" placeholder="Resolution is too low" type="imageValidateSizeLabelImageResolutionTooLow" />
          <FileLblProperty coolTip="The message shown when the image resolution is too high" title="Resolution too high Error Message" placeholder="Resolution is too high" type="imageValidateSizeLabelImageResolutionTooHigh" />
          <FileLblProperty coolTip="Message shown to indicate the minimum image resolution" title="Min Resolution Error Message" placeholder="Minimum resolution is {minResolution}" type="imageValidateSizeLabelExpectedMinResolution" />
          <FileLblProperty coolTip="Message shown to indicate the maximum image resolution" title="Max Resolution Error Message" placeholder="Maximum resolution is {maxResolution}" type="imageValidateSizeLabelExpectedMaxResolution" />
        </div>

        <div>
          <button type="button" className={css(ut.mr2, ut.btn_primary)} onClick={() => setshowMdl(false)}>Close</button>
        </div>
      </Scrollbars>
    </Modal>
  )
}
