import { mediaService } from "@/api/mediaService";
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
  title: string,
  tags: string[],
};


export default function EditImage() {
  const defaultImage: Image = {
    name: '',
    size: 0,
    uploadDate: '',
    mimeType: '',
    dimensions: { width: 0, height: 0 },
    colorDepth: 0,
    resolution: 0,
    exifData: {
      cameraModel: '',
      exposureTime: '',
      dateTime: '',
      gpsLocation: '',
    },
    description: '',
    title: '',
    tags: [],
  };

  const { id } = useParams<{id:string}>();//Capturar o id da imagem

  const [image,setImage] = useState<Image>(defaultImage)
  const [userDefinedProperties,setUserDefinedProperties] = useState<Image>(defaultImage)

  useEffect(()=>{
    const loadMedia = async () =>{
      try{
        if (id){
          const data = await mediaService.fetchMediaById(id);
          setImage(data);
          setUserDefinedProperties(data);

        }
      } catch (err) {
        console.error("Erro ao carregar os dados da mídia.", err);
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

  const handleUpdate = async () => {
    try{
      console.log('teste')
      console.log(userDefinedProperties)
      if (id) {
        const data = await mediaService.updateMediaById(id, {
          title: userDefinedProperties.title,
          description: userDefinedProperties.description,
          tags: userDefinedProperties?.tags,
        });

        setImage(data);
        setUserDefinedProperties(data);
      }
    } catch (err) {
      console.error("Erro ao atualizar os dados da mídia.", err);
    } 
  }

  return (
    <div className="flex h-screen justify-center items-center ">
      <div className=' p-6  h-screen w-full max-w-4xl '>
        <div className=' grid grid-cols-1 md:grid-cols-2 gap-4 mb-8'>
            <div className='flex flex-col gap-4 '>
              <h2 className='text-2xl font-semibold'>Propriedades Editáveis </h2>
              <hr />

              <div className='md:col-span-2' >
                <label htmlFor="" > Nome do Arquivo: </label>
                <input
                    type="text"
                    value={image?.title  || ''}
                    readOnly
                    className="w-full p-2 rounded-md bg-gray-600 text-gray-300 focus:outline-none"
                  />        
              </div>

              <div className=''>
                  <label htmlFor=""> Descrição:  </label>
                  <textarea
                    value={userDefinedProperties?.description}
                      placeholder="Adicione sua descrição"
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
    </div>
    )
  }
