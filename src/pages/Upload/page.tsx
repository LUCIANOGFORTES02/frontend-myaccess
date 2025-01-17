import PageTitle from '@/components/ui/PageTitle'
import { LayoutSidebar } from '@/Sidebar/LayoutSidebar'
import { Upload } from 'lucide-react';
import UploadFiles from './components/UploadFiles';

export default function UploadObject () {
    
  return (
    <LayoutSidebar>
        <PageTitle icon={Upload} main="Upload de Objetos Mulimídia" sub="Enviem suas mensagens, vídeos ou áudios rapidamente !"/>
        <UploadFiles />
    </LayoutSidebar>
  )
}
