import { Avatar } from '@/components/ui/avatar';
import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import React, { useState } from 'react'

export function EditProfile({ open }: { open: boolean }) {

  const [userDetails, setUserDetails] = useState({
    firstName: "Pepito",
    lastName: "Rodrick",
    email: "pepito.sifuentes@uni.pe",
  });

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    confirmNewPassword: "",
  });

  // Função para atualizar os detalhes
  const handleDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  // Função para salvar as alterações
  const handleSaveDetails = () => {
    console.log("Saved details:", userDetails);
  };

  // Função para salvar a senha
  const handleSavePassword = () => {
    if (passwords.newPassword !== passwords.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Password changed:", passwords);
  };
  
  // const [open, setOpen] = useState(true); // Estado do Sidebar



  return (
    <div className={`transition-all duration-300 ${
      open ? "w-[calc(100%-14rem)]" : "w-[calc(100%-3rem)]"
      } mx-auto p-6 rounded-lg`}
      >
      {/* Card do Usuário */}
      <div className="flex flex-col items-center p-6 rounded-lg shadow-lg "  
        style={{ backgroundColor: '#21222D' }}
        >
        <Avatar className="w-32 h-32" >
          <AvatarImage 
            src="https://github.com/shadcn.png"
            />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <h3 className="text-xl font-semibold">@User-Name</h3>
        <p className="text-sm text-gray-400">user@email.com</p>
        <button className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-green-500">
          Editar
        </button>
      </div>

      {/* Formulário de Edição */}
      <div className="flex-1 p-6 rounded-lg shadow-lg" style={{ backgroundColor: '#21222D' }}>
        <h3 className="text-lg font-semibold mb-4">Configurações do usuário</h3>

        {/* Detalhes do Usuário */}
        <section className="mb-6">
          <h4 className="text-md font-medium mb-2">Detalhes</h4>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Primeiro nome"
              className="w-full p-2 rounded-md bg-gray-700 text-gray-300 focus:outline-none"
            />
            <input
              type="text"
              placeholder="Sobrenome"
              className="w-full p-2 rounded-md bg-gray-700 text-gray-300 focus:outline-none"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 rounded-md bg-gray-700 text-gray-300 focus:outline-none"
            />
          
            <div className="col-span-full">
              <button
                type="button"
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-green-500"
              >
                Salvar
              </button>
            </div>
          </form>
        </section>

        {/* Alteração de Senha */}
        <section>
          <h4 className="text-md font-medium mb-2">Senha</h4>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="password"
              placeholder="Senha atual"
              className="w-full p-2 rounded-md bg-gray-700 text-gray-300 focus:outline-none"
              value={passwords.currentPassword}
            />
            <input
              type="password"
              placeholder="Confirmar senha"
              className="w-full p-2 rounded-md bg-gray-700 text-gray-300 focus:outline-none"
              value={passwords.confirmPassword}
            />
            <input
              type="password"
              placeholder="Senha nova"
              className="w-full p-2 rounded-md bg-gray-700 text-gray-300 focus:outline-none"
              value={passwords.newPassword}
            />
            <input
              type="password"
              placeholder="Confirmar senha nova"
              className="w-full p-2 rounded-md bg-gray-700 text-gray-300 focus:outline-none"
              value={passwords.confirmNewPassword}

            />
            <div className="col-span-full">
              <button
                type="button"
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-green-500"
              >
                Salvar
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  
  )
}
