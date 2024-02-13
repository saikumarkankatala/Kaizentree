

import React, {useState} from "react";

const InputTextBox = (props: any)=>{

    const [val,setVal] = useState('')
    const handleChange = (e:any)=>{
        setVal(e.target.value)
        props.change(e.target.name, e.target.value)
    }

    return(
        <input className="input_text_field" onChange={handleChange} type={props.type} placeholder={props.placeholder} name={props.name} value={val}/>
    )
}

export default InputTextBox;