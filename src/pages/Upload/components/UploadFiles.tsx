import { CloudUpload } from 'lucide-react';
import  { useRef, useState } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { UploadService } from '@/api/uploadService';

type UploadedFile = {
  name: string;
  size: number;
  status: "Uploading" | "Completed" | "Error";
  progress: number;
  thumbnail?: string;
};


export default function UploadArea() {
    const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  const TestUploadedFiles = [
    { name: "file1.jpg", size: 500000, status: "Completed", progress: 100 },
    { name: "document.pdf", size: 2000000, status: "Completed", progress: 100 },
    { name: "presentation.pptx", size: 750000, status: "Completed", progress: 100 },
    { name: "spreadsheet.xlsx", size: 300000, status: "Completed", progress: 100 },
    { name: "archive.zip", size: 4500000, status: "Uploading", progress: 75 },
    { name: "code.js", size: 10000, status: "Uploading", progress: 50 },
    { name: "video.mp4", size: 20000000, status: "Uploading", progress: 30 },
    { name: "audio.mp3", size: 5000000, status: "Completed", progress: 100 },

  ];
  

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
    const files = Array.from(e.target.files || []);
    console.log("Files selected:", e.target.files);
    for(const file of files){
      const newFile:any = {
        name: file.name,
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
    console.log("Uploading file:", fileData.name);
    const UploadData = new FormData();
    UploadData.append("file", file); // File to upload
    UploadData.append("name", fileData.name); // Name of the file
    UploadData.append("size", fileData.size.toString()); // File size
    UploadData.append("title", fileData.name); // Title (use the file name as the title)
    UploadData.append("type", file.type); // File type (e.g., "image/png")
    if (fileData.thumbnail) {
      UploadData.append("thumbnail", fileData.thumbnail);
    }

    try {
      const response = await UploadService.uploadFile(UploadData);

      setUploadedFiles((prev) =>
        prev.map((f) =>
          f.name === fileData.name ? { ...f, status: "Completed", progress: 100 } : f
        )
      );
    } catch (error) {
      console.error("Erro no upload:", error);
      setUploadedFiles((prev) =>
        prev.map((f) => (f.name === fileData.name ? { ...f, status: "Error" } : f))
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
              {TestUploadedFiles.length > 0  && (
              <ScrollArea className="h-[32rem]  rounded-md  border border-gray-500   shadow-lg ">
                <h4 className="px-4 py-2 text-xl font-semibold  text-left ">Upload</h4>

                <ul className="space-y-4 border-gray-700 p-4">
                {TestUploadedFiles.map((file, index) => (
                  <li
                    key={index}
                    className="p-4 bg-gray-700 rounded-lg shadow-md flex flex-col"
                    >
                    <div className="flex justify-between items-center">
                        <div>
                        <span className="font-medium text-foreground">{file.name}</span>
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
                      ></div>
                    </div>
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
