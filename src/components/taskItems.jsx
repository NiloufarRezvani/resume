import { FiSquare } from "react-icons/fi";
import { IoTrash } from "react-icons/io5";
import './TaskItems.css'
import {  useState } from "react";
import { FaRegCheckSquare } from "react-icons/fa";
import EditableInput from "./EditableInput";
import { FaPencil } from "react-icons/fa6";
// eslint-disable-next-line react/prop-types
function TaskItems({ title, onDelete, darkMode, toggle, completed, id, updateText }) {
  const [isEditMode, setIsEditMode] = useState(false)
  const handleEditableInput = () => {
    setIsEditMode(!isEditMode)
  }
  
  const handleUpdateText = (id,newText) => {
    updateText(id,newText);
    setIsEditMode(false);
    console.log(newText);
    
  }
  return (
    <div className="item">
      <div>
        {isEditMode ?
          <EditableInput 
          text={title}
          updateText={(newText)=>handleUpdateText(id,newText)}
          handleEditableInput={handleEditableInput}
          isEditMode={isEditMode}
           /> :
          <div className={`title-box ${darkMode ? `dark-mode-title-box` : ``}`} >
            {!completed ? <FiSquare onClick={toggle} /> :
              <FaRegCheckSquare className="checked"
                onClick={toggle} />}
            <h4 className={completed ? "done" : ""}>{title}</h4> </div>
        } </div>
      <div className="icons-input">
        <IoTrash onClick={onDelete} className={`${darkMode ? `trash-dark` : ``}`} />
        <FaPencil onClick={handleEditableInput}></FaPencil>
      </div>
    </div>)
}export default TaskItems