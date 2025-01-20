import PageTitle from '@/components/ui/PageTitle'
import { LayoutSidebar } from '@/Sidebar/LayoutSidebar'
import { Upload } from 'lucide-react';
import UploadFiles from './components/UploadFiles';

export default function UploadObjectPage () {
    
  return (
    <LayoutSidebar>
        <PageTitle icon={Upload} main="Upload de Objetos Multimídia" sub="Enviem suas mensagens, vídeos ou áudios rapidamente !"/>
        <UploadFiles />
    </LayoutSidebar>
  )
}
