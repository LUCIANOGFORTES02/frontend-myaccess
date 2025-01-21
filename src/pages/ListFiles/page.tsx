import PageTitle from '@/components/ui/PageTitle'
import { LayoutSidebar } from '@/Sidebar/LayoutSidebar'
import { Files } from 'lucide-react';
import SearchFiles from './Components/SearchFiles';
import { useEffect, useState } from 'react';
import ObjectList from './Components/ObjectList';
import { mediaService } from '@/api/mediaService';

interface MediaItem {
  id: string;
  thumbnail: string;
  title: string;
  type: string;
  description: string;
  tags: string;
}

export default function ListFilesPage() {
    const[filters, setFilters]=useState({name:'',type:'',tags:''})
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0); // Total de arquivos retornado pela API


    useEffect(() => {
      const fetchMedia = async () => {
        setLoading(true);
        setError(null);
        try {
          const result = await mediaService.fetchAllMedia(filters.type, page, 10);
  
          if (Array.isArray(result.medias)) {
            setData((prev) => {
              const uniqueItems = new Map(); // Usando um Map para eliminar duplicatas por `id`
              [...prev, ...result.medias].forEach((item) => {
                uniqueItems.set(item.id, item); // Usa o `id` como chave
              });
              return Array.from(uniqueItems.values()); // Retorna apenas valores únicos
            });
            setTotal(result.total); // Atualiza o total de itens
          
          } else {
            console.error('A resposta da API não contém um array válido em medias.');
          }
        } catch (err) {
          console.error('Erro ao carregar mídias:', err);
          setError('Erro ao carregar mídias. Tente novamente mais tarde.');
        } finally {
          setLoading(false);
        }
      };
  
      fetchMedia();
    }, [filters.type, page]);
  

    //Filtrar os dados
    const handleFilterChange = (newFilters: typeof filters) => {
      setFilters(newFilters);
      setPage(1); // Reinicia a paginação
      setData([]); // Limpa os dados anteriores
    };

    const hasMore = data.length < total; // Verifica se há mais arquivos para carregar
    
  return (
    <LayoutSidebar>
        <PageTitle icon={Files} main="Listagem de Objetos Multimídia" sub=""/>
        <SearchFiles onFilterChange={handleFilterChange}/>
        {loading && <p>Carregando...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <ObjectList data={data} />
      {hasMore && !loading && (
        <div className='px-4'>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Carregar mais
        </button>
        </div>
      )}
      </LayoutSidebar>
  )
}
