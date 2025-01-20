import PageTitle from '@/components/ui/PageTitle'
import { LayoutSidebar } from '@/Sidebar/LayoutSidebar'
import { FileAudio } from 'lucide-react';
import EditAudio from './components/EditAudio';

export default function EditFileAudioPage() {
  return (
    <LayoutSidebar>
    <PageTitle icon={FileAudio} main="Gerenciar Aúdio" sub=""/>
    <EditAudio/>
    </LayoutSidebar>
  )
}
