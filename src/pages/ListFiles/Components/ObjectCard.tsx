import { Separator } from '@radix-ui/react-separator';
import { Pencil,Trash} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface ObjectCardProps {
    data:{
        id: string;
        link: string; // URL da miniatura (imagem/vídeo)
        type:string;
        title: string; 
        description: string; 
        tags: string; 
    }
}

export default function ObjectCard ({data} : ObjectCardProps) {
  const navigate = useNavigate();

   const handleEdit =()=>{ //Ir para as páginas de editar 
      if (data.type.startsWith('image')) {
        navigate(`/edit/image/${data.id}`);
      } else if (data.type.startsWith('video')) {
        navigate(`/edit/video/${data.id}`);
      } else if (data.type.startsWith('audio')) {
        navigate(`/edit/audio/${data.id}`);
      } else {
        console.warn('Tipo de arquivo não suportado para edição.');
      }
    };

  const handleView = () => {
    navigate(`/view/${data.id}`); // Navega para a página de visualização
  };

    
  return (


    <div className=' flex shadow-lg rounded-lg overflow-hidden border border-gray-700 mb-4 p-2'>
        {/* Miniatura */}
        <div className="flex-shrink-0"
       
        >
            <img
            src={data.link}
            alt={data.title}
            className="h-24 w-24 object-cover"
            />
      </div>
      <Separator className='w-px h-auto bg-gray-700 mx-2'/>
      {/* Textos */}
      <Link to={`/view/${data.id}`} className="flex flex-col flex-grow p-4">
        {/* <div className="flex flex-col flex-grow p-4"> */}
          <h3 className="text-lg font-bold">{data.title}</h3>
          <p className="text-sm text-gray-600">{data.description} </p>
          {/* <p className="text-sm text-gray-500 mt-2">Type: {data.type} </p> */}
          <p className="text-sm text-gray-500 mt-2">Tags:  {data.tags}</p>
        {/* </div> */}
      </Link>

      {/* Ações */}
      <div className="flex flex-col justify-center items-center p-4 gap-2">
      <button
          onClick={(e) => {
            e.stopPropagation(); // Evita conflito de clique
            handleEdit(); // Ação do botão Editar
          }}
          className="p-1 text-black hover:underline rounded-md bg-blue-400"
        >
          <Pencil />
        </button>
        <button
          onClick={() => { }}
          className="p-1 bg-red-500 rounded-md hover:underline"
        >
          <Trash />
        </button>
      </div>
      


    </div>
  )
}
