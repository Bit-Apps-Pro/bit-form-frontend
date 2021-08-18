import { useState } from "react"
import "./OptionMenu.css"
function OptionMenu() {

  const [active, setActive] = useState(false)
  const optionHandler = () => {
    if(active) {
      setActive(false)
    } else {
      setActive(true)
    }
  }
  return (
    <div className="ballon" onClick={optionHandler}>
      <button className={`btn ${active && ' btn-active'}`}>x</button>
      <div className={`drop-down ${active && ' drop-down-show'}`}>
        <div className="drop-down-title">Title</div>
        <div className="item">
          <span className="logo">
            <svg
              id="Layer_1"
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 30 30"
            >
              <path
                className="cls-1"
                d="M13.83,6.32H6.11a2.19,2.19,0,0,0-2.2,2.19v15.3A2.19,2.19,0,0,0,6.11,26H21.55a2.19,2.19,0,0,0,2.2-2.19V16.16"
              />
              <path
                className="cls-1"
                d="M22.1,4.68a2.35,2.35,0,0,1,3.31,0,2.31,2.31,0,0,1,0,3.28L14.93,18.35l-4.41,1.09,1.11-4.37Z"
              />
            </svg>
          </span>
          <span className="title">Edit</span>
        </div>
        <div className="item">
          <span className="logo">
            <svg
              id="Layer_1"
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 30 30"
            >
              <path
                className="cls-1"
                d="M13.83,6.32H6.11a2.19,2.19,0,0,0-2.2,2.19v15.3A2.19,2.19,0,0,0,6.11,26H21.55a2.19,2.19,0,0,0,2.2-2.19V16.16"
              />
              <path
                className="cls-1"
                d="M22.1,4.68a2.35,2.35,0,0,1,3.31,0,2.31,2.31,0,0,1,0,3.28L14.93,18.35l-4.41,1.09,1.11-4.37Z"
              />
            </svg>
          </span>
          <span className="title">Edit</span>
        </div>
        <div className="item">
          <span className="logo">
            <svg
              id="Layer_1"
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 30 30"
            >
              <path
                className="cls-1"
                d="M13.83,6.32H6.11a2.19,2.19,0,0,0-2.2,2.19v15.3A2.19,2.19,0,0,0,6.11,26H21.55a2.19,2.19,0,0,0,2.2-2.19V16.16"
              />
              <path
                className="cls-1"
                d="M22.1,4.68a2.35,2.35,0,0,1,3.31,0,2.31,2.31,0,0,1,0,3.28L14.93,18.35l-4.41,1.09,1.11-4.37Z"
              />
            </svg>
          </span>
          <span className="title">Edit</span>
        </div>
      </div>
    </div>
  )
}

export default OptionMenu
