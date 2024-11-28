import { useContext, useState } from "react";
import { AuthContext } from "../../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import {useApi} from '../../hooks/useApi'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Login() {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();
    const api = useApi();

    

 //Estados
 const[username,setUsername]=useState('');
 const[email,setEmail]=useState('');
 const[password,setPassword]=useState('');
 const[confirmpassword,setConfirmpassword]=useState('');
 const [showSignup, setShowSignup] = useState(false);
 
 const handleLogin= async() =>{

    const isLogged = await auth.signin(email,password);
    if(isLogged){
      navigate('/'); 
      toast.success('Login realizada com sucesso')

    }
    else{
      toast.error('Opps... Email ou senha incorretos.',{
        position: "top-right",
        theme: "dark",
    })
    }
    }

 const handleCadastrar=async()=>{ //Enviar na rota save
   try {
     await api.register(username,email,password,confirmpassword);
     toast.success('Operação realizada com sucesso')
     
    } catch (error) {
      toast.error('Opps... Erro.',{
        position: "top-right",
        theme: "dark",
      })    
    }
   }

 const handleTelaCadastro = (e: any)=>{
   e.preventDefault(); 
   setShowSignup(!showSignup);
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
                  <input className="w-full bg-transparent border-b text-foreground focus:outline-none focus:border-primary block text-xl mb-3" 
                    type="text" placeholder='Nome' value={username} onChange={e=> setUsername(e.target.value)} 
                  />
                  )}
                  <input className="w-full bg-transparent border-b  text-foreground focus:outline-none focus:border-primary block text-xl mb-3" 
                    type="email" placeholder='Email' value={email}  onChange={e=> setEmail(e.target.value)}
                  />
                  <input className="w-full bg-transparent border-b text-foreground focus:outline-none focus:border-primary block text-xl mb-3" 
                    type="password" placeholder='Senha'value={password}  onChange={e=> setPassword(e.target.value)}
                  />
                  {showSignup &&(
                  <input className="w-full bg-transparent border-b  text-foreground focus:outline-none focus:border-primary block text-xl mb-3" 
                    type="password" placeholder='Confirme a Senha' value={confirmpassword} onChange={e=> setConfirmpassword(e.target.value)} 
                  />
                  )}
        
           {showSignup ? <button className=" w-full bg-primary py-1 px-4 text-foreground" onClick={handleCadastrar} >Registrar</button> : 
              <button className=" w-full mt-2 bg-primary py-1 px-4  text-foreground" onClick={handleLogin} >login</button>
           }

           <a className="mt-3" href="#" onClick={handleTelaCadastro}>
                   <span className="flex justify-center py-2 text-foreground">{showSignup ? 'Já tem cadastro? Acesse o Login!' : 'Não tem cadastro? Registre aqui!'}</span> 
                 
           </a>
     
     </div>
     <ToastContainer />
 </div>
)
}
