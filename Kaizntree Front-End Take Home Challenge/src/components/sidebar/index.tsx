import React from 'react'

const Sidebar = () =>{
    const options = ['Home','Items','Stock','Build','Customers']
    const bottom_options = ['Help','Integrations','Logout','My Profile']
    return (
        <aside className='sidebar-nav'>
            <div className='primary_nav_options'>
                {
                    options.map((item)=><a href='/dashboard' className='side-nav-option'>
                        <div>
                            <div>{item}</div>
                        </div>
                    </a>)
                }
            </div>
            <div className='bottom_nav_options'>
            {
                    bottom_options.map((item)=><a href='/dashboard' className='side-nav-option'>
                        <div>
                            <div>{item}</div>
                        </div>
                    </a>)
                }
            </div>
        </aside>
    )
}

export default Sidebar;