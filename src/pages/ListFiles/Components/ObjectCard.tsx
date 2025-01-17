import { Separator } from '@radix-ui/react-separator';
import { Eye,Trash} from 'lucide-react';

interface ObjectCardProps {
    data:{
        id: string;
        thumbnail: string; // URL da miniatura (imagem/vídeo)
        title: string; 
        description: string; 
        tags: string; 
    }
}

export default function ObjectCard ({data} : ObjectCardProps) {

    
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
        <p className="text-sm text-gray-500 mt-2">Tags:  {data.tags}</p>
      </div>

      {/* Ações */}
      <div className="flex flex-col justify-center items-center p-4 gap-2">
        <button
          onClick={() =>{}}
          className="text-black hover:underline  rounded-lg bg-blue-600"
        >
            <Eye />
        </button>
        <button
        onClick={() => {}}
          className="text-white bg-red-500 rounded-lg hover:underline"
        >
            <Trash />
        </button>
      </div>
      


    </div>
  )
}
