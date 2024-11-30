import { useContext, useState } from "react";
import { AuthContext } from "../../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { authService } from "@/api/authService";
import { toast, ToastContainer, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Login() {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    

 //Estados
 const[username,setUsername]=useState('');
 const[name,setName]=useState('');
 const[email,setEmail]=useState('');
 const[password,setPassword]=useState('');
 const[confirmpassword,setConfirmpassword]=useState('');
 const[showSignup, setShowSignup] = useState(false);

  //Função auxiliar para exibir toasts
  const showToast = (type:'success'|'error', message:string ) => {
    const options: ToastOptions = {
      position: 'top-right',
      theme: 'dark',
    };

    if (type === 'success') toast.success(message, options);
    else toast.error(message, options);
  };

  
  //Função para Login
 const handleLogin= async() =>{
    try{
      const isLogged = await auth.signin(email,password);
      if(isLogged){
        navigate('/'); 
        showToast('success','Login realizada com sucesso.');
      }
      else{
        showToast('error','Ops... Email ou senha incorretos');
      }
    } catch (error){
      showToast('error', 'Erro ao realizar login.');
      console.error('Erro no login:', error);   
    }
  }

  //Função para cadastro
  const handleCadastrar=async()=>{
    if(password!=confirmpassword){
      showToast('error','As senhas não coincidem')
      console.log("Senhas diferentes")
      return
    }
    try {
      const response = await authService.register(name, username, email, password);
      if (response?.status === 201) {
        const successMessage = response.data?.message || 'Cadastro realizado com sucesso!';
        showToast('success', successMessage);
        setShowSignup(false); // Voltar para tela de login
      }
      const successMessage = 'Nome ou Username já cadastrado';
      showToast('error', successMessage);

    } catch (error) {
      showToast('error', 'Erro ao realizar cadastro.');
      console.error('Erro no cadastro', error); 
    }
   }

  const handleTelaCadastro = (e: any)=>{
    e.preventDefault(); 
    setShowSignup(!showSignup);
    setName('')
    setUsername('')
    setEmail('')
    setPassword('')
    setConfirmpassword('')

 }


return (
    
 <div className="flex justify-center items-center h-screen">
    <div className="w-full max-w-sm rounded-md p-6 ">
           <div className="text-5xl  font-bold text-foreground mb-10" >
                  {showSignup?'Cadastro':'Login'}
           </div>
            
          {showSignup &&(
          <input 
            className="w-full bg-transparent border-b text-foreground focus:outline-none focus:border-primary block text-xl mb-3" 
            type="text" 
            placeholder='Nome' 
            value={name} 
            onChange={e=> setName(e.target.value)} 
          />
          )}
          {showSignup &&(
          <input 
            className="w-full bg-transparent border-b text-foreground focus:outline-none focus:border-primary block text-xl mb-3" 
            type="text" 
            placeholder='User Name'
            value={username} 
            onChange={e=> setUsername(e.target.value)} 
          />
          )}
          <input 
            className="w-full bg-transparent border-b  text-foreground focus:outline-none focus:border-primary block text-xl mb-3" 
            type="email" 
            placeholder='Email' 
            value={email}  
            onChange={e=> setEmail(e.target.value)}
          />
          <input 
            className="w-full bg-transparent border-b text-foreground focus:outline-none focus:border-primary block text-xl mb-3" 
            type="password" 
            placeholder='Senha'
            value={password}  
            onChange={e=> setPassword(e.target.value)}
          />
          {showSignup &&(
          <input 
            className="w-full bg-transparent border-b  text-foreground focus:outline-none focus:border-primary block text-xl mb-3" 
            type="password" 
            placeholder='Confirme a Senha' 
            value={confirmpassword} 
            onChange={e=> setConfirmpassword(e.target.value)} 
          />
          )}
        
          {showSignup ? 
            <button className=" w-full bg-primary py-1 px-4 text-foreground" onClick={handleCadastrar} >
              Registrar
            </button> : 
            <button className=" w-full mt-2 bg-primary py-1 px-4  text-foreground" onClick={handleLogin} >
              login
            </button>
          }

          <a className="mt-3" href="#" onClick={handleTelaCadastro}>
            <span className="flex justify-center py-2 text-foreground">
              {showSignup ? 'Já tem cadastro? Acesse o Login!' : 'Não tem cadastro? Registre aqui!'}
            </span>            
          </a>
     </div>
     <ToastContainer />
 </div>
)
}
