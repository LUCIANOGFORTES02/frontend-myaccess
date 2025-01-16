import PageTitle from '@/components/ui/PageTitle'
import { LayoutSidebar } from '@/Sidebar/LayoutSidebar'
import { Files } from 'lucide-react';
import SearchFiles from './Components/SearchFiles';

export default function ListFiles() {
  return (
    <LayoutSidebar>
        <PageTitle icon={Files} main="Listagem de Objetos Mulimídia" sub=""/>
        <SearchFiles/>
      
    </LayoutSidebar>
  )
}
