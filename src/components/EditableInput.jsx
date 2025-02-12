/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react';
import './editableInput.css'
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { IoCloseCircleSharp } from "react-icons/io5";
function EditableInput({isEditMode,text,updateText,handleEditableInput}) {
  const [changeText, setChangeText] = useState(text)
  const inputRef=useRef(null)
  useEffect(() => {
    setChangeText(text || '');
}, [text]);
 const handleUpdate=()=>{
  updateText(changeText)
  handleEditableInput(false)
  console.log(changeText);
  
}
 const handleCancel=()=>{
  setChangeText(text || '')
  handleEditableInput(false)
 }
 useEffect(() => {
  const timer = setTimeout(() => {
      inputRef.current?.focus();
  }, 50);
  return () => clearTimeout(timer);
}, []);
const handleKeyPress = (e) => {
  if (e.key === 'Enter') {
    handleUpdate()
  }
else if(e.key==='Escape'){
  handleCancel()
}}
useEffect(() => {
  if (isEditMode) {
      const timer = setTimeout(() => {
          inputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
  }
}, [isEditMode]);

if (!isEditMode) return null;
  return (
    <div>
{isEditMode?
  (<div className="input-box">
  <input type="text" value={changeText}
  onKeyDown={handleKeyPress}
   onChange={(e)=>setChangeText(e.target.value)}
   ref={inputRef} className="editable-input"/>
  <IoCloseCircleSharp onClick={handleCancel} className='icons'/>
  <IoCheckmarkCircleSharp onClick={handleUpdate} className='icons'/>
  </div>):null}
    </div>)}
export default EditableInput