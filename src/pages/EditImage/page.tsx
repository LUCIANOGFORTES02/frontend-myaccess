import PageTitle from '@/components/ui/PageTitle'
import { LayoutSidebar } from '@/Sidebar/LayoutSidebar'
import { FileImage } from 'lucide-react';
import EditImage from './components/EditImage'

export default function EditFileImagePage() {
  return (
    <LayoutSidebar>
    <PageTitle icon={FileImage} main="Gerenciar Imagem" sub=""/>
    <EditImage />
  </LayoutSidebar>
  )
}
