import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { SlidersHorizontal,Search } from 'lucide-react';
import { useState } from 'react';

interface FilterParams {
    type:string;
    name: string,
    tags: string;
}

interface SearchFilesProps {
    onFilterChange: (filters: FilterParams) => void; // Define o tipo da função de callback
}

export default function SearchFiles({onFilterChange}:SearchFilesProps) {
    const [selectedType,setSelectedTypes]= useState<string>("")//Tipo do arquivo
    const [nameFilter, setNameFilter] = useState<string>('');
    const [tagsFilter, setTagsFilter] = useState<string>("");


    const handleFilter = () =>{//Chama a função onFilterChange enviando os filtros como objeto
        onFilterChange({ 
            type: selectedType, 
            name: nameFilter,
            tags: tagsFilter,
        })
    }

  return (
    <div className='flex justify-center mt-8 gap-4'>
        {/* Campo de Pesquisa */}
        <div className="flex gap-4">
                <div className="max-w-xl w-full">
                    <Input
                        type="text"
                        value={nameFilter}
                        onChange={(e) => setNameFilter(e.target.value)}
                        placeholder="Digite o nome do arquivo"
                    />
                </div>

                {/* Botão Aplicar Filtros */}
                <Button onClick={handleFilter} >
                    <Search />
                </Button>
            </div>

        {/* FIltro */}
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline">
                        <SlidersHorizontal />
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Filtrar Arquivos</DialogTitle>
                        <DialogDescription>
                            Use os campos abaixo para filtrar os arquivos
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col  gap-4 py-4">
                        {/* tipo */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="fileType" className="text-right">
                            Tipo
                            </Label>
                            <select 
                                name="" 
                                id="fileType"
                                value={selectedType}
                                onChange={(e)=> setSelectedTypes(e.target.value)}
                                className='col-span-3 bg-background rounded-md border border-input lex h-10 w-full '>
                                <option value="">Todos</option>
                                <option value="image">Imagens</option>
                                <option value="video">Vídeos</option>
                                <option value="audio">Áudios</option>
                            </select>

                            
                        </div>
                        {/* Tags */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="tagsFilter" className="text-right">
                            Tags
                            </Label>
                            <Input 
                                id="tagsFilter" 
                                value={tagsFilter}
                                onChange={(e)=>{setTagsFilter(e.target.value)}}
                                className="col-span-3" />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button onClick={handleFilter}>Aplicar Filtros</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>


        </div>





    </div>
  )
}
