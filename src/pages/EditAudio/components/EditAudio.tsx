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
  tags: string[],
  genre: string,
};

// Simulação de dados de áudio
// const audioData: Audio = {
//     name: 'audio_example.mp3',
//     size: 5120000,
//     uploadDate: '2025-01-17 14:32',
//     mimeType: 'audio/mpeg',
//     duration: 180,
//     bitRate: 320,
//     sampleRate: 44100,
//     channels: 'Stereo',
//     description: 'Uma narração interessante.',
//     tags: ['narracao', 'podcast'],
//     genre: 'Podcast',
//   };

export default function EditAudio() {
      const { id } = useParams<{id:string}>();//Capturar o id da imagem
    

    const [audio, setAudio] = useState<Audio|null>(null);
    const [userDefinedProperties, setUserDefinedProperties] = useState<Audio|null>(null);
  
    useEffect(()=>{
        const loadMedia = async () =>{
          try{
            if (id){
              const data = await mediaService.fetchMediaById(id);
              setAudio(data);
              setUserDefinedProperties(data);
    
            }
          } catch (err) {
            console.error("Erro ao carregar os dados da mídia.");
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

      const handleSave = () => {
        if (userDefinedProperties){
          setAudio(userDefinedProperties)
          
        }
      }

  return (
     <div className="flex justify-center items-center">
      <div className='p-6 w-full max-w-4xl'>
        {/* Não pode ser alterados */}
        <h2 className="text-2xl font-semibold">Campos Não Editáveis</h2>
        <hr className="border-gray-500 my-2" />
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-8'>
          <div className='md:col-span-2'>
            <label htmlFor="">Nome do Arquivo:</label>
            <input
              type="text"
              value={audio?.name}
              readOnly
              className="w-full p-2 rounded-md bg-gray-600 text-gray-300 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="">Tamanho do Arquivo:</label>
            <input
              type="text"
              value={`${audio?.size} bytes`}
              readOnly
              className="w-full p-2 rounded-md bg-gray-600 text-gray-300 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="">Data de Upload:</label>
            <input
              type="text"
              value={audio?.uploadDate}
              readOnly
              className="w-full p-2 rounded-md bg-gray-600 text-gray-300 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="">Tipo MIME:</label>
            <input
              type="text"
              value={audio?.mimeType}
              readOnly
              className="w-full p-2 rounded-md bg-gray-600 text-gray-300 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="">Duração:</label>
            <input
              type="text"
              value={`${audio?.duration} segundos`}
              readOnly
              className="w-full p-2 rounded-md bg-gray-600 text-gray-300 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="">Taxa de Bits:</label>
            <input
              type="text"
              value={`${audio?.bitRate} kbps`}
              readOnly
              className="w-full p-2 rounded-md bg-gray-600 text-gray-300 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="">Taxa de Amostragem:</label>
            <input
              type="text"
              value={`${audio?.sampleRate} Hz`}
              readOnly
              className="w-full p-2 rounded-md bg-gray-600 text-gray-300 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="">Canais:</label>
            <input
              type="text"
              value={audio?.channels}
              readOnly
              className="w-full p-2 rounded-md bg-gray-600 text-gray-300 focus:outline-none"
            />
          </div>
        </div>

        {/* Pode realizar edição */}
        <div className='flex flex-col gap-4'>
          <h2 className='text-2xl font-semibold'>Propriedades Editáveis</h2>
          <hr />

          <div>
            <label htmlFor="">Descrição:</label>
            <textarea
              value={userDefinedProperties?.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className="w-full p-2 rounded-md bg-gray-700 text-foreground focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="">Tags:</label>
            <input
              type="text"
              placeholder="Adicione tags separadas por vírgula"
              value={userDefinedProperties?.tags.join(", ")}
              onChange={(e) => handleChange("tags", e.target.value.split(","))}
              className="w-full p-2 rounded-md bg-gray-700 text-foreground focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="">Gênero:</label>
            <input
              type="text"
              value={userDefinedProperties?.genre}
              onChange={(e) => handleChange("genre", e.target.value)}
              className="w-full p-2 rounded-md bg-gray-700 text-foreground focus:outline-none"
            />
          </div>
          <div className="mt-4 flex gap-4">
            <button onClick={handleSave} className="py-2 px-6 bg-green-600 hover:bg-green-500 text-white rounded-md">
              Salvar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
