import { mediaService } from "@/api/mediaService";
import { Target } from "lucide-react";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";

interface Image {
  name: string,
  size: number,
  uploadDate: string,
  mimeType: string,
  dimensions: { width: number, height: number },
  colorDepth: number,
  resolution: number,
  exifData: {
    cameraModel: string,
    exposureTime: string,
    dateTime: string,
    gpsLocation: string,
  },
  description: string,
  tags: string[],
};

// Simulação de dados de imagem
// const imageData = {
//   name: 'foto_example.jpg',
//   size: 204800,
//   uploadDate: '2025-01-17 14:32',
//   mimeType: 'image/jpeg',
//   dimensions: { width: 1920, height: 1080 },
//   colorDepth: 24,
//   resolution: 300,
//   exifData: {
//     cameraModel: 'Canon EOS 80D',
//     exposureTime: '1/250',
//     dateTime: '2025-01-17 14:00',
//     gpsLocation: '37.7749° N, 122.4194° W',
//   },
//   description: 'Uma bela paisagem no pôr do sol.',
//   tags: ['paisagem', 'pôr do sol'],
// };

export default function EditImage() {

  const { id } = useParams<{id:string}>();//Capturar o id da imagem

  const [image,setImage] = useState<Image|null>(null)
  const [userDefinedProperties,setUserDefinedProperties] = useState<Image|null>(null)

  useEffect(()=>{
    const loadMedia = async () =>{
      try{
        if (id){
          const data = await mediaService.fetchMediaById(id);
          setImage(data);
          setUserDefinedProperties(data);

        }
      } catch (err) {
        console.error("Erro ao carregar os dados da mídia.");
      } 
    };
    loadMedia();

  },[id]);
  
  const handleChange = (field: keyof Image, value: any) => {
    if(!userDefinedProperties)return;
    setUserDefinedProperties((prev) => ({
      ...prev!,
      [field]: value,
    }));
  };

  const handleSave = () => {
    if (userDefinedProperties){
      setImage(userDefinedProperties)
      
    }
  }

  return (
    <div className="flex justify-center items-center ">
      <div className=' p-6  w-full max-w-4xl '>
        {/* Não pode ser alterados */}
        <h2 className="text-2xl font-semibold"> Campos não editáveis</h2>
        <hr className="border-gray-500 my-2" />
        <div className=' grid grid-cols-1 md:grid-cols-2 gap-4 mb-8'>
            <div className='md:col-span-2' >
                <label htmlFor="" > Nome do Arquivo: </label>
                <input
                    type="text"
                    value={image?.name}
                    readOnly
                    className="w-full p-2 rounded-md bg-gray-600 text-gray-300 focus:outline-none"
                  />        
            </div>
            <div>
                <label htmlFor=""> Tamanho do arquivo:</label>
                <input
                    type="text"
                    value={`${image?.size}. bytes`}
                    readOnly
                    className="w-full p-2 rounded-md bg-gray-600 text-gray-300 focus:outline-none"
                  />
            </div>
            <div>
                <label htmlFor="">Data de Upload:</label>
                <input
                    type="text"
                    value={image?.uploadDate}
                    readOnly
                  className="w-full p-2 rounded-md bg-gray-600 text-gray-300 focus:outline-none"
                  />
            </div>
            <div>
                <label htmlFor="">Tipo MINE:  </label>
                <input
                    type="text"
                    value={image?.mimeType}
                    readOnly
                    className="w-full p-2 rounded-md bg-gray-600 text-gray-300 focus:outline-none"
                  />
            </div>
            <div className='flex flex-col'>
                <label htmlFor=""> Dimensões: </label>
                <div className='flex flex-row gap-2'>
                    <label htmlFor="">Altura: </label>
                    <input
                    type="text"
                    value={image?.dimensions.height}
                    readOnly
                    className="w-full p-2 rounded-md bg-gray-600 text-gray-300focus:outline-none"
                  />                <label htmlFor="">Largura: </label>

                    <input
                    type="text"
                    value={image?.dimensions.width}
                    readOnly
                    className="w-full p-2 rounded-md bg-gray-600 text-gray-300 focus:outline-none"
                  />              
              </div>

            </div>
            <div>
                <label htmlFor=""> Resolução  </label>
                <input
                    type="text"
                    readOnly
                    className="w-full p-2 rounded-md bg-gray-600 text-gray-300 focus:outline-none"
                  />
            </div>
            <div>
                <label htmlFor=""> Dados Exif  </label>
                <input
                    type="text"
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
                  <label htmlFor=""> Descrição:  </label>
                  <textarea
                    value={userDefinedProperties?.description}
                      
                      onChange={(e) => handleChange("description",e.target.value)}
                      className="w-full p-2 rounded-md bg-gray-700 text-foreground focus:outline-none"
                    />
              </div>
              <div>
                  <label htmlFor=""> Tags </label>
                  <input
                      type="text"
                      placeholder="Adicione tags separadas por vírgula"
                      value={userDefinedProperties?.tags}
                      onChange={(e) => handleChange("tags", e.target.value.split(","))}
                      className="w-full p-2 rounded-md bg-gray-700 text-foreground focus:outline-none"
                    />

              </div>
                <div className="mt-4 flex  gap-4">
                  <button onClick={handleSave} className="py-2 px-6 bg-green-600 hover:bg-green-500 text-white rounded-md">
                  Salvar
                  </button>
          
                </div>
          </div>
      
        </div>
      </div>
      )
  }
