import { useState } from "react"
import "./style.css"

function FileInput({text, id, accept, fileHandleFunc}) {

  const [fileSelected , setFileSelected] = useState("");

  function onChange(e) {
    // console.log(e.target.files[0].name);
    setFileSelected(e.target.files[0].name);
    fileHandleFunc(e.target.files[0]);
  }

  return (
    <div className= {`custom-input ${!fileSelected ? "file-input" : ""}`}>
        <label htmlFor={id}>{!fileSelected ? text : fileSelected}</label>
        <input 
        type="file" 
        id={id} 
        accept = {accept} 
        style={{display:"none"}}
        onChange={onChange}/>
    </div>
  )
}

export default FileInput