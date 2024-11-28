import React from 'react'

interface PageTitleProps {
    icon: React.ElementType;
    main:string;
    sub:string;

}

export default function PageTitle({icon:Icon,main, sub} : PageTitleProps) {
  return (
    <div className='flex flex-col px-4 pt-2'>
        <h1 className='flex items-center gap-2 text-2xl font-bold'>
            <Icon/>
            {main}
        </h1>
        <h2 className='text-lg'>{sub}</h2>
        <hr />

    </div>
  )
}
