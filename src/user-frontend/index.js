/* eslint-disable no-undef */
import 'react-app-polyfill/ie11'
import 'react-app-polyfill/stable'
import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from '../serviceWorker'
import Bitapps from './Bitapps'

const contentId = process.env.NODE_ENV === 'production' ? bitAppFront.contentID : 'btcd-app'
const data  = process.env.NODE_ENV === 'production' ? bitAppFront.fields : {"b-0":{"typ":"text","lbl":"Test","ph":"Placeholder Text...","valid":{}},"b-1":{"typ":"textarea","lbl":"Message","ph":"Placeholder Text...","valid":{}},"b-3":{"typ":"email","lbl":"Email Field","ph":"example@mail.com","valid":{}},"b-4":{"typ":"check","lbl":"Select A Opt","opt":[{"lbl":"option 1"},{"lbl":"option 2"},{"lbl":"option 3"}],"valid":{}},"b-5":{"typ":"radio","lbl":"Radio Boxs","round":true,"opt":[{"lbl":"option 1"},{"lbl":"option 2"},{"lbl":"option 3"}],"valid":{}},"b-6":{"typ":"select","lbl":"Drop-Down Menu","opt":[{"lbl":"option 1"},{"lbl":"option 2"},{"lbl":"option 3"}],"valid":{"req":true}}}
const layout  = process.env.NODE_ENV === 'production' ? bitAppFront.layout : [{"w":10,"h":2,"x":0,"y":0,"i":"b-0","minH":2,"maxH":2,"moved":false,"static":false},{"w":10,"h":3,"x":0,"y":4,"i":"b-1","moved":false,"static":false},{"w":10,"h":2,"x":0,"y":2,"i":"b-3","minH":2,"maxH":2,"moved":false,"static":false},{"w":10,"h":2,"x":0,"y":7,"i":"b-4","minH":2,"moved":false,"static":false},{"w":10,"h":2,"x":0,"y":9,"i":"b-5","minH":2,"moved":false,"static":false},{"w":10,"h":3,"x":0,"y":11,"i":"b-6","minH":2,"moved":false,"static":false}]
ReactDOM.render(<Bitapps data={data} layout={layout} file={bitAppFront.file===''?false:true} />, document.getElementById(contentId));
serviceWorker.unregister();
