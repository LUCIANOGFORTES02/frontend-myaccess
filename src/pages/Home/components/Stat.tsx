import React from 'react'

interface StatProps {
    title:string;
    value:number;
    icon:React.ElementType;
    
  }

export default function Stat({ title,value,icon:Icon} : StatProps) {
  return (
        <div className="flex flex-1 mr-5 mb-5 p-5 shadow-lg rounded-lg bg-gradient-to-r from-gray-800 to-gray-700  " >
            <div className='flex items-center'>
                <Icon className="text-foreground w-20 h-20"/>
            </div>
            <div className='flex flex-1 flex-col items-end'>
                <span className="text-foreground text-[1.2rem]" >{title}</span>
                <span className="text-foreground text-[3rem]" >{value}</span>
            </div>
        </div>

  )
}
