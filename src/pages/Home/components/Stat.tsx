import React from 'react'

interface StatProps {
    title:string;
    value:number;
    icon:React.ElementType;
    
  }

export default function Stat({ title,value,icon:Icon} : StatProps) {
  return (
        <div className="flex flex-1 mr-5 mb-5 p-5 rounded-xl bg-white" >
            <div className='flex items-center'>
                <Icon className="bg-white w-20 h-20"/>
            </div>
            <div className='flex flex-1 flex-col items-end'>
                <span className="text-black text-[1.2rem]" >{title}</span>
                <span className="text-black text-[3rem]" >{value}</span>
            </div>
        </div>

  )
}
