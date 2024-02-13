import React, { useState } from 'react';

const Accordion =(props)=>{
    const [isOpen,setOpen] = useState(false);

    const handleShow = ()=>{
        setOpen((prev)=>{
            return !prev;
        })
    }
    const categories = [{id:1,category:'Raw Materials'},{id:2,category:'Bundles'},{id:3,category:'Finished products'}]
    return (
        <div className='accordion-container'>
            <div className='accordion-header'>
                {isOpen===false? <button onClick={handleShow} className='accordion-actions'>+</button>:
                <button onClick={handleShow} className='accordion-actions minus'>-</button>}
            </div>
           {isOpen? <div>
            <ul className='category-list'>
                {
                    categories.map(item=><li>{item.category}</li>)
                }
            </ul>
            </div>
            : null
            }
        </div>
    )
}


export default Accordion;