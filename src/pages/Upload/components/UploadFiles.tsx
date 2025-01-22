import { CloudUpload } from 'lucide-react';
import  { useRef, useState, useContext } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { UploadService } from '@/api/uploadService';
import { mediaService } from '@/api/mediaService';
import { AuthContext } from '../../../auth/AuthContext';
import { User } from '../../../types/User';

type UploadedFile = {
  title: string;
  type:string;
  size: number;
  status: "Uploading" | "Completed" | "Error";
  progress: number;
  thumbnail?: string;
};

export default function UploadArea() {
    const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
    const { user, saveUserInfos } = useContext(AuthContext)

  //Referência para o input de arquivos (usado para simular clique no input)
  const fileInputRef = useRef<HTMLInputElement>(null);
  //Para abrir o seletor de arquivos
  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current?.click(); // Simula o clique no input de arquivo
    }
  };

  //Executada quando os arquivos são selecionados
  const handleFileSelect =async (e: React.ChangeEvent<HTMLInputElement>) => {
    const supportedFormats = ["image/jpeg", "image/png", "video/mp4", "audio/mp3, image/svg", "video/avi", "video/mov", "audio/wav"];
    const files = Array.from(e.target.files || []);
    for(const file of files){
      if (!supportedFormats.includes(file.type)) {
        alert(`${file.name} não é um formato suportado.`);
        continue;
      }
      const newFile:UploadedFile = {
        title: file.name, // Usando o nome do arquivo como título inicial
        type: file.type.split("/")[0], // "image", "video", "audio", etc.
        size: file.size,
        status: "Uploading",
        progress: 0,
      };
      //Gerar Thumbnail (Imagem ou Vídeo)
      if(file.type.startsWith("image")){
        newFile.thumbnail = await generateImageThumbnail(file);
      } else if (file.type.startsWith("video")) {
        newFile.thumbnail = await generateVideoThumbnail(file);
      }
      //Atualiza o estado adicionando o arquivo à lista
      setUploadedFiles((prev) => [...prev, newFile]); // Adiciona o arquivo à lista

      // Inicia o Upload do Arquivo
      uploadFile(file, newFile);


    }
  };
  //Gera uma miniatura para ela 
  const generateImageThumbnail = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.src = reader.result as string;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          const scale = Math.min(100 / img.width, 100 / img.height); // Redimensiona para 100px no maior lado
          canvas.width = img.width * scale;
          canvas.height = img.height * scale;
          ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
          resolve(canvas.toDataURL("image/jpeg"));
        };
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };
  //Gera uma miniatura para vídeos
  const generateVideoThumbnail = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const video = document.createElement("video");
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const url = URL.createObjectURL(file);

      video.src = url;
      video.currentTime = 1; // Captura o frame no segundo 1
      video.onloadeddata = () => {
        canvas.width = video.videoWidth / 2; 
        canvas.height = video.videoHeight / 2;
        ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg"));
        URL.revokeObjectURL(url);
      };
      video.onerror = reject;
    });
  };


  //Upload do arquivo
  const uploadFile = async (file: File, fileData: any) => {
    let fileType = file.type;
    if (fileType.includes('/')) {
      fileType = file.type.split("/")[0];
    }
    
    console.log(file)
    const UploadData = new FormData();
    UploadData.append("file", file);
    UploadData.append("title", fileData.title); // Usando o nome do arquivo como título inicial
    UploadData.append("description", ""); // Ajuste conforme necessário
    UploadData.append("tags", "");
    UploadData.append("type", fileType); // Exemplo: "image", "video", "audio"
    if (fileData.thumbnail) {
      UploadData.append("thumbnail", fileData.thumbnail);
    }

    try {
      await UploadService.uploadFile(UploadData);

      const mediaQuantity = await mediaService.getUserMediaCount();

      saveUserInfos({
        ...user,
        media: mediaQuantity
      } as User);

      setUploadedFiles((prev) =>
        prev.map((f) =>
          f.title === fileData.title ? { ...f, status: "Completed", progress: 100 } : f
        )
      );
    } catch (error) {
      console.error("Erro no upload:", error);
      setUploadedFiles((prev) =>
        prev.map((f) => (f.title === fileData.name ? { ...f, status: "Error" } : f))
      );
    }
  };


  return (
    <div className=" grid grid-cols-1 md:grid-cols-3 gap-8 p-8 ">
      {/*Área Pontilhada de Upload */}
        <div className=" col-span-1" >
            
            <div  className="flex flex-col items-center justify-center w-full h-[32rem] border-2 border-dashed border-gray-300 rounded-lg p-6 text-center  shadow-md ">

                    {/* Texto */}
                    <div className='flex flex-col items-center' >
                        <div className='mb-4'>
                            <CloudUpload className='w-20 h-20 text-gray-300'/>
                        </div>
                        <p className='text-foreground text-xl font-medium'>Arraste e solte</p>
                        <p className='text-foreground text-xl font-medium'>arquivos para upload</p>
                        <p className='my-4 text-xl font-semibold'>ou</p>
                    </div>

                    {/* Botão */}
                    <div className='flex justify-center '>
                        <button
                            onClick={ handleButtonClick}
                            className="flex  bg-primary text-white py-2 px-6 rounded-lg cursor-pointer hover:bg-green-600 transition"
                            >
                        Browse
                        </button>
                        <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        multiple
                        onChange={ handleFileSelect}
                        />
                    </div>
            </div>
        </div>
        {/* Lista de Uploads */}
        <div className="col-span-2 flex flex-col  ">
              {uploadedFiles.length > 0  && (
              <ScrollArea className="h-[32rem]  rounded-md  border border-gray-500   shadow-lg ">
                <h4 className="px-4 py-2 text-xl font-semibold  text-left ">Upload</h4>

                <ul className="space-y-4 border-gray-700 p-4">
                {uploadedFiles.map((file, index) => (
                  <li
                    key={index}
                    className="p-4 bg-gray-700 rounded-lg shadow-md flex flex-col"
                    >
                    <div className="flex justify-between items-center">
                        <div>
                        <span className="font-medium text-foreground">{file.title}</span>
                        <p className="text-sm text-foreground">{(file.size / 1024).toFixed(2)} KB</p>
                        </div>
                        <span className="text-sm font-medium text-blue-400">
                          {file.status}
                        </span>
                    </div>
                    <div className="w-full bg-gray-600 rounded-full h-2 mt-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${file.progress}%` }}
                      >
                      </div>
                    </div>
                    {file.thumbnail && (
                    <img
                      src={file.thumbnail}
                      alt="thumbnail"
                      className="mt-2 max-w-[100px] max-h-[100px] rounded-lg"
                    />
                  )}
                  </li>
                ))}
                </ul>
                <ScrollBar>
                  
                </ScrollBar>
                </ScrollArea>

              )
            }
        </div>
    </div>
  )
}
