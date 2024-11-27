import {Card} from "@/components/ui/card"
import { Columns2, LogOut  } from 'lucide-react';
import { useSidebar } from "@/components/ui/sidebar"


export default function Header() {

  const { toggleSidebar } = useSidebar()
  return (
    <div className="flex-1 felx flex-col h-screen overflow-hidden">
      <Card className=" border-gray-800 shadow-sm p-[1.5rem] flex justify-between items-center"
      // style={{background: '#202024'}}
      >
          <button><Columns2 onClick={toggleSidebar}>
            </Columns2>
          </button>
                  
              <h1 className=" flex text-lg font-semibold ">
              <span className="text-white">Multimídia</span></h1>
          
          <button><LogOut /></button>

      </Card>
    </div>
    

  )
}
