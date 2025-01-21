import {Routes,Route} from 'react-router-dom'
import Login from './pages/Login/Login'
import DashboardPage from './pages/Home/page'
import EditProfilePage from './pages/EditProfile/page'
import { RequireAuth } from './auth/RequireAuth'
import UploadObject from './pages/Upload/page'
import   ListFiles from './pages/ListFiles/page'
import EditImage from './pages/EditImage/page'
import EditVideo from './pages/EditVideo/page'
import EditAudio from './pages/EditAudio/page'
import ViewPage from './pages/View/page'

export default function Router() {
  return (
    <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/' element={<RequireAuth><DashboardPage/></RequireAuth>}/>
        {/* <Route path='/editprofile' element={<RequireAuth><EditProfilePage/></RequireAuth>}/> */}
        <Route path='/' element={<DashboardPage/>}/>
        <Route path='/editprofile' element={<EditProfilePage/>}/>


        <Route path='/upload' element={<UploadObject/>}/>
        <Route path='/files' element={<ListFiles/>}/>
        <Route path='/edit/image/:id' element={<EditImage/>}/>
        <Route path='/edit/video/:id' element={<EditVideo/>}/>
        <Route path='/edit/audio/:id' element={<EditAudio/>}/>

        <Route path='/view/:id' element={<ViewPage/>}/>







    </Routes>
    
  )
}
