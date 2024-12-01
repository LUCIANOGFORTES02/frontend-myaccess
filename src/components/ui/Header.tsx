// import {Card} from "@/components/ui/card"
import { Columns2, LogOut  } from 'lucide-react';
import { useSidebar } from "@/components/ui/sidebar"
import { useContext } from 'react';
import { AuthContext } from '@/auth/AuthContext';


export default function Header() {
  const auth = useContext(AuthContext);


  const handleLogoutClick =async()=>{
    await auth.logout()
    window.location.href = window.location.href
  //await navigate('/');
  }

  const { toggleSidebar } = useSidebar()
  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden">
      <div className=" border-gray-800 border-b  p-[1.5rem] flex justify-between items-center"
      // style={{background: '#202024'}}
      >
          <button><Columns2 onClick={toggleSidebar}>
            </Columns2>
          </button>
                  
              <h1 className="text-lg font-semibold ">
              <span className="text-white">Myaccess</span></h1>
          
              <button onClick={handleLogoutClick} className="w-full justify-start gap-2">
                <LogOut size={16}/>
              </button>

      </div>
    </div>
    

  )
}
