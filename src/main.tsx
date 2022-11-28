import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './style.scss'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <App />
)

for(const elem of document.querySelectorAll("input")){
  console.log(elem);
 (elem as HTMLInputElement).addEventListener("onfocus", () => {
  console.log("hi");
 })
}