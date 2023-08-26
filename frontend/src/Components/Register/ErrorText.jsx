import React from 'react'
import {MdOutlineErrorOutline} from "react-icons/md"
export default function ErrorText({message}) {
  return (
    <p className='text-[12px] text-red-600 flex items-center gap-1'>

        <MdOutlineErrorOutline className='text-xl'/>
        {message}

      
    </p>
  )
}
