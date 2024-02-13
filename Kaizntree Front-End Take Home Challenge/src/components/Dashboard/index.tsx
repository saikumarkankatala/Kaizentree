import React, { useEffect, useState } from 'react'
import { table_data } from './mock_data';
import Accordion from '../Accordion';
import Sidebar from '../sidebar';

const columns_order = ['sku','name','tags','category','stock_status','available_stock']

const Dashboard = ()=>{

    const [data,setData] = useState([]);
     useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await fetch('http://localhost:8000/user/items/',{
                method : "GET",
                headers :{
                  'Authorization': `Token ${localStorage.getItem('token')}`,
                  'Content-Type': 'application/json'

                }
              }
              
              
              );
              const data = await response.json();
  
              // Use the fetched data here
              console.log(data);
              setData(data)
  
          } catch (error) {
              console.error('Error fetching data:', error);
          }
      };
  
      fetchData();
  }, []);
    const handleCheckbox=(e:any,index:number)=>{
        // let record = data[index]
        // record.selected = e.target.checked;
        // setData((prevState)=>{
        //     const val =(index!==prevState.length-1)?
        //     [...prevState.slice(0,index),...prevState.slice(index+1,prevState.length)]:
        //     [...prevState.slice(0,index)]
            
        //     // val.unshift(record)
        //     val[index]=record
        //     return [...val]
        // })
    }

    return(
        <section className="MainContainer">
        <Sidebar/>
        <div className="container">
  <div className="dashboard-header">
    <h1>Item Dashboard</h1>
    <div className="dashboard-stats">
      <div className='dashboard-stat-item'>
        <div></div>
        <div>Total Categories</div>
        <div>0</div>
      </div>
      <hr/>
      
      <div className='dashboard-stat-item'>
        <div></div>
        <div>Total Items</div>
        <div>0</div>
      </div>
    </div>
  </div>
  
  <div className="search-section">
    <button className="button">NEW ITEM CATEGORY</button>

    <Accordion/>
    
  </div>
  <div className='table-container'>
    <div>
    <button className="button new_item_btn">NEW ITEM</button>

    </div>
  <table>
    {/* header */}
    <tr>
      <th><input type='checkbox'/></th>  
      <th>SKU</th>
      <th>Name</th>
      <th>Tags</th>
      <th>Category</th>
      <th>In Stock</th>
      <th>Available Stock</th>
    </tr>

    {
        data.map((item:{[key: string]:any},index)=>{
             return <tr>
                <td><input type='checkbox' onChange={(e)=>handleCheckbox(e,index)}/></td>
                {
                    columns_order.map((key: string)=>
                    key!='category'?<td>{item[key]}</td>:<td>{item[key]["name"]}</td>)
                }
            </tr>
        })
    }
    
  </table>
  </div>
  
        </div>
        </section>
    )
}

export default Dashboard;