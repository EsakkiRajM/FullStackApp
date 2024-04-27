import React from 'react'
import { Outlet } from 'react-router-dom'

const Header = () => {
  return (
    <div>
         <div className='row'>
        <div className='text-center p-3 bg-info' > 
        <h4 className='text-dark'>CLASS</h4>
        </div>
        <div className='row'>
        <Outlet />
        </div>
        </div>
    </div>
  )
}

export default Header