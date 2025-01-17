import { CloudUpload } from 'lucide-react';
import  { useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area"


export default function UploadArea() {
//     const [uploadedFiles, setUploadedFiles] = useState<
//     { name: string; size: number; status: string; progress: number }[]
//   >([]);
  const uploadedFiles = [
    { name: "file1.jpg", size: 500000, status: "Completed", progress: 100 },
    { name: "document.pdf", size: 2000000, status: "Completed", progress: 100 },
    { name: "presentation.pptx", size: 750000, status: "Completed", progress: 100 },
    { name: "spreadsheet.xlsx", size: 300000, status: "Completed", progress: 100 },
    { name: "archive.zip", size: 4500000, status: "Uploading", progress: 75 },
    { name: "code.js", size: 10000, status: "Uploading", progress: 50 },
    { name: "video.mp4", size: 20000000, status: "Uploading", progress: 30 },
    { name: "audio.mp3", size: 5000000, status: "Completed", progress: 100 },

  ];
  


  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Simula o clique no input de arquivo
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    console.log("Files selected:", files); // Lógica de upload
  };

  const handleFilesSelected = (files: File[]) => {//Selecionar os arquivos

  };

  const uploadFile = async (file: File) => { //Enviar para o BackEnd
    const formData = new FormData();
    formData.append("file", file);


  };

  return (
    <div className=" grid grid-cols-1 md:grid-cols-3 gap-8 p-8 ">
      {/*Área Pontilhada de Upload */}
        <div className=" col-span-1" >
            
            <div  className="flex flex-col items-center justify-center w-full h-full border-2 border-dashed border-gray-300 rounded-lg p-6 text-center  shadow-md ">

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
                {/* <h4 className="text-2xl font-semibold  mb-4 text-left ">Lista de arquivos</h4> */}
                <ScrollArea className="h-[32rem]  rounded-md  border border-gray-500   shadow-lg ">
                  {uploadedFiles.length>0 ? (

                    <ul className="space-y-4 border-gray-700 p-4">
                    {uploadedFiles.map((file, index) => (
                        <li
                        key={index}
                        className="p-4 bg-gray-00 rounded-lg shadow-md flex flex-col"
                        >
                        <div className="flex justify-between items-center">
                            <div>
                            <span className="font-medium text-gray-500">{file.name}</span>
                            <p className="text-sm text-gray-500">{(file.size / 1024).toFixed(2)} KB</p>
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
                    ))}:
                    </ul>

                  ):(
                    <p className="text-gray-400 text-center p-4">
                    Nenhum upload em andamento
                    </p>
                  )
                }
                </ScrollArea>

            </div>
    </div>
  )
}
