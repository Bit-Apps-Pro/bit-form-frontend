import { useState } from 'react'

export default function WorkflowAccordion({ title }) {
  const [showAccordion, setShowAccordion] = useState(true)

  return (
    <div className="conditional-logic-accordion">
      <button type="button" className="accordion-title" onClick={() => setShowAccordion(prv => !prv)}>
        If
        <span>&#10148;</span>
      </button>
      {showAccordion && (
        <div className="accordion-content">
          <div className="logic-block">
            <ol className="process_diagram">
              <li>
                <div>Table Field</div>
              </li>
              <li>
                <div>equal</div>
              </li>
              <li>
                <div>value</div>
              </li>
            </ol>
          </div>
          <div className="operator-block">
            <select>
              <option value="AND">AND</option>
              <option value="OR">OR</option>
            </select>
          </div>
          <div className="logic-block">
            <ol className="process_diagram">
              <li>
                <div>number field</div>
              </li>
              <li>
                <div>between</div>
              </li>
              <li>
                <ul>
                  <li><div>min value</div></li>
                  <li><div>max value</div></li>
                </ul>
              </li>
            </ol>
          </div>
          <div className="operator-block">
            <select>
              <option value="AND">AND</option>
              <option value="OR">OR</option>
            </select>
          </div>
          <div className="logic-block">
            <ol className="process_diagram">
              <li>
                <div>repeater field</div>
              </li>
              <li>
                <div>sub field</div>
              </li>
              <li>
                <div>between</div>
              </li>
              <li>
                <ul>
                  <li><div>min value</div></li>
                  <li><div>max value</div></li>
                </ul>
              </li>
            </ol>
          </div>
          <div className="operator-block">
            <select>
              <option value="AND">AND</option>
              <option value="OR">OR</option>
            </select>
          </div>
          <div className="logic-block">
            <ol className="process_diagram">
              <li>
                <div>Table Field</div>
              </li>
              <li>
                <ul>
                  <li><div>Row Number</div></li>
                  <li><div>Column Field</div></li>
                </ul>
              </li>
              <li>
                <div>Between</div>
              </li>
              <li>
                <ul>
                  <li><div>Min Value</div></li>
                  <li><div>Max Value</div></li>
                </ul>
              </li>
            </ol>
          </div>
          <div className="operator-block">
            <select>
              <option value="AND">AND</option>
              <option value="OR">OR</option>
            </select>
          </div>
          <div className="logic-group">
            <div className="logic-block">
              <ol className="process_diagram">
                <li>
                  <div>Table Field</div>
                </li>
                <li>
                  <div>equal</div>
                </li>
                <li>
                  <div>value</div>
                </li>
              </ol>
            </div>
          </div>
        </div>
      )}
      {!showAccordion && (
        <div className="accordion-content">
          <button className="collapsed-accordion" onClick={toggleAccordion}>
            <span className="collapsed-circle" />
            <span className="collapsed-circle" />
            <span className="collapsed-circle" />
          </button>
        </div>
      )}
    </div>
  )
}
