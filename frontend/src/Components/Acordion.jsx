import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import {FaFileVideo} from "react-icons/fa"
import {CiPlay1} from "react-icons/ci"
import {ImDownload3} from "react-icons/im"
import { useState } from 'react';

import { BsChevronDown } from "react-icons/bs";
import {CiLock} from "react-icons/ci"

export default function ControlledAccordions({items , allData}) {
  const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
      <Accordion  expanded={expanded === `panel1`} onChange={handleChange(`panel1`)}>
      <AccordionSummary
        expandIcon={<BsChevronDown />}
      
      >
        <p sx={{ width: '33%', flexShrink: 0 }}>
        دوره NPM برای برنامه نویسان جاوا اسکریپت
        </p>
      </AccordionSummary>
      <AccordionDetails>
        <ul>
          {items.map((item , index)=>(
          <li key={index} className='flex justify-between items-center border-dashed border-1 p-3 mb-2'>
          <div className='flex items-center gap-2'>
             <span className=' border-1 rounded-full p-2 bg-main-bg text-white w-[35px] h-[35px] flex items-center justify-center shadow-lg'>{index + 1}</span>
          <FaFileVideo className=" text-text-color " />
             <p className='text-[10px] pl-2 pr-2 md:text-[14px]'>{item.title}</p>
          </div>
        
             <div className='flex items-center gap-2'>
                 <button className='flex items-center bg-main-bg pr-4 pl-4 pt-2 pb-2 text-white rounded-md shadow-lg gap-2'>
                      {item.free || allData.isUserRegisteredToThisCourse ? (
                      <a className='flex items-center gap-2' href={`http://localhost:4000/courses/covers/${item.video}`}>
                      <p className=' hidden lg:block text-sm'>نمایش ویدئو</p>
                      <CiPlay1  />
                      </a>
                      ) : (<CiLock  />)}
                    
              
                 </button>
                 <div className='bg-orange-400 p-2 rounded-md'>
                 <ImDownload3 className='text-1xl text-white   rounded-md ' />

                 </div>
                 

             </div>
         </li>
          ))}
  


        </ul>
       
      </AccordionDetails>
    </Accordion>
     


    </div>
  );
}