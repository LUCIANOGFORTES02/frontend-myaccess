import PageTitle from '@/components/ui/PageTitle'
import { LayoutSidebar } from '@/Sidebar/LayoutSidebar'
import { Files } from 'lucide-react';
import SearchFiles from './Components/SearchFiles';
import { useState } from 'react';
import ObjectList from './Components/ObjectList';

export default function ListFilesPage() {
    const[filters, setFilters]=useState({name:'',type:'',tags:''})

    const [data, setData] = useState([
      {
        id: "1",
        thumbnail: "https://via.placeholder.com/150", // Link para imagem/vídeo
        title: "HTML Básico - Aprenda o Essencial",
        type:'jpeg',
        description:
          "Aprenda os princípios básicos para confecção de um site em HTML.",
        tags: "Leonardo M. Leitão",
      },
      {
        id: "2",
        thumbnail: "https://via.placeholder.com/150",
        title: "CSS Avançado - Design Moderno",
        type:'MP3',
        description:
          "Domine o design de interfaces modernas utilizando CSS avançado.",
        tags: "Maria da Silva",
      },
    ]);


    const handleFilterChange = (newFilters:any) => {
        setFilters(newFilters);
        console.log("Filtros aplicados:", newFilters);

    }
  return (
    <LayoutSidebar>
        <PageTitle icon={Files} main="Listagem de Objetos Multimídia" sub=""/>
        <SearchFiles onFilterChange={handleFilterChange}/>
        <ObjectList data={data} ></ObjectList>
      
    </LayoutSidebar>
  )
}
