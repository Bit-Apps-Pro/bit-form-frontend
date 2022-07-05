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

  const filepondCSS = styled.div`
  .filepond--assistant {
    position: absolute;
    overflow: hidden;
    height: 1px;
    width: 1px;
    padding: 0;
    border: 0;
    clip: rect(1px, 1px, 1px, 1px);
    -webkit-clip-path: inset(50%);
    clip-path: inset(50%);
    white-space: nowrap;
}
/* Hard to override styles */
.filepond--browser.filepond--browser {
    /* is positioned absolute so it is focusable for form validation errors */
    position: absolute;
    margin: 0;
    padding: 0;

    /* is positioned ~behind drop label */
    left: 1em;
    top: 1.75em;
    width: calc(100% - 2em);

    /* hide visually */
    opacity: 0;
    font-size: 0; /* removes text cursor in Internet Explorer 11 */
}
.filepond--data {
    position: absolute;
    width: 0;
    height: 0;
    padding: 0;
    margin: 0;
    border: none;
    visibility: hidden;
    pointer-events: none;
    contain: strict;
}
.filepond--drip {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    opacity: 0.1;

    /* can't interact with this element */
    pointer-events: none;

    /* inherit border radius from parent (needed for drip-blob cut of) */
    border-radius: 0.5em;

    /* this seems to prevent Chrome from redrawing this layer constantly */
    background: rgba(0, 0, 0, 0.01);
}
.filepond--drip-blob {
    position: absolute;
    -webkit-transform-origin: center center;
    transform-origin: center center;
    top: 0;
    left: 0;
    width: 8em;
    height: 8em;
    margin-left: -4em;
    margin-top: -4em;
    background: #292625;
    border-radius: 50%;

    /* will be animated */
    will-change: transform, opacity;
}
.filepond--drop-label {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    margin: 0;
    color: #4f4f4f;

    /* center contents */
    display: flex;
    justify-content: center;
    align-items: center;

    /* fixes IE11 centering problems (is overruled by label min-height) */
    height: 0px;

    /* dont allow selection */
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    /* will be animated */
    will-change: transform, opacity;
}
/* Hard to override styles on purpose */
.filepond--drop-label.filepond--drop-label label {
    display: block;
    margin: 0;
    padding: 0.5em; /* use padding instead of margin so click area is not impacted */
}
.filepond--drop-label label {
    cursor: default;
    font-size: 0.875em;
    font-weight: normal;
    text-align: center;
    line-height: 1.5;
}
.filepond--label-action {
    text-decoration: underline;
    -webkit-text-decoration-skip: ink;
    text-decoration-skip-ink: auto;
    -webkit-text-decoration-color: #a7a4a4;
    text-decoration-color: #a7a4a4;
    cursor: pointer;
}
.filepond--root[data-disabled] .filepond--drop-label label {
    opacity: 0.5;
}
/* Hard to override styles */
.filepond--file-action-button.filepond--file-action-button {
    font-size: 1em;
    width: 1.625em;
    height: 1.625em;

    font-family: inherit;
    line-height: inherit;

    margin: 0;
    padding: 0;
    border: none;
    outline: none;

    will-change: transform, opacity;

    /* hidden label */
}
.filepond--file-action-button.filepond--file-action-button span {
    position: absolute;
    overflow: hidden;
    height: 1px;
    width: 1px;
    padding: 0;
    border: 0;
    clip: rect(1px, 1px, 1px, 1px);
    -webkit-clip-path: inset(50%);
    clip-path: inset(50%);
    white-space: nowrap;
}
.filepond--file-action-button.filepond--file-action-button {
    /* scale SVG to fill button */
}
.filepond--file-action-button.filepond--file-action-button svg {
    width: 100%;
    height: 100%;
}
.filepond--file-action-button.filepond--file-action-button {
    /* bigger touch area */
}
.filepond--file-action-button.filepond--file-action-button::after {
    position: absolute;
    left: -0.75em;
    right: -0.75em;
    top: -0.75em;
    bottom: -0.75em;
    content: '';
}
/* Soft styles */
.filepond--file-action-button {
    /* use default arrow cursor */
    cursor: auto;

    /* reset default button styles */
    color: #fff;

    /* set default look n feel */
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.5);
    background-image: none;

    /* we animate box shadow on focus */
    /* it's only slightly slower than animating */
    /* a pseudo-element with transforms and renders */
    /* a lot better on chrome */
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
    transition: box-shadow 0.25s ease-in;
}
.filepond--file-action-button:hover,
.filepond--file-action-button:focus {
    box-shadow: 0 0 0 0.125em rgba(255, 255, 255, 0.9);
}
.filepond--file-action-button[disabled] {
    color: rgba(255, 255, 255, 0.5);
    background-color: rgba(0, 0, 0, 0.25);
}
.filepond--file-action-button[hidden] {
    display: none;
}
/* edit button */
.filepond--action-edit-item.filepond--action-edit-item {
    width: 2em;
    height: 2em;
    padding: 0.1875em;
}
.filepond--action-edit-item.filepond--action-edit-item[data-align*='center'] {
    margin-left: -0.1875em;
}
.filepond--action-edit-item.filepond--action-edit-item[data-align*='bottom'] {
    margin-bottom: -0.1875em;
}
.filepond--action-edit-item-alt {
    border: none;
    line-height: inherit;
    background: transparent;
    font-family: inherit;
    color: inherit;
    outline: none;
    padding: 0;
    margin: 0 0 0 0.25em;
    pointer-events: all;
    position: absolute;
}
.filepond--action-edit-item-alt svg {
    width: 1.3125em;
    height: 1.3125em;
}
.filepond--action-edit-item-alt span {
    font-size: 0;
    opacity: 0;
}
.filepond--file-info {
    position: static;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    flex: 1;
    margin: 0 0.5em 0 0;
    min-width: 0;

    /* will be animated */
    will-change: transform, opacity;

    /* can't do anything with this info */
    pointer-events: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    /* no margins on children */
}
.filepond--file-info * {
    margin: 0;
}
.filepond--file-info {
    /* we don't want to have these overrules so these selectors are a bit more specific */
}
.filepond--file-info .filepond--file-info-main {
    font-size: 0.75em;
    line-height: 1.2;

    /* we want ellipsis if this bar gets too wide */
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    width: 100%;
}
.filepond--file-info .filepond--file-info-sub {
    font-size: 0.625em;
    opacity: 0.5;
    transition: opacity 0.25s ease-in-out;
    white-space: nowrap;
}
.filepond--file-info .filepond--file-info-sub:empty {
    display: none;
}
.filepond--file-status {
    position: static;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    flex-grow: 0;
    flex-shrink: 0;

    margin: 0;
    min-width: 2.25em;
    text-align: right;

    /* will be animated */
    will-change: transform, opacity;

    /* can't do anything with this info */
    pointer-events: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    /* no margins on children */
}
.filepond--file-status * {
    margin: 0;
    white-space: nowrap;
}
.filepond--file-status {
    /* font sizes */
}
.filepond--file-status .filepond--file-status-main {
    font-size: 0.75em;
    line-height: 1.2;
}
.filepond--file-status .filepond--file-status-sub {
    font-size: 0.625em;
    opacity: 0.5;
    transition: opacity 0.25s ease-in-out;
}
/* Hard to override styles */
.filepond--file-wrapper.filepond--file-wrapper {
    border: none;
    margin: 0;
    padding: 0;
    min-width: 0;
    height: 100%;

    /* hide legend for visual users */
}
.filepond--file-wrapper.filepond--file-wrapper > legend {
    position: absolute;
    overflow: hidden;
    height: 1px;
    width: 1px;
    padding: 0;
    border: 0;
    clip: rect(1px, 1px, 1px, 1px);
    -webkit-clip-path: inset(50%);
    clip-path: inset(50%);
    white-space: nowrap;
}
.filepond--file {
    position: static;
    display: flex;
    height: 100%;
    align-items: flex-start;

    padding: 0.5625em 0.5625em;

    color: #fff;
    border-radius: 0.5em;

    /* control positions */
}
.filepond--file .filepond--file-status {
    margin-left: auto;
    margin-right: 2.25em;
}
.filepond--file .filepond--processing-complete-indicator {
    pointer-events: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    z-index: 3;
}
.filepond--file .filepond--processing-complete-indicator,
.filepond--file .filepond--progress-indicator,
.filepond--file .filepond--file-action-button {
    position: absolute;
}
.filepond--file {
    /* .filepond--file-action-button */
}
.filepond--file [data-align*='left'] {
    left: 0.5625em;
}
.filepond--file [data-align*='right'] {
    right: 0.5625em;
}
.filepond--file [data-align*='center'] {
    left: calc(50% - 0.8125em); /* .8125 is half of button width */
}
.filepond--file [data-align*='bottom'] {
    bottom: 1.125em;
}
.filepond--file [data-align='center'] {
    top: calc(50% - 0.8125em);
}
.filepond--file .filepond--progress-indicator {
    margin-top: 0.1875em;
}
.filepond--file .filepond--progress-indicator[data-align*='right'] {
    margin-right: 0.1875em;
}
.filepond--file .filepond--progress-indicator[data-align*='left'] {
    margin-left: 0.1875em;
}
/* make sure text does not overlap */
[data-filepond-item-state='cancelled'] .filepond--file-info,
[data-filepond-item-state*='invalid'] .filepond--file-info,
[data-filepond-item-state*='error'] .filepond--file-info {
    margin-right: 2.25em;
}
[data-filepond-item-state~='processing'] .filepond--file-status-sub {
    opacity: 0;
}
[data-filepond-item-state~='processing']
    .filepond--action-abort-item-processing
    ~ .filepond--file-status
    .filepond--file-status-sub {
    opacity: 0.5;
}
[data-filepond-item-state='processing-error'] .filepond--file-status-sub {
    opacity: 0;
}
[data-filepond-item-state='processing-error']
    .filepond--action-retry-item-processing
    ~ .filepond--file-status
    .filepond--file-status-sub {
    opacity: 0.5;
}
[data-filepond-item-state='processing-complete'] {
    /* busy state */
}
[data-filepond-item-state='processing-complete'] .filepond--action-revert-item-processing svg {
    -webkit-animation: fall 0.5s 0.125s linear both;
    animation: fall 0.5s 0.125s linear both;
}
[data-filepond-item-state='processing-complete'] {
    /* hide details by default, only show when can revert */
}
[data-filepond-item-state='processing-complete'] .filepond--file-status-sub {
    opacity: 0.5;
}
[data-filepond-item-state='processing-complete']
    .filepond--processing-complete-indicator:not([style*='hidden'])
    ~ .filepond--file-status
    .filepond--file-status-sub {
    opacity: 0;
}
[data-filepond-item-state='processing-complete'] .filepond--file-info-sub {
    opacity: 0;
}
[data-filepond-item-state='processing-complete']
    .filepond--action-revert-item-processing
    ~ .filepond--file-info
    .filepond--file-info-sub {
    opacity: 0.5;
}
/* file state can be invalid or error, both are visually similar but */
/* having them as separate states might be useful */
[data-filepond-item-state*='invalid'] .filepond--panel,
[data-filepond-item-state*='invalid'] .filepond--file-wrapper,
[data-filepond-item-state*='error'] .filepond--panel,
[data-filepond-item-state*='error'] .filepond--file-wrapper {
    -webkit-animation: shake 0.65s linear both;
    animation: shake 0.65s linear both;
}
/* spins progress indicator when file is marked as busy */
[data-filepond-item-state*='busy'] .filepond--progress-indicator svg {
    -webkit-animation: spin 1s linear infinite;
    animation: spin 1s linear infinite;
}
/**
 * States
 */
@-webkit-keyframes spin {
    0% {
        -webkit-transform: rotateZ(0deg);
        transform: rotateZ(0deg);
    }

    100% {
        -webkit-transform: rotateZ(360deg);
        transform: rotateZ(360deg);
    }
}
@keyframes spin {
    0% {
        -webkit-transform: rotateZ(0deg);
        transform: rotateZ(0deg);
    }

    100% {
        -webkit-transform: rotateZ(360deg);
        transform: rotateZ(360deg);
    }
}
@-webkit-keyframes shake {
    10%,
    90% {
        -webkit-transform: translateX(-0.0625em);
        transform: translateX(-0.0625em);
    }

    20%,
    80% {
        -webkit-transform: translateX(0.125em);
        transform: translateX(0.125em);
    }

    30%,
    50%,
    70% {
        -webkit-transform: translateX(-0.25em);
        transform: translateX(-0.25em);
    }

    40%,
    60% {
        -webkit-transform: translateX(0.25em);
        transform: translateX(0.25em);
    }
}
@keyframes shake {
    10%,
    90% {
        -webkit-transform: translateX(-0.0625em);
        transform: translateX(-0.0625em);
    }

    20%,
    80% {
        -webkit-transform: translateX(0.125em);
        transform: translateX(0.125em);
    }

    30%,
    50%,
    70% {
        -webkit-transform: translateX(-0.25em);
        transform: translateX(-0.25em);
    }

    40%,
    60% {
        -webkit-transform: translateX(0.25em);
        transform: translateX(0.25em);
    }
}
@-webkit-keyframes fall {
    0% {
        opacity: 0;
        -webkit-transform: scale(0.5);
        transform: scale(0.5);
        -webkit-animation-timing-function: ease-out;
        animation-timing-function: ease-out;
    }

    70% {
        opacity: 1;
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
        -webkit-animation-timing-function: ease-in-out;
        animation-timing-function: ease-in-out;
    }

    100% {
        -webkit-transform: scale(1);
        transform: scale(1);
        -webkit-animation-timing-function: ease-out;
        animation-timing-function: ease-out;
    }
}
@keyframes fall {
    0% {
        opacity: 0;
        -webkit-transform: scale(0.5);
        transform: scale(0.5);
        -webkit-animation-timing-function: ease-out;
        animation-timing-function: ease-out;
    }

    70% {
        opacity: 1;
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
        -webkit-animation-timing-function: ease-in-out;
        animation-timing-function: ease-in-out;
    }

    100% {
        -webkit-transform: scale(1);
        transform: scale(1);
        -webkit-animation-timing-function: ease-out;
        animation-timing-function: ease-out;
    }
}
/* ignore all other interaction elements while dragging a file */
.filepond--hopper[data-hopper-state='drag-over'] > * {
    pointer-events: none;
}
/* capture all hit tests using a hidden layer, this speeds up the event flow */
.filepond--hopper[data-hopper-state='drag-over']::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
}
.filepond--progress-indicator {
    z-index: 103;
}
.filepond--file-action-button {
    z-index: 102;
}
.filepond--file-status {
    z-index: 101;
}
.filepond--file-info {
    z-index: 100;
}
.filepond--item {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;

    padding: 0;
    margin: 0.25em;

    will-change: transform, opacity;

    /* item children order */
}
.filepond--item > .filepond--panel {
    z-index: -1;
}
/* has a slight shadow */
.filepond--item > .filepond--panel .filepond--panel-bottom {
    box-shadow: 0 0.0625em 0.125em -0.0625em rgba(0, 0, 0, 0.25);
}
.filepond--item {
    /* drag related */
}
.filepond--item > .filepond--file-wrapper,
.filepond--item > .filepond--panel {
    transition: opacity 0.15s ease-out;
}
.filepond--item[data-drag-state] {
    cursor: -webkit-grab;
    cursor: grab;
}
.filepond--item[data-drag-state] > .filepond--panel {
    transition: box-shadow 0.125s ease-in-out;
    box-shadow: 0 0 0 rgba(0, 0, 0, 0);
}
.filepond--item[data-drag-state='drag'] {
    cursor: -webkit-grabbing;
    cursor: grabbing;
}
.filepond--item[data-drag-state='drag'] > .filepond--panel {
    box-shadow: 0 0.125em 0.3125em rgba(0, 0, 0, 0.325);
}
.filepond--item[data-drag-state]:not([data-drag-state='idle']) {
    z-index: 2;
}
/* states */
.filepond--item-panel {
    background-color: #64605e;
}
[data-filepond-item-state='processing-complete'] .filepond--item-panel {
    background-color: #369763;
}
[data-filepond-item-state*='invalid'] .filepond--item-panel,
[data-filepond-item-state*='error'] .filepond--item-panel {
    background-color: #c44e47;
}
/* style of item panel */
.filepond--item-panel {
    border-radius: 0.5em;
    transition: background-color 0.25s;
}
/* normal mode */
.filepond--list-scroller {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    margin: 0;
    will-change: transform;
}
/* scroll mode */
.filepond--list-scroller[data-state='overflow'] .filepond--list {
    bottom: 0;
    right: 0;
}
.filepond--list-scroller[data-state='overflow'] {
    overflow-y: scroll;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
    -webkit-mask: linear-gradient(to bottom, #000 calc(100% - 0.5em), transparent 100%);
    mask: linear-gradient(to bottom, #000 calc(100% - 0.5em), transparent 100%);
}
/* style scrollbar */
.filepond--list-scroller::-webkit-scrollbar {
    background: transparent;
}
.filepond--list-scroller::-webkit-scrollbar:vertical {
    width: 1em;
}
.filepond--list-scroller::-webkit-scrollbar:horizontal {
    height: 0;
}
.filepond--list-scroller::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 99999px;
    border: 0.3125em solid transparent;
    background-clip: content-box;
}
/* hard to overide styles on purpose */
.filepond--list.filepond--list {
    position: absolute;
    top: 0;
    margin: 0;
    padding: 0;
    list-style-type: none;

    /* prevents endless paint calls on filepond--list-scroller */
    will-change: transform;
}
/* used for padding so allowed to be restyled */
.filepond--list {
    left: 0.75em;
    right: 0.75em;
}
.filepond--root[data-style-panel-layout~='integrated'] {
    width: 100%;
    height: 100%;
    max-width: none;
    margin: 0;
}
.filepond--root[data-style-panel-layout~='circle'] .filepond--panel-root,
.filepond--root[data-style-panel-layout~='integrated'] .filepond--panel-root {
    border-radius: 0;
}
.filepond--root[data-style-panel-layout~='circle'] .filepond--panel-root > *,
.filepond--root[data-style-panel-layout~='integrated'] .filepond--panel-root > * {
    display: none;
}
.filepond--root[data-style-panel-layout~='circle'] .filepond--drop-label,
.filepond--root[data-style-panel-layout~='integrated'] .filepond--drop-label {
    bottom: 0;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 7;
}
.filepond--root[data-style-panel-layout~='circle'],
.filepond--root[data-style-panel-layout~='integrated'] {
    /* we're only loading one item, this makes the intro animation a bit nicer */
}
.filepond--root[data-style-panel-layout~='circle'] .filepond--item-panel,
.filepond--root[data-style-panel-layout~='integrated'] .filepond--item-panel {
    display: none;
}
.filepond--root[data-style-panel-layout~='compact'] .filepond--list-scroller,
.filepond--root[data-style-panel-layout~='integrated'] .filepond--list-scroller {
    overflow: hidden;
    height: 100%;
    margin-top: 0;
    margin-bottom: 0;
}
.filepond--root[data-style-panel-layout~='compact'] .filepond--list,
.filepond--root[data-style-panel-layout~='integrated'] .filepond--list {
    left: 0;
    right: 0;
    height: 100%;
}
.filepond--root[data-style-panel-layout~='compact'] .filepond--item,
.filepond--root[data-style-panel-layout~='integrated'] .filepond--item {
    margin: 0;
}
.filepond--root[data-style-panel-layout~='compact'] .filepond--file-wrapper,
.filepond--root[data-style-panel-layout~='integrated'] .filepond--file-wrapper {
    height: 100%;
}
.filepond--root[data-style-panel-layout~='compact'] .filepond--drop-label,
.filepond--root[data-style-panel-layout~='integrated'] .filepond--drop-label {
    z-index: 7;
}
.filepond--root[data-style-panel-layout~='circle'] {
    border-radius: 99999rem;
    overflow: hidden;
}
.filepond--root[data-style-panel-layout~='circle'] > .filepond--panel {
    border-radius: inherit;
}
.filepond--root[data-style-panel-layout~='circle'] > .filepond--panel > * {
    display: none;
}
.filepond--root[data-style-panel-layout~='circle'] {
    /* circle cuts of this info, so best to hide it */
}
.filepond--root[data-style-panel-layout~='circle'] .filepond--file-info {
    display: none;
}
.filepond--root[data-style-panel-layout~='circle'] .filepond--file-status {
    display: none;
}
.filepond--root[data-style-panel-layout~='circle'] .filepond--action-edit-item {
    opacity: 1 !important;
    visibility: visible !important;
}
/* dirfty way to fix circular overflow issue on safari 11+ */
@media not all and (min-resolution: 0.001dpcm) {
    @supports (-webkit-appearance: none) and (stroke-color: transparent) {
        .filepond--root[data-style-panel-layout~='circle'] {
            will-change: transform;
        }
    }
}
.filepond--panel-root {
    border-radius: 0.5em;
    background-color: #f1f0ef;
}
.filepond--panel {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    margin: 0;

    /* defaults to 100% height (fixed height mode) this fixes problem with panel height in IE11 */
    height: 100% !important;

    /* no interaction possible with panel */
    pointer-events: none;
}
.filepond-panel:not([data-scalable='false']) {
    height: auto !important;
}
.filepond--panel[data-scalable='false'] > div {
    display: none;
}
.filepond--panel[data-scalable='true'] {
    /* this seems to fix Chrome performance issues */
    /* - when box-shadow is enabled */
    /* - when multiple ponds are active on the same page */
    -webkit-transform-style: preserve-3d;
    transform-style: preserve-3d;

    /* prevent borders and backgrounds */
    background-color: transparent !important;
    border: none !important;
}
.filepond--panel-top,
.filepond--panel-bottom,
.filepond--panel-center {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    margin: 0;
    padding: 0;
}
.filepond--panel-top,
.filepond--panel-bottom {
    height: 0.5em;
}
.filepond--panel-top {
    border-bottom-left-radius: 0 !important;
    border-bottom-right-radius: 0 !important;
    border-bottom: none !important;

    /* fixes tiny transparant line between top and center panel */
}
.filepond--panel-top::after {
    content: '';
    position: absolute;
    height: 2px;
    left: 0;
    right: 0;
    bottom: -1px;
    background-color: inherit;
}
.filepond--panel-center,
.filepond--panel-bottom {
    will-change: transform;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -webkit-transform-origin: left top;
    transform-origin: left top;
    -webkit-transform: translate3d(0, 0.5em, 0);
    transform: translate3d(0, 0.5em, 0);
}
.filepond--panel-bottom {
    border-top-left-radius: 0 !important;
    border-top-right-radius: 0 !important;
    border-top: none !important;

    /* fixes tiny transparant line between bottom and center of panel */
}
.filepond--panel-bottom::before {
    content: '';
    position: absolute;
    height: 2px;
    left: 0;
    right: 0;
    top: -1px;
    background-color: inherit;
}
.filepond--panel-center {
    /* the center panel is scaled using scale3d to fit the correct height */
    /* we use 100px instead of 1px as scaling 1px to a huge height is really laggy on chrome */
    height: 100px !important;
    border-top: none !important;
    border-bottom: none !important;
    border-radius: 0 !important;

    /* hide if not transformed, prevents a little flash when the panel is at 100px height while attached for first time */
}
.filepond--panel-center:not([style]) {
    visibility: hidden;
}
.filepond--progress-indicator {
    position: static;
    width: 1.25em;
    height: 1.25em;

    color: #fff;

    /* can't have margins */
    margin: 0;

    /* no interaction possible with progress indicator */
    pointer-events: none;

    /* will be animated */
    will-change: transform, opacity;
}
.filepond--progress-indicator svg {
    width: 100%;
    height: 100%;
    vertical-align: top;
    transform-box: fill-box; /* should center the animation correctly when zoomed in */
}
.filepond--progress-indicator path {
    fill: none;
    stroke: currentColor;
}
.filepond--list-scroller {
    z-index: 6;
}
.filepond--drop-label {
    z-index: 5;
}
.filepond--drip {
    z-index: 3;
}
.filepond--root > .filepond--panel {
    z-index: 2;
}
.filepond--browser {
    z-index: 1;
}
.filepond--root {
    /* layout*/
    box-sizing: border-box;
    position: relative;
    margin-bottom: 1em;

    /* base font size for whole component */
    font-size: 1rem;

    /* base line height */
    line-height: normal;

    /* up uses default system font family */
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif,
        'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';

    /* will increase font weight a bit on Safari */
    font-weight: 450;

    /* default text alignment */
    text-align: left;

    /* better text rendering on Safari */
    text-rendering: optimizeLegibility;

    /* text direction is ltr for now */
    direction: ltr;

    /* optimize rendering */
    /* https://developer.mozilla.org/en-US/docs/Web/CSS/contain */
    contain: layout style size;

    /* correct box sizing, line-height and positioning on child elements */
}
.filepond--root * {
    box-sizing: inherit;
    line-height: inherit;
}
.filepond--root *:not(text) {
    font-size: inherit;
}
.filepond--root {
    /* block everything */
}
.filepond--root[data-disabled] {
    pointer-events: none;
}
.filepond--root[data-disabled] .filepond--list-scroller {
    pointer-events: all;
}
.filepond--root[data-disabled] .filepond--list {
    pointer-events: none;
}
/**
 * Root element children layout
 */
.filepond--root .filepond--drop-label {
    min-height: 4.75em;
}
.filepond--root .filepond--list-scroller {
    margin-top: 1em;
    margin-bottom: 1em;
}
.filepond--root .filepond--credits {
    position: absolute;
    right: 0;
    opacity: 0.175;
    line-height: 0.85;
    font-size: 11px;
    color: inherit;
    text-decoration: none;
    z-index: 3;
    bottom: -14px;
}
.filepond--root .filepond--credits[style] {
    top: 0;
    bottom: auto;
    margin-top: 14px;
}
  `
  const filepondPreviewCSS = styled.div`
  .filepond--image-preview-markup {
    position: absolute;
    left: 0;
    top: 0;
  }
  .filepond--image-preview-wrapper {
    z-index: 2;
  }
  .filepond--image-preview-overlay {
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    min-height: 5rem;
    max-height: 7rem;
    margin: 0;
    opacity: 0;
    z-index: 2;
    pointer-events: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .filepond--image-preview-overlay svg {
    width: 100%;
    height: auto;
    color: inherit;
    max-height: inherit;
  }
  .filepond--image-preview-overlay-idle {
    mix-blend-mode: multiply;
    color: rgba(40, 40, 40, 0.85);
  }
  .filepond--image-preview-overlay-success {
    mix-blend-mode: normal;
    color: rgba(54, 151, 99, 1);
  }
  .filepond--image-preview-overlay-failure {
    mix-blend-mode: normal;
    color: rgba(196, 78, 71, 1);
  }
  /* disable for Safari as mix-blend-mode causes the overflow:hidden of the parent container to not work */
  @supports (-webkit-marquee-repetition: infinite) and
    ((-o-object-fit: fill) or (object-fit: fill)) {
    .filepond--image-preview-overlay-idle {
      mix-blend-mode: normal;
    }
  }
  .filepond--image-preview-wrapper {
    /* no interaction */
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  
    /* have preview fill up all available space */
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 100%;
    margin: 0;
  
    /* radius is .05em less to prevent the panel background color from shining through */
    border-radius: 0.45em;
    overflow: hidden;
  
    /* this seems to prevent Chrome from redrawing this layer constantly */
    background: rgba(0, 0, 0, 0.01);
  }
  .filepond--image-preview {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
    display: flex; /* this aligns the graphic vertically if the panel is higher than the image */
    align-items: center;
    height: 100%;
    width: 100%;
    pointer-events: none;
    background: #222;
  
    /* will be animated */
    will-change: transform, opacity;
  }
  .filepond--image-clip {
    position: relative;
    overflow: hidden;
    margin: 0 auto;
  
    /* transparency indicator (currently only supports grid or basic color) */
  }
  .filepond--image-clip[data-transparency-indicator='grid'] img,
  .filepond--image-clip[data-transparency-indicator='grid'] canvas {
    background-color: #fff;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg' fill='%23eee'%3E%3Cpath d='M0 0 H50 V50 H0'/%3E%3Cpath d='M50 50 H100 V100 H50'/%3E%3C/svg%3E");
    background-size: 1.25em 1.25em;
  }
  .filepond--image-bitmap,
  .filepond--image-vector {
    position: absolute;
    left: 0;
    top: 0;
    will-change: transform;
  }
  .filepond--root[data-style-panel-layout~='integrated']
    .filepond--image-preview-wrapper {
    border-radius: 0;
  }
  .filepond--root[data-style-panel-layout~='integrated']
    .filepond--image-preview {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .filepond--root[data-style-panel-layout~='circle']
    .filepond--image-preview-wrapper {
    border-radius: 99999rem;
  }
  .filepond--root[data-style-panel-layout~='circle']
    .filepond--image-preview-overlay {
    top: auto;
    bottom: 0;
    -webkit-transform: scaleY(-1);
    transform: scaleY(-1);
  }
  .filepond--root[data-style-panel-layout~='circle']
    .filepond--file
    .filepond--file-action-button[data-align*='bottom']:not([data-align*='center']) {
    margin-bottom: 0.325em;
  }
  .filepond--root[data-style-panel-layout~='circle']
    .filepond--file
    [data-align*='left'] {
    left: calc(50% - 3em);
  }
  .filepond--root[data-style-panel-layout~='circle']
    .filepond--file
    [data-align*='right'] {
    right: calc(50% - 3em);
  }
  .filepond--root[data-style-panel-layout~='circle']
    .filepond--progress-indicator[data-align*='bottom'][data-align*='left'],
  .filepond--root[data-style-panel-layout~='circle']
    .filepond--progress-indicator[data-align*='bottom'][data-align*='right'] {
    margin-bottom: calc(0.325em + 0.1875em);
  }
  .filepond--root[data-style-panel-layout~='circle']
    .filepond--progress-indicator[data-align*='bottom'][data-align*='center'] {
    margin-top: 0;
    margin-bottom: 0.1875em;
    margin-left: 0.1875em;
  }
  `

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
  transition-property: transform, visibility, opacity;
  font-family: "Outfit", sans-serif !important;
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
    --g-41: #00faa7;
    --white-base: 0;
    --white-100: hsla(var(--white-base), 0%, 100%, 100%);
    --white-0-0-12: hsla(var(--white-base), 0%, 0%, 12%);
    --white-0-93: hsla(var(--white-base), 0%, 93%, 100%);
    --black-0: hsla(var(--white-base), 0%, 0%, 100%);
    --red-83-54: hsla(var(--white-base), 83%, 54%, 100%);
    --red-100-49: hsla(var(--white-base), 100%, 49%, 100%);
}
 
 body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: sans-serif;
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

 .blk:hover:not(.itm-focus) {
    z-index: 999;
 }
 
 .blk:focus .blk-icn-wrp,.blk:hover .blk-icn-wrp,.itm-focus .blk-icn-wrp {
    visibility: visible;
 }

 .blk:focus .blk-icn-wrp,.itm-focus .blk-icn-wrp {
  top: -30px;
  right: -3px;
 }

 .blk:not(.itm-focus):hover:not(:focus) .blk-icn-wrp {
  top: -30px;
  right: 0px;
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
    background: var(--red-100-49);
    color: var(--white-100);
    border: 1px solid var(--crimson);
    text-shadow: 0 .5px 1px #101010b5
 }
 
 .red-btn:hover {
    background: var(--red-83-54)
 }

 .resize-txt {
   position: absolute;
   top: -25px;
   font-size: 12px;
   padding: 3px 6px;
   background-color: #a5a5afbd;
   border-radius: 10px;
   z-index: 1;
 }
 
 .blk-icn-wrp {
    background-color: hsl(215deg 100% 50%);
    color: white;
    right: 0;
    top: -30px;
    visibility: hidden;
    border-top-left-radius: 7px;
    border-top-right-radius: 7px;
 }
 
 .blk-wrp-btn {
    background: 0 0;
    color: var(--dp-blue);
    cursor: pointer!important;
    outline: 0;
    width: 30px;
    height: 30px;
    border-radius: 7px;
    border: 0;
    transform: scale(0);
    transition: transform 300ms
 }
 
 .blk-wrp-btn:hover {
    background: hsl(215deg 100% 50%);
 }
 
 .blk-wrp-btn:focus-visible {
    box-shadow: 0 0 0 2px var(--b-50) inset
 }
 
 .drag:not(.no-drg) {
    cursor: grab
 }
 
 .drag:hover:not(.blk-wrp-btn) {
    background: aliceblue;
 }
 
 .drag:active {
    cursor: grabbing
 }
 
 .no-drg {
    cursor: default
 }
 
 .react-grid-layout {
    position: relative;
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
 .context-menu {
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    position: relative;
    background-color: var(--white-100);
    z-index: 9999999;
 }
 .context-list {
    margin: 0px;
    display: block;
    width: 100%;
    list-style: none;
    padding-left: 0;
  }
  .context-item {
    position: relative;
    margin-bottom: 0px;
    width: 100%;
  }
  .context-btn {
    font-family: "Outfit", sans-serif;
    border: 0px;
    padding: 6px 6px;
    padding-right: 36px;
    width: 100%;
    border-radius: 8px;
    font-weight: 500;
    display: flex;
    align-items: center;
    position: relative;
    background-color: var(--white-100);
    cursor: pointer;
  }
  .context-btn:hover {
    background-color: var(--white-0-93);
  }
  .context-btn:hover svg {
    filter: drop-shadow(1px 1px 0.5px #b3b3b3);
  }
  .context-btn:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px var(--b-50) inset
  }
  .context-btn svg {
    flex-shrink: 0;
    width: 20px;
    height: 20px;
    margin-right: 10px;
    stroke: var(--black-0);
  }
  .context-btn svg:nth-of-type(2) {
    margin-right: 0;
    position: absolute;
    right: 8;
  }
  .context-btn-color { 
    color: var(--b-50)
  }
  .delete:hover { 
    color: var(--red-100-49) !important;
  }
  .delete:hover svg {
    stroke: var(--red-100-49) !important;
  }
  .right-click-context-menu{
    border:1px solid #d0d0d0;
    padding: 5px;
    box-shadow: 0px 47px 58px rgba(0, 0, 0, 0.07), 0px 19.6355px 25.6741px rgba(0, 0, 0, 0.0503198), 0px 10.4981px 17.9875px rgba(0, 0, 0, 0.0417275), 0px 5.88513px 13.1341px rgba(0, 0, 0, 0.035), 0px 3.12555px 8.79534px rgba(0, 0, 0, 0.0282725), 0px 1.30061px 4.46737px rgba(0, 0, 0, 0.0196802);
}
  `

  const utils = styled.div`
  .pos-rel { position: relative}
   .g-c {
      display: -ms-grid;
      display: grid;
      place-content: center;
   }
   .f-rob {font-family: "Roboto",sans-serif}
    .f-mon {font-family:"Outfit", sans-serif !important; } 
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
   .svg-icn {
    fill: none;
    stroke: currentColor;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
  .highlight-margin {
    background-color: rgb(255, 200, 98);
    opacity: 0.3;
    position: absolute;
    overflow: hidden;
    z-index: 999999;
  }
  .highlight-padding {
    overflow: hidden;
    background-color: rgb(86, 111, 255);
  }
  .highlight-element {
    overflow: hidden;
    background: rgb(255, 255, 103);
  }
  .layout-wrapper{
    background-size: 13px 13px;
    background-image: radial-gradient(#458ff7 0.5px, #fff 0.5px);
    background-size: 10px 10px;
    font-family: var(--g-font-family)
  /* background-color: var(--white-100); */
}


`

  return (
    <style>
      {gridLayoutStyle}
      {filepondCSS}
      {filepondPreviewCSS}
      {tippyCss}
      {tippyCss}
      {tippyTheme}
      {tippyShiftAway}
      {tippySvg}
      {utils}
    </style>
  )
}
