import {Routes,Route} from 'react-router-dom'
import Login from './pages/Login/Login'
import DashboardPage from './pages/Home/page'
import EditProfilePage from './pages/EditProfile/page'
import ImagePage from './pages/Gerenciador de Imagens/page'
import { RequireAuth } from './auth/RequireAuth'
import UploadObject from './pages/Upload/page'
import ListFiles from './pages/List/page'

export default function Router() {
  return (
    <Routes>
        <Route path='/login' element={<Login/>}/>
        {/* <Route path='/' element={<RequireAuth><DashboardPage/></RequireAuth>}/> */}
        <Route path='/' element={<DashboardPage/>}/>

        <Route path='/upload' element={<UploadObject/>}/>
        <Route path='/files' element={<ListFiles/>}/>
        <Route path='/image' element={<RequireAuth><ImagePage/></RequireAuth>}/>



        <Route path='/editprofile' element={<RequireAuth><EditProfilePage/></RequireAuth>}/>
    </Routes>
    
  )
}
