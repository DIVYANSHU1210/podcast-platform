import "./style.css"

function Custombtn ({text, onClick, disabled}){
    return(
        <button 
        onClick={onClick}
        className="customBtn"
        disabled = {disabled}
        >{text}</button>
    )
}

export default Custombtn;