import './App.css'
import {BrowserRouter} from 'react-router-dom'
import Router from './router'
import { AuthProvider } from './auth/AuthProvider'


function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Router/>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
