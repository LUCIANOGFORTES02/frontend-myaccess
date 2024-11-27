import {Routes,Route} from 'react-router-dom'
import Login from './pages/Login/Login'
import DashboardPage from './pages/Home/page'
import EditProfilePage from './pages/EditProfile/page'
import ImagePage from './pages/Gerenciador de Imagens/page'

export default function Router() {
  return (
    <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/' element={<DashboardPage/>}/>
        <Route path='/image' element={<ImagePage/>}/>
        <Route path='/editprofile' element={<EditProfilePage/>}/>
    </Routes>
    
  )
}
