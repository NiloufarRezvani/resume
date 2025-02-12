/* eslint-disable react/prop-types */

import './Input.css'

function Input({ value, setValue,handleTodos ,keyDown ,mode}) {

    return (

        <footer>
            <div className="divider"></div>
            <div className='input'>
            <input type="text" 
            className={`${mode?`dark-mode-input`:``}`} 
            placeholder="Type your list here" 
            value={value} onChange={(e) => setValue(e.target.value)} 
            onKeyDown={keyDown}/>
            <button className={`add-btn ${mode?`add-btn-dark-mode`:``}`} onClick={()=>handleTodos()} >Add Item</button>
            </div>
        </footer>

    )
}

export default Input