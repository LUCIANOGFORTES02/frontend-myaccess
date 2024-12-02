import { userService } from '@/api/userService';
import { AuthContext } from '@/auth/AuthContext';
import { Avatar } from '@/components/ui/avatar';
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import React, { useContext, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { User } from '../../../types/User';

export function EditProfile() {
  const { user, saveUserInfos } = useContext(AuthContext)

  const [userDetails, setUserDetails] = useState({
    name: user?.name || "",
    username: user?.username || "",
    description: user?.description || "",
    email: user?.email || "",
    profileImage: user?.profileImage || "",
  });

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    confirmNewPassword: "",
  });

  //const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [name, setName] = useState(user?.name || "Nome completo");
  const [email, setEmail] = useState(user?.email || "Email");

  // Função para atualizar a senha
  const handlePasswordsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswords({ ...passwords, [name]: value });
  };

  // Função para salvar as alterações das informacoes do usuario
  const handleSaveUserInfos = async () => {
    try {
      const updateData = {
        name,
        email,
      };

      const updatedUser = await userService.updateUserProfile(updateData);

      // Atualize o estado local do usuário após a atualização bem-sucedida
      setUserDetails((prevDetails) => ({
        ...prevDetails,
        name: updatedUser?.name,
        email: updatedUser?.email,
      }));

      saveUserInfos({
        id: user?.id,
        name: updatedUser?.name,
        username: userDetails.username,
        email: updatedUser?.email,
        password: user?.password,
        description: userDetails.description,
        profileImage: user?.profileImage
      } as User)

      toast.success("Informações atualizadas com sucesso!");
    } catch (error) {
      console.error('Erro ao salvar alterações:', error);
    }
  };

  // Função para salvar a senha
  const handleSavePassword = () => {
    const {currentPassword,newPassword,confirmPassword,confirmNewPassword} = passwords

    if (!currentPassword || newPassword !== confirmNewPassword || 
      currentPassword!== confirmPassword
      ) {
      toast.error('Preencha os campos corretamente.',{
        position: "top-right",
        theme: "dark",
    })
      return;
    }  
      toast.success('Senha alterada')

    console.log("Password changed:", passwords);
  };
  //Função para atualizar a imagem
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      //setSelectedImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  //Função para salvar a imagem de perfil e a descrição
  const handleSaveChanges = async () => {
    try {
      const updateData = {
        description,
        profileImage: previewImage,
      };

      const updatedUser = await userService.updateUserProfile(updateData);

      // Atualize o estado local do usuário após a atualização bem-sucedida
      setUserDetails((prevDetails) => ({
        ...prevDetails,
        description: updatedUser.description,
        profileImage: updatedUser.profileImage || "",
      }));

      setDescription(updatedUser.description); 
      setPreviewImage(updatedUser.profileImage);
      
      saveUserInfos({
        id: user?.id,
        name: user?.name,
        username: user?.username,
        email: user?.email,
        password: user?.password,
        description: updatedUser.description,
        profileImage: user?.profileImage
      } as User)

      toast.success("Informações atualizadas com sucesso!");
    } catch (error) {
      console.error('Erro ao salvar alterações:', error);
    }

    setUserDetails({ ...userDetails, description, profileImage: previewImage || userDetails.profileImage });
  };

  return (
    <div className="flex flex-1 flex-col p-4 h-screen" >
      <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-6 items-start ">
        {/* Card do Usuário */}
        <div className="col-span-1 flex flex-col items-center p-6 rounded-lg shadow-lg"  
          style={{ backgroundColor: '#21222D' }}
          >
          <Avatar className="border-4 border-accent shadow-lg w-32 h-32" >
            <AvatarImage 
              src={previewImage||user?.profileImage||"https://github.com/shadcn.png"}
              />
            <AvatarFallback>{user?.name?.[0]?.toUpperCase()} </AvatarFallback>
          </Avatar>
          <div className='flex flex-1 flex-col items-center '>
          <h3 className="text-xl font-semibold mt-2">{user?.username}</h3>
          <p className="text-sm text-foreground mt-1 text-justify ">
            <span >
              {description || user?.description}
            </span>
          </p>
          </div>


          <Dialog>
            <DialogTrigger asChild>
              <button className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-green-600">Editar</button>
            </DialogTrigger>
            <DialogContent className="p-6 bg-gray-800 rounded-lg shadow-lg">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold text-foreground">Editar Perfil</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-1 gap-4">

                {/* Campo para editar a imagem */}
                <div className="flex flex-col items-center gap-4">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src={previewImage || user?.profileImage} />
                    <AvatarFallback>{name || user?.name?.[0]?.toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <input
                    type="file"
                    accept="image/*"
                    id="profile-image-upload"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="profile-image-upload"
                    className="cursor-pointer px-4 py-2 bg-primary text-white rounded-md hover:bg-green-600"
                  >
                    Escolher Imagem
                  </label>
                </div>
                {/* Campo para editar a descrição */}
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Digite sua descrição..."
                  className="w-full p-4 h-32 rounded-md bg-gray-700 text-foreground focus:outline-none"
                ></textarea>
                {/* Botão para salvar alterações */}
                <DialogClose>
                  <button
                    className="mt-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-green-600"
                    onClick={handleSaveChanges}
                  >
                    Salvar Alterações
                  </button>
                </DialogClose>
              </div>
            </DialogContent>
          </Dialog>


        </div>

        {/* Formulário de Edição */}
        <div className="col-span-2 p-6 rounded-lg shadow-lg" 
          style={{ backgroundColor: '#21222D' }}>
          <h1 className="text-2xl font-bold mb-6">Configurações do usuário</h1>

          {/* Detalhes do Usuário */}
          <section className="mb-6">
            <h4 className="text-lg font-medium mb-2">Detalhes</h4>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder={name}
                name='firstName'
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 rounded-md bg-gray-700 text-foreground focus:outline-none"
              />
              <input
                type="email"
                placeholder={email}
                name='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 rounded-md bg-gray-700 text-foreground focus:outline-none"
              />
            
              <div className="col-span-full">
                <button
                  type="button"
                  onClick={handleSaveUserInfos}
                  className="px-4 py-2 bg-primary text-foreground rounded-md hover:bg-green-600"
                >
                  Salvar Alterações
                </button>
              </div>
            </form>
          </section>

          {/* Alteração de Senha */}
          <section>
            <h4 className="text-lg font-medium mb-2">Alteração de Senha</h4>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="password"
                placeholder="Senha atual"
                name='currentPassword'
                value={passwords.currentPassword}
                onChange={handlePasswordsChange}
                className="w-full p-2 rounded-md bg-gray-700 text-foreground focus:outline-none"
                
              />
              <input
                type="password"
                placeholder="Confirmar senha"
                name='confirmPassword'
                value={passwords.confirmPassword}
                onChange={handlePasswordsChange}
                className="w-full p-2 rounded-md bg-gray-700 text-foreground  focus:outline-none"
                
              />
              <input
                type="password"
                placeholder="Senha nova"
                name='newPassword'
                value={passwords.newPassword}
                onChange={handlePasswordsChange}
                className="w-full p-2 rounded-md bg-gray-700 text-foreground  focus:outline-none"
                
              />
              <input
                type="password"
                placeholder="Confirmar senha nova"
                name='confirmNewPassword'
                value={passwords.confirmNewPassword}
                onChange={handlePasswordsChange}
                className="w-full p-2 rounded-md bg-gray-700 text-foreground  focus:outline-none"
                

              />
              <div className="col-span-full">
                <button
                  type="button"
                  onClick={handleSavePassword}
                  className="px-4 py-2 bg-primary text-foreground  rounded-md hover:bg-green-600"
                >
                  
                  Alterar Senha
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>
      <ToastContainer />
    </div>
  
  )
}
