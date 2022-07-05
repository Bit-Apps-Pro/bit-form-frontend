import { useFela } from 'react-fela'
import ut from '../../../styles/2.utilities'
import FieldStyle from '../../../styles/FieldStyle.style'
import { __ } from '../../../Utils/i18nwrap'
import Cooltip from '../../Utilities/Cooltip'

function FileStyle({ action, value }) {
  const { css } = useFela()
  return (
    <div className={css(ut.ml2, ut.mt2)}>
      <div className={css(ut.mt2, FieldStyle.labelTip)}>
        <div className={`${css(ut.dyb, ut.flxcb)}`}>
          <label
            htmlFor="panel"
            className={css(ut.fw500, ut.mr1)}
          >
            {__('Panel Layout')}
          </label>
          <Cooltip width={250} icnSize={17} className={css(ut.mt0)}>
            <div className={css(ut.tipBody)}>
              File Upload Panel Layout
            </div>
          </Cooltip>
          <select
            data-testid="fil-styl-pnl-lyot-slct"
            value={value?.stylePanelLayout}
            className={css(FieldStyle.selectBox, ut.mt0, ut.mr2, ut.w3)}
            name="stylePanelLayout"
            onChange={action}
          >
            <option value="">Select</option>
            <option value="integrated">Integrated</option>
            <option value="compact">Compact</option>
            <option value="circle">Circle</option>
          </select>
        </div>
      </div>
      <div className={css(ut.mt2, FieldStyle.labelTip)}>
        <div className={css(ut.dyb, ut.flxcb)}>
          <label
            htmlFor="remove_btn"
            className={css(ut.fw500, ut.mr1)}
          >
            {__('Remove Button')}
          </label>
          <Cooltip width={250} icnSize={17}>
            <div className={css(ut.tipBody)}>
              The position of the remove item button
            </div>
          </Cooltip>
          <select
            data-testid="fil-styl-rmv-btn-slct"
            value={value?.styleButtonRemoveItemPosition}
            className={css(FieldStyle.selectBox, ut.mt0, ut.mr2, ut.w3)}
            name="styleButtonRemoveItemPosition"
            onChange={action}
          >
            <option value="">Select</option>
            <option value="left">Left</option>
            <option value="right">Right</option>
            <option value="center">Center</option>
            <option value="bottom">Bottom</option>
          </select>
        </div>
      </div>
      <div className={css(ut.mt2, FieldStyle.labelTip)}>
        <div className={css(ut.dyb, ut.flxcb)}>
          <label
            htmlFor="process_btn"
            className={css(ut.fw500, ut.mr1)}
          >
            {__('Process Button')}

          </label>
          <Cooltip width={250} icnSize={17}>
            <div className={css(ut.tipBody)}>
              The position of the process item button
            </div>
          </Cooltip>
          <select
            data-testid="fil-styl-prcs-btn-slct"
            value={value?.styleButtonProcessItemPosition}
            className={css(FieldStyle.selectBox, ut.mt0, ut.mr2, ut.w3)}
            name="styleButtonProcessItemPosition"
            onChange={action}
          >
            <option value="">Select</option>
            <option value="left">Left</option>
            <option value="right">Right</option>
            <option value="center">Center</option>
            <option value="bottom">Bottom</option>
          </select>
        </div>
      </div>
      <div className={css(ut.mt2, FieldStyle.labelTip)}>
        <div className={css(ut.dyb, ut.flxcb)}>
          <label
            htmlFor="load_indicator"
            className={css(ut.fw500, ut.mr1)}
          >
            {__('Load Indicator')}

          </label>
          <Cooltip width={250} icnSize={17}>
            <div className={css(ut.tipBody)}>
              The position of the load indicator
            </div>
          </Cooltip>
          <select
            data-testid="fil-styl-lod-indctr-slct"
            value={value?.styleLoadIndicatorPosition}
            className={css(FieldStyle.selectBox, ut.mt0, ut.mr2, ut.w3)}
            name="styleLoadIndicatorPosition"
            onChange={action}
          >
            <option value="">Select</option>
            <option value="left">Left</option>
            <option value="right">Right</option>
            <option value="center">Center</option>
            <option value="bottom">Bottom</option>
          </select>
        </div>
      </div>
      <div className={css(ut.mt2, FieldStyle.labelTip)}>
        <div className={css(ut.dyb, ut.flxcb)}>
          <label
            htmlFor="process_indicator"
            className={css(ut.fw500, ut.mr2)}
          >
            {__('Progress Indicator')}

          </label>
          <Cooltip width={250} icnSize={17}>
            <div className={css(ut.tipBody)}>
              The position of the progress indicator
            </div>
          </Cooltip>
          <select
            data-testid="fil-styl-prgrs-indctr-slct"
            value={value?.styleProgressIndicatorPosition}
            className={css(FieldStyle.selectBox, ut.mt0, ut.mr2, ut.w3)}
            name="styleProgressIndicatorPosition"
            onChange={action}
          >
            <option value="">Select</option>
            <option value="left">Left</option>
            <option value="right">Right</option>
            <option value="center">Center</option>
            <option value="bottom">Bottom</option>
          </select>
        </div>
      </div>
    </div>
  )
}
export default FileStyle
