import { mediaService } from "@/api/mediaService";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Video {
  fileName: string;       // Nome do arquivo enviado
  fileSize: string;       // Tamanho do arquivo enviado em formato legível (ex.: "2.3 MB")
  uploadDate: string;     // Data e hora do upload do arquivo
  mimeType: string;       // Tipo MIME do vídeo (ex.: "video/mp4")

  // Propriedades específicas do vídeo
  duration: string;       // Duração do vídeo (ex.: "2:15")
  resolution: string;     // Resolução do vídeo (ex.: "1920x1080")
  frameRate: string;      // Taxa de quadros por segundo (ex.: "30 FPS")
  videoCodec: string;     // Codec de vídeo (ex.: "H.264")
  audioCodec: string;     // Codec de áudio (ex.: "AAC")
  bitRate: string;        // Taxa de bits combinada (ex.: "4500 kbps")
  
  // Localização da miniatura gerada
  thumbnail: string;      // Caminho ou URL da miniatura gerada

    // Detalhes do processamento
    processingDetails?: {
      qualityVersions: { resolution: string; path: string }[]; // Versões geradas (ex.: "720p", "480p")
    };

  // Propriedades definidas pelo usuário
  description?: string;   // Descrição textual fornecida pelo usuário
  tags: string;        // Lista de palavras-chave ou rótulos atribuídos
  genre?: string;         // Categoria de gênero do vídeo
  title?: string; 
}


export default function EditVideo() {
  const { id } = useParams<{ id: string }>();

  const defaultVideo: Video = {
    fileName: '',         // Nome do arquivo enviado
    fileSize: '0 bytes',  // Tamanho do arquivo (pode usar uma string legível)
    uploadDate: '',       // Data e hora do upload do arquivo
    mimeType: '',         // Tipo MIME do vídeo
  
    duration: '0:00',     // Duração do vídeo (ex.: "0:00")
    resolution: '',       // Resolução do vídeo (ex.: "1920x1080")
    frameRate: '',        // Taxa de quadros por segundo (ex.: "30 FPS")
    videoCodec: '',       // Codec de vídeo (ex.: "H.264")
    audioCodec: '',       // Codec de áudio (ex.: "AAC")
    bitRate: '0 kbps',    // Taxa de bits combinada (ex.: "4500 kbps")
    thumbnail: '',        // Caminho ou URL da miniatura gerada
  
    description: '',      // Descrição textual fornecida pelo usuário
    tags: '',             // Lista de palavras-chave ou rótulos atribuídos
    genre: '',            // Categoria de gênero do vídeo
  };

  // Estados para armazenar as propriedades do vídeo
  const [video, setVideo] = useState<Video>(defaultVideo);

  const [userDefinedProperties, setUserDefinedProperties] = useState<Video>(defaultVideo);

  useEffect(()=>{
      const loadMedia = async () =>{
        try{
          if (id){
            const data = await mediaService.fetchMediaById(id);
            setVideo(data);
            setUserDefinedProperties(data);
          }
        } catch (err) {
          console.error("Erro ao carregar os dados da mídia.", err);
        } 
      };
      loadMedia();
  
    },[id]);

  const handleChange = (field:keyof Video , value:any)=>{
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
          tags: userDefinedProperties?.tags.toString(),
        });

        setVideo(data);
        setUserDefinedProperties(data);
      }
    } catch (err) {
      console.error("Erro ao atualizar os dados da mídia.", err);
    } 
  }

  return (
    <div className="flex h-screen justify-center items-center  ">
    <div className=' p-8 h-screen shadow-lg w-full max-w-4xl  '>
          <div className='flex flex-col gap-4 '>
            <h2 className='text-2xl font-semibold'>Propriedades Editáveis </h2>
            <hr />

            <div className='md:col-span-2' >
              <label htmlFor="" > Nome do Arquivo: </label>
              <input
                  type="text"
                  value={video?.title || video?.fileName || ""}
                  readOnly
                  className="w-full p-2 rounded-md bg-gray-600 text-gray-300 focus:outline-none"
                />        
            </div>
            <div className=''>
                <label htmlFor="description"> Descrição:  </label>
                <textarea
                  value={userDefinedProperties.description || ""}
                  placeholder="Adicione sua descrição"
                  name="description"
                  onChange={(e) => handleChange("description",e.target.value)}
                  className="w-full p-2 rounded-md bg-gray-700 text-foreground focus:outline-none"
                  />
            </div>
            <div>
                <label htmlFor=""> Tags </label>
                <input
                    type="text"
                    placeholder="Adicione tags separadas por vírgula"
                    value={userDefinedProperties.tags}
                    onChange={(e) => handleChange("tags", e.target.value.split(","))}
                    className="w-full p-2 rounded-md bg-gray-700 text-foreground focus:outline-none"
                  />

            </div>
            <div>
            </div>
            <div className="mt-4 flex  gap-4">
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
