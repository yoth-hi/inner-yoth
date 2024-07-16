import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import on, { dispatch } from "./events.store.js"
import { store } from "./store/global.js"

const element = document.getElementById('root')
const root = ReactDOM.createRoot(element);
store["root"] = element
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

on("data",([data, pageId]) => {
  switch(pageId){
    case "FEED_HOME":
      dispatch("on-update-data", data ||{})
      break;
  }
})


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


function F(){
  if(window.data){
    dispatch("data", [window.data,"FEED_HOME"])
    return
  }
  setTimeout(F,16)
}
F()