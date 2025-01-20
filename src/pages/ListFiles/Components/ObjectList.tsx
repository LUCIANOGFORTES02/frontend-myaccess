import ObjectCard from './ObjectCard'



interface ObjectListProps {
  data: {
    id: string;
    thumbnail: string; // URL da miniatura (imagem/vídeo)
    type:string;
    title: string; 
    description: string; 
    tags: string; 
  }[];
  
}


export default function ObjectList({data}:ObjectListProps) {
  return (
    <div className="flex flex-col p-4">
          {data.length > 0 ? (
            data.map((item) => (
              <ObjectCard
                key={item.id}
                data={item}

              />
            ))
          ) : (
            <p className="text-gray-500 text-center mt-4">
              Nenhum item encontrado.
            </p>
          )}
        </div>
  )
}
