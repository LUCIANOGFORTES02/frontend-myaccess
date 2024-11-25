import {Routes,Route} from 'react-router-dom'
import Login from './pages/Login/Login'
import Dashboard from './pages/Home/Dashboard'

export default function Router() {
  return (
    <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/' element={<Dashboard/>}/>
    </Routes>
    
  )
}
