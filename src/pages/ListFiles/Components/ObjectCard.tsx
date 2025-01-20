import { Separator } from '@radix-ui/react-separator';
import { Pencil,Trash} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ObjectCardProps {
    data:{
        id: string;
        thumbnail: string; // URL da miniatura (imagem/vídeo)
        type:string;
        title: string; 
        description: string; 
        tags: string; 
    }
}

export default function ObjectCard ({data} : ObjectCardProps) {
  const navigate = useNavigate();

  const handleEdit =()=>{ //Ir para as páginas de editar 
    switch(data.type){
      case 'jpeg':
        navigate(`/edit/image/${data.id}`);
        break;
      case 'mp4':
        navigate(`/edit/video/${data.id}`);
        break;
      case 'MP3':
        navigate(`/edit/audio/${data.id}`);
        break;
      default:
        console.warn('Tipo de arquivo não suportado para edição.');
    }

  }




    
  return (


    <div className=' flex shadow-lg rounded-lg overflow-hidden border border-gray-700 mb-4 p-2'>
        {/* Miniatura */}
        <div className="flex-shrink-0">
            <img
            src={data.thumbnail}
            alt={data.title}
            className="h-24 w-24 object-cover"
            />
      </div>
      <Separator className='w-px h-auto bg-gray-700 mx-2'/>
      {/* Textos */}
      <div className="flex flex-col flex-grow p-4">
        <h3 className="text-lg font-bold">{data.title}</h3>
        <p className="text-sm text-gray-600">{data.description} </p>
        {/* <p className="text-sm text-gray-500 mt-2">Type: {data.type} </p> */}
        <p className="text-sm text-gray-500 mt-2">Tags:  {data.tags}</p>
      </div>

      {/* Ações */}
      <div className="flex flex-col justify-center items-center p-4 gap-2">
        <button
          onClick={handleEdit}
          className="p-1 text-black hover:underline  rounded-md bg-blue-400"
        >
            <Pencil />
        </button>
        <button
        onClick={() => {}}
          className="p-1   bg-red-500 rounded-md hover:underline"
        >
            <Trash />
        </button>
      </div>
      


    </div>
  )
}
