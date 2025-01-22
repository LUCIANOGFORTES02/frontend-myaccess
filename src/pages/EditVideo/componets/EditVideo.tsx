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
  tags?: string[];        // Lista de palavras-chave ou rótulos atribuídos
  genre?: string;         // Categoria de gênero do vídeo

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
    tags: [],             // Lista de palavras-chave ou rótulos atribuídos
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
              console.error("Erro ao carregar os dados da mídia.");
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

  return (
    <div className="flex justify-center items-center  ">
    <div className=' p-8 shadow-lg w-full max-w-4xl  '>
      {/* Não pode ser alterados */}
      <h2 className="text-2xl font-semibold"> Campos não editáveis</h2>
      <hr className="border-gray-500 my-2" />
      <div className=' grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 '>
          <div className='md:col-span-2' >
              <label htmlFor="" > Nome do Arquivo: </label>
              <input
                  type="text"
                  value={video?.fileName || ""}
                  readOnly
                  className="w-full p-2 rounded-md bg-gray-600 text-gray-300 focus:outline-none"
                />        
          </div>
          <div>
              <label htmlFor=""> Tamanho do arquivo:</label>
              <input
                  type="text"
                  value={`${video?.fileSize}. bytes` || ""}
                  readOnly
                  className="w-full p-2 rounded-md bg-gray-600 text-gray-300 focus:outline-none"
                />
          </div>
          <div>
              <label htmlFor="">Data de Upload:</label>
              <input
                  type="text"
                  value={video?.uploadDate || ""}
                  readOnly
                className="w-full p-2 rounded-md bg-gray-600 text-gray-300 focus:outline-none"
                />
          </div>
          <div>
              <label htmlFor="">Tipo MINE:  </label>
              <input
                  type="text"
                  value={video?.mimeType || ""}
                  readOnly
                  className="w-full p-2 rounded-md bg-gray-600 text-gray-300 focus:outline-none"
                />
          </div>
          <div className='flex flex-col'>
                  <label htmlFor="">Duração: </label>
                  <input
                  type="text"
                  value={video?.duration || ""}
                  readOnly
                  className="w-full p-2 rounded-md bg-gray-600 text-gray-300 focus:outline-none"
                /> 
            </div>
              <div>
                  <label htmlFor="">Resolução: </label>
                  <input
                  type="text"
                  value={video?.resolution || ""}
                  readOnly
                  className="w-full p-2 rounded-md bg-gray-600 text-gray-300 focus:outline-none"
                />              

          </div>
          <div>
              <label htmlFor=""> Taxa de quadros  </label>
              <input
                  type="text"
                  value={video?.frameRate || ""}

                  readOnly
                  className="w-full p-2 rounded-md bg-gray-600 text-gray-300 focus:outline-none"
                />
          </div>
          <div>
              <label htmlFor=""> Codec de vídeo</label>
              <input
                  type="text"
                  value={video?.videoCodec || ""}

                  readOnly
                  className="w-full p-2 rounded-md bg-gray-600 text-gray-300 focus:outline-none"
                />

          </div>
          <div>
              <label htmlFor=""> Codec de aúdio</label>
              <input
                  type="text"
                  value={video?.audioCodec || ""}

                  readOnly
                  className="w-full p-2 rounded-md bg-gray-600 text-gray-300 focus:outline-none"
                />

          </div>
          <div>
              <label htmlFor=""> Taxa de bits</label>
              <input
                  type="text"
                  value={video?.bitRate || ""}

                  readOnly
                  className="w-full p-2 rounded-md bg-gray-600 text-gray-300 focus:outline-none"
                />

          </div>
          <div>
              <label htmlFor=""> Thumbnail</label>
              <input
                  type="text"
                  value={video?.thumbnail || ""}

                  readOnly
                  className="w-full p-2 rounded-md bg-gray-600 text-gray-300 focus:outline-none"
                />

          </div>
          </div>
          {/* Pode realizar edição */}

          <div className='flex flex-col gap-4 '>
            <h2 className='text-2xl font-semibold'>Propriedades Editáveis </h2>
            <hr />

          
            <div className=''>
                <label htmlFor="description"> Descrição:  </label>
                <textarea
                  value={userDefinedProperties.description || ""}
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
            <label htmlFor="">Gênero:</label>
            <input
              type="text"
              value={userDefinedProperties.genre || ""}
              onChange={(e) => handleChange("genre", e.target.value)}
              className="w-full p-2 rounded-md bg-gray-700 text-foreground focus:outline-none"
            />
            </div>
            <div className="mt-4 flex  gap-4">
              <button className="py-2 px-6 bg-green-600 hover:bg-green-500 text-white rounded-md">
              Salvar
              </button>
      
            </div>
        </div>
        {/* Exibição da miniatura */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold">Miniatura Gerada</h2>
            <div className="mt-4">
              <img
                src={video?.thumbnail || ""}
                alt="Miniatura do vídeo"
                className="w-48 h-48 rounded-md object-cover border border-gray-600"
              />
            </div>
          </div>
    
      </div>
      
    </div>
  )
}
