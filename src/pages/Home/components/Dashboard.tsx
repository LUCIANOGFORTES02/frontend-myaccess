import { FileImage,FileVideo, FileAudio } from 'lucide-react';
import { useContext } from 'react'
import { AuthContext } from '@/auth/AuthContext';
import Stat from './Stat';

export  function Dashboard() {
  const { user } = useContext(AuthContext);

  return (
        <div className="flex flex-1 flex-col gap-4 py-8 px-4 ">
          <div className="flex flex-wrap justify-between"> 
            <Stat title="Imagens" value={user?.media.image || 0} icon={FileImage }/>
            <Stat title="Vídeos" value={user?.media.video || 0} icon={FileVideo }/>
            <Stat title="Áudios" value={user?.media.audio || 0} icon={FileAudio }/>
          </div>
        </div>
  )
}
