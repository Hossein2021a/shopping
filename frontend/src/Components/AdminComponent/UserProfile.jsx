import React, { useContext } from 'react'
import {BiExit} from "react-icons/bi"
import AuthContext from '../../Contexts/authContext'




export default function UserProfile() {

  const authContext = useContext(AuthContext)

  const loguot = () => {
    authContext.logout()
    window.location.href ="/"
  }

  return (
    <div>
      <div className=" absolute left-[80px] w-[10rem] top-[50px]">

        <ul className=" bg-gray-200  p-2 rounded-sm w-full flex flex-col gap-4">
            <li
             
              className=" hover:bg-orange-400 hover:text-white p-2 hover:rounded-md hover:cursor-pointer text-[12px] flex items-center w-full justify-between gap-4 ">
              <p
                onClick={loguot}
                className=" hover:text-white w-full text-14 rounded-md justify-between">
                خروج
              </p>
              <BiExit className='text-2xl hover:text-white' />

            </li>
  
        </ul> 
 
      </div>
    </div>
  )
}
