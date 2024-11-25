import {Card} from "@/components/ui/card"
import { Columns2, LogOut  } from 'lucide-react';


export default function Header() {
  return (
    <div className="flex-1 felx flex-col h-screen overflow-hidden">
      <Card className=" border-gray-800 shadow-sm p-[1.875rem] flex justify-between items-center"
      // style={{background: '#202024'}}
      >
          <Columns2 /> 
                  
              <h1 className=" flex text-lg font-semibold ">
              <span className="text-white">Dashboard</span></h1>
          
          <LogOut />

      </Card>
    </div>
    

  )
}
