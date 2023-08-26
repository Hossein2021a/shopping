import React from 'react'
import Button from './Buttons'

export default function Title({text1 , text2 , icon}) {
  return (
    <div className='flex items-center justify-between  p-8 pt-10 pb-0'>

        <div className='flex items-center gap-2'>
            <div className='border-1 border-green-700 rounded-full p-3  '>
            <img className=' w-[35px]  ' src={icon} />
            </div>
            <div className='flex flex-col justify-start gap-1'>
                <span className=' font-extrabold text-14'>{text1}</span>
                <span className='text-[12px]'>{text2}</span>
            </div>
        </div>
        <div className='hidden md:block'>
        <Button bgColor="rgb(82, 172, 102)" color="#fff"  text="بیشتر ببینید" height="35px" />
        </div>


      
    </div>
  )
}
