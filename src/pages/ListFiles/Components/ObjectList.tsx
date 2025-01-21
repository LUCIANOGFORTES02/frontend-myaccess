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


export default function ObjectList({data = [] }:ObjectListProps) {
  if (!data || data.length === 0) {
    return (
      <p className="text-gray-500 text-center mt-4">
        Nenhum item encontrado.
      </p>
    );
  }

  return (
    <div className="flex flex-col p-4">
      {data.map((item) => (
        <ObjectCard key={item.id} data={item} />
      ))}
    </div>
  );
}
