//* eslint-disable react/prop-types */
import { IoMoonOutline } from "react-icons/io5";
import { FiSun } from "react-icons/fi";
import { TaskContext } from "../App";
import './Header.css'
import { useContext } from "react";
function Header() {
  const {todos,mode, handleMode}=useContext(TaskContext)
  return (
    <>
    <header >
      <div className={`text ${mode?`dark-mode-title`:''}`}>
      <h1 id="title">My To-do List</h1>
      <div className={`items ${mode?`dark-mode-items`:''}`}>{todos.length} item(s)</div>
      </div>
    <button className={`btn ${mode?`btn-dark`:``}`} onClick={handleMode}>{mode?<FiSun/>:<IoMoonOutline/>}</button>
   </header>
   <div className={`divider ${mode?`dark-mode-divider`:``}`}></div>
   </>
  )
}

export default Header