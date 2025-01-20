import PageTitle from '@/components/ui/PageTitle'
import { LayoutSidebar } from '@/Sidebar/LayoutSidebar'
import { Video } from 'lucide-react';
import EditVideo from './componets/EditVideo';

export default function EditVideoPage() {
  return (
    <LayoutSidebar>
    <PageTitle icon={Video} main="Gerenciar Vídeo" sub=""/>
    <EditVideo/>

  
  </LayoutSidebar>
  )
}
