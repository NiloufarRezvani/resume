/* eslint-disable react/prop-types */

import './Input.css'

function Input({ value, setValue,handleTodos ,keyDown ,mode}) {

    return (

        <div className={`input-box ${mode?`dark-mode-input`:``} `}>
            {/* <div className="divider"></div> */}
            <div className='input'>
            <input type="text" 
            className={`${mode?`dark-mode-input`:``}`} 
            placeholder="Type your list here" 
            value={value} onChange={(e) => setValue(e.target.value)} 
            onKeyDown={keyDown}/>
           
            </div>
            <button className={`add-btn ${mode?`add-btn-dark-mode`:``}`} onClick={()=>handleTodos()} >Add Item</button>
        </div>

    )
}

export default Input