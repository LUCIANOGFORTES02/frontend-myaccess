import { mediaService } from "@/api/mediaService";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Audio {
  name: string,
  size: number,
  uploadDate: string,
  mimeType: string,
  duration: number,
  bitRate: number,
  sampleRate: number,
  channels: string,
  description: string,
  title: string,
  tags: string,
  genre: string,
};



export default function EditAudio() {
      const { id } = useParams<{id:string}>();//Capturar o id da imagem

      const defaultAudio: Audio = {
        name: '',
        size: 0,
        uploadDate: '',
        mimeType: '',
        duration: 0,
        bitRate: 0,
        sampleRate: 0,
        channels: '',
        description: '',
        title: '',
        tags: '',
        genre: '',
      };
    

    const [audio, setAudio] = useState<Audio>(defaultAudio);
    const [userDefinedProperties, setUserDefinedProperties] = useState<Audio>(defaultAudio);
  
    useEffect(()=>{
        const loadMedia = async () =>{
          try{
            if (id){
              const data = await mediaService.fetchMediaById(id);
              setAudio(data);
              setUserDefinedProperties(data);
    
            }
          } catch (err) {
            console.error("Erro ao carregar os dados da mídia.", err);
          } 
        };
        loadMedia();
    
      },[id]);

    const handleChange = (field: keyof Audio, value: any) => {
        if(!userDefinedProperties)return;
        setUserDefinedProperties((prev) => ({
          ...prev!,
          [field]: value,
        }));
      };

      const handleUpdate = async () => {
        try{
          if (id) {
            const data = await mediaService.updateMediaById(id, {
              title: userDefinedProperties.title,
              description: userDefinedProperties.description,
              tags: userDefinedProperties?.tags?.toString(),
            });
    
            setAudio(data);
            setUserDefinedProperties(data);
          }
        } catch (err) {
          console.error("Erro ao atualizar os dados da mídia.", err);
        } 
      }

  return (
     <div className="flex h-screen justify-center items-center">
      <div className='p-6 h-screen w-full max-w-4xl'>
        <div className='flex flex-col gap-4'>
          <h2 className='text-2xl font-semibold'>Propriedades Editáveis</h2>
          <hr />

          <div className='md:col-span-2'>
            <label htmlFor="">Nome do Arquivo:</label>
            <input
              type="text"
              value={audio?.title || ''}
              readOnly
              className="w-full p-2 rounded-md bg-gray-600 text-gray-300 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="">Descrição:</label>
            <textarea
              value={userDefinedProperties?.description || ''}
              placeholder="Adicione sua descrição"
              onChange={(e) => handleChange("description", e.target.value)}
              className="w-full p-2 rounded-md bg-gray-700 text-foreground focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="">Tags:</label>
            <input
              type="text"
              placeholder="Adicione tags separadas por vírgula"
              value={userDefinedProperties?.tags}
              onChange={(e) => handleChange("tags", e.target.value.split(","))}
              className="w-full p-2 rounded-md bg-gray-700 text-foreground focus:outline-none"
            />
          </div>
          <div className="mt-4 flex gap-4">
            <button 
              className="py-2 px-6 bg-green-600 hover:bg-green-500 text-white rounded-md"
              onClick={async () => await handleUpdate() }
            >
              Salvar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
