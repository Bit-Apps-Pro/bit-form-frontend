import { useEffect } from 'react'
import { select } from '../Utils/globalHelpers'

export default function RenderCssInPortal() {
  const styled = { div([str]) { return str } }

  useEffect(() => {
    document
      .getElementById('bit-grid-layout')
      ?.contentWindow
      ?.document
      .head
      .appendChild(
        document.importNode(select('#bf-font'))
        || document.createElement('div'),
      )
  }, [])

  const tippyCss = styled.div`
.tippy-box[data-animation=fade][data-state=hidden]{opacity:0}[data-tippy-root] {
  max-width: calc(100vw - 10px)
}

.tippy-box {
  position: relative;
  background-color: #333;
  color: #fff;
  border-radius: 4px;
  font-size: 14px;
  line-height: 1.4;
  white-space: normal;
  outline: 0;
  transition-property: transform, visibility, opacity
}

.tippy-box[data-placement^=top]>.tippy-arrow {
  bottom: 0
}

.tippy-box[data-placement^=top]>.tippy-arrow:before {
  bottom: -7px;
  left: 0;
  border-width: 8px 8px 0;
  border-top-color: initial;
  transform-origin: center top
}

.tippy-box[data-placement^=bottom]>.tippy-arrow {
  top: 0
}

.tippy-box[data-placement^=bottom]>.tippy-arrow:before {
  top: -7px;
  left: 0;
  border-width: 0 8px 8px;
  border-bottom-color: initial;
  transform-origin: center bottom
}

.tippy-box[data-placement^=left]>.tippy-arrow {
  right: 0
}

.tippy-box[data-placement^=left]>.tippy-arrow:before {
  border-width: 8px 0 8px 8px;
  border-left-color: initial;
  right: -7px;
  transform-origin: center left
}

.tippy-box[data-placement^=right]>.tippy-arrow {
  left: 0
}

.tippy-box[data-placement^=right]>.tippy-arrow:before {
  left: -7px;
  border-width: 8px 8px 8px 0;
  border-right-color: initial;
  transform-origin: center right
}

.tippy-box[data-inertia][data-state=visible] {
  transition-timing-function: cubic-bezier(.54, 1.5, .38, 1.11)
}

.tippy-arrow {
  width: 16px;
  height: 16px;
  color: #333
}

.tippy-arrow:before {
  content: "";
  position: absolute;
  border-color: transparent;
  border-style: solid
}

.tippy-content {
  position: relative;
  padding: 5px 9px;
  z-index: 1
}
`

  const tippyShiftAway = styled.div`
.tippy-box[data-animation=shift-away-extreme][data-state=hidden] {
  opacity: 0
}

.tippy-box[data-animation=shift-away-extreme][data-state=hidden][data-placement^=top] {
  transform: translateY(20px)
}

.tippy-box[data-animation=shift-away-extreme][data-state=hidden][data-placement^=bottom] {
  transform: translateY(-20px)
}

.tippy-box[data-animation=shift-away-extreme][data-state=hidden][data-placement^=left] {
  transform: translateX(20px)
}

.tippy-box[data-animation=shift-away-extreme][data-state=hidden][data-placement^=right] {
  transform: translateX(-20px)
}
`

  const tippyTheme = styled.div`
.tippy-box[data-theme~=light-border] {
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid rgba(0,
      8,
      16,
      .15);
  color: #333;
  box-shadow: 0 4px 14px -2px rgba(0, 8, 16, .08)
}

.tippy-box[data-theme~=light-border]>.tippy-backdrop {
  background-color: #fff
}

.tippy-box[data-theme~=light-border]>.tippy-arrow:after,
.tippy-box[data-theme~=light-border]>.tippy-svg-arrow:after {
  content: "";
  position: absolute;
  z-index: -1
}

.tippy-box[data-theme~=light-border]>.tippy-arrow:after {
  border-color: transparent;
  border-style: solid
}

.tippy-box[data-theme~=light-border][data-placement^=top]>.tippy-arrow:before {
  border-top-color: #fff
}

.tippy-box[data-theme~=light-border][data-placement^=top]>.tippy-arrow:after {
  border-top-color: rgba(0, 8, 16, .2);
  border-width: 7px 7px 0;
  top: 17px;
  left: 1px
}

.tippy-box[data-theme~=light-border][data-placement^=top]>.tippy-svg-arrow>svg {
  top: 16px
}

.tippy-box[data-theme~=light-border][data-placement^=top]>.tippy-svg-arrow:after {
  top: 17px
}

.tippy-box[data-theme~=light-border][data-placement^=bottom]>.tippy-arrow:before {
  border-bottom-color: #fff;
  bottom: 16px
}

.tippy-box[data-theme~=light-border][data-placement^=bottom]>.tippy-arrow:after {
  border-bottom-color: rgba(0, 8, 16, .2);
  border-width: 0 7px 7px;
  bottom: 17px;
  left: 1px
}

.tippy-box[data-theme~=light-border][data-placement^=bottom]>.tippy-svg-arrow>svg {
  bottom: 16px
}

.tippy-box[data-theme~=light-border][data-placement^=bottom]>.tippy-svg-arrow:after {
  bottom: 17px
}

.tippy-box[data-theme~=light-border][data-placement^=left]>.tippy-arrow:before {
  border-left-color: #fff
}

.tippy-box[data-theme~=light-border][data-placement^=left]>.tippy-arrow:after {
  border-left-color: rgba(0, 8, 16, .2);
  border-width: 7px 0 7px 7px;
  left: 17px;
  top: 1px
}

.tippy-box[data-theme~=light-border][data-placement^=left]>.tippy-svg-arrow>svg {
  left: 11px
}

.tippy-box[data-theme~=light-border][data-placement^=left]>.tippy-svg-arrow:after {
  left: 12px
}

.tippy-box[data-theme~=light-border][data-placement^=right]>.tippy-arrow:before {
  border-right-color: #fff;
  right: 16px
}

.tippy-box[data-theme~=light-border][data-placement^=right]>.tippy-arrow:after {
  border-width: 7px 7px 7px 0;
  right: 17px;
  top: 1px;
  border-right-color: rgba(0, 8, 16, .2)
}

.tippy-box[data-theme~=light-border][data-placement^=right]>.tippy-svg-arrow>svg {
  right: 11px
}

.tippy-box[data-theme~=light-border][data-placement^=right]>.tippy-svg-arrow:after {
  right: 12px
}

.tippy-box[data-theme~=light-border]>.tippy-svg-arrow {
  fill: #fff
}

.tippy-box[data-theme~=light-border]>.tippy-svg-arrow:after {
  background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMCA2czEuNzk2LS4wMTMgNC42Ny0zLjYxNUM1Ljg1MS45IDYuOTMuMDA2IDggMGMxLjA3LS4wMDYgMi4xNDguODg3IDMuMzQzIDIuMzg1QzE0LjIzMyA2LjAwNSAxNiA2IDE2IDZIMHoiIGZpbGw9InJnYmEoMCwgOCwgMTYsIDAuMikiLz48L3N2Zz4=);
  background-size: 16px 6px;
  width: 16px;
  height: 6px
}
`

  const tippySvg = styled.div`
arrow:after,
.tippy-box[data-placement^=top]>.tippy-svg-arrow>svg {
  top: 16px;
  transform: rotate(180deg)
}

.tippy-box[data-placement^=bottom]>.tippy-svg-arrow {
  top: 0
}

.tippy-box[data-placement^=bottom]>.tippy-svg-arrow>svg {
  bottom: 16px
}

.tippy-box[data-placement^=left]>.tippy-svg-arrow {
  right: 0
}

.tippy-box[data-placement^=left]>.tippy-svg-arrow:after,
.tippy-box[data-placement^=left]>.tippy-svg-arrow>svg {
  transform: rotate(90deg);
  top: calc(50% - 3px);
  left: 11px
}

.tippy-box[data-placement^=right]>.tippy-svg-arrow {
  left: 0
}

.tippy-box[data-placement^=right]>.tippy-svg-arrow:after,
.tippy-box[data-placement^=right]>.tippy-svg-arrow>svg {
  transform: rotate(-90deg);
  top: calc(50% - 3px);
  right: 11px
}

.tippy-svg-arrow {
  width: 16px;
  height: 16px;
  fill: #333;
  text-align: initial
}

.tippy-svg-arrow,
.tippy-svg-arrow>svg {
  position: absolute
}
`

  const gridLayoutStyle = styled.div`
:root {
    --b-50: #006aff;
    --g-41: #00faa7
}
 
 body {
    margin: 0;
    padding: 0;
    box-sizing: border-box
 }
 body *{
    box-sizing: border-box !important;
 }
 
 .custom-conf-mdl {
  display: block !important;
  text-align: left;
}

.tippy-box[data-theme~=light-border] {
  box-shadow: 0 3px 6px -1px #00000026, 0 4px 35px -12px rgb(0 8 16 / 32%) !important;
}

.tippy-box {
  border-radius: .8em !important;
}

.tippy-backdrop {
  background: var(--dp-blue-bg) !important;
}
 .isDragging {
    box-shadow: inset 0 0 4px 1px var(--b-50)
 }
 
 .layout-wrapper {
    /* margin: 3px auto auto; */
    /* height: calc(100% - 10px) */
 }
 
 .layout {
    overflow: visible;
    min-height: 100px!important
 }
 
 
 .itm-focus {
    outline: 3px solid var(--b-50);
    z-index: 9
 }
 
 .blk:focus:not(.itm-focus) {
    z-index: 9;
    outline: 3px solid var(--g-41)
 }
 
 .blk:focus .blk-icn-wrp,.blk:hover .blk-icn-wrp,.itm-focus .blk-icn-wrp {
    visibility: visible;
    z-index: 1
 }
 
 .blk:focus .blk-icn-wrp button,.blk:focus .react-resizable-handle,.blk:hover .blk-icn-wrp button,.blk:hover .react-resizable-handle,.itm-focus .blk-icn-wrp button,.itm-focus .react-resizable-handle {
    transform: scale(1)
 }
 
 .tip-btn {
    border: 0;
    padding: 6px 15px;
    font-weight: 500;
    border-radius: 12px;
    cursor: pointer;
    background: var(--white-0-93);
    border: 1px solid var(--white-0-86)
 }
 
 .tip-btn:hover {
    background: var(--white-0-0-12)
 }
 
 .red-btn {
    background: var(--red-100-61);
    color: var(--white-100);
    border: 1px solid var(--crimson);
    text-shadow: 0 .5px 1px #101010b5
 }
 
 .red-btn:hover {
    background: var(--red-83-54)
 }
 
 
 .blk-icn-wrp {
    background: var(--white-100-a-658);
    right: 0;
    visibility: hidden
 }
 
 .blk-wrp-btn {
    background: 0 0;
    color: var(--dp-blue);
    cursor: pointer!important;
    outline: 0;
    width: 30px;
    height: 30px;
    border-radius: 3px;
    border: 0;
    transform: scale(0);
    transition: transform 300ms
 }
 
 .blk-wrp-btn:hover {
    background: var(--white-0-95);
    color: var(--black-0)
 }
 
 .blk-wrp-btn:focus-visible {
    box-shadow: 0 0 0 2px var(--b-50) inset
 }
 
 .drag:not(.no-drg) {
    cursor: grab
 }
 
 .drag:hover {
    background: rgba(0,114,255,.12156862745098039)
 }
 
 .drag:active {
    cursor: grabbing
 }
 
 .no-drg {
    cursor: default
 }
 
 .react-grid-layout {
    position: relative;
    transition: height 200ms ease
 }
 
 .react-grid-item {
    transition: all 200ms ease;
    transition-property: left,top
 }
 
 .react-grid-item.cssTransforms {
    transition-property: transform
 }
 
 .react-grid-item.resizing {
    z-index: 1;
    will-change: width,height
 }
 
 .react-grid-item.react-draggable-dragging {
    background: #fff;
    transition: none;
    z-index: 3;
    will-change: transform
 }
 
 .react-grid-item.dropping {
    visibility: hidden
 }
 
 .react-grid-item.react-grid-placeholder {
    background: rgba(160,205,255,.2);
    transition-duration: 100ms;
    border: 2px dashed #0059ff;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -o-user-select: none;
    user-select: none
 }
 
 .react-grid-item>.react-resizable-handle {
    position: absolute;
    right: 0;
    bottom: 0;
    transform: scale(0)
 }
 
 .react-grid-item>.react-resizable-handle::after {
    position: absolute;
    right: 3px;
    bottom: 3px;
    content: "";
    width: 5px;
    height: 5px
 }
 
 .react-resizable-hide>.react-resizable-handle {
    display: none
 }
 
 .react-resizable {
    position: relative
 }
 
 .react-resizable-handle {
    position: absolute;
    background-repeat: no-repeat;
    background-origin: content-box;
    box-sizing: border-box;
    background-position: bottom right;
    padding: 0 1px 1px 0
 }
 
 .react-resizable-handle-se {
    right: 0;
    bottom: 0;
    width: 20px;
    height: 20px;
    cursor: se-resize;
    transform: rotate(90deg);
    background-image: url('data:image/svg+xml;utf8,<svg width="10" height="10" viewbox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 9L9 1" class="s" /><path d="M7 9L9 7" class="s"/><style>.s{stroke:black;stroke-width:1.5;stroke-linecap:round;}</style></svg>')
 }
 
 .react-resizable-handle-e {
    top: 43%;
    width: 15px;
    height: 25px;
    margin-top: -10px;
    cursor: ew-resize;
    background-image: url('data:image/svg+xml;utf8,<svg width="7" height="18" viewBox="0 0 29 72" fill="none" xmlns="http://www.w3.org/2000/svg"><style>.r{fill: black;width: 12px;height: 12px;rx: 10px;}</style><rect x="10" y="1" class="r" /><rect x="10" y="31" class="r" /><rect x="10" y="61" class="r" /></svg>')
 }
  `

  const utils = styled.div`
   .g-c {
      display: -ms-grid;
      display: grid;
      place-content: center;
   }
   .f-rob {font-family: "Roboto",sans-serif}
   /* .f-head {font-family: } */
   .wdt-200 {width: 200px !important;}
   .curp{cursor:pointer}
   .us-n {
      -webkit--ms-user-select: none;
      -webkit-user-select: none;
      -khtml--ms-user-select: none;
      -moz--ms-user-select: none;
      -o--ms-user-select: none;
      -ms-user-select: none;
      user-select: none;
   }
   .pos-abs{position:absolute;}

   .flx {display: flex }
   .flx-c {justify-content: center}
   
   .mt-1 {margin-top: 5px}
   .mr-2 {margin-right: 10px}
   .mb-2 {margin-bottom: 10px}

   .f-12{font-size:12px;}
`

  return (
    <style>
      {gridLayoutStyle}
      {tippyCss}
      {tippyTheme}
      {tippyShiftAway}
      {tippySvg}
      {utils}
    </style>
  )
}
